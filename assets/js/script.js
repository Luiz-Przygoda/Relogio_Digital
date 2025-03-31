// Elementos do relógio
const horas = document.getElementById('horas');
const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');
const dataElement = document.querySelector('.data');
const progressoBar = document.querySelector('.progresso-bar');
const toggleModeBtn = document.getElementById('toggleMode');

// Configuração das partículas (opcional)
if (typeof particlesJS !== 'undefined') {
  particlesJS.load('particles-js', 'assets/particles.json', function() {
    console.log("Partículas carregadas!");
  });
}

// Atualiza o relógio e dados relacionados
function updateClock() {
  const dateToday = new Date();
  
  // Formatação do tempo (com padStart para zeros à esquerda)
  const hr = String(dateToday.getHours()).padStart(2, '0');
  const min = String(dateToday.getMinutes()).padStart(2, '0');
  const s = String(dateToday.getSeconds()).padStart(2, '0');
  
  // Atualiza o relógio
  horas.textContent = hr;
  minutos.textContent = min;
  segundos.textContent = s;
  
  // Atualiza a data
  updateDate(dateToday);
  
  // Atualiza a barra de progresso do dia
  updateDayProgress(dateToday);
}

// Formata a data atual
function updateDate(date) {
  const options = { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  };
  dataElement.textContent = date.toLocaleDateString('pt-BR', options);
}

// Calcula o progresso do dia
function updateDayProgress(date) {
  const totalSegundosDia = 86400;
  const segundosPassados = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  const percentual = (segundosPassados / totalSegundosDia) * 100;
  progressoBar.style.width = `${percentual}%`;
}

// Alternar modo claro/escuro
toggleModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  
  // Altera o ícone do botão
  const isLightMode = document.body.classList.contains('light-mode');
  toggleModeBtn.textContent = isLightMode ? '🌙 Modo Escuro' : '☀️ Modo Claro';
});

// Detecta se é mobile para ajustes específicos
const isMobile = window.matchMedia("(max-width: 768px)").matches;

if (isMobile) {
  // Opcional: reduz intervalo de atualização para economizar bateria
  setInterval(updateClock, 15000); // 15 segundos em vez de 1
} else {
  setInterval(updateClock, 1000);
}

// Inicialização
updateClock(); // Executa imediatamente para evitar delay
setInterval(updateClock, 1000); // Atualiza a cada segundo