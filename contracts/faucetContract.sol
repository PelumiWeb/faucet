// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Owned.sol";
import "./Logger.sol";
import "./IFaucet.sol";



contract Faucet is Owned, Logger, IFaucet{

    //This is a special function
    //It's called when you make a tx that doesn't spacify function name to call

    //External function are part of the contract interface which means they can be called via contracts amd other txs.
    uint public numOfFounders;
    mapping(address => bool) private funders;
    mapping(uint => address) private lutfunders;

    // address public owner;

    // constructor() {
    //     owner = msg.sender;
    // }

   

    modifier limitWithdraw(uint withdralAmount) {
         require(
            withdralAmount <= 100000000000000000, 
            "Cannot withdra more than 0.1 ether"
            );

            _;
    }

    receive() external payable {}

    // function transferOwnership(address newOwner) external onlyOwner{
    //     owner = newOwner;
    // }

    function emitLog() public override pure returns(bytes32) {
        return "Hello world";
    }

    function addFunds() override external payable {
        address funder = msg.sender;
        // funders.push(msg.sender);
        if (!funders[funder]) {
          uint index = numOfFounders++;
            // numOfFounders++;
            funders[funder] = true;
            lutfunders[index] = funder;
        }
        // uint index = numOfFounders++;
        // funders[index] = msg.sender;
    }
    //Admin
    function test1() external onlyOwner {
        //some managing stuff that only admin should have access to
    }

    //Non-admin
    function test2() external onlyOwner {
            //some managing stuff that only admin should have access to
        }
    function withdraw(uint withdralAmount) external override limitWithdraw(withdralAmount){
        payable(msg.sender).transfer(withdralAmount);
    }

    function getAllFunders() external view returns(address[] memory) {
        // return funders;
        address[] memory _funders = new address[](numOfFounders);
        for (uint i = 0; i < numOfFounders; i++) {
            _funders[i] = lutfunders[i];
        }
        return _funders;
    }

    function getFunderAtIndex(uint8 index) external view returns(address) {
        // address[] memory _funders = getAllFunders();
        return lutfunders[index];
    }

//  function justTesting() external pure returns(uint) {
//     return 2 + 2;
//  }

 //pure, view - read-only-call, no gas fee
 /// view - it indicates that the function will not alter the storage state in any way.
 // pure - even more strict, indicating that it won't even read the storage state
}  

//Block info
//Nonce - a hash that when combiined with the minHash proofs that the block has gone through proof of work (POW)
//8 bytes => 64 bits 

// 2000000000000000000