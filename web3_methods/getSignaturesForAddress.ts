import { Connection, PublicKey } from '@solana/web3.js';

async function getSignaturesForAddress(address: PublicKey) {
  // Connect to the Solana cluster (replace with the desired network URL)
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  try {
    // Get transaction signatures associated with the address
    const signatures = await connection.getSignaturesForAddress(address);

    // Display the signatures
    console.log('Signatures for Address:', signatures);

  } catch (error) {
    console.error('Error fetching signatures for address:', error);
  }
}

// Replace 'YOUR_PUBLIC_KEY_HERE' with the actual public key (address) you want to query
const address = new PublicKey('BboRhx7L6PNq5nLmPcrNMgPkmgUZtPumLb62sKq88wmu');

getSignaturesForAddress(address).catch((err) => {
  console.error('Error fetching signatures for address:', err);
});
