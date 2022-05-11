// SPDX-License-Identifier: MIT


pragma solidity ^0.8.7;
pragma experimental ABIEncoderV2;

contract Offers {
  struct Ads{
    uint id;
    string name;
    uint reward;
    string description;
  }
  mapping (uint => Ads) public ads;
  event votedEvent(uint indexed _OffersId);
  uint public OffersCount;

 constructor() public {
    OffersCount = 0;
   
  }
  function addOffer(address payable _toAddress,string memory _name,uint _reward , string memory _description) external payable {
      
        address myAddress = msg.sender;
        if (myAddress.balance >= _reward) {
            _toAddress.transfer(_reward);
        }
    ads[OffersCount] = Ads(OffersCount,_name,_reward,_description);
    OffersCount++;
  }
  
 
  //return Single structure
  function get(uint _OffersId) public view returns(Ads memory) {
    return ads[_OffersId];
  }
}