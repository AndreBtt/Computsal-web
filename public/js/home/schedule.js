let prevSchedule = {};

$(document).ready(function() {
    getSchedule()

    $("#send").click(function () {
        let dif = getDifference()
        let vetDif = []
        for (var key in dif) {
            if (dif.hasOwnProperty(key)) {
                let t = {}
                t.time_id = parseInt(key,10)
                t.availability = dif[key]
                vetDif.push(JSON.stringify(t))
            }
        }
        let scheduleObj = {}
        scheduleObj.times = vetDif

        $.ajax({
            url: '/agendarHorario',
            type: 'PUT',
            data: scheduleObj,
            success: function(result) {
                let response = JSON.parse(result)
                if(response.status === "success") {
                    
                    let h2 = document.createElement("h2")
                    h2.innerHTML = "Parabens!"
                    document.getElementById("modaltext").appendChild(h2)

                    let h3 = document.createElement("h3")
                    h3.innerHTML = "Seus horários foram atualizados com sucesso !"
                    document.getElementById("modaltext").appendChild(h3)

                    document.getElementById('sendClick').click();
                    
                    $("#resultModal").css("display", "block");
                } else {

                    let h2 = document.createElement("h2")
                    h2.innerHTML = "Oppss"
                    document.getElementById("modaltext").appendChild(h2)

                    let h3 = document.createElement("h3")
                    h3.innerHTML = "Não conseguimos atualizar seus horários, tente novamente mais tarde."
                    document.getElementById("modaltext").appendChild(h3)

                    document.getElementById('sendClick').click();

                    $("#resultModal").css("display", "block");
                }
            }
        });


    });

})

function getSchedule() {
    let innerDivs = document.getElementById("form").getElementsByTagName("div")
    
    // take off the last element cause is the button
    for(let i = 0; i < innerDivs.length - 1; i++) {
        let time = document.getElementById("form").getElementsByTagName("div")[i].getElementsByTagName("input").item(0)
        prevSchedule[time.id] = time.checked
    }
}

function getDifference() {
    let innerDivs = document.getElementById("form").getElementsByTagName("div")

    let dif = {}

    // take off the last element cause is the button
    for(let i = 0; i < innerDivs.length - 1; i++) {
        let time = document.getElementById("form").getElementsByTagName("div")[i].getElementsByTagName("input").item(0)
        if(prevSchedule[time.id] != time.checked) {
            dif[time.id] = time.checked
        }
    }

    return dif
}