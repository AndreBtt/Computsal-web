(function($) {
    "use strict";

    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 60
    });

    $('#topNav').affix({
        offset: {
            top: 200
        }
    });
    
    new WOW().init();
    
    $('a.page-scroll').bind('click', function(event) {
        var $ele = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($ele.attr('href')).offset().top - 60)
        }, 1450, 'easeInOutExpo');
        event.preventDefault();
    });
    
    $('.navbar-collapse ul li a').click(function() {
        /* always close responsive nav after click */
        $('.navbar-toggle:visible').click();
    });

})(jQuery);

function createAccount() {
    let email = $("#emailAccount").val().trim()

    // melhorar o modo que verifica erro [aUb]*@....
    if(email == "") {
        $("#warningTextAccount").text("*email não pode ser vazio")
        $("#warningTextAccountDisplay").show()
        return
    }

    let password = $("#passwordAccount").val().trim()
    if(password.length < 6) {
        $("#warningTextAccount").text("*Senha deve conter pelo menos 6 dígitos")
        $("#warningTextAccountDisplay").show()
        return
    }

    let obj = {}
    obj.email = email
    obj.password = password

    $("#spinnerLogin").show()

    $.ajax({
        url: '/user/create',
        type: 'POST',
        data: obj,
        success: function(result) {
            let response = JSON.parse(result)
            if(response.status === "success") {
                document.getElementById('login').click()

                let h2 = document.createElement("h2")
                h2.innerHTML = "Parabens!"
                document.getElementById("accountModalText").appendChild(h2)

                let h3 = document.createElement("h3")
                h3.innerHTML = "Um email de verificação foi enviado. <br><br> Após a verificação voce você poderá criar seu próprio time !"
                document.getElementById("accountModalText").appendChild(h3)

                document.getElementById('accountClick').click();
            } else {
                document.getElementById('login').click()
                
                let h2 = document.createElement("h2")
                h2.innerHTML = "Ooops!"
                document.getElementById("accountModalText").appendChild(h2)

                let h3 = document.createElement("h3")
                h3.innerHTML = response.status
                document.getElementById("accountModalText").appendChild(h3)

                document.getElementById('accountClick').click();
            }
        }
    });

}

function logInAccount() {
    let email = $("#emailAccount").val().trim()

    // melhorar o modo que verifica erro [aUb]*@....
    if(email == "") {
        $("#warningTextAccount").text("*email não pode ser vazio")
        $("#warningTextAccountDisplay").show()
        return
    }

    let password = $("#passwordAccount").val().trim()
    if(password.length < 6) {
        $("#warningTextAccount").text("*Senha deve conter pelo menos 6 dígitos")
        $("#warningTextAccountDisplay").show()
        return
    }

    let obj = {}
    obj.email = email
    obj.password = password

    $("#spinnerLogin").show()

    $.ajax({
        url: '/user/logIn',
        type: 'POST',
        data: obj,
        success: function(result) {
            let response = JSON.parse(result)
            if(response.status === "success") {
                document.getElementById('login').click()

                let h2 = document.createElement("h2")
                h2.innerHTML = "Seja bem vindo!"
                document.getElementById("accountModalText").appendChild(h2)

                document.getElementById('accountClick').click();
            } else {
                document.getElementById('login').click()
                
                let h2 = document.createElement("h2")
                h2.innerHTML = "Ooops!"
                document.getElementById("accountModalText").appendChild(h2)

                let h3 = document.createElement("h3")
                h3.innerHTML = "Não conseguimos logar"
                document.getElementById("accountModalText").appendChild(h3)

                document.getElementById('accountClick').click();
            }
        }
    });

}

function logOutAccount() {
    $("#spinnerLogin").show()

    $.ajax({
        url: '/user/logOut',
        type: 'POST',
        data: {},
        success: function(result) {
            let response = JSON.parse(result)
            if(response.status === "success") {
                document.getElementById('login').click()

                let h2 = document.createElement("h2")
                h2.innerHTML = "Volte sempre!"
                document.getElementById("accountModalText").appendChild(h2)

                document.getElementById('accountClick').click();
            } else {
                document.getElementById('login').click()
                
                let h2 = document.createElement("h2")
                h2.innerHTML = "Ooops!"
                document.getElementById("accountModalText").appendChild(h2)

                let h3 = document.createElement("h3")
                h3.innerHTML = "Não conseguimos sair da conta. Tente novamente mais tarde."
                document.getElementById("accountModalText").appendChild(h3)

                document.getElementById('accountClick').click();
            }
        }
    });

}

function forgetPassword() {
    $("#spinnerLogin").show()

    let email = $("#emailAccount").val().trim()

    // melhorar o modo que verifica erro [aUb]*@....
    if(email == "") {
        $("#warningTextAccount").text("*preencha seu email")
        $("#warningTextAccountDisplay").show()
        return
    }

    let obj = {}
    obj.email = email

    $.ajax({
        url: '/user/forgetPassword',
        type: 'POST',
        data: obj,
        success: function(result) {
            let response = JSON.parse(result)
            if(response.status === "success") {
                document.getElementById('login').click()

                let h3 = document.createElement("h3")
                h3.innerHTML = "Um email foi enviado com os passos para restaurar a sua senha."
                document.getElementById("accountModalText").appendChild(h3)

                document.getElementById('accountClick').click();
            } else {
                document.getElementById('login').click()
                
                let h2 = document.createElement("h2")
                h2.innerHTML = "Ooops!"
                document.getElementById("accountModalText").appendChild(h2)

                let h3 = document.createElement("h3")
                h3.innerHTML = "Não conseguimos encontrar seu email."
                document.getElementById("accountModalText").appendChild(h3)

                document.getElementById('accountClick').click();
            }
        }
    });
}