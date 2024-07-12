"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const $searchApi = document.querySelector("#searchApi");
let $template = document.querySelector("template").content;
const $fragment = document.createDocumentFragment();
const $content = document.querySelector(".content");
const $mensajeError = document.querySelector("#mensajeError");
let $searchAgrupadoSpan = document.querySelector(".searchAgrupado > span");
let $dataNext = document.querySelector("[data-next]");
let $imgLoader = document.querySelector(".imgLoader");
let $mensajeError_ = document.querySelector("#mensajeError");
function digimonList(URL) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let res = yield fetch(`${URL}`);
            let json = yield res.json();
            if (!res.ok)
                throw { status: res.status, statusText: res.statusText };
            json.content.forEach((element) => {
                fetch(`${element.href}`)
                    .then(res => res.ok ? res.json() : Promise.reject(res))
                    .then((json) => {
                    $template.querySelector(".id").innerHTML = json.id;
                    $template.querySelector("figure > .title").innerHTML = json.name;
                    if ((json.levels.length === 0) == false) {
                        $template.querySelector(".levelContent").innerHTML = json.levels[0].level;
                    }
                    if ((json.attributes.length === 0) == false) {
                        $template.querySelector(".attributeContent").innerHTML = json.attributes[0].attribute;
                    }
                    if ((json.types.length === 0) == false) {
                        $template.querySelector(".typeContent").innerHTML = json.types[0].type;
                    }
                    if ((json.fields.length === 0) == false) {
                        $template.querySelector(".fieldOne > img").src = json.fields[0] ? json.fields[0].image : "";
                        $template.querySelector(".fieldTwo > img").src = json.fields[1] ? json.fields[1].image : "";
                        $template.querySelector(".fieldTres > img").src = json.fields[2] ? json.fields[2].image : "";
                    }
                    $template.querySelector("figure > img").src = `${json.images[0].href}`;
                    let $clone = document.importNode($template, true);
                    $fragment.appendChild($clone);
                    $content.appendChild($fragment);
                })
                    .catch((e) => { alert("error dentro"); });
            });
            $imgLoader.setAttribute("style", "display:none");
            $dataNext.setAttribute("data-next", json.pageable.nextPage);
        }
        catch (err) {
            let message = err.statusText || "Ocurrió un error";
            $mensajeError_.innerHTML = `Error ${err.status}: ${message}`;
        }
    });
}
document.addEventListener("DOMContentLoaded", e => { digimonList($dataNext.getAttribute("data-next")); });
document.addEventListener("scroll", e => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
        $imgLoader.removeAttribute("style");
        digimonList($dataNext.getAttribute("data-next"));
    }
});
