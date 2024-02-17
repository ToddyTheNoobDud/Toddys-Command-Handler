import { existsSync, readdirSync, statSync } from 'node:fs'
import { join, extname } from "path";
export const Filereader = (dir) => {
    if (!existsSync(dir)) return [];

    const files = [];
    const directoryData = readdirSync(dir);

    for (const file of directoryData) {
        const filePath = join(dir, file);
        const stats = statSync(filePath);

        if (stats.isFile() && extname(filePath) === ".js") {
            files.push(filePath);
        } else if (stats.isDirectory()) {
            files.push(...Filereader(filePath));
        }
    }

    return files;
};