// Remove Element(s)
Element.prototype.remove = function() {
		this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
		for (var i = this.length - 1; i >= 0; i--) {
				if(this[i] && this[i].parentElement) {
						this[i].parentElement.removeChild(this[i]);
				}
		}
}
Element.prototype.removeChildren = function() {
		while (this.firstChild) {
				this.removeChild(this.firstChild);
		}
}
NodeList.prototype.removeChildren = HTMLCollection.prototype.removeChildren = function() {
		for (var i = this.length - 1; i >= 0; i--) {
				while (this[i].firstChild) {
						this[i].removeChild(this[i].firstChild);
				}
		}
}

function permalink() {
	if (document.location.search.length > 0) {
		// Scroll and add layers & values
		var link = document.location.search.replace(/^\?/, "");
		var card = document.getElementById(link.match(/^[-\w]+/));
		var layers = JSON.parse(decodeURIComponent(link.replace(/^[-\w]+=/, "")));
		for (var i = 0; i <= layers.length - 1; i++) { // layers
			if (typeof card.dataset.canLayer !== "undefined" && i >= 1) {
				addBackground();
			}
			var layer = layers[i];
			for (var j = 0; j <= Object.keys(layer).length - 1; j++) { // inputs
				var key = Object.getOwnPropertyNames(layer)[j];
				if (typeof card.dataset.canLayer === "undefined") {
					var input = document.getElementById(key);
				} else {
					var input = card.querySelector(".layer:nth-child(" + (i + 1) + ") #" + key);
				}
				input.value = layer[key];
			}
		}
	}
	convertToShorthand(card);
}
permalink();

function makePermalink(button) {
	var card = button;
	while (!card.classList.contains("card")) {
		card = card.parentElement;
	}
	var object = [];
	var layers = card.querySelectorAll(".longhand .layer");
	if (layers.length === 0) {
		layers = [card.querySelector(".longhand")]
	}
	for (var i = 0; i <= layers.length - 1; i++) { // layers
		var layer = layers[i];
		object[i] = {};
		var inputs = layer.children;
		for (var j = 0; j <= inputs.length - 1; j++) { // inputs
			var input = inputs[j];
			if (input.value.length > 0) {
				object[i][input.id] = input.value;
			}
		}
	}

	var permalink = document.location.origin + "?" + encodeURIComponent(card.id) + "=" + encodeURIComponent(JSON.stringify(object));
	popup("<div class='card'><span class='subheader'>Permalink</span><span class='actions'><i class='material-icons' id='copy' title='Copy' data-clipboard-text='" + permalink + "'>&#xE14D;</i><i class='material-icons' id='close-popup' title='Close'>&#xE5CD;</i></span><input type='text' id='permalink' placeholder='Permalink'></div>");
	document.getElementById("permalink").value = permalink;
	new Clipboard('#copy');
}

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


function popup(html) {
	var element = document.createElement("div");
	element.classList.add("popup");
	element.innerHTML = html;
	document.body.appendChild(element);
	document.getElementById("close-popup").addEventListener("click", turnOffDimmer, false);

	function turnOffDimmer() {
		function removeDimmer() {
			dimmer.removeEventListener("transitionend", removeDimmer, false);
			dimmer.remove();
			element.remove();
		}

		dimmer.removeEventListener("click", turnOffDimmer, false);
		dimmer.classList.remove("on");
		dimmer.addEventListener("transitionend", removeDimmer, false);
		element.classList.remove("open");
	}

	element.classList.add("open");
	var dimmer = document.createElement("div");
	dimmer.id = "mw-dimmer";
	document.body.appendChild(dimmer);
	setTimeout(function() {dimmer.classList.add("on");}, 0);
	dimmer.addEventListener("click", turnOffDimmer, false);
}


/* 
	GitHub Bug Reporter
	Author: Evelyn Hathaway
	Link: https://gist.github.com/evelynhathaway/bbe5dbc82b862de94270
	Version: TODO
*/
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
	var layer = document.querySelector("#background > .longhand > .layer");
	var newLayer = layer.cloneNode(true);
	layer.parentElement.appendChild(newLayer);
	for (var i = 0; i <= newLayer.children.length - 1; i++) {
		newLayer.children[i].value = "";
	}
	var removeButton = document.querySelector("#background #remove-background");
	removeButton.classList.remove("disabled");
}

