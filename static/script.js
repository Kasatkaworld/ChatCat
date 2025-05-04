// const db = require('./database')
const form = document.getElementById('form1')
const input = document.getElementById('input')
const messages_html = document.getElementById('messages')
// let messages = db.getMessages();
const socket = io({
    auth: {
        cookie: document.cookie
    }
});
let nickname = prompt("Please enter your Nickname?");
// socket.emit('event_name', data);

// socket.on('event_name', (data)=>{})

form.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('gg')
    if(input.value){
        socket.emit('new_message', input.value,nickname );
        input.value = '';
    }
})
socket.on('message', (message, Nickname, id)=>{
    messages_html.innerHTML += `<li>${Nickname}: ${message}</li>`
    // db.addMessage(message, id)
})

window.scrollTo(0, document.body.scrollHeight);
// const io = new Server(server);
// io.emit('event_name', data);
// socket.emit('event_name', data);
// socket.on('event_name', (data)=>{})



//db.addMessage(message, 1)