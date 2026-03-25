const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("main-nav");
const themeToggle = document.getElementById("theme-toggle");
const form = document.getElementById("contact-form");

const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const mensagemInput = document.getElementById("mensagem");

const erroNome = document.getElementById("erro-nome");
const erroEmail = document.getElementById("erro-email");
const erroMensagem = document.getElementById("erro-mensagem");
const feedback = document.getElementById("feedback");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const THEME_KEY = "portfolio-theme";

// Controla abertura/fechamento do menu no layout mobile.
function toggleMenu() {
  if (!nav || !menuToggle) {
    return;
  }
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

function closeMenuOnLinkClick(event) {
  if (!nav || !menuToggle) {
    return;
  }
  if (event.target.tagName === "A" && nav.classList.contains("open")) {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
}

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  // Persiste a escolha de tema para manter a preferencia entre paginas/visitas.
  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
}

function clearErrors() {
  if (!erroNome || !erroEmail || !erroMensagem || !feedback) {
    return;
  }
  erroNome.textContent = "";
  erroEmail.textContent = "";
  erroMensagem.textContent = "";
  feedback.textContent = "";
}

function validateForm() {
  if (!nomeInput || !emailInput || !mensagemInput || !erroNome || !erroEmail || !erroMensagem) {
    return false;
  }

  let isValid = true;
  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const mensagem = mensagemInput.value.trim();

  clearErrors();

  // Validacao simples de campos obrigatorios e formato de e-mail.
  if (!nome) {
    erroNome.textContent = "Informe seu nome.";
    isValid = false;
  }

  if (!email) {
    erroEmail.textContent = "Informe seu e-mail.";
    isValid = false;
  } else if (!EMAIL_REGEX.test(email)) {
    erroEmail.textContent = "Informe um e-mail valido (exemplo: usuario@dominio.com).";
    isValid = false;
  }

  if (!mensagem) {
    erroMensagem.textContent = "Escreva uma mensagem.";
    isValid = false;
  }

  return isValid;
}

function handleFormSubmit(event) {
  event.preventDefault();

  if (!form || !feedback) {
    return;
  }

  if (!validateForm()) {
    return;
  }

  // Simula o envio da mensagem conforme requisito da atividade.
  form.reset();
  feedback.textContent = "Mensagem enviada com sucesso!";
  alert("Mensagem enviada com sucesso!");
}

function loadSavedTheme() {
  // Recupera o ultimo tema salvo no navegador.
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) {
    applyTheme(savedTheme);
  }
}

if (menuToggle) {
  menuToggle.addEventListener("click", toggleMenu);
}

if (nav) {
  nav.addEventListener("click", closeMenuOnLinkClick);
}

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

if (form) {
  form.addEventListener("submit", handleFormSubmit);
}

loadSavedTheme();
