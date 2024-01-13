const input_submit = document.getElementById("input_submit");
const input_text = document.getElementById("input_text");
if(typeof $_GET()["code"] == "undefined"){
    document.location.href = 'code.html'
}else{
    var code_p = $_GET()["code"];
    console.log(code_p);
}
let i = 0;
input_submit.addEventListener('click', function myFunction() {
  verif_id();
});
function $_GET(param){
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  const result = {};

  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }

  return result;
}
function handleKeyPress_fon_id(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        verif_id();
      }
}
function verif_id(){
  var ip= 'api.loup-garou.online';
  fetch('https://'+ip+':8000/usser?code=' + code_p + '&usser=' + input_text.value)
  .then(response => response.json())
  .then(data => {
    data =JSON.parse(data);
    if (data['reponce'] ==="0"){
        document.cookie = "jouer=" + input_text.value+";";
        document.location.href = data['url'];
    } else{
        if (i == 0){
            i = 1;
            const messagescontaner = document.querySelector(".div_titre")
            messagescontaner.style.textAlign = "center";
            const nuwMessage = document.createElement("p");
            nuwMessage.innerHTML = "se pesdo est déja utiliser.";
            nuwMessage.style.color = 'red'
            messagescontaner.appendChild(nuwMessage);
        }
    }
  })
}
