// const db = require('./database')
const form = document.getElementById('form1')
const input = document.getElementById('input')
const messages = document.getElementById('messages')
const socket = io({
    auth: {
        cookie: document.cookie
    }
});

// socket.emit('event_name', data);

// socket.on('event_name', (data)=>{})

form.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('gg')
    if(input.value){
        socket.emit('new_message', input.value);
        input.value = '';
    }
})
socket.on('message', (message, Nickname, id)=>{
    messages.innerHTML += `<li>${Nickname}: ${message}</li>`
    // db.addMessage(message, id)
})

window.scrollTo(0, document.body.scrollHeight);
// const io = new Server(server);
// io.emit('event_name', data);
// socket.emit('event_name', data);
// socket.on('event_name', (data)=>{})

// let messages = db.getMessages();

//db.addMessage(message, 1)