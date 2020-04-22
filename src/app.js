import { Question } from './question'
import { isValid, createModal } from './utils'
import './styles.css'
import { getAuthForm, authWithEmailAndPassword } from './auth'

const form = document.getElementById('form')
const modalBtn = document.getElementById('modal-btn')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')

window.addEventListener('load', Question.renderList)

const submitFormHandler = (evt) => {
  evt.preventDefault()
  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON()
    }
    submitBtn.disabled = true
    // async request to server to save question
    Question.create(question).then(() => {
      input.value = ''
      input.className = ''
      submitBtn.disabled = false
    })
  }
}

form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', () => {
  submitBtn.disabled = !isValid(input.value)
})

const authFormHandler = (evt) => {
  evt.preventDefault()

  const btn = evt.target.querySelector('button')
  const email = evt.target.querySelector('#email').value
  const password = evt.target.querySelector('#password').value

  btn.disabled = true
  authWithEmailAndPassword(email, password)
    .then(token => {
      return Question.fetch(token)
    })
    .then(renderModalAfterAuth)
    .then(() => {
      btn.disabled = false
    })
}

function renderModalAfterAuth (content) {
  if (typeof content === 'string') {
    createModal('Error', content)
  } else {
    createModal('List of questions', Question.listToHTML(content))
  }
}

const openModal = () => {
  createModal('Auth', getAuthForm())
  document
    .getElementById('auth-form')
    .addEventListener('submit', authFormHandler, { once: true })
}

modalBtn.addEventListener('click', openModal)
