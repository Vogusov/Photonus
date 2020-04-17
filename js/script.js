// https://api.unsplash.com/

//  https://api.unsplash.com/photos/?client_id=RtRYI-ZK2IshBbG7ZKuzou2Rl9lrW-f43QKwSLfiNns
const body = document.querySelector('body'),
  collectionsContainer = document.querySelector('.collections-container');

let collections = [];



async function getResourse(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`)
  }
  return await res.json();
}



getResourse('https://api.unsplash.com/collections?client_id=RtRYI-ZK2IshBbG7ZKuzou2Rl9lrW-f43QKwSLfiNns')
  .then(res => {
    console.log(res);
    collections = res;
    return collections;
  })
  .then(res => {
    res.forEach(col => {
      let collection_template = `
        <div class="collection">
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
  .catch(err => console.log(err))

  // https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&w=1500&dpr=2