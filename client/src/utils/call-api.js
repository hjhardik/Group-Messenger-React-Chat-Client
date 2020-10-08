import fetch from 'isomorphic-fetch';
// FETCH is polyfill for browsers which don't have fetch function.
// It will add fetch function to your browser window object.
// While isomorphic-fetch is implementation of fetch for both node.js and browser,
// built on top of fetch polyfill.
import config from '../config';
// import the API and sockets endpoint

export default function callApi(endpoint, token, options, payload) {
  const authHeaders = token
    ? {
      Authorization: `Bearer ${token}`,
    }
    : {};

  return fetch(`${config.API_URI}/${endpoint}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...authHeaders,
    },
    body: JSON.stringify(payload),
    ...options,
  })
    .then(response => response.json())
    .then((json) => {
      if (json.success) {
        return json;
      }

      throw new Error(json.message);
    });
}
