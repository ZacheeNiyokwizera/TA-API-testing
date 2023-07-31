// Global variables
const apiUrl1 = 'http://127.0.0.1:8080/admin/api/add_new_feature';
const accessToken = 'e30=|1690292965|37f05446a6cfaa10c07e1ff2a8f1ddc187ce99f4';
const accessToken1 ='e30=|1690292965|37f05446a6cfaa10c07e1ff2a8f1ddc187ce99f4'

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

   fetch(apiUrl1, {
       method: 'POST',
       headers: {
           'Authorization': `Bearer ${accessToken1}`,
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
