import { Question } from './question'
import { isValid } from './utils'
import './styles.css'

const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')

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
