// SPDX-License-Identifier: MIT
// Working
pragma solidity ^0.8.10;

contract Sender {
    receive() external payable {}
    function balanceInContract() public view returns(uint256) { address myAddress = address(this); return myAddress.balance; } 
    function Fund(address payable _toAddress, uint256 _amountInWei) 
    external payable {
        address myAddress = address(this);
        if (myAddress.balance >= _amountInWei) {
            _toAddress.transfer(_amountInWei);
        }
    }
}
