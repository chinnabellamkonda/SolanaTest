import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

async function getStakeMinimumDelegation() {
  // Connect to the Solana cluster (replace with the desired network URL)
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  try {
    // Get the minimum SOL required for stake delegation
    const minimumBalanceLamports = await connection.getMinimumBalanceForRentExemption(200); // 200 bytes for a typical stake account

    // Convert lamports to SOL (1 SOL = 10^9 lamports)
    const minimumBalanceSOL = minimumBalanceLamports / LAMPORTS_PER_SOL;

    // Display the minimum stake delegation amount
    console.log('Minimum Stake Delegation (in SOL):', minimumBalanceSOL);

    const stakeMinimumDelegation = await connection.getStakeMinimumDelegation();

    console.log("stakeMinimumDelegation===", stakeMinimumDelegation)

  } catch (error) {
    console.error('Error fetching minimum stake delegation amount:', error);
  }
}

getStakeMinimumDelegation().catch((err) => {
  console.error('Error fetching minimum stake delegation amount:', err);
});
