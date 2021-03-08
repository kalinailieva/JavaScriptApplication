function attachEvents() {
    let weatherBtn = document.getElementById('submit');
    let inputElement = document.getElementById('location');
    const locationUrl = 'https://judgetests.firebaseio.com/locations.json';
    const baseUrl = 'https://judgetests.firebaseio.com/forecast/';

    const symbols = {
      Sunny: "&#x2600",// ☀
      "Partly sunny": "&#x26C5",// ⛅
      Overcast: "&#x2601",// ☁
      Rain: "&#x2614",// ☂
      Degrees: "&#176",// °
    };

    weatherBtn.addEventListener("click", () => {
      fetch(locationUrl)
        .then((response) => response.json())
        .then((data) => {
          //връща обект, който отговаря на името на инпута
          let { name, code } = data.find((c) => c.name === inputElement.value);
          //fetch today
          let current = fetch(baseUrl + `today/${code}.json`).then((response) =>
            response.json()
          );

          let upcoming = fetch(
            baseUrl + `upcoming/${code}.json`
          ).then((response) => response.json());
          //Първо се изпълнява fetcha, който е по-бърз. И понеже това, може да е втория, а те са взаимносвързани, за това, за да сме сигурни, че двата промиса са изпълнени се прави Promise.All. И промисите трябва да са върнати като обекти.

          Promise.all([current, upcoming]) //когато имаме резултат от двете заявки, тогава продължавай
            .then(([currentData, upcomingData]) => {
              let forecastDiv = document.getElementById("forecast");
              forecastDiv.style.display = "block";
              console.log(currentData);
              let divForecast = document.createElement("div");
              divForecast.className = "forecasts";
              console.log(divForecast);

              let currentSymbol = symbols[currentData.forecast.condition];

              let conditionSpan = document.createElement("span");
              conditionSpan.className = "condition symbol";
              conditionSpan.innerHTML = currentSymbol;
              divForecast.appendChild(conditionSpan);

              let currentDiv = document
                .getElementById("current")
                .appendChild(divForecast);

              let conditionSpanMainEl = createNewElement(
                "span",
                "condition",
                ""
              );
              let spanCityEl = createNewElement(
                "span",
                "forecast-data",
                currentData.name
              );
              let spanTempEl = createNewElement(
                "span",
                "forecast-data",
                `${currentData.forecast.low}${symbols.Degrees}/${currentData.forecast.high}${symbols.Degrees}`
              );
              let spanCondEl = createNewElement(
                "span",
                "forecast-data",
                currentData.forecast.condition
              );
              conditionSpanMainEl.appendChild(spanCityEl);
              conditionSpanMainEl.appendChild(spanTempEl);
              conditionSpanMainEl.appendChild(spanCondEl);

              divForecast.appendChild(conditionSpanMainEl);
            })
            .catch((err) => console.log(err));
        });
      //функция за създаване на елементи
      function createNewElement(elementType, classes, content) {
        let element = document.createElement(elementType);
        element.className = classes;
        element.innerHTML = content;
        return element; //ТРЯБВА ДА ИМА RETURN!!!!!!
      }
    });       
    }
attachEvents();