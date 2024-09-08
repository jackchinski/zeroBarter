# zeroBarter

zeroBarter is a trust minimized AMM utilizing the power of storage proofs to cryptographically prove order fulfillment.

This is a project for EthWarsaw 2024.

1. The problem with current AMMs - slippage, bonding curves, impermanent loss, bad UX for you when you want to trade for the asset that the pool is low on.
2. A more natural way to swap - simple RFQ system, the recipient talks directly to the Market Maker, they offer them a trade, and the market maker responds back with a quote, the recipient is able to pick the quote that is best for them from multiple market makers. Additionally, this architecture could be used to offer any kind of digital asset to be swapped for any other kind, that is on a blockchain. Even cooler, is these smart contracts could be deployed on different chains, like trading your crypto punk on ethereum, to receive eth on Optimism, and then have low gas transactions. All this would require is one escrow contract being deployed on the source chain, and the transactionReceipt on the destination chain of where you would like to receive your funds. Cross chain swapping, with anyone that is tuned into the platform, and listening to trade offers that are coming in.
3. The Technology used to power zeroBarter - zero barter is written is solidity, currently deployed on eth sepolia, to eth sepolia, and it transacts sepolia eth, but any token could be accepted with this architecture. The RFQ system, is a simple design that is powered by socketio, so that the recipient can communicate with multiple market makers. The proof system is powered by the Storage Proofs API, that ensures that the MM is only able to withdraw the locked funds after a successful fulfilment of the order that is created by the user on the Escrow smart contract.
4. How it works
   1. Recipient sends a request for a swap and broadcasts it to MMs that are listening
   2. MMs send back a quote and, the user is able to pick the one they prefer the most
   3. Recipient then locks up their funds in the escrow smart contract
   4. MM is notified that the recipient has chosen their quote, and gets a notification that the recipient locked up their funds
   5. The MM then makes a transfer to the recipient through the transactionReceipt smart contract which saves the transfer data
   6. The MM sends a proof of the transaction that happened through the transactionReceipt smart contract to the storage proofs api
   7. The MM sends the proof once it’s complete back to the escrow
   8. The escrow verifies the transaction with the data it stored when the user made the order, and if all checks out then the MM is paid
5. Next steps:
   1. Actually automating the quoting by MMs, such that they can automatically quote orders, and users can automatically choose from within the quotes.
   2. escape hatch for an order that hasn’t been fulfilled after the recipient locks their funds (need to prove that the order has not been
   3. support a wide array of tokens, which would include multiple escrow smart contracts on multiple
   4. same with multiple transactionReceipt contracts, to also allow a user to receive their funds on another
   5. support even digital assets as a form that can be
   6. auto checking that the information that is passed by the user in the escrow contract is what the MM agreed
   7. store the orders in the smart contract under a better key rather than just the
   8. figure out a system for qualifying the asset type in / asset type out, rather than just a number (but also need to make sure that it can be stored in a new storage slot, or I would have to separate the values from each storage slot, but if they're an unknown length, or a varied length per se, then that would be increasingly more difficult then just having a number
   9. have a better communication system between the market maker and the
   10. the fee is not needed in the smart contracts, since i have assetAmountIn and asssetAmountOut therefore fee = assetAmountIn - assetAmountOut... overlooked this, and don't really want to remove everything
   11. create more security, add reenterancy guard to the functions that are public in the smart contracts

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
- [x] deploy the escrow contract
- [x] test the whole flow, order creation to payout
- [] hard code the fee values in the socketio market maker files
- [x] make the forge script files to make calls to the contracts
- [x] make the slides for a presentation
- [x] record a demo video
- [x] record me talking over the slides
- [x] upload to youtube
- [x] submit project

Nice to have:

- An easier way to input order data, when creating an order, and when responding to a user’s order
- A small ASCII template that shows something like “welcome to the AMM”
