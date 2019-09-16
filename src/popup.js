'use strict';

let buttons = document.getElementById('buttons');
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  for (let tab of tabs) {
    Array.from(buttons.children).forEach(b => {
      b.addEventListener('click', ev => {
        let currentButton = ev.target;
        let id = currentButton.getAttribute('id');
        if (id === 'hide-containers') {
          showOrRemoveContainers(tab, 'none');
        } else if (id === 'show-containers') {
          showOrRemoveContainers(tab, 'block');
        } else if (id === 'get-coordinates') {
          chrome.tabs.executeScript(tab.id, { file: './coords.js' });
        }
      });
    });
  }
});

function showOrRemoveContainers(currentTab, display) {
  chrome.storage.local.get(['buttons', 'definitions'], function (data) {
    for (let selector of data.buttons) {
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
        { code: `var button = document.querySelector('${selector}'); if (button !== null) { button.click(); button.style.display = '${display}'; }` });
    }

    for (let definition of data.definitions) {
      var codeByDefinition = definition.isId ?
        `var element = document.getElementById('${definition['selector']}'); if (element !== null) element.style.display = '${display}';` :
        `var element = document.getElementsByClassName('${definition['selector']}'); if (element.length > 0) element[0].style.display = '${display}';`;
      chrome.tabs.executeScript(currentTab.id, { code: codeByDefinition });
    }
  });
}