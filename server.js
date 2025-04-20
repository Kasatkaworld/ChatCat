const http = require('http');
const fs = require('fs');
const path = require('path');

//const db = require('./database.js')

//let messages = db.getMessages();

//db.addMessage(message, 1)

const pathToIndex = path.join(__dirname, 'static', 'index.html');
const indexHtmlFile = fs.readFileSync(pathToIndex);

const pathToRegister = path.join(__dirname, 'static', 'register.html');
const RegisterHtmlFile = fs.readFileSync(pathToRegister);

const pathToScript = path.join(__dirname, 'static', 'script.js');
const scriptFile = fs.readFileSync(pathToScript);

const pathToAuthScript = path.join(__dirname, 'static', 'auth.js');
const AuthScriptFile = fs.readFileSync(pathToAuthScript);

const pathToStyle = path.join(__dirname, 'static', 'style.css');
const styleFile = fs.readFileSync(pathToStyle);

const server = http.createServer((req, res) => {
    switch(req.url){
        case '/':
            return res.end(indexHtmlFile);
            break;
        case '/register':
            return res.end(RegisterHtmlFile);
            break;
        case '/style.css':
            return res.end(styleFile);
            break;
        case '/script.js':
            return res.end(scriptFile);
            break;
        case '/auth.js':
            return res.end(AuthScriptFile);
            break;
        case '/api/register':
            let data = '';
            req.on('data', function(chunk){
                data += chunk;
            });
            req.on('end', function(){
                if(data = null){
                    console.log(data);
                    return res.end();
                }else{
                    //db.login_exists(data.login, data.password, data.password_confirm);
                    return res.end();
                }
                
            })
            break;
        default:
            res.statusCode = 404
            return res.end('Error 404');
            
    }
});
server.listen(3000);