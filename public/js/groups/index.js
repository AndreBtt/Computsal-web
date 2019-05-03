function displayGroup(currGroup) {

    let groups = document.getElementById("groups").getElementsByTagName("main")
    
    for(let i = 0; i < groups.length; i++) {
        if($("#" + groups[i].id).not(":hidden")) {
            $("#" + groups[i].id).hide(1000);
        }
    }

    if($("#" + currGroup).is(":hidden")){
        $("#" + currGroup).show(1000);
    } else{
        $("#" + currGroup).hide(1000);
    }
}