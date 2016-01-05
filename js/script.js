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

var tester = document.getElementById("tester");

var backgroundImage = document.getElementById("background-image");
var backgroundPosition = document.getElementById("background-position");
var backgroundSize = document.getElementById("background-size");
var backgroundRepeat = document.getElementById("background-repeat");
var backgroundOrigin = document.getElementById("background-origin");
var backgroundClip = document.getElementById("background-clip");
var backgroundAttachment = document.getElementById("background-attachment");
var backgroundColor = document.getElementById("background-color");
var backgroundShorthand = document.getElementById("background-shorthand");

var borderWidth = document.getElementById("border-width");
var borderStyle = document.getElementById("border-style");
var borderColor = document.getElementById("border-color");
var borderShorthand = document.getElementById("border-shorthand");
function convert() {
	// Background
	var backgroundValue = "background: ";
	if (backgroundImage.value.length > 0) {backgroundValue += backgroundImage.value.replace(/\s+$/, "") + " ";};

	if (backgroundPosition.value.length > 0 && backgroundSize.value.length > 0) {
		backgroundValue += backgroundPosition.value.replace(/\s+$/, "") + " / " + backgroundSize.value.replace(/\s+$/, "") + " ";
	} else if (backgroundPosition.value.length > 0 && backgroundSize.value.length === 0) {
		backgroundValue += backgroundPosition.value.replace(/\s+$/, "") + " ";
	} else if (backgroundSize.value.length > 0 && backgroundPosition.value.length === 0) {
		backgroundValue += "initial / " + backgroundSize.value.replace(/\s+$/, "") + " ";
	}

	if (backgroundRepeat.value.length > 0) {backgroundValue += backgroundRepeat.value.replace(/\s+$/, "") + " ";};
	if (backgroundOrigin.value.length > 0) {backgroundValue += backgroundOrigin.value.replace(/\s+$/, "") + " ";};
	if (backgroundClip.value.length > 0) {backgroundValue += backgroundClip.value.replace(/\s+$/, "") + " ";};
	if (backgroundAttachment.value.length > 0) {backgroundValue += backgroundAttachment.value.replace(/\s+$/, "") + " ";};
	if (backgroundColor.value.length > 0) {backgroundValue += backgroundColor.value.replace(/\s+$/, "") + " ";};

	backgroundShorthand.value = backgroundValue.replace(/\s+$/, ";");
	tester.style.background = backgroundValue.replace(/^background:\s*/, "");

	// Border
	var borderValue = "border: ";
	if (borderWidth.value.length > 0) {borderValue += borderWidth.value.replace(/\s+$/, "") + " ";};
	if (borderStyle.value.length > 0) {borderValue += borderStyle.value.replace(/\s+$/, "") + " ";};
	if (borderColor.value.length > 0) {borderValue += borderColor.value.replace(/\s+$/, "") + " ";};
	borderShorthand.value = borderValue.replace(/\s+$/, ";");
	tester.style.border = borderValue.replace(/^border:\s*/, "");
}
document.addEventListener("input", function(){convert();});