const socket = io();

document.getElementById('joinRoom').addEventListener('click', () => {
    const room = document.getElementById('roomInput').value;
    if (room) {
        socket.emit('joinRoom', room);
    }
});

document.getElementById('messageForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const message = document.getElementById('messageInput').value;
    if (message) {
        socket.emit('chatMessage', message);
        document.getElementById('messageInput').value = '';
    }
});

socket.on('message', message => {
    const div = document.createElement('div');
    div.textContent = message;
    document.getElementById('messages').appendChild(div);
});
