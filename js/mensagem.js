document
    .querySelector(".form-contato")
    .addEventListener("submit", function(event){
        event.preventDefault();
        alert("Mensagem enviada com sucesso");
        this.reset();
    });