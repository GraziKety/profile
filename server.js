require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config(); 

const app = express();
app.use(cors());
app.use(express.json());


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
    },
});

app.post("/enviar", async (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;

    if (!nome || !email || !assunto || !mensagem) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "grazielaketyprogramer@gmail.com", 
        subject: `Assunto do formulário: ${assunto || "Sem Assunto"}`,
        text: `Nome: ${nome}\nE-mail: ${email}\n\nMensagem:\n${mensagem}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ mensagem: "E-mail enviado com sucesso!" });
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        res.status(500).json({ mensagem: "Erro ao enviar e-mail." });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
