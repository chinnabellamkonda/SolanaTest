import { Connection, PublicKey, Transaction, TransactionInstruction, sendAndConfirmRawTransaction } from '@solana/web3.js';
import { Keypair } from '@solana/web3.js';

// Establish connection to the Solana cluster
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

async function sendRawTransaction(sender: Keypair, recipientPubkey: PublicKey, amount: number) {
  try {
    // Fetch recent blockhash (required for transaction construction)
    const { blockhash } = await connection.getRecentBlockhash();

    // Example: Create a transaction instruction to transfer SOL
    const transactionInstruction = SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: recipientPubkey,
      lamports: amount, // Amount in lamports (1 SOL = 1,000,000,000 lamports)
    });

    // Example: Create a transaction with the instruction
    const transaction = new Transaction().add(transactionInstruction);

    // Sign the transaction
    transaction.recentBlockhash = blockhash;
    transaction.sign(sender);

    // Encode the transaction to send as raw bytes
    const rawTransaction = transaction.serialize();

    // Send the raw transaction to the Solana network
    const signature = await sendAndConfirmRawTransaction(connection, rawTransaction);

    console.log('Transaction confirmed with signature:', signature);
    console.log('Transaction sent successfully');
  } catch (error) {
    console.error('Error sending raw transaction:', error);
  }
}

async function main() {
  // Generate a new keypair for the sender account
  const senderKeypair = Keypair.generate();

  // Generate a new keypair for the recipient account (for example purposes)
  const recipientKeypair = Keypair.generate();
  const recipientPubkey = recipientKeypair.publicKey;

  // Airdrop SOL to the sender account to cover transaction fees
  await connection.requestAirdrop(senderKeypair.publicKey, 10 * 1000000000); // Request 10 SOL

  // Fund the recipient account using the sender's keypair
  const lamportsToTransfer = 5 * 1000000000; // 5 SOL in lamports
  await sendRawTransaction(senderKeypair, recipientPubkey, lamportsToTransfer);
  console.log('Recipient account funded successfully.');

  // Print out the sender and recipient public keys for reference
  console.log('Sender public key:', senderKeypair.publicKey.toBase58());
  console.log('Recipient public key:', recipientPubkey.toBase58());
}

main().catch((error) => {
  console.error('Error funding recipient account:', error);
});
