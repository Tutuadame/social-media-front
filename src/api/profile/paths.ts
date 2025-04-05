//Connection API
export const getAcceptedConnectionsByUserPath = `https://social.media:8445/connectionApi/connections/accepted`;
export const getPendingConnectionsByUserPath = `https://social.media:8445/connectionApi/connections/pending`;
export const updateConnectionPath = `https://social.media:8445/connectionApi/update`;
export const createConnectionPath = `https://social.media:8445/connectionApi/new`;
export const isConnectedPath = `https://social.media:8445/connectionApi/checkConnection`;

//Post API
export const getConnectionPostsPath = `https://social.media:8445/postApi/home`;
export const getProfilePostsPath = `https://social.media:8445/postApi/activity`;
export const createPostPath = `https://social.media:8445/postApi/new`;
export const deletePostPath = `https://social.media:8445/postApi`;

//Profile API
export const getProfilePath = `https://social.media:8445/profileApi`;
export const deleteProfilePath = `https://social.media:8445/profileApi`;
export const updateProfileIntroductionPath = `https://social.media:8445/profileApi/introduction`;
export const searchForProfilesPath = `https://social.media:8445/profileApi/search`;
export const profileRegistrationPath = `https://social.media:8445/profileApi/new`;

//Vote API
export const addVotePath = `https://social.media:8445/voteApi/vote`;
export const checkVotePath = `https://social.media:8445/voteApi/vote`;