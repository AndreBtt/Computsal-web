function displayNext() {
    $("#prevMatches").hide(1000);

    if($("#nextMatches").is(":hidden")){
        $("#nextMatches").show(1000);
    } else{
        $("#nextMatches").hide(1000);
    }
}

function displayPrev() {
    $("#nextMatches").hide(1000);

    if($("#prevMatches").is(":hidden")){
        $("#prevMatches").show(1000);
    } else{
        $("#prevMatches").hide(1000);
    }
}