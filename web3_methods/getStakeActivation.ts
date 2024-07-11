import { Connection, PublicKey } from '@solana/web3.js';

async function getStakeActivation(stakeAccountAddress: PublicKey) {
  // Connect to the Solana cluster (replace with the desired network URL)
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  try {
    // Get stake activation information
    const activationInfo = await connection.getStakeActivation(stakeAccountAddress);

    // Display the activation information
    console.log('Stake Activation Info:', activationInfo);

  } catch (error) {
    console.error('Error fetching stake activation info:', error);
  }
}

// Replace 'YOUR_STAKE_ACCOUNT_ADDRESS_HERE' with the actual stake account address you want to query
const stakeAccountAddress = new PublicKey('CYRJWqiSjLitBAcRxPvWpgX3s5TvmN2SuRY3eEYypFvT');

getStakeActivation(stakeAccountAddress).catch((err) => {
  console.error('Error fetching stake activation info:', err);
});
