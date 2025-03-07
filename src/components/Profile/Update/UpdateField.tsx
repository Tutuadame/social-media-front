export type UpdateFieldProps = {
  fieldName: string;
  postRequestAction: (fieldName: string) => void;
};

export const UpdateField: React.FC<UpdateFieldProps> = ({
  fieldName,  
  postRequestAction
}) => {

  const updateTypeComponents: Record<string, React.FC<{fieldName:string, postRequestAction: typeof postRequestAction }>> = {};

  const SelectedComponent = updateTypeComponents[fieldName];

  return (
    <>
      <h2 className="m-auto py-5 text-2xl">
        {fieldName.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}{" "}
        Modification
      </h2>
      {SelectedComponent ? (
        <SelectedComponent
          fieldName={fieldName}          
          postRequestAction={postRequestAction}
        />
      ) : null}
    </>
  );
};
