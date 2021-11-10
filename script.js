const form = document.querySelector('#form')
const fname = document.querySelector('#fname')
const lname = document.querySelector('#lname')
let question
let api = "https://api.monkedev.com/fun/chat?msg="
let link

form.addEventListener('submit', e => {
    e.preventDefault()
    question = fname.value
    api += question;
    link = encodeURI(api) // encoding to URL type for request
    fetch(link)
        .then(res => {
            res.json()
            console.log(res);
            console.log(res.body);
        })
        .catch(err => console.log(err))
})