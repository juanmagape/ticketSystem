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
            
            content.innerHTML = 
            `
            <div class="knowContent">
            <p class="ticketID">${ticketID}</p>
            <h3>${ticket.asunto}</h3>
            <p>${ticket.descripcion}</p>
            <a href="javascript:history.back()">
            <button class="botonKnow">Volver</button>
            </a>
            </div>`;
    }
    )}
}