function removeBackground() {
	var layers = document.querySelectorAll("#background > .longhand > .layer");
	var removeButton = document.querySelector("#background #remove-background");
	if (layers.length <= 2) {
		removeButton.classList.add("disabled");
	}
	if (layers.length <= 1) {
		return false;
	}
	var layer = layers[layers.length - 1];
	var empty = true;

	for (var i = 0; i <= layer.children.length - 1; i++) {
		if (layer.children[i].value.length > 0) {
			empty = false;
			break;
		}
	}

	if (!empty) {
		var response = confirm("You have values in the lower-most layer, continue?");
	}
	if (empty || response) {
		layer.remove();
	}
}


function convertToShorthand(card) {
	// Add each input + space unless special exeption
	var layers = card.querySelectorAll(".longhand .layer");
	var inputs = card.querySelectorAll(".longhand input");
	var shorthandInput = card.querySelector(".shorthand input");

	var areMultipleLayers = layers.length >= 2;
	var notEmptyInputs = [[]];
	for (var i = 0; i < inputs.length; i++) {
		var layer = 0;
		if (areMultipleLayers) {
			while (true) {
				var isNewLayer = layers[layer] === inputs[i].parentElement;
				if (isNewLayer) {
					break;
				} else {
					layer += 1;
					notEmptyInputs[layer] = [];
				}
			}
		}
		if (inputs[i].value.length > 0 || inputs[i].required) {
			notEmptyInputs[layer].push(inputs[i]);
		}
	}

	var value = card.id + ": ";
	for (var i = 0; i < inputs.length; i++) {
		if (areMultipleLayers) {
			for	(var j = 0; j < layers.length; j++) {
				if (layers[j] === inputs[i].parentElement) {
					var inputLayerIndex = j;
				}
			}
			var isLastLayer = inputLayerIndex === layers.length - 1;
			var isLastInLayer = layers[inputLayerIndex].lastElementChild === inputs[i];
		} else {
			var inputLayerIndex = 0;
		}
		var isLastInCard = i === inputs.length - 1;
		var isEmpty = inputs[i].value.length === 0;
		var isRequired = inputs[i].required;
		var isLastNotEmpty = notEmptyInputs[inputLayerIndex][notEmptyInputs[inputLayerIndex].length - 1] === inputs[i];

		if ((inputs[i].id === "background-position" || inputs[i].id === "font-size") && (!isEmpty && inputs[i + 1].value.length > 0)) {
			value += inputs[i].value.replace(/\s*$/, "") + " / " + inputs[i + 1].value.replace(/\s*$/, "");
		} else if ((inputs[i].id === "background-position" || inputs[i].id === "font-size") && (inputs[i + 1].value.length > 0 && isEmpty)) {
			value += inputs[i].dataset.initialValue + " / " + inputs[i + 1].value.replace(/\s*$/, "");
		} else if ((inputs[i].id === "background-position" || inputs[i].id === "font-size" && !isEmpty && inputs[i + 1].value.length === 0) || (inputs[i].id !== "background-size" && inputs[i].id !== "line-height")) {
			value += inputs[i].value.replace(/\s*$/, "");
		}

		// Required Values
		if (isEmpty && isRequired) {
			value += inputs[i].dataset.initialValue;
			isEmpty = false;
		}

		// Value Seperation
		if (areMultipleLayers && !isLastLayer && isLastInLayer) {
			value += ", ";
		} else if (isLastInCard) {
			value += ";";
		} else if (!isEmpty && !isLastNotEmpty) {
			value += " ";
		}
	}

	shorthandInput.value = value;
	shorthandInput.classList.add("active");
	setTimeout(function() {shorthandInput.classList.remove("active");}, 600);
}
document.addEventListener("input", function(event) {
	var card = event.target;
	while (!card.classList.contains("card")) {
		card = card.parentElement;
	}
	var inputParent = event.target.parentElement;
	if (!inputParent.classList.contains("shorthand")) {
		convertToShorthand(card);
	}
});