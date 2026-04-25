import 'dotenv/config';

import { connectDB } from "./config/db.js"
import notesRoutes from "./routes/notesRoutes.js"

import express from "express"
import rateLimiter from './middeware/rateLimiter.js';

const app = express()
const PORT = process.env.PORT 

app.use(express.json())
app.use(rateLimiter)

app.use("/api/notes", notesRoutes)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}.`)
    })
})
