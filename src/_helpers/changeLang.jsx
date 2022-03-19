export const addQuery = (str) => {
  const searchParams = new URLSearchParams();
  searchParams.set('lang', str);
  history.push(`${searchParams}`);
  return searchParams.toString();
};
