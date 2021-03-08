function attachEvents() {
    let loadBtn = document.getElementById('btnLoad');
    let createBtn = document.getElementById('btnCreate');

    let ulPhonebookEl = document.getElementById('phonebook');
    const url = 'https://phonebook-nakov.firebaseio.com/phonebook';
//Load btn
    loadBtn.addEventListener('click', ()=>{
        fetch(url + '.json')
        .then((response) => response.json())
        .then((data) =>{
           
           //!!!!!! КОЕ КАК СЕ ДОСТЪПВА
           Object.keys(data).forEach((key) => {
             let li = document.createElement("li");
             li.textContent = `${data[key].person}:${data[key].phone}`;

             let deleteBtn = document.createElement("button");
             deleteBtn.textContent = "DELETE";
             let deleteURL = url + `/${key}` + ".json";

             li.appendChild(deleteBtn);
             ulPhonebookEl.appendChild(li);
             deleteBtn.addEventListener("click", () => {
               fetch(deleteURL, { method: "DELETE" });
             });
           });
            
        });
    });
    //Create btn
    let personInputEl = document.getElementById('person');
        

    createBtn.addEventListener('click', ()=>{
        let personInputValue = personInputEl.value;
        let phoneInputEl = document.getElementById('phone');
        let phoneInputValue = phoneInputEl.value;
        let postUrl = 'https://phonebook-nakov.firebaseio.com/phonebook.json';
        fetch(postUrl, {method: 'POST', body: JSON.stringify({person: personInputValue, phone: phoneInputValue})
    });  
    personInputEl.value= '';
    phoneInputEl.value = '';      
    });
}

attachEvents();