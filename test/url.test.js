const supertest = require("supertest");
const app = require("../src/server");
const request = supertest(app());
const {
  connectToTestDb,
  closeConnection,
  dropDatabase,
} = require("./utils/db");

let token;
beforeAll(async (done) => {
  await connectToTestDb();

  const { body } = await request.post("/register").send({
    name: "Edwin",
    lastName: "Felipe",
    email: "edwinisfelipe25@gmail.com",
    password: "12345678",
  });

  const response = await request.post("/login").send({
    email: body.email,
    password: "12345678",
  });

  token = response.body.token;
  done();
});

afterAll(async (done) => {
  await closeConnection();
  dropDatabase(done);
});

describe("Create shorted url", () => {
  it("Must return 201 when all is ok", async () => {
    const { body, status } = await request
      .post("/url")
      .send({ to: "https://facebook.com" })
      .set("Authorization", `Bearer ${token}`);

    expect(status).toBe(201);
    expect(Object.keys(body)).toContain("to");
    expect(Object.keys(body)).toContain("owner");
    expect(Object.keys(body)).toContain("createdAt");
    expect(Object.keys(body)).toContain("_id");
  });
});

describe("Get A shorted url", () => {
  let id;
  beforeAll(async (done) => {
    const { body } = await request
      .post("/url")
      .send({ to: "https://facebook.com" })
      .set("Authorization", `Bearer ${token}`);
    id = body._id;
    done();
  });
  it("Must return 200 when all is ok", async () => {
    const { body, status } = await request.get(`/url/${id}`);

    expect(status).toBe(200);
    expect(Object.keys(body)).toContain("to");
    expect(Object.keys(body)).toContain("owner");
    expect(Object.keys(body)).toContain("createdAt");
    expect(Object.keys(body)).toContain("_id");
  });
});

describe("Get current user urls", () => {
  beforeAll(async (done) => {
    await request
      .post("/url")
      .send({ to: "https://facebook.com" })
      .set("Authorization", `Bearer ${token}`);
    done();
  });
  it("Must return 200 when all is ok", async () => {
    const { body, status } = await request
      .get("/url")
      .set("Authorization", `Bearer ${token}`);

    expect(status).toBe(200);
    
  });
});
