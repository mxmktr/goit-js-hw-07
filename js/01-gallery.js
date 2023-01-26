import { galleryItems } from './gallery-items.js'
// Change code below this line

const gallery = document.querySelector('.gallery')

const elementsList = galleryItems.reduce(
    (acc, { preview, original, description }) =>
        (acc += `<div class="gallery__item">
      <a class="gallery__link" href=${original}>
        <img
          class="gallery__image"
          src=${preview}
          data-source=${original}
          alt=${description}
        />
      </a>
    </div>`),
    ''
)

gallery.innerHTML = elementsList
/* gallery.insertAdjacentHTML("beforeend", elementsList); */

gallery.addEventListener('click', galleryHandler)

let instance

function galleryHandler(event) {
    stopDefaultAction(event)

    const { target } = event

    if (target.nodeName !== 'IMG') {
        return
    }

    instance = basicLightbox.create(
        `<img src=${target.dataset.source} width='800' height='600'>`
    )

    instance.show()
    document.addEventListener('keydown', buttonClickCheck)
}

function buttonClickCheck({ key }) {
    if (key === 'Escape' || !basicLightbox.visible()) {
        document.removeEventListener('keydown', buttonClickCheck)
        instance.close()
        return
    }
    console.log(key)
}

function stopDefaultAction(evt) {
    evt.preventDefault()
}
