import { Connection, SendOptions, Keypair, Transaction, SystemProgram, clusterApiUrl } from "@solana/web3.js";

// Replace with your connection endpoint (e.g. devnet, mainnet-beta)
const connection = new Connection('http://localhost:8899', "confirmed");

// Generate a new keypair for the sender (or load an existing one)
const sender = Keypair.generate();
const bal = await connection.requestAirdrop(sender.publicKey, 10 * 1000000000); 
console.log("bal:--", bal)
// Generate a new keypair for the receiver
const receiver = Keypair.generate();


// Fetch the recent blockhash
  const { blockhash } = await connection.getRecentBlockhash();

  // Create a transaction
  const transaction = new Transaction({
    recentBlockhash: blockhash, // Set the recent blockhash
    feePayer: sender.publicKey, // Set the fee payer
  }).add(
    SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: receiver.publicKey,
      lamports: 1, // Amount in lamports (1 SOL = 1,000,000,000 lamports)
    })
  );
console.log("transaction======", transaction)
// Sign the transaction with the sender's keypair
await transaction.sign(sender);

// Serialize the transaction
const serializedTransaction = await transaction.serialize();

console.log("serializedTransaction======", serializedTransaction)

// Convert the serialized transaction to a base64 string
const base64Transaction = await serializedTransaction.toString('base64');

console.log("serializedTransaction======", base64Transaction)

// Optional options (e.g., skipPreFlight)
const options: SendOptions = {};

async function sendSignedTransaction() {
  try {
    const txid = await connection.sendEncodedTransaction(base64Transaction, options);
    console.log("Transaction sent:", txid);
  } catch (error) {
    if (error.name === 'SendTransactionError') {
      // If SendTransactionError, fetch and log transaction logs
      const logs = await connection.getLogs(error.txId);
      console.error('SendTransactionError:', error.message);
      console.error('Transaction Logs:', logs);
    } else {
      // Handle other errors
      console.error('Error:', error.message);
    }
  }
}

sendSignedTransaction();
