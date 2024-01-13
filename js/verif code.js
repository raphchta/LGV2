const input_submit = document.getElementById("input_submit");
const input_text = document.getElementById("code");
let i = 0;
input_submit.addEventListener('click', function myFunction() {
  verif_code();
});
function handleKeyPress(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        verif_code();
      }
}
function verif_code(){
  var ip = "api.loup-garou.online";
  fetch('https://'+ip+':8000/code?code=' + input_text.value)
  .then(response => response.json())
  .then(data => {
    data =JSON.parse(data);
    if (data['reponce'] ==="0"){
        document.location.href = 'indentifent.html?code=' + input_text.value;
    } else{
        if (i == 0){
            i = 1;
            const messagescontaner = document.querySelector(".div_titre")
            messagescontaner.style.textAlign = "center";
            const nuwMessage = document.createElement("p");
            nuwMessage.innerHTML = "aucune partie a été trouver.";
            nuwMessage.style.color = 'red';
            messagescontaner.appendChild(nuwMessage);
        }
    }
  })
}
