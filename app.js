const publicKey = "a01ac959d7310fc3dc30d336defd1cf9";
const privateKey = "8ebdb9010cd4ba3409e87dbae0f742b2efa6b70b";
const ts = new Date().getTime();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
const apiEndpoint = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

const mainContainer = document.getElementById('main');
const searchInput = document.getElementById('search');


// this displays the superheron on the page
document.addEventListener('DOMContentLoaded', () => {
    loadSuperheroes();

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.trim();
        if (query) {
            loadSuperheroes(query);
        } else {
            loadSuperheroes(); 
        }
    });
});


// loads the superheros
function loadSuperheroes(query = '') {
    let url = apiEndpoint;
    if (query) {
        url += `&nameStartsWith=${query}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const superheroes = data.data.results;
            renderSuperheroes(superheroes);
        })
        .catch(error => console.error('Error fetching data:', error));
}



// renders the cards
function renderSuperheroes(superheroes) {
    mainContainer.innerHTML = ''; 
    superheroes.forEach(hero => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}">
            <div class="name">
                <h3>${hero.name}</h3>
                <i class="fa-solid fa-heart"></i>
            </div>
        `;

        // goes to superhero details on card click
        card.addEventListener('click', () => {
            localStorage.setItem('selectedHero', JSON.stringify(hero));
            window.location.href = 'superhero.html';
        });

        // adding to favorites
        card.querySelector('.fa-heart').addEventListener('click', (event) => {
            event.stopPropagation();
            addFavorite(hero);
        });

        mainContainer.appendChild(card);
    });
}

function addFavorite(hero) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(fav => fav.id === hero.id)) {
        favorites.push(hero);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${hero.name} has been added to favorites!`);
    } else {
        alert(`${hero.name} is already in favorites!`);
    }
}
