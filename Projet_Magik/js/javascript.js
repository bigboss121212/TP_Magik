const applyStyles = iframe => {
	let styles = {
		fontColor : "#333",
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
