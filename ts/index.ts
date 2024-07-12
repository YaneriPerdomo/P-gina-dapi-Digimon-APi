
    /*
    //Usted espere dos segundos, y luego se eliminará la ventana modal.
    const $body = document.querySelector("body") as HTMLElement;
    setTimeout(() => {
        $body.removeChild($body.children[1])
    }, 4000); 
*/

    //Usted solicita la vista Search
    async function search(URL: any){
        try{
            let res = await fetch(`${URL}`);
            let text = await res.text();
            const $contentAjax = document.querySelector(".contentAjax") as HTMLElement;
            $contentAjax.innerHTML = text;
        }catch(error){
            alert("error")
        }
    }

    const $search = document.querySelector("#search") as HTMLElement;

    document.addEventListener("click" , e => {
        if((<HTMLElement>e.target).matches("#search")){
            search($search.getAttribute("data-contentSearch"));
        }
    })