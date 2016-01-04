document.addEventListener("scroll", function(){appbar();});
// document.addEventListener("DOMContentLoaded", function() {appbar();});
function appbar() {
	var appbar = document.getElementsByClassName("appbar")[0];
	var waterfall = document.getElementsByClassName("waterfall")[0];
	var tester = document.getElementById("tester");
	if (document.body.scrollTop === 0 && document.documentElement.scrollTop === 0) {
		appbar.classList.remove("shadow");
		waterfall.classList.add("falling");
		tester.classList.add("white");
	} else {
		appbar.classList.add("shadow");
		waterfall.classList.remove("falling");
		tester.classList.remove("white");
	}
}