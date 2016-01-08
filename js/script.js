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


var errors = [];
window.onerror = function(error, url, line) {
	error = {"error": error, "url": url, "line": line};
	if (errors.length > 0) {
		var lastError = errors[errors.length - 1];
		if (error.error === lastError.error && error.url === lastError.url && error.line === lastError.line) {
			typeof lastError.recurrences === "number" ? lastError.recurrences ++ : lastError.recurrences = 1;
			return;
		}
	}
	errors.push(error);
};
function bugReport() {
	var url = "https://github.com/xorprojects/Shorthand-CSS/issues/new?title=" + encodeURIComponent("Problem With Input") + "&body=" + encodeURIComponent("Explain your problem here: \n\n*Please leave this for the developers:*\n```json\nErrors: ");
	if (errors.length > 0) {
		for (var i = 0; i < errors.length; i++) {
			url += encodeURIComponent(JSON.stringify(errors[i]));
		}
	} else {
		url += encodeURIComponent("None. (Yay!)");
	}
	url += encodeURIComponent("\n\nUser-Agent: " + navigator.userAgent + "\n```");
	var win = window.open(url, '_blank');
	win.focus();
}


function addBackground() {
	var inputs = document.querySelectorAll("#background > .longhand > input");
	for (var i = 0; i <= 7; i++) {
		input = inputs[i].cloneNode();
		input.value = "";
		document.querySelector("#background > .longhand").appendChild(input);
	}
}


function convertToShorthand(card) {
	// Add each input + space unless special exeption
	// TO-DO 1) Use next sibling 2) Add comma for multiple backgrounds 3) Correct element regardless to subheaders and buttons
	var inputs = card.children[1].children;
	var value = card.id + ": ";
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].tagName !== "INPUT") {
			continue;
		}
		if (inputs[i].id === "background-position" || inputs[i].id === "font-size") {
			if (inputs[i].value.length > 0 && inputs[i + 1].value.length > 0) {
				value += inputs[i].value.replace(/\s+$/, "") + " / " + inputs[i + 1].value.replace(/\s+$/, "") + " ";
			} else if (inputs[i].value.length > 0 && inputs[i + 1].value.length === 0) {
				value += inputs[i].value.replace(/\s+$/, "") + " ";
			} else if (inputs[i + 1].value.length > 0 && inputs[i].value.length === 0) {
				value += inputs[i].getAttribute("initial-value") + " / " + inputs[i + 1].value.replace(/\s+$/, "") + " ";
			}
		} else if (inputs[i].value.length > 0 && inputs[i].id !== "background-size" && inputs[i].id !== "line-height") {
			value += inputs[i].value.replace(/\s+$/, "") + " ";
		}
		// Required Values
		if (inputs[i].value.length === 0 && inputs[i].required) {
			value += inputs[i].getAttribute("initial-value") + " ";
		}
	}
	card.children[3].children[1].value = value.replace(/\s+$/, ";");
}
document.addEventListener("input", function(event) {
	var card = event.target.parentElement.parentElement;
	var inputParent = event.target.parentElement;
	if (inputParent.classList.contains("shorthand")) {

	} else {
		convertToShorthand(card);
	}
});