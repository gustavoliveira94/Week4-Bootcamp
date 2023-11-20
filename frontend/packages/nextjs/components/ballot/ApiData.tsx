import { useEffect, useState } from "react";
import { CheckHasVotingPower } from "./CheckHasVotingPower";
import { DelegateVotingPower } from "./DelegateVotingPower";
import { RequestTokens } from "./RequestTokens";
import { ShowProposals } from "./ShowProposals";

export const ApiData = (params: { walletAddress: `0x${string}` }) => {
  const [tokenContract, settokenContract] = useState<{ address: string }>();
  const [ballotContract, setBallotContract] = useState<{ address: string }>();
  const [proposalsData, setProposalsData] = useState<{ proposals: [] }>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:3001/token-contract-address"),
      fetch("http://localhost:3001/ballot-contract-address"),
      fetch("http://localhost:3001/proposals")
    ])
      .then(responses => {
        return Promise.all(responses.map(res => res.json()));
      })
      .then(data => {
        settokenContract(data[0]);
        setBallotContract(data[1]);
        setProposalsData(data[2]);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading token address from API...</p>;
  if (!tokenContract) return <p>No token address information</p>;
  if (!ballotContract) return <p>No ballot contract address information</p>;
  if (!proposalsData) return <p>No proposals information</p>;

  return (
    <div>
      <div className="card lg:card-side bg-base-300 shadow-xl mb-4">
        <div className="card-body">
          <h2 className="card-title">API Data</h2>
          <p className="mt-0">Token address: {tokenContract?.address}</p>
          <p className="mt-0">Ballot address: {ballotContract?.address}</p>
          <h3 className="mt-0">Request Tokens:</h3>
          <RequestTokens></RequestTokens>
        </div>
      </div>
      <DelegateVotingPower contractAddress={tokenContract?.address as `0x${string}`}></DelegateVotingPower>
      <ShowProposals proposals={proposalsData.proposals}></ShowProposals>
      <CheckHasVotingPower
        address={params.walletAddress as `0x${string}`}
        contractAddress={ballotContract?.address as `0x${string}`}
        proposals={proposalsData.proposals}
      ></CheckHasVotingPower>
    </div>
  );
};
