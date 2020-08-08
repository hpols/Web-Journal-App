//ASYNC post
const postData = async (url =' ', data = {}) => {
	
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers : {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});
	
	try {
		const newData = await response.json();
		return newData;
	} catch (error) {
		console.log('error', error);
	}
}

/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&units=imperial&appid=<ADD YOUR OWN>'; //set to imperial then add api

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//retrieve user input
let feeling = document.getElementById('feelings').value;
let zip = document.getElementById('zip').value;

//ASYNC get
const retrieveData = async (baseUrl, zip, apiKey) => {
	const request = await fetch(baseUrl + zip + apiKey);
	
	try {
		const receivedData =  await request.json();
		console.log(receivedData);
	} catch (error) {
		console.log('error', error);
	}
}

//CHAIN: post & get
function postRetrieve() {
	retrieveData(baseUrl, 94040, apiKey)
	.then(function() {
		postData ('/data', {
			temperature: retrieveData.main.temp, 
			date: newDate, 
			userResponse: feeling
		})
		console.log(retrieveData)
	})
}

postRetrieve();
