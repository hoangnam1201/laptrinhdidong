const axios = require('axios')
const apiKey = '40ad9837f4f44228b9c01c7ef588277f'

const geocodeding = async (req, res) => {
	const params = {
		apiKey: apiKey,
		text: req.query.text
	}
	axios.get('https://api.geoapify.com/v1/geocode/search', { params })
		.then(response => {
			const data = JSON.parse(JSON.stringify(response.data)).features
			if(data.length == 0){
				return res.status(400).json({err: 'not found'})
			}
			return res.status(200).json(
				{
					lat: data[0].properties.lat,
					lon: data[0].properties.lon
				}
			)
		}).catch(error => {
				return res.status(400).json({err: 'not found'})
		});
}

module.exports ={
	geocodeding: geocodeding
}