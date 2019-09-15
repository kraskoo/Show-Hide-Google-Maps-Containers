'use strict';

let buttons = document.getElementById('buttons');
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
	for (let tab of tabs) {
		Array.from(buttons.children).forEach(b => {
			b.addEventListener('click', ev => {
				let currentButton = ev.target;
				let id = currentButton.getAttribute('id');
				if (id === 'hide-containers') {
					showAndRemoveContainer(tab, 'none');
				} else if (id === 'show-containers') {
					showAndRemoveContainer(tab, 'block');
				} else if (id === 'get-coordinates') {
					chrome.tabs.executeScript(tab.id, { file: './coords.js' });
				}
			});
		});
	}
});

function showAndRemoveContainer(currentTab, display) {
	chrome.storage.sync.get('buttons', function (data) {
		let buttonSelectors = data.buttons;
		for (let selector of buttonSelectors) {
			var selectorMatch = selector.match(/vet=\"\d+\"/g);
			if (selectorMatch && selectorMatch.length > 0) {
				var numMatch = selectorMatch[0].match(/\d+/g);
				if (numMatch && numMatch.length > 0) {
					var num = Number(numMatch[0]);
					if (num === 16735 && display === 'block') {
						selector = selector.replace(numMatch[0], `${++num}`);
					}
				}
			}
			
			chrome.tabs.executeScript(
				currentTab.id,
				{ code: `var but = document.querySelector('${selector}'); if(but !== null) { but.click(); but.style.display = '${display}'; }` });
		}
	});
	chrome.storage.sync.get('elements', function (data) {
		for (let element of data.elements) {
			let isId = element.isId;
			if (isId) {
				chrome.tabs.executeScript(
					currentTab.id,
					{ code: `var el = document.getElementById('${element['selector']}'); if(el !== null) el.style.display = '${display}';` });
			} else {
				chrome.tabs.executeScript(
					currentTab.id,
					{ code: `var el = document.getElementsByClassName('${element['selector']}'); if(el.length > 0) el[0].style.display = '${display}';` });
			}
		}
	});
}