const links = {
  "2025-06-09": "dias/dia1/index.html",
  "2025-06-10": "dias/dia2/index.html",
  "2025-06-11": "dias/dia3/index.html",
  "2025-06-12": "dias/dia4/index.html",
  "2025-06-13": "dias/dia5/index.html",
  "2025-06-14": "dias/dia6/index.html",
  "2025-06-15": "dias/dia7/index.html",
  "2025-06-16": "dias/dia8/index.html",
  "2025-06-17": "dias/dia9/index.html",
  "2025-06-18": "dias/dia10/index.html",
  "2025-06-19": "dias/dia11/index.html",
  "2025-06-20": "dias/dia12/index.html",
  "2025-06-21": "dias/dia13/index.html",
  "2025-06-22": "dias/dia14/index.html",
  "2025-06-23": "dias/dia15/index.html",
  "2025-06-24": "dias/dia16/index.html",
  "2025-06-25": "dias/dia17/index.html",
  "2025-06-26": "dias/dia18/index.html",
  "2025-06-27": "dias/dia19/index.html",
  "2025-06-28": "dias/dia20/index.html",
  "2025-06-29": "dias/dia21/index.html",
  "2025-06-30": "dias/dia22/index.html",
  "2025-07-01": "dias/dia23/index.html",
  "2025-07-02": "dias/dia24/index.html",
  "2025-07-03": "dias/dia25/index.html",
  "2025-07-04": "dias/dia26/index.html",
  "2025-07-05": "dias/dia27/index.html",
  "2025-07-06": "dias/dia28/index.html",
  "2025-07-07": "dias/dia29/index.html",
  "2025-07-08": "dias/dia30/index.html",
  "2025-07-09": "dias/dia31/index.html",
};

const hoyLocal = new Date();
const año = hoyLocal.getFullYear();
const mes = String(hoyLocal.getMonth() + 1).padStart(2, "0");
const dia = String(hoyLocal.getDate()).padStart(2, "0");
const hoyStr = `${año}-${mes}-${dia}`;
const btn = document.getElementById("btn-canjear");
const lista = document.getElementById("lista-dias");

// Deshabilitar botón por defecto
btn.disabled = true;

for (const fecha in links) {
  const li = document.createElement("li");

  // Convertir la fecha del objeto a Date (sin hora)
  const fechaDate = new Date(fecha + "T00:00:00");

  if (fechaDate < new Date(hoyStr + "T00:00:00")) {
    // Fecha pasada
    li.innerHTML = `<span>${fecha}</span> 
      <span class="estado recibido"><a href="${links[fecha]}" target="_blank">✅ Ver regalo</a></span>`;
  } else if (fecha === hoyStr) {
    // Fecha de hoy
    li.innerHTML = `<span>${fecha}</span> 
      <span class="estado disponible">🎁 Disponible</span>`;
    btn.disabled = false;
    btn.onclick = () => {
      window.location.href = links[fecha];
    };
  } else {
    // Fecha futura
    li.innerHTML = `<span>${fecha}</span> 
      <span class="estado futuro">⏳ Próximamente</span>`;
  }

  lista.appendChild(li);
}

// Cuenta regresiva hasta la próxima sorpresa
const fechas = Object.keys(links).map((f) => new Date(f + "T00:00:00"));
const futura = fechas.find((fecha) => fecha > new Date(hoyStr + "T00:00:00"));

if (futura) {
  const objetivo = futura;
  const contenedor = document.getElementById("cuenta-regresiva");

  function actualizarCuenta() {
    const ahora = new Date();
    const diff = objetivo - ahora;

    if (diff <= 0) {
      contenedor.innerHTML = "🎉 ¡La próxima sorpresa ya está disponible!";
      return;
    }

    const horas = Math.floor(diff / 1000 / 60 / 60);
    const minutos = Math.floor((diff / 1000 / 60) % 60);
    const segundos = Math.floor((diff / 1000) % 60);

    contenedor.innerHTML = `
      ⏳ Próxima sorpresa en: 
      <strong>${String(horas).padStart(2, "0")}h</strong> :
      <strong>${String(minutos).padStart(2, "0")}m</strong> :
      <strong>${String(segundos).padStart(2, "0")}s</strong>
    `;
  }

  actualizarCuenta();
  setInterval(actualizarCuenta, 1000);
} else {
  document.getElementById("cuenta-regresiva").innerHTML =
    "🎉 ¡No hay próximas sorpresas!";
}

// Cuenta regresiva hasta el 9 de julio de 2025
const objetivo2 = new Date("2025-07-09T00:00:00");
const contenedor2 = document.getElementById("cuenta-regresiva-2anios");

function actualizarCuenta2() {
  const ahora = new Date();
  const diff = objetivo2 - ahora;

  if (diff <= 0) {
    contenedor2.innerHTML = "🎉 ¡Feliz 2° aniversario!";
    return;
  }

  const dias = Math.floor(diff / 1000 / 60 / 60 / 24);
  const horas = Math.floor((diff / 1000 / 60 / 60) % 24);
  const minutos = Math.floor((diff / 1000 / 60) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  contenedor2.innerHTML = `
    ⏳ Nuestro 2° aniversario en: 
    <strong>${dias}d</strong> 
    <strong>${String(horas).padStart(2, "0")}h</strong> :
    <strong>${String(minutos).padStart(2, "0")}m</strong> :
    <strong>${String(segundos).padStart(2, "0")}s</strong>
  `;
}

actualizarCuenta2();
setInterval(actualizarCuenta2, 1000);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js?v=4")
    .then(() => console.log("Service Worker registrado"))
    .catch((err) => console.log("Error registrando SW:", err));
}
