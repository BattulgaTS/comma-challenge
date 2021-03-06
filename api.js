const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

router.get('/comma-data', (req, res) => {
	let data = [];
	let filenames = fs.readdirSync(path.join(__dirname, 'comma-data'));
	let promises = filenames.map( (filepath) => {
		return new Promise ((resolve, reject) => {
			fs.readFile(path.join(__dirname, 'comma-data', filepath), 'utf8', (err, data) => {
				if (err) {
					console.log(err);
					reject(err)
				} else {
					let object = JSON.parse(data);
					object.name = filepath;
					resolve(object);
				}
			})
		})
	})

	Promise.all(promises)
		.then ( (data) => {
			res.json(data);
		})
		.catch ((err) => {
			console.log("Error while trying to read comma-data", err);
		})
});

module.exports = router