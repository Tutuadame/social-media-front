import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { UpdateFieldProps } from "../UpdateField";
import { updateSecurityInfo } from "../../../../api";

export const PasswordUpdate: React.FC<UpdateFieldProps> = ({
  fieldName,
  postRequestAction,
}) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { user } = useAuth0();

  const onSubmit = async () => {
    const id = user?.sub?.split("|")[1] || "";
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    await updateSecurityInfo(id, fieldName, password)
    postRequestAction("");
  };

  return (
    <div className="flex flex-col gap-2 w-1/2 m-auto">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New password"
        className="border p-2 rounded"
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm new password"
        className="border p-2 rounded"
      />
      {error && <span className="text-red-500">{error}</span>}
      <button
        onClick={onSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Update Password
      </button>
    </div>
  );
};
