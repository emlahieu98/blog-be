const express = require('express')
const Blockchain = require('../controllers/blockchain')
const router = express.Router()

/* Get blockchain route. */
router.post('/create-nft', Blockchain.createNFT)
router.get('/list-nfts', Blockchain.getNFTs)
router.post('/get-metadata-nfts', Blockchain.getMetadataNFTs)

module.exports = router
