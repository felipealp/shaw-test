import request from "supertest";
import express from "express";
import cors from "cors";
import routes from "../src/start/routes.ts";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {res.json({ message: "welcome to api" });});
app.use('/api', routes);

describe("Test server.ts", () => {
  test("Home route", async () => {
    const res = await request(app).get("/");
    expect(res.body).toEqual({ message: "welcome to api" });
  });
});

export default app;