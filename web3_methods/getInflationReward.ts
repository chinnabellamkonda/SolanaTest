import { Connection, PublicKey } from '@solana/web3.js';

async function getInflationReward(connection: Connection, epoch: number, validatorAddress: string): Promise<number> {
  try {
    // Convert the validator address to a PublicKey
    const validatorPublicKey = new PublicKey(validatorAddress);

    // Fetch the inflation reward for the validator in the specified epoch
    const inflationReward = await connection.getInflationReward(epoch, validatorPublicKey);

    return inflationReward;
  } catch (error) {
    throw new Error(`Error fetching inflation reward: ${error}`);
  }
}

(async () => {
  // Connect to the Solana local cluster
  const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

  // Example: Fetch inflation reward for epoch 1 and a specific validator address
  const epoch = 2;
  const validatorAddress = '6dmNQ5jwLeLk5REvio1JcMshcbvkYMwy26sJ8pbkvStu';

  try {
    const reward = await getInflationReward(connection, epoch, validatorAddress);
    console.log(`Inflation Reward for Epoch ${epoch}:`, reward);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
