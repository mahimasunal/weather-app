const APIKEY = "bCvSfvo9qLRGHfJOZh1jmhlZYoqtdHUJ";

const temp = document.querySelector(".temp_num");
const weatherType = document.querySelector(".weather_type");
const weatherImg = document.querySelector(".weatherImg");
const btn = document.querySelector(".btn");
const input = document.querySelector(".search_box");
const weatherInfo = document.querySelector(".weatherInfoContainer");
const forecastContainer = document.querySelector(".forecast_container");
const type = document.querySelectorAll(".type");
const maan = document.querySelectorAll(".maan");

btn.addEventListener("click", () => {
  weatherInfo.innerHTML = "";
  forecastContainer.innerHTML = " ";
  const weatherCity = input.value;
  getCity(weatherCity, APIKEY);
});

function displayWeather(dataCurrent, dataForecast) {
  const currentWeatherHTML = `
   <div class="temp">${dataCurrent.Temperature.Metric.Value}&deg;C</div>
   <div class="temp_box">
       <div class="weatherTypeImg">
           <img src="./icons/${dataCurrent.WeatherIcon}.png" alt="" class="weatherImg">
       </div>
     
       <div class="weather_type">${dataCurrent.WeatherText}</div>
  

</div>
   `;

  weatherInfo.insertAdjacentHTML("afterbegin", currentWeatherHTML);

  dataForecast.DailyForecasts.forEach((forecast) => {
    let tempF = forecast.Temperature.Maximum.Value;
    let tempC = Math.trunc(((tempF - 32) * 5) / 9);
    const forecastHTML = `
    <div class="box">
         <div class="type">${forecast.Day.IconPhrase}</div>
        
                   
          <div class="tapmaan"><span class="maan">${tempC}</span>&deg;C</div>
    </div>
         
    `;
    forecastContainer.insertAdjacentHTML("beforeend", forecastHTML);
  });
}

