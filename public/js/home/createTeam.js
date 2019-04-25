// captain
let players = 1

$(document).ready(function() {
    
    $("#send").click(function () {

        let captain = $("#captain").val().trim()
        let name = $("#teamName").val().trim()
        let email = $("#email").val().trim()

        let playersName = []

        for(let i = 1; i < players; i++) {
            let id = "#player" + i
            let name = $(id).val().trim()
            if(name.length == 0) continue
            playersName.push(name)
        }

        let teamObj = {}
        teamObj.captain = captain
        teamObj.name = name
        teamObj.email = email
        teamObj.players = playersName

        $.ajax({
            url: '/criarTime',
            type: 'POST',
            data: teamObj,
            success: function(result) {
                console.log("time criado!")
                // JOGA NA TELA QUE DEU CERTO QUANDO ELE CLICAR MANDA PRA PROXIMA PAG
                // window.location.href='/admin';
            }
        });

    });

})

function createPlayer() {
    // can't have more than 15 players
    if(players == 15) return

    var div = document.createElement("div")
    div.classList.add("group")
    div.classList.add("wow")
    div.classList.add("fadeIn")
    div.setAttribute('data-wow-delay', '.1s')

    var input = document.createElement("input")
    input.classList.add("text-center")
    input.type = "text"
    input.placeholder = "Jogador"
    input.id = "player" + players
    input.setAttribute("pattern","[A-Za-z]+")
    input.setAttribute("autocomplete","off")
    div.appendChild(input)

    var bar = document.createElement("div")
    bar.classList.add("bar")
    div.appendChild(bar)

    document.getElementById("players").appendChild(div)
    players++
}

