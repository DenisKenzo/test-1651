import { createBrowserHistory } from 'history';

const history = createBrowserHistory({ basename: process.env.CONTEXT });
history.listen((_) => {
  window.scrollTo(0, 0);
});

export { history };
