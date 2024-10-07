import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.get("/", (req, res) => {
    res.json({
       message: "Hello from Express Backend!",
       success: true
    });
});

app.post('/', (req, res) => {
    console.log(req.body)
    res.status(200)
})

// Image upload route to handle Base64 encoded images
app.post('/upload', (req: any, res: any): void => {
    console.log(req.body)

    const { image } = req.body;

    // Check if the 'image' field exists
    if (!image) {
        return res.status(400).json({ success: false, message: "No image provided" });
    }

    // Extract the Base64 string (data:image/jpeg;base64,...)
    const matches = image.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);

    if (!matches || matches.length !== 3) {
        return res.status(400).json({ success: false, message: "Invalid image format" });
    }

    const fileType = matches[1]; // Image type (jpeg, png, etc.)
    const base64Data = matches[2]; // Base64 data
    const buffer = Buffer.from(base64Data, 'base64'); // Convert Base64 to binary

    // Define a unique filename (e.g., timestamp and file type)
    const fileName = `${Date.now()}.${fileType}`;
    const filePath = path.join(__dirname, 'uploads', fileName);

    // Write the file to the 'uploads' directory
    fs.writeFile(filePath, buffer, (err) => {
        if (err) {
            console.error("Error saving the file:", err);
            return res.status(500).json({ success: false, message: "File upload failed" });
        }

        // Respond with success and the file path
        res.json({
            success: true,
            message: "File uploaded successfully",
            filePath: `/uploads/${fileName}`
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
export default app;

