import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export default function (eleventyConfig) {
    const dirPath = fileURLToPath(new URL(".", import.meta.url));

    const files = fs.readdirSync(dirPath);

    function readTemplateFile(filename) {
        return fs.readFileSync(
            new URL(`./${filename}`, import.meta.url),
            "utf8",
        );
    }

    // Register a Liquid shortcode for every .liquid file in this directory.
    files
        .filter((f) => f.endsWith(".liquid"))
        .forEach((filename) => {
            const name = path.basename(filename, ".liquid");
            const fileContent = readTemplateFile(filename);

            eleventyConfig.addLiquidShortcode(name, function (...args) {
                return fileContent;
            });
        });
}
