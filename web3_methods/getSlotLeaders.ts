import { Connection } from '@solana/web3.js';

(async () => {
  // Connect to the Solana mainnet-beta cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  try {
    const startSlot = 36000;
    const limit = 10
    // Fetch the slot leaders with start slot to result 10 slots
    const slotLeaders = await connection.getSlotLeaders(startSlot, limit);

    for(let key in slotLeaders){
      let value = slotLeaders[key].toString();
      const slotLeaderBase58 = Buffer.from(value).toString('base64');
      console.log('The slot leader is:', slotLeaderBase58)
    }


  } catch (error) {
    console.error('Error fetching slot leader:', error);
  }
})();
