const mesas = [1, 2, 3, 4]

const horarios = [
  "19:00",
  "20:00",
  "21:00",
  "22:00"
]

const agendaBody =
  document.getElementById("agendaBody")

const dataInput =
  document.getElementById("data")

// Data atual

const hoje = new Date()
  .toISOString()
  .split("T")[0]

dataInput.value = hoje

// Renderizar agenda

function renderizarAgenda() {

  agendaBody.innerHTML = ""

  const dataSelecionada =
    dataInput.value

  horarios.forEach(horario => {

    const tr =
      document.createElement("tr")

    const tdHorario =
      document.createElement("td")

    tdHorario.textContent =
      horario

    tdHorario.classList.add("horario")

    tr.appendChild(tdHorario)

    mesas.forEach(mesa => {

      const td =
        document.createElement("td")

      const reserva =
        reservas.find(r =>

          r.data === dataSelecionada &&
          r.horario === horario &&
          r.mesa == mesa &&
          r.status !== "Cancelada" &&
          r.status !== "Finalizada"

        )

      if (reserva) {

        td.classList.add("reservada")

        td.innerHTML = `
          <div>
            <strong>${reserva.nome}</strong>
            <br>

            <small>
              ${reserva.pessoas} pessoas
            </small>

            <br>

            <small>
              ${reserva.status}
            </small>
          </div>
        `
        td.onclick = () =>
    entrarFilaEspera(horario)

      } else {

        td.classList.add("livre")

        td.innerHTML = `
          Livre
        `

        td.onclick = () =>
          abrirModal(mesa, horario)

      }

      tr.appendChild(td)

    })

    agendaBody.appendChild(tr)

  })

}

// Modal

const modal =
  new bootstrap.Modal(
    document.getElementById("modalReserva")
  )

function abrirModal(mesa, horario) {

  document.getElementById(
    "mesaSelecionada"
  ).value = mesa

  document.getElementById(
    "horarioSelecionado"
  ).value = horario

  modal.show()

}

// Salvar reserva

document
  .getElementById("formReserva")
  .addEventListener("submit", salvarReserva)

function salvarReserva(event) {

  event.preventDefault()

  const reserva = {

    id: Date.now(),

    nome:
      document.getElementById("nome").value,

    telefone:
      document.getElementById("telefone").value,

    pessoas:
      document.getElementById("pessoas").value,

    mesa:
      document.getElementById("mesaSelecionada").value,

    horario:
      document.getElementById("horarioSelecionado").value,

    data:
      dataInput.value,

    status: "Reservada"

  }

  reservas.push(reserva)

  salvarLocalStorage()

  renderizarAgenda()
  
  document
    .getElementById("formReserva")
    .reset()

  modal.hide()

}
// Alterar data

dataInput.addEventListener(
  "change",
  renderizarAgenda
)

renderizarAgenda()

document
  .getElementById("formReserva")
  .addEventListener("submit", () => {

    setTimeout(() => {

      renderizarReservas()

    }, 100)

  })

  function entrarFilaEspera(horario) {

  const nome =
    prompt("Nome do cliente:")

  if (!nome) return

  const pessoas =
    prompt("Quantidade de pessoas:")

  if (!pessoas) return

  filaEspera.push({

    id: Date.now(),

    nome,

    pessoas,

    horario,

    status: "Aguardando"

  })

  salvarFilaEspera()

  renderizarFilaEspera()

}