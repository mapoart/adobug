/* 
 * title: Adobe After Effects External Debugger/Logger (Adobug)
 * TEST FILE
 * author: Marcin Polak mapoart@gmail.com
 * version: 1.11
 * date: 06.03.2019, update 24.03.2019
 */

//include debugger file
$.evalFile((new File($.fileName)).parent.toString()+"/adobug.jsx");

//use debug for strings, arrays or objects


adobug(rgb("MapoART Adobug 1.11 message from the console:" + BridgeTalk.appSpecifier,39,106,255,12,33,79));

var obj = {x:1, y: "string", nestedObject: {alpha:'nested'}};
adobug(rgb(obj,140,220,200,4,20,40));

var arr = [1,2,11111,"MapoArt Debugger: ", BridgeTalk.appSpecifier];
adobug(rgb(arr,255,1,0,20,0,0));

var reflectMethods = Window.reflect.methods;
adobug(rgb("Reflect Object's Methods:",1,1,1,20,255,0));
adobug(rgb(reflectMethods, 0,200,100,20,30,0)); 

var reflectProperties = Window.reflect.properties;
adobug(rgb("Reflect Object's Properties:",0,0,0,255,30,0));
adobug(reflectProperties); // default colors