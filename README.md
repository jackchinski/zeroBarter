# zeroBarter

zerBarter is a trust minimized AMM utilizing the power of storage proofs to cryptographically prove order fulfillment.

This is a project for EthWarsaw 2024.

Here is my outline for this project thus far:

1. The user sends out a request for a trade, stating what token they would like to trade what for what token
2. The market maker sends back a response saying that they can do it and how much of a fee they’re going to charge for it (in real life the user would get back many quotes) - this part is done off chain
3. The user picks which which market maker’s deal they are going to take, and they send their funds with the address of the MM who’s quote they are choosing to the escrow contract that locks their funds
4. The MM then sends them the funds that were requested, through another contract.
5. The MM sends proof of the transaction taking place, with the right type of asset, amount, and receiving address to the escrow contract.
6. Once the check passes, the MM unlocks the funds.

Detailed steps:

Using socketio for the messaging system between the user and the market maker:

- [x] Set up a server file
- [x] Set up a market maker and market maker2 file
- [x] Set up a user.js file
- [x] Create an escrow contract to lock your funds in
  - [x] The smart contract needs to let someone lock their funds in the contract and input:(orderId, mmAddress, recipientAddress ( msg.sender), assetTypeIn, assetAmountIn, assetTypeOut, assetAmountOut)
  - [x] Configure that MM file, to then listen to events that are emitted by the smart contract, when a user makes an order, but filter it to only log the events that include the as the market maker
- [x] Make a transactionReceipt smart contract
  - [x] The transactionReceipt smart contract allows the market maker to send a transaction through it with the same data as the order requested(orderId, mmAddress (msg.sender), recipientAddress, assetTypeIn, assetAmountIn, assetTypeOut, assetAmountOut)
  - [x] transactionReceipt then saves the data in a mapping
- [ ] Proof generation file:
  - [x] getSlots - to gather the slots for the transactionReceipt file
  - [x] sendSlotsToStorageProofs file - to send the request to the storage proofs api
  - [x] Ngrok url + server to actually receive the status: DONE from storage proofs
- [x] sendProofDataToEscrow file, that will send the slot data back to the escrow smart contract
- [ ] Escrow part 2:
  - [x] acceptSlotData function to accept the slot data
  - [x] Ping the facts registry smart contract to get the slot values from the transactionReceipt smart contract
  - [x] Convert the values to their native types
- [x] ProveOrderFulfillment function
  - [x] Gets the order details from the order Id, and then compares all of the values from the order info that it has stored to the order info that is passed from the facts registry smart contract,
  - [x] If all checks out it will pay out the market maker the funds that were filled out automatically
- [] deploy the transactionReceipts contract and add the address into the escrow contract
- [] deploy the escrow contract
- [] test the whole flow, order creation to payout
- [] hard code the fee values in the socketio market maker files
- [] make the forge script files to make calls to the contracts
- [] make the slides for a presentation
- [] record a demo video
- [] record me talking over the slides

Nice to have:

- An easier way to input order data, when creating an order, and when responding to a user’s order
- A small ASCII template that shows something like “welcome to the AMM”
-

Next steps (version X):

- escape hatch for an order that hasn’t been fulfilled after the recipient locks their funds (need to prove that the order has not been fulfilled).
- support a wide array of tokens, which would include multiple escrow smart contracts on multiple chains
- same with multiple transactionReceipt contracts, to also allow a user to receive their funds on another chain
- support even digital assets as a form that can be exchanged
- auto checking that the information that is passed by the user in the escrow contract is what the MM agreed on.
- store the orders in the smart contract under a better key rather than just the orderId,
- figure out a system for qualifying the asset type in / asset type out, rather than just a number (but also need to make sure that it can be stored in a new storage slot, or I would have to separate the values from each storage slot, but if they're an unknown length, or a varied length per se, then that would be increasingly more difficult then just having a number representation)
- have a better communication system between the market maker and the recipient
- the fee is not needed in the smart contracts, since i have assetAmountIn and asssetAmountOut therefore fee = assetAmountIn - assetAmountOut... overlooked this, and don't really want to remove everything now
- create more security, add reenterancy guard to the functions that are public in the smart contracts
- 

still possible to do:

- add a way to be able to enter a ens either for the MM or for the user, and it will resolve to an address when making calls
- save on db forest instead of local?
- don't add a forge deploy script, but add a forge script to make the function calls to smart contracts to make them easy to make
-
