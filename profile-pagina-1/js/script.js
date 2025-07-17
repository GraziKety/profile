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

    nomeError.style.display = 'none';
    emailError.style.display = 'none';
    assuntoError.style.display = 'none';
    mensagemError.style.display = 'none';
    formularioEnviado.style.display = 'none'; 

    nome.style.borderColor = '';
    email.style.borderColor = '';
    assunto.style.borderColor = '';
    mensagem.style.borderColor = '';

    let temErro = false;

    if (nome.value.trim() === '') {
        nomeError.textContent = 'Você precisa preencher este campo.';
        nomeError.style.display = 'block';
        nome.style.borderColor = 'red';
        temErro = true;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailPattern.test(email.value.trim())) {
        emailError.textContent = 'Por favor, insira um e-mail válido.';
        emailError.style.display = 'block';
        email.style.borderColor = 'red';
        temErro = true;
    }

    if (assunto.value.trim() === '') {
        assuntoError.textContent = 'Você precisa preencher este campo.';
        assuntoError.style.display = 'block';
        assunto.style.borderColor = 'red';
        temErro = true;
    }

    if (mensagem.value.trim() === '') {
        mensagemError.textContent = 'Você precisa preencher este campo.';
        mensagemError.style.display = 'block';
        mensagem.style.borderColor = 'red';
        temErro = true;
    }

    if (temErro) {
        formularioEnviado.textContent = 'Preenchimento incompleto!';
        formularioEnviado.className = 'enviado formularioIncompleto'; 
        formularioEnviado.style.display = 'block';
        setTimeout(() => {
            formularioEnviado.style.display = 'none';
        }, 5000); 
        return;
    }

    try {
        const resposta = await fetch("https://profile-service.vercel.app/api/v1/formulario", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome: nome.value.trim(),
                email: email.value.trim(),
                assunto: assunto.value.trim(),
                mensagem: mensagem.value.trim(),
                destino: 'grazielaketyprogramer@gmail.com'
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

    console.log('Nome:', nome.value);
    console.log('Email:', email.value);
    console.log('Assunto:', assunto.value);
    console.log('Mensagem:', mensagem.value);

    formularioEnviado.textContent = 'Formulário Submetido!';
    formularioEnviado.className = 'success'; 
    formularioEnviado.style.display = 'block';
    setTimeout(() => {
        formularioEnviado.style.display = 'none';
    }, 5000); 

    nome.value = '';
    email.value = '';
    assunto.value = '';
    mensagem.value = '';
});

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

