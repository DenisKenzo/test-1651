import Cookies from 'universal-cookie';

const cookies = new Cookies();

cookies.utils = {
  getAuth() {
    return cookies.get('access_token');
  },
  hasAuth() {
    return Boolean(cookies.get('access_token'));
  },
  removeAuth() {
    cookies.remove('access_token', { path: '/' });
  },
  setAuth(token) {
    // const msDay  = 86400000;
    const msYear = 31556952;

    const cookie = 'access_token';
    // const maxAge = keepSignedIn ? msYear : msDay;
    const maxAge = msYear;

    cookies.set(cookie, token, { maxAge, path: '/' });
  },
};

export default cookies;
