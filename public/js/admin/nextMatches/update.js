let changeTeamID
let selectedTeamUpdate
let selectedTeamOpposing

$(document).ready(function() {
    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            $("#myDropdown").hide(500);
        }
    }

})

function dropDown() {
    if($("#myDropdown").is(":hidden")){
        $("#myDropdown").show(500);
    } else {
        $("#myDropdown").hide(500);
    }
}

function updateTeam(teamID, opposingID) {
    changeTeamID = teamID
    selectedTeamUpdate = $("#" + teamID).text()
    selectedTeamOpposing = $("#" + opposingID).text()
    $("#opposingTeam").text(selectedTeamOpposing)
    
    // reset options
    $("#currTeam").text("")
    
    document.getElementById('updateTeam').click();
}

function updateTable() {
    let teamSelected = $("#currTeam").text()
    if(teamSelected == "") {
        // pode nao
        return;
    }

    let teamsSection = document.getElementById("matches").getElementsByTagName("span")

    for(let i = 0; i < teamsSection.length; i+=3) {
        if(teamsSection[i].innerHTML.trim() == teamSelected.trim()) {
            teamsSection[i].innerHTML = "-"
            break;
        }
        if(teamsSection[i+2].innerHTML.trim() == teamSelected.trim()) {
            teamsSection[i+2].innerHTML = "-"
            break;
        }
    }

    $("#" + changeTeamID).text(teamSelected)
    document.getElementById('updateTeam').click();
}

function updateCurrTeam(teamName) {
    $("#currTeam").text(teamName)
}