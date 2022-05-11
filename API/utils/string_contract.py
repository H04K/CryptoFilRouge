from web3 import Web3
from http import HTTPStatus
from fastapi import FastAPI, HTTPException
import json
#On déclare l'adresse de la blockchain
abiOffersFile = open('./utils/Offer_ABI.json')
abiSignInFile = open('./utils/Sign_in_ABI.json')
Offersabi = json.load(abiOffersFile)

w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))

def addOffer(name:str,reward:int,description:str,user_add:str,private_key:str):
    # ABI -> Contract Application Binary Interface 
    ## Define contract adress on blockchain
    nonce = w3.eth.getTransactionCount(user_add)
    #0x19D9c19E5F43FE1080fb2Df4254166F4ad766f8B
    #0x790eEF9E3e198f606a5fd495E9040108132152a6 old
    #0x79f18Dc935FCa9a8Ea1944158b71A6Da4B6db197 with all ads
    #0x70b8fB23E9cCe96b14ae58FF9d8f0775d1b0c6D8 with ads and adress

    contract = w3.eth.contract(address="0x70b8fB23E9cCe96b14ae58FF9d8f0775d1b0c6D8", abi=Offersabi)
    transaction = contract.functions.addOffer('0x61E1682be8D8A67b8C1f6AAe113a9E0b97021daB',name,reward,description).buildTransaction({
        'chainId' : 5777,
        'nonce': nonce,
        'value': w3.toWei(reward, 'ether'),
        'gas': 2000000,
        'gasPrice': w3.toWei('50', 'gwei')
    })

    signed_txn = w3.eth.account.signTransaction(transaction, private_key=private_key)
    w3.eth.sendRawTransaction(signed_txn.rawTransaction)
    return(HTTPStatus.OK)
    
    

def getOffer(user_add:str):
    # ABI -> Contract Application Binary Interface 
    contract = w3.eth.contract(address="0x70b8fB23E9cCe96b14ae58FF9d8f0775d1b0c6D8", abi=Offersabi)
    response = contract.functions.getAds().call()
    res = []
    for i in response:
        if i[1] != 'name':
            res.append({"id":i[0],"name":i[1],"reward":i[2],"description":i[3],"adress_vendeur":i[4]})
    return res


