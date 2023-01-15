import MetaMaskCard from "@/components/connectorCards/MetaMaskCard";
import NetworkCard from "@/components/connectorCards/NetworkCard";
import WalletConnectCard from "@/components/connectorCards/WalletConnectCard";
import { getName } from "@/connectors/utils";
import { useWeb3React } from "@web3-react/core";
import React from "react";

function Home() {
  const { connector, chainId, isActive } = useWeb3React();
  return (
    <div>
      <main className="mx-auto container p-10 ">
        <div className="flex justify-center flex-wrap">
          <MetaMaskCard />
          <WalletConnectCard />
          <NetworkCard />
        </div>
      </main>
    </div>
  );
}

export default Home;
