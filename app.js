const fs = require("fs");
const express = require("express");
const morgan = require("morgan");

// const { json } = require("express");
const nftsRouter = require("./routes/nftsRouter");
const usersRouter = require("./routes/usersRouter");

const app = express();
app.use(express.json());

if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
}

// Serving template demo
app.use(express.static(`${__dirname}/img`));

// Custom middleware
app.use((req, res, next) => {
    console.log("Hey i am from middleware function 👋🏻");
    next();
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

app.use("/api/v1/nfts", nftsRouter);
app.use("/api/v1/users", usersRouter);

module.exports = app;
