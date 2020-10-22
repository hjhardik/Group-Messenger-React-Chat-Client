export default {
  API_URI: process.env.NODE_ENV === 'production'
    ? 'https://fierce-caverns-30311.herokuapp.com/v1'
    : 'http://localhost:8000/v1',
  SOCKETS_URI: process.env.NODE_ENV === 'production'
    ? 'wss://fierce-caverns-30311.herokuapp.com/'
    : 'ws://localhost:8000/',
};