function getCity(city, key) {
  const cityUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}`;

  fetch(cityUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data[0]);
      let cityKey = data[0].Key;
      console.log(cityKey);

      let promise1 = fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${key}`
      );

      let promise2 = fetch(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${key}`
      );

      console.log(promise1, promise2);

      let promiseAll = Promise.all([promise1, promise2]);

      console.log(promiseAll);
      promiseAll
        .then((results) => {
          console.log(results);
          let arr = results.map((res) => {
            return res.json();
          });

          return Promise.all(arr);
        })

        .then((data) => {
          console.log(data);
          let [dataCurrent] = data[0];
          console.log(dataCurrent);
          let dataForecast = data[1];
          console.log(dataCurrent, dataForecast);
          displayWeather(dataCurrent, dataForecast);
        });
    });
}

// function getCity(city) {
//   const cityUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=bCvSfvo9qLRGHfJOZh1jmhlZYoqtdHUJ&q=${city}`;
//   fetch(cityUrl)
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       let d = data[0].Key;
//       // console.log(d)
//       return fetch(
//         `http://dataservice.accuweather.com/currentconditions/v1/${d}?apikey=bCvSfvo9qLRGHfJOZh1jmhlZYoqtdHUJ`
//       );
//     })
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       console.log(data[0]);
//       if(data[0].WeatherIcon){
//          weatherImg.src = `${data[0].WeatherText}.png`
//       }

//       temp.innerHTML = data[0].Temperature.Metric.Value;

//       weatherType.innerHTML = data[0].WeatherText;
//     });

//     const forecast = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${d}?apikey=bCvSfvo9qLRGHfJOZh1jmhlZYoqtdHUJ`
//     fetch(forecast)
//     .then(res=>{
//       return res.json();
//     })
//     .then((data)=>{
//       console.log(data);
//     })
// }

// btn.addEventListener("click", () => {
//   let c = input.value;
//   console.log(c);
//   getCity(c);
// });

// function getWeather(){
//     fetch(weatherUrl)
//     .then(res =>{
//         return res.json()
//     }).then(data => {
//         console.log(data)
//     })
// }

// getWeather()

// function getCity(city) {
//   const cityUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=bCvSfvo9qLRGHfJOZh1jmhlZYoqtdHUJ&q=${city}`;
//   fetch(cityUrl)
//     .then((res) => {
//       return res.json();
//     })
//     .then((data) => {
//       let d = data[0].Key;
//       console.log(d);

//       let promise1 = fetch(
//         `http://dataservice.accuweather.com/currentconditions/v1/${d}?apikey=bCvSfvo9qLRGHfJOZh1jmhlZYoqtdHUJ`
//       );

//       let promise2 = fetch(
//         `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${d}?apikey=bCvSfvo9qLRGHfJOZh1jmhlZYoqtdHUJ`
//       );

//       console.log(promise1, promise2);

//       let promiseAll = Promise.all([promise1, promise2]);

//       console.log(promiseAll);

//       promiseAll
//         .then((results) => {
//           // const arr = [results[0].json(), results[1].json()];
//           // return Promise.all(arr);

//           //results = [res1, res2]

//           let arr = results.map((res) => {
//             return res.json();
//           })

//           return Promise.all(
//             arr
//           );
//         })
//         .then((data) => {
//           // console.log(data);
//           let data0 = data[0];
//           let data1 = data[1];
//           console.log(data0, data1);

//           if(data0[0].WeatherIcon){
//                      weatherImg.src = `${data0[0].WeatherText}.png`
//                   }

//                   temp.innerHTML = data0[0].Temperature.Metric.Value;

//                   weatherType.innerHTML = data0[0].WeatherText;

//           type.forEach((el,i) => {
//             console.log(el,i);
//             el.innerHTML = data1.DailyForecasts[i].Day.IconPhrase

//           });

//           maan.forEach((box,i)=>{
//                const tempF =  data1.DailyForecasts[i].Temperature.Maximum.Value
//                const tempC = Math.trunc((tempF-32)*5/9)
//                box.innerHTML = tempC
//           })

//         });

// })
// }

// getCity('nainital')

// const getCity = async function(city){

//     const res = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=bCvSfvo9qLRGHfJOZh1jmhlZYoqtdHUJ&q=${city}`);
//     const data = await res.json();
//     console.log(data);
//     let d = data[0].key;

//    const ddata = await Promise.all([
//     getJSON(`http://dataservice.accuweather.com/currentconditions/v1/${d}?apikey=bCvSfvo9qLRGHfJOZh1jmhlZYoqtdHUJ`,getJSON(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${d}?apikey=bCvSfvo9qLRGHfJOZh1jmhlZYoqtdHUJ`))
//    ]);
//    console.log(ddata.map(s=> s[0]));

// }

// getCity('bhimtal')

// let promise1 = fetch(
//   `http://dataservice.accuweather.com/currentconditions/v1/191346?apikey=bCvSfvo9qLRGHfJOZh1jmhlZYoqtdHUJ`
// );

// let promise2 = fetch(
//   `http://dataservice.accuweather.com/forecasts/v1/daily/5day/191346?apikey=bCvSfvo9qLRGHfJOZh1jmhlZYoqtdHUJ`
// );

// console.log(promise1, promise2);

// let promiseAll = Promise.all([promise1, promise2]);

// console.log(promiseAll);

// promiseAll
//   .then((results) => {
//     // const arr = [results[0].json(), results[1].json()];
//     // return Promise.all(arr);

//     //results = [res1, res2]
//     return Promise.all(
//       results.map((res) => {
//         return res.json();
//       })
//     );
//   })
//   .then((data) => {
//     // console.log(data);
//     let data0 = data[0];
//     let data1 = data[1];
//     console.log(data0, data1);
//   });

// const testArray = [1, 2, 3, 4, 5]

// let testArray1 = []
// for(let i = 0; i < testArray.length; i++){
//   testArray1.push(testArray[i] * 2)
// }

// console.log(testArray)
// console.log(testArray1)

// let testArray2 = []

// testArray.forEach(element => {
//   return testArray2.push(element * 2)
// })

// console.log(testArray2)

// let testArray3 = []

// for(element of testArray){
//   testArray3.push(element * 2)
// }

// console.log(testArray3)

// const testArray4 = testArray.map(element => {
//   return element * 2
// }) ///map method always reruns an array

// console.log(testArray4)
