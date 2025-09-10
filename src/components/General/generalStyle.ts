export const LOADER_STYLES = {
  container: "flex flex-col items-center justify-center h-full w-full gap-10",
  loader: "w-24 h-24 border-16 border-slate-300 rounded-full border-t-4 border-t-slate-900 animate-spin my-auto",
} as const;


const container = {
  display: `relative flex flex-col`,
  color: `bg-slate-400`,
  size: `w-[40vw] max-h-[50vh] h-fit`,
  margin: `mx-auto`,
  padding: `p-5`,
  border: `rounded`,
  shadow: `shadow-xl`
};

export const POST_STYLES = {
  container: Object.values(container).join(' '),
  profileSection: "flex flex-row pb-6",
  timestamp: "ml-auto my-auto text-white text-sm transition-all tracking-widest",
  contentContainer: "w-full h-full border-l-4 border-white content-center",
  contentText: "ml-5 text-white py-5",
  voteSection: "flex flex-row gap-10 pt-2 transition-all"
};