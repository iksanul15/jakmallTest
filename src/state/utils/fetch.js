import isomorphicFetch from 'isomorphic-fetch';

const fetch = (url, method, body, headers) => {
  let defaultHeader = requestHeaders();
  let objHeader = Object.assign(defaultHeader, headers);
  const options = {
    method,
    headers: objHeader,
    body: method !== 'GET' ? JSON.stringify(body) : null,
  };

  return isomorphicFetch(url, options).then((res) => {
    return parseStatus(res.status, res.text());
  });
};

function parseStatus(status, res) {
  return new Promise((resolve, reject) => {
    if (status >= 200 && status < 300) {
      res.then((response) => {
        let dataResponse = null;
        try {
          // dataResponse = JSON.parse(response);
        } catch (err) {}
        if (dataResponse !== null) resolve(dataResponse);
        else resolve(response);
      });
    } else {
      res.then((response) => {
        let dataResponse = null;
        try {
          //   dataResponse = JSON.parse(response);
        } catch (err) {}
        if (dataResponse !== null) reject({ status, dataResponse });
        else reject({ status, response });
      });
    }
  });
}

function requestHeaders() {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
}

export default fetch;
