import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

// Function to get account information
async function getAccountInfo(pubkey: string) {
    // Connect to the Solana Devnet
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    // Convert the public key string to a PublicKey object
    const publicKey = new PublicKey(pubkey);

    // Fetch the account information
    const accountInfo = await connection.getAccountInfoAndContext(publicKey);

    if (accountInfo) {
        console.log('Account Info:', accountInfo);
    } else {
        console.log('Account not found.');
    }
}

// Replace with the public key of the account you want to check
const publicKey = 'E1AzzUTZGqfnsUj2DhnLxduzFwaPMEJmcD2jHH9UbRgf';
//E1AzzUTZGqfnsUj2DhnLxduzFwaPMEJmcD2jHH9UbRgf
//6BWvtunHVWRLabQh69tkJ6yuJ7mH316tiqXv7s9DAHKa

// Call the function to get account information
getAccountInfo(publicKey).catch((err) => {
    console.error(err);
});
