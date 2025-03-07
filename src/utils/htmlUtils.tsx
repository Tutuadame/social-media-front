import { MessageResponse } from "../interface/messageAPI";

export const createSvg = (paths:string[], strokeWidth = 1, style="") => (  
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      className={`size-20 m-auto ${style}`}
    >
      
      {paths.map((path:string) => (
        <path strokeLinecap="round" strokeLinejoin="round" d={path}/>  
      ))}
      
    </svg>
);

export const orderMessagesToGroupsByConsecutiveIds = (messages: MessageResponse[]): MessageResponse[][] => {

  console.log("Messages: ", messages);
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
}