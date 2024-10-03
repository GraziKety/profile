// Evento de clique no botão "CONTATE-ME"
document.getElementById("contactButton").addEventListener("click", function () {
    window.open("contato.html", "_blank"); // Abre o formulário em uma nova aba
});

// Evento de submissão do formulário de contato
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Aqui você pode processar os dados, por exemplo:
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const mensagem = document.getElementById("mensagem").value;

    // Exibir os dados no console (ou você pode enviar para um servidor)
    console.log("Nome:", nome);
    console.log("E-mail:", email);
    console.log("Mensagem:", mensagem);

    // Limpar o formulário após o envio
    document.getElementById("contactForm").reset();

    // Adicionar uma mensagem de sucesso
    alert("Mensagem enviada com sucesso!");
});
