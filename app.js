// Global variables

// // Load the environment variables from the .env file
require('dotenv').config();

const apiUrl = process.env.POST_API_URL;
const accessToken = process.env.ACCESS_TOKEN;

function submitFeature(event) {
   event.preventDefault();
   const title = document.getElementById('title').value;
   const description = document.getElementById('description').value;
   //const status = document.getElementById('status').value;
   const status = document.getElementById('status').checked ? 'on' : 'off';

   const newFeatureData = {
       title: title,
       description: description,
       status: status
   };

   fetch(apiUrl, {
       method: 'POST',
       headers: {
           'Authorization': `Bearer ${accessToken}`,
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
           newFeature: newFeatureData
       })
   })
   .then(response => {
       if (!response.ok) {
           throw new Error('Network response was not ok');
       }
       return response.json();
   })
   .then(data => console.log('New feature submitted:', data))
   .catch(error => console.error('Fetch error:', error));
}
