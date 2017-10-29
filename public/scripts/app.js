$(function(){
    $("#thing").on("click", function() {
        if(this.classList.contains("active")) {
            this.classList.remove("active");
        } else {
            this.classList.add("active");
        }
    });
});