var zipCode =  document.getElementById('zip');
const apiKey = "1c5efd2c14f3610051c69dcabcee230c";
var apiURL= "https://api.openweathermap.org/data/2.5/weather?zip=";
const btn = document.getElementById('generate');
const temp = document.getElementById('temp');
const date = document.getElementById('date');
const content = document.getElementById('content');


//get data function
 const getData = async () => {
     const request =await fetch(apiURL+zipCode.value+"&appid="+apiKey);
     try{
      const data = await request.json();
      return data;
    }catch(error){
      console.log("error" , error);
    }
 };
 

 const postData = async (url = "", data= {}) => {
   var fullAPIURL = apiURL+zipCode.value+"&appid="+apiKey+'/add';
   await fetch('/add', {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(data)});
    try{
      return;
    }catch(error){
     console.log("error", error );
   }
 };

 const updateContent = async () => {
   const request = await fetch('/all');
   var feelings = document.getElementById('feelings').value;

   try{
    await request.json().then(function (data) {
      date.innerHTML = `Date is: ${data.date}`;
      temp.innerHTML = `Temprature is: ${data.temp}`;
      content.innerHTML = `Current Feeling is: ${feelings}`;});
   }catch(error){
    console.log("error", error );
  }
};
 





// adding functionality to generate button

btn.addEventListener('click', handleClick);

function handleClick(){
    if(!zipCode.value){
        alert('Pleas eneter Zip code');
    }else{
      getData().then(function(data){
        postData('/all', {
          date: new Date,
          temp: data.main.temp,
        });
        updateContent();
      });
    }
  }

