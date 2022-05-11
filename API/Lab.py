from web3 import Web3

ganache_url = 'http://127.0.0.1:7545'
w3 = Web3(Web3.HTTPProvider(ganache_url))
import json
#On déclare l'adresse de la blockchain
abiOffersFile = open('utils/Offer_ABIOld.json')
abiSignInFile = open('utils/Sign_in_ABI.json')
# 
#get the nonce.  Prevents one from sending the transaction twice
abi = json.load(abiOffersFile)
contract = w3.eth.contract(address="0x09D1A5a87a29b4f43816622017B2F17836E6D300", abi=abi)

#contract.functions.pay(3).transact({'from': "0x0dfc155594ddCFbc9269c29AAda459ba41fB7860"})
# tx_hash = contract.functions.pay("0x0dfc155594ddCFbc9269c29AAda459ba41fB7860", 1).transact({'from':"0x7f1066541BBBc483442172A8d8186a8920316531"})
# tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
account_1 = '0x0dfc155594ddCFbc9269c29AAda459ba41fB7860'
private_key1 = '2510c595ba2f36f0acb76e2451b3c9ea3ea6f10a2a914c9ad7692671cb9745a8'
# value = 1
nonce = w3.eth.getTransactionCount("0x7f1066541BBBc483442172A8d8186a8920316531")
transaction = contract.functions.pay('0x0dfc155594ddCFbc9269c29AAda459ba41fB7860',1).buildTransaction({
    "nonce":nonce,
    'chainId' : 5777,
    'value': w3.toWei(0, 'ether'),
    'gas': 2000000,
    'gasPrice': w3.toWei('50', 'gwei')
 })

signed_txn = w3.eth.account.signTransaction(transaction,private_key = "1805d6623f2f42450a4702ba6b2ac38e45f9353eef95af1687e0f2fb04eb210c")
w3.eth.sendRawTransaction(signed_txn.rawTransaction)
# contract = w3.eth.contract(address="0x70b8fB23E9cCe96b14ae58FF9d8f0775d1b0c6D8", abi=Offersabi)