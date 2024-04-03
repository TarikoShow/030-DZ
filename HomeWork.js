// ==UserScript==
// @name         ZapmetaBot
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Bot for Zapmeta
// @author       Degtyarenko Evgeniy
// @match        https://www.zapmeta.com/*
// @match        https://napli.ru/*
// @grant        none
// ==/UserScript==

let searchInput = document.getElementsByName("q")[0];
let searchBtn = document.querySelector(".search-header__field-button");
let links = document.links;
let difference = document.querySelector(".jumbotron__logo-image");
let keywords = ["Базовые вещи про GIT", "10 самых популярных шрифтов от Google", "Отключение редакций и ревизий в WordPress"];
let keyword = keywords[getRandom(0, keywords.length)];

//Работаем на главной странице поисковика
if (difference !== null) {
  let i = 0;
  let timerId = setInterval(()=> {
    searchInput.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      searchBtn.click();
    }
  }, 500)
  }
// Работаем на целевом сайте
else if (location.hostname == "napli.ru") {
  console.log("Мы на целевом сайте!!!");

  setInterval(()=> {
    let index = getRandom(0, links.length);
    let localLink = links[index];

    if (getRandom(0, 101) > 75) {
      location.href = "https://www.zapmeta.com/";
    }

    if (localLink.href.includes("napli.ru")) {
      localLink.click();
    }
  }, getRandom(2000, 4000))
}
//Работаем на страницах поисковой выдачи
else {
  let nextZapmetaPage = true;
  for (let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf("napli.ru") != -1) {
      let link = links[i]
      nextZapmetaPage = false;
      console.log("Нашел строку " + link);
      setTimeout(()=> {
        link.click();
      }, getRandom(3000, 5000))
      break;
    }
  }
  if (document.querySelector(".pagination__link").innerText == "5") {
    nextZapmetaPage = false;
    location.href = "https://www.zapmeta.com/";
  }
  if (nextZapmetaPage) {
    setTimeout(()=>{
      document.querySelector(".pagination__text").click();
    }, getRandom(2000,4000))
  }
}


function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
