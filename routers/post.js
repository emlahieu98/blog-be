const express = require('express')
const Post = require('../controllers/post')
const router = express.Router()

/* Get post route */
router.get('/', Post.getPosts)

router.post('/', Post.createPost)

router.get('/:id', Post.getPostDetail)

router.put('/:id', Post.editPost)

router.delete('/:id', Post.deletePost)

module.exports = router
