const botonAgregar = document.querySelector("#id_run")
const mainData = document.querySelector('.main-data')
let movies = []

function obtenerDatos() {
  let html
  botonAgregar.classList.add('cargando')
  botonAgregar.textContent = 'Cargando...'
  fetch('https://yts.mx/api/v2/list_movies.json')
    .then(function(response) {
      botonAgregar.classList.remove('cargando')
      botonAgregar.textContent = 'Agregar'
      return response.json()
    })
    .then(function(myJson) {
      movies = myJson.data.movies
      html = movies.map(movie => {
        return `
          <div class="movie-card">
            <figure>
              <img src="${movie.medium_cover_image}" alt="${movie.synopsis}" />
            </figure>
            <h3>${movie.title}</h3>
            <h4>Sinopsis</h4>
            <p>${movie.description_full}</p>
          </div>
        `
      }).join('')
      mainData.innerHTML = html
    })
    .catch(function(error) {
      console.log(error)
      console.log('error en la consulta')
      botonAgregar.classList.remove('cargando')
      botonAgregar.textContent = 'Agregar Nuevamente'
    });  
}

window.onload = () => {
  botonAgregar.addEventListener("click", obtenerDatos)
}
