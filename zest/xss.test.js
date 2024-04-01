const axios = require("axios");
const { fetchDataFromAPI } =   require("./xss"); // Ensure the correct path to the api.js file

jest.mock("axios");
const userProvidedURL = process.argv[2];

test("should fetch data from the user-provided API URL correctly", async () => {
  const responseData = { message: "Mock API response" };
  axios.post.mockResolvedValueOnce({ data: responseData });

  const data = await fetchDataFromAPI(userProvidedURL);
  expect(data).toEqual(responseData);
});

test("should handle API error for user-provided URL", async () => {
  const errorMessage = "Error fetching data from API.";
  axios.post.mockRejectedValueOnce(new Error(errorMessage));

  await expect(fetchDataFromAPI(userProvidedURL)).rejects.toThrow(errorMessage);
});
