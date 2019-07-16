const signUp = document.getElementById('signupBtn');
const signupWrapper = document.getElementById('signupWrapper')
const wrapper = document.querySelector('.wrapper')
const signupForm = document.forms['signupForm']
const form = document.getElementById('signupForm')
const password = signupForm['password']
const confirmedPassword = signupForm['confirmPassword']
const name = signupForm['name']

let alerts = []

let createWarning = (alertText)=>{
    let div = document.createElement('div')
    div.textContent = alertText
    div.setAttribute('id', 'warning')
    div.setAttribute('class', 'alert alert-danger')
    div.setAttribute('role','alert')
    signupWrapper.insertBefore(div, form)
}

let removeWarning = ()=>{
    let alert = document.querySelectorAll('#warning')
    let backendAlert = document.getElementById('signinAlert')
    if(alert!=null)
        alert.forEach((alert)=>{
            alert.remove()
        })
    if(backendAlert!=null)
        backendAlert.remove()

}

let formValidity = ()=>{
    alerts = []
    if(name.value == '')
        alerts.push('Login string cannot be empty')
    if(password.value.length < 8)
        alerts.push('Password string has to have at least 8 characters ')
    if(confirmedPassword.value != password.value)
        alerts.push('Passwords don\'t match')
    if(alerts.length != 0)
        return false
    return true
}

signUp.addEventListener('click', ()=>{
    removeWarning()
    if(formValidity()){
            signupForm.submit();
            password.value = ''
            confirmedPassword.value = ''
            name.value = ''
    }
    else
        alerts.forEach((alert)=>{
            createWarning(alert)
        })
})

signupForm.addEventListener('click',removeWarning)
