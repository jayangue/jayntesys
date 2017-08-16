window.onload = function() {
    document.body.setAttribute("id","body");
    dom.ac("body");
    interface.start();
    moduleload(); //Initializing jayntesys-module.js
};
//=========================================================================
//============================ INTERFACE ==================================
//=========================================================================
(function(window){
    function interfacefunctions() {
        var f = {};
        
        f.currentmain = 0;
        
        f.start = function() {
            
            interface.clean();
            
            //CREATE GLOBAL DIVS
            dom.us("DIV","divreceive","body");
            dom.us("DIV","divrender","body");
            
            //SET POSITION
            dom.s("body","textAlign","center");
            dom.s("divreceive","display","inline-block");
            dom.s("divrender","display","inline-block");
            
            //CREATE RECEIVE DIVS
            dom.us("DIV","divrfeature","divreceive");
            dom.us("DIV","divrmain","divreceive");
            dom.us("DIV","divrmessage","divreceive");
           
            
            //START FUNCTIONS
            rfeature.start();
            rmessage.start();
            visualeditor.start();
            
        };
        
        f.clean = function() {
            dom.ac("body");
        };
        
        f.cleartext = function(elementid) {
            dom.g(elementid).value  = "";
        };
        
        f.clearmain = function() {

                switch(interface.currentmain) {
                    case 0: break;
                    case 1: visualeditor.close(); break;
                    case 2: texteditor.close(); break;
                    case 3: saveload.close(); break;
                    default: alert("ERROR: interface.clearmain"); break;
                };

            dom.ac("divrmain");
        };
           
        
        return f;
    };
    if(typeof(window.interface)==="undefined"){window.interface = interfacefunctions();};
})(window);
//=========================================================================
//============================ RFEATURE ===================================
//=========================================================================
(function(window){
    function rfeaturefunctions() {
        var f = {};
        
        f.start = function() {
            rfeature.clean();
            
            //CREATE DIV HOLDER
            dom.us("DIV","divrfeat","divrfeature");
            //DIV SETTINGS
            dom.s("divrfeat","margin","8px");
            //ADD BUTTONS
            dom.uc("P","thetitle","JAYNTESYS v0.1","divrfeat");
            dom.uca("BUTTON","feat-ve","Visual Editor","divrfeat","onclick","rfeature.change(1);");
            dom.uca("BUTTON","feat-te","Text Editor","divrfeat","onclick","rfeature.change(2);");
            dom.uca("BUTTON","feat-start","Start","divrfeat","onclick","renderer.start();");
            rfeature.defaultcolor();
            
            
        };
        
        f.defaultcolor = function() {
            //Default color for Feature Buttons
            dom.s("feat-ve","backgroundColor","gray");
            dom.s("feat-ve","color","white");
            dom.s("feat-te","backgroundColor","gray");
            dom.s("feat-te","color","white");
            dom.s("feat-start","backgroundColor","gray");
            dom.s("feat-start","color","white");
        };
        
        f.clean = function() {
            dom.ac("divrfeature");
        };
        
        f.change = function(id) {
            switch (id) {
                case 1: visualeditor.start(); break;
                case 2: texteditor.start();break;
                case 3: saveload.start();break;
                default: ; break;
            };
        };
        
        f.close = function() {
            dom.ac("divrfeature");
        };
        
        return f;
    };
    if(typeof(window.rfeature)==="undefined"){window.rfeature = rfeaturefunctions();};
})(window);
//=========================================================================
//============================ RMESSAGE ===================================
//=========================================================================
(function(window){
    function rmessagefunctions() {
        var f = {};
        
        f.closed = true;
        
        f.start = function() {
            dom.ac("divrmessage");
            dom.uc("P","rmessage-txt","","divrmessage");
            rmessage.closed = false;
        };
        
        f.update = function(message) {
            if (rmessage.closed === false) {
                dom.g("rmessage-txt").innerHTML = message;
            };
        };
        
        f.close = function() {
            dom.ac("divrmessage");
            rmessage.closed = true;
        };
        return f;
    };
    if(typeof(window.rmessage)==="undefined"){window.rmessage = rmessagefunctions();};
})(window);
//=========================================================================
//============================ RENDERER'S RMENU ======================================
//=========================================================================
//THIS FEATURE IS USED BY THE RENDERER FOR THE GO HIDE/REMOVE BUTTONS
(function(window){
    function rmenufunctions() {
        var f = {};
        
        f.temphide = 0;
        
        f.start = function() {
            
            dom.us("DIV","divrmenu","divreceive");
            dom.ac("divrmenu");
            
            //CREATE DIV HOLDER
            dom.us("DIV","divrm","divrmenu");
            //DIV SETTINGS
            dom.s("divrm","margin","8px");
            //CREATE BUTTONS
            dom.uca("BUTTON","rmenu-hide","Hide","divrm","onclick","rmenu.hide();");
            dom.uca("BUTTON","rmenu-remove","Remove","divrm","onclick","rmenu.remove();"); 
            
        };
        
        f.hide = function() {
            rfeature.close();
            rmessage.close();
            
            rmenu.temphide = interface.currentmain;
            interface.clearmain();

            
            dom.g("rmenu-hide").innerHTML = "Unhide";
            dom.a("rmenu-hide","onclick","rmenu.unhide();");
            
            rmenu.hidden = true;
        };
        f.unhide = function() {
            rfeature.start();
            rmessage.start();
            
            interface.currentmain = 0;
            if (rmenu.temphide === 1) {
                visualeditor.start();
            }else if (rmenu.temphide === 2) {
                texteditor.start();
            }else if (rmenu.temphide === 3) {
                saveload.start();
            };
           
           
            dom.g("rmenu-hide").innerHTML = "Hide";
            dom.a("rmenu-hide","onclick","rmenu.hide();");
            
            rmenu.hidden = false;
        };
        
        f.remove = function() {
            interface.clearmain();
            rfeature.close();
            rmessage.close();
            dom.dl("divreceive");
        };
        
        return f;
    };
    if(typeof(window.rmenu)==="undefined"){window.rmenu = rmenufunctions();};
})(window);
//=========================================================================
//============================ RENDERER ===================================
//=========================================================================
(function(window){
    function rendererfunctions() {
        var f = {};
        
        f.succesful = false;
        f.jayntellence = "";
        
        f.start = function() {
            
            rfeature.defaultcolor(); 
            dom.s("feat-start","backgroundColor","red"); 
            dom.s("feat-ve","color","white");
            
            rmenu.start();
            rmenu.hide();
            dom.dl("rmenu-hide");
            dom.dl("rmenu-remove");
            
            
            /////////////////////
            dom.us("DIV","divrenderer","divrm");
            ////////////////////
            renderer.message(1);
            ///////////////////
            
            //DETECT JAVASCRIPT ENABLED
            var n = jaynguage.visual[0].indexOf("'ENABLE JAVASCRIPT';");
            if (n === -1) {
                if (engine.containserror === false) {
                    setTimeout(renderer.render,100);
                }else if (engine.containserror === true) {
                    renderer.message(2);
                    renderer.finish();
                };
            }else if (n !== -1) {
                renderer.message(5);
                renderer.finish();
                setTimeout(function(){
                    var code = engine.retrieve("text");
                    dom.us("DIV","renderer-launch","divrenderer");
                    dom.a("renderer-launch","onclick",code);
                    dom.g("renderer-launch").click();         
                    dom.dl("renderer-launch");
                },1000);
            };
            
            
            
        };
        
        f.message = function(id) {
            dom.ac("divrenderer");
            
            switch (id) {
                case 1:
                    dom.uc("P","renderer-txt","STARTING JAYNTESYS","divrenderer");
                    dom.uc("P","renderer-txt1","Please Wait...","divrenderer","divrenderer");
                break;
                case 2:
                    dom.uc("P","renderer-txt","JAYNTESYS CAN'T START BECAUSE!","divrenderer");
                    dom.uc("P","renderer-txt1","YOUR JAYNGUAGE CONTAINS AN ERROR!","divrenderer");
                    dom.s("renderer-txt","marginTop","10px");
                    dom.us("BR","","divrenderer");
                    dom.uc("P","renderer-txt2","Error is located in line " + engine.errorinfo[0],"divrenderer");
                    dom.uc("P","renderer-txt3","Which contains the following:","divrenderer");
                    dom.uc("P","renderer-txt4",engine.errorinfo[2],"divrenderer");
                break;
                case 3:
                    dom.uc("P","renderer-txt","JAYNTESYS v0.01","divrenderer");
                    dom.uc("P","renderer-txt1","Enjoy the Application!","divrenderer","divrenderer");
                break;
                case 4:
                    dom.uc("P","renderer-txt","CRITICAL INTERNAL SYSTEM ERROR!","divrenderer");
                    dom.uc("P","renderer-txt1","Please report this error to developers immediately.","divrenderer");
                break;
                case 5: 
                    dom.uc("P","renderer-txt","JAVASCRIPT ENABLED DETECTED","divrenderer");
                    dom.uc("P","renderer-txt1","W A R N I N G","divrenderer");
                    dom.uc("P","renderer-txt2","If your code won't work it's your responsibility.","divrenderer");
                    dom.uc("P","renderer-txt3","If the whole application will break it's your responsiblity.","divrenderer");
                break;
                default:
                break;
                    
            };
        };
        f.render = function() {
            
            renderer.jayntellence = "";
            renderer.succesful = false;
            var txt1 = engine.interpret(jaynguage.visual);
            var txt2 = "renderer.succesful = true; renderer.finish();";
            renderer.jayntellence = txt1.concat(txt2);
            
            //alert(renderer.jayntellence);
            
            dom.us("DIV","renderer-launch","divrenderer");
            dom.a("renderer-launch","onclick",renderer.jayntellence);
            dom.g("renderer-launch").click();         
            dom.dl("renderer-launch");
            
            if(renderer.succesful === true) {
                renderer.message(3);
                renderer.finish();
            }else if(renderer.succesful === false) {
                renderer.message(4);
                renderer.finish();
            };
            
            
        };
        
        f.finish = function() {
            dom.uca("BUTTON","renderer-done","Go Back","divrenderer","onclick","renderer.end();");
            dom.uca("BUTTON","renderer-donehide","Hide","divrenderer","onclick","renderer.endhide();");
        };
        f.end = function() {
            dom.ac("divrenderer"); dom.dl("divrenderer");
            //dom.uca("BUTTON","rmenu-hide","Hide","divrm","onclick","rmenu.hide();");
            //dom.uca("BUTTON","rmenu-remove","Remove","divrm","onclick","rmenu.remove();");
            rmenu.unhide();
        };
        f.endhide = function() {
            dom.ac("divrenderer");dom.dl("divrenderer");
        };
        f.close = function() {
            
        };
        
        return f;
    };
    
    if(typeof(window.renderer)==="undefined"){window.renderer = rendererfunctions();};
})(window);



