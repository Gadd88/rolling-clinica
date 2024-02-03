import servicios from './servicios.json' assert { type: 'json' }

const sliderServicios = document.getElementById('sliderServicios')


const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    direction: 'horizontal',
    loop: true,
    breakpoints: {
        480: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        991: {
            slidesPerView: 4,
            spaceBetween: 10,
        }
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

servicios.forEach(servicio => {
    sliderServicios.innerHTML += `<div class="swiper-slide">
    <div class="card cardServicios p-2">
      <img src="${servicio.icono}"
        class="img-thumbnail icono-servicios border-0" alt=${servicio.titulo} width="30px" height="30px">
      <div class="card-body d-flex flex-column align-items-center justify-content-start gap-2">
        <h5 class="card-title">${servicio.titulo}</h5>
        <p class="card-text text-start">${servicio.descripcion}</p>
      </div>
    </div>
  </div>`
  })