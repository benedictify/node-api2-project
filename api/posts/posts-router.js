const express = require('express')
const Posts = require('./posts-model')
const router = express.Router()

// url prefix for all posts routes: /api/posts
// get all: get /
router.get('/', (request, response) => {
	Posts.find()
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

// get one: get /:id
router.get('/:id', (request, response) => {
	Posts.findById(request.params.id)
		.then(post => {
			// .json takes the arg and encodes it into a json object
			post
				? response.status(200).json(post)
				: response.status(404).json({ message: "The post with the specified ID does not exist" })
		})
		.catch(error => {
			console.log(error);
			response.status(500).json({ message: "The post information could not be retrieved" })
		})
})

// add new: post /
router.post('/', (request, response) => {
	Posts.insert(request.body)
		.then(post => {
			response.status(201).json(post);
		})
		.catch(error => {
			console.log(error)
			if (request.body.title == null || request.body.contents == null) {
				response.status(400).json({ message: "Please provide title and contents for the post" })
			} else {
				response.status(500).json({
					message: "There was an error while saving the post to the database"
				})
			}
		})
})

module.exports = router
