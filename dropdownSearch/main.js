$("document").ready( function() {
	let fruitDropdown = $("#fruitDropdown");
	let fruitDropdownResults = fruitDropdown.children(".dropdownResultsBox");
	let fruitDropdownInput = $("#fruitDropdown .dropdownInput")
	let fruits = ['apple', 'orange', 'pear', 'pineapple', 'lemon', 
	'banana', 'melon', 'watermelon', 'apricot'];

	initDropdown(fruitDropdown, fruits);
});


function fillDropdown(dropdown, elms) {
	let input = dropdown.children(".dropdownInput");
	let val = input.val();

	let resultsBox = dropdown.children(".dropdownResultsBox");
	let matchedElms = [];

	resultsBox.empty();

	if(val.length > 0) {
		for (el of elms) {
			if (el.toLowerCase().includes(val.toLowerCase())) {
				matchedElms.push(el);
			}
		}
		for (el of matchedElms) {
			let result = $("<div>", { "class":"dropdownResult", "text":el });
			resultsBox.append(result);
		}
	} else {
		for (el of elms) {
			let result = $("<div>", { "class":"dropdownResult", "text":el });
			resultsBox.append(result);
		}
	}

	resultsBox.off("mousedown");
	input.off("blur");

	resultsBox.show(0, function() {
		resultsBox.on("mousedown", function(e) {
			if ($(e.target).is('.dropdownResult')) {
				input.val($(e.target).text());
				input.off("blur");	
			}
			resultsBox.hide();
		});
	});
	input.on("blur", function(e) {
		dropdown.children(".dropdownResultsBox").hide();
		if ( !(matchedElms.includes(input.val())) && matchedElms.length > 0) {
			input.val(matchedElms[0]);
		} else if (matchedElms.length == 0) {
			input.val(elms[0]);
		}
	});
}

function initDropdown(dropdown, elms) {
	let dropdownInput = dropdown.children(".dropdownInput");

	dropdownInput.on("focus", function() {
		fillDropdown(dropdown, elms);
	});
	dropdownInput.on("keyup", function() {
		fillDropdown(dropdown, elms);
	});
}