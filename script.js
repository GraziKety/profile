// p/clicar no botao
document.getElementById("contactButton").addEventListener("click", function () {
    window.open("contato.html", "_blank"); // p/ abrir em uma nova aba
});

// p/ enviar o formulario
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // p/ nao recarregar a pag

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;

    console.log("Nome:", nome);
    console.log("E-mail:", email);
    console.log("Mensagem:", mensagem);

    // p/ limpar o formulario
    document.getElementById("contactForm").reset();

    alert("Mensagem enviada com sucesso!");
});
