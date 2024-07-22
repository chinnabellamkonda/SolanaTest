import { Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';

(async () => {
  // Connect to the testnet cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Generate a new keypair for the wallet
  const wallet = Keypair.generate()

  // Request an airdrop of 1 SOL (1 SOL = 1_000_000_000 lamports)
  const airdropSignature = await connection.requestAirdrop(wallet.publicKey, LAMPORTS_PER_SOL);

  // Confirm the transaction
  await connection.confirmTransaction(airdropSignature);

  const balance = await connection.getBalance(wallet.publicKey)

  console.log('Airdrop successful! Transaction signature:', airdropSignature);
  console.log('Wallet public key:', wallet.publicKey.toBase58());
  console.log('Wallet balance:', balance);
})();
