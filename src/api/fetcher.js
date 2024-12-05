import axios from 'axios';

const fetchData = async (endpoint, payload, headers = {}) => {
  console.log('>>>>>>>>>>>>>>>>>>>>  endpoint:', endpoint);
  console.log('>>>>>>>>>>>>>>>>>>>>  payload:', payload);

  // default headers object
  let config = {
    headers: {
      ...headers, // allow custom headers to be passed in
    },
  };

  // add content-type based on the payload type
  if (payload instanceof FormData) {
    // if payload is FormData, let axios handle content-type automatically
    config.headers['Content-Type'] = 'multipart/form-data';
  } else if (payload instanceof Object && !(payload instanceof FormData)) {
    // if payload is a json object, set content-type to application/json
    config.headers['Content-Type'] = 'application/json';
  }

  // conditionally add authorization header if available
  if (headers.Authorization) {
    config.headers['Authorization'] = headers.Authorization;
  }

  // conditionally add user-agent header if available
  if (headers['User-Agent']) {
    config.headers['User-Agent'] = headers['User-Agent'];
  }

  // conditionally add accept-encoding header if available
  if (headers['Accept-Encoding']) {
    config.headers['Accept-Encoding'] = headers['Accept-Encoding'];
  }

  // conditionally add x-request-id header if available
  if (headers['X-Request-ID']) {
    config.headers['X-Request-ID'] = headers['X-Request-ID'];
  }

  let responseData = {};

  try {
    // make the api request
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/${endpoint}`,
      payload,
      config
    );

    // handle success
    responseData['response'] = response.data;
    responseData['error'] = null;
  } catch (error) {
    // handle error
    console.error('Error making API call:', error);
    responseData['response'] = null;
    responseData['error'] = error;
  }

  return responseData;
};

export default fetchData;
