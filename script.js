const datosMigracion = [
  {
    destino: "Estados Unidos",
    valor: 11654000,
    nota: "Aprox. 97,8% de mexicanos en el exterior (IME/SRE)."
  },
  {
    destino: "Europa",
    valor: 103814,
    nota: "Registro de connacionales en Europa (IME/SRE)."
  },
  {
    destino: "Asia",
    valor: 11180,
    nota: "Mexicanas y mexicanos residentes en Asia (IME/SRE)."
  }
];

function formatearNumero(numero) {
  return new Intl.NumberFormat("es-MX").format(numero);
}

function actualizarPanelMigracion() {
  const destinos = {
    "migrantes-eua": datosMigracion[0].valor,
    "migrantes-europa": datosMigracion[1].valor,
    "migrantes-asia": datosMigracion[2].valor
  };

  Object.entries(destinos).forEach(([id, valor]) => {
    const elemento = document.querySelector(`#${id}`);
    if (elemento) elemento.textContent = formatearNumero(valor);
  });
}

function escribirLectura() {
  const lectura = document.querySelector("#lectura");
  if (!lectura) return;

  const eua = datosMigracion[0];
  const europa = datosMigracion[1];
  const asia = datosMigracion[2];
  const total = datosMigracion.reduce((suma, fila) => suma + fila.valor, 0);

  lectura.textContent =
    `El Instituto de los Mexicanos en el Exterior (SRE) registra cerca de ${formatearNumero(total)} ` +
    `mexicanas y mexicanos fuera del país. ${eua.destino} concentra la inmensa mayoría ` +
    `(${formatearNumero(eua.valor)} personas), seguido de ${europa.destino} ` +
    `(${formatearNumero(europa.valor)}) y ${asia.destino} (${formatearNumero(asia.valor)}). ` +
    `La OIM y la ONU señalan que el corredor México–Estados Unidos sigue siendo el más numeroso del mundo.`;
}

function initNavegacion() {
  const nav = document.querySelector(".nav-hub");
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector("#nav-menu");
  const enlaces = document.querySelectorAll(".nav-menu a[data-nav]");
  const secciones = [...document.querySelectorAll(".seccion-ancla")];

  if (!nav || !toggle || !menu || secciones.length === 0) return;

  const cerrarMenu = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menú de navegación");
  };

  toggle.addEventListener("click", () => {
    const abierto = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(abierto));
    toggle.setAttribute("aria-label", abierto ? "Cerrar menú de navegación" : "Abrir menú de navegación");
  });

  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", cerrarMenu);
  });

  document.addEventListener("click", (evento) => {
    if (!nav.contains(evento.target)) cerrarMenu();
  });

  const marcarActivo = () => {
    const offset = window.scrollY + nav.offsetHeight + 48;
    let activa = secciones[0].id;

    secciones.forEach((seccion) => {
      if (seccion.offsetTop <= offset) activa = seccion.id;
    });

    enlaces.forEach((enlace) => {
      enlace.classList.toggle("is-active", enlace.dataset.nav === activa);
    });
  };

  marcarActivo();
  window.addEventListener("scroll", marcarActivo, { passive: true });
}

function initContacto() {
  const boton = document.querySelector("#btn-contacto");
  if (!boton) return;

  boton.addEventListener("click", () => {
    const usuario = "arbarradas";
    const dominio = ["tec", "mx"].join(".");
    const correo = `${usuario}@${dominio}`;
    window.location.href = `mailto:${correo}?subject=${encodeURIComponent("Contacto — Hub de Migración e Impacto Social")}`;
  });
}

function initVolverArriba() {
  const boton = document.querySelector("#btn-arriba");
  if (!boton) return;

  const mostrar = () => {
    boton.hidden = window.scrollY < 320;
  };

  mostrar();
  window.addEventListener("scroll", mostrar, { passive: true });
}

actualizarPanelMigracion();
escribirLectura();
initNavegacion();
initContacto();
initVolverArriba();
