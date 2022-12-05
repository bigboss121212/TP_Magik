window.addEventListener("load", () => { 
    applyStyles();
})

const applyStyles = iframe => {
	let styles = {
		fontColor : "#333",
		backgroundColor : "rgba(87, 41, 5, 0.2)",
		fontSize : "20px",
		hideIcons : false, //(or true),
		inputBackgroundColor : "red",
		inputFontColor : "blue",
		height : "600px",
		memberListFontColor : "#ff00dd",
		memberListBackgroundColor : "white",
		paddingTop: "200px",
		position : "absolute"
	}
	
	setTimeout(() => {
		iframe.contentWindow.postMessage(JSON.stringify(styles), "*");	
}, 100);
}