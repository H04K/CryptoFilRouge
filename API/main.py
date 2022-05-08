from typing import Optional
from eth_typing import Hash32

from fastapi import FastAPI
from utils.string_contract import addOffer,getOffer
import json
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:8000"
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/add")
def addOffers(name:str,reward:int,description:str,user_add:str,private_key:str):
    response = addOffer(name,reward,description,user_add,private_key)
    return response

@app.get("/getOffers")
def getOffers(id:int,user_add:str):
    response = getOffer(id,user_add)
    return response

@app.post('/login')
def login(adress:str,private_key:str,password:str):
    # Opening JSON file
    f = open('private_key.json')
    # returns JSON object as
    # a dictionary
    data = json.load(f)
    result = [x for x in data if x["adress"]==adress]
    private_key = Hash32(private_key)
    print(private_key)
    print(result)
    if result[0]['private_key'] == private_key:
        if result[0]['password'] == password:
            return('succes')
        else:
            return("error")
    else :
        return("error")
 
