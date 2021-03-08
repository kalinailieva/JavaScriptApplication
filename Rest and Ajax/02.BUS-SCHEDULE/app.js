function solve() {
    let currentStop = 'depot';
    let currentId = 'depot';
    
    let departBtnEl = document.getElementById('depart');
    let arriveBtnEl = document.getElementById('arrive');
    let infoEl = document.querySelector(".info");

//базов URL, защото то върти и цикли после от depart, а не от началото на солвето
    const baseUrl = 'https://judgetests.firebaseio.com/schedule/';
    
    function depart() {
        departBtnEl.disabled = true;
        arriveBtnEl.disabled = false;
        fetch(baseUrl + currentId + '.json')
        .then((response)=> response.json())
        .then((data)=>{
            currentId = data.next;
            console.log(currentId)
            currentStop = data.name;      
            console.log(currentStop) 
            infoEl.textContent = `Next stop ${data.name}`;
        })
        .catch(()=>{
            infoEl.textContent('Error');
        });

    }
    function arrive() {
        departBtnEl.disabled = false;
        arriveBtnEl.disabled = true;
        infoEl.textContent = `Arriving at ${currentStop}`
    }

    return {
        depart,
        arrive
    };
}

let result = solve();