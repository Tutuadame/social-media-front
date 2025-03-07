import { ResponseMessage } from "../interface";

export const healthCheck = async (): Promise<void> => {
  const response: ResponseMessage = await fetch(
    "https://social.media:8443/api/health-check",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .catch((error) => new Error(`HTTP error! ${error}`));
  console.log(response.content);
};
