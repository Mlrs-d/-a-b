const burgerbutton=() => {
	const burger = document.querySelector(".burger");
	burger.addEventListener('click', () => {
		burger.classList.toggle('toggle');
	});
	
	const side = document.querySelector(".side");
	burger.addEventListener('click', () => {
		side.classList.toggle('toggles');
	});
}

burgerbutton();
