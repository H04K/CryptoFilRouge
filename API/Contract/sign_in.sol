// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;
pragma experimental ABIEncoderV2;

contract SignIn {
  struct Credentials{
    uint id;
    string adress;
    string private_key;
    string hash_password;
  }
   uint public id;
   mapping (uint => Credentials) public credentials;
   constructor() public{
       id = 0;
   }

  function Sign(string memory _adress,string memory _private_key , string memory _hash_password) public {
    credentials[id] = Credentials(id,_adress, _private_key, _hash_password);
    id ++;
  }
  
        
 function stringsEquals(string memory s1, string memory s2) private pure returns (bool) {
    bytes memory b1 = bytes(s1);
    bytes memory b2 = bytes(s2);
    uint256 l1 = b1.length;
    if (l1 != b2.length) return false;
    for (uint256 i=0; i<l1; i++) {
        if (b1[i] != b2[i]) return false;
    }
    return true;
}
  //return Single structure
  function get(string memory _add) public view returns(bool) {
    string memory succes = "succes";
    string memory failed = "failed";

    return stringsEquals(credentials[0].adress,_add);
  }
}
