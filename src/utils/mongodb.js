import mongoose from 'mongoose';
import { ENV_DB_NAME, ENV_DB_URL } from "../utils/const_config.js";

const connect = () => {
  mongoose
    .connect(
      ENV_DB_URL,
      {
        dbName: ENV_DB_NAME,
      },
    )
    .catch((err) => console.log(err))
    .then(() => console.log('몽고디비 연결 성공'));
};

mongoose.connection.on('error', (err) => {
  console.error('몽고디비 연결 에러', err);
});

export default connect;