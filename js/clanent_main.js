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
 function getegalite(tabA, tabB) {
   if (tabA.length !== tabB.length) return false

return tabA.every((value, index) => value === tabB[index])
}
document.addEventListener('DOMContentLoaded',function(){
    var code_p = $_GET()["code"];
    var sedo = getCookie('jouer');
    var ip = "api.loup-garou.online";
    const delay = (delayInms) => {
      return new Promise(resolve => setTimeout(resolve, delayInms));
    }
    const roles_contaner = document.querySelector("#roles");
    const jouers_contaner = document.querySelector(".persones");
    const div_jouers = document.querySelector(".persone");
    const dialog_sor = document.querySelector(".dialog-sor");
    const dialog_rejouer= document.querySelector(".dialog_rejouer");
    const text_time= document.querySelector(".temps_text");
    const dialog_if= document.querySelector(".dialog-in");
    const bouton_sover = document.querySelector("#sauver");
    const bouton_rien = document.querySelector("#rien");
    const img_rejouer = document.querySelector(".img_rejouer");
    const bouton_tuer = document.querySelector("#tuer");
    const messagescontaner = document.querySelector("#message_container")
    const sendMessageButton = document.querySelector(".bontton-message")
    var int_etape = -1;
    var reserte = 1;
    var int_etape_e = -1;
    var if_oppen = 0
    var role = "";
    var elemnt = "";
    var dialog_rejouer_ouver = 0
    var sorciere_ouver = 0
    var joure_mort = "";
    var lg = [];
    var list_jouers = [];
    var roles_avez = [12];
    var jouer_avez = [12];
    var couple = [];
    var element = "LOUP GAROU"
    var text ="ws://"+ip+":8000/"+code_p.toString();
    console.log(text);
    const websocketClient = new WebSocket(text);
    websocketClient.onmessage = function(message){
      const obj = JSON.parse(message.data);
      console.log(obj);
      int_etape_e = int_etape
      int_etape = obj['eta'];
      if (int_etape != -1 && int_etape_e ===-1){
        document.querySelector(".changer_roles").style.display = "none";
      }
      if (role === "sorcière" && int_etape === 7 && sorciere_ouver == 0){
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
      if (role === "Infect Père des Loups" && int_etape === 5 && if_oppen == 0){
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
      reserte = 0;
      var roles = obj['roles'];
      var jouers = obj['jouers'];
      jouer_avez = obj['jouers'];
      roles_avez = obj['roles'];
      if ((!(jouers.includes(sedo)) && int_etape > 0)){
        document.querySelector("body").style.filter = "grayscale(80%)";
      }else {
        document.querySelector("body").style.filter = "grayscale(0%)";
      }
      element = document.querySelector(".roles");
      element.innerHTML = "";
      roles.forEach((item, i) => {
        const nuwMessage = document.createElement("p");
        nuwMessage.innerText = item;
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
        if (lg.includes(item) && couple.includes(item)) {
            nuwMessage.classList.add("lg_couple");
            nuwMessage.innerHTML = nuwMessage.innerHTML + "❤️"
        }
        else if (couple.includes(item)){
          const img_ceure = document.createElement("img");
          nuwMessage.classList.add("couple");
          nuwMessage.innerHTML = nuwMessage.innerHTML + "❤️"
        }
        else if (lg.includes(item)){
          nuwMessage.classList.add("lg");
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
          else if (lg.includes(sedo) && int_etape === 4){
            var dico = {"jouer":jouer};
            websocketClient_main.send(JSON.stringify(dico));
          }
          else if (role === "Loup-garou blanc" && int_etape === 6){
            var dico = {"jouer":jouer};
            websocketClient_main.send(JSON.stringify(dico));
          }
          else if (role === "sorcière" && int_etape === 7){
            var dico = {"jouer":jouer,"action":1};
            websocketClient_main.send(JSON.stringify(dico));
          }
          else if (role === "assassin" && int_etape === 8){
            var dico = {"jouer":jouer};
            websocketClient_main.send(JSON.stringify(dico));
          }
          else if (int_etape === 9){
            var dico = {"jouer":jouer};
            websocketClient_main.send(JSON.stringify(dico));
          }
          else if (int_etape === 10){
            var dico = {"jouer":jouer};
            websocketClient_main.send(JSON.stringify(dico));
          }
        }
        jouers_contaner.appendChild(nuwMessage);
      });
    }
    const websocketClient_main = new WebSocket("ws://"+ip+":8000/main/"+code_p.toString()+"/"+sedo.toString());
    websocketClient_main.onopen = function(){
        bouton_sover.addEventListener('click', function(e){
        dico = {"action":2}
        websocketClient_main.send(JSON.stringify(dico));
        dialog_sor.close("animalNotChosen");
      });
      document.querySelector(".rejoure").addEventListener('click', function(e){
          websocketClient_main.send("/re");
          document.querySelector(".rejoure").style.display = "none";
      });
      document.querySelector(".changer_roles").addEventListener('click', function(e){
        document.querySelector(".changer_roles").style.display = "none";
      });
      function seed_message_chat(){
        var stl = messageInput.value
        dddd = {"message":stl}
        websocketClient_main.send(JSON.stringify(dddd));
      }
      sendMessageButton.onclick =function(){
          seed_message_chat();
      };
      document.querySelector(".inf").addEventListener('click', function(e){
          dico = {"action":1}
          websocketClient_main.send(JSON.stringify(dico));
          document.querySelector(".joure_mort_if").close("animalNotChosen");
      });
      document.querySelector(".rien_in").addEventListener('click', function(e){
          dico = {"action":0}
          websocketClient_main.send(JSON.stringify(dico));
          document.querySelector(".joure_mort_if").close("animalNotChosen");
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
        if (message.data == "ops"){
          return 0;
        }
        if (message.data === "re"){
          document.querySelector(".temps_text").style.display = "none";
          document.querySelector(".rejoure").style.display = "block";
          return 0;
        }
        if (message.data === "re1"){
          document.querySelector(".changer_roles").href ="./changer.html?code=" + encodeURIComponent(code_p);
          document.querySelector(".changer_roles").style.display = "block";
          return 0
        }
        if (message.data === '{"message": "la patri a comencer", "envoyer": "le narrateur", "styl": ""}'){
          document.querySelector(".changer_roles").style.display = "none";
        }
        const obj = JSON.parse(message.data);
        if ( typeof obj['message'] != "undefined" &&  typeof obj['envoyer'] != "undefined" && typeof obj['styl'] != "undefined"){
          const nuwMessage = document.createElement("p");
          const obj = JSON.parse(message.data);
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
        if( typeof obj['presence'] != "undefined"){
          if(obj['presence'] == 1){
            element = document.querySelector("body");
            element.innerHTML = "";
            const nuwMessage = document.createElement("img");
            var text = "img/carte/"+role+'.svg';
            nuwMessage.src=text;
            nuwMessage.classList.add("img_toto");
            element.appendChild(nuwMessage);
          }
        }
        joure_mort_so = obj["mort"]
        joure_mort_if = obj["mort_if"]
        text_mort = document.querySelector(".joure_mort_if");
        text_mort.innerHTML = joure_mort_if;
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
        text_mort = document.querySelector(".joure_mort_so");
        text_mort.innerHTML = joure_mort_so;
        if( typeof obj["role"] != "undefined" && role != obj["role"]){
          role = obj["role"];
          console.log(role);
          var text = "img/carte/"+role+'.svg';
          document.querySelector(".cart_img").src=text;
        }

        if( typeof obj["couple"] != "undefined" && couple != obj["couple"]){
          couple = obj["couple"];
          reserte = 1;
          if (couple.length >= 2){
            couple = obj["couple"];
            elemnt = document.getElementById(couple[0]);
            elemnt.classList.add("couple");
            elemnt = document.getElementById(couple[1]);
            elemnt.classList.add("couple");
          }
        }
        if( typeof obj['lg'] != "undefined" && lg!= obj['lg']){
          if(obj['lg'].length != 0){
            lg = obj['lg']
            reserte = 1;
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
