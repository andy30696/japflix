const URL = "https://japceibal.github.io/japflix_api/movies-data.json"
const contenedor = document.getElementById("container");
const btnBuscar = document.getElementById("btnBuscar");

fetch(URL)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        window.moviesData = data;
        btnBuscar.addEventListener("click", () => {
            showData(moviesData);

        });
    })
    .catch(error => console.log("Error al obtener los datos", error))

function showData(moviesData) {
    const inputBuscar = document.getElementById('inputBuscar').value.toLowerCase();
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    const filteredMovies = moviesData.filter(element => {
        const title = element.title.toLowerCase();
        const genres = element.genres.map(genre => genre.name.toLowerCase());
        const tagline = element.tagline.toLowerCase();
        const overview = element.overview.toLowerCase();

        return title.includes(inputBuscar.trim()) ||
            tagline.includes(inputBuscar.trim()) ||
            overview.includes(inputBuscar.trim()) ||
            genres.some(genre => genre.includes(inputBuscar.trim()));
    });

    const listaMovies = filteredMovies.map(element => {

        const genresText = element.genres.map(genre => genre.name).join(', ');
        const year = new Date(element.release_date).getFullYear();

        return `
    <div class="container">
        <div class="row">
            <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${element.title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${element.tagline}</h6>
                            <div class="d-flex flex-row align-items-center">
                                <div>
                                    ${getStarIcons(element.vote_average)}
                                </div>
                         
                            </div>
                            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapse${element.id}" aria-expanded="false" aria-controls="collapse${element.id}">
                                Mas info
                            </button>
                            
                            <div class="collapse" id="collapse${element.id}">
                                <div class="card card-body">
                                    <p>${element.overview}</p>
                                    <p>Géneros: ${genresText}</p>
                                    <p>Año de Lanzamiento: ${year}</p>
                                    <p>Recaudacion: $USD${element.revenue}</p>
                                    <p>Presupuesto: $USD${element.budget}</p>
                                    <p>Duracion: ${element.runtime} minutos</p>
                                </div>
                            </div>

                        </div>
                    </div>
            </div>
        </div>
    </div>
        `;



    });
    console.log(listaMovies);
    lista.innerHTML += listaMovies;

}



function getStarIcons(score) {
    const escalaScore = Math.round(score / 2);

    const starIcons = [];
    for (let i = 1; i <= 5; i++) {
        const starClass = i <= escalaScore ? "fa fa-star checked" : "fa fa-star";
        starIcons.push(`<span class="${starClass}"></span>`);
    }
    return starIcons.join("");
}
