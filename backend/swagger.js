import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API",
    description: "Auto docs",
  },
  host: "localhost:5000",
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);