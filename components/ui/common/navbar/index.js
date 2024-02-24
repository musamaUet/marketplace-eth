import { useWeb3 } from "@components/providers";
import Link from "next/link";
import Button from "../button";
import { useAccount } from "@components/web3/hooks/useAccount"

export default function Footer() {
  const web3Api = useWeb3();
  const { web3, connect, isWeb3Loaded, isLoading } = web3Api;
  const { account } = useAccount();

  console.log('accounts', isWeb3Loaded, isLoading);

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8 items-center">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between">
            <div>
              <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                Home
              </Link>
              <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                Marketplace
              </Link>
              <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                Blogs
              </Link>
            </div>
            <div>
              <Link href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                Wishlist
              </Link>
              { isLoading ?
                <Button disabled={true} onClick={connect}>Loading...</Button>
                : isWeb3Loaded ?
                <Button
                  onClick={connect}>Connect</Button>
                :
                <Button onClick={() => window.open("https://metamask.io/download.html", "_blank")}>
                  Install Metamask
                </Button>
              }
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
}
