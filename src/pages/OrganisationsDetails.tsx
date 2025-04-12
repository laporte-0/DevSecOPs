import { useParams } from "react-router-dom";

const mockProjectsByOrg = {
  org1: ["Scanner AI", "SécuAudit Front", "Bot Defender"],
  org2: ["Smart Monitor", "Cyber Dashboard"],
};

export default function OrganizationDetails() {
  const { orgId } = useParams();
  const projects =
    mockProjectsByOrg[orgId as keyof typeof mockProjectsByOrg] || [];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Organisation: {orgId}</h2>
      <h3 className="text-lg font-semibold mb-2">Projets associés :</h3>
      {projects.length > 0 ? (
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          {projects.map((project, index) => (
            <li key={index}>{project}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">
          Aucun projet associé à cette organisation.
        </p>
      )}
    </div>
  );
}
