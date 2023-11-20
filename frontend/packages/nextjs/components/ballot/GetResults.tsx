import { useState } from "react";
import tokenJson from "../assets/TokenizedBallot.json";
import { BytesLike, ethers } from "ethers";
import { useContractRead } from "wagmi";

export const GetResult = (params: { contractAddress: `0x${string}`}) => {
  const [triggerRead, setTriggerRead] = useState(false);

  const { data, isError, isLoading } = useContractRead({
    address: params.contractAddress,
    abi: tokenJson.abi,
    functionName: "winnerName",
  });

  const handleButtonClick = () => {
    setTriggerRead(true);
  };

  if (isLoading) return <p>Loading ...</p>;
  if (!data) return <p>Error loading results</p>;

  return (
    <div className="card lg:card-side bg-base-300 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">Winner </h2>

        {!triggerRead && (
          <button className="btn btn-active btn-neutral" onClick={handleButtonClick}>
            Get winner
          </button>
        )}
        {triggerRead && (
          <div>
            <p>Winner is: {ethers.decodeBytes32String(data as BytesLike)}</p>
          </div>
        )}
      </div>
    </div>
  );
};
