import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction
} from '@solana/web3.js';

(async () => {
  // Connect to the cluster
  const connection = new Connection('http://localhost:8899', 'confirmed');

  // Generate sender and recipient keypairs
  const senderKeypair = Keypair.fromSecretKey(Uint8Array.from([
  219, 205, 206, 144,  93, 241,  55,  31,  62, 210, 112,
  191,  55, 201,  67, 192,  64,  76,  12,  98, 215, 160,
   64, 210, 192,   4, 149,  44, 129,  46, 151, 241, 184,
  240, 150,  14, 211, 214,  61, 212, 122,  40, 161, 116,
  159, 137,  84,  87, 170, 150,  88,  23,  19,  86, 227,
  192, 154,  17,  85, 196, 230, 145,  29,  90
]));
  const recipientPubkey = new PublicKey('9CsrfpiWxsAJQmqCPPZcqENnYMDFLfSq7hd6ZfKfaaJw');

  // Fetch recent blockhash
  const { blockhash } = await connection.getRecentBlockhash();

  // Create a transaction
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: senderKeypair.publicKey,
      toPubkey: recipientPubkey,
      lamports: 1 * LAMPORTS_PER_SOL, // Amount in lamports (1 SOL = 1,000,000,000 lamports)
    })
  );

  // Set the recent blockhash
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = senderKeypair.publicKey;

  // Sign the transaction
  // Sign and send the transaction
  const signers = [senderKeypair, senderKeypair];
  const signature = await connection.sendTransaction(transaction, signers);
  console.log("signature======", signature) 
  // Simulate the transaction
  const simulateResult = await connection.simulateTransaction(transaction);
  if (simulateResult.value.err) {
    console.error('Transaction simulation failed:', simulateResult.value.err);
  } else {
    console.log('Transaction simulation succeeded');

    // Send the transaction
    const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);
    console.log('Transaction confirmed with signature:', signature);
  }
})();
