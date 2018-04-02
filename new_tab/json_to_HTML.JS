function onError(error) {
  console.log(`Error: ${error}`);
}

let getData = browser.storage.local.get();
	getData.then(onGot, onError);

function onGot(theData) {	
 function checkforChild(i)
 {
	 if(theData[i+1] != null && theData.data.nodes[i].id == theData[i+1].parent)
	 {
		 return true;
	 }
	 
	 return false;
 }
 
 function checkforSibling(i)
 {
	 if(theData[i+1]!= null && theData.data.nodes[i].parent == theData[i+1].parent)
	 {
		 return true;
	 }
	 
	 return false;
 }
 
document.writeln("<div class=\"tree\">");
document.writeln("<ul>");
console.log("The data length is " + theData.data.nodes.length + "\n");

 for(i = 0;i<theData.data.nodes.length;i++){	    
	document.writeln("<li>");	
		document.writeln("<a href=" + theData.data.nodes[i].url +">");
			document.writeln("<div class=\"img-circle\">");
				document.writeln(" <div class=\"popup\">");
					document.writeln("Title: " + theData.data.nodes[i].title +"\n");
					document.writeln("URL: " + theData.data.nodes[i].url + "\n");
				document.writeln("</div>");	
				document.writeln("<img src=" + theData.data.nodes[i].favicom +" alt=\"Child\">")
			document.writeln("</div>");
		document.writeln("</a>");				
			
	if(checkforChild(i))	
	{
		document.writeln("<ul>");
	} 			
	else
	{
		document.writeln("</li>");
	} 	
				
	if (!checkforSibling(i) && !checkforChild(i))
	{
	document.writeln("</ul>");	
	document.writeln("</li>");	
	}	
}
document.writeln("</ul>");
document.writeln("</div>");
console.log(theData.data.nodes[1].id);
}