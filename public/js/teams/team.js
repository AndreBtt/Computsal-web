function displayGroup(currGroup, groupSize) {
    for(var i = 1; i <= groupSize; i++) {
        if (i == currGroup) continue
        if($("#group" + i).not(":hidden")) {
            $("#group" + i).hide(1000);
        }
    }

    if($("#group" + currGroup).is(":hidden")){
        $("#group" + currGroup).show(1000);
    } else{
        $("#group" + currGroup).hide(1000);
    }
}

function hideItems(currItem) {
    let items = ["players", "nextMatch", "previousMatches", "information"]

    for(var i = 0; i < items.length; i++) {
        if(items[i] === currItem) continue
        if($("#" + items[i]).not(":hidden")) {
            $("#" + items[i]).hide(1000);
        }
    }
}

function displayPlayers() {
    hideItems("players")

    if($("#players").is(":hidden")){
        $("#players").show(1000);
    } else{
        $("#players").hide(1000);
    }
}

function displayPreviousMatches() {
    hideItems("previousMatches")

    if($("#previousMatches").is(":hidden")){
        $("#previousMatches").show(1000);
    } else{
        $("#previousMatches").hide(1000);
    }
}

function displayNextMatch() {
    hideItems("nextMatch")

    if($("#nextMatch").is(":hidden")){
        $("#nextMatch").show(1000);
    } else{
        $("#nextMatch").hide(1000);
    }
}

function displayInformation() {
    hideItems("information")

    if($("#information").is(":hidden")){
        $("#information").show(1000);
    } else{
        $("#information").hide(1000);
    }
}