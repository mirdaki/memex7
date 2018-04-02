let theData = browser.storage.local.get([data]);

 function checkforChild(i)
 {
	 if(theData[i+1] != null && theData[i].id == theData[i+1].parent)
	 {
		 return true;
	 }
	 
	 return false;
 }
 
 function checkforSibling(i)
 {
	 if(theData[i+1]!= null && theData[i].parent == theData[i+1].parent)
	 {
		 return true;
	 }
	 
	 return false;
 }
 
document.writeln("<div class=\"tree\">");
document.writeln("<ul>");
 
for(i = 0;i<theData.length;i++){	    
	document.writeln("<li>");
		document.writeln("<a href=\"#\">");
			document.writeln("<div class=\"img-circle\">");
				document.writeln(" <div class=\"popup\">");
					document.writeln("Title: " + theData[i].title +"\n");
					document.writeln("URL: " + theData[i].url + "\n");
				document.writeln("</div>");	
				document.writeln("<img src=" + theData[i].favicom +" alt=\"Child\">")
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
	}	
}
document.writeln("</ul>");