const form = document.querySelector('#form')
const fname = document.querySelector('#fname')
const answer = document.querySelector('#answer')
const speakBtn = document.querySelector('#speak')
let question
let link
fname.focus()

const giveResponse = async question => {
    let url = `https://api.monkedev.com/fun/chat?msg=${question}`
    link = encodeURI(url) // encoding to URL type for request
    fetch(link)
        .then(res => res.json())
        .then(data => {
            readThis(data.response)
            let p1 = document.createElement('p')
            let p2 = document.createElement('p')
            p1.innerHTML = `<b>You: </b>${question}`
            p1.classList.add('que')
            p2.innerHTML = `<b>Bot: </b>${data.response}`
            p2.classList.add('ans')
            answer.appendChild(p1)
            answer.appendChild(p2)
        })
        .catch(err => console.log(err))
} 

form.addEventListener('submit', async e => {
    e.preventDefault()
    question = fname.value
    fname.disabled = true
    giveResponse(question)
    fname.disabled = false
    fname.focus()
    fname.value = ''
})

const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
const recognition = new SpeechRecognition()

recognition.onstart = () => console.log("Voice is activated")
recognition.onerror = e => console.log("Error occured: ", e.error)

const readThis = message => {
    const speech = new SpeechSynthesisUtterance()
    speech.text = message
    speech.volume = 1
    speech.rate = 1
    speech.pitch = 1
    window.speechSynthesis.speak(speech)
}

recognition.onresult = e => {
    const current = e.resultIndex
    const transcript = e.results[current][0].transcript
    giveResponse(transcript)
    fname.focus()
}

speakBtn.addEventListener('click', () => recognition.start())