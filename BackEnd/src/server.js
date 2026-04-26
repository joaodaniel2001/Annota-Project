import 'dotenv/config';
import { connectDB } from "./config/db.js"
import notesRoutes from "./routes/notesRoutes.js"
import express from "express"
import cors from "cors"
import rateLimiter from './middeware/rateLimiter.js';

const app = express()
const PORT = process.env.PORT || 5001 

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(express.json())

app.use(rateLimiter)

app.use("/api/notes", notesRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}.`)
    })
}).catch(err => {
    console.error("Failed to connect to DB:", err)
})