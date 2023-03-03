const path = require("path");
const fs = require("fs").promises;
require("colors");

const sourcDir = path.join("d:", "Users", "Lleha", "!ПАПКИ");

const test =
  "d:\\Users\\Lleha\\cources\\go_it\\teamProjects\\html\\team-project_iceCream";

const getFiles = async (dir) => {
  try {
    const files = await fs.readdir(dir);
    return files;
    // console.log("files :>> ", files);
    // console.log(path.resolve(files[0]));
  } catch (error) {
    console.error("error :>> ", error);
  }
};

/**
 * MRT Folder
 * @param sourcDir
 */

const initialOptions = {
  sourcDir: "",
  destinationFolder: "",
  deepLevel: 0,
  fileFormat: "json",
};

const mrtFolder = async (sourcDir, deepLevel = 0) => {
  // console.group(`Level: ${deepLevel}`);
  const counter = {
    dir: 0,
    files: 0,
  };

  const detourFolder = async (sourcDir, level = 0) => {
    const fileList = await getFiles(sourcDir);

    // console.log("fileList :>> ", fileList);
    // console.log("deepLevel === level :>> ", deepLevel === level);

    const folderContent = fileList.map(async (item) => {
      const itemPath = path.resolve(sourcDir, item);

      // Check for directory or file
      const stat = await fs.stat(itemPath);
      const isDir = stat.isDirectory();

      if (deepLevel === level) {
        if (isDir) {
          counter.dir += 1;
          return { dir: item };
        } else {
          counter.files += 1;

          return { file: item };
        }
      } else {
        if (isDir) {
          // counter.dir += 1;

          return {
            folderPath: itemPath,
            folderContent: await detourFolder(itemPath, level + 1),
          };
        } else {
          counter.files += 1;

          return { file: item };
        }
      }
      // console.log(`${typeOfItem}: ${item}`.bgGreen);
    });

    return await Promise.all(folderContent);

    // console.log("folderContent :>> ", await Promise.all(folderContent));
  };
  const hits = detourFolder(sourcDir);
  // console.log("a :>> ", JSON.stringify(await hits));
  return {
    level: deepLevel,
    sourcDir: sourcDir,
    hits: await hits,
    counter,
  };
};

// const res = a.then((e) => console.log(e)).then((e2) => console.log(e2));
// console.log("res :>> ", res);

//!otput data of MRT
//   const output = {
//     level: 1,
//     sourcDir: "sourcDir",
//     hits: [
//       {
//         folderPath: "",
//         folderContent: [
//           { dir: "", item: "" },
//           { file: "", item: "" },
//         ],
//       },
//     ],
//   };
// console.log("output :>> ", output);
mrtFolder(test, 0).then((res) =>
  console.log("MRT result :>> ", JSON.stringify(res))
);
