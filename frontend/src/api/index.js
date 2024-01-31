import axios from "axios";

const base_URL = "http://localhost:4000/";

export const validateUser = async (token) => {
  //bearer token is an opaque string which does not intend to have any meaning
  try {
    const res = await axios.get(`${base_URL}api/users/login`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
