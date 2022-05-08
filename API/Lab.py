from web3 import Web3

ganache_url = 'http://127.0.0.1:7545'
w3 = Web3(Web3.HTTPProvider(ganache_url))
import json
#On déclare l'adresse de la blockchain
abiOffersFile = open('/utils/Offer_ABI.json')
abiSignInFile = open('utils/Sign_in_ABI.json')
account_1 = '0x0dfc155594ddCFbc9269c29AAda459ba41fB7860'
private_key1 = '2510c595ba2f36f0acb76e2451b3c9ea3ea6f10a2a914c9ad7692671cb9745a8'
value = 1
#get the nonce.  Prevents one from sending the transaction twice
nonce = w3.eth.getTransactionCount(account_1)
abi = json.load(abiOffersFile)
contract = w3.eth.contract(address="0x790eEF9E3e198f606a5fd495E9040108132152a6", abi=abi)
transaction = contract.functions.addOffer('0x61E1682be8D8A67b8C1f6AAe113a9E0b97021daB','Historien',value,'dd').buildTransaction({
    'chainId' : 5777,
    'nonce': nonce,
    'value': w3.toWei(value, 'ether'),
    'gas': 2000000,
    'gasPrice': w3.toWei('50', 'gwei')
 })

signed_txn = w3.eth.account.signTransaction(transaction, private_key=private_key1)
w3.eth.sendRawTransaction(signed_txn.rawTransaction)