const idElement = document.getElementById('id');
const firstNameElement = document.getElementById('id');
const lastNameElement = document.getElementById('id');
const facilityNumberElement = document.getElementById('facultyNumber');
const gradeElement = document.getElementById('grade');

const createBtnElement = document.getElementById('create');

createBtnElement.addEventListener('click', createStudent);


function  createStudent(){

let initObj = {
    method:'POST',
    body: JSON.stringify({
        'id': idElement.value, 
        'firstName': firstNameElement.value,
        'lastName': lastNameElement.value,
        'facilityNumber': facilityNumberElement.value,
        'grade': gradeElement.value
    })
}

const baseUrl = 'https://students-f1ba4-default-rtdb.firebaseio.com/.json'
fetch(baseUrl, initObj)

//за вземане на елементите
fetch(baseUrl)
.then((response)=> response.json())
.then((data) =>{
    Object.keys(data).sort()
    .forEach((key)=>{        
        let trElement = document.createElement('tr');
        let idElement = document.createElement('th')
        idElement.textContent = `${data[key].id}`
        


        let firstNameElement = document.createElement('th')
        firstNameElement.innerText = `${data[key].firstName}`

        trElement.appendChild(idElement);
        trElement.appendChild(firstNameElement);

        let tbodyElement = document.querySelector('#results > tbody');
        tbodyElement.appendChild(trElement)
    })
})
//РАБОТИ, трябва да се доразпише до края


    }
