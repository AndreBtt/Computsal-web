// initial teams in the list
let initialTeamsID = []

// teams that I can put in dropdown list
let availableTeams = []

$(document).ready(function() {
    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn')) {
            $("#myDropdown").hide(500);
        }
    }

    initialTeamsID = getTeams()
    getAvailableTeams()

    $("#send").click(function () {

        let currentTeams = getTeams()

        let deleteTeams = getDif(initialTeamsID, currentTeams)
        let addTeams = getDif(currentTeams, initialTeamsID)
        
        let obj = {
            "teams" : [],
        }

        for(let i = 0; i < addTeams.length; i++) {
            let t = {
                "id" : addTeams[i],
                "action" : 1
            }
            obj["teams"].push(t)
        }

        for(let i = 0; i < deleteTeams.length; i++) {
            let t = {
                "id" : deleteTeams[i],
                "action" : 0
            }
            obj["teams"].push(t)
        }

        obj.groupNumber = $("#groupNumber").val()

        $.ajax({
            url: 'admin/grupo',
            type: 'PUT',
            data: obj,
            success: function(result) {
                let response = JSON.parse(result)
                if(response.status === "success") {
                    let h2 = document.createElement("h2")
                    h2.innerHTML = "Parabens!"
                    document.getElementById("modaltext").appendChild(h2)

                    let h3 = document.createElement("h3")
                    h3.innerHTML = "O grupo foi atualizado com sucesso !"
                    document.getElementById("modaltext").appendChild(h3)

                    document.getElementById('sendClick').click();
                    
                    $("#resultModal").css("display", "block");
                } else {
                    let h2 = document.createElement("h2")
                    h2.innerHTML = "Oppss"
                    document.getElementById("modaltext").appendChild(h2)

                    let h3 = document.createElement("h3")
                    h3.innerHTML = "Não conseguimos atualizar o grupo, tente novamente mais tarde."
                    document.getElementById("modaltext").appendChild(h3)

                    document.getElementById('sendClick').click();

                    $("#resultModal").css("display", "block");
                }
            }
        });

    })

    $("#deleteWarning").click(function () {
        document.getElementById('deleteWarningClick').click();
    })

    $("#delete").click(function () {
        $("#confirmModal").css("display", "none");

        let groupNumber = $("#groupNumber").val()

        $.ajax({
            url: 'admin/grupo',
            type: 'DELETE',
            data: {
                "groupNumber" : groupNumber
            },
            success: function(result) {
                let response = JSON.parse(result)
                if(response.status === "success") {
                    let h2 = document.createElement("h2")
                    h2.innerHTML = "Parabens!"
                    document.getElementById("modaltext").appendChild(h2)

                    let h3 = document.createElement("h3")
                    h3.innerHTML = "O grupo foi deletado com sucesso !"
                    document.getElementById("modaltext").appendChild(h3)

                    document.getElementById('sendClick').click();
                    
                    $("#resultModal").css("display", "block");
                } else {
                    let h2 = document.createElement("h2")
                    h2.innerHTML = "Oppss"
                    document.getElementById("modaltext").appendChild(h2)

                    let h3 = document.createElement("h3")
                    h3.innerHTML = "Não conseguimos deletar o grupo, tente novamente mais tarde."
                    document.getElementById("modaltext").appendChild(h3)

                    document.getElementById('sendClick').click();

                    $("#resultModal").css("display", "block");
                }
            }
        });
    })
})

function getAvailableTeams() {
    let teamsID = $("#allTeamsID").val()
    let teamsName = $("#allTeamsName").val()

    if(teamsID === undefined) return

    teamsID = teamsID.split(",")
    teamsName = teamsName.split(",")

    for(let i = 0; i < teamsID.length; i++) {
        var t = {
            "id" : teamsID[i],
            "name" : teamsName[i],
            "available" : true 
        }
        for(let j = 0; j < initialTeamsID.length; j++) {
            if(initialTeamsID[j] == t.id) {
                t.available = false
            }
        }
        availableTeams.push(t)
    }
}

function getDif(l1, l2) {

    let ret = []
    
    for(let i = 0; i < l1.length; i++) {
        let find = false
        for(let j = 0; j < l2.length; j++) {
            if(l1[i] === l2[j]) {
                find = true
                break
            }
        }
        if(!find) {
            ret.push(l1[i])
        }
    }

    return ret
}

function dropDown() {
    if($("#myDropdown").is(":hidden")){
        $("#myDropdown").show(500);
    } else {
        $("#myDropdown").hide(500);
    }
}

function addTeamList(name, id) {
    document.getElementById('addTeamButton').click();
    
    for(let i = 0; i < availableTeams.length; i++) {
        if(availableTeams[i].id == id) {
            availableTeams[i].available = false
        }
    }

    let main = document.createElement("main")
    main.classList.add("ranking")
    main.id = id
    
    let div = document.createElement("div")
    div.classList.add("col-lg-8")
    div.classList.add("col-md-8")
    div.classList.add("col-xs-8")
    div.innerText = name
    main.appendChild(div)

    let div2 = document.createElement("div")
    div2.classList.add("col-lg-1")
    div2.classList.add("col-md-1")
    div2.classList.add("col-xs-1")
    div2.classList.add("text-center")

    let img = document.createElement("img")
    img.classList.add("deleteButton")
    img.setAttribute('onclick','deleteTeam(' + id + ');')
    img.setAttribute('src','/img/icons/delete.png')

    div2.appendChild(img)
    main.appendChild(div2)

    document.getElementById("teams").appendChild(main)
}

function addTeam() {
    var myNode = document.getElementById("myDropdown");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    for(let i = 0; i < availableTeams.length; i++) {
        if(availableTeams[i].available === false) continue

        let h2 = document.createElement("h2")
        h2.setAttribute('onclick','addTeamList("' + availableTeams[i].name + '", ' + availableTeams[i].id  + ')')
        h2.classList.add("teamNameList")
        h2.innerText = availableTeams[i].name
        document.getElementById("myDropdown").appendChild(h2)
    }

    document.getElementById('addTeamButton').click();
}

function deleteTeam(id) {
    $("#" + id).remove();

    for(let i = 0; i < availableTeams.length; i++) {
        if(availableTeams[i].id === id) {
            availableTeams[i].available = true
            return
        }
    }
}

function getTeams() {
    let teamsSection = document.getElementById("teams").getElementsByTagName("main")

    let teams = [];

    for(let i = 0; i < teamsSection.length; i++) {
        teams.push(teamsSection[i].id)
    }

    return teams
}