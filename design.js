const button=() => {
	const burger = document.querySelector(".burger");
	burger.addEventListener('click', () => {
		burger.classList.toggle('toggle')
	});
}

button();
