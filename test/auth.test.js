const supertest = require("supertest");
const app = require("../src/server");
const request = supertest(app());
const {
  connectToTestDb,
  closeConnection,
  dropDatabase,
} = require("./utils/db");

beforeAll(async (done) => {
  await connectToTestDb();
  done();
});

afterAll(async (done) => {
  await closeConnection();
  dropDatabase(done);
});

describe("Register user", () => {
  it("Must return user when all is ok and not contain password", async () => {
    const { body, status } = await request.post("/register").send({
      name: "Edwin",
      lastName: "felipe",
      email: "edwinisfelipe25@gmail.com",
      password: "12345678",
    });
    expect(status).toBe(201);
    expect(Object.keys(body)).toContain("name");
    expect(Object.keys(body)).toContain("lastName");
    expect(Object.keys(body)).toContain("email");
    expect(Object.keys(body)).not.toContain("password");
  });

  it("Must return 400 When data is invalid", async () => {
    const { body, status } = await request.post("/register").send({
      name: "E",
      lastName: "F",
      email: "edwinisfelipe",
      password: "123456",
    });
    expect(status).toBe(400);
    // expect(Object.keys(body)).toContain("name");
    // expect(Object.keys(body)).toContain("lastName");
    // expect(Object.keys(body)).toContain("email");
    // expect(Object.keys(body)).not.toContain("password");
  });
});

describe("Login user", () => {
  it("Must return 200 and token, on ok", async () => {
    const { body, status } = await request.post("/login").send({
      email: "edwinisfelipe25@gmail.com",
      password: "12345678",
    });
    console.log(body);
    expect(status).toBe(200);
    expect(Object.keys(body)).toContain("token");
    expect(Object.keys(body)).toContain("expireDate");
  });

  it("Must return 404 and email error when email does not exist", async () => {
    const { body, status } = await request.post("/login").send({
      email: "edwinisfelipe24@gmail.com",
      password: "12345678",
    });

    expect(status).toBe(404);
    expect(Object.keys(body)).toContain("fields");
    expect(body.fields).toContain("email");
  });

  it("Must return 400 and password error when password is not correct", async () => {
    const { body, status } = await request.post("/login").send({
      email: "edwinisfelipe25@gmail.com",
      password: "123456",
    });

    expect(status).toBe(400);
    expect(Object.keys(body)).toContain("fields");
    expect(body.fields).toContain("password");
  });
});
