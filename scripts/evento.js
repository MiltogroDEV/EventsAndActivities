import { apiCall } from "../scripts/components/apicalls.js";
import { showMessage } from "../scripts/components/showMessage.js";

let bannerBase64 = '';
let thumbnailBase64 = '';

const btnCriarEvento1 = document.getElementById("btnCriarEvento1");



if (btnCriarEvento1) {
    btnCriarEvento1.addEventListener('click', () => {
        window.location.href = "/pages/criarEventos.html";
    });
}

const pageCriarEventos = document.getElementById("criarEventosUnico");
if (pageCriarEventos){
    let bannerCropper, thumbnailCropper;
    const bannerInput = document.getElementById('bannerUpload');
    const thumbnailInput = document.getElementById('thumbnailUpload');
    const bannerImage = document.getElementById('bannerImage');
    const thumbnailImage = document.getElementById('thumbnailImage');
    const cropBannerBtn = document.getElementById('cropBannerBtn');
    const cropThumbnailBtn = document.getElementById('cropThumbnailBtn');

    bannerInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                bannerImage.src = event.target.result;
                bannerImage.style.display = 'block';
                cropBannerBtn.style.display = 'inline';

                bannerImage.onload = () => {
                    if (bannerCropper) bannerCropper.destroy();
                    bannerCropper = new Cropper(bannerImage, {
                        aspectRatio: 900 / 150,
                        viewMode: 1
                    });
                };
            };
            reader.readAsDataURL(file);
        }
    });

    thumbnailInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                thumbnailImage.src = event.target.result;
                thumbnailImage.style.display = 'block';
                cropThumbnailBtn.style.display = 'inline';

                thumbnailImage.onload = () => {
                    if (thumbnailCropper) thumbnailCropper.destroy();
                    thumbnailCropper = new Cropper(thumbnailImage, {
                        aspectRatio: 800 / 450,
                        viewMode: 1
                    });
                };
            };
            reader.readAsDataURL(file);
        }
    });

    cropBannerBtn.addEventListener('click', () => {
        const croppedCanvas = bannerCropper.getCroppedCanvas({
            width: 900,
            height: 150
        });
        bannerBase64 = croppedCanvas.toDataURL('image/jpeg');

        bannerImage.style.display = 'none';
        cropBannerBtn.style.display = 'none';

        bannerCropper.destroy();
    });

    cropThumbnailBtn.addEventListener('click', () => {
        const croppedCanvas = thumbnailCropper.getCroppedCanvas({
            width: 800,
            height: 450
        });
        thumbnailBase64 = croppedCanvas.toDataURL('image/jpeg');

        thumbnailImage.style.display = 'none';
        cropThumbnailBtn.style.display = 'none';

        thumbnailCropper.destroy();
    });


    const eventoDataInicio = document.getElementById('eventoDataInicio');
    const eventoHoraInicio = document.getElementById('eventoHoraInicio');
    const eventoDataFim = document.getElementById('eventoDataFim');
    const eventoHoraFim = document.getElementById('eventoHoraFim');
    
    const eventoNome = document.getElementById('tituloEvento');
    const eventoDesc = document.getElementById('descEvento');
    const eventoInst = document.getElementById('instEvento');
    const eventoRua = document.getElementById('ruaEvento');
    const eventoBairro = document.getElementById('bairroEvento');
    const eventoNumero = document.getElementById('numeroEvento');
    const eventoCidade = document.getElementById('cidadeEvento');
    const eventoEstado = document.getElementById('estadoEvento');
    
    async function criarEvento(e) {
        e.preventDefault();

        if (!eventoDataInicio.value || !eventoHoraInicio.value || !eventoDataFim.value || !eventoHoraFim.value) {
            showMessage("error", "Informações inválidas!");

            if (!eventoDataInicio.value) {
                eventoDataInicio.value = "";
            } if (!eventoHoraInicio.value) {
                eventoHoraInicio.value = "";
            } if (!eventoDataFim.value) {
                eventoDataFim.value = "";
            } if (!eventoHoraFim.value) {
                eventoHoraFim.value = "";
            }
        } else {

            const eventoDataHoraInicio = `${eventoDataInicio.value}T${eventoHoraInicio.value}:00.000Z`;
            const eventoDataHoraFim = eventoDataFim.value + "T" + eventoHoraFim.value + ":59.999Z";
            
            const data = {
                nome: `${eventoNome.value}`,
                // descricao: `${eventoDesc.value}`,
                instituicao: `${eventoInst.value}`,
                datainicio: `${eventoDataHoraInicio}`,
                datafim: `${eventoDataHoraFim}`,
                rua: `${eventoRua.value}`,
                numero: `${eventoNumero.value}`,
                bairro: `${eventoBairro.value}`,
                cidade: `${eventoCidade.value}`,
                estado: `${eventoEstado.value}`,
                banner: `${bannerBase64}`,
                miniatura: `${thumbnailBase64}`
            };

            // console.log(data)
            console.log(`${eventoDataInicio.value} | ${eventoHoraInicio.value}`)
            console.log(`${eventoDataFim.value} | ${eventoHoraFim.value}`)
            console.log(`${eventoDataHoraInicio} | ${eventoDataHoraFim}`)

            try {
                console.log("Tentando criar evento..."); // Remover depois
                const response = await apiCall("/create/event", "POST", data);
                if (response.success) {
                    showMessage("success", "Evento criado com sucesso!");

                    setTimeout(() => {
                        window.location.href = "/pages/criarEventos.html";
                    }, 2000);
                } else if (response.error) {
                    showMessage("error", `${response.error}`);

                    // eventoNome.value = "";
                    // eventoDesc.value = "";
                    // eventoInst.value = "";
                    // eventoRua.value = "";
                    // eventoBairro.value = "";
                    // eventoNumero.value = "";
                    // eventoCidade.value = "";
                    // eventoEstado.value = "";
                    // eventoDataInicio.value = "";
                    // eventoHoraInicio.value = "";
                    // eventoDataFim.value = "";
                    // eventoHoraFim.value = "";
                }
            } catch (e) {
                console.log(e);
                showMessage("error", "Ocorreu um erro ao criar o evento!");
            }
        }
    }

    const btnCriarEvento2 = document.getElementById("btnCriarEvento2");
    btnCriarEvento2.addEventListener('click', criarEvento);
}

// ------------------- MODAL EDITAR EVENTO

const pageSacc = document.getElementById("ponteiroCursoUnico");
if (pageSacc){

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
}
