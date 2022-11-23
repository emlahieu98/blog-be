const { cloudinary } = require('./../utils/cloudinary')
const { transValidation } = require('../langs/errors/vn')
const Joi = require('joi')

exports.uploadFile = async (req, res, next) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'blog/posts',
            use_filename: true,
        })

        return res.status(200).json({
            status: 'success',
            message: transValidation.upload_correct,
            data: {
                url: result.url,
            },
        })
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        })
    }
}

exports.uploadFiles = async (req, res, next) => {
    try {
        const { files } = req
        const result = []
        for (const file of files) {
            const data = await cloudinary.uploader.upload(file.path, {
                folder: 'blog/posts',
                use_filename: true,
            })
            result.push(data.url)
        }

        return res.status(200).json({
            status: 'success',
            message: transValidation.upload_correct,
            data: {
                url: result,
            },
        })
    } catch (error) {
        return res.status(400).json({
            status: 'fail',
            message: error.message,
        })
    }
}
