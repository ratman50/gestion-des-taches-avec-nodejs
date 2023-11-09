import dotenv from "dotenv";

dotenv.config();


const MONGO_USERNAME=process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD=process.env.MONGO_PASSWORD || '';
const SECRET_KEY=process.env.SECRET_KEY;
// const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.ffagtwk.mongodb.net/taches`;
const MONGO_URL = `mongodb://localhost:27017/taches`;

const SERVER_PORT=process.env.SERVER_PORT ? Number
(process.env.SERVER_PORT):1337;
export const config={
    mongo:{
        url:MONGO_URL
    },
    key:{
        key_token:SECRET_KEY
    },
    server:{
        port:SERVER_PORT
    }
}