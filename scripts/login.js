import { apiCall } from "../scripts/components/apicalls.js";
import { showMessage } from "../scripts/components/showMessage.js";

const inputCpf = document.getElementById("inputCPF");
const senha = document.getElementById("inputSenha");

let userCpf;

inputCpf.addEventListener('input', (e) => {
    let inputLength = inputCpf.value.length;
    if (inputLength === 3 || inputLength === 7) {
        inputCpf.value += ".";
    } else if (inputLength === 11) {
        inputCpf.value += "-";
    }

    if (inputLength === 14){
        userCpf = inputCpf.value.replace(/[.-]/g, '');
    }
});

async function login(e){
    let attemptLoggin;
    e.preventDefault();

    if (inputCpf.value.length != 14 || senha.value.length < 5){
        showMessage("error", "Credenciais inválidas!");

        if(inputCpf.value.length != 14){
            inputCpf.value = "";
        }
        if(senha.value.length < 5){
            senha.value = "";
        }
    } else {
        const data = {
            "cpf": `${userCpf}`,
            "password": `${senha.value}`,
        }

        console.log(data);

        try{
            console.log("tentando logar"); // remover depois
            attemptLoggin = await apiCall("/login", "POST", data);
            if(attemptLoggin.success){
                showMessage("success", "Login efetuado com sucesso!")

                const userSession = {
                    cpf: attemptLoggin.cpf,
                    role: attemptLoggin.role,
                    cidade: attemptLoggin.cidade,
                    estado: attemptLoggin.estado,
                    foto: attemptLoggin.foto,
                    numero: attemptLoggin.numero,
                    bairro: attemptLoggin.bairro,
                    nome: attemptLoggin.nome,
                    email: attemptLoggin.email,
                    rua: attemptLoggin.rua
                };

                localStorage.setItem("userSession", JSON.stringify(userSession));

                setTimeout(() => {
                    window.location.href = "/index.html";
                }, 2000);
            } else if (attemptLoggin.error) {
                showMessage("error", `${attemptLoggin.error}`);

                inputCpf.value = "";
                senha.value = "";
            }
        } catch (e){
            console.log(e);
        }
    }
}

const loginButton = document.getElementById("loginBtn");
loginButton.addEventListener("click", login);

document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
});

const btnVoltar = document.getElementById("btnVoltar");
btnVoltar.addEventListener('click', (e) => {
    window.location.href = "/index.html"
});

// TESTES
// setInterval(() => {
//     console.log()
// }, 100)