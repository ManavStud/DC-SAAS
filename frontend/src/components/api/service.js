import Axios from "axios";

// Base url
const apiUrl = process.env.REACT_APP_NODE_API_BASE_URL;
// API call to create an account
export const registerUser = async (user) => {
  try {
    // Return the response
    console.log(user);
    return await Axios.post(apiUrl + "/apii/users/register", user);
  } catch (error) {
    throw new Error("Server Error");
  }
};

// API call to login
export const loginUser = async (user) => {
  try {
    // Return the response
    return await Axios.post(apiUrl + "/apii/users/login", user);
  } catch (error) {
    throw new Error("Server Error");
  }
};

// API call for profile
export const profileUser = async (token) => {
  try {
    // Return the response
    return await Axios.get(apiUrl + "/apii/users/profile", {
      headers: {
        authorization: token,
      },
    });
  } catch (error) {
    throw new Error("Server Error");
  }
};

// API call for profile
export const getScanHistory = async (domain, tool, user_id) => {
  try {
    // Return the response
    return await Axios.get(
      apiUrl + "/apii/scans/" + domain + "/" + tool + "/" + user_id
    );
  } catch (error) {
    throw new Error("Server Error");
  }
};

// API call for profile
export const getAndroidScanHistory = async (domain, tool, user_id) => {
  try {
    // Return the response
    return await Axios.get(
      apiUrl + "/apii/scans/android/" + domain + "/" + tool + "/" + user_id
    );
  } catch (error) {
    throw new Error("Server Error");
  }
};
