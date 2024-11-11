import { apiCall } from "/scripts/components/apicalls.js";

const userSession = JSON.parse(localStorage.getItem("userSession"));
const eventos = document.getElementById("eventosUnico");

if (eventos){
    async function listarEventos(e) {
        e.preventDefault();

        try {
            const response = await apiCall('/get/listevents', 'GET');
            const eventos = response.events;
    
            const container = document.getElementById('adicionarEventos');
    
            // container.innerHTML = '';
    
            eventos.forEach(evento => {
                const eventoDiv = document.createElement('div');
                eventoDiv.classList.add('col-lg-4', 'col-md-8', 'col-sm-10');
    
                eventoDiv.innerHTML = `
                    <div class="single-blog blog-style-one">
                        <div class="blog-image">
                            <a href="#">
                                <img src="${evento.miniatura}" class="imgCursos" alt="Miniatura do Evento"/>
                            </a>
                        </div>
                        <div class="blog-content">
                            <h5 class="blog-title">
                                <a href="#">${evento.nome}</a>
                            </h5>
                            <p class="text">${evento.descricao}</p>
                        </div>
                    </div>
                `;
    
                container.appendChild(eventoDiv);
            });
    
            if (userSession.role == "administrador"){
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
