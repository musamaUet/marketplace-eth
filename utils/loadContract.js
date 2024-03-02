// import contract from "@truffle/contract";

const NETWORK_ID = process.env.NEXT_PUBLIC_TARGET_NETWORK_ID;

export const loadContrat = async (name, web3) => {
  const res = await fetch(`/contracts/${name}.json`);
  const Artifacts = await res.json();

  let contract = null;
console.log('artifacts', Artifacts);
console.log('NETWORK_ID', web3);
  try {
    contract = new web3.eth.Contract(Artifacts.abi, Artifacts.networks[NETWORK_ID].address);
    console.log('contract', contract);

    return contract
  } catch(err) {
    console.log('load contract err', err);
    return contract;
  }
};

// export const loadContrat = async (name, provider) => {
//   const res = await fetch(`/contracts/${name}.json`);
//   const Artifacts = await res.json();

//   // const _contract = contract(Artifacts);
//   const _contract = window.TruffleContract(Artifacts);
//   _contract.setProvider(provider);

//   let deployedcontract = null;
//   try {
//     deployedcontract = await _contract.deployed();
//   } catch (err) {
//     console.log(`contract ${name} cannot be loaded`);
//   }
//   return deployedcontract;
// };
