// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {

    $(".newBurger").on("submit", function(){    
        //we do not want the default - refresh form on submit
        event.preventDefault();
        var name = $("#burger").val();
        fillTheOrder(name);
        $("#burger").val("");
    });

    $(".menu").on("click", function(){
        //console.log("clicked the menu");
        var id = $(this).attr('id');
        // console.log("clicked the burgerList:" , id);
        var name = $(this).attr('value');
        //console.log("clicked the burgerList:" , name);
        fillTheOrder(name);
    });
});

$(document).on("click", function(){
    //When the burger is devoured     
    $(".devoured").on("click", function(){
        console.log("You devoured");
        //we do not want the default - refresh form on submit
        event.preventDefault();
        
        var listItems = $("#curOrder").children();
        var id = $(this).attr('id');
        var nameOfBurger = $(this).attr('value');

        //console.log("the burger cliked:" , nameOfBurger);
        var myBurger = {
            name: nameOfBurger
        };

        //post request and also add to past list and remove from current
        $.ajax("/api/burgers", {
            type: "POST",
            data: myBurger
            }).then( 
                function(){                                   
                console.log("you devoured ", id , nameOfBurger);  
                var myId = "#" + id;
                $(myId).remove(); 
                $(myId).remove(); 
                // $(id).remove();
                // fillThePastOrder(nameOfBurger);
                if(listItems.length == 0)
                {
                    location.reload();
                }
            });
    });
})

//add to the Past order (also adds to the database for future)
function fillThePastOrder(burgerName)
{
    var listItems = $("ul.order").children();
    var id = listItems.length;
    var pastList = $("#pastOrder");
    var h4 = $("<h4>");
    var row = $("<li>");
    row.addClass("burgerList");
    row.attr("id", id);
    row.append(burgerName);
    h4.append(row);
    pastList.prepend(h4);
}

function fillTheOrder(burgerName)
{
    var listItems = $("#curOrder").children();
    var id = "NewOrder_" + listItems.length;
    console.log("The id is " + id);
    if(id == 0)
    {
        var h3 = $("<h3>");
        h3.addClass("burgerList");
        h3.text("Current Orders:");
        $("#curOrderHeader").prepend(h3);
    }
 
    var h4 = $("<h4>");
    h4.addClass("menuItem");    
    
    var btn = $("<button>");
    btn.addClass("btn btn-secondary");
    btn.addClass("devoured");
    btn.attr("id", id);
    btn.attr("value", burgerName)
    btn.text("Devoured!");

    var row = $("<a href='#'>");
    row.addClass("burgerList");
    row.attr("id", id);
    row.append(burgerName);
    h4.append(row);
    //row.append(btn);

    var span1 = $("<span>");
    span1.addClass("order input-group");
    span1.append(h4);

    var span2 = $("<span>");
    span2.addClass("order");
    span2.append(btn);

    // h4.append(span1);
    // h4.append(span2);
    // $("#btnOrder").append(btnRow);    
    $("#curOrder").append(span1);
    $("#curOrder").append(span2);
    console.log(row);
}