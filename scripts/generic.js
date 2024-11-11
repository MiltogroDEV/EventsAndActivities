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

// --------------------------------------------

const modal = new bootstrap.Modal(document.getElementById("modalBody"));

if (modal){
    const admBtnEditarEvento = document.getElementById("admBtnEditarEvento");
    const btnFecharModal = document.getElementById("btnFecharModal");
    
    admBtnEditarEvento.addEventListener("click", () => {
        modal.show();
    });
    
    btnFecharModal.addEventListener("click", () => {
        modal.hide();
    });
    
    const bannerUpload = document.getElementById("bannerEdit");
    const bannerImage = document.getElementById("bannerImage");
    const cropBannerBtn = document.getElementById("cropBannerBtn");

    const thumbnailUpload = document.getElementById("thumbnailEdit");
    const thumbnailImage = document.getElementById("thumbnailImage");
    const cropThumbnailBtn = document.getElementById("cropThumbnailBtn");

    let cropper; 

    bannerUpload.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                bannerImage.src = reader.result;
                bannerImage.style.display = "block";
                cropBannerBtn.style.display = "inline";
                initializeCropper(bannerImage, 900, 150);
            };
            reader.readAsDataURL(file);
        }
    });

    thumbnailUpload.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                thumbnailImage.src = reader.result;
                thumbnailImage.style.display = "block";
                cropThumbnailBtn.style.display = "inline";
                initializeCropper(thumbnailImage, 800, 450);
            };
            reader.readAsDataURL(file);
        }
    });

    function initializeCropper(imageElement, width, height) {
        if (cropper) {
            cropper.destroy();
        }
        cropper = new Cropper(imageElement, {
            aspectRatio: width / height,
            viewMode: 1,
        });
    }

    cropBannerBtn.addEventListener("click", () => {
        const croppedCanvas = cropper.getCroppedCanvas();
        bannerImage.src = croppedCanvas.toDataURL("image/png");
        finalizeCrop();
    });

    cropThumbnailBtn.addEventListener("click", () => {
        const croppedCanvas = cropper.getCroppedCanvas();
        thumbnailImage.src = croppedCanvas.toDataURL("image/png");
        finalizeCrop();
    });

    function finalizeCrop() {
        if (cropper) {
            cropper.destroy();
        }
        cropBannerBtn.style.display = "none";
        cropThumbnailBtn.style.display = "none";
    }

    let bannerBase64;
    let thumbnailBase64;

    document.getElementById("cropBannerBtn").addEventListener("click", () => {
        bannerBase64 = cropper.getCroppedCanvas().toDataURL("image/png");
    });

    document.getElementById("cropThumbnailBtn").addEventListener("click", () => {
        thumbnailBase64 = cropper.getCroppedCanvas().toDataURL("image/png");
    });

}