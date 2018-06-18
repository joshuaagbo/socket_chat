const socket = io.connect('http://localhost:3000');

// get the DOM;
let output = document.querySelector('.output');
const message = document.getElementById('message');
const handler = document.getElementById('handler');
const submit = document.getElementById('submit');
const feedback = document.getElementById('feedback');
// addeventlistener;
message.addEventListener('keypress', _validatKeypress)
submit.addEventListener('click', _validateSubmit);

// hide output bu default;
output.style.display = 'none';

// validate keypress;
function _validatKeypress(){
    socket.emit('typing',handler.value);
}
// validate submission;
function _validateSubmit(){
    output.style.display = 'block';
    socket.emit('chat',{
        handler: handler.value,
        message: message.value
    });
}
    // listen for events;
socket.on('chat', (data)=> {
    feedback.innerHTML = '';
    output.innerHTML += `
    <p><strong>${data.handler}:</strong> ${data.message}</p>
    `;
});

socket.on('typing', (data)=>{
    output.style.display = 'block';
    feedback.innerHTML = `<p><em> ${data} is typing a message...</em></p>`;
})
