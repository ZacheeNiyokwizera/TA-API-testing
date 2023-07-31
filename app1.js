const apiUrl2 = 'http://127.0.0.1:8080/admin/api/fetch_features';
const accessToken = 'e30=|1690292965|37f05446a6cfaa10c07e1ff2a8f1ddc187ce99f4';


//https://tape-aids-dev.nw.r.appspot.com/admin/api/

let featuresCont = document.querySelector('.container');

function fetchData() {
  fetch(apiUrl2, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    let myFeatures = data.features;
    displayFeatures(myFeatures);
  })
  .catch(error => console.error('Fetch error:', error));
}

let featuresList = document.createElement('div');
function displayFeatures(myFeatures){
  myFeatures.forEach(feature => {
    //const isChecked = feature.status === 'true' ? 'checked' : 'false'; // Assuming 'status' is stored as a string ('true' or 'false')

    // If the status of the feature is true or exist (: we will check the HTML Toggle 
    const isChecked = feature.status ? 'checked' : '';


    featuresList.innerHTML += `
      <div class="card">
        <div class="card-items">
          <h2><b>${feature.title} </b></h2> 
          <p>${feature.description}</p> 
          <h4><b>${feature.status}</b></h4> 
       
        </div>

        <div class="card-bottom"> 
          <div class="card-status">
            <label class="switch">
              <input type="checkbox" name="status" data-feature-id="${feature.id}" ${isChecked}>
              <span class="slider round"></span>
            </label>
          </div>

          <div class="card-status">
            <!-- Use data attribute to store the feature key for each button -->
            <button class="myBtn" data-feature-id="${feature.id}">Edit</button>
            <button>Delete</button>
          </div>
        </div>
      </div>`;
  });
  // <input type="checkbox" name="status" data-feature-id="${feature.id}" ${isChecked}>

  featuresCont.appendChild(featuresList);

    // Add event listener for the toggle switches inside the displayFeatures function
    const toggleSwitches = featuresList.querySelectorAll('input[type="checkbox"]');
    toggleSwitches.forEach(toggleSwitch => {
      toggleSwitch.addEventListener('change', function(event) {
        const featureId = event.target.dataset.featureId;
       // const status = event.target.checked ? 'on' : 'off';
       const status = event.target.checked ? 'true' : 'false';

        console.log(`A Message with Id ${featureId} has been changed to ${status}.`);
        alert(`A Message with Id ${featureId} has been changed to ${status}.`)
         console.log(myFeatures)
        // Call the function to update the feature status on the server
        updateFeatureStatus(featureId, status);
      });
    });
  
}


// Get the Update button
let updateBtn = document.getElementById('updateBtn');

// Call the fetchData function to populate the features
fetchData();

// Event delegation for Edit button click
featuresCont.addEventListener('click', function(event) {
  if (event.target.classList.contains('myBtn')) {
    // Get the modal and show it
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

    // Get the parent card element of the clicked Edit button
    const cardElement = event.target.closest('.card');

    // Extract the data from the card element
    const title = cardElement.querySelector('h2').innerText;
    const description = cardElement.querySelector('p').innerText;
    // const status = cardElement.querySelector('h4').innerText;

    // Now you can use the extracted data to populate the form in the modal
    document.getElementById('editTitle').value = title;
    document.getElementById('editDescription').value = description;
    // document.getElementById('editStatus').value = status;


    // Set the feature ID as a data attribute of the Update button inside the modal
    updateBtn.dataset.featureId = event.target.dataset.featureId;

    console.log(updateBtn)

  }
});


  function updateFeatureStatus(featureId, status) {
    fetch(`http://127.0.0.1:8080/admin/api/toggle_feature/${featureId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({ status: status }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Update failed');
      }
      return response.json();
    })
    .then(data => {
      console.log('Feature status updated:', data);
      // You may update the display here to show the updated feature status if needed
    })
    .catch(error => console.error('Update error:', error));
  }
  
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
var modal = document.getElementById("myModal");
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Add event listener to the Update button
updateBtn.addEventListener('click', function(event) {
  event.preventDefault(); // Prevent form submission
  // Get the feature ID from the data attribute of the Update button
  const featureId = updateBtn.dataset.featureId;

  // Call the editFeature() function with the featureId
  editFeature(featureId);
});


function editFeature(featureId) {
  let newTitle = document.getElementById('editTitle').value;
  let newDescription = document.getElementById('editDescription').value;
  // let newStatus = document.getElementById('editStatus').value;
  
  // Get the feature data from the form or anywhere else
  const updatedFeature = {
    title: newTitle,
    description: newDescription,
    // status: newStatus, // or "off", depending on the status
  };

 
  fetch(`http://127.0.0.1:8080/admin/api/update_feature/${featureId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({ updatedFeature }),
  })
  .then(response => {
    console.log(updatedFeature)
    if (!response.ok) {
      console.log(updatedFeature)
      console.log(`Here's the ${featureId}`)

      throw new Error('Update failed');
    }
    return response.json();
  })
  .then(data => {
    console.log('Feature updated:', data);
    modal.style.display = "none";
    window.location.href = 'http://127.0.0.1:5500/index.html';

    // Do something after updating the feature, like displaying a success message
    alert('Are you sure you want to change this ? ');
  })
  .catch(error => console.error('Update error:', error));
}

