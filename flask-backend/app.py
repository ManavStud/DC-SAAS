import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from androguard.misc import AnalyzeAPK
import json
from flask_cors import CORS
import warnings
import requests

app = Flask(__name__)
CORS(app)
warnings.filterwarnings("ignore", category=Warning, module="werkzeug")
# Configurations for file uploads
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'apk', 'ipa'}


@app.route('/test')
def test():
    return "Flask server is running!"


@app.route('/scan_java', methods=['POST'])
def scan_java():
    if 'java_file' not in request.files:
        return jsonify({'error': 'Java file not provided'})

    java_file = request.files['java_file']
    filename = secure_filename(java_file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    java_file.save(file_path)

    try:
        print(file_path)
        scanner = MobSFScan([file_path], json=True)
        print('Scan complete')
        print(scanner.scan())
        results = scanner.scan()
        print('Results complete')
    except Exception as e:
        # os.remove(file_path)
        return jsonify({'error': f'Error scanning Java file: {str(e)}'})

    os.remove(file_path)

    if results is None:
        return jsonify({'results': 'No vulnerabilities found'})
    else:
        return jsonify({'results': results})

# Endpoint for uploading and analyzing an APK file


@app.route('/mobsfscan', methods=['POST'])
def mobsfscan():
    # Check if APK file is provided in the request
    if 'apk_file' not in request.files:
        return jsonify({'error': 'APK/IPA file not provided'})

    # Save the APK/IPA file to disk
    file = request.files['apk_file']
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)
    print("File saved")

    # Send the APK/IPA file to MobSF for analysis
    try:
        url = 'http://localhost:8000/api/v1/upload'
        files = {'file': (filename, open(file_path, 'rb'))}
        response = requests.post(url, files=files)

        # Get the analysis report ID from the response
        analysis_id = response.json()['scan_id']
    except Exception as e:
        return jsonify({'error': f'Error sending APK/IPA file to MobSF: {str(e)}'})

    os.remove(file_path)
    # Wait for the analysis to complete and retrieve the report
    try:
        url = f'http://localhost:8000/api/v1/report/{analysis_id}'
        response = requests.get(url)

        # Save the analysis report to disk
        report_path = os.path.join(
            app.config['UPLOAD_FOLDER'], f'{analysis_id}.html')
        with open(report_path, 'w') as f:
            f.write(response.text)
    except Exception as e:
        os.remove(file_path)
        return jsonify({'error': f'Error retrieving analysis report from MobSF: {str(e)}'})

    # Remove the APK/IPA file from disk
    os.remove(file_path)

    # Return the analysis report as a response
    return send_file(report_path)


