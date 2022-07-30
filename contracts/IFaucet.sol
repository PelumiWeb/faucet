// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// They cannot inherit from other smart contracts.
//They can only inherit from other interfaces.

//They cannot declare a contructor
//They cannot declare state variables
//all declared function have external.



interface IFaucet {

    function addFunds() external payable;

    function withdraw(uint withdralAmount) external;


}