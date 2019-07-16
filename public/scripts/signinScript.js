const signIn = document.getElementById('signinBtn');
const signinWrapper = document.getElementById('signinWrapper')
const signinForm = document.forms['signinForm']
const form = document.getElementById('signinForm')
const password = signinForm['password']
const name = signinForm['name']
const wrapper = document.querySelector('.wrapper')
let alerts = []

let createWarning = (alertText)=>{
    let div = document.createElement('div')
    div.textContent = alertText
    div.setAttribute('id', 'warning')
    div.setAttribute('class', 'alert alert-danger')
    div.setAttribute('role','alert')
    signinWrapper.insertBefore(div, form)
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
        alerts.push('Name string cannot be empty')
    if(password.value.length < 8)
        alerts.push('Password string has to have at least 8 characters ')
    if(alerts.length != 0)
        return false
    return true
}

signIn.addEventListener('click', ()=>{
    removeWarning()
    if(formValidity()){
            signinForm.submit();
            password.value = ''
            name.value = ''
    }
    else
        alerts.forEach((alert)=>{
            createWarning(alert)
        })
})

signinForm.addEventListener('click',removeWarning)