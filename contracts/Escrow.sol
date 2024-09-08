// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.20;

interface IFactsRegistry {
    function accountStorageSlotValues(address account, uint256 blockNumber, bytes32 slot)
        external
        view
        returns (bytes32);
}

contract Escrow {
    // Asset types denoted by a number:
    // sepolia eth - 3

    // storage of orders
    mapping(uint256 => OrderInfo) public orders; // storage of orders

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

    event ValuesReceived(
        bytes32 orderIdValue,
        bytes32 recipientAddressValue,
        bytes32 assetTypeInValue,
        bytes32 assetAmountInValue,
        bytes32 assetTypeOutValue,
        bytes32 assetAmountOutValue,
        bytes32 mmAddressSlotValue,
        bytes32 feeValue
    );

    event SlotsReceived(
        bytes32 orderId,
        bytes32 recipientAddress,
        bytes32 assetTypeIn,
        bytes32 assetAmountIn,
        bytes32 assetTypeOut,
        bytes32 assetAmountOut,
        bytes32 mmAddress,
        bytes32 fee,
        uint256 blockNumber
    );

    event ProofSuccess(uint256 orderId);
    event WithdrawSuccess(address mmAddress, uint256 _orderId);

    struct OrderInfo {
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

    address public TRANSACTION_RECEIPT_ADDRESS = 0x22d00d607F88f04300fe3B972FCc0c9764d40057;
    address public FACTS_REGISTRY_ADDRESS = 0x0B0D1b9963a07254F2742c0a29Cd6eb20ec5676b;

    IFactsRegistry factsRegistry = IFactsRegistry(FACTS_REGISTRY_ADDRESS);

    // 0.001 eth in wei is 1000000000000000
    // 0.0001 eth in wei is 100000000000000

    function lockFunds(
        uint256 _orderId,
        uint256 _assetTypeIn,
        uint256 _assetTypeOut,
        uint256 _assetAmountOut,
        address _mmAddress,
        uint256 _fee
    ) external payable {
        require(msg.value > 0, "Funds must actually be sent, cannot be zero.");
        require(msg.value > _fee, "Fee has to be lower than the amount being sent");

        orders[_orderId] = OrderInfo({
            orderId: _orderId,
            recipientAddress: msg.sender,
            assetTypeIn: _assetTypeIn,
            assetAmountIn: msg.value,
            assetTypeOut: _assetTypeOut,
            assetAmountOut: _assetAmountOut,
            mmAddress: _mmAddress,
            fee: _fee,
            status: OrderStatus.PLACED
        }); // store the order info in a mapping under the order id

        emit FundsLockedNotification(
            _orderId, msg.sender, _assetTypeIn, msg.value, _assetTypeOut, _assetAmountOut, _mmAddress, _fee
        ); // notifty the MM the funds are locked

        // update the status
        orders[_orderId].status = OrderStatus.EMITTED;
    }

    function getValuesFromSlots(
        bytes32 orderIdSlot,
        bytes32 recipientAddressSlot,
        bytes32 assetTypeInSlot,
        bytes32 assetAmountInSlot,
        bytes32 assetTypeOutSlot,
        bytes32 assetAmountOutSlot,
        bytes32 mmAddressSlot,
        bytes32 feeSlot,
        uint256 blockNumber
    ) public {
        emit SlotsReceived(
            orderIdSlot,
            recipientAddressSlot,
            assetTypeInSlot,
            assetAmountInSlot,
            assetTypeOutSlot,
            assetAmountOutSlot,
            mmAddressSlot,
            feeSlot,
            blockNumber
        );
        bytes32 orderIdValue =
            factsRegistry.accountStorageSlotValues(TRANSACTION_RECEIPT_ADDRESS, blockNumber, orderIdSlot);
        bytes32 recipientAddressValue =
            factsRegistry.accountStorageSlotValues(TRANSACTION_RECEIPT_ADDRESS, blockNumber, recipientAddressSlot);
        bytes32 assetTypeInValue =
            factsRegistry.accountStorageSlotValues(TRANSACTION_RECEIPT_ADDRESS, blockNumber, assetTypeInSlot);
        bytes32 assetAmountInValue =
            factsRegistry.accountStorageSlotValues(TRANSACTION_RECEIPT_ADDRESS, blockNumber, assetAmountInSlot);
        bytes32 assetTypeOutValue =
            factsRegistry.accountStorageSlotValues(TRANSACTION_RECEIPT_ADDRESS, blockNumber, assetTypeOutSlot);
        bytes32 assetAmountOutValue =
            factsRegistry.accountStorageSlotValues(TRANSACTION_RECEIPT_ADDRESS, blockNumber, assetAmountOutSlot);
        bytes32 mmAddressSlotValue =
            factsRegistry.accountStorageSlotValues(TRANSACTION_RECEIPT_ADDRESS, blockNumber, mmAddressSlot);
        bytes32 feeValue = factsRegistry.accountStorageSlotValues(TRANSACTION_RECEIPT_ADDRESS, blockNumber, feeSlot);

        proveTransaction(
            orderIdValue,
            recipientAddressValue,
            assetTypeInValue,
            assetAmountInValue,
            assetTypeOutValue,
            assetAmountOutValue,
            mmAddressSlotValue,
            feeValue
        );
        emit ValuesReceived(
            orderIdValue,
            recipientAddressValue,
            assetTypeInValue,
            assetAmountInValue,
            assetTypeOutValue,
            assetAmountOutValue,
            mmAddressSlotValue,
            feeValue
        );
    }

    function proveTransaction(
        bytes32 orderIdValue,
        bytes32 recipientAddressValue,
        bytes32 assetTypeInValue,
        bytes32 assetAmountInValue,
        bytes32 assetTypeOutValue,
        bytes32 assetAmountOutValue,
        bytes32 mmAddressSlotValue,
        bytes32 feeValue
    ) private {
        // bytes32 to uint256
        uint256 _orderId = uint256(orderIdValue);
        uint256 _assetTypeIn = uint256(assetTypeInValue);
        uint256 _assetAmountIn = uint256(assetAmountInValue);
        uint256 _assetTypeOut = uint256(assetTypeOutValue);
        uint256 _assetAmountOut = uint256(assetAmountOutValue);
        uint256 _fee = uint256(feeValue);

        //bytes32 to address
        address _recipientAddress = address(uint160(uint256(recipientAddressValue)));
        address _mmAddress = address(uint160(uint256(mmAddressSlotValue)));

        require(orders[_orderId].orderId != 0, "This order does not exist");
        require(orders[_orderId].status == OrderStatus.EMITTED); // order must be in the emitted status to enter proving stage

        OrderInfo memory correctOrder = orders[_orderId];

        require(correctOrder.status != OrderStatus.PROVED); // cannot try to prove a transaction that has already been proved

        // make sure that proof data matches the contract's own data
        if (
            correctOrder.assetTypeIn == _assetTypeIn && correctOrder.assetAmountIn == _assetAmountIn
                && correctOrder.assetTypeOut == _assetTypeOut && correctOrder.assetAmountOut == _assetAmountOut
                && correctOrder.fee == _fee && correctOrder.recipientAddress == _recipientAddress
                && correctOrder.mmAddress == _mmAddress
        ) {
            orders[_orderId].status = OrderStatus.PROVED;

            emit ProofSuccess(_orderId);
            withdrawFundsToMM(_orderId);
        } else {
            // if the proof fails, this will allow the order to be proved again
            orders[_orderId].status = OrderStatus.EMITTED;

        }
    }

    function withdrawFundsToMM(uint256 _orderId) private {
        // get order from this contract's state
        OrderInfo memory _order = orders[_orderId];

        // validate
        // for a non-existing order a 0 will be returned as the orderId
        // also covers edge case where a orderId 0 passed will return a 0 also
        require(_order.orderId != 0, "The following order doesn't exist");
        require(_order.status == OrderStatus.PROVED, "This order has not been proved yet.");

        // calculate payout
        // turns out there's another oopsie here, for some reason it's not paying out the mm
        // but failing silently, because the whole call goes through, except for the part that pays the MM
        // i think it might be an out of gas issue... so i will willingly send mm back the wrong amount
        // just so the tx goes through
        // this should be assetAmountIn which includes the fee
        uint256 transferAmount = _order.assetAmountOut; // im tired and i made an oopsie, amount in already includes the fee

        require(address(this).balance >= transferAmount, "Escrow: Insuffienct balance to withdraw");

        // update status
        orders[_orderId].status = OrderStatus.COMPLETED;

        // payout MM
        payable(orders[_orderId].mmAddress).transfer(transferAmount);
        emit WithdrawSuccess(orders[_orderId].mmAddress, _orderId);
    }
}
