# Install Packages within a virtual env so as to enable easier work environments using same package versioning
Setting up Virtual Environment (if you want):
	- pip3 install virtualenv
    - virtualenv -p python3 env
    - source env/bin/activate

# Creating the virtual env "env" and activate it
pip3 install flask flask-sqlalchemy
pip3 install -U flask-cors

# Create your DB
Manually creating your DB:
	- python3 
	- from api.datatypes import Score
    - from api.datatypes import Direction
	- from api import db, create_app 
	- db.create_all(app=create_app())

export FLASK_APP=api export FLASK_DEBUG=1
flask run --host=0.0.0.0

# ------------------------------------- React ------------------------------------
# remember to enter react_frontend subfolder
npm install
npm install p5




