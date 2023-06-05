var popupCenter = function(url, title, width, height){
    var popupWidth = width || 640;
    var popupHeight = height || 320;
    var windowLeft = window.screenLeft || window.screenX;
    var windowTop = window.screenTop || window.screenY;
    var windowWidth = window.innerWidth || document.documentElement.clientWidth;
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    var popupLeft = windowLeft + windowWidth / 2 - popupWidth / 2 ;
    var popupTop = windowTop + windowHeight / 2 - popupHeight / 2;
    var popup = window.open(url, title, 'scrollbars=yes, width=' + popupWidth + ', height=' + popupHeight + ', top=' + popupTop + ', left=' + popupLeft);
    popup.focus();
    return true;
};
function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace(
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;
	}
	return vars;
}
const text_code = document.querySelector(".text_code");
const updateButton = document.getElementById("boton_open");//boton_open
const updateButton_close = document.getElementById("boton_close");
const updateButton_copier = document.getElementById("bottun_copier");
const dialog = document.getElementById("dialog");
if($_GET()["code"] = undefined){
    document.location.href = 'code.html'
}else{
    var code_p = $_GET()["code"];
    text_code.innerHTML = code_p
    console.log(code_p);
}
const url_partager = "file:///C:/Users/Rapha%C3%ABl/Documents/code/html/LGV2/indentifent.html?code="+code_p;
updateButton.addEventListener('click', function(e){
    dialog.showModal();
});

updateButton_close.addEventListener('click', function(e){
    dialog.close("animalNotChosen");
});
updateButton_copier.addEventListener('click', function(e){
    navigator.clipboard.writeText(url_partager);
});
document.querySelector('.img_WhatsApp').addEventListener('click', function(e){
    var shareUrl = "https://api.whatsapp.com/send/?text=" + encodeURIComponent(url_partager);
    popupCenter(shareUrl, "Partager sur facebook");
});
document.querySelector('.img_mail').addEventListener('click', function(e){
    var shareUrl = "https://mail.google.com/mail/u/0/?fs=1&tf=cm&source=mailto&body=" + encodeURIComponent(url_partager);
    popupCenter(shareUrl, "Partager sur facebook");
});
