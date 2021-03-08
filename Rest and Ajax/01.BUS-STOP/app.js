function getInfo() {
    let busNumbers = ['1287', '1308', '1327', '2334'];
    let inputField = document.getElementById('stopId');
    let submitBtn = document.getElementById('submit');
    let stopNameElement = document.getElementById('stopName')
    let busNumber = inputField.value;
    if (!busNumbers.includes(busNumber)) {
        inputField.value = '';
        submitBtn.value = 'Error';
        return; //спира и презарежда
    }else{
        const url = `https://judgetests.firebaseio.com/businfo/${busNumber}.json`; 
        fetch(url)
        .then((response)=> response.json())//преобразува странния обект в json. Това postman си го прави автоматично. Това е json метод на самия промис и не е jsonParse
        .then((bus)=>{//на това ниво, вече като json обект, преименуваме Response в нещо смислено и работим с него като нормален обект
            let stopNameElement = document.getElementById('stopName');
            stopNameElement.textContent = `${bus.name}`;

            let bussesInfoEl = document.getElementById('buses');
            Object.keys(bus.buses).forEach(key =>{
                let li = document.createElement('li');
                li.textContent = `Bus ${key} arrives in ${bus.buses[key]}`
                bussesInfoEl.appendChild(li);
            })
        });

    }
}