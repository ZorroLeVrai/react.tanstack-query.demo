import express from 'express';
import usersRouter from './routes/users';
import cors from "cors";

const app = express();
const PORT = 3000;

// Configure CORS to allow requests from localhost:5173
// If your frontend is running on a different port or domain, change this.
const corsOptions = {
  origin: 'http://localhost:5173', // Only allow this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
  credentials: true, // Allow cookies to be sent with requests (if needed)
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions)); // Use CORS middleware with the specified options

app.use(express.json());
app.use('/api/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
