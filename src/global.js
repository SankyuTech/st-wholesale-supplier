var api_endpoint = "https://www.st-wholesale.sankyutech.com.my/api/";

function apiRouteSetting($path){
	
	let full_route = api_endpoint + $path;
	return full_route;
}