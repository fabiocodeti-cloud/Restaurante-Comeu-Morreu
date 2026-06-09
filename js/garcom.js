const listaReservas =
  document.getElementById("listaReservas")

renderizarReservas()

// Renderizar reservas

function renderizarReservas() {

  listaReservas.innerHTML = ""

  const dataSelecionada = document.getElementById("data").value

  const reservasFiltradas = reservas.filter(reserva =>

    reserva.data === dataSelecionada &&
    reserva.status !== "Finalizada" &&
    reserva.status !== "Cancelada"
  )
    .sort((a, b) =>
      a.horario.localeCompare(b.horario)
    )

  if (reservasFiltradas.length === 0) {

    listaReservas.innerHTML = `
      <tr>
        <td colspan="6" class="text-center">
          Nenhuma reserva encontrada
        </td>
      </tr>
    `

    return

  }

  reservasFiltradas.forEach(reserva => {

    let badge = ""

    if (reserva.status === "Reservada") {

      badge =
        `<span class="badge bg-warning text-dark">
          Reservada
        </span>`

    }

    if (reserva.status === "Ocupada") {

      badge =
        `<span class="badge bg-success">
          Ocupada
        </span>`

    }

    if (reserva.status === "Finalizada") {

      badge =
        `<span class="badge bg-secondary">
          Finalizada
        </span>`

    }

    if (reserva.status === "Cancelada") {

      badge =
        `<span class="badge bg-danger">
          Cancelada
        </span>`

    }

    listaReservas.innerHTML += `

      <tr>

        <td>
          ${reserva.nome}
        </td>

        <td>
          Mesa ${reserva.mesa}
        </td>

        <td>
          ${reserva.horario}
        </td>

        <td>
          ${reserva.pessoas}
        </td>

        <td>
          ${badge}
        </td>

        <td>

          <div class="d-flex gap-2">

            <button
              class="btn btn-success btn-sm"
              onclick="alterarStatus(${reserva.id}, 'Ocupada')"
            >
              Chegou
            </button>

            <button
              class="btn btn-secondary btn-sm"
              onclick="alterarStatus(${reserva.id}, 'Finalizada')"
            >
              Finalizar
            </button>

            <button
              class="btn btn-danger btn-sm"
              onclick="alterarStatus(${reserva.id}, 'Cancelada')"
            >
              Cancelar
            </button>

          </div>

        </td>

      </tr>

    `

  })

}

// Alterar status

function alterarStatus(id, novoStatus) {

  const reserva =
    reservas.find(r => r.id === id)

  if (!reserva) return

  reserva.status = novoStatus

  salvarLocalStorage()

  renderizarReservas()

  renderizarAgenda()

}

window.renderizarReservas = renderizarReservas

const listaEspera =
  document.getElementById("listaEspera")

function renderizarFilaEspera() {

  listaEspera.innerHTML = ""

  if (filaEspera.length === 0) {

    listaEspera.innerHTML = `
      <tr>
        <td colspan="4" class="text-center">
          Nenhum cliente na fila
        </td>
      </tr>
    `

    return

  }

  filaEspera.forEach(cliente => {

    listaEspera.innerHTML += `

      <tr>

        <td>${cliente.nome}</td>

        <td>${cliente.pessoas}</td>

        <td>${cliente.horario}</td>

        <td>

          <div class="d-flex gap-2">

          <span class="badge bg-warning text-dark">
            ${cliente.status}
          </span>

          <button
            class="btn btn-success btn-sm"
            onclick="alocarMesa(${cliente.id})"
          >
            Alocar
          </button>

          </div>

        </td>

      </tr>

    `

  })

}

renderizarFilaEspera()

function alocarMesa(idCliente) {

  const cliente =
    filaEspera.find(c => c.id === idCliente)

  if (!cliente) return

  const mesa =
    prompt("Número da mesa disponível:")

  if (!mesa) return

  const reserva = {

    id: Date.now(),

    nome: cliente.nome,

    telefone: "-",

    pessoas: cliente.pessoas,

    mesa: mesa,

    horario: cliente.horario,

    data:
      document.getElementById("data").value,

    status: "Reservada"

  }

  const mesaOcupada =
  reservas.find(r =>

    r.data === document.getElementById("data").value &&
    r.horario === cliente.horario &&
    r.mesa == mesa &&
    r.status !== "Cancelada" &&
    r.status !== "Finalizada"

  )

if (mesaOcupada) {

  alert("Mesa já está ocupada.")

  return

}

  reservas.push(reserva)

  salvarLocalStorage()

  filaEspera =
    filaEspera.filter(c =>
      c.id !== idCliente
    )

  salvarFilaEspera()

  renderizarAgenda()

  renderizarReservas()

  renderizarFilaEspera()

}