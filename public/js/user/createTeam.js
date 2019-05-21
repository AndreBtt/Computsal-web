// captain
let players = 1
let teamLogo = ""

$(document).ready(function() {
    $('.image-upload-wrap').bind('dragover', function () {
        $('.image-upload-wrap').addClass('image-dropping');
    });
    
    $('.image-upload-wrap').bind('dragleave', function () {
        $('.image-upload-wrap').removeClass('image-dropping');
    });
})

function createTeam() {
    let captain = $("#captain").val().trim()
        let name = $("#teamName").val().trim()
        let email = $("#email").val().trim()

        if(name.length === 0) {
            $("#teamRequire").css("display", "block");
            return
        } else {
            $("#teamRequire").css("display", "none");
        }

        if(captain.length === 0) {
            $("#captainRequire").css("display", "block");
            return
        } else {
            $("#captainRequire").css("display", "none");
        }

        let playersName = []

        for(let i = 1; i < players; i++) {
            let id = "#player" + i
            let name = $(id).val().trim()
            if(name.length == 0) continue
            playersName.push(name)
        }

        let teamObj = {}
        teamObj.captain = captain
        teamObj.name = name
        teamObj.email = email
        teamObj.players = playersName
        // teamObj.photo = ""

        // send a new request to save photo and get it's URL
        // if(teamLogo != "") {
        //     let formData = new FormData();
        //     formData.append("photo", teamLogo);

        //     $.ajax({
        //         url: 'user/savePhoto',
        //         type: 'POST',
        //         data: formData,
        //         processData: false,
        //         success: function(result) {
        //             let response = JSON.parse(result)
        //             if(response.status === "success") {
        //                 teamObj.photo = response.photoURL
        //                 sendCreateTeam(teamObj)                  
        //             } else {
        //                 let h2 = document.createElement("h2")
        //                 h2.innerHTML = "Oppss"
        //                 document.getElementById("modaltext").appendChild(h2)
    
        //                 let h3 = document.createElement("h3")
        //                 h3.innerHTML = "Não conseguimos upar sua imagem, tente novamente mais tarde."
        //                 document.getElementById("modaltext").appendChild(h3)
    
        //                 document.getElementById('sendClick').click();
    
        //                 $("#resultModal").css("display", "block");
        //             }
        //         }
        //     });
        // } else {
        //     sendCreateTeam(teamObj)
        // }
        sendCreateTeam(teamObj)
}

function sendCreateTeam(teamObj) {
    $.ajax({
        url: '/criarTime',
        type: 'POST',
        data: teamObj,
        success: function(result) {
            let response = JSON.parse(result)
            if(response.status === "success") {
                
                let h2 = document.createElement("h2")
                h2.innerHTML = "Parabens!"
                document.getElementById("modaltext").appendChild(h2)

                let h3 = document.createElement("h3")
                h3.innerHTML = "Seu time foi criado com sucesso !"
                document.getElementById("modaltext").appendChild(h3)

                document.getElementById('sendClick').click();
                
                $("#resultModal").css("display", "block");
            } else {

                let h2 = document.createElement("h2")
                h2.innerHTML = "Oppss"
                document.getElementById("modaltext").appendChild(h2)

                let h3 = document.createElement("h3")
                h3.innerHTML = "Não conseguimos criar seu time, tente novamente mais tarde."
                document.getElementById("modaltext").appendChild(h3)

                document.getElementById('sendClick').click();

                $("#resultModal").css("display", "block");
            }
        }
    });
}

function createPlayer() {
    // can't have more than 15 players
    if(players == 15) return

    var div = document.createElement("div")
    div.classList.add("group")
    div.classList.add("wow")
    div.classList.add("fadeIn")
    div.setAttribute('data-wow-delay', '.1s')

    var input = document.createElement("input")
    input.classList.add("text-center")
    input.type = "text"
    input.placeholder = "Jogador"
    input.id = "player" + players
    input.setAttribute("pattern","[A-Za-z]+")
    input.setAttribute("autocomplete","off")
    div.appendChild(input)

    var bar = document.createElement("div")
    bar.classList.add("bar")
    div.appendChild(bar)

    document.getElementById("players").appendChild(div)
    players++
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            $('.file-upload-image').attr('src', e.target.result);
            $('.file-upload-content').show();

            $('.image-title').html(input.files[0].name);
        };

        teamLogo = input.files[0]

        reader.readAsDataURL(input.files[0]);
    }
}  