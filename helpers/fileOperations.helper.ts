import fs from 'fs';
import path from 'path';

const removeFolder = async direction => {
  await fs.rm(path.join(direction), { recursive: true }, err => console.log(err));
};

const isFileExist = async file => {
  try {
    if (fs.existsSync(file)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error(err);
  }
};

export { removeFolder, isFileExist };
