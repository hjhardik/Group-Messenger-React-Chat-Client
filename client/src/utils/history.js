// https://medium.com/@ivantsov/using-react-router-and-history-38c021270829
import { createBrowserHistory } from 'history';

export default createBrowserHistory({
  basename: '/react-chat',
});
