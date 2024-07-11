import { Connection, ConfirmedTransaction, TransactionSignature } from "@solana/web3.js";

// Replace with your connection endpoint (e.g. devnet, mainnet-beta)
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// Replace with the transaction signature you want to get details for
const transactionSignature: TransactionSignature = "5w6EzfU9GjLyUmRmLRRUQd1c1sBUKotP21ehqZT5rw3jqRT3YNF7kz1HJXYCkZ1cYC57C76ETN1XY1F63JE2viGd";

async function getParsedTransactionDetails() {
  try {
    const parsedTransaction: ConfirmedTransaction | null = await connection.getParsedConfirmedTransaction(transactionSignature);

    if (parsedTransaction) {
      console.log("Transaction details:", parsedTransaction);
      console.log("Blockhash:", parsedTransaction.transaction.message.recentBlockhash);
      console.log("Block time:", parsedTransaction.blockTime);
      console.log("Meta information:", parsedTransaction.meta);
      console.log("Transaction instructions:", JSON.stringify(parsedTransaction.transaction.message.instructions));
      parsedTransaction.transaction.message.instructions.forEach((instruction) => {
        console.log("Program id:", instruction.programId.toString());
        // console.log("Keys:", instruction.keys.map((key) => key.pubkey.toString()));
        // console.log("Data:", instruction.data);
      });
    } else {
      console.log("Transaction not found or not yet confirmed.");
    }
  } catch (error) {
    console.error("Error fetching transaction:", error);
  }
}

getParsedTransactionDetails();
