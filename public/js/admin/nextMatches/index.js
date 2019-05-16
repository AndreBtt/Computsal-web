function displayConfirmModal() {
    document.getElementById('generateMatches').click();
}

function generateMatches() {

    $.ajax({
        url: '/admin/proximosJogos',
        type: 'POST',
        data: {
            type : "generate"
        },
        success: function(result) {
            let response = JSON.parse(result)
            if(response.status === "success") {
                let h2 = document.createElement("h2")
                h2.innerHTML = "Parabens!"
                document.getElementById("modaltext").appendChild(h2)

                let h3 = document.createElement("h3")
                h3.innerHTML = "O jogo foi criado com sucesso !"
                document.getElementById("modaltext").appendChild(h3)

                document.getElementById('sendClick').click();

                $("#resultModal").css("display", "block");
            } else {
                let h2 = document.createElement("h2")
                h2.innerHTML = "Oppss"
                document.getElementById("modaltext").appendChild(h2)

                let h3 = document.createElement("h3")
                h3.innerHTML = "Não conseguimos criar o jogo, tente novamente mais tarde."
                document.getElementById("modaltext").appendChild(h3)

                document.getElementById('sendClick').click();

                $("#resultModal").css("display", "block");
            }
        }
    });
}