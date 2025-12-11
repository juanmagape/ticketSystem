const navBar = document.getElementById("navbar");
const myChart = document.getElementById("myChart");
const contentPage = document.getElementById("content");
const contentKnow = document.getElementById("contentKnow");

let navbarValues = ["Home", "Inbox", "Knowledge"];

navbarValues.forEach(element => {
    navBar.innerHTML += `<a href="?link=${element}">${element}</a>`
});

function cargarpaginas() {
    const urlParams = new URLSearchParams(window.location.search);
    const currentLink = urlParams.get('link');
    const knowLink = urlParams.get('know'); 
    
if (knowLink) {
    myChart.style.display = 'none';
    contentPage.style.display = 'none';
    contentKnow.style.display = 'none'; 
    
    mostrarDetalleKnowledge(knowLink);
}
else if (currentLink === "Knowledge") { 
    myChart.style.display = 'none';
    contentPage.style.display = 'none';
    
    fetch('../JSON/knowledges.json')
        .then(response => response.json())
        .then(data => {
            console.log("Tickets cargados:", data);
            mostrarKnowledges(data);
        })
        .catch(error => console.error("Error cargando JSON:", error));
}
}

function mostrarKnowledges(knowledges) {
    contentKnow.innerHTML = '';
    knowledges.forEach(know => {
        contentKnow.innerHTML += `
        <div>
            <h2>${know.nombre}</h2>
            <p>${know.descripcion_breve}</p>
            
            <a href="?know=${know.nombre}">
                <button class="botonKnow">Ver knowledge</button>
            </a>

        </div>
        `;
    });
}

function mostrarDetalleKnowledge(linkName) {
    fetch('../JSON/knowledges.json')
        .then(res => res.json())
        .then(knowName => {
            const knowN = knowName.find(t => t.nombre === linkName);
            const knowInside = document.getElementById("knowInside");
            
            if (knowN) {

                const pasos = knowN.procedimiento
                .map(paso => `<p class="paso">${paso}</p>`)
                .join('');

                knowInside.innerHTML = `
                <div class="knowDetailCont">
                    <div class="knowDetailContent">
                        <h1>${knowN.nombre}</h1>
                        <p class="knowDescription">${knowN.descripcion_breve}</p>
                        
                        <div class="procedimientoSection">
                            <h3>Procedimiento</h3>
                            <ol class="procedimientoList">
                                ${pasos}
                            </ol>
                        </div>
                        
                        <button class="botonKnow" onclick="history.back()">Volver</button>
                    </div>
                </div>
                `;
            }
        })
        .catch(error => console.error("Error:", error));
}

cargarpaginas();