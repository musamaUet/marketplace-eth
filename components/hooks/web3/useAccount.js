import { useHooks } from "@components/providers/web3"

export const useAccount = () => {

  return useHooks(hooks => {
    console.log('hhokks', hooks)
    return hooks.useAccount();
  })
}