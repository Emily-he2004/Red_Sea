#import libraries
from flask import Flask, jsonify, request
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline
import numpy as np
import requests
import pandas as pd
import math
import requests