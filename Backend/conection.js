import mongoose from "mongoose";

const MongodbConnection = (url) => {
    return mongoose.connect(url)
}

export default MongodbConnection;