const crypto = require("crypto");//this package used to encrypt firebase config details
const fs = require("fs");

const serviceAccount = fs.readFileSync("./FireBaseAdminConfig.json", "utf8");// this file has all the firebase configurations
const key = crypto.randomBytes(32); // 256-bit key
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
let encrypted = cipher.update(serviceAccount, "utf8", "base64");
encrypted += cipher.final("base64");

console.log("Encrypted Credentials:\n", encrypted);
console.log("Encryption Key:\n", key.toString("base64"));
console.log("IV:\n", iv.toString("base64"));