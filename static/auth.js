let form = document.getElementById("form")
let login
let password
let loginForm = document.getElementById("form_login")
const xhr = XMLHttpRequest
//console.log(form.login.value)
if(form != null){
    form.addEventListener("submit", function(){
        if(form.password.value == form.password_confirm.value){
            login = form.login.value;
            password = form.password.value;
        }
    })
}else{
    loginForm.addEventListener("submit", function(){
        console.log('good')
        data = JSON(loginForm);
    //     void xhr.open(
    //         method = 'POST',
    //         url = '/api/',
    //         user = loginForm.login.value,
    //         password = loginForm.password.value
    //      );
    //    void xhr.send();
        xhr.onload = () =>{
            if(xhr.status === 200){
                const token = xhr.response;
                document.cookie = `token=${token}`;
                window.location.assign('/');
            }else{
                return alert(xhr.response);
            }
        }
        // if(form.password.value == form.password_confirm.value){
        //     login = form.login.value;
        //     password = form.password.value;
        // }
    })
}


