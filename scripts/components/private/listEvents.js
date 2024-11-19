import { apiCall } from "/scripts/components/apicalls.js";

const userSession = JSON.parse(localStorage.getItem("userSession"));
const eventos = document.getElementById("eventosUnico");

if (eventos) {
    async function listarEventos(e) {
        e.preventDefault();

        try {
            const response = await apiCall('/event/listevents', 'GET');
            const eventos = response.events;
            const container = document.getElementById('adicionarEventos');

            if (eventos) {
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

                    // Adicionar evento de clique para redirecionar
                    eventoDiv.querySelector('.evento-link').addEventListener('click', () => {
                        localStorage.setItem('eventoSelecionado', evento.nome); // Salvar o nome no localStorage
                        window.location.href = '/pages/evento.html'; // Redirecionar para a página de detalhes
                    });

                    container.appendChild(eventoDiv);
                });
            }

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

        } catch (error) {
            console.error('Erro ao listar eventos:', error);
        }
    }

    document.addEventListener('DOMContentLoaded', listarEventos);
}
