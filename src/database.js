import Firebase from 'firebase'

var config = {
    apiKey: "AIzaSyACkDisWotcZiE699728ZF1ZlWJMYf_iUk",
    authDomain: "lab-1-senior-design.firebaseapp.com",
    databaseURL: "https://lab-1-senior-design.firebaseio.com",
    projectId: "lab-1-senior-design",
    storageBucket: "",
    messagingSenderId: "536740735141",
    appId: "1:536740735141:web:a13ba58deec1856773c54c"
  };

  let app = Firebase.initializeApp(config);
  
  export const database = app.database();

  /******************************************** FUNCTIONS BELOW **************************************/
// function updateTemperature() {
//     setInterval(database.ref('/sensor-is-plugged').on('value', function(snapshot)
//   {
//     if(snapshot.val() === 'true'){
//       database.ref('/').once('value').then(function(snapshot){

//       });
//     }
//   }), 1000);
// }
//   function displayData() {
//     var data = IMU.getValueSync();
//     var str2 = util.format('%s %s', data.temperature.toFixed(4));
//     console.log(str2);
//     writeNewData(data.temperature);
//   }
    

// function writeNewData(temp) {
//     updates['/temperature'] = temp;
//     return database.ref().update(updates);
// }

