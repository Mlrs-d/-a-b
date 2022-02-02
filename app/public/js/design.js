const burgerbutton=() => {
	const burger = document.querySelector(".burger");
	const side = document.querySelector(".side");
	const header = document.querySelector("header");
	const main = document.querySelector("#main");
	
	burger.addEventListener('click', () => {
		burger.classList.toggle('toggle');
		side.classList.toggle('toggles');
		header.classList.toggle('h_toggle');
		main.classList.toggle('h_toggle');
	});
}

burgerbutton();

var initBody;

function beforePrint() {
 boxes = document.body.innerHTML;
 document.body.innerHTML = main.innerHTML;
}
function afterPrint() { 
 document.body.innerHTML = mains;
}
function printArea() {
 window.print();
}

window.onbeforeprint = beforePrint;
window.onafterprint = afterPrint;
