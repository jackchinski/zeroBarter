// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

contract TransactionReceipt {
    mapping(bytes32 => TransactionInfo) public transactions;

    event MMTransferHappened(TransactionInfo transactionInfo);

    struct TransactionInfo {
        uint256 orderId;
        address recipientAddress;
        uint256 assetTypeIn;
        uint256 assetAmountIn;
        uint256 assetTypeOut;
        uint256 assetAmountOut;
        address mmAddress;
        uint256 fee;
        bool isUsed;
    }

    function transferTo(
        uint256 orderId,
        address recipientAddress,
        uint256 assetTypeIn,
        uint256 assetAmountIn,
        uint256 assetTypeOut,
        uint256 fee
    ) external payable {
        require(msg.value > 0, "Funds being sent must exceed 0.");

        bytes32 index = keccak256(abi.encodePacked(orderId, recipientAddress, msg.value));

        require(transactions[index].isUsed == false, "Transfer already processed.");

        transactions[index] = TransactionInfo({
            orderId: orderId,
            recipientAddress: recipientAddress,
            assetTypeIn: assetTypeIn,
            assetAmountIn: assetAmountIn,
            assetTypeOut: assetTypeOut,
            assetAmountOut: msg.value,
            mmAddress: msg.sender,
            fee: fee,
            isUsed: true
        });

        (bool success,) = payable(recipientAddress).call{value: msg.value}(""); // transfer to recipient
        require(success, "Transfer failed.");

        emit MMTransferHappened(transactions[index]);
    }
}
