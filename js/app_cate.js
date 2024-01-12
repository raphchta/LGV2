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
var code_p = $_GET()["code"];
const items = document.querySelectorAll(".img_role_caroucle")
const nbSlide = items.length;
var class_de_cart_a = ".img_assassin"
const content = document.querySelector(".affichage_role_choisi")
var dico_roles = {
    "cupidon":0,
    "petite-fille":0,
    "Infect Père des Loups":0,
    "loup-garou blanc":0,
    "sorcière":0,
    "prostituée":0,
    "voyante":0,
    "assassin":0,
    "bouffon":0,
    "mercenaire":0,
    "loup-garou":0,
    "villageois":0,
    "presence":0,
};
var span_lg = ""
var coponet_lg = []
var coponet_V = []
var dico_div = {}
document.querySelector(".ico_assassin").addEventListener('click', function myFunction() {
  if (class_de_cart_a !=".img_assassin"){
    document.querySelector(class_de_cart_a).classList.remove("active")
    document.querySelector(".img_assassin").classList.add("active")
    class_de_cart_a = ".img_assassin"
  }
})
document.querySelector(".ico_bouffon").addEventListener('click', function myFunction() {
  if (class_de_cart_a !=".img_bouffon"){
  document.querySelector(class_de_cart_a).classList.remove("active");
  document.querySelector(".img_bouffon").classList.add("active");
  class_de_cart_a = ".img_bouffon"
}
})
document.querySelector(".ico_Infect_Père_des_Loups").addEventListener('click', function myFunction() {
  if (class_de_cart_a !=".img_Infect_Père_des_Loups"){
  document.querySelector(class_de_cart_a).classList.remove("active");
  document.querySelector(".img_Infect_Père_des_Loups").classList.add("active");
  class_de_cart_a = ".img_Infect_Père_des_Loups"
}
})
document.querySelector(".ico_loup-garou_blanc").addEventListener('click', function myFunction() {
  if (class_de_cart_a !=".img_loup-garou_blanc"){
  document.querySelector(class_de_cart_a).classList.remove("active");
  document.querySelector(".img_loup-garou_blanc").classList.add("active");
  class_de_cart_a = ".img_loup-garou_blanc"
}
})
document.querySelector(".ico_cupidon").addEventListener('click', function myFunction() {
  if (class_de_cart_a !=".img_cupidon"){
  document.querySelector(class_de_cart_a).classList.remove("active")
  document.querySelector(".img_cupidon").classList.add("active")
  class_de_cart_a = ".img_cupidon"
}
})
document.querySelector(".ico_loup-garou").addEventListener('click', function myFunction() {
  if (class_de_cart_a !=".img_loup-garou"){
  document.querySelector(class_de_cart_a).classList.remove("active")
  document.querySelector(".img_loup-garou").classList.add("active")
  class_de_cart_a = ".img_loup-garou"
}
})
document.querySelector(".ico_petite-fille").addEventListener('click', function myFunction() {
  if (class_de_cart_a !=".img_petite-fille"){
  document.querySelector(class_de_cart_a).classList.remove("active")
  document.querySelector(".img_petite-fille").classList.add("active")
  class_de_cart_a = ".img_petite-fille"
}
})
document.querySelector(".ico_prostituee").addEventListener('click', function myFunction() {
  if (class_de_cart_a !=".img_prostituee"){
    document.querySelector(class_de_cart_a).classList.remove("active")
    document.querySelector(".img_prostituee").classList.add("active")
    class_de_cart_a = ".img_prostituee"
}
})

document.querySelector(".ico_sorciere").addEventListener('click', function myFunction() {
  if (class_de_cart_a !=".img_sorciere"){
  document.querySelector(class_de_cart_a).classList.remove("active")
  document.querySelector(".img_sorciere").classList.add("active")
  class_de_cart_a = ".img_sorciere"
}
})
document.querySelector(".ico_voyante").addEventListener('click', function myFunction() {
  if (class_de_cart_a !=".img_voyante"){
  document.querySelector(class_de_cart_a).classList.remove("active")
  document.querySelector(class_de_cart_a).classList.add("deatif")
  document.querySelector(".img_voyante").classList.add("active")
  class_de_cart_a = ".img_voyante"
}
})
document.querySelector(".ico_villageois").addEventListener('click', function myFunction() {
  if (class_de_cart_a !=".img_villageois"){
  document.querySelector(class_de_cart_a).classList.remove("active")
  document.querySelector(class_de_cart_a).classList.add("deatif")
  document.querySelector(".img_villageois").classList.add("active")
  class_de_cart_a = ".img_villageois"
}
})
document.querySelector(".ico_mercenaire").addEventListener('click', function myFunction() {
  if (class_de_cart_a !=".img_mercenaire"){
  document.querySelector(class_de_cart_a).classList.remove("active")
  document.querySelector(class_de_cart_a).classList.add("deatif")
  document.querySelector(".img_mercenaire").classList.add("active")
  class_de_cart_a = ".img_mercenaire"
}})

