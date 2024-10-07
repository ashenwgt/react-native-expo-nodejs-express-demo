import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import fs from 'fs';

const upload = multer({ dest: 'uploads/' })


const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/upload', upload.single('document'),(req , res) => {
    console.log(req.file, req.body)
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
export default app;

