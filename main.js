// import { emberekLISTA } from "./adat.js";
import { rendez, szures, torol } from "./adatKezelo.js";
import { deleteAdat, getAdat, patchAdat } from "./aszinkron.js";
import { htmlOsszeallit, megjelenit } from "./listaMegjelenit.js";
import { adatokListaba } from "./urlapkezelo.js";

getAdat("http://localhost:3000/emberekLISTA", init)


let irany = 1;
szuresEsemeny();

export function init(lista) {
  console.log(lista);
  megjelenit(htmlOsszeallit(lista));
  rendezEsemeny(lista);
  torolEsemeny();
  adatokListaba(lista);
  editelEsemeny(lista);
}
/* 
a függvény akkor fut le, ha a táblázat név fejlécére kattintunk. */
function rendezEsemeny(lista) {
  const nevELEM = $(".adatok table th").eq(0);
  nevELEM.on("click", function () {
    const rLISTA = rendez(lista, irany);
    console.log(rLISTA);
    init(rLISTA);
    irany *= -1;
  });
}
function szuresEsemeny(lista) {
  /* akkor kell lefutnia, ha megváltozik a keresőmező tartalma */
  const keresoELEM = $("#szuro");
  keresoELEM.on("keyup", function () {
    let keresoSzoveg = keresoELEM.val();
    const szLISTA = szures(lista, keresoSzoveg);
    init(szLISTA);
  });
}

function torolEsemeny() {
  /* Akkor fog lefutni, ha sor melletti torol gombra kattintunk.  */
  const torolGOMB = $(".torol");
  torolGOMB.on("click", function (event) {
    /*  event.target az az elem, amelyik kiváltotta az eseményt */
    let id = event.target.id;
    console.log(id);

    deleteAdat("http://localhost:3000/emberekLISTA",id)
  });
}


function editelEsemeny(lista) {
  const torolGOMB = $(".editel");
  const editelso = document.getElementById("editelso");
  const editmasodik = document.getElementById("editmasodik");

  torolGOMB.on("click", function (event) {
    let id = event.target.id;
    let obj = lista.find(item => item.id === id);

    // adatok felugro ablakba 
    document.getElementById("editnev").value = obj.nev;
    document.getElementById("editkor").value = obj.kor;
    document.getElementById("editnem").value = obj.nem.toString();

    // megjelnik a felugro resuz
    editelso.style.display = "block";

    // adatfrissites
    editmasodik.onsubmit = function (e) {
      e.preventDefault();
      obj.nev = document.getElementById("editnev").value;
      obj.kor = parseInt(document.getElementById("editkor").value);
      obj.nem = document.getElementById("editnem").value === "true" ? true : false;

      patchAdat("http://localhost:3000/emberekLISTA/" + id, obj);


      editelso.style.display = "none";
    };
  });

  const closeButton = document.getElementsByClassName("close")[0];
  closeButton.onclick = function () {
    editelso.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target === editelso) {
      editelso.style.display = "none";
    }
  };
}

//ujAdat(emberekLISTA)
//init(emberekLISTA)