const registerBtnElement = document.getElementById('register-btn');
registerBtnElement.addEventListener('click', registerUser());

function registerUser(e){
    e.preventDefault();//за да не рефрешне страницата
    const emailInputElement = document.getElementById('email');
    const passwordInputElement = document.getElementById('password');
    console.log('bachka')
    //console.log(emailInputElement.value, passwordInputElement.value )
}
не е довършена, не тръгва