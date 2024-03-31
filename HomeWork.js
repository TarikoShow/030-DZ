// ==UserScript==
// @name         My New Bot
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Bot for Bing new
// @author       Degtyarenko Evgeniy
// @match        https://www.zapmeta.com/*
// @grant        none
// ==/UserScript==

let input = document.getElementsByName("search-header")[0];
let links = document.links;
let searchBtn = document.getElementsByName("search-header");
let keywards = ["Базовые вещи про GIT", "10 самых популярных шрифтов от Google", "Отключение редакций и ревизий в WordPress"];
let keyward = keywards[getRandom(0, keywards.lenght)];

if (searchBtn !== null) {
  input.value = keyward;
  searchBtn.click();
} else {
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf("napli.ru") != -1) {
      let link = links[i]
      console.log("Нашел строку " + link);
      link.click();
      break;
    }
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}