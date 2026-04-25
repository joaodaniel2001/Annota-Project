import mongoose from "mongoose"

const mongoPSW = process.env.MONGO_URI

export const connectDB = async () => {

    if (!mongoPSW) {
        console.error("ERRO: A variável MONGO_KEY não foi encontrada no arquivo .env");
        return;
    }
    
    try {
        await mongoose.connect(mongoPSW)
        console.log("MongoDB connected successfully!")
    } catch (error) {
        console.error("Failed to connect with MongoDB: ", error)
        process.exit(1)
    }
}