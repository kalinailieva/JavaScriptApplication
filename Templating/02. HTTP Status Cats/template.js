const elements = {
    allCatsSectionElement: ()=> document.getElementById('allCats')
}

Promise.all([
    getTemplate('./template.hbs'),
    getTemplate('./cats.hbs')
])
.then(([templateSrc, catSrc]) =>{ //връща обект от двата гета
    //регистрираме паршъла


    Handlebars.registerPartial('cat', catSrc);//пише се точното име на подтемплейта и от къде се взема
    //закача се темплейта
    let template = Handlebars.compile(templateSrc);
    //прилага се темплейта върху кетс
    let returnHtml = template({cats})

    //слагаме го в HTML-а
    elements.allCatsSectionElement().innerHTML = returnHtml;
    //функция за eventListener на клика. Понеже всеки има различен статус.
    attachEventListener();
})
.catch((e)=>console.error(e));





function getTemplate(templateFileLocation){
    return fetch(templateFileLocation).then((response)=>response.text());
}

function attachEventListener(){
    //закача се на целия елемент с всички котки, защото не знаем, точно на коя ще се цъкне.
    //е-то взема таргета, т.е. точно къде в цялото поле се е цъкнало
    elements.allCatsSectionElement().addEventListener('click', (e)=>{
        const target = e;

        if (target.nodeName === 'BUTTON'&& target.className === 'showBtn') {
            let divStatusElement = target.parentNode.querySelector('div.status');
            if (divStatusElement.style.display === 'none') {
                divStatusElement.style.display = 'block'
                e.target.textContent = 'Hide status code';
            }else{
                divStatusElement.style.display = 'none'
                e.target.textContent = 'Show status code';
            }
        }
    })
}

