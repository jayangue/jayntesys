window.moduleload = (function() {
   //Enter things you want to add during window.onload;
});
//=========================================================================
//============================== MODULEBOOK ===============================
//=========================================================================
(function(window){
    function modulebookfunctions() {
        var f = {};
        
        f.m = []; //module array
        f.s = 0; //source id
        
        f.list = ["default","sample1","cbrc","cdtimer"];
        f.modulearea = "divrender";
        
        f.get = function(themodule,target) {
            switch(themodule) {
                case "default": 
                    if (target === "showparams") {return "module_default.showparameters();";}
                    else if (target === "saveparams") {return "module_default.saveparameters();";}
                    else if (target === "activate"){return "module_default.start(";}
                    else if (target === "exist"){return true;}
                    else if (target === "parameter"){return [""];}
                    else if (target === "parametertype"){return ["string"];};
                    break;
                case "sample1": 
                    if (target === "showparams") {return "module_sample1.showparameters();";}
                    else if (target === "saveparams") {return "module_sample1.saveparameters();";}
                    else if (target === "activate"){return "module_sample1.start(";}
                    else if (target === "exist"){return true;}
                    else if (target === "parameter"){return ["",""];}
                    else if (target === "parametertype"){return ["string","string"];};
                    break;
                case "cbrc":
                    if (target === "showparams"){return "module_cbrcyb.showparameters();";}
                    else if (target === "saveparams"){return "module_cbrcyb.saveparameters();";}
                    else if (target === "activate"){return "module_cbrcyb.start(";}
                    else if (target === "exist"){return true;}
                    else if (target === "parameter"){return ["","",""];}
                    else if (target === "parametertype"){return ["string","string","string"];};
                    break;
                case "cdtimer":
                    if (target === "showparams"){return "module_cdtimer.showparameters();";}
                    else if (target === "saveparams"){return "module_cdtimer.saveparameters();";}
                    else if (target === "activate"){return "module_cdtimer.start(";}
                    else if (target === "exist"){return true;}
                    else if (target === "parameter"){return ["","","",""];}
                    else if (target === "parametertype"){return ["string","string","string","string"];};
                    break;
                default: 
                    if (target === "showparams") {return "modulebook.errormoduleshow();";}
                    else if (target === "saveparams") {return "modulebook.errormodulesave();";}
                    else if (target === "activate"){return "modulebook.errormodulestart(";}
                     else if (target === "exist"){return false;}
                    else if (target === "parameter"){return [""];}
                    else if (target === "parametertype"){return ["string"];};
                    break;  
            };
        };
        
        f.errormoduleshow = function() {
            var div = "div_module_default" + modulebook.s;
            var msg = modulebook.m[modulebook.s][3][0];
            dom.us("DIV",div,"divparamarea"+ modulebook.s);
            dom.uc("P",div+"txt1",modulebook.m[modulebook.s][2] + " >> ERROR: This module doesn't exist.",div);
        };
        f.errormodulesave = function() {
            //Do Nothing
        };
        f.errormodulestart = function(parameters) {
            alert("The module that contains " + parameters + " doesn't exist!. Please check your code. ");
        };
        
        f.update = function() {
            modulebook.m = visualeditor.input;
            modulebook.s = visualeditor.sourceid;
        };
        
        
        return f;
    };
    if(typeof(window.modulebook)==="undefined"){window.modulebook = modulebookfunctions();};
})(window);