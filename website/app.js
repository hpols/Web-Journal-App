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

//entryholder divs
const dateDiv = document.getElementById('date');
const tempDiv = document.getElementById('temp');
const contentDiv = document.getElementById('content');

//ASYNC get from API
const retrieveData = async (baseUrl, zip, apiKey) => {
	const request = await fetch(baseUrl + zip + apiKey);
	
	try {
		const receivedData =  await request.json();
		console.log(receivedData);
		return receivedData;
	} catch (error) {
		console.log('error', error);
	}
}

//ASYNC get from Local
const updateUI = async () =>{
	const uiRequest = await fetch('/all');
	
	try {
		const localData = await uiRequest.json();
		console.log(localData);
		dateDiv.textContent = localData.date;
		tempDiv.textContent = localData.temperature;
		contentDiv.textContent = localData.userResponse;
	} catch (error) {
		console.log('error', error);
	}
}

//CHAIN: post & get
function postRetrieve() {
	//get user input
	let zip = document.getElementById('zip').value;
	let feeling = document.getElementById('feelings').value;
	
	retrieveData(baseUrl, zip, apiKey) //get data from api
	.then(function(data) {
		postData ('/data', { //bundle user data and api, and store
			temperature: data.main.temp, 
			date: newDate, 
			userResponse: feeling
		})
	})
	.then(updateUI('/data')) //get locally stored data and update ui
	}

document.getElementById('generate').addEventListener('click', postRetrieve);
