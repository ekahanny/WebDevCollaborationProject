// BUTTON BACK TO TOP
let toTopButton = document.getElementById('btn-back-to-top')

window.onscroll = () => scrollFunction()

function scrollFunction() {
	toTopButton.style.display = document.body.scrollTop > 250 || document.documentElement.scrollTop > 250 ? 'block' : 'none'
}

toTopButton.addEventListener('click', () => {
	document.body.scrollTop = 0
	document.documentElement.scrollTop = 0
})

// BUTTON SUBMIT
document.getElementById('form-registrasi').addEventListener('submit', function (event) {
	event.preventDefault()

	window.location.href = 'succes-page.html'
})
