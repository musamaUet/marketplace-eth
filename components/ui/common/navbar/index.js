import { useWeb3 } from "@components/providers";
import Link from "next/link";
import Button from "../button";
import { useAccount } from "@components/hooks/web3/useAccount";
import { useRouter } from "next/router";


export default function Footer() {
  const router = useRouter();
  const web3Api = useWeb3();
  const account = useAccount();

  const { pathname } = router;
  const { connect, isWeb3Loaded, isLoading } = web3Api;


  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8 items-center">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between">
            <div>
              <Link
                href="/"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Home
              </Link>
              <Link
                href="/marketplace"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Marketplace
              </Link>
              <Link
                href="/"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Blogs
              </Link>
            </div>
            <div>
              <Link
                href="/"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                Wishlist
              </Link>
              {isLoading ? (
                <Button disabled={true} onClick={connect}>
                  Loading...
                </Button>
              ) : (isWeb3Loaded && account?.data) ? (
                <Button onClick={connect}>Connect</Button>
              ) : (
                <Button onClick={() => window.open("https://metamask.io/download.html", "_blank")}>
                  Install Metamask
                </Button>
              )}
            </div>
          </div>
        </nav>
      </div>
      {account?.data && !pathname.includes("/marketplace") &&
        <div className="flex justify-end pt-4 sm:px-6 lg:px-8">
          <div className="text-white bg-indigo-600 rounded-md p-2">
            {account.data}
          </div>
        </div>
      }
    </section>
  );
}
