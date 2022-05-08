// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.7;

contract test {

    string public text = "show me";
    uint nombre;
    string public greet = "Hello World!";
    function get_numb() public view returns(uint){
        return nombre;
    }

    function set_texte(string memory _new_texte) public{
       text = _new_texte;
    }
    
    function  re() public view returns (string memory) {
        return text;
    }

}

