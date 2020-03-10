const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const messageElement = document.querySelector('.messages');
const API_URL = 'http://localhost:3000/messages';

loadingElement.style.display = ""; //none

listAllMessages();

form.addEventListener('submit', (event) =>{
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content')

    const message = {
        name,
        content
    };
    form.style.display = '';
    loadingElement.style.display = 'none';

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
    .then(createdMessage => {
        console.log(createdMessage)
        form.reset();
        form.style.display = '';
        listAllMessages();
        loadingElement.style.display = 'none';
    })
    
})
// list all messages, creates div element below the loading bar
// with a name header and a content p tag
function listAllMessages() {
    messageElement.innerHTML = '';
    fetch(API_URL)
        .then(response => response.json())
        .then(messages => {
            console.log(messages)
            messages.reverse();
            messages.forEach(message => {
                const div = document.createElement('div')

                const header = document.createElement('h3');
                header.textContent = message.name;

                const content = document.createElement('p');
                content.textContent = message.content;

                const date = document.createElement('small');
                date.textContent = new Date(message.created);

                div.appendChild(header);
                div.appendChild(content);
                div.appendChild(date);
                messageElement.appendChild(div);
            });
            loadingElement.style.display = 'none';
        });
}
