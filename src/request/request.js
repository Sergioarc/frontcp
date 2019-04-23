import axios from 'axios';

export const login = async (data) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:3000/login',
    // headers: {
    //   'content-type': 'application/x-www-form-urlencoded',
    // },
    data: {
      username: data.username,
      password: data.password,
    }
  };
  const response = await axios(options);
  return response.data;
};

export const fetchInfoCP = async (token, data) => {
  const options = {
    method: 'POST',
    url: `http://localhost:3000/fetch/cp`,
    headers: {
      // 'content-type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`,
    },
    data,
  };
  const response = await axios(options);
  return response.data;
}

export const fetchEstados = async (token) => {
  const options = {
    method: 'GET',
    url: `http://localhost:3000/fetch/estados`,
    headers: {
      // 'content-type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`,
    },
  };
  console.log('Options:::', options);
  const response = await axios(options);
  return response.data;
}

export const fetchMunicipios = async (token) => {
  const options = {
    method: 'GET',
    url: `http://localhost:3000/fetch/municipios`,
    headers: {
      // 'content-type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`,
    },
  };
  const response = await axios(options);
  return response.data;
}

export const fetchColonias = async (token) => {
  const options = {
    method: 'GET',
    url: `http://localhost:3000/fetch/colonias`,
    headers: {
      // 'content-type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${token}`,
    },
  };
  const response = await axios(options);
  return response.data;
}