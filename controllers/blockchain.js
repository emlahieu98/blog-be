const mongoose = require('mongoose')
const Joi = require('joi')
const { transValidation } = require('../langs/errors/vn')
const _ = require('lodash')
const { sendMetadataInIPFS } = require('../services/blockchain')
const { callSMCMintNFT } = require('../services/smart_contract')
exports.createNFT = async (req, res) => {
    try {
        const value = await Joi.object()
            .keys({
                wallet_address: Joi.string(),
                name: Joi.string().required(),
                description: Joi.string().required(),
                image_url: Joi.string().required(),
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
