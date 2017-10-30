$(function(){
    $(".new-user").on("click", function() {
        const thisButton = $(this);
        let optionPicked = "button="+ Number(thisButton[0].dataset.option)
        console.log(optionPicked)
        console.log(thisButton)
        console.log("clicked")
        $.ajax ({
            method: "POST",
            url: "/events/option",
            data: optionPicked
         }) .done(function(){
            console.log("Great Job, Really Well Done - Karl, 2017")
            })
    })
});
