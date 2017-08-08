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
        
        f.list = ["default","sample1"];
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
            alert("The module that contains " + parameters + " doesn't exist!. Please check your code. ")
        };
        
        
        
        
        f.update = function() {
            modulebook.m = visualeditor.input;
            modulebook.s = visualeditor.sourceid;
        };
        
        
        return f;
    };
    if(typeof(window.modulebook)==="undefined"){window.modulebook = modulebookfunctions();};
})(window);
//=========================================================================
//================================ MODULES ================================
//=========================================================================
(function(window){
    function module_functions() {
        var f = {};
                
        f.showparameters = function() {
            var div = "div_module_default" + modulebook.s;
            var msg = modulebook.m[modulebook.s][3][0];
            dom.us("DIV",div,"divparamarea"+ modulebook.s);
            dom.uc("P",div+"txt1","Message:",div);
            dom.uc("TEXTAREA",div+"msg","",div);
            dom.g(div+"msg").value = msg;
        };
        f.saveparameters = function() {
            var div = "div_module_default" + modulebook.s;
            modulebook.m[modulebook.s][3][0] = dom.gv(div+"msg");
        };
        
        f.start = function(message) {
            alert("DEFAULT MODULE SAYS " + message);
        };
        
    
        return f;
    };
    if(typeof(window.module_default)==="undefined"){window.module_default = module_functions();};
})(window);
(function(window){
    function module_functions() {
        var f = {};
        
        f.showparameters = function() {
            var div = "div_module_sample1" + modulebook.s;
            var nums = modulebook.m[modulebook.s][3][0];
            var ops = modulebook.m[modulebook.s][3][1];
            
            dom.us("DIV",div,"divparamarea"+modulebook.s);
            dom.uc("P",div+"txt1","Your Numbers:",div);
            dom.uc("TEXTAREA",div+"nums","",div);
            dom.uc("P",div+"txt1","Your Operation:",div);
            dom.uc("TEXTAREA",div+"ops","",div);
            
            dom.g(div+"nums").value = nums;
            dom.g(div+"ops").value = ops;
        };
        f.saveparameters = function() {
            var div = "div_module_sample1" + modulebook.s;
            modulebook.m[modulebook.s][3][0] = dom.gv(div+"nums"); 
            modulebook.m[modulebook.s][3][1] = dom.gv(div+"ops");
        };
        
        f.start = function(numbers,operation) {
            var m = numbers.split(",");
            var n = [];
            var o = operation;
            var total = 0;
           
           for (var i = 0; i < m.length; i++) {
               var newn = parseInt(m[i]);
               n.push(newn);
               //alert(n);
           };
           
           for (var l = 0; l < n.length; l++) {
               if (o === "add") {
               total = total + n[l];
               }else if(o === "multiply") {
                   if (l === 0) {
                       total = n[l];
                   }else if (l !== 0) {
                       total = total * n[l];
                   };;
               
               };
           };
           
           alert("SAMPLE1 says the total is " + total);
            
        };
    
        return f;
    };
    if(typeof(window.module_sample1)==="undefined"){window.module_sample1 = module_functions();};
})(window);
