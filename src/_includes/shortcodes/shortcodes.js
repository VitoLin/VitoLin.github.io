import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export default function (eleventyConfig) {
    const dirPath = fileURLToPath(new URL(".", import.meta.url));
    const files = fs.readdirSync(dirPath);

    const liquidFiles = files.filter((f) => f.endsWith(".liquid"));

    // Register each shortcode explicitly for better error messages
    liquidFiles.forEach((filename) => {
        const name = path.basename(filename, ".liquid");
        const filePath = path.join(dirPath, filename);

        try {
            eleventyConfig.addLiquidShortcode(name, function () {
                return fs.readFileSync(filePath, "utf8");
            });
        } catch (err) {
            throw new Error(`Failed to register shortcode "${name}" from ${filename}: ${err.message}`);
        }
    });

    // Log registered shortcodes in debug mode
    if (process.env.DEBUG) {
        console.log(`Registered ${liquidFiles.length} shortcodes: ${liquidFiles.map((f) => path.basename(f, ".liquid")).join(", ")}`);
    }
}
