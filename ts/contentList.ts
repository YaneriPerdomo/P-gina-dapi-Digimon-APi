type HtmlNull = HTMLElement | null;
const $searchApi = document.querySelector("#searchApi") as HtmlNull; 
let $template = document.querySelector("template").content as HTMLElement | any;
const $fragment = document.createDocumentFragment() as DocumentFragment;
const $content = document.querySelector(".content") as HTMLElement;
const $mensajeError = document.querySelector("#mensajeError") as HTMLElement;
let $searchAgrupadoSpan = document.querySelector(".searchAgrupado > span") as HTMLElement;
let $dataNext = document.querySelector("[data-next]") as HTMLElement;
let $imgLoader = document.querySelector(".imgLoader") as HTMLElement;
let $mensajeError_ = document.querySelector("#mensajeError") as HTMLElement;
async function digimonList(URL:HtmlNull){
    try {      
        let res = await fetch(`${URL}`)
        let json =  await res.json();
        if (!res.ok) throw { status: res.status, statusText: res.statusText };
       
        json.content.forEach((element:any) => {
           fetch(`${element.href}`)
           .then(res  => res.ok ? res.json() : Promise.reject(res))
           .then((json) => {
                   
                    $template.querySelector(".id").innerHTML = json.id;
                    $template.querySelector("figure > .title").innerHTML = json.name;
                    if((json.levels.length === 0) == false){
                        $template.querySelector(".levelContent").innerHTML = json.levels[0].level;
                    }
                    if((json.attributes.length === 0) == false){
                        $template.querySelector(".attributeContent").innerHTML = json.attributes[0].attribute;
                    }
                    if((json.types.length === 0) == false){
                        $template.querySelector(".typeContent").innerHTML = json.types[0].type;
                    }
                   
                    if((json.fields.length === 0) == false){
                        $template.querySelector(".fieldOne > img").src = json.fields[0] ? json.fields[0].image : "";
                        $template.querySelector(".fieldTwo > img").src = json.fields[1] ? json.fields[1].image : "";
                        $template.querySelector(".fieldTres > img").src = json.fields[2] ? json.fields[2].image : "";
                    }              
                    $template.querySelector("figure > img").src = `${json.images[0].href}`;
                    let $clone = document.importNode($template, true);
                    $fragment.appendChild($clone)
                    $content.appendChild($fragment);
                 
           })
           .catch((e) => {alert("error dentro")})
        });
        $imgLoader.setAttribute("style","display:none")
        $dataNext.setAttribute("data-next",json.pageable.nextPage);
    } catch (err:unknown | any) {
        let message = err.statusText || "Ocurrió un error";
        $mensajeError_.innerHTML = `Error ${err.status}: ${message}`;
    }
    }


    document.addEventListener("DOMContentLoaded" , e => {digimonList($dataNext.getAttribute("data-next"))})

    document.addEventListener("scroll", e => {
        const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
        if(scrollTop + clientHeight >= scrollHeight){
            $imgLoader.removeAttribute("style")
            digimonList($dataNext.getAttribute("data-next"));
        }
    })