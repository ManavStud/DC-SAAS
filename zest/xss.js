const axios = require("axios");

async function fetchDataFromAPI(url) {
  const payload = { message: "<script>alert('XSS attack!')</script>" };

  try {
    const response = await axios.post(url, payload);
    if (response.data.message.includes("<script>")) {
      throw new Error("XSS attack detected in API response.");
    }
    return response.data;
  } catch (error) {
    throw new Error("Error fetching data from API.");
  }
}

module.exports = { fetchDataFromAPI };
