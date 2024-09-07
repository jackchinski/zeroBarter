# zeroBarter
zerBarter is a trust minimized AMM utilizing the power of storage proofs to cryptographically prove order fulfillment.

This is a project for EthWarsaw 2024. 

Here is my outline for this project thus far: 

1. The user sends out a request for a trade, stating what token they would like to trade what for what token 
2. The market maker sends back a response saying that they can do it and how much of a fee they’re going to charge for it (in real life the user would get back many quotes) - this part is done off chain 
3. The user picks which which market maker’s deal they are going to take, and they send their funds with the address of the MM who’s quote they are choosing to the escrow contract that locks their funds 
4. The MM then sends them the funds that were requested, through another  contract. 
5. The MM sends proof of the transaction taking place, with the right type of asset, amount, and receiving address to the escrow contract. 
6. Once the check passes, the MM unlocks the funds. 


Detailed steps: 

Using socketio for the messaging system between the user and the market maker: 
- [X] Set up a server file 
- [X] Set up a market maker and market maker2 file 
- [X] Set up a user.js file 
- [X] Create an escrow contract to lock your funds in
    - [X] The smart contract needs to let someone lock their funds in the contract and input:(orderId, mmAddress, recipientAddress ( msg.sender), assetTypeIn, assetAmountIn, assetTypeOut, assetAmountOut)
    - [X] Configure that MM file, to then listen to events that are emitted by the smart contract, when a user makes an order, but filter it to only log the events that include the as the market maker 
- [X] Make a transactionReceipt smart contract 
    - [X] The transactionReceipt smart contract allows the market maker to send a transaction through it with the same data as the order requested(orderId, mmAddress (msg.sender), recipientAddress, assetTypeIn, assetAmountIn, assetTypeOut, assetAmountOut)
    - [X] transactionReceipt then saves the data in a mapping 
- [ ] Proof generation file: 
    - [ ] getSlots - to gather the slots for the transactionReceipt file 
    - [ ] sendSlotsToStorageProofs file - to send the request to the storage proofs api
    - [ ] Ngrok url + server to actually receive the status: DONE from storage proofs 
- [ ] sendProofDataToEscrow file, that will send the slot data back to the escrow smart contract 
- [ ] Escrow part 2: 
    - [ ] acceptSlotData function to accept the slot data
    - [ ] Ping the facts registry smart contract to get the slot values from the transactionReceipt smart contract 
    - [ ] Convert the values to their native types
- [ ] ProveOrderFulfillment function 
    - [ ] Gets the order details from the order Id, and then compares all of the values from the order info that it has stored to the order info that is passed from the facts registry smart contract, 
    - [ ] If all checks out it will pay out the market maker the funds that were filled out automatically 

Nice to have: 
- An easier way to input order data, when creating an order, and when responding to a user’s order
- A small ASCII template that shows something like “welcome to the AMM” 
- 

Next steps: 
- Withdrawing the order that hasn’t been fulfilled (need to prove that the order has not been fulfilled).
- auto checking that the information that is passed by the user in the escrow contract is what the MM agreed on. 
- store the orders in the smart contract under a better key rather than just the orderId, 
- figure out a system for qualifying the asset type in / asset type out, rather than just a number (but also need to make sure that it can be stored in a new storage slot, or I would have to separate the values from each storage slot, but if they're an unknown length, or a varied length per se, then that would be increasingly more difficult then just having a number representation)  


