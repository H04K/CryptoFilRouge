// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;


contract Wallet {
    //payable make possible for the address to receive ether
    address payable public owner;

    constructor(){
        owner = payable(msg.sender);
    }

    receive() external payable {}

    function withdraw(uint _amount) external {
        require(msg.sender == owner,"Tu n'es pas nous");
        payable(msg.sender).transfer(_amount);
    }

    function getBalance() external view returns (uint){
        return address(this).balance;
    }


}