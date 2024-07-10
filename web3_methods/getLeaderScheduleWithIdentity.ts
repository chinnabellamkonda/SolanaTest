import { Connection } from '@solana/web3.js';

async function getLeaderScheduleWithIdentity(connection: Connection, epoch?: number): Promise<void> {
  try {
    // Fetch the leader schedule for the specified epoch (or current epoch if not specified)
    const leaderSchedule = await connection.getLeaderSchedule(epoch);
    
    if (!leaderSchedule) {
      console.log('No leader schedule found.');
      return;
    }

    // Fetch validator information
    const validators = await connection.getVoteAccounts();

    // Create a map of validator public key to identity and other info
    const validatorInfoMap = new Map<string, any>();
    validators.current.forEach(validator => {
      validatorInfoMap.set(validator.nodePubkey, validator);
    });

    validators.delinquent.forEach(validator => {
      validatorInfoMap.set(validator.nodePubkey, validator);
    });

    // Log the leader schedule with validator identities
    for (const slot in leaderSchedule) {
      const leaders = leaderSchedule[slot];
      leaders.forEach(leader => {
        const validatorInfo = validatorInfoMap.get(leader);
        console.log(`Slot: ${slot}, Leader: ${leader}, Identity: ${validatorInfo?.identity || 'Unknown'}`);
      });
    }
  } catch (error) {
    throw new Error(`Error fetching leader schedule with identity: ${error}`);
  }
}

(async () => {
  // Connect to the Solana mainnet-beta cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Example: Fetch the leader schedule for the current epoch
  try {
    await getLeaderScheduleWithIdentity(connection);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
