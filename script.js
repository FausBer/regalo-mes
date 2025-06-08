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

//const hoy = new Date().toISOString().split("T")[0]; // original
const hoy = "2025-06-10"; // fecha fija para pruebas
const btn = document.getElementById("btn-canjear");
const lista = document.getElementById("lista-dias");

for (const fecha in links) {
  const li = document.createElement("li");

  if (fecha < hoy) {
    li.innerHTML = `<span>${fecha}</span> 
    <span class="estado recibido"><a href="${links[fecha]}" target="_blank">✅ Ver regalo</a></span>`;
  } else if (fecha === hoy) {
    li.innerHTML = `<span>${fecha}</span> 
    <span class="estado disponible">🎁 Disponible</span>`;
    btn.disabled = false;
    btn.onclick = () => (window.location.href = links[fecha]);
  } else {
    li.innerHTML = `<span>${fecha}</span> 
    <span class="estado futuro">⏳ Próximamente</span>`;
  }

  lista.appendChild(li);
}

// Cuenta regresiva hasta la próxima sorpresa
const hoyFecha = new Date();
const fechas = Object.keys(links);
const futura = fechas.find((fecha) => new Date(fecha) > hoyFecha);

if (futura) {
  const objetivo = new Date(futura + "T00:00:00");
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
    .register("/sw.js?v=2")
    .then(() => console.log("Service Worker registrado"))
    .catch((err) => console.log("Error registrando SW:", err));
}
