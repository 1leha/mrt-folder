const path = require("path");
const fs = require("fs").promises;
require("colors");

const sourcDir = path.join("d:", "Users", "Lleha", "!ПАПКИ");

const test = "d:\\Users\\Lleha\\cources";

const getFiles = async (dir) => {
  try {
    const files = await fs.readdir(dir);
    return files;
    // console.log("files :>> ", files);
    // console.log(path.resolve(files[0]));
  } catch (error) {
    console.log("error :>> ", error);
  }
};

/**
 * Fold the Dir
 * Разворачивает содержимое папки в 1 уровень
 */

const foldTheDir = async (dir) => {
  const fileList = await getFiles(dir);

  //   console.log("fileList :>> ", fileList);

  const fileListRecursion = fileList.map(async (item) => {
    const itemPath = path.resolve(dir, item);
    // console.log("itemPath :>> ", itemPath);

    // Check for directory or file
    const stat = await fs.stat(itemPath);
    const isDir = stat.isDirectory();
    // console.log("isDir :>> ", isDir);

    if (!isDir) {
      //   console.log("item in BASE RECURSION LEVEL :>> ", item);
      return item;
    } else {
      //   console.log("Идем глубже");
      return await scanRecursion(itemPath);
    }
  });

  const filesArr = await Promise.all(fileListRecursion);
  console.log(
    "fileListRecursion :>> ",
    filesArr.flatMap((file) => file)
  );

  return filesArr.flatMap((file) => file);
};

// foldTheDir(sourcDir);

/**
 * Fold the Dir by level
 * Разворачивает содержимое папки на заданное количество уровней
 */

const foldTheDirByLevel = (dir, deepLevel) => {
  const result = [];
  let level = 0;

  const detourFolder = async (dir, level = 0) => {
    const fileList = await getFiles(dir);
    // console.log("fileList :>> ", fileList);

    if (deepLevel === level) {
      console.log(" Достигнута нужная глубина");
      return;
    }

    for (const file in fileList) {
      const item = fileList[file];

      const itemPath = path.resolve(dir, item);

      // console.log("file :>> ".red, fileList[file]);
      // Check for directory or file
      const stat = await fs.stat(itemPath);
      const isDir = stat.isDirectory();

      if (!isDir) {
        console.log(`Level: ${level}. File: ${item}`.bgGreen);
        // result.push(item);
      } else {
        // console.log("это папка".bgCyan);
        detourFolder(itemPath, level + 1);
      }
    }
  };

  console.log("deepLevel :>> ", deepLevel);

  detourFolder(dir);
};

// foldTheDirByLevel(test, 2);

/**
 * если список содержит только файлы - то вернуть список, если есть папки то пройтись по папкам в цикле
 * */

/**
 * MRT Folder
 */

const mrtFolder = (dir, deepLevel) => {
  const result = [];
  let level = 0;

  const detourFolder = async (dir, level = 0) => {
    const fileList = await getFiles(dir);
    // console.log("fileList :>> ", fileList);

    // if (deepLevel === level) {
    //   console.log("STOP >>> ");
    //   return;
    // }

    for (const file in fileList) {
      const item = fileList[file];
      // console.log("item :>> ", item);

      const itemPath = path.resolve(dir, item);

      // console.log("file :>> ".red, fileList[file]);
      // Check for directory or file
      const stat = await fs.stat(itemPath);
      const isDir = stat.isDirectory();
      const typeOfItem = isDir ? "DIR" : "FILE";

      if (deepLevel === level) {
        console.log(`Level: ${level}. ${typeOfItem}: ${item}`.bgGreen);
        // result.push(item);
      } else {
        // console.log("это папка".bgCyan);
        if (isDir) {
          detourFolder(itemPath, level + 1);
        }
      }

      //   // result.push(item);
      // }
    }
  };

  // console.log("deepLevel :>> ", deepLevel);

  detourFolder(dir);
};

mrtFolder(test, 3);
