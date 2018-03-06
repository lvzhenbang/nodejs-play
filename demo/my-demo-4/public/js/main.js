// alert close
var el = document.querySelector('.sign .alert .close');
if(el) {
	el.addEventListener('click', function() {
		this.parentNode.style.display = 'none';
	} ,false);
}