import fetch from 'isomorphic-fetch';
//  FETCH is polyfill for browsers which don't have fetch function.
//  It will add fetch function to your browser window object.
//  While isomorphic-fetch is implementation of fetch for both node.js and browser,
//  built on top of fetch polyfill.
import config from '../config';
//  import the API and sockets endpoint

export default function callApi(endpoint, token, options, payload) {
  const authHeaders = token
    ? {
      Authorization: `Bearer ${token}`,
    }
    : {};
  // returns the fetch response of the API call
  return fetch(`${config.API_URI}/${endpoint}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...authHeaders,
      // if token is present, it will have authorization otherwise not
    },
    body: JSON.stringify(payload),
    ...options,
    // send the 'options'(parameter) object data with the API call
  }).then(response => response.json())
    .then((json) => {
      if (json.success) {
        return json;
      }

      throw new Error(json.message);
    });
}
