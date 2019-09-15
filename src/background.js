'use strict';

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set({
    buttons: [
      'button[vet="10761"]',
      'button[jstcache="155"]',
      'button[jstcache="134"]',
      'button[vet="16735"]'
    ],
    definitions: [
      {
        selector: 'watermark',
        isId: true
      },
      {
        selector: 'inputtools',
        isId: true
      },
      {
        selector: 'omnibox',
        isId: true
      },
      {
        selector: 'gb',
        isId: true
      },
      {
        selector: 'widget-homescreen',
        isId: false
      },
      {
        selector: 'app-vertical-widget-holder',
        isId: false
      },
      {
        selector: 'app-bottom-content-anchor',
        isId: false
      },
      {
        selector: 'scene-footer-container',
        isId: false
      },
      {
        selector: 'widget-minimap',
        isId: false
      },
      {
        selector: 'top-center-stack',
        isId: false
      }
    ]
  }, () => { });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'www.google.com', pathContains: '/maps' },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
