const form = document.querySelector('form');
const inputs = document.querySelectorAll('input')

document.addEventListener('DOMContentLoaded', () => {
    getLocalStorage();
    form.addEventListener('input', () => {
        setLocalStorage()
    })
})

function setLocalStorage() {
    inputs.forEach(input => {
        localStorage.setItem(input.id, input.value)
    })
}

function getLocalStorage() {
    inputs.forEach(input => {
        input.value = localStorage.getItem(input.id)
    })
}