document.querySelector(".add").addEventListener('click', function myFunction() {
  cart_atuelle = document.querySelector(".active").id
  if (!(Object.keys(dico_div).includes(cart_atuelle))){
  const nuwMessage = document.createElement("div");
  nuwMessage.classList.add("div_séléte");
  const img = document.createElement("img");
  img.src = document.querySelector(class_de_cart_a).src
  img.classList.add("image_séléte");
  content.appendChild(nuwMessage);
  nuwMessage.appendChild(img);
  span = document.createElement("samp");
  span.classList.add("bulle");
  span.classList.add("quter");
  span.id = cart_atuelle;
  span.innerHTML = "X"
  if (cart_atuelle =="loup-garou"){
    coponet_lg = nuwMessage
    span.addEventListener('click', function myFunction() {
    if (dico_roles["loup-garou"] == 1){
      dico_div["loup-garou"].remove();
      delete dico_div["loup-garou"];
      dico_roles["loup-garou"] = 0;
    }
    else if (dico_roles["loup-garou"] == 2) {
      dico_roles["loup-garou"] -= 1;
      span_lg.remove();
    }
    else {
      dico_roles["loup-garou"] -= 1;
      span_lg.innerHTML = dico_roles["loup-garou"];
    }})
  }
  else if (cart_atuelle =="villageois") {
    coponet_V = nuwMessage
    span.addEventListener('click', function myFunction() {
    if (cart_atuelle =="villageois"){
      if (dico_roles["villageois"] == 1){
        dico_div["villageois"].remove();
        delete dico_div["villageois"];
        dico_roles["villageois"] = 0;
      }
      else if (dico_roles["villageois"] == 2) {
        dico_roles["villageois"] -= 1;
        span_v.remove();
      }
      else {
        dico_roles["villageois"] -= 1;
        span_v.innerHTML = dico_roles["villageois"];
      }
    }})
  }
  else {
    dico_roles[cart_atuelle] = 1;
    span.addEventListener('click', function myFunction(e) {
        dico_div[e["target"].id].remove();
        delete dico_div[e["target"].id];
        dico_roles[e["target"].id] = 0;
      })
  }
  nuwMessage.appendChild(span);
  dico_div[cart_atuelle] = nuwMessage;
}
if (cart_atuelle =="loup-garou"){
  if (dico_roles["loup-garou"] == 0){
    dico_roles["loup-garou"] = 1;
  }
  else if (dico_roles["loup-garou"] == 1) {
    dico_roles["loup-garou"] += 1;
    span_lg = document.createElement("samp");
    span_lg.classList.add("bulle");
    span_lg.innerHTML = dico_roles["loup-garou"];
    coponet_lg.appendChild(span_lg);
  }
  else {
    dico_roles["loup-garou"] += 1;
    span_lg.innerHTML = dico_roles["loup-garou"];
  }
}
if (cart_atuelle =="villageois"){
  if (dico_roles["villageois"] == 0){
    dico_roles["villageois"] = 1;
  }
  else if (dico_roles["villageois"] == 1) {
    dico_roles["villageois"] += 1;
    span_v = document.createElement("samp");
    span_v.classList.add("bulle");
    span_v.innerHTML = dico_roles["villageois"];
    coponet_V.appendChild(span_v);
  }
  else {
    dico_roles["villageois"] += 1;
    span_v.innerHTML = dico_roles["villageois"];
  }
}});
document.querySelector(".crere_par").addEventListener('click', function myFunction() {
  if (document.querySelector(".presence").checked){
    dico_roles["presence"]=1
  }
  if (document.querySelector(".loup_boure").checked){
    dico_roles["loup_boure"]= parseFloat(document.querySelector(".loup_boure_poursans").value);
    console.log(dico_roles);
  }
  if (document.querySelector(".lome").checked) {
    dico_roles["prostituée"]=0;
    dico_roles["prostituee"]=1;
  }
  fetch('http://91.234.195:8000/changer_role?code='+ encodeURIComponent(code_p)+'&' + 'roles='+encodeURIComponent(JSON.stringify(dico_roles)))
  .then(response => response.json())
  .then(data => {
    data =JSON.parse(data);
    if (data['reponce'] ==="0"){
      document.location.href ="./indentifent.html?code=" + encodeURIComponent(data["code"]);
  }})
})
