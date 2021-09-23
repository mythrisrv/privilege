import axios from "axios";
import accessToken from "./jwt-token-access/accessToken";

//apply base url for axios
const API_URL = process.env.REACT_APP_APIURL;

const axiosApi = axios.create({
  baseURL: API_URL,
});

// axios.defaults.headers.common["x-access-token"] = accessToken;

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export async function get(url, config) {
  return await axiosApi
    .get(url, {
      ...config,
      headers: {
        "x-access-token": accessToken,
      },
    })
    .then((response) => response.data);
}

export async function post(url, data, config) {
  console.log("ch");
  return axiosApi
    .post(
      url,
      { ...data },
      {
        ...config,
        headers: {
          "x-access-token": accessToken,
        },
      }
    )
    .then((response) => response.data);
}

export async function put(url, data, config) {
  console.log(data, "datauser");
  return axiosApi
    .put(
      url,
      { ...data },
      {
        ...config,
        headers: {
          "x-access-token": accessToken,
        },
      }
    )
    .then((response) => response.data);
}

export async function del(url, id) {
  return await axiosApi
    .delete(url + "/" + id, {
      headers: {
        "x-access-token": accessToken,
      },
    })
    .then((response) => response.data);
}
