//=========================================================================
//========================== TEXT EDITOR ==================================
//=========================================================================
(function(window){
    function texteditorfunctions() {
        var f = {};
        
        f.tempinput = "";
        f.saveinput = "";
        
        f.start = function() {
            interface.clearmain();
            //SET CURRENT MAIN
            interface.currentmain = 2;
            
            //CREATE DIV HOLDER
            dom.us("DIV","divteditor","divrmain");
            dom.s("divteditor","margin","10px");
            //SET TITLE
            dom.uc("P","teditor-title","JAYNTESYS TEXT EDITOR","divteditor");
            //CREATE TEXT AREA
            dom.ubta("teditor-inputarea","","divteditor","10em","10em");
            dom.changearea("teditor-inputarea",20,20,0,0,45,20);
            //CREATE BUTTONS
            dom.us("BR","","divteditor");
            dom.uca("BUTTON","feat-sl","Load/Save","divteditor","onclick","rfeature.change(3);");
            dom.uca("BUTTON","teditor-save","Check","divteditor","onclick","texteditor.check();");
            dom.uca("BUTTON","teditor-clear","Clear","divteditor","onclick","interface.cleartext('teditor-inputarea');");
            //
            texteditor.tempinput = engine.retrieve("text");
            dom.g("teditor-inputarea").value = texteditor.tempinput;
        };
        f.check = function() {
            texteditor.tempinput = dom.gv("teditor-inputarea");
            engine.store(texteditor.tempinput);
            if (engine.containserror === true) {
                rmessage.update("Error is in line " + engine.errorinfo[0] + " which contains: " + "\n" + engine.errorinfo[2]);
            }else if (engine.containserror === false) {
                rmessage.update("SUCCESS! No Error Detected!");
            };
        };
        f.close = function() {
            texteditor.tempinput = dom.gv("teditor-inputarea");
            engine.store(texteditor.tempinput);
        };
        
        return f;
    };
    if(typeof(window.texteditor)==="undefined"){window.texteditor = texteditorfunctions();};
})(window);