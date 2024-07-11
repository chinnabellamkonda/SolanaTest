import {
  Connection,
  PublicKey,
  ParsedConfirmedTransaction,
} from '@solana/web3.js';

async function getParsedTransactions(transactionSignatures: string[]) {
  // Connect to the Solana cluster
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  // Array to store parsed transactions
  const parsedTransactions: (ParsedConfirmedTransaction | null)[] = [];

  // Fetch and parse each transaction
  await Promise.all(
    transactionSignatures.map(async (signature) => {
      try {
        const parsedTransaction = await connection.getParsedConfirmedTransaction(signature);
        parsedTransactions.push(parsedTransaction);
      } catch (error) {
        console.error(`Error fetching or parsing transaction ${signature}:`, error);
        parsedTransactions.push(null);
      }
    })
  );

  // Display parsed transactions
  parsedTransactions.forEach((parsedTransaction, index) => {
    if (parsedTransaction) {
      console.log(`Parsed Transaction ${index + 1}:`, parsedTransaction);
    } else {
      console.log(`Transaction ${index + 1} not found or not yet confirmed.`);
    }
  });
}

// Example transaction signatures array
const transactionSignatures = [
  '5w6EzfU9GjLyUmRmLRRUQd1c1sBUKotP21ehqZT5rw3jqRT3YNF7kz1HJXYCkZ1cYC57C76ETN1XY1F63JE2viGd',
  '5w6EzfU9GjLyUmRmLRRUQd1c1sBUKotP21ehqZT5rw3jqRT3YNF7kz1HJXYCkZ1cYC57C76ETN1XY1F63JE2viGd',
  // Add more transaction signatures as needed
];

getParsedTransactions(transactionSignatures).catch((err) => {
  console.error('Error fetching or parsing transactions:', err);
});
