import { readdirSync } from 'fs';
import { join, extname } from 'path';
export const Filereader = (dir) => {
try {
    const files = [];
    const directoryData = readdirSync(dir);

    for (const file of directoryData) {
      const filePath = join(dir, file);

      if (extname(filePath) === '.js') {
        files.push(filePath);
      } else {
        files.push(...Filereader(filePath));
      }
    }

    return files;
  } catch (error) {
    return [];
  }
};
