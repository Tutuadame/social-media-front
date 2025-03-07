import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { UpdateFieldProps } from "../UpdateField";
import { updateSecurityInfo } from "../../../../api";

export const EmailUpdate: React.FC<UpdateFieldProps> = ({ fieldName, postRequestAction }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const {user} = useAuth0();

  const onSubmit = async () => {
    const id = user?.sub?.split("|")[1] || "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format check
    if (!emailRegex.test(email)) {
      setError("Invalid email address.");
      return;
    }
    setError("");
    await updateSecurityInfo(id, fieldName, email);
    postRequestAction("");
  };

  return (
    <div className="flex flex-col gap-2 w-1/2 m-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="New email"
        className="border p-2 rounded"
      />
      {error && <span className="text-red-500">{error}</span>}
      <button
        onClick={onSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Update Email
      </button>
    </div>
  );
};