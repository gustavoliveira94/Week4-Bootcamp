export const ShowProposals = (params: { proposals: [] }) => {

  return (
    <div className="card lg:card-side bg-base-300 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">Proposals </h2>
        {params.proposals.map((proposal: string, index: number) => (
          <p className="m-0" key={index}>{proposal}</p>
        ))}
      </div>
    </div>
  );
};
