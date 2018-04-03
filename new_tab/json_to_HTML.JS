let getData = browser.storage.local.get();

getData.then(function(theData){	

 function checkforChild(i)
 {
	 if(theData.data.nodes[i].id == theData.data.nodes[i+1].parent)
	 {
		 return true;
	 }
	 
	 return false;
 }
 	
	var tree = document.createElement("d");
	document.body.appendChild(tree);
	tree.setAttribute("class", "tree");
	
	var rootul = document.createElement("ul");
	tree.appendChild(rootul);
	rootul.setAttribute("id" ,"root");
	
for(i = 0;i<theData.data.nodes.length;i++){
	var li = document.createElement("li");
	var getparent = document.getElementById(theData.data.nodes[i].parent);
	if(i==0)
		getparent = document.getElementById("root");
	getparent.appendChild(li);
	
	var info = document.createElement("a");
	li.appendChild(info);
	var refurl = "" + theData.data.nodes[i].url;
	info.setAttribute("href", refurl);	
	
	var imgcircle = document.createElement("d");
	info.appendChild(imgcircle);
	imgcircle.setAttribute("class","img-circle");
	
	var popup = document.createElement("d");
	imgcircle.appendChild(popup);
	popup.setAttribute("class","popup");
	
	var title = document.createTextNode("Title: " + theData.data.nodes[i].title + "\n");
    popup.appendChild(title);
	
	var url = document.createTextNode("URL: " + theData.data.nodes[i].url +"\n");
	popup.appendChild(url);
	
	var img = document.createElement("img");
	imgcircle.appendChild(img);
	var favicon = "" + theData.data.nodes[i].favicon;
	img.setAttribute("src",favicon);

	if(i != theData.data.nodes.length-1)
	{
		var childul = document.createElement( "ul");
		li.appendChild(childul);	
		var idno = "" +theData.data.nodes[i].id;
		childul.setAttribute("id", idno);
		
	} 				
				
	}	
});
console.log("End of the Line");
