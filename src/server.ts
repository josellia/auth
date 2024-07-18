// import http from "http";
import mongoose from "mongoose";

import app from './app';
import env from './utils/validateEnv';

const PORT = env.PORT || 5000;
// const server = http.createServer(app);

mongoose.connect(env.API_KEY).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    });

}).catch(console.error);