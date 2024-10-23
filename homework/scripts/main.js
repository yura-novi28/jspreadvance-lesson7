// 5a30f953
const filmsEl = document.querySelector('.films');
let searchInput = document.querySelector('#searchInput');
const getInfoFilms = async (text) => {
    try{
        const res = await fetch(`https://www.omdbapi.com/?s=${text}&apikey=5a30f953`)
        if(!res.ok){
            throw new Error('error files')
        }
        const res1 = await res.json();
        return res1;
    } catch(error){
        console.log(error);
    }
    
}
const setInfoFilms = async (info) => {
    let filmInfo = await getInfoFilms(info);
    let filmSearch =  await filmInfo.Search;
    return await filmSearch;
}

const getInfoFilm = async (id) =>{
    try{
        const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=5a30f953`)
        if(!res.ok){
            throw new Error('error files')
        }
        const res1 = await res.json();
        return res1;
    } catch(error){
        console.log(error)
    }
}

const setInfoFilm = async (id) => {
    let filmInfo = await getInfoFilm(id);
    return await filmInfo;
}

function createElemFilm(check, array, n){
    let filmsBox = document.createElement('div');
    filmsBox.classList.add('films-box');
    let poster = document.createElement('div');
    poster.classList.add('films-box__poster');
    let containerTitle = document.createElement('div');
    containerTitle.classList.add('films-box__container-title');
    let title = document.createElement('p');
    title.classList.add('films-box__title');
    let containerDesc = document.createElement('div');
    containerDesc.classList.add('films-box__container-description');
    let descElem1 = document.createElement('p');
    let descElem2 = document.createElement('p');
    descElem1.classList.add('films-box__description');
    descElem2.classList.add('films-box__description');
    let inputButton = document.createElement('input');
    inputButton.classList.add('films-box__button');
    inputButton.value = 'More details';
    inputButton.type = 'button';
    // addDOM
    filmsEl.append(filmsBox);
    filmsBox.append(poster);
    filmsBox.append(containerTitle);
    containerTitle.append(title);
    filmsBox.append(containerDesc);
    containerDesc.append(descElem1);
    containerDesc.append(descElem2);
    filmsBox.append(inputButton);
    if(check){
        let obj = array[n];
        if(obj.Poster !== 'N/A'){
            poster.style.backgroundImage = `url('${obj.Poster}')`
        }
        else{
            poster.style.backgroundImage = `url(./images/noPhoto.png)`
        }
        title.textContent = obj.Title;
        descElem1.textContent = obj.Type;
        descElem2.textContent = obj.Year;
        inputButton.id = obj.imdbID;
    }
}


async function searchFilms(){
    let searchInputValue = searchInput.value;
    let infoFilms = await setInfoFilms(`${searchInputValue}`);
    if(infoFilms !== undefined){
        let infoFilmsLeng = infoFilms.length;
        filmsEl.innerHTML = '';
        for(let i = 0; i < infoFilmsLeng; i++){
            createElemFilm(true, infoFilms, i);
        }
    }
}

async function descriptionFiml(event){
    if(event.target.classList.contains('films-box__button')){
        let el = event.target;
        document.querySelector('.film-info-gray').style.display = 'block';
        document.querySelector('.film-info').style.display = 'flex';
        let film = await setInfoFilm(el.id);
        if(film.Poster !== 'N/A'){
            document.querySelector('.film-info__poster').style.backgroundImage = `url('${film.Poster}')`;
        }
        else{
            document.querySelector('.film-info__poster').style.backgroundImage = `url(./images/noPhoto.png)`
        }
        document.querySelector('.film-info__title').textContent = film.Title;
        document.querySelector('.film-info__production').textContent = `${film.Rated} ${film.Year} ${film.Genre}`;
        document.querySelector('.film-info__description').textContent = film.Plot
        document.querySelector('.film-info__written').innerHTML = `<strong>Written by:</strong> ${film.Writer}`;
        document.querySelector('.film-info__directed').innerHTML = `<strong>Directed by:</strong> ${film.Director}`;
        document.querySelector('.film-info__starring').innerHTML = `<strong>Starring:</strong> ${film.Actors}`;
        document.querySelector('.film-info__box-office').innerHTML = `<strong>BoxOffice:</strong> ${film.BoxOffice}`;
        document.querySelector('.film-info__awards').innerHTML = `<strong>Awards:</strong> ${film.Awards}`;
        let txt = '';
        for(let i = 0; film.Ratings.length > i; i++){
            txt += `${film.Ratings[i].Source} ${film.Ratings[i].Value}<br>`;
        }
        document.querySelector('.film-info__ratings').innerHTML = `<strong>Ratings:</strong><br>${txt}`;
    }
}

setInfoFilm("tt0298203")

document.querySelector('#searchButton').addEventListener('click', searchFilms);
document.querySelector('.film-info-gray').addEventListener('click', function(){
    this.style.display = 'none';
    document.querySelector('.film-info').style.display = 'none';
});
filmsEl.addEventListener('click', descriptionFiml);