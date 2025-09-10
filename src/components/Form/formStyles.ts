export const FORM_STYLES = {
  container: "flex flex-col mx-auto w-1/3 gap-y-10",
  fieldContainer: "flex flex-row w-full justify-between bg-slate-800 p-5 rounded-xl shadow-xl",
  label: "text-2xl font-normal text-white my-auto",
  input: "w-[13vw] border-4 border-slate-400 p-3 rounded-xl focus:outline-none",
  buttonContainer: "flex flex-row w-full",
  submitButton: "w-1/3 h-fit bg-slate-400 text-white text-3xl tracking-widest p-3 transition-all font-light mx-auto rounded-xl hover:outline hover:outline-4 hover:outline-offset-4",
  errorMessage: "text-red-500 text-sm mt-1"
} as const;