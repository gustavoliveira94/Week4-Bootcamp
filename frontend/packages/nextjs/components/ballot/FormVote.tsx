import { useState } from "react";
import tokenJson from "../assets/TokenizedBallot.json";
import { parseUnits } from "viem";
import { useContractWrite } from "wagmi";

const FormVote = (params: { contractAddress: `0x${string}`; proposals: [] }) => {
  // State for the form
  const [selectedProposal, setSelectedProposal] = useState("");
  const [amount, setAmount] = useState("");

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: params.contractAddress,
    abi: tokenJson.abi,
    functionName: "vote",
    args: [selectedProposal, parseUnits(amount, 18)],
  });

  return (
    <div className="card lg:card-side bg-base-300 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">Vote </h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            write?.();
          }}
        >
          <div className="mb-2">
            {params.proposals.map((proposal: string, index: number) => (
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">{proposal}</span> 
                <input
                  type="radio"
                  className="radio"
                  name={proposal}
                  value={index}
                  key={index}
                  checked={selectedProposal === index.toString()}
                  onChange={() => setSelectedProposal(index.toString())}
                />
              </label>
            </div>
            ))}

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Amount?</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={amount}
                onChange={e => setAmount(e.target.value.replace(/\D/,''))}
              />
            </div>
          </div>

          <button className="btn btn-active btn-neutral" type="submit" disabled={!write || isLoading}>
            Submit Vote
          </button>
        </form>

        {isSuccess && (
          <div>
            <p>Submitted transaction:</p>
            <a href={`https://sepolia.etherscan.io/tx/${data?.hash}`} target="_blank">
              Etherscan
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormVote;
