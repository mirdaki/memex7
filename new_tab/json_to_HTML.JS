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
	
	var baseul = document.createElement("ul");
	tree.appendChild(baseul);
	baseul.setAttribute("id" ,"base");
	
	var rootli = document.createElement("li");
	baseul.appendChild(rootli);
	rootli.setAttribute("name", "base"); 
	
	var licircle = document.createElement("d");
	rootli.appendChild(licircle);
	licircle.setAttribute("class","img-circle");
	licircle.setAttribute("id","rect");
	
	var img = document.createElement("img");
	licircle.appendChild(img);
	var favicon = "";
	img.setAttribute("src",favicon);
	
	var rootul = document.createElement("ul");
	rootli.appendChild(rootul);
	rootul.setAttribute("id" ,"-1");
	
	
for(i = 0;i<theData.data.nodes.length;i++){
	var li = document.createElement("li");
	var getparent = document.getElementById(theData.data.nodes[i].parent);
	getparent.appendChild(li);
	getparent.setAttribute("name", "parent");
	
	var info = document.createElement("a");
	li.appendChild(info);
	var refurl = "" + theData.data.nodes[i].url;
	info.setAttribute("href", refurl);	
	info.setAttribute("target","_blank");
	
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
		childul.setAttribute("name", "solo");
		
	} 				
				
	}	
	
	var elem = document.getElementsByName("solo");
	
var i;	
	for (i = elem.length-1; i > -1; i--) {
		console.log(i + " Deleted");
		elem[i].parentNode.removeChild(elem[i]);
		}
});
