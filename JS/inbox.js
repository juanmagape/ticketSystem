const inbox = document.getElementById("inbox");
const graph = document.getElementById("myChart");
const cont  = document.getElementById("content");

fetch('../JSON/tickets.json')
  .then(response => response.json())
  .then(data => {
    console.log("Tickets cargados:", data);
    inboxShow(data);
  })
  .catch(error => console.error("Error cargando JSON:", error));
  

function inboxShow(data) {
    const urlParams = new URLSearchParams(window.location.search);
    const currentLink = urlParams.get('link');

    if (currentLink !== "Inbox") {
        return;
    }

    cont.style.display = 'none';
    graph.style.display = 'none';
    
    inbox.innerHTML = `  
    <thead>
    <tr>
      <th class="border">ID</th>
      <th class="border">Asunto</th>
      <th class="border">Fecha</th>
      <th>Estado</th>
    </tr>
    </thead>`;

    const ticketsFiltrados = data.filter(ticket => 
        ticket.estado === "Pendiente" || ticket.estado === "En progreso"
    );

    if (ticketsFiltrados.length > 0) {
        ticketsFiltrados.forEach(ticket => {
            inbox.innerHTML += `
            <tr>
                <td class="border"><a href="?ticket=${ticket.id}" class="idlink">${ticket.id}</a></td>
                <td class="border">${ticket.asunto}</td>
                <td class="border">${ticket.fecha_apertura}</td>
                <td>${ticket.estado}</td>
            </tr>`;
        });
    } else {
        inbox.innerHTML += `<tr><td colspan="4">No hay tickets pendientes o en progreso</td></tr>`;
    }
}