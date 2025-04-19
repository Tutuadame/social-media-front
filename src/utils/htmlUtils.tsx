import { MessageResponse } from "../interface";
import { format } from "date-fns";

export const createSvg = (paths:string[], strokeWidth = 1, style="") => (  
    <svg
      xmlns="http://www.w3.org/2000/svg"      
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      className={`size-20 m-auto ${style}`}
      fill="none"  
    >
      
      {paths.map((path:string) => (
        <path strokeLinecap="round" strokeLinejoin="round" d={path}/>  
      ))}
      
    </svg>
);

export const orderMessagesToGroupsByConsecutiveIds = (messages: MessageResponse[]): MessageResponse[][] => {  
  const groups = [];  
  let currentId = messages[0].senderId;
  let currentGroup: MessageResponse[] = [];

  for ( let i=0; i <= messages.length - 1; i++ ) {    
    if(currentId === messages[i].senderId){
      currentGroup.push(messages[i]);
    } else {
      currentId = messages[i].senderId;
      groups.push(currentGroup);
      currentGroup = [messages[i]];
    }
  }

  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }
  return groups;
};

export const getRelativeTime = (timestamp: string) => {
  const now: Date = new Date();
  const date: Date = new Date(timestamp);

  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInDays < 1) {
    return format(date, "HH:mm");
  } else if (diffInDays < 2) {
    return `Yesterday, ${format(date, "HH:mm")}`;
  } else if (date.getFullYear() === now.getFullYear()) {
    return format(date, "MM-dd HH:mm");
  } else {
    return format(date, "yyyy-MM-dd HH:mm");
  }
};