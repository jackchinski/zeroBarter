import { ethers } from "ethers";
import { env } from "bun";
import { transactionReceiptABI, transactionReceiptAddress } from "../ABI/transactionReceiptABI";
import { startProofProcess } from "..";

// ran by MM in order to start the proof process to withdraw their funds

const provider = new ethers.JsonRpcProvider(env.ETHEREUM_SEPOLIA_RPC_URL);

const handleTransactionEvent = async (transactionInfo: any) => {
  const [orderId, recipientAddress, assetTypeIn, assetAmountIn, assetTypeOut, assetAmountOut, mmAddress, fee, isUsed] =
    transactionInfo;
  console.log("******************************");
  console.log(`* Transaction Receipt: MM Sent Funds *`);
  console.log("******************************");
  console.log(`orderId: ${orderId}`);
  console.log(`usrDstAddress: ${recipientAddress}`);
  console.log(`mmSrcAddress: ${assetTypeIn}`);
  console.log(`amount: ${assetAmountIn}`);
  console.log(`assetTypeOut: ${assetTypeOut}`);
  console.log(`assetAmountOut: ${assetAmountOut}`);
  console.log(`mmAddress: ${mmAddress}`);
  console.log(`fee: ${fee}`);
  console.log(`isUsed: ${isUsed}`);

  try {
    const blockNumber = await provider.getBlockNumber();

    await startProofProcess(orderId, recipientAddress, assetAmountOut, blockNumber);
  } catch (error) {
    console.error("Error getting block number: ", error);
  }
};

async function main() {
  const contract = new ethers.Contract(transactionReceiptAddress, transactionReceiptABI, provider);

  contract.on("MMTransferHappened", (transactionInfo) => {
    handleTransactionEvent(transactionInfo);
  });

  console.log("Listening for Transactions on transactionReceipt on Sepolia Testnet ");
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});

// bun run transactionReceiptListener.ts
