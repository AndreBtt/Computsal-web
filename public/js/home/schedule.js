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
        $("#scheduleDiff").val(vetDif)
    });

})

function getSchedule() {
    let innerDivs = document.forms["schedule"].getElementsByTagName("div")
    
    // take off the last element cause is the button
    for(let i = 0; i < innerDivs.length - 1; i++) {
        let time = document.forms["schedule"].getElementsByTagName("div")[i].getElementsByTagName("input").item(0)
        prevSchedule[time.id] = time.checked
    }
}

function getDifference() {
    let innerDivs = document.forms["schedule"].getElementsByTagName("div")

    let dif = {}

    // take off the last element cause is the button
    for(let i = 0; i < innerDivs.length - 1; i++) {
        let time = document.forms["schedule"].getElementsByTagName("div")[i].getElementsByTagName("input").item(0)
        if(prevSchedule[time.id] != time.checked) {
            dif[time.id] = time.checked
        }
    }

    return dif
}