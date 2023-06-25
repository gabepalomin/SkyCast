async function getData(input) {
  // let url = "http://api.weatherapi.com/v1/current.json?key=3fda6242348841e0adf144419232206&q=chantilly"
  let url = "http://api.aviationstack.com/v1/flights?access_key=9cc39ae140aa6ce121de7951a3bab71d&flight_iata=" + input;
  // console.log(url);
  //HU3954
  fetch(url, { mode: "cors" })
    .then(function (response) {
      alert('first then');
      return response.json();
    })
    .then(function (data) {
      alert('second then');
      console.log(data);
      displayData(data);
    });
}

//Submit button is clicked
let submitBtn = document.querySelector('#FlightNumberSubmitButton');

submitBtn.addEventListener('click', (event) => {
  alert('btn clicked')
  let flightNumberInput = document.querySelector('#userInput');
  console.log(flightNumberInput.value);
  getData(flightNumberInput.value);
});
// getData();


function displayData(data) {
  //declaring variables for all the data needed for delay predictor api call
  let depIata = data["data"]["0"]["departure"]["iata"];
  let arrIata = data["data"]["0"]["arrival"]["iata"];
  //departure times
  let departure = data["data"]["0"]["departure"]["scheduled"];
  let depDate = departure.slice(0, 10);
  let depTime = departure.slice(11, 19);
  //arrival times
  let arrival = data["data"]["0"]["arrival"]["scheduled"];
  let arrDate = arrival.slice(0, 10);
  let arrTime = arrival.slice(11, 19);
  //more data
  let aircraftCode = data["data"]["0"]["flight"]["number"];
  let carrierCode = data["data"]["0"]["airline"]["iata"];
  let flightNumber = data["data"]["0"]["flight"]["number"];
  let duration = calculateDuration(
    departure.slice(0, 19),
    arrival.slice(0, 19)
  );
  let gate = data["data"]["0"]["departure"]["gate"];
  let h1 = document.querySelector('h1');
  h1.textContent = '' + depIata, arrIata, depDate, depTime, arrDate, arrTime, aircraftCode, carrierCode, flightNumber, duration;
  alert(depIata, arrIata, depDate, depTime, arrDate, arrTime, aircraftCode, carrierCode, flightNumber, duration);
//   let url2 =
//     "https://test.api.amadeus.com/v1/travel/predictions/flight-delay?originLocationCode=" +
//     depIata +
//     "&destinationLocationCode=" +
//     arrIata +
//     "&departureDate=" +
//     depDate +
//     "&departureTime=" +
//     depTime.slice(0, 2) +
//     "%3A" +
//     depTime.slice(3, 5) +
//     "%3A00&arrivalDate=" +
//     arrDate +
//     "&arrivalTime" +
//     arrTime.slice(0, 2) +
//     "%3A" +
//     arrTime.slice(3, 5) +
//     "%3A00aircraftCode=" +
//     aircraftCode +
//     "&carrierCode=" +
//     carrierCode +
//     "&flightNumber=" +
//     flightNumber +
//     "&duration=" +
//     duration;
//   console.log(url2);
  //https://test.api.amadeus.com/v1/travel/predictions/flight-delay?originLocationCode=IAD&destinationLocationCode=PTY&departureDate=2023-06-23&departureTime=16%3A27%3A00&                                                aircraftCode=444&carrierCode=CM&flightNumber=444&duration=P0DT3H59M0S
  //https://test.api.amadeus.com/v1/travel/predictions/flight-delay?originLocationCode=NCE&destinationLocationCode=IST&departureDate=2020-08-01&departureTime=18%3A20%3A00&arrivalDate=2020-08-01&arrivalTime=22%3A15%3A00&aircraftCode=321&carrierCode=TK&flightNumber=1816&duration=PT31H10M
//   fetch(url2, {
//     headers: { Authorization: "Bearer {z6oSs32Lj7rulfxacCvYFrzFdM3X}" },
//   })
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//     });
}

function calculateDuration(departure, arrival) {
  //calculate duration and put it into ISO8601 format
  const departureTime = new Date(departure);
  const arrivalTime = new Date(arrival);

  // Calculate the duration in milliseconds
  const durationInMilliseconds = arrivalTime - departureTime;

  // Convert milliseconds to duration components
  const durationInSeconds = Math.floor(durationInMilliseconds / 1000);
  const days = Math.floor(durationInSeconds / (24 * 3600));
  const hours = Math.floor((durationInSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = durationInSeconds % 60;

  // Format the duration in ISO 8601 format
  const isoDuration = `P${days}DT${hours}H${minutes}M${seconds}S`;
  return isoDuration;
}









// axios.get('http://api.aviationstack.com/v1/flights?access_key=9cc39ae140aa6ce121de7951a3bab71d')
//     .then(response => {
//         console.log(response.data);
//     })
//     .catch(error => console.error(error));

//assuming i am able to acquire the data

// $.ajax({
//     url: 'http://api.aviationstack.com/v1/flights',
//     data: {
//       access_key: '5c40e29ff976a4bbe788a0e851c8f3f1'
//     },
//     dataType: 'json',
//     success: function(apiResponse) {
//       if (Array.isArray(apiResponse['results'])) {
//         apiResponse['results'].forEach(flight => {
//           if (!flight['live']['is_ground']) {
//             console.log(`${flight['airline']['name']} flight ${flight['flight']['iata']}`,
//                 `from ${flight['departure']['airport']} (${flight['departure']['iata']})`,
//                 `to ${flight['arrival']['airport']} (${flight['arrival']['iata']}) is in the air.`);
//           }
//         });
//       }
//     }
//   });
