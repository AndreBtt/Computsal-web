let updateTeamID
let selectedTeamUpdate
let selectedTeamOpposing

let updateTimeID
let selectedTimeID
let selectedTimeUpdate

$(document).ready(function() {
    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            $("#myDropdown").hide(500);
        }
        if (!event.target.matches('.dropbtnTime')) {
            $("#myDropdownTime").hide(500);
        }
    }
})

function send() {
    let obj = {}
    obj.matches = []

    let matchSection = document.getElementById("matches").getElementsByTagName("span")

    for(let i = 0; i < matchSection.length; i+=3) {
        let team1 = matchSection[i].innerHTML.trim()

        let time = matchSection[i+1].innerHTML.trim()

        let matchID = matchSection[i+1].id.substring(4)
        let timeID = $("#time" + matchID + "ID").text()
        
        let team2 = matchSection[i+2].innerHTML.trim()

        if(team1 == "-" || team2 == "-" || time == "-") {
            $("#warningTextSend").text("*Existem campos não preenchidos")
            $("#warningTextSend").show()
            return
        }
        
        let p = {
            id : matchID,
            team1 : team1,
            team2 : team2,
            type  : 0,
            time  : timeID
        }

        obj["matches"].push(p)
    }

    $.ajax({
        url: '/admin/proximosJogos/atualizar',
        type: 'PUT',
        data: obj,
        success: function(result) {
            let response = JSON.parse(result)
            if(response.status === "success") {
                let h2 = document.createElement("h2")
                h2.innerHTML = "Parabens!"
                document.getElementById("modaltext").appendChild(h2)

                let h3 = document.createElement("h3")
                h3.innerHTML = "Os jogos foram atualizados com sucesso !"
                document.getElementById("modaltext").appendChild(h3)

                document.getElementById('sendClick').click();
                
                $("#resultModal").css("display", "block");
            } else {
                let h2 = document.createElement("h2")
                h2.innerHTML = "Oppss"
                document.getElementById("modaltext").appendChild(h2)

                let h3 = document.createElement("h3")
                h3.innerHTML = "Não conseguimos atualizar os jogos, tente novamente mais tarde."
                document.getElementById("modaltext").appendChild(h3)

                document.getElementById('sendClick').click();

                $("#resultModal").css("display", "block");
            }
        }
    });

}

function dropDown() {
    if($("#myDropdown").is(":hidden")){
        $("#myDropdown").show(500);
    } else {
        $("#myDropdown").hide(500);
    }
}

function updateTeam(teamID, opposingID) {
    updateTeamID = teamID
    selectedTeamUpdate = $("#" + teamID).text()
    selectedTeamOpposing = $("#" + opposingID).text()
    $("#opposingTeam").text(selectedTeamOpposing)
    
    // reset options
    $("#currTeam").text("")
    $("#warningText").hide()
    $("#warningTextSend").hide()
    
    document.getElementById('updateTeam').click();
}

function updateTable() {
    let teamSelected = $("#currTeam").text()
    if(teamSelected == "") {
        $("#warningText").text("*Escolha um time")
        $("#warningText").show()
        return
    }

    if(teamSelected == selectedTeamOpposing) {
        $("#warningText").text("*Time invalido")
        $("#warningText").show()
        return
    }

    let matchSection = document.getElementById("matches").getElementsByTagName("span")

    for(let i = 0; i < matchSection.length; i+=3) {
        if(matchSection[i].innerHTML.trim() == teamSelected.trim()) {
            matchSection[i].innerHTML = "-"
            break
        }
        if(matchSection[i+2].innerHTML.trim() == teamSelected.trim()) {
            matchSection[i+2].innerHTML = "-"
            break
        }
    }

    $("#" + updateTeamID).text(teamSelected)
    document.getElementById('updateTeam').click();
}

function updateCurrTeam(teamName) {
    $("#currTeam").text(teamName)
}

function dropDownTime() {
    if($("#myDropdownTime").is(":hidden")){
        $("#myDropdownTime").show(500);
    } else {
        $("#myDropdownTime").hide(500);
    }
}

function updateTime(timeID, matchID) {
    selectedTimeUpdate = $("#" + timeID).text()
    let team1 = $("#team1" + matchID).text()
    let team2 = $("#team2" + matchID).text()
    $("#matchTimeTeam1").text(team1)
    $("#matchTimeTeam2").text(team2)

    updateTimeID = timeID

    // reset options
    $("#currTime").text("")
    $("#warningTextTime").hide()
    $("#warningTextSend").hide()

    document.getElementById('updateTime').click();
}

function updateTableTime() {
    let timeSelected = $("#currTime").text()
    if(timeSelected == "") {
        $("#warningTextTime").text("*Escolha um horário")
        $("#warningTextTime").show()
        return
    }

    let matchSection = document.getElementById("matches").getElementsByTagName("span")

    for(let i = 0; i < matchSection.length; i+=3) {
        if(matchSection[i+1].innerHTML.trim() == timeSelected.trim()) {
            matchSection[i+1].innerHTML = "-"
            break
        }
    }

    $("#" + updateTimeID).text(timeSelected)
    $("#" + updateTimeID + "ID").text(selectedTimeID)
    document.getElementById('updateTime').click();
}

function updateCurrTime(time, id) {
    $("#currTime").text(time)
    selectedTimeID = id
}