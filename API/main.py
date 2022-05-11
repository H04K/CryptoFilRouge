from typing import Optional
from eth_typing import Hash32
from http import HTTPStatus
from fastapi import FastAPI, HTTPException

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
    return {"Api Cryptopher"}

@app.post("/add")
def addOffers(name:str,reward:int,description:str,user_add:str,private_key:str):
    try :
        response = addOffer(name,reward,description,user_add,private_key)
        return(HTTPStatus.OK)
    except: 
        raise HTTPException(status_code=400, detail="Error")
   
       

@app.get("/getOffers")
def getOffers(user_add:str):
    try :
        response = getOffer(user_add)
        return response
    except: 
        raise HTTPException(status_code=400, detail="Error")
   
 

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
            return(HTTPStatus.OK)
        else:
            raise HTTPException(status_code=400, detail="Mauvaise infos")
    else :
        raise HTTPException(status_code=500, detail="erreur")
 
