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

// --------------------- LISTAR EVENTOS --------------------------

const userSession = JSON.parse(localStorage.getItem("userSession"));
const eventos = document.getElementById("eventosUnico");
const indexUnico = document.getElementById('indexUnico');

if (eventos || indexUnico) {
    async function listarEventos(e) {
        e.preventDefault();

        try {
            const response = await apiCall('/event/listevents', 'GET');
            const eventos = response.events;
            const container = document.getElementById('adicionarEventos');
            const carrosselImg = document.getElementById('carousel-inner');
            const carrosselBtn = document.getElementById('carousel-indicators');
            
            if (indexUnico){
                carrosselImg.innerHTML = '';
                carrosselBtn.innerHTML = '';

                if (!carrosselImg || !carrosselBtn) {
                    console.error('Elementos do carrossel não encontrados.');
                    return;
                }
            }


            if (indexUnico) {
                eventos.forEach((evento, index) => {
                    const imagemCarrossel = document.createElement('div');
                    imagemCarrossel.classList.add('carousel-item');
                    
                    if (index === 0) {
                        imagemCarrossel.classList.add('active');
                    }

                    imagemCarrossel.innerHTML = `
                        <img src="${evento.miniatura}" class="carrossel d-block w-90" alt="${evento.nome}" />
                    `;

                    carrosselImg.appendChild(imagemCarrossel);

                    const botaoCarrossel = document.createElement('button');
                    botaoCarrossel.type = 'button';
                    botaoCarrossel.setAttribute('data-bs-target', '#carouselBasicExample');
                    botaoCarrossel.setAttribute('data-bs-slide-to', index);
                    botaoCarrossel.setAttribute('aria-label', `Slide ${index + 1}`);
                    
                    if (index === 0) {
                        botaoCarrossel.classList.add('active');
                        botaoCarrossel.setAttribute('aria-current', 'true');
                    }

                    carrosselBtn.appendChild(botaoCarrossel);
                });
            }
            
            else if (eventos) {
                eventos.forEach(evento => {
                    const eventoDiv = document.createElement('div');
                    eventoDiv.classList.add('col-lg-4', 'col-md-8', 'col-sm-10');

                    eventoDiv.innerHTML = `
                        <div class="single-blog blog-style-one">
                            <div class="blog-image">
                                <a href="#" class="evento-link" data-evento-nome="${evento.nome}">
                                    <img src="${evento.miniatura}" class="imgCursos" alt="Blog"/>
                                </a>
                            </div>
                            <div class="blog-content">
                                <h5 class="blog-title">
                                    <a href="#" class="evento-link" data-evento-nome="${evento.nome}">${evento.nome}</a>
                                </h5>
                                <p class="text">
                                    ${evento.descricao}
                                </p>
                            </div>
                        </div>
                    `;

                    eventoDiv.querySelector('.evento-link').addEventListener('click', () => {
                        localStorage.setItem('eventoSelecionado', evento.nome);
                        window.location.href = '/pages/evento.html';
                    });

                    
                    container.appendChild(eventoDiv);
                });
                
                if (userSession.role === "administrador") {
                    const addEventDiv = document.createElement('div');
                    addEventDiv.classList.add('col-lg-4', 'col-md-8', 'col-sm-10');
                    addEventDiv.innerHTML = `
                        <div class="single-blog blog-style-one">
                            <div class="blog-image" style="cursor: pointer;">
                                <a href="/pages/criarEventos.html"><img id="btnCriarEvento1" src="/img/eventos/addEvent.png" class="imgCursos" alt="Adicionar Evento"/></a>
                            </div>
                        </div>
                    `;
                    container.appendChild(addEventDiv);
                }
            }
            

        } catch (error) {
            console.error('Erro ao listar eventos:', error);
        }
    }

    document.addEventListener('DOMContentLoaded', listarEventos);
}

// --------------------- GERAR PAGINA DO EVENTO ESPECIFICO --------------------------

const eventoUnico = document.getElementById("eventoUnico");
const nomeEvento = localStorage.getItem("eventoSelecionado");

