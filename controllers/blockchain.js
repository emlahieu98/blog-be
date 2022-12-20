const mongoose = require('mongoose')
const Joi = require('joi')
const { transValidation } = require('../langs/errors/vn')
const _ = require('lodash')
const {
    getNFTsByAddress,
    sendMetadataInIPFS,
} = require('../services/blockchain')
const { callSMCMintNFT } = require('../services/smart_contract')
const axios = require('axios')
exports.createNFT = async (req, res) => {
    try {
        const value = await Joi.object()
            .keys({
                wallet_address: Joi.string(),
                name: Joi.string().required(),
                description: Joi.string().required(),
                image_url: Joi.string().required(),
                external_link: Joi.string().allow(''),
                attributes: Joi.array().required(),
            })
            .validateAsync(req.body, { stripUnknown: true })

        const result = await sendMetadataInIPFS(value)

        await callSMCMintNFT(value.wallet_address, result)

        return res.status(200).json({
            status: 'success',
            message: transValidation.input_correct,
            data: result,
        })
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        })
    }
}

exports.getNFTs = async (req, res) => {
    try {
        const value = await Joi.object()
            .keys({
                wallet_address: Joi.string(),
            })
            .validateAsync(req.query, { stripUnknown: true })

        const result = await getNFTsByAddress(value.wallet_address)

        return res.status(200).json({
            status: 'success',
            message: transValidation.input_correct,
            data: result?.result.filter(
                (item) =>
                    item.token_address ==
                    process.env.CONTRACT_ADDRESS_NFT_BSC.toLowerCase()
            ),
        })
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        })
    }
}

exports.getMetadataNFTs = async (req, res) => {
    try {
        const value = await Joi.object()
            .keys({
                url: Joi.string(),
            })
            .validateAsync(req.body, { stripUnknown: true })

        const result = await axios.get(value.url)

        return res.status(200).json({
            status: 'success',
            data: result.data,
        })
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        })
    }
}
