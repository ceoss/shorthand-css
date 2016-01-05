function appbar() {
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
document.addEventListener("scroll", function(){appbar();});
appbar();