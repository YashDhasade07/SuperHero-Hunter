document.addEventListener('DOMContentLoaded', () => {
    const hero = JSON.parse(localStorage.getItem('selectedHero'));
    if (hero) {
        document.getElementById('superhero-details').innerHTML = `
            <div id="sname"><h2>${hero.name}</h2></div>
            <div id="s-details">
                <img id="simg" src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}">
                <div>
                    <p><span class="bold">Description:&nbsp;</span>${hero.description || 'Description Not Available'}</p>
                    <p><span class="bold">Name:&nbsp;</span>${hero.name}</p>
                    <p><span class="bold">Hero ID:&nbsp;</span>${hero.id}</p>
                    <p><span class="bold">Comics Available:&nbsp;</span>${hero.comics.available}</p>
                    <p><span class="bold">Series Available:&nbsp;</span>${hero.series.available}</p>
                    <p><span class="bold">Stories Available:&nbsp;</span>${hero.stories.available}</p>
                </div>
            </div>
        `;
    }
});
