document.addEventListener('DOMContentLoaded', () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    renderFavorites(favorites);
});


// displaying the favorites
function renderFavorites(superheroes) {
    const mainContainer = document.getElementById('main');
    mainContainer.innerHTML = ''; 

    superheroes.forEach(hero => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}">
            <div class="name">
                <h3>${hero.name}</h3>
                <i class="fa-solid fa-heart"></i>
                <button class="remove-btn">Remove</button>
            </div>
        `;

        card.querySelector('.remove-btn').addEventListener('click', (event) => {
            event.stopPropagation(); 
            removeFavorite(hero.id);
        });

        card.addEventListener('click', () => {
            localStorage.setItem('selectedHero', JSON.stringify(hero));
            window.location.href = 'superhero.html';
        });

        mainContainer.appendChild(card);
    });
}


// removing the favorite
function removeFavorite(heroId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(hero => hero.id !== heroId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderFavorites(favorites);
}
