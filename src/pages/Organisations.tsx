import { useState } from "react";
import { Plus, Trash } from "lucide-react";
import { Link } from "react-router-dom";

interface Organization {
  id: string;
  name: string;
}

export default function Organizations() {
  const [organizations, setOrganizations] = useState<Organization[]>([
    { id: "org1", name: "CyberDevOps" },
    { id: "org2", name: "AI Monitoring" },
  ]);
  const [newOrg, setNewOrg] = useState("");

  const handleCreate = () => {
    if (newOrg.trim() === "") return;
    const newEntry = {
      id: Date.now().toString(),
      name: newOrg.trim(),
    };
    setOrganizations([...organizations, newEntry]);
    setNewOrg("");
  };

  const handleDelete = (id: string) => {
    setOrganizations((prev) => prev.filter((org) => org.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Mes organisations</h2>

      <div className="space-y-2 mb-6">
        {organizations.map((org) => (
          <Link
            key={org.id}
            to={`/organizations/${org.id}`}
            className="flex items-center justify-between border px-4 py-2 rounded hover:bg-gray-100 transition text-gray-800"
          >
            <span>{org.name}</span>
            <span className="text-sm text-blue-500">Voir ➜</span>
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newOrg}
          onChange={(e) => setNewOrg(e.target.value)}
          placeholder="Nouvelle organisation"
          className="flex-1 px-3 py-2 border rounded"
        />
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" /> Créer
        </button>
      </div>
    </div>
  );
}
