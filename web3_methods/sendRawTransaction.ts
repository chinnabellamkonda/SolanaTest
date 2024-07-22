import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Keypair } from '@solana/web3.js';

// Establish connection to the Solana cluster
const connection = new Connection('http://localhost:8899', 'confirmed');

async function sendRawTransaction(sender: Keypair, receiver: Keypair, amount: number) {
  try {
    // Fetch recent blockhash (required for transaction construction)
    const { blockhash } = await connection.getRecentBlockhash();

   const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: receiver.publicKey,
      lamports: amount * LAMPORTS_PER_SOL, // Amount in lamports (1 SOL = 1,000,000,000 lamports)
    })
  );

  // Set the recent blockhash
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = sender.publicKey;

    // Sign the transaction
  const signers = [sender, sender];
  const signature = await connection.sendTransaction(transaction, signers);

    console.log("signature=========", signature)

    // Encode the transaction to send as raw bytes
    const rawTransaction = transaction.serialize();
console.log("rawTransaction=====", rawTransaction)
    // Send the raw transaction to the Solana network
    const rawSignature = await connection.sendRawTransaction(rawTransaction);

    console.log('Transaction confirmed with signature:', rawSignature);
    console.log('Transaction sent successfully');
  } catch (error) {
    console.error('Error sending raw transaction:', error);
  }
}

async function main() {
  // Generate a new keypair for the sender account
  const senderKeypair = Keypair.fromSecretKey(Uint8Array.from([
  243, 189, 117, 220,   8,  44, 132, 162,  12,  34,  49,
  222, 174, 180, 147, 239, 179, 251, 139, 147, 181, 212,
  189,  92, 184,  79,  91,   9,  10,  36, 188, 242, 199,
  202,   2, 233, 222,  21,  81, 167, 110, 181, 207,  79,
  133,   8,  36,  14,  80,  95, 106,  96, 194, 120,  26,
    3, 146, 155,  71, 245, 216, 245, 100, 160
]));
  // Generate a new keypair for the recipient account (for example purposes)
  const recipientKeypair = Keypair.fromSecretKey(Uint8Array.from([
   62,  59,  46,  66, 108,  96,  28,  75, 215, 26, 235,
  239,  62, 128, 143,  99, 126,  22, 236, 133, 24, 244,
   42,  17, 255,   0, 222, 236, 178, 241, 191, 22, 245,
  117, 118, 107,  46,  23, 246,  51, 206,  51, 73, 246,
  138,  96, 110,  48, 115,  94,  10, 226,  48, 95, 163,
  148, 192, 182, 129, 108, 125, 190, 213, 107
]));
  const recipientPubkey = recipientKeypair.publicKey;

  // Airdrop SOL to the sender account to cover transaction fees
  // const senderBal = await connection.requestAirdrop(senderKeypair.publicKey, 10); // Request 10 SOL
// console.log("senderBal===", senderBal)
  // Fund the recipient account using the sender's keypair
  const lamportsToTransfer = 1; // 1 SOL in lamports
  await sendRawTransaction(senderKeypair, recipientKeypair, lamportsToTransfer);
  console.log('Recipient account funded successfully.');

  // Print out the sender and recipient public keys for reference
  console.log('Sender public key:', senderKeypair.publicKey.toBase58());
  console.log('Recipient public key:', recipientPubkey.toBase58());
}

main().catch((error) => {
  console.error('Error funding recipient account:', error);
});
