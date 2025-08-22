

// Control de audio
let currentAudio = null;

function toggleAudio(audioId) {
    const audio = document.getElementById(audioId);
    const icon = document.querySelector(`button[onclick="toggleAudio('${audioId}')"] i`);
    
    // Pausar el audio actual si hay uno reproduciéndose
    if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        const currentIcon = document.querySelector(`button[onclick="toggleAudio('${currentAudio.id}')"] i`);
        if (currentIcon) {
            currentIcon.className = 'fas fa-headphones';
        }
    }
    
    // Controlar el audio seleccionado
    if (audio.paused) {
        audio.play();
        icon.className = 'fas fa-pause';
        currentAudio = audio;
    } else {
        audio.pause();
        audio.currentTime = 0;
        icon.className = 'fas fa-headphones';
        currentAudio = null;
    }
    
    // Evento cuando el audio termina
    audio.onended = function() {
        icon.className = 'fas fa-headphones';
        currentAudio = null;
    };
}

// Control de modales
function mostrarModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Pausar audio si está reproduciéndose
    const audioId = modalId.replace('modal', 'audio');
    const audio = document.getElementById(audioId);
    if (audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
        const icon = document.querySelector(`button[onclick="toggleAudio('${audioId}')"] i`);
        if (icon) {
            icon.className = 'fas fa-headphones';
        }
        currentAudio = null;
    }
}

// Cerrar modal al hacer clic fuera del contenido
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Pausar audio asociado
            const modalId = modal.id;
            const audioId = modalId.replace('modal', 'audio');
            const audio = document.getElementById(audioId);
            if (audio && !audio.paused) {
                audio.pause();
                audio.currentTime = 0;
                const icon = document.querySelector(`button[onclick="toggleAudio('${audioId}')"] i`);
                if (icon) {
                    icon.className = 'fas fa-headphones';
                }
                currentAudio = null;
            }
        }
    });
};

// Pausar todos los audios al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
});

let tamaño = 100;
let fuenteLegibleActiva = false;
let enlacesSubrayados = false;

// Toggle panel
document.getElementById("btnAccesibilidad").onclick = function() {
  let panel = document.getElementById("panelAccesibilidad");
  panel.style.display = panel.style.display === "none" ? "block" : "none";
};

function aumentarTexto() {
  tamaño += 10;
  document.body.style.fontSize = tamaño + "%";
}

function disminuirTexto() {
  tamaño -= 10;
  document.body.style.fontSize = tamaño + "%";
}

function escalaGrises() {
  document.body.style.filter = "grayscale(100%)";
}

function altoContraste() {
  document.body.style.filter = "contrast(200%)";
}

function contrasteNegativo() {
  document.body.style.filter = "invert(100%)";
}

function modoClaro() {
  document.body.style.background = "#fff";
  document.body.style.color = "#000";
}

function subrayarEnlaces() {
  if (!enlacesSubrayados) {
    document.querySelectorAll("a").forEach(a => a.style.textDecoration = "underline");
    enlacesSubrayados = true;
  } else {
    document.querySelectorAll("a").forEach(a => a.style.textDecoration = "none");
    enlacesSubrayados = false;
  }
}

function fuenteLegible() {
  if (!fuenteLegibleActiva) {
    document.body.style.fontFamily = "Arial, Helvetica, sans-serif";
    fuenteLegibleActiva = true;
  } else {
    document.body.style.fontFamily = "";
    fuenteLegibleActiva = false;
  }
}

function restablecer() {
  tamaño = 100;
  document.body.style.fontSize = "100%";
  document.body.style.filter = "none";
  document.body.style.background = "";
  document.body.style.color = "";
  document.body.style.fontFamily = "";
  document.querySelectorAll("a").forEach(a => a.style.textDecoration = "none");
  fuenteLegibleActiva = false;
  enlacesSubrayados = false;
}

function modoOscuro() {
  document.body.classList.toggle("modo-oscuro");
}
