import { Connection, PublicKey } from '@solana/web3.js';

async function getLatestValidators(connection: Connection): Promise<string[]> {
  try {
    // Fetch the latest list of validators
    const validators = await connection.getVoteAccounts();

    // Extract validator public keys
    const validatorAddresses = validators.current.concat(validators.delinquent).map(account => account.nodePubkey);

    return validatorAddresses;
  } catch (error) {
    throw new Error(`Error fetching latest validators: ${error}`);
  }
}

(async () => {
  // Connect to the Solana mainnet-beta cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  try {
    const latestValidators = await getLatestValidators(connection);
    console.log('Latest Validator Addresses:', latestValidators);
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
