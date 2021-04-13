/* Global Variables */

const apiKey = "&appid=6393ae4578659d24d9100ea1ebd36800=imperial";
const apiURL = "http://localhost:8000/";

const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const temp = document.getElementById('temp');
const date = document.getElementById('date');
const content = document.getElementById('content');

//event listener for when user clicks generate button
document.getElementById('generate').addEventListener('click', fGenerate);

// generate button function:
function fGenerate(){
  let data = {
    zipcode: zip.value,
    content: content.value,
    date: new Date()
  };

// 1- we send zip code to API to get the info related to it
  getZipCode(data.zipcode).then(zipinfo=> {
    if (zipinfo.cod !=200)
     return alert(zipinfo.message);
// get temprature
    data.temp = zipinfo.list[0].main.temp;
    postDatatoServer(data);
  }).catch(catchError());


}
// getZipCode function:

async function getZipCode(zipCode){
  return await(await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode}${apiKey}`).json());
}

//posting data to server
async function postData(data){
  let response = await fetch (`${apiURL}postData`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
  try {
    if(!response.ok){
      alert('failure!')
      return;
    }
    response.json().then(data => {
      if(response.ok)
       updateUserInterface();
      else
       alert('failure!');
    }).catch(catchError());
  } catch(error){
    catchError(error);
  }
}

//changing UI function

async function updateUserInterface(){
  let response = await fetch(`${apiURL}all`);
  try {
    response.json().then(data => {
      date.innerHTML = `Data is: ${data.date}`;
      temp.innerHTML = `Temprature is: ${data.temp}`;
      content.innerHTML = `Current Feeling is: ${data.content}`;
    }).catch(catchError());
  } catch (error) {
    catchError(error);
  }
}

//error display

const catchError = (error)=>console.log('There is an error', error);
