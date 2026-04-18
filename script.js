const kijelzo = document.getElementById("eredmeny");
const gombok = document.querySelectorAll("button:not(#torles)");
const torlesGomb = document.getElementById("torles");

let aktualisSzam = "";
let elozoSzam = "";
let muvelet = "";

// Számok és műveletek kezelése
gombok.forEach(gomb => {
  gomb.addEventListener("click", () => {
    let ertek = gomb.innerText;

    // Számok és tizedesvessző
    if (!isNaN(ertek) || ertek === ",") {
      if (ertek === "," && aktualisSzam.includes(".")) return; // csak egy tizedes pont lehet
      if (ertek === ",") ertek = ".";
      aktualisSzam += ertek;
      kijelzo.innerText = aktualisSzam.replace(".", ",");
      return;
    }

    // Műveletek
    if (ertek === "+" || ertek === "-" || ertek === "x") {
      if (aktualisSzam === "" && elozoSzam !== "") {
        muvelet = ertek; // művelet váltása
        return;
      }
      elozoSzam = aktualisSzam;
      muvelet = ertek;
      aktualisSzam = "";
      return;
    }

    // Egyenlő
    if (ertek === "=") {
      if (!elozoSzam || !aktualisSzam || !muvelet) return;

      let a = Number(elozoSzam);
      let b = Number(aktualisSzam);
      let eredmeny = 0;

      if (muvelet === "+") eredmeny = a + b;
      if (muvelet === "-") eredmeny = a - b;
      if (muvelet === "x") eredmeny = a * b;

      kijelzo.innerText = Number(eredmeny.toFixed(10)).toString().replace(".", ",");
      aktualisSzam = eredmeny.toString();
      elozoSzam = "";
      muvelet = "";
      return;
    }
  });
});

// Törlés gomb működése: teljes nullázás
torlesGomb.addEventListener("click", () => {
  aktualisSzam = "";
  elozoSzam = "";
  muvelet = "";
  kijelzo.innerText = "0"; // kijelző nullázása
});
