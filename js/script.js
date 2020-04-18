// https://api.unsplash.com/

//  https://api.unsplash.com/photos/?client_id=RtRYI-ZK2IshBbG7ZKuzou2Rl9lrW-f43QKwSLfiNns
const body = document.querySelector('body'),
      collectionsContainer = document.querySelector('.collections-container'),
      photosContainer = document.querySelector('.collection-photos-container'),
      toCollections = document.getElementById('to-collections'),
      toCollection = document.getElementById('to-collection');

let collections = [];
let collection = [];





async function getResourse(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`)
  }
  return await res.json();
}




function init() {

  getResourse('https://api.unsplash.com/collections?client_id=RtRYI-ZK2IshBbG7ZKuzou2Rl9lrW-f43QKwSLfiNns')
  .then(res => {
    console.log(res);
    // collections = res;
    return collections = res;
  })
  .then(res => {
    res.forEach(col => {
      let collection_template = `
        <div class="collection" data-id ="${col.id}" data-title="${col.title}">
          <div class="collection__photos">
            <div class="collection__photos__cover img-container"">
              <img src="${col.cover_photo.urls.small}" alt="cover photo of collection">
            </div>
            <div class="collection__photos__aside">
              <div class="img-container"><img src="${col.preview_photos[1].urls.small}" alt="aside foto"></div>
              <div class="img-container"><img src="${col.preview_photos[2].urls.small}" alt="aside photo"></div>
            </div>
          </div>
          <h3 class="collection-title">${col.title}</h3>
        </div>
          `;
      collectionsContainer.insertAdjacentHTML('beforeend', collection_template);
    });
  })
  .catch(err => console.log(err));
}




function showCollection() {
  let target = event.target.closest('.collection');

  if (!target) {
    return;
  }

  photosContainer.querySelectorAll('.cols-image-container').forEach(el => el.remove());
  photosContainer.querySelectorAll('.col-title').forEach(el => el.remove());
  photosContainer.classList.remove('invisible');
  collectionsContainer.classList.add('invisible');
  let colTitle = document.createElement('h2');
  photosContainer.appendChild(colTitle);
  colTitle.classList.add('col-title');
  colTitle.innerHTML = `${target.dataset.title}`;

  console.log(`id: ${target.dataset.id}`);

  getResourse(`https://api.unsplash.com/collections/${target.dataset.id}/photos?client_id=RtRYI-ZK2IshBbG7ZKuzou2Rl9lrW-f43QKwSLfiNns`)
    .then(col => {
      console.log('selected collection: ', col);
      collection = col;
      return collection = col;
    })
    .then(col => {
      col.forEach(photo => {
        let photo_template = `
          <div class="cols-image-container" data-id="${photo.id}">
            <img src="${photo.urls.small}" alt="${photo.alt_description}" ></img>
          </div>
        `;
        photosContainer.insertAdjacentHTML('beforeend', photo_template);
      });
    })
    .catch(err => console.log(err))
}


function showPhoto() {
  let target = event.target.closest('.cols-image-container');

  if (!target) {
    return;
  }

  // photosContainer.querySelectorAll('.cols-image-container').forEach(el => el.remove());
  // photosContainer.querySelectorAll('.col-title').forEach(el => el.remove());
  // photosContainer.classList.remove('invisible');
  // collectionsContainer.classList.add('invisible');
  // let colTitle = document.createElement('h2');
  // photosContainer.appendChild(colTitle);
  // colTitle.classList.add('col-title');
  // colTitle.innerHTML = `${target.dataset.title}`;
}




function showCollections() {
  if (collectionsContainer.classList.contains('invisible')) {
    collectionsContainer.classList.remove('invisible')
  }   
  photosContainer.classList.add('invisible');
}



collectionsContainer.addEventListener('click', showCollection);
photosContainer.addEventListener('click', showPhoto)

toCollections.addEventListener('click', showCollections);

