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
const apiKey = '&units=imperial&appid=024db20323369000380081c865f243a7'; //set to imperial then add api

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//retrieve user input
let feeling = document.getElementById('feelings').value;

//entryholder divs
const dateDiv = document.getElementById('date');
const tempDiv = document.getElementById('temp');
const contentDiv = document.getElementById('content');

//ASYNC get
const retrieveData = async (baseUrl, zip, apiKey) => {
	const request = await fetch(baseUrl + zip + apiKey);
	
	try {
		const receiveData =  await request.json();
		console.log(receiveData);
		return receiveData;
	} catch (error) {
		console.log('error', error);
	}
}

//CHAIN: post & get
function postRetrieve() {
	let zip = document.getElementById('zip').value;
	retrieveData(baseUrl, zip, apiKey)
	.then(function(retrieveData) {
		postData ('/data', {
			temperature: retrieveData.id.main.temp, 
			date: newDate, 
			userResponse: feeling
		})
		console.log(retrieveData)
	})
	.then(function() {
		dateDiv.textContent = postData.date;
		tempDiv.textContent = postData.temperature;
		contentDiv.textContent = postData.userResponse;
	})
}

document.getElementById('generate').addEventListener('click', postRetrieve);
