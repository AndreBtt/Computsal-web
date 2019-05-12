let playerSelectedID
let teamSelectedName
let team1
let team2

$(document).ready(function() {

    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            $("#myDropdown").hide(500);
        }
    }

    $("#action").click(function () {
        
        // set default config
        $("#warningText").hide()
        $("#currPlayer").text("")
        $("#teamOptions").hide()
        $("#team1Selected").css("color", "")
        $("#team2Selected").css("color", "")
        $("#team1Players").hide()
        $("#team2Players").hide()
        $("#inputGoal").val("")
        $("#inputYellow").val("")
        $("#inputRed").val("")

        document.getElementById('addAction').click();
    })

    team1 = $("#team1Selected").text()
    team2 = $("#team2Selected").text()
})

function dropDown() {
    if($("#myDropdown").is(":hidden")){
        $("#myDropdown").show(500);
    } else {
        $("#myDropdown").hide(500);
    }
}

function displayModalTeam(id) {

    // back to default
    $("#warningText").hide()
    $("#currPlayer").text("")
    $("#team1Selected").css("color", "")
    $("#team2Selected").css("color", "")
    $("#team1Players").hide()
    $("#team2Players").hide()
    $("#inputGoal").val("")
    $("#inputYellow").val("")
    $("#inputRed").val("")

    if($("#teamOptions").is(":hidden")) {
        $("#teamOptions").show(500)
    }

    if(id == 1) {
        teamSelectedName = team1
        $("#team1Selected").css("color", "#43b699")
        $("#team1Players").show()
    } else {
        teamSelectedName = team2
        $("#team2Selected").css("color", "#43b699")
        $("#team2Players").show()
    }
}

function updateCurrPlayer(player, id) {
    $("#currPlayer").text(player)
    playerSelectedID = id
}

function updateTable() {
    let player = $("#currPlayer").text()

    if(player == "") {
        $("#warningText").text("*Escolha um jogador")
        $("#warningText").show()
        return
    }

    let goals = $("#inputGoal").val()
    let yellow = $("#inputYellow").val()
    let red = $("#inputRed").val()

    if(goals == "" && yellow == "" && red == "") {
        $("#warningText").text("*Nenhum campo de ação selecionado")
        $("#warningText").show()
        return
    }

    if(document.getElementById(playerSelectedID) == null) {
        // this player does not exist yet

        let divRanking = document.createElement("div")
        divRanking.classList.add("ranking")
        divRanking.id = playerSelectedID

        let divPlayer = document.createElement("div")
        divPlayer.classList.add("col-lg-4")
        divPlayer.classList.add("col-md-4")
        divPlayer.classList.add("col-xs-4")
        divPlayer.innerText = player

        let divTeam = document.createElement("div")
        divTeam.classList.add("col-lg-4")
        divTeam.classList.add("col-md-4")
        divTeam.classList.add("col-xs-4")
        divTeam.innerText = teamSelectedName

        let divGoals = document.createElement("div")
        divGoals.classList.add("col-lg-1")
        divGoals.classList.add("col-md-1")
        divGoals.classList.add("col-xs-1")
        divGoals.innerText = goals == "" ? 0 : goals

        let divYellow = document.createElement("div")
        divYellow.classList.add("col-lg-1")
        divYellow.classList.add("col-md-1")
        divYellow.classList.add("col-xs-1")
        divYellow.innerText = yellow == "" ? 0 : yellow

        let divRed = document.createElement("div")
        divRed.classList.add("col-lg-1")
        divRed.classList.add("col-md-1")
        divRed.classList.add("col-xs-1")
        divRed.innerText = red == "" ? 0 : red 

        let divDelete = document.createElement("div")
        divDelete.classList.add("col-lg-1")
        divDelete.classList.add("col-md-1")
        divDelete.classList.add("col-xs-1")
        divDelete.setAttribute("style", "margin-bottom: 10px;")

        let img = document.createElement("img")
        img.classList.add("icon")
        img.classList.add("deleteButton")
        img.setAttribute("src", "/img/icons/delete.png")
        img.setAttribute('onclick','deletePlayer(' + playerSelectedID + ');')
        divDelete.appendChild(img)

        divRanking.appendChild(divPlayer)
        divRanking.appendChild(divTeam)
        divRanking.appendChild(divGoals)
        divRanking.appendChild(divYellow)
        divRanking.appendChild(divRed)
        divRanking.appendChild(divDelete)

        document.getElementById("playersTable").appendChild(divRanking)

    } else {
        // this player already exists
        

    }
}

function deletePlayer(id) {
    $('#' + id).hide('slow', function(){ $('#' + id).remove(); });
}