import { useAuth0 } from "@auth0/auth0-react";
import { deleteUser } from "../../../../api";
import { SecurityUpdateOption } from "../../SecurityUpdateOption";
import { DeleteButton } from "../../..";

type SecurityUpdateOptionsProps = {
    updateAction: (fieldName: string) => void;
  };
  
  export const SecurityUpdateOptions: React.FC<SecurityUpdateOptionsProps> = ({
    updateAction,
  }) => {
    const { user, logout } = useAuth0();
  
    async function deleteProfile() {      
      if (user) {
        await deleteUser(user);
        logout({ logoutParams: { returnTo: window.location.origin } });        
      } else {
        console.error(
          "No user is set to be deleted! You should not have access to this!"
        );
      }
    }
  
    return (
      <>
        {["email", "password"].map((field) => (
          <SecurityUpdateOption
            key={field}
            label={field
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
            action={() => {
              updateAction(field);
            }}
          />
        ))}
        <div className="flex flex-row w-10/12 m-auto justify-center gap-5 bg-white p-2 rounded border-10 border-slate-900 my-5">
          <h2 className="text-2xl m-auto">Delete Account</h2>
          <DeleteButton action={deleteProfile} />
        </div>
      </>
    );
  };