const axios = require("axios");

const reqresClient = axios.create({
    baseURL: "https://reqres.in/api",
    timeout: 5000,
    retry: {
        retries: 1, // Number of retries for the request
        retryDelay: (retryCount) => {
            // Add a delay on the retry
            return retryCount * 1000;
        },
        retryCondition: (error) => {
            // Retry only on network errors or server errors
            return (
                axios.isRetryableError(error) ||
                (error.response &&
                    error.response.status >= 500 &&
                    error.response.status < 600)
            );
        },
    },
});

module.exports = reqresClient;
