import MindsDB from "mindsdb-js-sdk";

const connect = async () => {
  try {
    await MindsDB.connect({
      user: process.env.MINDSDB_EMAIL!,
      password: process.env.MINDSDB_PASSWORD!,
    });

    return console.log("Connected to MindsDB");
  } catch (error: any) {
    return error;
  }
};

export default connect;
