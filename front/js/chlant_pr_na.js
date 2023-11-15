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

  document.addEventListener('DOMContentLoaded',function(){
    const roles_contaner = document.querySelector("#roles");
    const jouers_contaner = document.querySelector(".persones");
    const div_jouers = document.querySelector(".persone");
    const dialog_sor = document.querySelector(".dialog-sor");
    const dialog_rejouer= document.querySelector(".dialog_rejouer");
    const text_time= document.querySelector(".temps_text");
    const dialog_if= document.querySelector(".dialog-in");
    const messagescontaner = document.querySelector("#message_container")
    const bouton_sover = document.querySelector("#sauver");
    const bouton_rien = document.querySelector("#rien");
    const img_rejouer = document.querySelector(".img_rejouer");
    const bouton_tuer = document.querySelector("#tuer");
    var message = "";
    const delay = (delayInms) => {
      return new Promise(resolve => setTimeout(resolve, delayInms));
    }
    document.querySelector(".continunier").addEventListener('click', function(e){
        document.querySelector(".anonce").close("animalNotChosen");
    });
    bouton_rien.addEventListener('click', function(e){
        dico = {"action":0}
        websocketClient_main.send(JSON.stringify(dico));
        dialog_sor.close("animalNotChosen");
    });
    var int_etape = 0;
    var if_oppen = 0;
    var jouers = 0;
    var sorciere_ouver = 0;
    var code_p = $_GET()["code"];
    var sedo = getCookie('jouer');
    var ip = "192.168.150.108";
    var text ="ws://"+ip+":"+code_p.toString()+"/narateur";
    var reserte = 1;
    var jouer_avez= [];
    document.querySelector(".changer_comp").addEventListener('click', function(e){
        document.location.href = 'changer.html?code=' + code_p;
    });
    const websocketClient = new WebSocket(text);
    websocketClient.onopen = function(){
    websocketClient.send(JSON.stringify({"jouer":sedo}));
    document.querySelector(".rejoure").addEventListener('click', function(e){
      websocketClient.send("/re");
      document.querySelector(".restart").close("animalNotChosen");
      });
    }
    websocketClient.onmessage = function(message){
      if (message.data ==="re1"){
        document.querySelector(".restart").showModal();
        return;
      }
      const obj = JSON.parse(message.data);
      console.log(obj);
      if( typeof obj["mort"] != "undefined" && message != obj["mort"]){
        document.querySelector(".mort_popup").innerText =obj["mort"];
        document.querySelector(".anonce").showModal();
      }
      if( typeof obj["message"] != "undefined" && message != obj["message"]){
        console.log(obj);
        document.querySelector(".str_di").innerHTML =obj["message"];
      }
      if( typeof obj['eta'] != "undefined" && int_etape!= obj['eta']){
        int_etape = obj['eta'];
      }
      websocketClient.send("");
    }
  var text2 ="ws://"+ip+":"+code_p.toString()+"/";
  const websocketClient_main = new WebSocket(text2);
  websocketClient_main.onmessage = function(message){

    const obj = JSON.parse(message.data);
    console.log(obj);
    int_etape_e = int_etape
    int_etape = obj['eta'];
    if (int_etape === 7 && sorciere_ouver == 0){
      try {
          sorciere_ouver = 1
          dialog_sor.showModal();
      } catch (e) {
          console.log(e);
      }
    }
    if (int_etape != 7 && sorciere_ouver == 1){
      sorciere_ouver = 0
      try {
        dialog_sor.close("animalNotChosen");
      } catch (e) {
        console.log(e);
      }
    }
    if (int_etape === 5 && if_oppen == 0){
      try {
          if_oppen = 1
          dialog_if.showModal();
      } catch (e) {
          console.log(e);
      }
    }
    if (int_etape != 5 && if_oppen == 1){
      if_oppen = 0
      try {
        dialog_if.close("animalNotChosen");
      } catch (e) {
        console.log(e);
      }
    }
    if( typeof jouers == "undefined"){
      var jouers = "";}
    reserte = 0;
    jouers = obj['jouers'];
    jouer_avez = obj['jouers'];
    element = document.querySelector(".persones");
    element.innerHTML = "";
    jouers.forEach((item, i) => {
      const nuwMessage = document.createElement("p");
      nuwMessage.innerText = item;
      console.log(jouers);
      if (sedo == item){
          nuwMessage.classList.add("my");
      }
      nuwMessage.classList.add("persone");
      nuwMessage.setAttribute('id',item);
      nuwMessage.onclick= function() {
        var jouer = nuwMessage.textContent;
        if (int_etape === 1){
          if (list_jouers.length === 0){
              list_jouers = [jouer];
              nuwMessage.classList.add("slete");
            }
            else if (list_jouers.length ===1 && list_jouers[0] != jouer){
              var dico = {"jouer1":list_jouers[0],"jouer2":jouer};
              list_jouers = [];
              websocketClient.send(JSON.stringify(dico));
            }
        }
        else if (int_etape === 2){
            var dico = {"jouer":jouer};
            websocketClient.send(JSON.stringify(dico));
          }
        else if (int_etape === 3){
          var dico = {"jouer":jouer};
          websocketClient.send(JSON.stringify(dico));
        }
        else if (int_etape === 4){
          var dico = {"jouer":jouer};
          websocketClient.send(JSON.stringify(dico));
        }
        else if (int_etape === 6){
          var dico = {"jouer":jouer};
          websocketClient.send(JSON.stringify(dico));
        }
        else if (int_etape === 7){
          var dico = {"jouer":jouer,"action":1};
          websocketClient.send(JSON.stringify(dico));
        }
        else if (int_etape === 8){
          var dico = {"jouer":jouer};
          websocketClient.send(JSON.stringify(dico));
        }
        else if (int_etape === 9){
          var dico = {"jouer":jouer};
          websocketClient.send(JSON.stringify(dico));
        }
        else if (int_etape === 10){
          var dico = {"jouer":jouer};
          websocketClient.send(JSON.stringify(dico));
        }
      }
      jouers_contaner.appendChild(nuwMessage);
    });
  }
});
