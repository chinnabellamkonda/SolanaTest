import {
  Connection,
  PublicKey,
  ParsedConfirmedTransaction,
} from '@solana/web3.js';

async function getParsedTransaction(transactionSignature: string) {
  // Connect to the Solana cluster
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  // Fetch and parse the confirmed transaction
  const parsedTransaction: ParsedConfirmedTransaction | null = await connection.getParsedConfirmedTransaction(transactionSignature);

  // Display the parsed transaction
  if (parsedTransaction) {
    console.log('Parsed Transaction:', parsedTransaction);
  } else {
    console.log('Transaction not found or not yet confirmed.');
  }
}

// Replace 'YOUR_TRANSACTION_SIGNATURE_HERE' with the actual transaction signature
const transactionSignature = '5w6EzfU9GjLyUmRmLRRUQd1c1sBUKotP21ehqZT5rw3jqRT3YNF7kz1HJXYCkZ1cYC57C76ETN1XY1F63JE2viGd';

getParsedTransaction(transactionSignature).catch((err) => {
  console.error('Error fetching parsed transaction:', err);
});
