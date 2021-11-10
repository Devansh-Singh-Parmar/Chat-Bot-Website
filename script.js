const form = document.querySelector('#form')
const fname = document.querySelector('#fname')
const answer = document.querySelector('#answer')
let question
let api = "https://api.monkedev.com/fun/chat?msg="
let link
fname.focus()

form.addEventListener('submit', async e => {
    e.preventDefault()
    question = fname.value
    api += question;
    link = encodeURI(api) // encoding to URL type for request
    fname.disabled = true
    fetch(link)
        .then(res => res.json())
        .then(data => {
            console.log(data)
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
    fname.disabled = false
    fname.focus()
    fname.value = ''
})