import { Connection } from '@solana/web3.js';

(async () => {
  // Connect to the Solana mainnet-beta cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  try {
    // Fetch the current slot leader
    const slotLeaderBuffer = await connection.getSlotLeader();

    // Convert the Buffer to a base58 string representation
    const slotLeaderBase58 = Buffer.from(slotLeaderBuffer).toString('base64');

    console.log('Current Slot Leader:', slotLeaderBase58);
  } catch (error) {
    console.error('Error fetching slot leader:', error);
  }
})();
