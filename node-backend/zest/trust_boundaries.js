const axios = require('axios');

test('data from untrusted API is properly validated', async () => {
  const response = await axios.get('https://example.com/api/untrusted');
  const data = response.data;

  // Assert that the data is properly sanitized and validated
  expect(data).not.toContain('<script>');
  expect(data).toMatch(/^\d+$/);
});
