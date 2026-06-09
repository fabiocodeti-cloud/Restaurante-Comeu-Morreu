let reservas =
  JSON.parse(localStorage.getItem("reservas")) || []

  let filaEspera =
  JSON.parse(localStorage.getItem("filaEspera")) || []

function salvarLocalStorage() {

  localStorage.setItem(
    "reservas",
    JSON.stringify(reservas)
  )
}

function salvarFilaEspera() {

  localStorage.setItem(
    "filaEspera",
    JSON.stringify(filaEspera)
  )

}

function limparReservas() {

  if (
    confirm("Deseja apagar todas as reservas?")
  ) {

    reservas = []

    salvarLocalStorage()

    renderizarAgenda()

    renderizarReservas()

  }

}