if(eventoUnico){
    async function carregarEvento(e) {
        e.preventDefault();

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

                    // if(response.codigoAdm != userSession.cpf) admBtnCW.style.display = "none";
                    
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
                                datainicio: `${response.datainicio}`,
                                datafim: `${response.datafim}`,
                                nomeEvento: `${nomeEvento}`,
                                banner: `${croppedBase64}`,
                                titulo: `${tituloCW.value}`,
                                descricao: `${descCW.value}`,
                                status: true,
                                vagas: parseInt(vagasCW.value, 10)
                            };

                            const createWorkshop = await apiCall("/workshop/create", "POST", data);
                            
                            if (createWorkshop.success) {
                                showMessage("success", `${createWorkshop.success}`);
                                
                                setTimeout(() => {
                                    window.location.href = "/pages/evento.html"
                                }, 1000);
                            } else if (createWorkshop.error) {
                                showMessage("error", `${createWorkshop.error}`);
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

    async function listarWorkshops(e) {
        e.preventDefault();

        let response;

        try {

            const data = {
                nomeEvento: nomeEvento
                // nomeEvento: "Sigmund Freud"
            }

            response = await apiCall("/workshop/listworkshops", "POST", data);

            console.log("RESPONSE /workshop/listworkshops : " + response)

            const workshops = response.workshops;
            const container = document.getElementById('adicionarWorkshops');
            
            // console.log("WORKSHOPS : " + workshops)
            if (workshops) {
                workshops.forEach(workshop => {
                    const workshopDiv = document.createElement('div');
                    workshopDiv.classList.add('col-lg-4', 'col-md-8', 'col-sm-10');

                    workshopDiv.innerHTML = `
                        <div class="single-blog blog-style-one">
                            <div class="blog-image">
                                <a href="#" class="workshop-link" data-workshop-nome="${workshop.titulo}">
                                    <img src="${workshop.banner}" class="imgCursos" alt="Blog"/>
                                </a>
                            </div>
                            <div class="blog-content">
                                <h5 class="blog-title">
                                    <a href="#" class="workshop-link" data-workshop-titulo="${workshop.titulo}">${workshop.titulo}</a>
                                </h5>
                                <p class="text">
                                    ${workshop.descricao}
                                </p>
                            </div>
                        </div>
                    `;

                    workshopDiv.querySelector('.workshop-link').addEventListener('click', () => {
                        localStorage.setItem('workshopSelecionado', workshop.titulo);
                        window.location.href = '/pages/workshop.html';
                    });

                    container.appendChild(workshopDiv);
                });
            }

        } catch (error) {
            console.error('Erro ao listar workshops:', error);
        }
    }
    
    async function inscreverEvento(e) {
        e.preventDefault();
        
        const eventoSelecionado = localStorage.getItem("eventoSelecionado");

        let response;

        try {

            const data = {
                nomeEvento: `${eventoSelecionado}`,
                cpfParticipante: `${userSession.cpf}`
            };

            response = await apiCall("/event/subscribe", "POST", data);
            
            if(response.success){
                
                window.location.href = "/pages/evento.html"

            }
            
        } catch(error) {
            console.error(error);
        }
        
    }

    async function listarInscritosEvento(e) {
        e.preventDefault();

        const btnSubEvento = document.getElementById("btnSubEvento");
        const btnSubEventoTrue = document.getElementById("btnSubEventoTrue");

        const eventoSelecionado = localStorage.getItem("eventoSelecionado");

        let response;

        try {
                    
            const data = {
                nomeEvento: `${eventoSelecionado}`
            };
            
            response = await apiCall("/event/listsubscribed", "POST", data);

            // console.log("v");
            // console.log(response);
            // console.log("^");

            let inscrito = false;

            // console.log("RESPONSE /event/listsubscribed : ")
            // console.log(response)

            if (response) {
            
                // const subscribed = response.subscribed || []; // Caso subscribed seja undefined, inicializa como array vazio
            
                // if (Array.isArray(subscribed)) {
                if (response) { //temp
                    const container = document.getElementById("listarInscritosEvento");
            
            
                    // Se subscribed estiver vazio, o forEach não será executado
                    // subscribed.forEach(sub => {
                    response.forEach(sub => { //temp
                        if (sub.cpf == userSession.cpf) inscrito = true;
            
                        const inscritoEventoDiv = document.createElement('div');
            
                        let srcFoto = sub.foto === "Default" ? "/img/icons/avatar.png" : `${sub.foto}`;
            
                        inscritoEventoDiv.innerHTML = `
                            <div style="margin: 5px 0px;">
                                <span>
                                    <img id="listUser Avatar" src="${srcFoto}" style="width: 2vh; border-radius: 50px;">
                                    <span id="listUser Nome">${sub.nome}</span> | 
                                    <span id="listUser Cpf">${sub.cpf}</span>
                                </span>
                            </div>
                        `;
            
                        if (userSession.role == "administrador" || userSession.role == "professor") {
                            // checar se o curso/workshop pertence ao usuario que está vendo
                            listSubDiv.style.display = "block";
                        }
            
                        container.appendChild(inscritoEventoDiv);
                    });
                }

                if (inscrito) {
                    btnSubEvento.style.display = "none";
                    btnSubEventoTrue.style.display = "block";
                }
            }

        } catch(error) {
            // console.log("DEU ERRO");
            console.error(error);
        }
        
    }

    async function inscreverWorkshop(e) {
        e.preventDefault();

        const btnSubWorkshopTrue = document.getElementById("btnSubWorkshopTrue");
        const eventoSelecionado = JSON.parse(localStorage.getItem("eventoSelecionado"));
        const workshopSelecionado = JSON.parse(localStorage.getItem("workshopSelecionado"));

        let response;

        try {

            const data = {
                cpf: `${userSession.cpf}`,
                nomeWorkshop: `${eventoSelecionado}`,
                nomeEvento: `${workshopSelecionado}`
            };
            
            response = await apiCall("/workshop/subscribe", "POST", data);

            // fazer para, se o usuario ja estiver inscrito nesse evento/workshop,
            // mostrar o botao "inscrito" invés de "inscrever-se"
            
        } catch(error) {
            console.error(error);
        }
        
    }

    const btnSubEvento = document.getElementById("btnSubEvento");
    btnSubEvento.addEventListener('click', inscreverEvento)
    
    document.addEventListener("DOMContentLoaded", (e) => {
        carregarEvento(e);
        listarWorkshops(e);
        if(userSession.role == "administrador" || userSession.role == "professor"){
            // listarInscritosEvento(e);
        }
    });
}

const workshop = document.getElementById("workshopUnico");

if(workshop){

}