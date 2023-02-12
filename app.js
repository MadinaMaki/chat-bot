let questionInput = document.querySelector('.question-input');
let send = document.querySelector('.sending-button');
let messageBlock = document.querySelector('.message-block');

send.addEventListener('click', function () {
    let messageContainer = document.createElement('div');
    messageBlock.append(messageContainer);
    messageContainer.classList.add('message');
    messageContainer.classList.add('question');
    messageContainer.innerHTML = questionInput.value;
    if(questionInput.value.trim()){
        questionInput.value = ''
    }

    fetch('https://chat-gpt-example.vercel.app/makeRequest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            question: questionInput.value.trim()
        })
    })
        .then(function (response){
            return response.json()
        })
        .then(function (res) {
            console.log(res);
            let answerContainer = document.createElement('div');
            answerContainer.classList.add('message');
            let answerDiv = document.createElement('pre')
            answerDiv.classList.add('answer');

            answerContainer.append(answerDiv);
            messageBlock.append(answerContainer);

            answerDiv.innerHTML = res.answer.trim();
            questionInput.value = '';
        })
});

