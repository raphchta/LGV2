const input_submit = document.querySelector(".boutton");
let i = 0;
input_submit.addEventListener('click', function myFunction() {
    var dico_roles = {
        "cupidon":0,
        "petite-fille":0,
        "sorcière":0,
        "prostituée":0,
        "voyante":0,
        "assassin":0,
        "bouffon":0,
        "mercenaire":0,
        "loup-garou":0,
        "villageois":0,
    };
  if (true == document.querySelector(".cupidon").checked){
    dico_roles["cupidon"] = 1;
  }
  if (true == document.querySelector(".petite_fille").checked){
    dico_roles["petite-fille"] = 1;
  }
  if (true == document.querySelector(".sorciere").checked){
    dico_roles["sorcière"] = 1;
  }
  if (true == document.querySelector(".prostituée").checked){
    dico_roles["prostituée"] = 1;
  }
  if (true == document.querySelector(".voyante").checked){
    dico_roles["voyante"] = 1;
  }
  if (true == document.querySelector(".assassin").checked){
    dico_roles["assassin"] = 1;
  }
  if (true == document.querySelector(".bouffon").checked){
    dico_roles["bouffon"] = 1;
  }
  if (true == document.querySelector(".merconaire").checked){
    dico_roles["mercenaire"] = 1;
  }
  if (true == document.querySelector(".loup-garou").checked){
    dico_roles["loup-garou"] = parseInt(document.querySelector(".nombre-loup-garou").value);
  }
  if (true == document.querySelector(".villageois").checked){
    dico_roles["villageois"] = parseInt(document.querySelector(".nombre_villageois").value);
  }
  let j = 0
  for (const property in dico_roles) {
    if (dico_roles[property] !==  0){
        j = 1;
    }
  }
  if (j == 0){
        if (i == 0){
            i = 1;
            const messagescontaner = document.querySelector(".div_titre")
            messagescontaner.style.textAlign = "center";
            const nuwMessage = document.createElement("p");
            nuwMessage.classList.add("message_erreur");
            nuwMessage.innerHTML = "il y a pas de roles choisi.";
            nuwMessage.style.color = 'red'
            messagescontaner.appendChild(nuwMessage);
        }
        else{
            const message = document.querySelector(".message_erreur")
            message.innerHTML = "il y a pas de roles choisi.";
        }
      return
  }
  fetch('http://127.0.0.1:5000/certe?roles='+encodeURIComponent(JSON.stringify(dico_roles)))
  .then(response => response.json())
  .then(data => {
      if (data['reponce'] ==="0"){
        document.location.href ="./indentifent.html?code=" + encodeURIComponent(data["code"]);
    } else{
        if (i == 0){
            i = 1;
            const messagescontaner = document.querySelector(".div_titre")
            messagescontaner.style.textAlign = "center";
            const nuwMessage = document.createElement("p");
            nuwMessage.classList.add("message_erreur");
            nuwMessage.innerHTML = "erreur de conétion.";
            nuwMessage.style.color = 'red'
            messagescontaner.appendChild(nuwMessage);
        }else{
            const message = document.querySelector(".message_erreur")
            message.innerHTML = "erreur de conétion.";
        }
    }

  })
});
