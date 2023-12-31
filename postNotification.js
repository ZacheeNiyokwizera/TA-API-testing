// global variables for fetching data 
const postApiUrl = ''
let accessToken = ''

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

   fetch(postApiUrl, {
       method: 'POST',
       headers: {
           'Authorization': `Bearer ${accessToken}`,
           'Content-Type': 'application/json'
       },
       body: JSON.stringify({
        NewFeatureNotification: newFeatureData
       })
   })
   .then(response => {
       if (!response.ok) {
        console.log(response)
        console.log(response.body)
           throw new Error('Network response was not ok');
           
       }
       return response.json();
   })
   .then(data => console.log('New feature submitted:', data))
   .catch(error => {
    
    console.error('Fetch error:', error)
  
});
}
