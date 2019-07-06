const submit = document.querySelector('.sign__button--submit');
const signupForm = document.getElementById('signupForm')
const wrapper = document.querySelector('.wrapper')

let createWarning = ()=>{
    let div = document.createElement('div')
    let p = document.createElement('p')
    p.textContent = 'Entered passwords are different!'
    div.appendChild(p)
    wrapper.appendChild(div)
}



submit.addEventListener('click', ()=>{
    let password = document.forms['signupForm']['password']
    let confirmedPassword = document.forms['signupForm']['confirmed-password']
    let name =  document.forms['signupForm']['name']
    let surname = document.forms['signupForm']['surname']
    if(password.value == confirmedPassword.value) {
        document.forms['signupForm'].submit();
        password.value = ''
        confirmedPassword.value = ''
        name.value = ''
        surname.value = ''
    }
    else {
        createWarning()
        password.value = ''
        confirmedPassword.value = ''
    }
})
