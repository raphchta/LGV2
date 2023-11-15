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
      var role= [];
      var ip = "192.168.150.108";
      var text = "ws://"+ip+":"+code_p.toString()+"/cart";
      console.log(text);
      const websocketClient = new WebSocket(text);
      websocketClient.onopen = function(){
      websocketClient.send(JSON.stringify({"jouer":sedo}));}
      websocketClient.onmessage = function(message){
        console.log(message.data);
        const obj = JSON.parse(message.data);
        if( typeof obj["role"] != "undefined" && role != obj["role"]){
          role = obj["role"];
          reserte = 1;
          var text = "img/carte/"+role+'.svg';
          document.querySelector(".cart_img").src=text;
        }
      }
});
