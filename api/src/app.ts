import express, { json } from "express";

const app = express();

app.use(
    json({
        strict: true,
    })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
