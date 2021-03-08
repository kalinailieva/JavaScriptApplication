const elements = {//това е най-обикновен обект
    input: ()=>document.querySelector('input#towns'),
    loadBtn: ()=>document.querySelector('button#btnLoadTowns'),
    divRoot: ()=>document.querySelector('div#root')
}
//после се взема, като елемент на обекта
elements.loadBtn().addEventListener('click', getInputInformation);

function getInputInformation(e){
    e.preventDefault();//не се рефрешвай
    const inputValue = elements.input().value;
    let towns = inputValue.split(',').map(x => {return {name: x}} )
    //направи обект, който да има име и стойност. Така е разписан темплейта ни
    console.log(towns)
    appendTowns(towns); //закачи ги за темплейта
}

function appendTowns(towns){
getTemplate()
.then((templateSource)=> { //вземи резултата и го компайл на темплейт
    const template = Handlebars.compile(templateSource);
    const htmlResult = template({towns});
    elements.divRoot().innerHTML = htmlResult;
})
.catch((e)=> console.error(e))
}

function getTemplate(){
    return fetch('./template.hbs')//вземи файла
    .then((response)=> response.text());//направи го на текст
}