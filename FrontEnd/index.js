/*Variables*/
const gallery = document.getElementById("galerie");


/* fonction qui retourne le tableau des travaux provenant du back-end*/
async function recupererTravaux() {
    const donnees = await fetch("http://localhost:5678/api/works");
    return await donnees.json();
}
recupererTravaux();


/*fonction-Affiche travaux dans la galerie*/
async function affichageGalerie(){
    const tableauTravaux= await recupererTravaux();
    tableauTravaux.forEach(element => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        img.src = element.imageURL;
        figcaption.textContent = element.title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}
affichageGalerie();
