import axios from 'axios';

function getRequest(url) {
    return axios.get(url)
      .then(response => response.data.response)
      .catch(error => {
        console.log('Error has occured while processing a request!');
        console.log(error);

        return error;
      });
}

export default {
  getLongPollHistory(server, key, ts) {
    return axios(`https://${server}?act=a_check&key=${key}&ts=${ts}&wait=25&mode=2&version=1`)
      .then(response => response)
      .catch(error => {
        console.log('Error has occured while processing a request!');
        console.log(error);

        return error;
      });
  },

  getLongPollServer(access_token) {
    return getRequest(`https://api.vk.com/method/messages.getLongPollServer?access_token=${access_token}`);
  },

  getProfileData(access_token) {
    return getRequest(`https://api.vk.com/method/account.getProfileInfo?access_token=${access_token}`);
  },

  getCurrentUser(access_token) {
    return getRequest(`https://api.vk.com/method/users.get?access_token=${access_token}`);
  },


}
