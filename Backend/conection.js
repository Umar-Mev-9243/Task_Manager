import mongoose from "mongoose";

const MongodbConnection = async (url) => {
    return await mongoose.connect(url)
}

export default MongodbConnection;