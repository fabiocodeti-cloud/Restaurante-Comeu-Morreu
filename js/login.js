document
  .getElementById("formLogin")
  .addEventListener("submit", function(event) {

    event.preventDefault()

    const usuario =
      document.getElementById("usuario").value

    const senha =
      document.getElementById("senha").value

    if (
      usuario === "admin" &&
      senha === "1234"
    ) {

      window.location.href =
        "admin.html"

    } else {

      alert("Login inválido")

    }

  });