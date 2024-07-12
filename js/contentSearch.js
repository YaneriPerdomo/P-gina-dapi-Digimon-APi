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
let validacionNumeroPero = new RegExp("^[^0 | ^a-z][0-9]?[^a-z]*");
let $mensaje_Error = document.querySelector("#mensajeError");
function digimonSearch(search) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let res = yield fetch(`https://digi-api.com/api/v1/digimon/${search}`);
            let json = yield res.json();
            console.log(json);
            console.log(json.fields.length === 0);
            if (!res.ok)
                throw { status: res.status, statusText: res.statusText };
            $content.innerHTML = "";
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
            console.info(json.fields.length > 0);
            if ((json.fields.length === 0) == false) {
                $template.querySelector(".fieldOne > img").src = json.fields[0] ? json.fields[0].image : "";
                $template.querySelector(".fieldTwo > img").src = json.fields[1] ? json.fields[1].image : "";
                $template.querySelector(".fieldTres > img").src = json.fields[2] ? json.fields[2].image : "";
            }
            $template.querySelector("figure > img").src = `${json.images[0].href}`;
            let $clone = document.importNode($template, true);
            $fragment.appendChild($clone);
            $content.appendChild($fragment);
        }
        catch (err) {
            let message = err.statusText || "Ocurrió un error";
            $mensaje_Error.innerHTML = `Error ${err.status}: ${message}`;
        }
    });
}
$searchApi.addEventListener("keypress", e => {
    if (e.key == "Enter") {
        $mensajeError.innerHTML = "";
        if (e.target.value.length == 0) {
            $mensajeError.innerHTML = "No puedes dejar el campo vacío.";
            $mensajeError.style.color = "#cf402d";
            $searchAgrupadoSpan.style.border = "solid 2px #cf402d";
            $searchApi.style.border = "solid 2px #cf402d";
            $searchAgrupadoSpan.style.background = "rgb(207, 64, 45)";
        }
        else if (!(validacionNumeroPero.exec(e.target.value))) {
            $mensajeError.innerHTML = "Sólo se permiten números y no comienzan con el número cero.";
            $mensajeError.style.color = "#cf402d";
            $searchAgrupadoSpan.style.border = "solid 2px #cf402d";
            $searchApi.style.border = "solid 2px #cf402d";
            $searchAgrupadoSpan.style.background = "rgb(207, 64, 45)";
        }
        else {
            $searchApi.removeAttribute("style");
            $searchAgrupadoSpan.removeAttribute("style");
            digimonSearch(e.target.value);
        }
    }
});
