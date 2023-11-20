import tokenJson from "../assets/TokenizedBallot.json";
import FormVote from "./FormVote";
import { GetResult } from "./GetResults";
import { formatUnits } from "viem";
import { useContractRead } from "wagmi";

export const CheckHasVotingPower = (params: {
  address: `0x${string}`;
  contractAddress: `0x${string}`;
  proposals: [];
}) => {
  const { data, isError, isLoading } = useContractRead({
    address: params.contractAddress,
    abi: tokenJson.abi,
    functionName: "votingPower",
    args: [params.address],
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  return (
    <>
      <div className="card lg:card-side bg-base-300 shadow-xl mb-4">
        <div className="card-body">
          <h2 className="card-title">Has voting power ? </h2>
          <p>Curent voting power : {formatUnits(data as bigint, 18)}</p>
        </div>
      </div>
      <FormVote contractAddress={params.contractAddress} proposals={params.proposals}></FormVote>
      <GetResult contractAddress={params.contractAddress}></GetResult>
    </>
  );
};
