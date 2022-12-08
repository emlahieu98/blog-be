const express = require('express')
const Blockchain = require('../controllers/blockchain')
const router = express.Router()

/* Get blockchain route. */
router.post('/create-nft', Blockchain.createNFT)

module.exports = router
