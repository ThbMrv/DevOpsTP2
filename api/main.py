import os

import mysql.connector
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mysql_conn = mysql.connector.connect(
    database=os.getenv("MYSQL_DATABASE"),
    user=os.getenv("MYSQL_USER"),
    password=os.getenv("MYSQL_PASSWORD"),
    port=int(os.getenv("MYSQL_PORT", "3306")),
    host=os.getenv("MYSQL_HOST"),
)

mongo_client = MongoClient(
    host=os.getenv("MONGO_HOST"),
    port=int(os.getenv("MONGO_PORT", "27017")),
    username=os.getenv("MONGO_APP_USER"),
    password=os.getenv("MONGO_APP_PASSWORD"),
    authSource=os.getenv("MONGO_AUTH_SOURCE"),
)
mongo_db = mongo_client[os.getenv("MONGO_DB")]
posts_collection = mongo_db[os.getenv("MONGO_COLLECTION")]


@app.get("/")
async def root():
    return {"status": "ok"}


@app.get("/posts")
async def get_posts():
    posts = list(posts_collection.find({}, {"_id": 0}).sort("id", 1))
    return {"posts": posts}


@app.get("/users")
async def get_users():
    cursor = mysql_conn.cursor(dictionary=True)
    cursor.execute("SELECT id, nom, email, date_creation, actif FROM utilisateurs ORDER BY id")
    users = cursor.fetchall()
    cursor.close()
    return {"users": users}
