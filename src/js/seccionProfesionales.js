import listaProfesionales from './medicos.json' assert { type: 'json' }

const sliderProfesionales = document.getElementById('sliderProfesionales')

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
    680: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    780: {
      slidesPerView: 3,
      spaceBetween: 10,
    }
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});

listaProfesionales.forEach(doctor => {
  sliderProfesionales.innerHTML += `<div class="swiper-slide">
  <div class="card cardProfesionales">
    <img src="${doctor.imagen}"
      class="card-img-top imgProfesionales" alt=${doctor.nombre}>
    <div class="card-body d-flex flex-column align-items-center justify-content-between">
      <h5 class="card-title">${doctor.nombre}</h5>
      <p class="card-text text-center">${doctor.especialidad}</p>
      <a href="#" class="btn btn-primario">Solicitar turno</a>
    </div>
  </div>
</div>`
})