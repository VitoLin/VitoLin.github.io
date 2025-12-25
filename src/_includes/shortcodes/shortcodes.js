import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export default function (eleventyConfig) {
    const dirPath = fileURLToPath(new URL(".", import.meta.url));
    const files = fs.readdirSync(dirPath);

    // Register a Liquid shortcode for every .liquid file in this directory.
    files
        .filter((f) => f.endsWith(".liquid"))
        .forEach((filename) => {
            const name = path.basename(filename, ".liquid");
            const filePath = path.join(dirPath, filename);
            eleventyConfig.addLiquidShortcode(name, function (...args) {
                return fs.readFileSync(filePath, "utf8");
            });
        });
}
