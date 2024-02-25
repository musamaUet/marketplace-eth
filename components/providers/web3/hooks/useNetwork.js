import { useEffect } from 'react';
import useSwr from 'swr';

const NETWORKS = {
    1: "Ethereum Main Network",
    3: "Ropsten Test Network",
    4: "Rinkeby Test Network",
    5: "Goerli Test Network",
    42: "Kovan Test Network",
    56: "Binance Smart Chain",
    1337: "Ganache",
  }

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID];

export const handler = (web3, provider) => () => {
    const { mutate, data, error, ...rest } = useSwr(() => 
        web3 ? 'web3/network' : null,
        async () => {
            const chainId = await web3.eth.getChainId()
            return NETWORKS[chainId]
        }
    )

    useEffect(() => {
        provider && provider.on('chainChanged', (networkId) => mutate(parseInt(networkId, 16)));
    }, [web3])

    return {
        data,
        mutate,
        targetNetwork: targetNetwork,
        isSupported: data === targetNetwork,
        hasInitialResponse: data || error,
        ...rest
    }
}