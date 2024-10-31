document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const menuOptions = document.getElementById("menuOptions");

  menuToggle.addEventListener("click", function () {
    // Alterna a visibilidade das opções do menu
    if (
      menuOptions.style.display === "none" ||
      menuOptions.style.display === ""
    ) {
      menuOptions.style.display = "block";
    } else {
      menuOptions.style.display = "none";
    }
  });

  // Fecha o menu ao clicar fora
  window.addEventListener("click", function (event) {
    if (
      !menuToggle.contains(event.target) &&
      !menuOptions.contains(event.target)
    ) {
      menuOptions.style.display = "none";
    }
  });
});

menuOptions.querySelectorAll("a").forEach((option) => {
  option.addEventListener("click", function () {
    menuOptions.style.display = "none"; // Fecha o menu após selecionar uma opção
  });
});
