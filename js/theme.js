"use strict";
let $body = document.querySelector("body");
let $main = document.querySelector("main");
let $Body_Main = [$body, $main];
let $header = document.querySelector("header");
let $btnTheme = document.querySelector("#theme");
let $themeIcono = document.querySelector(`[data-theme]`);
let $_searchAgrupadoSpan = document.querySelector(".searchAgrupado > span");
let $search_Api = document.querySelector("#searchApi");
let $personaje = document.querySelector(".personaje");
let $biSearch = document.querySelector("bi-search");
function dark() {
    $themeIcono.innerHTML = `<i class="bi bi-moon-fill"></i>`;
    $header.style.background = "rgb(0, 92, 139)";
    $Body_Main.forEach(e => {
        e.style.background = "rgb(31, 34, 35)";
        e.style.color = "white";
    });
    if ($search_Api) {
        $search_Api.style.background = "#1a1a1a";
    }
    if ($_searchAgrupadoSpan) {
        $_searchAgrupadoSpan.style.background = "rgb(30, 32, 33)";
        $_searchAgrupadoSpan.style.color = "initial";
    }
    if ($biSearch) {
        $biSearch.style.color = "color: initial;";
    }
    $themeIcono.setAttribute("data-theme", "moon");
    localStorage.setItem("visitorTheme", "dark");
}
function light() {
    if ($_searchAgrupadoSpan) {
        $_searchAgrupadoSpan.removeAttribute("style");
    }
    if ($search_Api) {
        $search_Api.removeAttribute("style");
    }
    $themeIcono.innerHTML = `<i class="bi bi-brightness-high-fill"></i>`;
    $header.removeAttribute("style");
    $body === null || $body === void 0 ? void 0 : $body.removeAttribute("style");
    $main === null || $main === void 0 ? void 0 : $main.removeAttribute("style");
    localStorage.setItem("visitorTheme", "light");
    $themeIcono.setAttribute("data-theme", "light");
    $personaje === null || $personaje === void 0 ? void 0 : $personaje.removeAttribute("style");
}
$btnTheme.addEventListener("click", e => {
    if (($themeIcono === null || $themeIcono === void 0 ? void 0 : $themeIcono.getAttribute("data-theme")) == "light") {
        dark();
    }
    else {
        light();
    }
});
document.addEventListener("DOMContentLoaded", e => {
    if (localStorage.getItem("visitorTheme") === null) {
        localStorage.setItem("visitorTheme", "light");
    }
    if (localStorage.getItem("visitorTheme") == "light") {
        light();
    }
    if (localStorage.getItem("visitorTheme") == "dark") {
        dark();
    }
});
