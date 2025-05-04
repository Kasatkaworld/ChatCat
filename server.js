const http = require('http');
const fs = require('fs');
const path = require('path');



const db = require('./database.js')

//let messages = db.getMessages();
let validAuthTokens = []
//db.addMessage(message, 1)

const pathToIndex = path.join(__dirname, 'static', 'index.html');
const indexHtmlFile = fs.readFileSync(pathToIndex);

const pathToRegister = path.join(__dirname, 'static', 'register.html');
const RegisterHtmlFile = fs.readFileSync(pathToRegister);

const pathToLogin = path.join(__dirname, 'static', 'login.html');
const LoginHtmlFile = fs.readFileSync(pathToLogin);

const pathToScript = path.join(__dirname, 'static', 'script.js');
const scriptFile = fs.readFileSync(pathToScript);

const pathToAuthScript = path.join(__dirname, 'static', 'auth.js');
const AuthScriptFile = fs.readFileSync(pathToAuthScript);

const pathToStyle = path.join(__dirname, 'static', 'style.css');
const styleFile = fs.readFileSync(pathToStyle);

function guarded(req,res){
    const credentionals = getCredentionals(req.headers?.cookie);
    if(!credentionals){
        res.writeHead(302, {'location': '/register'});
    }
    if(req.method == 'GET'){
        switch(req.url){
            case '/': return res.end(indexHtmlFile);
            case '/script.js': return req.end(scriptFile);
        }
    }
    res.writeHead(404);
    return res.end('Error 404');
}
function getCredentionals(c = ''){
    const cookies = cookie.parse(c);
    const token = cookies?.token;
    if(!token || !validAuthTokens.includes(token)) return null;
    const [user_id, login] = token.split('.');
    if(!user_id || !login) return null;
    return {user_id, login};
}



const server = http.createServer((req, res) => {
    switch(req.url){
        case '/':
            return res.end(indexHtmlFile);
            break;
        case '/register':
            return res.end(RegisterHtmlFile);
            break;
        case '/login':
            return res.end(LoginHtmlFile);
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
        case '/api/login':
            let data_login = '';
            req.on('data', function(chunk){
                data_login += chunk;
            });
            req.on('end', function(){
                console.log(data_login)
                try{
                   const user = JSON.parse(data_login);
                   console.log(user)
                    const token = 0//await db.getAuthToken(user);
                    validAuthTokens.push(token);
                    res.writeHead(200);
                    res.end(token);
                }catch(e){
                    res.writeHead(500)
                    return res.end('Error: '+e)
                }
                //return res.end();
            })
            break;
        default:
            res.statusCode = 404
            return res.end('Error 404');
            
    }
});
const { Server } = require('socket.io');

const io = new Server(server);

io.on('connection', (socket) => {
    let userNickname = 'user'
    console.log('a user conected. id - ' + socket.id);
    socket.on('new_message', (message)=>{
        io.emit('message', message)
        console.log(message);
    })
});
// io.emit('event_name', data);

// socket.emit('event_name', data);



server.listen(3000);