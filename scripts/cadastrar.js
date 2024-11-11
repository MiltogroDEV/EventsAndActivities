import { apiCall } from "../scripts/components/apicalls.js";
import { showMessage } from "../scripts/components/showMessage.js";

const inputNome = document.getElementById("inputNome");
const inputCpf = document.getElementById("inputCPF");
const inputEmail = document.getElementById("inputEmail");
const inputTelefone = document.getElementById("inputTelefone");
const inputCidade = document.getElementById("inputCidade");
const inputEstado = document.getElementById("inputEstado");
const inputRua = document.getElementById("inputRua");
const inputBairro = document.getElementById("inputBairro");
const inputNumero = document.getElementById("inputNumero");
const inputSenha1 = document.getElementById("inputSenha1");
const inputSenha2 = document.getElementById("inputSenha2");
const inputRole = document.getElementById("inputRole");
const termosCondicoes = document.getElementById("termosCondicoes");

let userCpf;
let userTelefone;
let userEmail = false;

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

inputTelefone.addEventListener('input', (e) => {
    let inputLength = inputTelefone.value.length;

    if (inputLength === 1){
        inputTelefone.value = "(" + inputTelefone.value;
    } else if (inputLength === 3){
        inputTelefone.value += ") ";
    } else if (inputLength === 10){
        inputTelefone.value += "-";
    }

    if (inputLength === 15){
        userTelefone = inputTelefone.value.replace(/[()\s-]/g, '');
    }
});

inputEmail.addEventListener('input', () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (regexEmail.test(inputEmail.value)) {
        userEmail = true;
    }
});

async function cadastrar(e){
    e.preventDefault();

    if(inputNome.value.length < 1 || inputCpf.value.length < 14 || inputSenha1.value.length < 5 || inputSenha2.value.length < 5 || inputSenha1.value != inputSenha2.value || !userEmail || inputTelefone.value.length < 14 || inputRua.value.length < 1 || inputBairro.value.length < 1 || inputNumero.value.length == 0){
        showMessage("error", "Credenciais inválidas.");
        if (inputNome.value.length < 1) {
            inputNome.value = "";
        } if (inputCpf.value.length < 14) {
            inputCpf.value = "";
        } if (inputSenha1.value.length < 5 || inputSenha2.value.length < 5 || inputSenha1.value != inputSenha2.value) {
            inputSenha1.value = "";
            inputSenha2.value = "";
        } if (!userEmail) {
            inputEmail.value = "";
        } if (inputTelefone.value.length < 14) {
            inputTelefone.value = "";
        } if (inputRua.value.length < 1) {
            inputRua.value = "";
        } if (inputBairro.value.length < 1) {
            inputBairro.value = "";
        } if (inputNumero.value.length == 0) {
            inputNumero.value = "";
        }
    } else if (!termosCondicoes.checked){
        showMessage("warning", "Para continuar, aceite os termos e condições.");
    } else {

        let role;

        if (inputRole.value == "Participante"){
            role = "PARTICIPANT";
        } else if (inputRole.value == "Professor"){
            role = "PROFESSOR";
        } else if (inputRole.value == "Criador de eventos"){
            role = "ADM";
        }

        const data = {
            "cpf": `${userCpf}`,
            "nome": `${inputNome.value}`,
            "foto": `Default`,
            "telefone": `${userTelefone}`,
            "email": `${inputEmail.value}`,
            "password": `${inputSenha1.value}`,
            "rua": `${inputRua.value}`,
            "numero": `${inputNumero.value}`,
            "bairro": `${inputBairro.value}`,
            "cidade": `${inputCidade.value}`,
            "estado": `${inputEstado.value}`,
            "role": `${role}`
        }

        console.log(data);

        try{
            const attemptLoggin = await apiCall("/create/user", "POST", data);

            if(attemptLoggin.success){
                showMessage("success", "Conta cadastrada com sucesso!")
                
                setTimeout(() => {
                    window.location.href = "/pages/login.html";
                }, 1000);

            } else if(attemptLoggin.error){
                showMessage("error", `${attemptLoggin.error}`);

                inputNome.value = "";
                inputCpf.value = "";
                inputSenha1.value = "";
                inputSenha2.value = "";
                inputEmail.value = "";
                inputTelefone.value = "";
                inputRua.value = "";
                inputBairro.value = "";
                inputNumero.value = "";
            }
        } catch(e) {
            console.log(e);
        }
    }
}

const cadastrarButton = document.getElementById("cadastrarBtn");
cadastrarButton.addEventListener("click", cadastrar);

document.getElementById("registerForm").addEventListener('submit', (e) => {
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