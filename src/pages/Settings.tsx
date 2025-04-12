import { useState } from "react";
import { updateProfile, updateEmail } from "firebase/auth";
import { auth } from "../Config/firebaseConfigs";

export default function Settings() {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      if (user) {
        await updateProfile(user, {
          displayName,
          photoURL,
        });

        if (user.email !== email) {
          await updateEmail(user, email);
        }

        setMessage("✅ Profil mis à jour avec succès.");
      }
    } catch (err: any) {
      console.error(err);
      setError("❌ Erreur lors de la mise à jour : " + err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Paramètres de profil</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Nom affiché</label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Adresse Email</label>
          <input
            type="email"
            className="w-full border px-4 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">
            Photo de profil (URL)
          </label>
          <input
            type="text"
            className="w-full border px-4 py-2 rounded"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
        </div>
        {photoURL && (
          <div className="mt-2">
            <img
              src={photoURL}
              alt="preview"
              className="w-16 h-16 rounded-full object-cover border"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enregistrer les modifications
        </button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}
