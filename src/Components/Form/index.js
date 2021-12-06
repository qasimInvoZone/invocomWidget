const baseUrl = process.env.REACT_APP_INVOCOM_API_URL
const apiVersion = process.env.REACT_APP_INVOCOM_API_VERSION
async function sendUserData(userDetails) {
    try {
        const entity = 'user';
        const response = await fetch(`${baseUrl}/${apiVersion}/${entity}/register`, {
          method: 'POST',
          body: JSON.stringify(userDetails),
          headers: {
            'Content-Type': 'application/json',
          },
      });
      return await response;
    } catch (error) {
      console.log(error);
    }
};

async function sendChatData (chatDetails) {
    try {
      const entity = 'chat';
      const response = await fetch(`${baseUrl}/${apiVersion}/${entity}/usermessage`, {
        method: 'POST',
        body: JSON.stringify(chatDetails),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return await response;
    } catch (error) {
      console.log(error);
    }
};

module.exports = {
  sendUserData,
  sendChatData
}