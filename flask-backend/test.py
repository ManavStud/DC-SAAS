from mobsfscan.mobsfscan import MobSFScan
src = 'uploads/java_vuln.java'
scanner = MobSFScan([src], json=True)
scanner.scan()