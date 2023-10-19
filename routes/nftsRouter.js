const express = require("express");
const nftsRouter = express.Router();
const nftControllers = require("./../controllers/nftController")

nftsRouter.param("id", nftControllers.checkId) 

nftsRouter.route("/")
    .get(nftControllers.getAllNfts)
    .post(nftControllers.checkBody, nftControllers.createNft);
nftsRouter.route("/:id")
    .get(nftControllers.getSingleNft)
    .patch(nftControllers.updateNft)
    .delete(nftControllers.deleteNft)

module.exports = nftsRouter;