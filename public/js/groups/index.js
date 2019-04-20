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