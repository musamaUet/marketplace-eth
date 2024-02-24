import { useEffect } from 'react';
import useSwr from 'swr';

export const handler = (web3, provider) => () => {
    const { mutate, ...rest } = useSwr(() => 
        web3 ? 'web3/network' : null,
        async () => {
            const networkId = await web3.eth.net.getId();
            return networkId;
        }
    )

    useEffect(() => {
        provider && provider.on('chainChanged', (networkId) => mutate(networkId));
    }, [web3])

    return {
        network: {
            mutate,
            ...rest
        }
    }
}