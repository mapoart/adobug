/* 
 * title: ADOBUG (Adobe Creative Cloud Apps External Debugger/Logger)
 * author: Marcin Polak mapoart@gmail.com
 * version: 1.11
 * date: 06.03.2019
 */

/*
* Settings
*/
var adobugEnable = true;
var adobugHost = "localhost";
var adobugPort = 8080;
var colorContrastFg = 2;
var colorContrastBg = 2;
var appsWithSocketClass = ['aftereffects','bridge','indesign','photoshop'];

/*
 * 23.03.2019 fix: 'JSON is undefined' (JSON was injected globally earlier)
 * We need to import JSON: https://github.com/douglascrockford/JSON-js
 * Fix for JSON bug found in tutorial from Lloyd Alvarez:  https://www.youtube.com/watch?v=EYvCAI9L0AE
*/ 
"object"!=typeof JSON&&(JSON={}),function(){"use strict";var rx_one=/^[\],:{}\s]*$/,rx_two=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,rx_three=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,rx_four=/(?:^|:|,)(?:\s*\[)+/g,rx_escapable=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,rx_dangerous=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta,rep;function f(t){return t<10?"0"+t:t}function this_value(){return this.valueOf()}function quote(t){return rx_escapable.lastIndex=0,rx_escapable.test(t)?'"'+t.replace(rx_escapable,function(t){var e=meta[t];return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}function str(t,e){var r,n,o,u,f,a=gap,i=e[t];switch(i&&"object"==typeof i&&"function"==typeof i.toJSON&&(i=i.toJSON(t)),"function"==typeof rep&&(i=rep.call(e,t,i)),typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";if(gap+=indent,f=[],"[object Array]"===Object.prototype.toString.apply(i)){for(u=i.length,r=0;r<u;r+=1)f[r]=str(r,i)||"null";return o=0===f.length?"[]":gap?"[\n"+gap+f.join(",\n"+gap)+"\n"+a+"]":"["+f.join(",")+"]",gap=a,o}if(rep&&"object"==typeof rep)for(u=rep.length,r=0;r<u;r+=1)"string"==typeof rep[r]&&(o=str(n=rep[r],i))&&f.push(quote(n)+(gap?": ":":")+o);else for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(o=str(n,i))&&f.push(quote(n)+(gap?": ":":")+o);return o=0===f.length?"{}":gap?"{\n"+gap+f.join(",\n"+gap)+"\n"+a+"}":"{"+f.join(",")+"}",gap=a,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},Boolean.prototype.toJSON=this_value,Number.prototype.toJSON=this_value,String.prototype.toJSON=this_value),"function"!=typeof JSON.stringify&&(meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,r){var n;if(indent=gap="","number"==typeof r)for(n=0;n<r;n+=1)indent+=" ";else"string"==typeof r&&(indent=r);if((rep=e)&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),"function"!=typeof JSON.parse&&(JSON.parse=function(text,reviver){var j;function walk(t,e){var r,n,o=t[e];if(o&&"object"==typeof o)for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(void 0!==(n=walk(o,r))?o[r]=n:delete o[r]);return reviver.call(t,e,o)}if(text=String(text),rx_dangerous.lastIndex=0,rx_dangerous.test(text)&&(text=text.replace(rx_dangerous,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),rx_one.test(text.replace(rx_two,"@").replace(rx_three,"]").replace(rx_four,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")})}();

/* Allows to generate text with colors for the console eg: rgb("My Debug/Log text here", 1, 255, 1)*/
/* TODO?: fix the 0 problem. 1 needs to be passed to be nearly black color */
function rgb(t, r, g, b, bgr, bgg, bgb){
    if(Object.prototype.toString.call(t) === '[object Array]'){
        t = t.join(",");
    }       
    
    if(typeof t === 'object'){
        t = JSON.stringify(t);
    }	
    
    if(r|g|b){
		//adding foreground
		t='\x1b[38;'+colorContrastFg+';' + (r+""||255) + ';' + (g+""||255) + ';' + (b+""||255) + 'm' + t;
	}
	
	if(bgr|bgg|bgb){
		//adding background color
		t='\x1b[48;'+colorContrastBg+';' + (bgr+""||255) + ';' + (bgg+""||255) + ';' + (bgb+""||255) + 'm' + t;
	}
	
	// And we reset the output to default color;
	return  t + '\x1b[0m';
}

/* 
 * Specify the colors for the application individually BridgeTalk.appName 
 * aftereffects,ame,audition,bridge,dreamweaver,estoolkit,illustrator,indesign,photoshop,premierepro,rush
*/
function appcolor(appName){	
    switch(appName){
		case 'aftereffects':
			return [199,137,247,31,1,63];
		case 'indesign':
			return [255,71,149,38,1,15];
         case 'premierepro': // Socket is undefined
			return [231,122,255,42,0,51];
         case 'estoolkit':
			return [74,16,23,219,219,219];
         case 'audition': // Socket is undefined
			return [0,242,202,0,38,32];
         case 'bridge':
			return [255,190,6,38,28,1];
         case 'illustrator': // Socket is undefined
			return [255,190,6,38,28,1];
         case 'photoshop': // Socket is undefined
			return [17,191,243,0,29,38];
	}
}

/* We create connection to send the debuging information to the external application */
var conn = new Socket;

//Include function in your script
function adobug(msg){
	if(adobugEnable && conn.open(adobugHost+":"+adobugPort)){      
         if(Object.prototype.toString.call(msg) === '[object Array]'){
             msg = msg.join(",");
         }   

         if(typeof msg === 'object'){
            msg = JSON.stringify(msg);
         }
         
         var appColor = appcolor(BridgeTalk.appName);
         msg = rgb(BridgeTalk.getDisplayName(BridgeTalk.appSpecifier) + ":",appColor[0],appColor[1],appColor[2],appColor[3],appColor[4],appColor[5]) + msg;
     
         var request = 
			"GET /" + 'debug?msg=' + escape(msg) + " HTTP/1.0\n" +
			"User-Agent: MapoArt Adobe Creative Cloud Apps Debugger/Logger Script\n" +
			"Connection: keep-alive\n\n";  
			
		conn.write(request);
		response = conn.read();
		conn.close();
	}
	
	return msg;
}   

function convMessage(v){
        
    
        
}