
$(document).ready(function(){

     let option = $(".an-option");
     let listHead = $("#list-head");

     let uList = `<ul id="list" class="fa-ul" style="margin-left: 30px"></ul>`;
     
     let liCombination = [
     `<li class="l-txt a-margin-xs-bottom">
     <span class="fa-li"><i class="fas fa-check-circle" style="color: #0dff92;"></i></i></span>
     Uppercase Letters
     </li>`,

     `<li class="l-txt a-margin-xs-bottom">
     <span class="fa-li"><i class="fas fa-check-circle" style="color: #0dff92;"></i></i></span>
     Lowercase Letters
     </li>`,

     `<li class="l-txt a-margin-xs-bottom">
     <span class="fa-li"><i class="fas fa-check-circle" style="color: #0dff92;"></i></i></span>
     Numbers
     </li>`,

     `<li class="l-txt a-margin-xs-bottom">
     <span class="fa-li"><i class="fas fa-check-circle" style="color: #0dff92;"></i></i></span>
     Special Characters
     </li>`];
     let liPassword = [
     `<li class="l-txt a-margin-xs-bottom">
     <span class="fa-li"><i class="fas fa-check-circle" style="color: #0dff92;"></i></i></span>
     Password Length: 8
     </li>`,
     
     `<li class="l-txt a-margin-xs-bottom">
     <span class="fa-li"><i class="fas fa-check-circle" style="color: #0dff92;"></i></i></span>
     Password Length: 16
     </li>`,
     
     `<li class="l-txt a-margin-xs-bottom">
     <span class="fa-li"><i class="fas fa-check-circle" style="color: #0dff92;"></i></i></span>
     Password Length: 20
     </li>`,];

     listHead.after(uList);
     for (let i = 0; i < liCombination.length; i++)
          $(document).find("#list").append(liCombination[i]);

     $(document).find("#list").append(liPassword[2]);
     
     // length of 8 => "easy", length of 16 => "medium", length of 20 => "strong"
     let passwordLength = 20;
     option.click(function(){

          let textarea = $("#generated-password");
          
          // clear the textarea
          if( !($(this).children().hasClass("bar-active")) ){
               textarea.text("");
               $(".float-txt").addClass("hidden");
          }

          // all buttons are made "inactive"
          option.children().removeClass("bar-active");
          option.children().removeClass("btn-txt-active");
          
          // the button that was clicked on becomes "active"
          $(this).children(".bar").addClass("bar-active");
          $(this).children(".btn-txt").addClass("btn-txt-active");

          // list is deleted
          $("#list").empty();

          // a new list is created based on which option was selected
          if($(this).data("option") === "strong"){
               
               listHead.after(uList);
               for (let i = 0; i < liCombination.length; i++) {
                    $(document).find("#list").append(liCombination[i]);
               }
               $(document).find("#list").append(liPassword[2]);

               passwordLength = 20;
          }
          else if($(this).data("option") === "medium"){
               
               listHead.after(uList);
               for (let i = 1; i < liCombination.length; i++) {
                    $(document).find("#list").append(liCombination[i]);
               }
               $(document).find("#list").append(liPassword[1]);

               passwordLength = 16;
          }
          else{

               listHead.after(uList);
               for (let i = 1; i < liCombination.length-1; i++) {
                    $(document).find("#list").append(liCombination[i]);
               }
               $(document).find("#list").append(liPassword[0]);

               passwordLength = 8;
          }
     })


     $("#gen-btn").click(function(){

          $(".float-txt").addClass("hidden");
          $("#copy-btn").removeClass("disabled-btn");
          $("#copy-btn").addClass("action-btn");

          let uppers = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          let lowers = 'abcdefghijklmnopqrstuvwxyz';
          let nums = '0123456789';
          let specials = '`~!@#$%^&*()_+-=[]{}|\\;\':",./<>?';
     
          let criteria;
          let password = '';
          
          if(passwordLength === 20)
               criteria = uppers + lowers + nums + specials;
               
          else if(passwordLength === 16)
               criteria = lowers + nums + specials;
               
          else
               criteria = lowers + nums;

          for (let i = 0; i < passwordLength; i++) {
               
               let temp = Math.floor(Math.random() * criteria.length);

               password += criteria.substring(temp, temp + 1);
          }

          $("#generated-password").text(password);
     });

     $("#copy-btn").click(function(){
          
          let textarea = $("#generated-password");
          
          if(textarea.text() !== ""){
               $(".float-txt").removeClass("hidden");

               textarea.focus();
               textarea.select();
               document.execCommand("copy");
          }
     })
})