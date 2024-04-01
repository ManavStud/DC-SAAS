const express = require("express");
var exec = require("child_process").exec;
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const { saveScan } = require("./controllers/scans.js");
const connectDB = require("./config/database.js");

// Connect mongoose server
connectDB();

// Import the users route file
const usersRoutes = require("./routes/users.js");

// Mount the users routes at the /users path
app.use("/apii/users", usersRoutes);

// Import the users route file
const scansRoutes = require("./routes/scans.js");

// Mount the users routes at the /users path
app.use("/apii/scans", scansRoutes);

// Set up storage location and file name for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
// Create multer instance with the storage configuration
const upload = multer({ storage: storage });

// Set up endpoint to handle file uploads
app.post("/upload-pylint", upload.single("file"), (req, res) => {
  const filePath = req.file.path;
  const { domain, tool, user_id } = req.body;
  const updatedPath = filePath.substr(8, filePath.length - 1);
  // console.log(`Received file: ${updatedPath}`);
  console.log(`Received file: ${filePath}`);
  try {
    exec(`pylint ${filePath}`, (error, stdout, stderr) => {
      const result = stdout + stderr;
      saveScan(tool, domain, result, user_id, updatedPath);
      res.send(`${result}`);
    });
  } catch (error) {
    console.log(error);
  }
  // Store the file path in a variable or use it as needed
  // res.send(`File uploaded successfully: ${filePath}`);
});

// Set up endpoint to handle file uploads
app.post("/upload-bandit", upload.single("file"), (req, res) => {
  const filePath = req.file.path;
  const { domain, tool, user_id } = req.body;
  const updatedPath = filePath.substr(8, filePath.length - 1);
  // console.log(`Received file: ${updatedPath}`);
  console.log(`Received file: ${filePath}`);
  try {
    exec(`bandit ${filePath}`, (error, stdout, stderr) => {
      const result = stdout + stderr;
      saveScan(tool, domain, result, user_id, updatedPath);
      res.send(`${result}`);
    });
  } catch (error) {
    console.log(error);
  }
  // Store the file path in a variable or use it as needed
  // res.send(`File uploaded successfully: ${filePath}`);
});

app.get("/", (req, res) => {
  res.send(
    "Hello World, This is an API built by the RedTeaming and VAPT Team : Japneet Rajput,Yashvi Dhar,Anuj Bagad and Sanjana Bhojwani"
  );
});

app.post("/web", (req, res) => {
  if (req.method === "POST") {
    const { input, tool, domain, user_id } = req.body;
    exec(
      `cd ./sqlmap/sqlmap-master; python3 sqlmap.py -u  ${input} --batch`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return res.status(500).send("Error processing text");
        }
        const result = stdout;
        saveScan(tool, domain, result, user_id, input);
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.send(`Result: ${stdout}`);
      }
    );
    // res.send(text);
  }
});

app.post("/whatweb", (req, res) => {
  if (req.method === "POST") {
    const { input, tool, domain, user_id } = req.body;
    exec(
      `cd ./WhatWeb; whatweb ${input} --aggression 3 --verbose`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return res.status(500).send("Error processing text");
        }
        const result = stdout;
        saveScan(tool, domain, result, user_id, input);
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        res.send(`Result: ${stdout}`);
      }
    );
    // res.send(text);
  }
});

app.post("/api", (req, res) => {
  if (req.method === "POST") {
    const { input, tool, domain, user_id } = req.body;
    exec(
      `cd zest && npm test xss.test.js ${input}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          `Enter processing text:${error}`;
        }
        const result = stdout + stderr;
        saveScan(tool, domain, result, user_id, input);
        console.log(`stdout: ${stdout}`);
        res.send(`${stdout} ${stderr}`);
      }
    );
  }
});

let port = process.env.PORT || 3001;
const host = "0.0.0.0";

app.listen(port, () => {
  console.log(`Server listening on ${host}:${port}`);
});
