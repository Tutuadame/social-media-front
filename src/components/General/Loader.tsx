export const Loader = () => {
  
  const loaderStyle = "w-24 h-24 border-16 border-slate-300 rounded-full border-t-4 border-t-slate-900 animate-spin my-autos";
  const loaderContainer = "flex flex-col items-center justify-center h-full w-full gap-10";
  
  return <div className={loaderContainer}>
      <div className={loaderStyle}>
      </div>
    </div>
}