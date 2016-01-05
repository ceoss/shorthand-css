document.addEventListener("scroll", function(){appbar();});
// document.addEventListener("DOMContentLoaded", function() {appbar();});
function appbar() {
	var appbar = document.getElementsByClassName("appbar")[0];
	var tabs = document.getElementsByClassName("tabs")[0];
	var waterfall = document.getElementsByClassName("waterfall")[0];
	var tester = document.getElementById("tester");
	if (window.matchMedia("(max-width: 600px) and (orientation: portrait), (max-width: 960px) and (orientation: landscape)").matches) {
		if (document.body.scrollTop < 48 && document.documentElement.scrollTop < 48) {
			document.body.classList.remove("scrolling");
		} else {
			document.body.classList.add("scrolling");
		}
	} else {
		if (document.body.scrollTop === 0 && document.documentElement.scrollTop === 0) {
			document.body.classList.remove("scrolling");
		} else {
			document.body.classList.add("scrolling");
		}
	}
}