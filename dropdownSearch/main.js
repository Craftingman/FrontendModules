$("document").ready( function() {
	let fruitDropdown = $("#fruitDropdown");
	let fruitDropdownResults = fruitDropdown.children(".dropdownResultsBox");
	let fruitDropdownInput = $("#fruitDropdown .dropdownInput")
	let fruits = ['apple', 'orange', 'pear', 'pineapple', 'lemon', 
	'banana', 'melon', 'watermelon', 'apricot'];

	fruitDropdownInput.on("focus", function() {
		fillDropdown(fruitDropdown, fruits);
	});
	fruitDropdownInput.on("keyup", function() {
		fillDropdown(fruitDropdown, fruits);
	});
	fruitDropdownInput.on("blur", function(e) {
		fruitDropdownResults.hide();
	});
});


function fillDropdown(dropdown, elms) {
	let input = dropdown.children(".dropdownInput");
	let val = input.val();

	let resultsBox = dropdown.children(".dropdownResultsBox");
	let matchedElms = [];

	resultsBox.empty();

	if(val.length > 0) {
		for (el of elms) {
			if (el.includes(val)) {
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
	resultsBox.show(0, function() {
		resultsBox.on("mousedown", function(e) {
			if ($(e.target).is('.dropdownResult')) {
				input.val($(e.target).text());
			}
			resultsBox.hide();
		});
	});
	
}