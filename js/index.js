"use strict";
/*
//Usted espere dos segundos, y luego se eliminará la ventana modal.
const $body = document.querySelector("body") as HTMLElement;
setTimeout(() => {
    $body.removeChild($body.children[1])
}, 4000);
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Usted solicita la vista Search
function search(URL) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let res = yield fetch(`${URL}`);
            let text = yield res.text();
            const $contentAjax = document.querySelector(".contentAjax");
            $contentAjax.innerHTML = text;
        }
        catch (error) {
            alert("error");
        }
    });
}
const $search = document.querySelector("#search");
document.addEventListener("click", e => {
    if (e.target.matches("#search")) {
        search($search.getAttribute("data-contentSearch"));
    }
});
