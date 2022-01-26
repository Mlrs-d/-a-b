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
