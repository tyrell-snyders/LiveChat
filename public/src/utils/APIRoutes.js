//These are the paths for the API calls
export const host = 'https://oompie-babbel.onrender.com/';
export const registerRoute = `${host}/api/auth/register` //setting the url for the register route
export const loginRoute = `${host}/api/auth/login` //setting the url for the login route
export const setAvatarRoute = `${host}/api/auth/setAvatar` //setting the url for the setAvatar route
export const allUserRoute = `${host}/api/auth/allUsers` //gets all the users rom the DB
export const getUserAvatar = `${host}/api/auth/getUserAvatar` //Gets all users avatarImages from the Database
export const sendMsgRoute = `${host}/api/messages/addmsg` //Sends a message
export const getMsgRoute = `${host}/api/messages/getmsg` //gets a message