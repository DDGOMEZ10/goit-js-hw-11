import Notiflix from "notiflix";
import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const apiKey = '42189184-96beb1412ea5b31c19dbe3dcc'; //clave de API
const gallery = document.querySelector(".gallery");
        const loadMoreButton = document.querySelector('.load-More');
        const galleryElements = document.querySelectorAll(".gallery__image");
        let page = 1;
        let totalHits = 0;
       async function searchImages(query) {
            try {
                const response = await axios.get( //consultas http
                    `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
                );
                const data = response.data;
if (data.hits.length === 0) {
                    // Mostrar notificación si no hay resultados
                    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
                } else {
                    totalHits = data.totalHits; // Actualizar el total de imágenes coincidentes
                    // Agregar imágenes a la galería
                    const rowSize = 1;
                    
                    for (let i = 0; i < data.hits.length; i += rowSize) {
                        const rowImages = data.hits.slice(i, i + rowSize);
                        const rowContainer = document.createElement('div');
                        rowContainer.classList.add('image-row');
                        rowImages.forEach((image) => {
                            const imgElement = document.createElement('img');
                            imgElement.src = image.webformatURL;
                            imgElement.classList.add('gallery__image'); // Agrega la clase 'galery__image' al elemento img

                            // Información de la imagen
                            const imageInfo = document.createElement('div');
                            imageInfo.classList.add('image-info');
                            imageInfo.innerHTML = `
                                <p>Likes: ${image.likes}</p>
                                <p>Views: ${image.views}</p>
                                <p>Comments: ${image.comments}</p>
                                <p>Downloads: ${image.downloads}</p>
                            `;
const imgContainer = document.createElement('div');
                            imgContainer.classList.add('image-container');
                            imgContainer.appendChild(imgElement);
                            imgContainer.appendChild(imageInfo);
                             
  
                            rowContainer.appendChild(imgContainer);
                        });
                        gallery.appendChild(rowContainer);
                    }
                    // Mostrar botón "Load more" solo si hay más páginas disponibles
                    if (page < 3) {
                        loadMoreButton.style.display = 'block';
                    } else {
                        // Mostrar notificación si no hay más resultados
                        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
                        loadMoreButton.style.display = 'none'; // Ocultar el botón
                    }   
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        }
        document.getElementById('search-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const searchQuery = e.target.searchQuery.value;
            page = 1; // Reiniciar la página al realizar una nueva búsqueda
            gallery.innerHTML = ''; // Limpiar la galería
            searchImages(searchQuery);
        });
        loadMoreButton.addEventListener('click', () => {
            page++;
            const searchQuery = document.querySelector('[name="searchQuery"]').value;
            searchImages(searchQuery);
        });

       
           