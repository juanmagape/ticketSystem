const content = document.getElementById("content");

fetch('../JSON/tickets.json')
  .then(response => response.json())
  .then(data => {
    console.log("Tickets cargados:", data);
    mostrarTickets(data);
  })
  .catch(error => console.error("Error cargando JSON:", error));

function mostrarTickets(tickets) {
    content.innerHTML += `  
    <thead>
    <tr>
      <th class="border">ID</th>
      <th class="border">Asunto</th>
      <th class="border">Fecha</th>
      <th>Estado</th>
    </tr>
  </thead>`
    tickets.forEach(ticket => {
        content.innerHTML += `
        <tr>
            <td class="border"><a href="?ticket=${ticket.id}" class="idlink" id">${ticket.id}</a></td>
            <td class="border">${ticket.asunto}</td>
            <td class="border">${ticket.fecha_apertura}</td>
            <td>${ticket.estado}</td>
        </tr>
        </div>`;
    });

    const params = new URLSearchParams(window.location.search);
    const ticketID = params.get("ticket");

    if (ticketID) {
    fetch('../JSON/tickets.json')
        .then(res => res.json())
        .then(tickets => {
            const ticket = tickets.find(t => t.id === ticketID);
            const canvas = document.getElementById("myChart");

            canvas.style.display = 'none';
            
function getEstadoClass(estado) {
    if (estado === "Completado") return "estado-completado";
    if (estado === "Pendiente") return "estado-pendiente";
    if (estado === "En progreso") return "estado-enprogreso";
    return "";
}

content.innerHTML = `
<div class="ticketCont">
    <div class="knowContent">
        <h3>${ticket.asunto}</h3>
        
        <h4>Descripción del problema</h4>
        <p>${ticket.descripcion}</p>
        
        <h4>Solución</h4>
        <p>${ticket.solucion}</p>
        
        <button class="botonKnow" onclick="history.back()">Volver</button>
    </div>
    
    <div class="aside">
        <div>
            <label>Número de caso</label>
            <div class="value ticketID">${ticketID}</div>
        </div>
        
        <div>
            <label>Estado</label>
            <div class="value">
                <span class="estadoBadge ${getEstadoClass(ticket.estado)}">
                    ${ticket.estado}
                </span>
            </div>
        </div>
        
        <div>
            <label>Agente asignado</label>
            <div class="value">${ticket.agente}</div>
        </div>
        
        <div>
            <label>Fecha de apertura</label>
            <div class="value">${ticket.fecha_apertura}</div>
        </div>
    </div>
</div>
`;
    }
    )}
}