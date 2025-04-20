let form = document.getElementById("form")
let login
let password
//console.log(form.login.value)
form.addEventListener("submit", function(){
    if(form.password.value == form.password_confirm.value){
        login = form.login.value;
        password = form.password.value;
    }
})
