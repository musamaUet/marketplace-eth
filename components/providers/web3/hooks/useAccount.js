import { useEffect } from "react";
import useSWR from "swr";

const adminAddresses = {
  "0xa044c76fb6746e275f46d751265510955cac4bce1c540ed51b1f3545936d3324": true,
  "0x2c6fd8fc3812553bc9bd0c5249a0da3f922c0640bd182e26308cf33e1190039f": true
}

export const handler = (web3, provider) => () => {

  const { data, mutate, ...rest } = useSWR(() =>
    web3 ? "web3/accounts" : null,
    async () => {
      const accounts = await web3.eth.getAccounts()
      const account = accounts[0]

      if (!account) {
        throw new Error("Cannot retreive an account. Please refresh the browser.")
      }

      return account
    }
  )

  useEffect(() => {
    const mutator = accounts => mutate(accounts[0] ?? null)
    provider?.on("accountsChanged", mutator)

    return () => {
      provider?.removeListener("accountsChanged", mutator)
    }
  }, [provider])

  return {
      data,
      isAdmin: (
      data && adminAddresses[web3.utils.keccak256(data)]) ?? false,
      mutate,
      ...rest
  }
}