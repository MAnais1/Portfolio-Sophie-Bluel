/**Variables*/
const gallery = document.getElementById("galerie");
const filtres = document.getElementById("filtres");

/* * fonction qui retourne le tableau des travaux provenant du back-end*/
async function recupererTravaux() {
  const donnees = await fetch("http://localhost:5678/api/works");
  return await donnees.json();
}

/**fonction-Affiche travaux dans la galerie*/
function creationProjet(projet) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const figcaption = document.createElement("figcaption");
  img.src = projet.imageUrl;
  figcaption.textContent = projet.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

async function affichageGalerie() {
  const tableauTravaux = await recupererTravaux();
  tableauTravaux.forEach((projet) => {
    creationProjet(projet);
  });
}
affichageGalerie();

/**
*tableaux catégorie
 */
async function recupererCategorie () {
  const reponse = await fetch ("http://localhost:5678/api/categories");
  return await reponse.json();
}

/**
 *Afficher les boutons 
 */
async function afficherBoutons() {
  const categories = await recupererCategorie();
  console.log(categories)
  const btnTous = document.createElement("button");
  btnTous.textContent ="Tous";
  btnTous.id = "0";
  btnTous.classList.add("filtres");
  filtres.appendChild(btnTous);
  categories.forEach(category => {
    const btn = document.createElement("button");
    btn.textContent = category.name;
    btn.id = category.id;
    btn.classList.add("filtres")
    filtres.appendChild(btn)
  });
}
afficherBoutons();

/**
 * filtre au clique
 */
async function filtrerCategories() {
  const projets = await recupererTravaux();
  const boutons = document.querySelectorAll("button");
  console.log(boutons);
  boutons.forEach(bouton => {
    bouton.addEventListener("click",(e)=>{
      const boutonId = e.target.id;
      gallery.innerHTML="";
      if (boutonId !== "0") {
        const projetFiltre = projets.filter((projet)=>{
          return projet.categoryId == boutonId;
        });
        projetFiltre.forEach(projet => {
          creationProjet(projet);
        });
      }else{
        affichageGalerie();
      }
    });
  });
}
filtrerCategories();

/**si utilisateur connecté */
const connecte=window.sessionStorage.loged;
const loginOut=document.getElementById("loginOut");
const modif= document.getElementById("modif");
const edit=document.getElementById("edition")


if (connecte=="true") {
  edit.innerHTML=`<i class="fa-regular fa-pen-to-square"></i> Mode édition`;
  edit.classList.add("edit")
  loginOut.textContent="Logout";
  modif.innerHTML= `<i class="fa-regular fa-pen-to-square"></i> modifier`;
  filtres.remove();
  loginOut.addEventListener("click",()=>{
    window.sessionStorage.loged=false;
  });
}

/**Modale */
 