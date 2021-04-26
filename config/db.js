const mongoose = require("mongoose");
const dbURL = require("./properties").DB;

module.exports = () => {
  mongoose
    .connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => {
      console.log(`Conexion exitosa ${dbURL}`);
    })
    .catch((err) => {
      console.log(err);
    });

    process.on("SIGINT", () => {
        mongoose.connection.close(()=>{
            console.log("mongo esta desconectado");
            process.exit(0);
        });
    })
};
