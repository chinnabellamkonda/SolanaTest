import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction
} from '@solana/web3.js';

(async () => {
  // Connect to the local Solana cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Generate a new random keypair for the transaction
  const from = Keypair.generate();
  const to = Keypair.generate();

  // Airdrop some SOL to the sender account
  const airdropSignature = await connection.requestAirdrop(
    from.publicKey,
    2 * LAMPORTS_PER_SOL
  );

  console.log('Sender pub key:', from.publicKey);
  console.log('Receiver pub key:', to.publicKey);

  // Confirm the airdrop transaction
  await connection.confirmTransaction(airdropSignature);

  // Display balances before transaction
  console.log('Sender balance:', await connection.getBalance(from.publicKey));
  console.log('Receiver balance:', await connection.getBalance(to.publicKey));

  // Create a transaction instruction
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to.publicKey,
      lamports: LAMPORTS_PER_SOL / 2, // Transfer 0.5 SOL
    })
  );

  // Sign and send the transaction
  const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [from]
  );

  console.log('Transaction signature:', signature);

  // Display balances after transaction
  console.log('Sender balance:', await connection.getBalance(from.publicKey));
  console.log('Receiver balance:', await connection.getBalance(to.publicKey));
})();
