# dependecies
import datetime as dt

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func


from flask import Flask, jsonify

# Database Setup
engine = create_engine('sqlite:///../../sqlalchemy-challenge/Resources/hawaii.sqlite')
Base = automap_base()
Base.prepare(engine, reflect=True)

Measurement = Base.classes.measurement
Station = Base.classes.station

session = Session(bind = engine)

# Flask setup
app = Flask(__name__)

@app.route('/')
def index():
    print('Welcome to Hawaii')
    return (
        f'Routes to take!<br>'
        
        f'Here are the routes: <br>'
        f'/api/v1.0/precipitation<br>'
        f'/api/v1.0/stations<br>'
        f'/api/v1.0/tobs<br><br><br>'
)

@app.route('/api/v1.0/precipitation')
def precipitation():
    print('Precipitation data.')
    return (
        f'Aloha!<br>'
)

@app.route('/api/v1.0/stations')
def stations():
    print('List of stations.')
    return (
        f'Aloha!<br>'
)

@app.route('/api/v1.0/tobs')
def tabs():
    print('Monthly temperatures.')
    return (
        f'Aloha!<br>'
)
# @app.route('/api/v1.0/<start>')
#def start():

# @app.route('/api/v1.0/<end>')
#def end():    

if __name__ == '__main__':
    app.run(debug=True)