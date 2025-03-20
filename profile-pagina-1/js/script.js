// Captura o formulário
const validacao = document.getElementById("contactForm");
console.log(validacao);

validacao.addEventListener("submit", async function (event) {
    event.preventDefault(); // Impede o envio automático do formulário

    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const assunto = document.getElementById('assunto');
    const mensagem = document.getElementById('mensagem');

    // Erros
    const nomeError = document.getElementById('nomeError');
    const emailError = document.getElementById('emailError');
    const assuntoError = document.getElementById('assuntoError');
    const mensagemError = document.getElementById('mensagemError');
    const formularioEnviado = document.getElementById('formularioEnviado'); // Mensagem de sucesso

    // Limpar mensagens anteriores
    nomeError.style.display = 'none';
    emailError.style.display = 'none';
    assuntoError.style.display = 'none';
    mensagemError.style.display = 'none';
    formularioEnviado.style.display = 'none'; // Esconder mensagem anterior

    // Limpar bordas vermelhas
    nome.style.borderColor = '';
    email.style.borderColor = '';
    assunto.style.borderColor = '';
    mensagem.style.borderColor = '';

    let temErro = false;

    // Validação do nome
    if (nome.value.trim() === '') {
        nomeError.textContent = 'Você precisa preencher este campo.';
        nomeError.style.display = 'block';
        nome.style.borderColor = 'red';
        temErro = true;
    }

    // Validação do email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão p/ validar e-mail
    if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = 'Por favor, insira um e-mail válido.';
        emailError.style.display = 'block';
        email.style.borderColor = 'red';
        temErro = true;
    }

    // Validação do assunto
    if (assunto.value.trim() === '') {
        assuntoError.textContent = 'Você precisa preencher este campo.';
        assuntoError.style.display = 'block';
        assunto.style.borderColor = 'red';
        temErro = true;
    }

    // Validação da mensagem
    if (mensagem.value.trim() === '') {
        mensagemError.textContent = 'Você precisa preencher este campo.';
        mensagemError.style.display = 'block';
        mensagem.style.borderColor = 'red';
        temErro = true;
    }

    // Se houver erros, exibe a mensagem de erro e interrompe o envio
    if (temErro) {
        formularioEnviado.textContent = 'Preenchimento incompleto!';
        formularioEnviado.className = 'enviado formularioIncompleto'; // Usa a classe específica para erro
        formularioEnviado.style.display = 'block';
        setTimeout(() => {
            formularioEnviado.style.display = 'none';
        }, 5000); // Oculta a mensagem após 5 segundos
        return;
    }

    // Adição: Envio assíncrono via fetch API
    try {
        const resposta = await fetch("http://localhost:3000/enviar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome: nome.value.trim(),
                email: email.value.trim(),
                assunto: assunto.value.trim(),
                mensagem: mensagem.value.trim()
            })
        });

        const resultado = await resposta.json();

        if (resposta.ok) {
            formularioEnviado.textContent = resultado.mensagem;
            formularioEnviado.style.color = "green";
        } else {
            formularioEnviado.textContent = resultado.mensagem;
            formularioEnviado.style.color = "red";
        }

    } catch (erro) {
        console.error("Erro ao enviar o formulário:", erro);
        alert("Erro ao enviar formulário. Tente novamente.");
    }

    // Exibir os dados no console (útil para debug)
    console.log('Nome:', nome.value);
    console.log('Email:', email.value);
    console.log('Assunto:', assunto.value);
    console.log('Mensagem:', mensagem.value);

    // Se não houver erros, exibe a mensagem de sucesso e limpa o formulário
    formularioEnviado.textContent = 'Formulário Submetido!';
    formularioEnviado.className = 'success'; // Adiciona a classe de sucesso
    formularioEnviado.style.display = 'block';
    setTimeout(() => {
        formularioEnviado.style.display = 'none';
    }, 5000); // Oculta a mensagem após 5 segundos

    // Limpar os campos após envio
    nome.value = '';
    email.value = '';
    assunto.value = '';
    mensagem.value = '';
});

// Remover erro ao começar a digitar
nome.addEventListener('input', function () {
    if (nome.value.trim() !== '') {
        nome.style.borderColor = '';
        nomeError.style.display = 'none';
    }
});

email.addEventListener('input', function () {
    if (email.value.trim() !== '') {
        email.style.borderColor = '';
        emailError.style.display = 'none';
    }
});

assunto.addEventListener('input', function () {
    if (assunto.value.trim() !== '') {
        assunto.style.borderColor = '';
        assuntoError.style.display = 'none';
    }
});

mensagem.addEventListener('input', function () {
    if (mensagem.value.trim() !== '') {
        mensagem.style.borderColor = '';
        mensagemError.style.display = 'none';
    }
});
