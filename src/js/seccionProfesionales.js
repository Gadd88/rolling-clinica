import listaProfesionales from './medicos.json' assert { type: 'json' }

const sliderProfesionales = document.getElementById('sliderProfesionales')

const swiper = new Swiper('.swiper', {
  // Optional parameters
  slidesPerView: 'auto',
  spaceBetween: 50,
  direction: 'horizontal',
  loop: true,

  breakpoints: {
    0: {
      slidesPerView: 'auto',
    },
    397: {
      slidesPerView: 'auto'
    },
    680: {
      slidesPerView: 'auto'
    },
    920: {
      slidesPerView: 'auto'
    },
    1240: {
      slidesPerView: 'auto'
    },
  },
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});

listaProfesionales.forEach(doctor => {
  sliderProfesionales.innerHTML += `<div class="swiper-slide">
  <div class="card cardProfesionales">
    <img src="${doctor.imagen}"
      class="card-img-top imgProfesionales" alt="Imagen del Dr. Juan Pérez">
    <div class="card-body">
      <h5 class="card-title">${doctor.nombre}</h5>
      <p class="card-text text-center">${doctor.especialidad}</p>
      <a href="#" class="btn btn-primary">Solicitar turno</a>
    </div>
  </div>
</div>`
})