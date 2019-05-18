let players

let newPlayers = 1

let InitialTeam = {}
let UpdatedTeam = {}
let CreatedPlayers = {}
let DeletedPlayers = []

$(document).ready(function() {
    
    getInitTeam()

    $("#send").click(function () {
        
        getUpdatedTeam()

        if(UpdatedTeam.name.length === 0) {
            $("#teamRequire").css("display", "block");
            return
        } else {
            $("#teamRequire").css("display", "none");
        }

        if(UpdatedTeam.captain.length === 0) {
            $("#captainRequire").css("display", "block");
            return
        } else {
            $("#captainRequire").css("display", "none");
        }

        let teamID = $("#teamID").val()
        let captainID = $("#captainID").val()

        let TeamUpdateObj = {
            "id" :      teamID,
            "name" :    UpdatedTeam.name,
            "photo":    "www",
            "players": []
        }

        let missingPlayers = false

        for(var j in UpdatedTeam.players){
            var sub_key = j
            var sub_val = UpdatedTeam.players[j].trim()

            let requireID = "#playerRequire" + sub_key
            if(sub_val.length === 0) {
                $(requireID).css("display", "block")
                missingPlayers = true
            } else {
                $(requireID).css("display", "none");
            }

            if(InitialTeam.players[sub_key].trim() !== sub_val) {
                let p = {}
                p.id = sub_key
                p.name = sub_val
                TeamUpdateObj.players.push(p)
            }
        }

        if(missingPlayers) {
            return
        }

        if(InitialTeam.captain !== UpdatedTeam.captain) {
            let p = {}
            p.id = captainID
            p.name = UpdatedTeam.captain
            TeamUpdateObj.players.push(p)
        }

        let playersDeletedObj = []

        for(let i = 0; i < DeletedPlayers.length; i++) {
            let p = {}
            p.id = DeletedPlayers[i]
            playersDeletedObj.push(p)
        }

        TeamUpdateObj.deletedPlayers = playersDeletedObj
        TeamUpdateObj.newPlayers = getNewPlayers()

        $.ajax({
            url: '/atualizarTime',
            type: 'PUT',
            data: TeamUpdateObj,
            success: function(result) {
                let response = JSON.parse(result)
                if(response.status === "success") {
                    let h2 = document.createElement("h2")
                    h2.innerHTML = "Parabens!"
                    document.getElementById("modaltext").appendChild(h2)

                    let h3 = document.createElement("h3")
                    h3.innerHTML = "Seu time foi atualizado com sucesso !"
                    document.getElementById("modaltext").appendChild(h3)

                    document.getElementById('sendClick').click();
                    
                    $("#resultModal").css("display", "block");
                } else {
                    let h2 = document.createElement("h2")
                    h2.innerHTML = "Oppss"
                    document.getElementById("modaltext").appendChild(h2)

                    let h3 = document.createElement("h3")
                    h3.innerHTML = "Não conseguimos atualizar seu time, tente novamente mais tarde."
                    document.getElementById("modaltext").appendChild(h3)

                    document.getElementById('sendClick').click();

                    $("#resultModal").css("display", "block");
                }
            }
        });
    });

    $("#deleteWarning").click(function () {
        document.getElementById('deleteWarningClick').click();
    })

    $("#delete").click(function () {
        $("#confirmModal").css("display", "none");
    
        let teamID = $("#teamID").val().trim() 

        $.ajax({
            url: '/atualizarTime',
            type: 'DELETE',
            data: {
                "id" : teamID
            },
            success: function(result) {
                let response = JSON.parse(result)
                if(response.status === "success") {
                    let h2 = document.createElement("h2")
                    h2.innerHTML = "Parabens!"
                    document.getElementById("modaltext").appendChild(h2)

                    let h3 = document.createElement("h3")
                    h3.innerHTML = "Seu time foi deletado com sucesso !"
                    document.getElementById("modaltext").appendChild(h3)

                    document.getElementById('sendClick').click();
                    
                    $("#resultModal").css("display", "block");
                } else {
                    let h2 = document.createElement("h2")
                    h2.innerHTML = "Oppss"
                    document.getElementById("modaltext").appendChild(h2)

                    let h3 = document.createElement("h3")
                    h3.innerHTML = "Não conseguimos deletar seu time, tente novamente mais tarde."
                    document.getElementById("modaltext").appendChild(h3)

                    document.getElementById('sendClick').click();

                    $("#resultModal").css("display", "block");
                }
            }
        });

    })

})

