// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Storage {

    mapping (uint => uint) public aa; // slot 0
    mapping (address => uint) public bb; // slot 1

    uint[] public cc; // slot 2

    uint8 public a = 7;
    uint16 public b = 20;
    address public c = 0x247B0745d98B074EBAC1e6672E7031a86aF514a3;

    bool d = true;
    uint64 public e = 15;
    uint256 public f = 200;
    uint8 public g = 40;
    uint256 public h = 789;

     constructor () {
        cc.push(1);
        cc.push(10);
        cc.push(100);

        aa[2] =4;
        aa[3] = 10;
        bb[0xD2466DBcb61e0b98675006A19581E77Cc78B736f] = 100;
    }
    
}