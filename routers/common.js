const express = require('express')
const Common = require('../controllers/common')
const router = express.Router()
const multer = require('multer')
const upload = require('./../utils/multer')

/* Upload single file */
router.post('/upload-file', upload.single('file'), Common.uploadFile)

/* Upload many files. */
router.post('/upload-files', upload.array('file'), Common.uploadFiles)

module.exports = router
