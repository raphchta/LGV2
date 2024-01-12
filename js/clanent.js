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
    var ip = "91.234.195";
    if( typeof $_GET()["code"] == "undefined"){
        document.location.href = 'code.html'
    }else{
        var code_p = $_GET()["code"];
        console.log(code_p);
    }
    fetch('http://91.234.195:8000/code?code=' + code_p)
    .then(response => response.json())
    .then(data => {
    data =JSON.parse(data);
    if (data['reponce'] ==="1"){
        document.location.href = 'code.html'
    }})
    if (getCookie('jouer') == ""){
        document.location.href = 'indentifent.html'
    }else{
        var sedo = getCookie('jouer')
        console.log(sedo);
    }
});
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
