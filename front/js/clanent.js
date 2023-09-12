const messageInput = document.querySelector(".input_message")
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
document.addEventListener('DOMContentLoaded',function(){
    var ip = "192.168.68.108";
    console.log($_GET());
    if( typeof $_GET()["code"] == "undefined"){
        document.location.href = 'code.html'
    }else{
        var code_p = $_GET()["code"];
        console.log(code_p);
    }
    fetch('http://127.0.0.1:5000/code?code=' + code_p)
    .then(response => response.json())
    .then(data => {
    console.log(data['reponce'])
    if (data['reponce'] ==="1"){
        document.location.href = 'code.html'
    }})
    if (getCookie('jouer') == ""){
        document.location.href = 'indentifent.html'
    }else{
        var sedo = getCookie('jouer')
        console.log(sedo);
    }

    var websocketClient = new WebSocket("ws://"+ip+":12345/");

    const messagescontaner = document.querySelector("#message_container")
    const sendMessageButton = document.querySelector(".bontton-message")
    element = document.getElementById('message_container');//message_container
    websocketClient.onopen = function(){
      document.querySelector(".rejoure").addEventListener('click', function(e){
        websocketClient.send("/re");
        document.querySelector(".rejoure").style.display = "none";
      });
      document.querySelector(".changer_roles").addEventListener('click', function(e){
        document.querySelector(".changer_roles").style.display = "none";
      });
      function seed_message_chat(){
        var stl = messageInput.value
        websocketClient.send(stl);
      }
        var dict = new Object();
        var dict = {
            "code": code_p,
            "jouer": sedo
        };
        websocketClient.send(JSON.stringify(dict));
        sendMessageButton.onclick =function(){
            seed_message_chat();
        };
        websocketClient.onmessage = function(messages){
            if (messages.data === "re"){
              document.querySelector(".temps_text").style.display = "none";
              document.querySelector(".rejoure").style.display = "block";
              return 0;
            }
            if (messages.data === "re1"){
              document.querySelector(".changer_roles").href ="./changer.html?code=" + encodeURIComponent(code_p);
              document.querySelector(".changer_roles").style.display = "block";
              return 0
            }
            if (messages.data === '{"message": "la patri a comencer", "envoyer": "le narrateur", "styl": ""}'){
              document.querySelector(".changer_roles").style.display = "none";
              var websocketClient = new WebSocket("ws://"+ip+":12345/");
            }
            const nuwMessage = document.createElement("p");
            const obj = JSON.parse(messages.data);
            message = obj["message"]
            envoyer = obj["envoyer"]
            styl = obj["styl"]
            nuwMessage.innerHTML = '<span class="envoyer">' +envoyer +"</span>:" + message;
            nuwMessage.classList.add("message");
            if (styl !== ""){
                nuwMessage.classList.add(styl);
            }
            messagescontaner.appendChild(nuwMessage);
            element.scrollTop = element.scrollHeight;
        }

    }
},false);
function handleKeyPress_for_seed_messaage(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        seed_message_chat();
      }
}
function $_GET(param) {
    var vars = {};
    window.location.href.replace( location.hash, '' ).replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function( m, key, value ) { // callback
            vars[key] = value !== undefined ? value : '';
        })

    if ( param ) {
        return vars[param] ? vars[param] : null;
    }
        return vars;
    };
