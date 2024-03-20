# Check if npm version 14 or greater is installed
npm_version=$(npm -v)
if [[ $(echo "$npm_version >= 14" | bc -l) -eq 0 ]]; then
    # Install npm version 14 or greater
    curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Check if python-pip is installed
if ! command -v pip3 &> /dev/null; then
    # Install python-pip
    sudo apt-get install -y python3-pip
fi

# Check if virtualenv is installed
if ! command -v virtualenv &> /dev/null; then
    # Install virtualenv
    sudo pip3 install virtualenv
fi

# Change to the frontend directory
cd frontend

# Install npm packages for frontend
npm install

# Change back to the root folder
cd ..

# Change to the node-backend directory
cd node-backend

# Install npm packages for node-backend
npm install

# Install whatweb
sudo apt-get install whatweb

# Install pylint
sudo apt-get install pylint

# Change back to the root folder
cd ..

# Change to the flask-backend directory
cd flask-backend

# Create a virtual environment and activate it
virtualenv venv
source venv/bin/activate

# Install requirements using pip
pip3 install -r requirements.txt
