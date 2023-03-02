const Calc = require("calc-js").Calc;

// const { getCurrentDate } = require("./dadaUtils");
// import { getCurrentDate } from "./dadaUtils.js";

// console.log("global :>> ", global);
// console.log("переменная окружения: process.env :>> ", process.env);
// console.log("аргументы CLI: process.argv :>> ", process.argv);

// console.log("директория :>> ", __dirname);

// console.log("файл проекта :>> ", __filename);

//--------------------------------------
// Calculator CLI
// const [, , a, b] = process.argv;

// console.log("Result :>> ", new Calc(parseInt(a)).sum(parseInt(b)).finish());

//--------------------------------------

//--------------------------------------
// Path module
// const path = require("path");

// console.log("получить путь path.resolve :>> ", path.resolve("dadaUtils.js"));

//--------------------------------------

//--------------------------------------
// FS module
// const fs = require("fs");

//Error first callback
// fs.readFile("./test.txt", "utf8", (error, data) => {
//   if (error) {
//     console.error(error);
//   }
//   console.log("data :>> ", data);
// });

// promices async await
// const fs = require("fs").promises;

// // iife
// (async () => {
//   try {
//     const data = await fs.readFile("./test.txt", "utf8");
//     console.log("data :>> ", data);

//     // const newContent = `${data} дополнил этим...`;

//     // await fs.writeFile("./test2.txt", newContent, "utf8");
//     //   await fs.rename("./dadaUtils.js", "./dataUtils.js");

//     // move to new dir
//     // await fs.rename("./dataUtils.js", "./testDir/dataUtils.js");

//     // Delete
//     // await fs.unlink("./testDir/dataUtils.js");

//     // Append
//     await fs.appendFile("./test.txt", " New article", "utf8");

//     // console.log(await fs.readdir("./testDir"));
//   } catch (error) {
//     console.error(error);
//   }
// })();

//--------------------------------------
