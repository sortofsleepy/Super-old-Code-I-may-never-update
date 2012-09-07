	//create the element for the title
	var title = document.createElement("h1");
	title.innerHTML = obj.work.title;
	
	//create the content section
	var content = document.createElement("section");
	content.className = "work work-"+obj.work.title;
	content.innerHTML = obj.work.content;
	
	//create the media
	var media = document.createElement("section");
	media.className = "media media-"obj.work.title;
	media.innerHTML = obj.work.media;
	
	
	//append everything to the list
	li.appendChild(title);
	li.appendChild(content);
	li.appendChild(media);