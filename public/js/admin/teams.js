$(document).ready(function() {
    

})


function deleteTeam(team) {
    console.log(team)
    $('#' + team).hide('slow', function(){ $('#' + team).remove(); });
}

function save() {
    // $.ajax({
    //     url: '/admin/times',
    //     type: 'DELETE',
    //     success: function(result) {
            
    //         // JOGA NA TELA QUE DEU CERTO QUANDO ELE CLICAR MANDA PRA PROXIMA PAG
    //         window.location.href='/admin';
    //     }
    // });




    
}