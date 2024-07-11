import { Connection } from '@solana/web3.js';

async function getSignatureStatuses(transactionSignatures: string[]) {
  // Connect to the Solana cluster (replace with the desired network URL)
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  try {
    // Get the statuses of multiple transaction signatures
    const statuses = await connection.getSignatureStatuses(transactionSignatures);
console.log("statuses=====", JSON.stringify(statuses))
    // Display the statuses
    statuses.value.forEach((status, index) => {
      console.log(`Signature ${index + 1} Status:`, status);
    });

  } catch (error) {
    console.error('Error fetching signature statuses:', error);
  }
}

// Replace with an array of actual transaction signatures you want to query
const transactionSignatures = [
  '4yszkUjysbaqTP9cy58d6ek4DF18LjjTqPe9krT7EJbHcAN7zJUCBM3g992Wi4rdh5sUDsqcSmBohL3KEbGGKaFV',
  '4yszkUjysbaqTP9cy58d6ek4DF18LjjTqPe9krT7EJbHcAN7zJUCBM3g992Wi4rdh5sUDsqcSmBohL3KEbGGKaFV',
  // Add more transaction signatures as needed
];

getSignatureStatuses(transactionSignatures).catch((err) => {
  console.error('Error fetching signature statuses:', err);
});
