//Connection API
export const getAcceptedConnectionsByUserPath = `https://localhost:8445/connectionApi/connections/accepted`;
export const getPendingConnectionsByUserPath = `https://localhost:8445/connectionApi/connections/pending`;
export const updateConnectionPath = `https://localhost:8445/connectionApi/update`;
export const createConnectionPath = `https://localhost:8445/connectionApi/new`;
export const isConnectedPath = `https://localhost:8445/connectionApi/checkConnection`;

//Post API
export const getConnectionPostsPath = `https://localhost:8445/postApi/home`;
export const getProfilePostsPath = `https://localhost:8445/postApi/activity`;
export const createPostPath = `https://localhost:8445/postApi/new`;
export const deletePostPath = `https://localhost:8445/postApi`;

//Profile API
export const getProfilePath = `https://localhost:8445/profileApi`;
export const deleteProfilePath = `https://localhost:8445/profileApi`;
export const updateProfileIntroductionPath = `https://localhost:8445/profileApi/introduction`;
export const searchForProfilesPath = `https://localhost:8445/profileApi/search`;
export const profileRegistrationPath = `https://localhost:8445/profileApi/new`;

//Vote API
export const addVotePath = `https://localhost:8445/voteApi/vote`;
export const checkVotePath = `https://localhost:8445/voteApi/vote`;