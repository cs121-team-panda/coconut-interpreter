import os
from flask import Flask
from config import config

def create_app(config_name=None):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    config[config_name].init_app(app)
    app.secret_key = os.urandom(24)

    return app
