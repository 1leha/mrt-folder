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
    console.error("error :>> ", error);
  }
};

/**
 * MRT Folder
 * @param sourcDir
 */

const output = {
  level: 0,
  sourcDir: "",
  hits: [
    {
      id: 1,
      folderPath: "",
      folderContent: [
        { dir: "", item },
        { file: "", item },
      ],
    },
  ],
};

const mrtFolder = (sourcDir, deepLevel = 0) => {
  // console.group(`Level: ${deepLevel}`);
  const mrtResult = [];
  const detourFolder = async (sourcDir, level = 0) => {
    const folderContent = [];
    const fileList = await getFiles(sourcDir);
    // console.log("fileList :>> ", fileList);

    // if (deepLevel === level) {
    //   console.log("STOP >>> ");
    //   return;
    // }

    // !MAP
    // const cutOfFolder = fileList.map(async (item) => {
    //   const itemPath = path.resolve(sourcDir, item);

    //   // console.log("file :>> ".red, fileList[file]);
    //   // Check for directory or file
    //   const stat = await fs.stat(itemPath);
    //   const isDir = stat.isDirectory();
    //   const typeOfItem = isDir ? "DIR" : "FILE";

    //   if (level === deepLevel) {
    //     // console.log(`${typeOfItem}: ${item}`.bgGreen);
    //     if (isDir) {
    //       return { dir: item };
    //     }
    //     return { file: item };
    //   } else {
    //     // console.log("это папка".bgCyan);
    //     detourFolder(itemPath, level + 1);
    //   }
    // });

    // console.log(await Promise.all(cutOfFolder));
    // result.push(await Promise.all(cutOfFolder));
    // console.log("result :>> ", await result);

    for (const file in fileList) {
      const item = fileList[file];
      // console.log("item :>> ", item);

      const itemPath = path.resolve(sourcDir, item);

      // console.log("file :>> ".red, fileList[file]);
      // Check for directory or file
      const stat = await fs.stat(itemPath);
      const isDir = stat.isDirectory();
      const typeOfItem = isDir ? "DIR" : "FILE";

      if (level === deepLevel) {
        if (isDir) {
          // console.log(`${typeOfItem}: ${item}`.bgGreen);
          folderContent.push({ dir: item });
        } else {
          // console.log(`${typeOfItem}: ${item}`.bgBlue);
          folderContent.push({ file: item });
        }

        // result.push(item);
      } else {
        detourFolder(itemPath, level + 1);
      }

      //   // result.push(item);
      // }
    }
    // mrtResult.push({ sourcDir, folderContent });
    // return [...mrtResult, { sourcDir, folderContent }];
    // console.log("mrtResult :>> ", mrtResult);
    // console.log("folderContent :>> ", folderContent);
    return Promise.all(folderContent);
  };

  const a = detourFolder(sourcDir);
  const res = a.then((e) => console.log(e));
};

mrtFolder(test, 1);
