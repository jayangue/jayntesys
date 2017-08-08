//=========================================================================
//============= SYSTEM ==================
//=========================================================================
(function(window){
    function jaynguagefunctions() {
        var f = {};
        
        f.visual = [];
        f.text = "";
        f.previousvisual = [];
        f.previoustext = "";
        f.visualerror = false;
        f.texterror = false;
        f.error = false;
        f.jayntellence = "";
        
        return f;
    };
    if(typeof(window.jaynguage)==="undefined"){window.jaynguage = jaynguagefunctions();};
})(window);
//=========================================================================
//============= ENGINE ==================
//=========================================================================
(function(window){
    function enginefunctions() {
        var f = {};
        
        f.storingfailed = false;
        f.containserror = false;
        f.errorinfo = [];
        f.seperatorline = "\n";
        f.seperatormodule = "[=]";
        f.seperatorparam = "[-]";
        
        f.store = function(target) {
            if (typeof(target)==="string") {
                /////////////////
                jaynguage.previoustext = target;
                /////////////////
                engine.storingfailed = true;
                engine.parse(target);
                if(engine.storingfailed === true){engine.containserror = true;}else{engine.containserror = false;};
                engine.compile(jaynguage.visual);
                engine.storingfailed = false;
            }else if (typeof(target)==="object") {
                ///////////////
                jaynguage.previousvisual = target;
                //////////////
                engine.storingfailed = true;
                engine.compile(target);
                engine.parse(jaynguage.text);
                engine.storingfailed = false;
            };
  
        };
        
        
        f.load = function(target) {
             /////////////////
                jaynguage.previoustext = target;
                /////////////////
                engine.storingfailed = true;
                engine.parse(target);
                if(engine.storingfailed === true){engine.containserror = true;}else{engine.containserror = false;};
                engine.compile(jaynguage.visual);
                engine.storingfailed = false;
        };
        
        
        f.retrieve = function(target) {
            if (target==="text") {
                if (engine.containserror === false) {
                    rmessage.update("Retrieving Jaynguage: Success ");
                    return jaynguage.text;
                }else if (engine.containserror === true) {
                    rmessage.update("Retrieving Jaynguage: Contains Error(s)");
                    return jaynguage.previoustext;
                };
                    
            }else if (target ==="visual") {
                if (engine.containserror === false) {
                    rmessage.update("Retrieving Jaynguage: Success");
                    return jaynguage.visual;
                }else if (engine.containserror === true) {
                    rmessage.update("Retrieving Jaynguage: Contains Error(s)");
                    return "ERROR ABORT BUILDING";
                };
                    
            };
  
        };
        
        
        
        f.compile = function(target) {
            //INITIALIZE ERROR DETECTION
            jaynguage.error = false;
            //
            var targetarray = target;
            var finishedarray = ["**Your code must contain atleast 2 lines of code**"];
            var nodearray = [];

            //alert("FINISHED ARRAY START: " + finishedarray);
    
            var i = 1;
            for (;i < targetarray.length;i++) {
                if (targetarray[i].length === 5) {
                    if (targetarray[i][4]!=="REMOVED") {
                        nodearray = [];
                        nodearray.push(targetarray[i][1]);
                        nodearray.push(targetarray[i][2]);
                        nodearray.push(targetarray[i][3]);
                        finishedarray.push(nodearray);
                        //alert("FINISHED ARRAY: " + finishedarray);
                    };
                }else if (targetarray[i].length === 3) {
                    nodearray = [];
                    nodearray.push(targetarray[i][0]);
                    nodearray.push(targetarray[i][1]);
                    nodearray.push(targetarray[i][2]);
                    finishedarray.push(nodearray);
                    //alert("FINISHED ARRAY: " + finishedarray);
                };
            };
    
            //alert("FINISHED ARRAY: " + finishedarray);
    
            var targetcode = finishedarray;
            //alert(targetcode);
            
            //CHECK MODULE 
            var i = 1;
            for (; i < finishedarray.length;i++) {
                var check = modulebook.get(finishedarray[i][1],"exist");
                if (check === false && finishedarray[i][1] !== undefined && finishedarray[i][1].length !== 0) {
                       var msg =  "This module " + finishedarray[i][1] + " doesn't exist!";
                        engine.catcherror(i,msg,msg,"errormodule");
                        //alert("Started Module on " + check + " Catch with " + targetcode[i][1]);
                       break;
                 };
            };
     
            //Start Compilation
            var i = 1;
            for (; i < targetcode.length;i++) {
                try {
                    var targetparams = targetcode[i][2].join(engine.seperatorparam);
                    targetcode[i][2] = targetparams; 
                }catch(e) {
                    engine.catcherror(i,e,targetcode,"compile");
                    break;
                };
            };

            var n = 1;
            for (; n < targetcode.length;n++) {
                try {
                var targetparams = targetcode[n].join(engine.seperatormodule);
                targetcode[n] = targetparams;
                } catch(e) {
                    engine.catcherror(i,e,targetcode,"compile");
                    break;
                };
            };
            
            //if (jaynguage.error === false) {jaynguage.text = targetcode.join(engine.seperatorline);};
            
             jaynguage.text = targetcode.join(engine.seperatorline);
                
            //FOR ENGINE.STORE
            if (jaynguage.error === false) {engine.storingfailed = false;};
        };
        
        f.parse = function(target) {
            //INITIALIZE ERROR DETECTION
            jaynguage.error = false;
            //
            var targetcode = target;
            //alert("PARSING " + target);
            targetcode = targetcode.split(engine.seperatorline);
    
            var n = 1;
            for (; n < targetcode.length;n++) {
                try {
                var targetparams = targetcode[n].split(engine.seperatormodule);
                targetcode[n] = targetparams;
                }catch(e) {
                    engine.catcherror(i,e,targetcode,"parse");
                    break;
                };
            };
    
            var i = 1;
            for (; i < targetcode.length;i++) {
                try {
                   var targetparams = targetcode[i][2].split(engine.seperatorparam);
                   targetcode[i][2] = targetparams; 
                }catch(e){
                    engine.catcherror(i,e,targetcode,"parse");
                    break;
                };
                
            };
            
            //CHECK MODULE 
            var i = 1;
            for (; i < targetcode.length;i++) {
                var check = modulebook.get(targetcode[i][1],"exist");
                if (check === false && targetcode[i][1] !== undefined && targetcode[i][1].length !== 0) {
                       var msg =  "This module " + targetcode[i][1] + " doesn't exist!";
                        engine.catcherror(i,msg,msg,"errormodule");
                        //alert("Started Module on " + check + " Catch with " + targetcode[i][1]);
                       break;
                 };
            };
            
            
            //alert("PARSED" + targetcode);
            
            
            //if (jaynguage.error === false) {jaynguage.visual = targetcode;};
            
            jaynguage.visual = targetcode;
            
            //FOR ENGINE.STORE
            if (jaynguage.error === false) {engine.storingfailed = false;};
            
    
        };
        
        f.interpret = function(target) {
            var targetcode = target;
            var tempcode = [];
            var thecode = ["**This is empty line**"];
            var fullcode = "";
            var modulearray = [];
            var paramsarray = [];
    
            //DETECT JAVASCRIPT ENABLED
            
            
            var x = 1;
            for (; x < targetcode.length;x++) {
                tempcode = [];
                tempcode.push(targetcode[x][1]);
                tempcode.push(targetcode[x][2]);
                thecode.push(tempcode);
                //alert(thecode);
            };
     
            var i = 1;
            for (; i < thecode.length;i++) {
                modulearray.push(thecode[i][0]);
                paramsarray.push(thecode[i][1]);
                //alert("Modules: " + modulearray + " Parameters: " + paramsarray);
            };
            
            var n = 0;
            for (; n < modulearray.length;n++) {
                var txt1 = modulebook.get(modulearray[n],"activate");
                //alert(txt1);
                var txt2 = engine.setparamtype(modulebook.get(modulearray[n],"parametertype"),paramsarray[n]);
                //alert("TXT2" + txt2);
                var txt3 = ");";
                //alert(txt3);
                var txt4 = txt1.concat(txt2);
                //alert(txt4);
                var txt5 = txt4.concat(txt3);
                //alert(txt5);
                fullcode = fullcode.concat(txt5);
                //alert(fullcode);
            };
            
            return fullcode;
        };
        
        f.setparamtype = function(paramtypelist,parameter) {
            //alert("PARAMTYPE=" + paramtypelist + " | " + parameter + "with length of" + parameter.length );
            
            var paramholder = [];
            
            var n = 0;
            for (;n < parameter.length;n++) {
                paramholder.push(parameter[n]);
            };
            
            var i = 0;
            for (;i < paramtypelist.length;i++){
                //alert("PARAMTYPE " + paramtypelist[i]);
                if (paramtypelist[i]=== "string") {
                    var txt1 = "'";
                    var txt2 = "'";
                    var txt3 = parameter[i];
                    var txt4 = txt1.concat(txt3);
                    var txt5 = txt4.concat(txt2);
                    paramholder[i] = txt5;
                    
                
                };
            };
            
            //alert("RESULT PARAM " + paramholder);
            return paramholder;
        }; 
        
        
        f.catcherror = function(location,message,source,action) {
            engine.errorinfo = [];
            engine.errorinfo.push(location + 1);
            engine.errorinfo.push(message);
            if (typeof(source)=== "string") {
                engine.errorinfo.push(source);
            }else if (typeof(source)=== "object") {
                engine.errorinfo.push(source[location]);
            };
            engine.errorinfo.push(action);
            //alert(message);
            var msg = "Your code contains error in line " + location;
            console.log(message);
            rmessage.update(msg);
            jaynguage.error = true;
        };
        
        return f;
    };
    if(typeof(window.engine)==="undefined"){window.engine = enginefunctions();};
})(window);