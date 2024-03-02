import contract from "@truffle/contract";

export const loadContrat = async (name, provider) => {
  const res = await fetch(`/contracts/${name}.json`);
  const Artifacts = await res.json();

  const _contract = contract(Artifacts);
  _contract.setProvider(provider);

  let deployedcontract = null;
  try {
    deployedcontract = await _contract.deployed();
  } catch (err) {
    console.log(`contract ${name} cannot be loaded`);
  }
  return deployedcontract;
};
