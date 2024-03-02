import { createContext, useContext, useEffect, useMemo, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import { setupHooks } from "./hooks/setupHooks";
import { loadContrat } from "@utils/loadContract";

const Web3Context = createContext(null);

export default function Web3Provider({ children }) {
  const [web3Api, setWeb3Api] = useState({
    provider: null,
    web3: null,
    contract: null,
    isLoading: false,
    hooks: setupHooks()
  });

  useEffect(() => {
    const loadProvider = async () => {
      if (typeof window !== "undefined") {
        const provider = await detectEthereumProvider();
        if (provider) {
          const web3 = new Web3(provider);
          const contract = await loadContrat('CourseMarketplace', web3);
          console.log('loadContract', contract);
          setWeb3Api({
            web3,
            provider,
            contract: contract,
            isLoading: false,
            hooks: setupHooks(web3, provider)
          });
        } else {
          setWeb3Api((api) => ({
            ...api,
            isLoading: false,
          }));
          console.log("Metamask Error: please install metamask");
        }
      }
    };

    loadProvider();
  }, []);

  const _web3Api = useMemo(() => {
    const { web3, provider, isLoading } = web3Api
    return {
        ...web3Api,
        // isWeb3Loaded: web3Api.web3 != null,
        requireInstall: !isLoading && !web3 ,
        connect: provider ? async () => {
            try {
                console.log('console.log account connect');
                await provider.request({method: 'eth_requestAccounts'});
            } catch(err) {
                console.error('cannot retrieve accounts');
                location.reload();
            }
        } :  () => console.error('could not connect to metamask'),
    }
  }, [web3Api])

  return (
    <Web3Context.Provider value={_web3Api}>{children}</Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
}

export function useHooks(cb) {
    const { hooks } = useWeb3();
    return cb(hooks)
  }
  