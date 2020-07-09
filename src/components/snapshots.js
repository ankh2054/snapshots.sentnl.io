import React, { useEffect, useState } from 'react';
import SnapTables from './tablelist'
import { listKeys, listMeta} from '../functions/wasabi'

// Try and find a way to specifcy the bucket
const Snapshots = () => {
    const [snapShots, setSnapshots] = useState([]);
    const [snapShotswaxtest, setsnapShotswaxtest] = useState([]);
    // Chain names to render Headings in tablelist
    const chains = [ 'Mainnet', 'Tesnet' ]


// Create new array for Wasabi
const listKeysWasabi = (result,bucket) => {
    const objectitems = result.map(item => {
        const download_url = 'https://s3.eu-central-1.wasabisys.com/waxtest2/'
        const container = {};
    
        container.Key = item.Key
        container.LastModified = item.LastModified
        container.Size = item.Size
        container.url = download_url + item.Key
        container.bucket = bucket
    
        return container
    })
// Sort objects in array based on LastModified date.
const sortedobjectitems = objectitems.sort((a, b) => b.LastModified - a.LastModified)  
return sortedobjectitems;
}

// Function get all objects from bucket
const getWasabiObjects = (bucket) => {
    //Create the initial promise
    var initializePromise = listKeys(bucket);
    //Set bucketname to add to object array
    var bucketname = bucket
    initializePromise.then(function(result) {
        // Return results which contains new array.
        return listKeysWasabi(result,bucketname)
    }, function(err) {
        console.log(err);
    }).then(function(result) {
        // Handler receives new listKeysWasabi array
        // Pass to react usestate depended on bucket name
        console.log(result)
        if (bucketname === 'waxtest2') {
            setSnapshots(result)
          } else if (bucketname === 'waxtestnet') {
            setsnapShotswaxtest(result)
          } else {
          }
    })
  }

useEffect(() => {
    // Each bucket to download from 
    getWasabiObjects('waxtest2')
    getWasabiObjects('waxtestnet')
    }, [])
    return (
      <>
        <SnapTables
            snapshots={snapShots}
            chain={chains[0]}
            description="Wax Mainnet"
          />
        <SnapTables
            snapshots={snapShotswaxtest}
            chain={chains[1]}
            description="Wax Testnet"
          />
      </>
    );
  }
export default Snapshots 