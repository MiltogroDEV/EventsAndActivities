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
    
    const divBannerPrevia = document.getElementById('divBannerPrevia');
    const divThumbPrevia = document.getElementById('divThumbPrevia');

    bannerInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                bannerImage.src = event.target.result;
                bannerImage.style.display = 'block';
                cropBannerBtn.style.display = 'inline';

                bannerImage.onload = () => {
                    divBannerPrevia.style.height = "50vh";
                    divBannerPrevia.style.marginBottom = "4vh";
                    
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
                    divThumbPrevia.style.height = "50vh";
                    divThumbPrevia.style.marginBottom = "4vh";

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
        divBannerPrevia.style.height = '0px';
        divBannerPrevia.style.marginBottom = "0px";

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
        divThumbPrevia.style.height = '0px';
        divThumbPrevia.style.marginBottom = "0px";

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
                descricao: `${eventoDesc.value}`,
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

            console.log(data);

            try {
                const response = await apiCall("/event/create", "POST", data);
                if (response.success) {
                    showMessage("success", "Evento criado com sucesso!");

                    setTimeout(() => {
                        window.location.href = "/pages/criarEventos.html";
                    }, 2000);
                } else if (response.error) {
                    showMessage("error", `${response.error}`);
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
        const admBtnCW = document.getElementById("admBtnCW");
        const btnFecharModal = document.getElementById("btnFecharModal");
        
        admBtnCW.addEventListener("click", () => {
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

// --------------------- GERAR PAGINA DO EVENTO ESPECIFICO --------------------------

const eventoUnico = document.getElementById("eventoUnico");

if(eventoUnico){
    async function carregarEvento(e) {
        e.preventDefault();
    
        const nomeEvento = localStorage.getItem("eventoSelecionado");
        
        if (!nomeEvento) {
            showMessage("error", "Nenhum evento foi selecionado!");
        } else {
            const data = {
                "nome": `${nomeEvento}`
            };
    
            let response;
            
            try {
                response = await apiCall("/event/getevent", "POST", data);
                
                if (response) {
                    
                    const bannerEventoEscolhido = document.getElementById("banner");
                    const tituloEventoEscolhido = document.getElementById("titulo");
                    const descricaoEventoEscolhido = document.getElementById("descricao");
                    const dataHorarioEventoEscolhido = document.getElementById("data-horario");
                    const localizacaoEventoEscolhido = document.getElementById("localizacao");
                    
                    bannerEventoEscolhido.src = response.banner;
                    tituloEventoEscolhido.textContent = response.nome;
                    descricaoEventoEscolhido.textContent = response.descricao;
                    dataHorarioEventoEscolhido.textContent = `${response.datainicio} até ${response.datafim}`;
                    localizacaoEventoEscolhido.textContent = `Inst. ${response.instituicao} | ${response.rua}, ${response.numero} - ${response.bairro} | ${response.cidade} - ${response.estado}`;
                    
                } else if (response.error) {
                    showMessage("error", `${response.error}`);
                }
            } catch (e) {
                console.log("Erro ao buscar o evento:", e);
                showMessage("error", "Erro ao carregar o evento. Tente novamente.");
            }
        }
    }

    const modal = new bootstrap.Modal(document.getElementById("modalBody"));
    if (modal){
        const admBtnCW = document.getElementById("admBtnCW");
        const btnFecharModal = document.getElementById("btnFecharModal");
        const saveCW = document.getElementById("saveCW");
        
        if(admBtnCW){
            admBtnCW.addEventListener("click", () => {
                modal.show();
            });
        }
        
        if(btnFecharModal){
            btnFecharModal.addEventListener("click", () => {
                modal.hide();
            });
        }
        
        const divThumbPrevia = document.getElementById("divThumbPrevia");
        const thumbnailCW = document.getElementById("thumbnailCW");
        const thumbnailImage = document.getElementById("thumbnailImage");
        const cropThumbnailBtn = document.getElementById("cropThumbnailBtn");
        
        let cropper;
        let croppedBase64 = '';
        
        thumbnailCW.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                    thumbnailImage.src = reader.result;
                    thumbnailImage.style.display = "block";
                    cropThumbnailBtn.style.display = "inline";
                    divThumbPrevia.style.height = "50vh";
        
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
        
        
        cropThumbnailBtn.addEventListener("click", () => {
            if (cropper) {
                const croppedCanvas = cropper.getCroppedCanvas();
                if (croppedCanvas) {
                    croppedBase64 = croppedCanvas.toDataURL("image/png");
                    finalizeCrop();
                } else {
                    console.error("Erro ao obter o canvas cortado.");
                }
            } else {
                console.error("Cropper não foi inicializado corretamente.");
            }
        });
        
        
        function finalizeCrop() {
            if (cropper) {
                cropper.destroy();
            }
            cropThumbnailBtn.style.display = "none";
            divThumbPrevia.style.height = "0px";
            thumbnailImage.style.display = "none";
        }
        
        const tituloCW = document.getElementById("tituloCW");
        const vagasCW = document.getElementById("vagasCW");
        const descCW = document.getElementById("descCW");
        
        async function criarWorkshop(e) {
            e.preventDefault();

            const nomeEvento = localStorage.getItem("eventoSelecionado");
            
            if(tituloCW.value.length == 0 || vagasCW.value == 0 || descCW.value.length == 0){
                showMessage("error", "Dados inválidos")
                if(vagasCW.value.length == 0) vagasCW.value = 1;

            } else {

                const data = {
                    "nome": `${nomeEvento}`
                };
                
                let response;
                
                try {
                    response = await apiCall("/event/getevent", "POST", data);
                    
                    if (response) {
                        try{
                            const data = {
                                "datainicio": `${response.datainicio}`,
                                "datafim": `${response.datafim}`,
                                "nomeEvento": `${nomeEvento}`,
                                "banner": `${croppedBase64}`,
                                "titulo": `${tituloCW.value}`,
                                "descricao": `${descCW.value}`,
                                "status": true,
                                "vagas": parseInt(vagasCW.value, 10)
                            };

                            console.log(data);

                            const createWorkshop = await apiCall("/workshop/create", "POST", data);
                            
                            if (createWorkshop == "Minicurso criado com sucesso!") {
                                showMessage("success", `${createWorkshop}`);
                                
                                setTimeout(() => {
                                    window.location.href = "/pages/evento.html"
                                }, 1000);
                            } else {
                                showMessage("error", `${createWorkshop}`);

                                console.log(createWorkshop);
                            }


                        } catch(e) {
                            showMessage("error", "Erro interno");
                        }
                    }
                } catch(e) {
                    showMessage("error", "Erro interno");
                }
            }
        
            
        }

        saveCW.addEventListener("click", criarWorkshop);
    }
    
    document.addEventListener("DOMContentLoaded", (e) => {
        carregarEvento(e);
    });
}
