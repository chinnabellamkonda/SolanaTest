import { Connection } from '@solana/web3.js';

(async () => {
  // Connect to the local cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Get the cluster nodes information
  const clusterNodes = await connection.getClusterNodes();

  if (clusterNodes) {
    console.log('Cluster Nodes Information:', clusterNodes);
  } else {
    console.log('Failed to fetch cluster nodes information.');
  }
})();
