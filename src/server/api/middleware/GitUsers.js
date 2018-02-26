import axios from 'axios';
const END_POINT = 'https://api.github.com';
const SEARCH_PATH = '/search';
const USERS_PATH = '/users';


export const getGitUsers = async (req, res, next) => {

  const {
    query: {
        order = 'desc',
        per_page = 10,
        q = 'location:vietnam',
        sort = 'followers'
      } = {}
    } = req;

  const URL = `${END_POINT}${SEARCH_PATH}${USERS_PATH}?q=${q}&order=${order}&sort=${sort}&per_page=${per_page}`;

  const { data } = await axios.get(URL);

  res.json(data);
};
