import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./start/routes.ts";

const app = express();

// Allows access to all external domains
app.use(cors());
// Allows sending data in the request with json format
app.use(express.json());

// Home route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "welcome to api" });
});

// App routes
app.use('/api', routes);

// Changes application port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}.`);
});