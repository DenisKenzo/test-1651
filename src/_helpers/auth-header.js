import cookies from './cookies';

export function authHeader() {
  const isToken = cookies.utils.hasAuth();
  if (isToken) {
    const token = cookies.utils.getAuth();
    return { Authorization: `Bearer ${token}` };
  }
}
