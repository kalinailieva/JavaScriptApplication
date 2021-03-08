function loadCommits() {
    let usernameInput = document.getElementById('username');
    let repoInput = document.getElementById('repo');
    let container = document.getElementById('commits');
    container.innerText = ''

    let url = `https://api.github.com/repos/${usernameInput.value}/${repoInput.value}/commits`;


    fetch(url)
    .then((response) => {
        if(response.status < 400){//ако е минала, върни json
        return response.json();
    }
    throw({ //тук маркира грешката и я хвърля като обект, който после може да се ползва като kvp
        status: response.status,
        statusText: response.statusText
    });//и ако има грешка, не продължавай нататък
})
    .then((data) =>{
        data.forEach(element => {
            let li = document.createElement('li');
            li.innerText = `${element.commit.author.name}: ${element.commit.message}`;
            container.appendChild(li);
            
        });
    })
    .catch((error) =>{ //вземи ги от обекта грешка
        let li = document.createElement('li');
            li.innerText = `$Error: ${error.status} (${error.statusText})`;
            container.appendChild(li);
    })


};
