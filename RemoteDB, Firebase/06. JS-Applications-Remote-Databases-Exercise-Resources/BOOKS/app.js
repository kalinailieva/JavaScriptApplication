//прави се един селектор на елементи с много възможности, функция е
const htmlSelectors = {
    'loadBooks' : () => document.getElementById('loadBooks'),
    "createBtn": () => document.querySelector("#create > button"),
    "createTitleElement": ()=> document.getElementById("create-title"),
    "createAuthorElement": ()=> document.getElementById("create-author"),
    "createIsbnElement": ()=> document.getElementById("create-isbn"),
    //и контейнера, в който ще рендерираме дом елементите
    "booksContainer": ()=> document.querySelector("body > table > tbody"),
    
}


htmlSelectors['loadBooks']().addEventListener('click', fetchAllBooks);

htmlSelectors['createBtn']().addEventListener('click', createBook);
let deleteButton = document.getElementById('');

().addEventListener('click', createBook);



function fetchAllBooks(){
    const allbooksUrl = 'https://books-c3626-default-rtdb.firebaseio.com/Books.json'
    fetch(allbooksUrl)
    .then((result)=> result.json())
    .then((books) =>{
        Object.keys(books).forEach((key)=>{
            const {Author, Isbn, title} = books[key];
            //трябва да са точно!!! както са въведени в базата имената
 
            
        let elementTr = createDomElement('tr', '',{},{})//...->николко или повече
        
        let elementAuthor = createDomElement('td', Author,{},{});
        let elementTitle = createDomElement('td', title,{},{});
        let elementIsbn = createDomElement('td', Isbn,{},{});
        
        let tdButton = createDomElement('td', '',{},{});
        let editBtn = createDomElement('button','Edit',{'data-key' : key,},{click: loadBookById})
        let deleteBtn = createDomElement('button','Delete',{'data-key' : key,},{click: deleteBookById})
        tdButton.appendChild(editBtn);
        tdButton.appendChild(deleteBtn);

        elementTr.appendChild(elementAuthor);
        elementTr.appendChild(elementTitle);
        elementTr.appendChild(elementIsbn);
        elementTr.appendChild(tdButton)
        console.log(elementTr)
        
        let bookContainer = htmlSelectors['booksContainer']();//трябва да е с двете скоби накрая
        bookContainer.appendChild(elementTr);
        
        })
        
    })
    .catch(handleError)
}

function loadBookById(){
const id = this.getAttribute('data-key')
console.log(id)
}

function handleError(err){
    let errorElement = document.getElementById('errorHandler');
    errorElement.style.display = 'block';
    //това до тук не е ясно защо не работи. Err е undefined
    //за да се появи и изчезне след 10 секунди - set timeout
    setTimeout(()=>{
        errorElement.style.display = 'none';
    }, 5000)
    

}

function createBook(e){
    e.preventDefault();
    const createTitleElement = htmlSelectors['createTitleElement']();
    const createAuthorElement = htmlSelectors['createAuthorElement']();
    const createIsbnElement = htmlSelectors['createIsbnElement']();
    
    if (createTitleElement!=='' && createAuthorElement !== '' && createIsbnElement !== '') {
        const initObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: createTitleElement.value, Author: createAuthorElement.value, Isbn: createIsbnElement.value})
        }

        fetch('https://books-c3626-default-rtdb.firebaseio.com/Books/.json', initObj);
    console.log('proba')
    }
}
function deleteBookById(){
  let currentID = this.getAttribute('data-key');  
  fetch('https://books-c3626-default-rtdb.firebaseio.com/Books/'+`${currentID} + '/.json`,{method: 'DELETE'} )
}

function createDomElement(type, text, attributes, events, ...children){
    const domElement = document.createElement(type);
    if (text !== '') {
        domElement.textContent = text;
    }

    Object.entries(attributes)
    .forEach(([attrKey, attrValue]) => {
        domElement.setAttribute(attrKey, attrValue);
    });

    Object.entries(events)
    .forEach(([eventName, eventHandler])=>{
        domElement.addEventListener(eventName, eventHandler);
    })

    children
    .forEach((child)=>{
        domElement.appendChild(child);
    });

    return domElement;
}