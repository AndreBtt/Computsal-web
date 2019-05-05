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
        $("#team1Selected").css("color", "#43b699")
        $("#team1Players").show()
    } else {
        $("#team2Selected").css("color", "#43b699")
        $("#team2Players").show()
    }
}

function updateCurrPlayer(player) {
    $("#currPlayer").text(player)
}

function updateTable() {
    let player = $("#currPlayer").text()

    if(player == "") {
        $("#warningText").text("*Escolha um jogador")
        $("#warningText").show()
        return
    }

    console.log(player)
}