import { Connection } from '@solana/web3.js';

(async () => {
  // Connect to the Solana mainnet-beta cluster
  const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

  try {
    // Fetch the epoch schedule
    const epochSchedule = await connection.getEpochSchedule();

    console.log('Epoch Schedule:', epochSchedule);
  } catch (error) {
    console.error('Error fetching epoch schedule:', error);
  }
})();
