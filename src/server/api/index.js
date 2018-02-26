import * as URL from 'server/constants/URL';
import middlewarify from 'server/utils/middlewarify';
import { getCountries } from 'server/api/middleware/Countries';
import { getGitUsers } from 'server/api/middleware/GitUsers';

export default router => {

  router.get(URL.COUNTRIES, middlewarify(getCountries));

  router.get(URL.GIT_USERS, middlewarify(getGitUsers));
  
  return router;
}