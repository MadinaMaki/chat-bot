let questionInput = document.querySelector('.question-input');
let send = document.querySelector('.sending-button');
let messageBlock = document.querySelector('.message-block');

send.addEventListener('click', function () {
    let messageContainer = document.createElement('div');
    let message = document.createElement('p');
    messageContainer.append(message);
    messageBlock.append(messageContainer);
    messageContainer.innerHTML = questionInput.value;
    messageContainer.classList.add('message-container');

    fetch('https://chat-gpt-example.vercel.app/makeRequest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            question: questionInput.value
        })
    })
        .then(function (response){
            return response.json()
        })
        .then(function (res) {
            console.log(res);
            let answerContainer = document.createElement('pre');
            answerContainer.classList.add('answer-container');
            messageBlock.append(answerContainer);
            answerContainer.innerHTML = res.answer.trim();

            questionInput.value = '';
        })
});
