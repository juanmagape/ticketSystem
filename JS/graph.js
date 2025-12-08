fetch('../JSON/tickets.json')
  .then(response => response.json())
  .then(data => {
    console.log("Tickets cargados:", data);
    generarGraph(data);
  })
  .catch(err => console.error("Error:", err));


function generarGraph(data) {
    const completado = data.filter(t => t.estado === "Completado").length;
    const pendiente = data.filter(t => t.estado === "Pendiente").length;
    const enprogreso = data.filter(t => t.estado === "En progreso").length;

    var xValues = [`Completado`, "Pendiente", "En progreso"];
    var yValues = [completado, pendiente, enprogreso];
    
    var barColors = [
      "#CAA8F5",
      "#99EDCC",
      "#004aad"
    ];

    new Chart("myChart", {
      type: "doughnut",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
        title: {
          display: true,
          text: "Estado de los tickets"
        }
      }
    });
}
