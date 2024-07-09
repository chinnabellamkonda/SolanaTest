import { Connection } from '@solana/web3.js';

(async () => {
  // Connect to the Solana mainnet-beta cluster
  const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

  try {
    // Fetch the epoch information
    const epochInfo = await connection.getEpochInfo();

    console.log('Epoch Info:', epochInfo);
  } catch (error) {
    console.error('Error fetching epoch info:', error);
  }

  // Specify the epoch ID you want to fetch (example epoch ID)
  const epochId = 5;

  try {
    // Fetch the current epoch schedule
    const epochSchedule = await connection.getEpochSchedule();
    
    // Calculate the start slot of the specified epoch
    const epochStartSlot = epochSchedule.firstNormalEpoch + (epochId - epochSchedule.firstNormalEpoch) * epochSchedule.slotsPerEpoch;
    
    // Fetch the epoch info using the start slot
    const epochInfo = await connection.getEpochInfo({ commitment: 'confirmed', epochStartSlot });

    console.log(`Epoch Info for Epoch ${epochId}:`, epochInfo);
  } catch (error) {
    console.error('Error fetching epoch info:', error);
  }
})();