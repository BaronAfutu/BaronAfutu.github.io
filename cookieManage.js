function setCookie(name,val){
	var expireDate = new Date();
    expireDate.setMonth(expireDate.getMonth()+6);
    
	document.cookie = name+"=" +val+ ";path=/;expires=" + expireDate.toGMTString();
}

function showCookies(){
	var outMsg = "";
	
	if(document.cookies == ""){
		outMsg = "There are no cookies here";
	}
	else{
		var i;
		var thisCookie = document.cookie.split("; ");
		
		for(i=0; i<thisCookie.length; i++){
			outMsg += "Cookie name is '" + thisCookie[i].split("=")[0];
			outMsg += "', and the value is '" + thisCookie[i].split("=")[1]+ "'<br />";
		}
	}
	document.write(outMsg);
}

function cookieVal(cookieName){
	var theCookie = document.cookie.split("; ");
	var i;
	var a = theCookie.length;
	for (i=0; i<a; i++){
		if(cookieName == theCookie[i].split("=")[0]){
			return theCookie[i].split("=")[1];
		} 
	}
	return 0;
}

function cookieDelete(){
	var cookieCt = 0;
	
	if(document.cookie != "" && confirm("Do you want to Delete the Cookies?")){
		var theCookie = document.cookie.split("; ");
		cookieCt = theCookie.length;
		
		var expireDate = new Date();
		expireDate.setDate(expireDate.getDate -1);
		
		var i;
		for(i=1; i<cookieCt; i++){
			document.cookie = theCookie[i].split("=")[0] + "=;path=/;expires=" + expireDate.toGMTString();
		}
		document.write("Number of cookies deleted: " + cookieCt);
	}
}