let questionInput = document.querySelector('.question-input');
let send = document.querySelector('.sending-button');
let messageBlock = document.querySelector('.message-block');

questionInput.addEventListener('keydown', function (event){
    if(event.code === 'Enter') {
        submitQuestion();
        questionInput.value = '';
    }
})

send.addEventListener('click', function () {
    submitQuestion();
    questionInput.value = ''
});

function submitQuestion() {
    let messageContainer = document.createElement('div');
    messageBlock.append(messageContainer);
    messageContainer.classList.add('message');
    messageContainer.classList.add('question');
    messageContainer.innerHTML = questionInput.value;
    questionInput.value = '';

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
            let answerContainer = document.createElement('div');
            let answerDiv = document.createElement('pre')
            answerContainer.classList.add('message');
            answerDiv.classList.add('answer');
            answerContainer.append(answerDiv);
            messageBlock.append(answerContainer);

            answerDiv.innerHTML = res.answer.trim();
        })
        .catch(function (){
            alert('Ошибка!');
        });
}