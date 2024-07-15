import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';

async function getParsedTokenAccountsByOwnerExample(ownerAddress: string) {
  // Connect to the Solana cluster
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  try {
    // Convert the owner address to a PublicKey
    const ownerPublicKey = new PublicKey(ownerAddress);

    // Fetch the token accounts by owner
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(ownerPublicKey, {
      programId: TOKEN_PROGRAM_ID,
    });

    console.log(`Found ${tokenAccounts.value.length} token accounts for owner ${ownerAddress}:`);

    // Iterate through the token accounts and print details
    tokenAccounts.value.forEach(({ pubkey, account }) => {
      const accountData = account.data.parsed.info;
      console.log(`Account Address: ${pubkey.toBase58()}`);
      console.log(`Mint: ${accountData.mint}`);
      console.log(`Owner: ${accountData.owner}`);
      console.log(`Token Amount: ${accountData.tokenAmount.uiAmount}`);
    });
  } catch (error) {
    console.error('Error fetching token accounts by owner:', error);
  }
}

const ownerAddress = '9mLs5EGBtCfEEV1wFuRAZwmyVQes7zTSqbvUbi25FD7P';

getParsedTokenAccountsByOwnerExample(ownerAddress).catch((err) => {
  console.error('Error fetching token accounts by owner:', err);
});
