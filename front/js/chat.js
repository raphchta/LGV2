const button_chat =document.querySelector(".div_text_nave_chat")
const button_role = document.querySelector(".div_text_nave_role")
var conteur = 1

button_chat.addEventListener("click", function() {
  if (conteur == 0){

    document.querySelector(".text_nave_role").classList.remove("soulinier");
    document.querySelector(".text_nave_chat").classList.add("soulinier");
    document.querySelector(".div_roles").classList.remove("actife_role_chat");
    document.querySelector(".div_chate").classList.add("actife_role_chat");
    conteur = 1;
  }
});
button_role.addEventListener('click', function myFunction() {
  if (conteur == 1){
    document.querySelector(".text_nave_chat").classList.remove("soulinier");
    document.querySelector(".text_nave_role").classList.add("soulinier");
    document.querySelector(".div_chate").classList.remove("actife_role_chat");
    document.querySelector(".div_roles").classList.add("actife_role_chat");
    conteur = 0;
  }
})
