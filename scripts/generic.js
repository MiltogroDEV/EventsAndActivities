const avatar = document.getElementById("avatar");
const redirecionar = document.getElementById("redirecionar");

const userSession = JSON.parse(localStorage.getItem("userSession"));
const divMudarDisplay = document.getElementById("divMudarDisplay");
const btnlc1 = document.getElementById("btnlc1");
const btnlc2 = document.getElementById("btnlc2");
const noAcess = document.getElementById("noAcess");

const redirecionarAdm = document.getElementById("redirecionarAdm");
const divMudarDisplayAdm = document.getElementById("divMudarDisplayAdm");
const noAcessAdm = document.getElementById("noAcessAdm");
const divAdmBtn = document.getElementById("divAdmBtn");

const btnTutor = document.getElementById("btnTutor");
const btnInscrever = document.getElementById("btnInscrever");
const divCriarEvento = document.getElementById("divCriarEvento");

if (userSession) {
    if (userSession.role === "administrador") {
        if (divMudarDisplay) divMudarDisplay.style.display = "block";
        if (divMudarDisplayAdm) divMudarDisplayAdm.style.display = "block";
        if (noAcess) noAcess.style.display = "none";
        if (noAcessAdm) noAcessAdm.style.display = "none";
        if (avatar) avatar.style.display = "block";
        if (btnlc1) btnlc1.style.display = "none";
        if (btnlc2) btnlc2.style.display = "none";
        if (btnTutor) btnTutor.style.display = "none";
        if (divAdmBtn) divAdmBtn.style.display = "block";
        if (btnInscrever) btnInscrever.style.display = "none";
        if (divCriarEvento) divCriarEvento.style.display = "block";
    } else if (userSession.role === "professor") {
        if (divMudarDisplay) divMudarDisplay.style.display = "block";
        if (divMudarDisplayAdm) divMudarDisplayAdm.style.display = "none";
        if (noAcess) noAcess.style.display = "none";
        if (noAcessAdm) noAcessAdm.style.display = "block";
        if (avatar) avatar.style.display = "block";
        if (btnlc1) btnlc1.style.display = "none";
        if (btnlc2) btnlc2.style.display = "none";
        if (btnTutor) btnTutor.style.display = "none";
        if (btnInscrever) btnInscrever.style.display = "none";
        if (divCriarEvento) divCriarEvento.style.display = "none";
    } else if (userSession.role === "participante") {
        if (divMudarDisplay) divMudarDisplay.style.display = "block";
        if (divMudarDisplayAdm) divMudarDisplayAdm.style.display = "none";
        if (noAcess) noAcess.style.display = "none";
        if (noAcessAdm) noAcessAdm.style.display = "block";
        if (avatar) avatar.style.display = "block";
        if (btnlc1) btnlc1.style.display = "none";
        if (btnlc2) btnlc2.style.display = "none";
        if (btnTutor) btnTutor.style.display = "block";
        if (btnInscrever) btnInscrever.style.display = "flex";
        if (divCriarEvento) divCriarEvento.style.display = "none";
    } else {
        if (divMudarDisplay) divMudarDisplay.style.display = "none";
        if (divMudarDisplayAdm) divMudarDisplayAdm.style.display = "none";
        if (noAcess) noAcess.style.display = "block";
        if (noAcessAdm) noAcessAdm.style.display = "block";
        if (avatar) avatar.style.display = "none";
        if (btnlc1) btnlc1.style.display = "block";
        if (btnlc2) btnlc2.style.display = "block";
        if (btnTutor) btnTutor.style.display = "none";
        if (btnInscrever) btnInscrever.style.display = "none";
        if (divCriarEvento) divCriarEvento.style.display = "none";
    }
    
    if (avatar) {
        avatar.src = userSession.foto === "Default" ? "/img/icons/avatar.png" : userSession.foto;
        if (avatar.src === "Default"){
            avatar.style.border = "1px solid black";
        }
    }
    
} else {
    if (divMudarDisplay) divMudarDisplay.style.display = "none";
    if (divMudarDisplayAdm) divMudarDisplayAdm.style.display = "none";
    if (noAcess) noAcess.style.display = "block";
    if (noAcessAdm) noAcessAdm.style.display = "block";
    if (avatar) avatar.style.display = "none";
    if (btnlc1) btnlc1.style.display = "block";
    if (btnlc2) btnlc2.style.display = "block";
    if (btnTutor) btnTutor.style.display = "none";
    if (btnInscrever) btnInscrever.style.display = "none";
    if (divCriarEvento) divCriarEvento.style.display = "none";
}

if (avatar) {
    avatar.addEventListener('click', () => {
        window.location.href = "/pages/perfil.html";
    });
}

if (redirecionar) {
    redirecionar.addEventListener('click', () => {
        setTimeout(() => {
            window.location.href = "/pages/login.html";
        }, 1000);
    });
}

if (btnTutor) {
    btnTutor.addEventListener('click', () => {
        setTimeout(() => {
            window.location.href = "/pages/cadastro.html";
        }, 1000);
    });
}

if (redirecionarAdm) {
    redirecionarAdm.addEventListener('click', () => {
        setTimeout(() => {
            if (userSession && (userSession.role === "professor" || userSession.role === "participante")) {
                window.location.href = "/index.html";
            } else {
                window.location.href = "/pages/login.html";
            }
        }, 1000);
    });
}
