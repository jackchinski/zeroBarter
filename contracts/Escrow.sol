// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

//
contract Escrow {
    // Asset types denoted by a number:
    // sepolia eth - 3

    // storage of orders
    mapping(uint256 => orderInfo) public orders; // storage of orders

    // events
    event FundsLockedNotification(
        uint256 orderId,
        address recipientAddress,
        uint256 assetTypeIn,
        uint256 assetAmountIn,
        uint256 assetTypeOut,
        uint256 assetAmountOut,
        address mmAddress,
        uint256 fee
    );

    struct orderInfo {
        uint256 orderId;
        address recipientAddress;
        uint256 assetTypeIn;
        uint256 assetAmountIn;
        uint256 assetTypeOut;
        uint256 assetAmountOut;
        address mmAddress;
        uint256 fee;
        OrderStatus status;
    }

    enum OrderStatus {
        PLACED,
        EMITTED,
        PROVING,
        PROVED,
        COMPLETED,
        DROPPED
    }

    function lockFunds(
        uint256 orderId,
        uint256 assetTypeIn,
        uint256 assetAmountIn,
        uint256 assetTypeOut,
        uint256 assetAmountOut,
        address mmAddress,
        uint256 fee
    ) external payable {
        require(msg.value > 0, "Funds must actually be sent, cannot be zero.");
        require(msg.value > fee, "Fee has to be lower than the amount being sent");

        orders[orderId] = orderInfo({
            orderId: orderId,
            recipientAddress: msg.sender,
            assetTypeIn: assetTypeIn,
            assetAmountIn: assetAmountIn,
            assetTypeOut: assetTypeOut,
            assetAmountOut: assetAmountOut,
            mmAddress: mmAddress,
            fee: fee,
            status: OrderStatus.PLACED
        }); // store the order info in a mapping under the order id

        emit FundsLockedNotification(
            orderId, msg.sender, assetTypeIn, assetAmountIn, assetTypeOut, assetAmountOut, mmAddress, fee
        ); // notifty the MM the funds are locked

        // update the status 
        orders[orderId].status = OrderStatus.EMITTED;
    }
}
