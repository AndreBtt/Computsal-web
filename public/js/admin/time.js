let times = {}
let initalTimes = {}

let newTimeCount = 1

$(document).ready(function() {
    initalTimes = getTimes()
    times = getTimes()

    $("#send").click(function () {
        
        let currTimes = getTimes()

        let obj = {}
        obj.times = []
        obj.newTimes = []

        for (var key in initalTimes) {
            if (initalTimes.hasOwnProperty(key)) {
                if(currTimes.hasOwnProperty(key)) {
                    // get updated keys
                    if(initalTimes[key] != currTimes[key]) {
                        let t = {
                            "id" : key,
                            "time" : currTimes[key],
                            "action" : 1
                        }
                        obj["times"].push(t)
                    }
                } else {
                    // get removed keys
                    let t = {
                        "id" : key,
                        "time" : "",
                        "action" : 0
                    }
                    obj["times"].push(t)
                }   
            }
        }

        // get new times
        let newTimesObj = getNewTimes()

        for (var key in newTimesObj) {
            if (newTimesObj.hasOwnProperty(key)) {
                let t = {
                    // add seconds
                    "time" : newTimesObj[key] + ":00",
                }
                obj.newTimes.push(t)
            }            
        }

        $.ajax({
            url: '/admin/horarios',
            type: 'PUT',
            data: obj,
            success: function(result) {
                let response = JSON.parse(result)
                if(response.status === "success") {
                    deleteTimesAjax(obj)
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

function deleteTimesAjax(obj) {
    $.ajax({
        url: '/admin/horarios',
        type: 'POST',
        data: obj,
        success: function(result) {
            let response = JSON.parse(result)
            if(response.status === "success") {
                let h2 = document.createElement("h2")
                h2.innerHTML = "Parabens!"
                document.getElementById("modaltext").appendChild(h2)

                let h3 = document.createElement("h3")
                h3.innerHTML = "Os horários foram atualizados com sucesso !"
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
}

function config(id) {
    let currTime = $("#"+id).text().trim()

    currTime = currTime.split(":")

    $("#inputHour").val(currTime[0])
    $("#inputMinute").val(currTime[1])

    $("#warningText").hide()
    document.getElementById('setTime').setAttribute("onclick", "updateTime(" + id + ")")
    document.getElementById('updateTime').click();
}

function updateTime(id) {
    if(checkTime() === false) {
        return
    }

    let newTime = getTimeModel()

    $("#"+id).text(newTime)
    times[id] = newTime
    document.getElementById('updateTime').click();
}

function getTimes() {
    let currTimes = {}

    let timeSection = document.getElementById("prevTimes").getElementsByTagName("main")

    for(let i = 0; i < timeSection.length; i++) {
        let id = timeSection[i].id.substring(3).trim()
        currTimes[id] = $("#"+id).text().trim()
    }

    return currTimes
}

function getNewTimes() {
    let currTimes = {}

    timeSection = document.getElementById("newTimes").getElementsByTagName("main")

    for(let i = 0; i < timeSection.length; i++) {
        let id = timeSection[i].id.substring(3).trim()
        currTimes[id] = $("#"+id).text().trim()
    }

    return currTimes
}

function del(id) {
    $("#" + id).hide(1000, function() {
        $(this).remove();
    });
    delete times[id]
}

function createTime() {
    let id = "new" + newTimeCount
    document.getElementById('setTime').setAttribute("onclick", "create('" + id + "')")
    newTimeCount++
    $("#inputHour").val("")
    $("#inputMinute").val("")
    $("#warningText").hide()
    document.getElementById('updateTime').click()
}

function create(id) {
    if(checkTime() === false) {
        return
    }

    let newTime = getTimeModel()

    times[id] = newTime

    let main = document.createElement("main")
    main.id = "row" + id
    main.classList.add("row")
    main.classList.add("items")

    let div1 = document.createElement("div")
    div1.id = id
    div1.classList.add("col-lg-6")
    div1.classList.add("col-md-6")
    div1.classList.add("col-xs-6")
    div1.classList.add("text-center")
    div1.classList.add("timeOpt")
    div1.innerText = newTime

    main.appendChild(div1)

    let div2 = document.createElement("div")
    div2.classList.add("col-lg-3")
    div2.classList.add("col-md-3")
    div2.classList.add("col-xs-3")

    let img1 = document.createElement("img")
    img1.setAttribute('onclick','config('+id+');')
    img1.setAttribute('src','/img/icons/config.png')
    img1.classList.add("icon-lg")
    img1.classList.add("imgOpt")
    div2.appendChild(img1)

    main.appendChild(div2)

    let div3 = document.createElement("div")
    div3.classList.add("col-lg-3")
    div3.classList.add("col-md-3")
    div3.classList.add("col-xs-3")

    let img2 = document.createElement("img")
    let delID = "row" + id
    img2.setAttribute('onclick',"del('"+delID+"')")
    img2.setAttribute('src','/img/icons/delete.png')
    img2.classList.add("icon-lg")
    img2.classList.add("imgOpt")
    div3.appendChild(img2)

    main.appendChild(div3)

    document.getElementById("newTimes").appendChild(main)
    document.getElementById('updateTime').click()
}

function checkTime() {
    let h = $("#inputHour").val().trim()
    let m = $("#inputMinute").val().trim()

    if(h == "") {
        $("#warningText").text("*hora nao definida")
        $("#warningText").show(200)
        return false
    }

    if(m == "") {
        $("#warningText").text("*minuto nao definido")
        $("#warningText").show(200)
        return false
    }

    if(h.length == 1) {
        h = '0' + h
    }

    if(m.length == 1) {
        m = '0' + m
    }

    let newTime = h + ":" + m

    for (var key in times) {
        if (times.hasOwnProperty(key)) {
            if(newTime == times[key]) {
                $("#warningText").text("*tempo já definido")
                $("#warningText").show(200)
                return false
            }
        }
    }

    return true
}

function getTimeModel() {    
    let h = $("#inputHour").val().trim()
    let m = $("#inputMinute").val().trim()

    if(h.length == 1) {
        h = '0' + h
    }

    if(m.length == 1) {
        m = '0' + m
    }

    let newTime = h + ":" + m

    return newTime
}