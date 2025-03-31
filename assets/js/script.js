const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');
const dataElement = document.querySelector('.data');
const progressoBar = document.querySelector('.progresso-bar');
const toggleModeBtn = document.getElementById('toggleMode');

if (typeof particlesJS !== 'undefined') {
  particlesJS.load('particles-js', 'assets/particles.json', function() {
    console.log("Partículas carregadas!");
  });
}

function updateClock() {
  const dateToday = new Date();
  
  const hr = String(dateToday.getHours()).padStart(2, '0');
  const min = String(dateToday.getMinutes()).padStart(2, '0');
  const s = String(dateToday.getSeconds()).padStart(2, '0');
  
  horas.textContent = hr;
  minutos.textContent = min;
  segundos.textContent = s;
  
  updateDate(dateToday);
  
  updateDayProgress(dateToday);
}

function updateDate(date) {
  const options = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  dataElement.textContent = date.toLocaleDateString('pt-BR', options);
}

function updateDayProgress(date) {
  const totalSegundosDia = 86400;
  const segundosPassados = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  const percentual = (segundosPassados / totalSegundosDia) * 100;
  progressoBar.style.width = `${percentual}%`;
}

toggleModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  
  const isLightMode = document.body.classList.contains('light-mode');
  toggleModeBtn.textContent = isLightMode ? '🌙 Modo Escuro' : '☀️ Modo Claro';
});

const isMobile = window.matchMedia("(max-width: 768px)").matches;

if (isMobile) {
  setInterval(updateClock, 15000); 
} else {
  setInterval(updateClock, 1000);
}


updateClock(); 
setInterval(updateClock, 1000); 
