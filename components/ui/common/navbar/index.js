import { useWeb3 } from "@components/providers";
import Link from "next/link";
import Button from "../button";
import { useAccount } from "@components/hooks/web3";
import { useRouter } from "next/router";
import ActiveLink from "../link";


export default function Navbar() {
  const router = useRouter();
  const web3Api = useWeb3();
  const { account } = useAccount();

  const { pathname } = router;
  const { connect, isLoading, requireInstall } = web3Api;

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8 items-center">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between">
            <div>
              <ActiveLink
                href="/"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                <span>Home</span>
              </ActiveLink>
              <ActiveLink
                href="/marketplace"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                <span>Marketplace</span>
              </ActiveLink>
              <ActiveLink
                href="/blogs"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                <span>Blogs</span>
              </ActiveLink>
            </div>
            <div>
              <ActiveLink
                href="/"
                className="font-medium mr-8 text-gray-500 hover:text-gray-900"
              >
                <span>Wishlist</span>
              </ActiveLink>
              {isLoading ? (
                <Button disabled={true} onClick={connect}>
                  Loading...
                </Button>
              ) : account?.data ? (
                <Button
                  hoverable={false}
                  className="cursor-default">
                  Hi there {account.isAdmin && "Admin"}
                </Button>
              ) : requireInstall ? (
                <Button onClick={() => window.open("https://metamask.io/download.html", "_blank")}>
                  Install Metamask
                </Button>
              ) :
                <Button
                  onClick={connect}>
                  Connect
                </Button>
              }
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
