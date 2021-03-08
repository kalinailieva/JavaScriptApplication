function attachEvents() {
  let textAreaElement = document.getElementById("messages");
  let nameElement = document.getElementById("author");
  let messageElement = document.getElementById("content");

  let sendBtn = document.getElementById("submit");

  let refreshBtn = document.getElementById("refresh");

  let url = "https://rest-messanger.firebaseio.com/messanger.json";
  
  //Send Button
  sendBtn.addEventListener("click", () => {
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        author: nameElement.value,
        content: messageElement.value,
      }),
    });
    console.log("da");
    nameElement.value = "";
    messageElement.value = "";
  });

  //Refresh Button
  refreshBtn.addEventListener('click', ()=>{
      fetch(url)
      .then((response) => response.json())
      .then((data) => {
          Object.keys(data).forEach(key =>{
              textAreaElement.textContent += `${data[key].author}: ${data[key].content}\n`
          })
      })
  })
}

attachEvents();