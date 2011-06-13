$(document).ready(function(){

  $(".slideHandle").click(function(){
    $(this).parent().find("ol").toggle();
    $(this).toggleClass("active");
  });

  $('a.littlebox').click(function() {
      var url = this.href;
      var dialog = undefined;

      if($(".overlay").length > 0){
        dialog = $(".overlay");
      }else{
        dialog = $('<div class="overlay" style="display:hidden"></div>').appendTo('body');
      }

      // load remote content
      $.ajax({
        url: url,
        success: function(output){ dialog.html(output); dialog.dialog({ width: 440 }); }
      });

      //prevent the browser to follow the link
      return false;
  });

  $("#password_container a").live("click",function(){
    $("#password_container").html($("#hidden_password").val());
  });

  $("#group_menu").tabs();
  
});