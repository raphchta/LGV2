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
    var code_p = $_GET()["code"];
    var sedo = getCookie('jouer');
    var ip = "192.168.1.15";
    const delay = (delayInms) => {
      return new Promise(resolve => setTimeout(resolve, delayInms));
    }
    const roles_contaner = document.querySelector("#roles");
    const jouers_contaner = document.querySelector(".persones");
    const div_jouers = document.querySelector(".persone");
    const dialog_sor = document.querySelector(".dialog-sor");
    const dialog_rejouer= document.querySelector(".dialog_rejouer");
    const text_time= document.querySelector(".temps_text");
    const messagescontaner = document.querySelector("#message_container")
    const bouton_sover = document.querySelector("#sauver");
    const bouton_rien = document.querySelector("#rien");
    const img_rejouer = document.querySelector(".img_rejouer");
    const bouton_tuer = document.querySelector("#tuer");
    var int_etape = -1;
    var int_etape_e = -1;
    var role = "";
    var elemnt = "";
    var dialog_rejouer_ouver = 0
    var sorciere_ouver = 0
    var joure_mort = "";
    var lg = [];
    var list_jouers = [];
    var couple = [];
    var element = "LOUP GAROU"
    var text = "ws://"+ip+":"+code_p.toString()+"/";
    console.log(text);
    const websocketClient = new WebSocket(text);
    websocketClient.onmessage = function(message){
      const obj = JSON.parse(message.data);
      int_etape = obj['eta'];
      console.log(message.data);
      if (role === "sorcière" && int_etape === 5 && sorciere_ouver == 0){
        try {
            sorciere_ouver = 1
            dialog_sor.showModal();
        } catch (e) {
            console.log(e);
        }
      }
      if (int_etape != 5 && sorciere_ouver == 1){
        sorciere_ouver = 0
      }
      var roles = obj['roles'];
      var jouers = obj['jouers'];
      element = document.querySelector(".roles");
      element.innerHTML = "";
      roles.forEach((item, i) => {
        const nuwMessage = document.createElement("p");
        nuwMessage.innerHTML = item;
        nuwMessage.classList.add("role");
        roles_contaner.appendChild(nuwMessage);
        nuwMessage.onclick= function() {

        }
      });
      element = document.querySelector(".persones");
      element.innerHTML = "";
      jouers.forEach((item, i) => {
        const nuwMessage = document.createElement("p");
        nuwMessage.innerHTML = item;
        if (sedo == item){
            nuwMessage.classList.add("my");
        }
        if (list_jouers.length === 1){
            if (list_jouers[0] == item){
              nuwMessage.classList.add("slete");
            }
          }
        nuwMessage.classList.add("persone");
        nuwMessage.setAttribute('id',item);
        nuwMessage.onclick= function() {
          var jouer = nuwMessage.textContent;
          if (role === "cupidon" && int_etape === 1){
            if (list_jouers.length === 0){
                list_jouers = [jouer];
                nuwMessage.classList.add("slete");
              }
              else if (list_jouers.length ===1 && list_jouers[0] != jouer){
                var dico = {"jouer1":list_jouers[0],"jouer2":jouer};
                list_jouers = [];
                websocketClient_main.send(JSON.stringify(dico));
              }
          }
          else if (role === "prostituée" && int_etape === 2){
              var dico = {"jouer":jouer};
              websocketClient_main.send(JSON.stringify(dico));
            }
          else if (role === "voyante" && int_etape === 3){
            var dico = {"jouer":jouer};
            websocketClient_main.send(JSON.stringify(dico));
          }
          else if (role === "loup-garou" && int_etape === 4){
            var dico = {"jouer":jouer};
            websocketClient_main.send(JSON.stringify(dico));
          }
          else if (role === "sorcière" && int_etape === 5){
            var dico = {"jouer":jouer,"action":1};
            websocketClient_main.send(JSON.stringify(dico));
          }
          else if (role === "assassin" && int_etape === 6){
            var dico = {"jouer":jouer};
            websocketClient_main.send(JSON.stringify(dico));
          }
          else if (int_etape === 7){
            var dico = {"jouer":jouer};
            websocketClient_main.send(JSON.stringify(dico));
          }
          else if (int_etape === 8){
            var dico = {"jouer":jouer};
            websocketClient_main.send(JSON.stringify(dico));
          }
        }
        jouers_contaner.appendChild(nuwMessage);
      });
    }
    const websocketClient_main = new WebSocket("ws://"+ip+":"+code_p.toString()+"/main");
    websocketClient_main.onopen = function(){
      websocketClient_main.send(JSON.stringify({"jouer":sedo}));
      bouton_sover.addEventListener('click', function(e){
          dico = {"action":2}
          websocketClient_main.send(JSON.stringify(dico));
          dialog_sor.close("animalNotChosen");
      });
      bouton_rien.addEventListener('click', function(e){
          dico = {"action":0}
          websocketClient_main.send(JSON.stringify(dico));
          dialog_sor.close("animalNotChosen");
      });
      bouton_tuer.addEventListener('click', function(e){
        dialog_sor.close("animalNotChosen");
      });
    };
    websocketClient_main.onmessage = function(message){
        const obj = JSON.parse(message.data);
        console.log(obj);
        role = obj["role"];
        couple = obj["couple"]
        lg = obj['lg']
        joure_mort = obj["mort"]
        time = obj["temps"]
        pop = obj["pop"]
        if( typeof pop != "undefined"){
          if (pop[0] ==0){
            bouton_sover.style.display = none;
          }
          if (pop[1] ==0){
            bouton_tuer.style.display = none;
          }
        }
        if( typeof time != "undefined"){
          text_time.style.display = "block";
          text_time.innerHTML = time;
          if (parseFloat(time) < 0.10){
            text_time.style.color = "red"
          }
          else {
            text_time.style.color = "white";
          }
        }
        else {
          text_time.style.display = "none";
        }
        text_mort = document.querySelector(".joure_mort");
        text_mort.innerHTML = joure_mort;
        if( typeof role != "undefined"){
          var text = "img/carte/"+role+'.svg';
          document.querySelector(".cart_img").src=text;
        }

        if( typeof couple != "undefined"){
          if (couple.length == 2){
            elemnt = document.getElementById(couple[0]);
            elemnt.classList.add("couple");
            elemnt = document.getElementById(couple[1]);
            elemnt.classList.add("couple");
          }
        }
        if( typeof lg != "undefined"){
          if(lg.length != 0){
            lg.forEach((item, i) => {
              elemnt = document.getElementById(lg[i]);
              elemnt.classList.add("lg");
            });
          }
        }
        delay(100000000000000000000000);
        websocketClient_main.send("");
      };
},false);
