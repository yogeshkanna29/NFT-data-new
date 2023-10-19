const fs = require("fs");
const nfts = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/collection.json`)
);

// const NFT = require("./../models/nftModel");

exports.checkId = (req, res, next, value) => {
    console.log(`ID: ${value}`);
    if (req.params.id * 1 > nfts.length) {
        return res.status(404).json({
            status: "Fail",
            message: "Invalid ID",
        })
    }
    next();
}

exports.checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.collection){
        return res.status(400).json({
            status: "fail",
            message: "MIssing name and collection"
        })
    }
    next();
}

// Get Method
exports.getAllNfts = (req, res) => {
    res.status(200).json({
        status: "success",
        requestTime: req.requestTime,
        results: nfts.length,
        data: {
            nfts: nfts,
        },
    })
}
// Post Method
exports.createNft = (req, res) => {
    const newId = nfts[nfts.length - 1].id + 1;
    const newNFTs = Object.assign({ id: newId }, req.body)
    nfts.push(newNFTs)
    fs.writeFile(
        `${__dirname}/data/collection.json`,
        JSON.stringify(nfts),
        (err) => {
            res.status(201).json({
                status: "success",
                nft: newNFTs,
            })
        });
}
// Get Method for Single Nft
exports.getSingleNft = (req, res) => {
    const id = req.params.id * 1;
    const nft = nfts.find((el) => (el.id === id));
    res.status(200).json({
        status: "success",
        data: {
            nft,
        },
    })
}
// Patch Method
exports.updateNft = (req, res) => {
    // if (req.params.id * 1 > nfts.length) {
    //     return res.status(404).json({
    //         status: "Fail",
    //         message: "Invalid ID",
    //     })
    // }
    res.status(200).json({
        status: "success",
        data: {
            nft: "Updating nft",
        },
    })
}
// Delete Method
exports.deleteNft = (req, res) => {
    res.status(204).json({
        status: "success",
        data: null
    })
}