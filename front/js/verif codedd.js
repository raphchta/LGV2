const input_submit = document.getElementById("input_submit");
const input_text = document.getElementById("code");
let i = 0;
input_submit.addEventListener('click', function myFunction() {
  fetch('http://127.0.0.1:5000/code?code=' + input_text.value)
  .then(response => response.json())
  .then(data => {
    if (data['reponce'] ==="0"){
        document.getElementById("forme_code").submit();
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
});
