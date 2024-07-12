import { Connection, PublicKey } from '@solana/web3.js';
import { getAccount, TOKEN_PROGRAM_ID } from '@solana/spl-token';

async function getTokenAccountsByOwner(ownerAddress: string) {
  // Connect to the Solana cluster (replace with the desired network URL)
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  try {
    // Convert the owner's address to a PublicKey
    const ownerPublicKey = new PublicKey(ownerAddress);

    // Get the token accounts by owner
    const tokenAccounts = await connection.getTokenAccountsByOwner(ownerPublicKey, {
      programId: TOKEN_PROGRAM_ID
    });

    // Iterate through token accounts and fetch details
    for (const tokenAccount of tokenAccounts.value) {
      const tokenAccountInfo = await getAccount(connection, tokenAccount.pubkey, TOKEN_PROGRAM_ID);
      console.log('Token Account Address:', tokenAccount.pubkey.toBase58());
      console.log('Mint:', tokenAccountInfo.mint.toBase58());
      console.log('Amount:', tokenAccountInfo.amount.toString());
    }
  } catch (error) {
    console.error('Error fetching token accounts by owner:', error);
  }
}

// Replace 'YOUR_OWNER_ADDRESS_HERE' with the actual owner's address you want to query
const ownerAddress = '9mLs5EGBtCfEEV1wFuRAZwmyVQes7zTSqbvUbi25FD7P';

getTokenAccountsByOwner(ownerAddress).catch((err) => {
  console.error('Error fetching token accounts by owner:', err);
});
