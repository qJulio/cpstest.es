let clickCount = 0;
let timer;
let duration = 3; // Establece la duración por defecto en 3 segundos
let testActive = false;
let timeLeft;

// Cargar la duración desde el almacenamiento local
const savedDuration = localStorage.getItem('selectedDuration');
if (savedDuration) {
    duration = parseInt(savedDuration, 10);
    document.getElementById("clickCounter").innerText = `Duración: ${duration} segundos`;
    document.getElementById("defaultDuration").click(); // Selecciona el botón correspondiente
} else {
    document.getElementById("defaultDuration").click(); // Configura por defecto en 3 segundos
}

function setDuration(seconds) {
    duration = seconds;
    document.getElementById("clickCounter").innerText = `Duración: ${seconds} segundos`;
    document.getElementById("clickButton").disabled = false;
    localStorage.setItem('selectedDuration', seconds); // Guarda la duración seleccionada
}

function startTest(event) {
    event.preventDefault();
    if (duration === 0) {
        alert("Por favor, selecciona una duración primero.");
        return;
    }

    clickCount = 0;
    timeLeft = duration;
    testActive = true;
    document.getElementById("clickCounter").innerText = "Clics: 0";
    document.getElementById("clickButton").onmousedown = countClick; 

    // Mostrar el cuadro de estadísticas
    document.getElementById("statsDisplay").style.display = "block"; // Asegúrate de que se muestre

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timeLeft").innerText = timeLeft;

        if (timeLeft <= 0) {
            endTest();
        }
    }, 1000);
}

function countClick(event) {
    if (testActive) {
        clickCount++;
        const cps = (clickCount / duration).toFixed(2);
        document.getElementById("clickCounter").innerText = `Clics: ${clickCount}`;
        document.getElementById("cpsDisplay").innerText = cps; 
        
        // Efecto de ripple
        const ripple = document.createElement("div");
        ripple.className = "ripple";
        ripple.style.left = `${event.clientX - 50}px`;
        ripple.style.top = `${event.clientY - 50}px`;
        document.body.appendChild(ripple);
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

function endTest() {
    clearInterval(timer);
    testActive = false;
    document.getElementById("clickButton").disabled = true;
    document.getElementById("totalClicks").innerText = clickCount;
    document.getElementById("averageCPS").innerText = (clickCount / duration).toFixed(2);
    document.getElementById("modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
    location.reload(); // Reinicia la página
}