function getNewPlayers() {

    let p = []

    for(var j in CreatedPlayers){
        var sub_key = j
        let playerName = $("#" + sub_key).val().trim()
        if(playerName.length === 0) continue
        p.push(playerName)
    }

    return p
}

function getInitTeam() {
    let playerSection = document.getElementById("players").getElementsByTagName("main")
    players = playerSection.length + 1

    InitialTeam.players = {}

    for(let i = 0; i < playerSection.length; i++) {
        playerID = playerSection[i].getElementsByTagName("input").item(0).id
        playerName = playerSection[i].getElementsByTagName("input").item(0).value.trim()
        InitialTeam.players[playerID] = playerName
    }

    InitialTeam.captain = $("#captain").val().trim()
    InitialTeam.name = $("#teamName").val().trim()
}

function getUpdatedTeam() {
    let playerSection = document.getElementById("players").getElementsByTagName("main")

    UpdatedTeam.players = {}

    for(let i = 0; i < playerSection.length; i++) {
        if(playerSection[i].style.display === "none") {
            continue
        }
        playerID = playerSection[i].getElementsByTagName("input").item(0).id
        // it's a new player
        if(playerID[0] === 'n') continue
        playerName = playerSection[i].getElementsByTagName("input").item(0).value.trim()
        UpdatedTeam.players[playerID] = playerName
    }

    UpdatedTeam.captain = $("#captain").val().trim()
    UpdatedTeam.name = $("#teamName").val().trim()
}

function deletePlayer(IDnumber) {
    delete InitialTeam.players[IDnumber]
    DeletedPlayers.push(IDnumber)
    players--
    $("#main" + IDnumber).hide('slow')
}

function deleteNewPlayer(IDnumber) {
    delete CreatedPlayers[IDnumber]
    players--
    $("#main" + IDnumber).hide('slow')
}

function createPlayer() {
    // can't have more than 15 players
    if(players == 15) return

    let main = document.createElement("main")
    main.id = "mainnewplayer" + newPlayers

    let div = document.createElement("div")
    div.classList.add("col-lg-10")
    div.classList.add("col-md-10")
    div.classList.add("col-xs-10")

    let div2 = document.createElement("div")
    div2.classList.add("group")

    let input = document.createElement("input")
    input.classList.add("text-center")
    input.type = "text"
    input.placeholder = "Jogador"
    input.id = "newplayer" + newPlayers
    input.setAttribute("pattern","[A-Za-z]+")
    input.setAttribute("autocomplete","off")
    div2.appendChild(input)

    let bar = document.createElement("div")
    bar.classList.add("bar")
    div2.appendChild(bar)

    div.appendChild(div2)

    let divImg = document.createElement("div")
    divImg.classList.add("col-lg-2")
    divImg.classList.add("col-md-2")
    divImg.classList.add("col-xs-2")

    let img = document.createElement("img")
    img.setAttribute("onclick","deleteNewPlayer('" + input.id + "')")
    img.setAttribute("src","/img/icons/delete.png")
    img.classList.add("deleteButton")

    divImg.appendChild(img)
    main.appendChild(div)
    main.appendChild(divImg)

    document.getElementById("players").appendChild(main)
    players++
    newPlayers++
    CreatedPlayers[input.id] = ""
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();
        };

        reader.readAsDataURL(input.files[0]);
    }
}  