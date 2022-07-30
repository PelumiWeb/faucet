// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


// It is a way for designer to say that any child of the abstract contract has to implemtn specified methods

abstract contract Logger {
    uint public testNum;

    constructor() {
        testNum = 100;
    }

function emitLog() public pure virtual returns(bytes32);
    function test3() external pure returns(uint) {
    return 100;

}

}