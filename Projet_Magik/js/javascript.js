// window.addEventListener("load", () => { //necessaire en js pour lancer cette fonction une fois que la page est load
//     applyStyles();
// })


const applyStyles = iframe => {
	let styles = {
		fontColor : "#333",
		//backgroundColor : "rgba(0, 0, 0, 0.2)",
		// fontGoogleName : "Sofia",
		fontSize : "20px",
		hideIcons : false, //(or true),
		inputBackgroundColor : "#333",
		inputFontColor : "white",
		height : "600px",
		memberListFontColor : "#ff00dd",
		memberListBackgroundColor : "white",
		opacity : "0.5",
        paddingTop: "200px"
	}
	
	setTimeout(() => {
		iframe.contentWindow.postMessage(JSON.stringify(styles), "*");	
}, 100);
}
