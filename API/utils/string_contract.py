from web3 import Web3
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
    contract = w3.eth.contract(address="0x790eEF9E3e198f606a5fd495E9040108132152a6", abi=Offersabi)
    transaction = contract.functions.addOffer('0x61E1682be8D8A67b8C1f6AAe113a9E0b97021daB',name,reward,description).buildTransaction({
        'chainId' : 5777,
        'nonce': nonce,
        'value': w3.toWei(reward, 'ether'),
        'gas': 2000000,
        'gasPrice': w3.toWei('50', 'gwei')
    })

    signed_txn = w3.eth.account.signTransaction(transaction, private_key=private_key)
    w3.eth.sendRawTransaction(signed_txn.rawTransaction)
    

def getOffer(id:int,user_add:str):
    # ABI -> Contract Application Binary Interface 
    contract = w3.eth.contract(address="0x790eEF9E3e198f606a5fd495E9040108132152a6", abi=Offersabi)
    response = contract.functions.get(id).call()
    return response


