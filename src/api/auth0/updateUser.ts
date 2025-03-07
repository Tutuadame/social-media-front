import { ResponseMessage } from './../../interface/ResponseMessage';

export const updateSecurityInfo = async (
  userId: string,
  field: string,
  value: string
): Promise<ResponseMessage> => {
  const response: ResponseMessage = await fetch(
    `https://social.media:8443/api/profile-update/${userId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: `{ "key":"${field}",
                "value":"${value}" }`,
    }
  )
    .then((result) => result.json())
    .catch((err) => new Error(`HTTP error! ${err}`));

  console.log(response.content);
  return response;
};
