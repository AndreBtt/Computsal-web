
let deletedTeams = []

$(document).ready(function() {
    
    $("#deleteWarning").click(function () {
        document.getElementById('deleteWarningClick').click();
    })

    $("#delete").click(function () {
        $("#spinnerLogin").show()

        $.ajax({
            url: '/admin/times',
            type: 'DELETE',
            data: {
                "ids" : deletedTeams
            },
            success: function(result) {
                let response = JSON.parse(result)
                $("#confirmModal").css("display", "none");
                if(response.status === "success") {
                    let h2 = document.createElement("h2")
                    h2.innerHTML = "Parabens!"
                    document.getElementById("modaltext").appendChild(h2)

                    let h3 = document.createElement("h3")
                    h3.innerHTML = "Os times foram deletados com sucesso !"
                    document.getElementById("modaltext").appendChild(h3)

                    document.getElementById('sendClick').click();
                    
                    $("#resultModal").css("display", "block");
                } else {
                    let h2 = document.createElement("h2")
                    h2.innerHTML = "Oppss"
                    document.getElementById("modaltext").appendChild(h2)

                    let h3 = document.createElement("h3")
                    h3.innerHTML = "Não conseguimos deletar os times, tente novamente mais tarde."
                    document.getElementById("modaltext").appendChild(h3)

                    document.getElementById('sendClick').click();

                    $("#resultModal").css("display", "block");
                }
            }
        });

    })

})

function deleteTeam(id) {
    deletedTeams.push(id)

    $('#' + id).hide('slow', function(){ $('#' + id).remove(); });
}