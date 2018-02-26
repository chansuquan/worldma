import request from 'app/utils/request';

const API = {
  getCountries() {
    return request({ url: '/countries' });
  },

  getGitUsers(query, sort, order = 'desc', per_page = 10) {
    return request({ url: `/git-users?q=${query}&sort=${sort}&order=${order}&per_page=${per_page}` });
  }
}

export default API