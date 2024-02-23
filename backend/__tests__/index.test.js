const request = require("supertest");
const { app } = require("../index.js");

describe("GET /users", () => {
    it("responds with JSON containing a list of users", async () => {
        const response = await request(app).get("/users");
        expect(response.status).toBe(200);

        // Check if response body is defined and contains data property
        expect(response.body).toBeDefined();
        expect(response.body.data).toBeDefined();

        // Check if data property is an array and has at least one user
        expect(response.body.data).toBeInstanceOf(Array);
        expect(response.body.data.length).toBeGreaterThan(0);

        // Check if each user has the expected properties
        response.body.data.forEach((user) => {
            expect(user).toHaveProperty("id");
            expect(user).toHaveProperty("email");
            expect(user).toHaveProperty("first_name");
            expect(user).toHaveProperty("last_name");
            expect(user).toHaveProperty("avatar");
        });
    });
});

describe("GET /users/:id", () => {
    it("responds with JSON containing the user data for a valid user ID", async () => {
        const userId = 1;

        const response = await request(app).get(`/users/${userId}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it("responds with 404 if user is not found", async () => {
        const userId = 6789;

        const response = await request(app).get(`/users/${userId}`);

        expect(response.status).toBe(404);
        expect(response.body).toBeDefined();
        expect(response.body).toHaveProperty(
            "message",
            "Bad URI or user is not found."
        );
    });
});

describe("POST /users/create", () => {
    it("responds with JSON containing the created user data", async () => {
        const userData = {
            name: "christian",
            job: "salesman",
        };

        const response = await request(app)
            .post("/users/create")
            .send(userData);

        expect(response.status).toBe(201);
        expect(response.body).toBeDefined();
        expect(response.body).toHaveProperty("name", "christian");
        expect(response.body).toHaveProperty("job", "salesman");
    });

    it("responds with 201 if request even if data is empty", async () => {
        const response = await request(app).post("/users/create").send({});

        expect(response.status).toBe(201);
        expect(response.body).toBeDefined();
    });

    it("responds with 201 even if data is invalid", async () => {
        const response = await request(app)
            .post("/users/create")
            .send({ invalidData: true });

        expect(response.status).toBe(201);
        expect(response.body).toBeDefined();
    });
});
