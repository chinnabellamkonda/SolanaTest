import { Connection, PublicKey } from '@solana/web3.js';

(async () => {
  // Connect to the mainnet-beta cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Define the public key of the address you want to get the confirmed signatures for
  const publicKey = new PublicKey('BboRhx7L6PNq5nLmPcrNMgPkmgUZtPumLb62sKq88wmu');

  // Optional: Define a limit for the number of signatures returned
  const startSlot = 60600;
  const endSlot = await connection.getSlot();

  console.log("endSlot============", endSlot)

  try {
    // Get the confirmed signatures for the address
    const confirmedSignatures = await connection.getConfirmedSignaturesForAddress(publicKey, startSlot, endSlot);

    console.log('Confirmed Signatures for Address:', confirmedSignatures);
  } catch (err) {
    console.error('Failed to fetch confirmed signatures for address:', err);
  }
})();
