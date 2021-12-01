// implement your posts router here
const express = require('express')
const Posts = require('./posts-model')
const router = express.Router()

// url prefix for all posts routes: /api/posts
// get all - /
router.get('/', (request, response) => {
	console.log(request.query) // show what the request was asking for? 

	Posts.find(request.query) // find by...? 
		.then(posts => {
			response.status(200).json(posts);
		})
		.catch(error => {
			console.log(error);
			response.status(500).json({
				message: '"The posts information could not be retrieved"',
			})
		})
})



module.exports = router
