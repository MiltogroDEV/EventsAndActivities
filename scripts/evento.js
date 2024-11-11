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

if (window.location.href == "/pages/criarEventos.html"){
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
    const eventoDataFim = document.getElementById('eventoDataFim');
    const eventoHoraInicio = document.getElementById('eventoHoraInicio');
    const eventoHoraFim = document.getElementById('eventoHoraFim');

    const eventoDataHoraInicio = `${eventoDataInicio}T${eventoHoraInicio}:00.000Z`
    const eventoDataHoraFim = `${eventoDataFim}T${eventoHoraFim}:00.000Z`
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

            try {
                console.log("Tentando criar evento..."); // Remover depois
                const response = await apiCall("/create/event", "POST", data);
                if (response.success) {
                    showMessage("success", "Evento criado com sucesso!");

                    setTimeout(() => {
                        window.location.href = "/pages/adm/eventosAdm.html";
                    }, 2000);
                } else {
                    showMessage("error", "Erro ao criar evento!");

                    eventoNome.value = "";
                    eventoDesc.value = "";
                    eventoInst.value = "";
                    eventoRua.value = "";
                    eventoBairro.value = "";
                    eventoNumero.value = "";
                    eventoCidade.value = "";
                    eventoEstado.value = "";
                    eventoDataInicio.value = "";
                    eventoHoraInicio.value = "";
                    eventoDataFim.value = "";
                    eventoHoraFim.value = "";
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

// -----------------------------------------

async function listarEventos() {
    try {
        const eventos = await apiCall('/eventos', 'GET');

        const container = document.getElementById('adicionarEventos');

        // container.innerHTML = '';

        eventos.forEach(evento => {
            const eventoDiv = document.createElement('div');
            eventoDiv.classList.add('col-lg-4', 'col-md-8', 'col-sm-10');

            eventoDiv.innerHTML = `
                <div class="single-blog blog-style-one">
                    <div class="blog-image">
                        <a href="/pages/evento/${evento.id}.html">
                            <img src="${evento.banner}" class="imgCursos" alt="Banner do Evento"/>
                        </a>
                    </div>
                    <div class="blog-content">
                        <h5 class="blog-title">
                            <a href="/pages/evento/${evento.id}.html">${evento.titulo}</a>
                        </h5>
                        <p class="text">${evento.descricao}</p>
                    </div>
                </div>
            `;

            container.appendChild(eventoDiv);
        });
    } catch (error) {
        console.error('Erro ao listar eventos:', error);
    }
}

// document.addEventListener('DOMContentLoaded', listarEventos);

