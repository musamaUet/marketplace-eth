import { handler as createUseAccount } from "./useAccount";

const DEFAULT_HOOKS = {
    useAccounts: () => ({ account: null })
}
export const setupHooks = (web3) => {
    if(!web3) { return DEFAULT_HOOKS; }

    return { useAccount: createUseAccount(web3) }
}