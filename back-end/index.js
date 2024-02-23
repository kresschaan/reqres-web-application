// Initialize express server
const express = require("express");
const app = express();
const port = 3010;

const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

const axiosReq = require("./axios-API");
const { setCache, getCache } = require("./cache");

//List Users Endpoint
app.get("/users", async (req, res) => {
    try {
        let page = req.query.page || 1;

        const cachedData = getCache("/users");
        if (cachedData) {
            console.log("Data retrieved from cache");
            return res.status(200).json(cachedData);
        }

        // axios request to /users
        const response = await axiosReq.get("/users", {
            params: {
                page: page,
            },
        });

        if (response.status === 404) {
            return res
                .status(404)
                .json({ message: "Error 404: Bad URI or user is not found." });
        } else if (response.status === 400) {
            return res.status(400).json({
                message: "Error 400: Please check your request data.",
            });
        }

        setCache("/users", response.data, 120);

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Error 500: Internal server error." });
    }
});

// User Details Endpoint
app.get("/users/:id", async (req, res) => {
    try {
        const userID = req.params.id;
        const cacheKey = `/users/${userID}`;
        const cachedData = getCache(cacheKey);

        if (cachedData) {
            console.log("Data retrieved from cache");
            return res.status(200).json(cachedData);
        }

        // axios request to /users/id
        const response = await axiosReq.get(`/users/${userID}`);

        setCache(cacheKey, response.data, 300);

        res.status(200).json(response.data);
    } catch (error) {
        //console.error("Error:", error);
        if (error.response && error.response.status === 404) {
            res.status(404).json({ message: "Bad URI or user is not found." });
        } else {
            res.status(500).json({
                message: "Error 500: Internal server error.",
            });
        }
    }
});

// Create User Endpoint
app.post("/users/create", async (req, res) => {
    try {
        const data = req.body;

        // axios request to /users/create
        const response = await axiosReq.post("/users", data);

        let cachedData = getCache("/users");
        const currentTime = Date.now();
        let remainingTime = 0;

        if (cachedData && cachedData.expiry) {
            remainingTime = cachedData.expiry - currentTime;
        }

        if (!cachedData || !cachedData.data) {
            const userData = await axiosReq.get("/users");
            cachedData = userData.data;
            cachedData.data.push(response.data);
        } else {
            cachedData.data.push(response.data);
        }

        // Update cache with remaining time from /users endpoint if it exists
        setCache("/users", cachedData, 120);

        res.status(201).json(response.data);
    } catch (error) {
        console.error("Error:", error);
        if (error.response && error.response.status === 400) {
            res.status(400).json({
                message: "Error 400: Please check your request data.",
            });
        } else {
            res.status(500).json({
                message: "Error 500: Internal server error.",
            });
        }
    }
});

// starts the server and listens for connection on the port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = { app };
