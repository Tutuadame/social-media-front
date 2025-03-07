import { PageTitle } from "../../../PageTitle";
import { useState } from "react";
import { UpdateField } from "../../Update/UpdateField";
import { SecurityUpdateOptions } from "./SecurityUpdateOptions";
export const SecurityProfile = () => {
  const [updateField, setUpdateField] = useState("");

  return (
    <div className="flex flex-col w-full max-w-lg m-auto bg-slate-200 p-2 rounded border-25 border-slate-900">
      {updateField === "" ? (
        <>
          <PageTitle content="Security" />
          <div className="flex flex-col gap-4">
            <SecurityUpdateOptions updateAction={setUpdateField} />
          </div>
        </>
      ) : (
        <>
          <UpdateField
            fieldName={updateField}            
            postRequestAction={setUpdateField}
          />
        </>
      )}
    </div>
  );
};
