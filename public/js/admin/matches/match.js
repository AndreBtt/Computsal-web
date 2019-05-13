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

    $("#send").click(function() {
        // let players = document.getElementById("playersTable").getElementsByTagName("main")

    })

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

    // player exists, update goals, yellow and red card
    if(document.getElementById(playerSelectedID) != null) {
        let goals = parseInt($("#goals" + playerSelectedID).text(),10)
        let yellow = parseInt($("#yellow" + playerSelectedID).text(),10)
        let red = parseInt($("#red" + playerSelectedID).text(),10)

        $("#inputGoal").val(goals)
        $("#inputYellow").val(yellow)
        $("#inputRed").val(red)
    }
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
        $("#warningText").text("*Nenhum campo de ação preenchido")
        $("#warningText").show()
        return
    }

    if(document.getElementById(playerSelectedID) == null) {
        // this player does not exist yet

        let mainRaking = document.createElement("main")
        mainRaking.classList.add("ranking")
        mainRaking.id = playerSelectedID

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
        divGoals.id = "goals" + playerSelectedID
        divGoals.innerText = goals == "" ? 0 : goals

        let divYellow = document.createElement("div")
        divYellow.classList.add("col-lg-1")
        divYellow.classList.add("col-md-1")
        divYellow.classList.add("col-xs-1")
        divYellow.id = "yellow" + playerSelectedID
        divYellow.innerText = yellow == "" ? 0 : yellow

        let divRed = document.createElement("div")
        divRed.classList.add("col-lg-1")
        divRed.classList.add("col-md-1")
        divRed.classList.add("col-xs-1")
        divRed.id = "red" + playerSelectedID
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

        mainRaking.appendChild(divPlayer)
        mainRaking.appendChild(divTeam)
        mainRaking.appendChild(divGoals)
        mainRaking.appendChild(divYellow)
        mainRaking.appendChild(divRed)
        mainRaking.appendChild(divDelete)

        document.getElementById("playersTable").appendChild(mainRaking)

    } else {
        // this player already exists
        $("#goals" + playerSelectedID).text(goals == "" ? 0 : goals)
        $("#yellow" + playerSelectedID).text(yellow == "" ? 0 : yellow)
        $("#red" + playerSelectedID).text(red == "" ? 0 : red)
    }

    document.getElementById('addAction').click();
}

function deletePlayer(id) {    
    $('#' + id).hide('slow', function(){ $('#' + id).remove(); });
}

function updateInput(type, id) {
    if(type == 'sub') {
        let prevValue = $("#" + id).val()
        if(prevValue == "") {
            prevValue = 0
        } else {
            prevValue = parseInt($("#" + id).val(),10)
        }
        if(prevValue == 0) return
        $("#" + id).val( prevValue-1)
    } else {
        let prevValue = $("#" + id).val()
        if(prevValue == "") {
            prevValue = 0
        } else {
            prevValue = parseInt($("#" + id).val(),10)
        }
        $("#" + id).val( prevValue+1)
    }
}