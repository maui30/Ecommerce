//form
let formBtn = document.querySelector('.submit-btn');
let loader = document.querySelector('.loader');

formBtn.addEventListener('click', () =>{
    let fullname = document.querySelector('#name');
    let email = document.querySelector('#email');
    let password = document.querySelector ('#password');
    let number = document.querySelector ('#number');
    let tac = document.querySelector ('#tc');

   // form validation
    if(fullname.value.length < 3){
        showFormError('name must be 3 letters long');
    }else if(!email.value.length){
        showFormError('enter your email');
    }else if(password.value.length < 8){
        showFormError('password must be more than 7 letters log');
    }else if(!Number(number) || number.value.length < 10){
        showFormError('Invalid phone number');
    }else if(!tac){
        showFormError('you must agree to our terms and conditions');
    }else{
        //submit form
        loader.style.display = 'block';
        sendData('/signup', {
            name: fullname.value,
            email: email.value,
            password: password.value,
            number: number.value,
            tac: tac.checked
        })
    }
})