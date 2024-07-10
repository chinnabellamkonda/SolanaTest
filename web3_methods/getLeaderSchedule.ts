import { Connection } from '@solana/web3.js';

async function getLeaderSchedule(connection: Connection, epoch?: number): Promise<void> {
  try {
    // Fetch the leader schedule for the specified epoch (or current epoch if not specified)
    const leaderSchedule = await connection.getLeaderSchedule(epoch);

    // Log the leader schedule
    console.log('Leader Schedule:', leaderSchedule);
  } catch (error) {
    throw new Error(`Error fetching leader schedule: ${error}`);
  }
}

(async () => {
  // Connect to the Solana local cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Example: Fetch the leader schedule for the current epoch
  try {
    await getLeaderSchedule(connection);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