@app.route('/find_vulnerabilities', methods=['POST'])
def find_vulnerabilities_endpoint():
    if 'apk_file' not in request.files:
        return jsonify({'error': 'APK file not provided'})

    apk_file = request.files['apk_file']
    filename = secure_filename(apk_file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    apk_file.save(file_path)

    try:
        a, d, dx = AnalyzeAPK(file_path)
        andro = AndroPyTool(a, d, dx)
        vulnerabilities = andro.find_vulnerabilities()
        print(vulnerabilities)
    except Exception as e:
        os.remove(file_path)
        return jsonify({'error': f'Error analyzing APK file: {str(e)}'})

    os.remove(file_path)

    # Return the vulnerabilities as a JSON response
    return jsonify(vulnerabilities)


@app.route('/analyze_apk_andro', methods=['POST'])
def analyze_apk_andro():
    if 'apk_file' not in request.files:
        return jsonify({'error': 'APK file not provided'})

    apk_file = request.files['apk_file']
    filename = secure_filename(apk_file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    apk_file.save(file_path)

    try:
        print("Before analyzing")
        # Analyze the APK using Androguard
        androguard_obj, analysis_results = AnalyzeAPK(file_path)
        print("After analyzing")
    except Exception as e:
        os.remove(file_path)
        return jsonify({'error': f'Error analyzing APK file: {str(e)}'})

    # Convert the analysis results to a JSON object
    json_results = json.dumps(analysis_results, default=lambda x: str(x))

    # Return the JSON object
    return json_results


@app.route('/analyze_apk', methods=['POST'])
def analyze_apk():
    if 'apk_file' not in request.files:
        return jsonify({'error': 'APK file not provided'})
    user_id = request.form.get("user_id")
    apk_file = request.files['apk_file']
    filename = secure_filename(apk_file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    apk_file.save(file_path)

    try:
        print("Before analyzing")
        a, d, dx = AnalyzeAPK(file_path)
        # print(jsonify(a))
    except Exception as e:
        os.remove(file_path)
        return jsonify({'error': f'Error analyzing APK file: {str(e)}'})

    result = {}

    result['package_name'] = a.get_package()
    result['version_code'] = a.get_androidversion_code()
    result['version_name'] = a.get_androidversion_name()
    result['permissions'] = a.get_permissions()
    result['activities'] = a.get_activities()
    result['services'] = a.get_services()
    result['receivers'] = a.get_receivers()
    result['providers'] = a.get_providers()

    print(result)

    # Check if the API level returned is different from the API level the APK was built for
    if a.get_effective_target_sdk_version() != a.get_target_sdk_version():
        message = f'Requested API level {a.get_target_sdk_version()} is larger than maximum we have, returning API level {a.get_effective_target_sdk_version()} instead.'
    else:
        message = None

    os.remove(file_path)

    try:
        # Send a GET request to the API endpoint
        # Prepare the data to be sent in the POST request
        input_data = {
            'domain': 'android',
            'tool': 'androguard',
            'input': filename,
            'user_id': user_id,  # Make sure 'user_id' is defined or replace it with the actual value
            'result': result,    # Make sure 'result' is defined or replace it with the actual value
        }

        # Send a POST request to the API endpoint with the input data
        response = requests.post(
            "http://localhost:3001/apii/scans", json=input_data)

        # Check if the request was successful (status code 200)
        # if response == 200:
        # If successful, return the data from the API as JSON
        # Return the extracted information as a JSON response
        # if response:
        return jsonify(result)
        # else:
        #     print(response)
        #     #     # If the request was not successful, return an error message
        #     return jsonify({"error": "Failed to fetch data from the API."}), 500

    except requests.exceptions.RequestException as e:
        print(e)
        # If there's an error with the request, return an error message
        return jsonify({"error": f"Request error: {str(e)}"}), 500


@ app.route('/scan', methods=['POST'])
def scan():
    if 'apk_file' not in request.files:
        return jsonify({'error': 'APK file not provided'})
    # Get the APK file from the request
    apk_file = request.files['apk_file']
    filename = secure_filename(apk_file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    apk_file.save(file_path)
    # Use Androguard to analyze the APK file
    a, d, dx = AnalyzeAPK(file_path)

    # Check for security issues and vulnerabilities
    issues = []

    cert = None
    for entry in d:
        try:
            cert = entry.get_certificate()
            break
        except:
            pass

    # Check if the app uses insecure SSL/TLS certificates
    if cert is None or cert.get_signature_algorithm_oid() != '1.2.840.113549.1.1.5':
        issues.append('The app uses an insecure SSL/TLS certificate.')

    # Check if the app uses hardcoded credentials
    # for cls in dx.get_classes():
    #     for method in cls.get_methods():
    #         if 'login' in method.name.lower() and 'const-string' in [i.get_name() for i in method.get_instructions()]:
    #             issues.append('The app uses hardcoded credentials.')

    # Check if the app uses insecure encryption
    # for cls in dx.get_classes():
    #     for method in cls.get_methods():
    #         if 'cipher' in method.get_name().lower() and 'aes' not in method.get_name().lower():
    #             issues.append('The app uses insecure encryption.')

    # Return the issues found
    if issues:
        return {'issues': issues}, 200
    else:
        return {'message': 'No issues found.'}, 200


@ app.route('/extract_manifest', methods=['POST'])
def extract_manifest():
    if 'apk_file' not in request.files:
        return jsonify({'error': 'APK file not provided'})

    apk_file = request.files['apk_file']
    filename = secure_filename(apk_file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    apk_file.save(file_path)

    try:
        a = APK(file_path)
        print(AXMLPrinter(a.get_android_manifest_axml()))
        manifest_xml = AXMLPrinter(a.get_android_manifest_axml()).get_buff()
    except Exception as e:
        os.remove(file_path)
        return jsonify({'error': f'Error extracting manifest from APK file: {str(e)}'})

    os.remove(file_path)
    # Return the extracted manifest as a string
    return manifest_xml


@ app.route('/visualize_app', methods=['POST'])
def visualize_app():
    if 'apk_file' not in request.files:
        return jsonify({'error': 'APK file not provided'})

    apk_file = request.files['apk_file']
    filename = secure_filename(apk_file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    apk_file.save(file_path)

    try:
        a, d, dx = AnalyzeAPK(file_path)
    except Exception as e:
        os.remove(file_path)
        return jsonify({'error': f'Error analyzing APK file: {str(e)}'})

    # Create the APK graph
    g = APKGraph(d)

    # Perform analysis on the graph
    ga = APKGraphAnalysis(g)

    # Generate a DOT graph of the app behavior
    dot_graph = ga.get_call_graph_dot()

    os.remove(file_path)

    # Return the DOT graph as a string
    return dot_graph


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=False)
