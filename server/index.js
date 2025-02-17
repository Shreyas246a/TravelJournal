import express from "express"; 
import dotenv from "dotenv"; 
import helmet from "helmet"; 
import morgan from "morgan"; 
import mongoose from "mongoose"; 
import userRoute from "./routes/user.js"; 
import entryRoute from './routes/entry.js'
import cookieParser from "cookie-parser"; 
import cors from "cors"
import path from "path";
import { fileURLToPath } from "url";
const app = express(); 
dotenv.config(); 

const PORT = process.env.PORT || 5500; 

const connect = async () => { 
try { 
	await mongoose.connect(process.env.MONGO_URI || "mongodb://mongo:27017/mydatabase"); 
	console.log("Connected to mongoDB."); 
} catch (error) { 
	throw error; 
} 
}; 

mongoose.connection.on("disconnected", () => { 
console.log("mongoDB disconnected!"); 
}); 

app.get('/', (req, res) => { res.send('Hello from Express!') }); 

//middlewares 
app.use(cookieParser()) 
app.use(express.json()); 
app.use(helmet()); 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ 
origin: "http://localhost:3000", 
credentials: true
})) 

app.use(morgan("common")); 

app.use("/api/users", userRoute); 
app.use("/api/entries", entryRoute); 


app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => { 
console.log("Listening on port 5500"); 
connect(); 
});
