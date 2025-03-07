type EditableFieldProps = {
  label: string;
  action: ()=> void
};

export const SecurityUpdateOption: React.FC<EditableFieldProps> = ({ label, action }) => {  
  return (
    <div className="flex flex-row items-center gap-0 w-3/4 justify-between m-auto p-2">
      <>
        <span className="text-xl">{label}</span>
        <button
          onClick={action}
          className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-500"
        >
          Update
        </button>
      </>
    </div>
  );
};
