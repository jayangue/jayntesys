//=========================================================================
//======================== LOAD/SAVE ==================================
//=========================================================================
(function(window){
    function saveloadfunctions() {
        var f = {};
        
        f.symbol = "[~#<@.@>#~]"; //PLEASE DON'T TOUCH THIS.CHANGING THIS WILL CORRUPT PREVIOUS SAVED FILES
        f.path = "";
        f.prevmain = 0;
        f.filenames = [];
        f.filepos = [];
        f.filecounts = [];
        f.highest = 0;
        f.sortmode = "latest";
        f.filetablehidden = true;
        
        f.start = function() {
            saveload.prevmain = interface.currentmain;
            interface.clearmain();
            //SET CURRENT MAIN
            interface.currentmain = 3;
            
            //CREATE DIV HOLDER
            dom.us("DIV","divsaveload","divrmain");
            dom.s("divsaveload","margin","8px");
            //EXIT LOAD/SAVE BUTTON
            dom.uc("P","exitsaveload","","divsaveload");
            dom.s("exitsaveload","margin","10px");
            dom.uca("BUTTON","exitsaveloadbutton","Exit Load/Save","exitsaveload","onclick","rfeature.change(saveload.prevmain);");
            //MESSAGE
            dom.us("DIV","divsaveloadmessage","divsaveload");
            //QUICK ACCESS
            dom.uca("BUTTON","saveload-quicksave","QuickSave","divsaveload","onclick","saveload.save('quick');rfeature.change(saveload.prevmain);");
            dom.s("saveload-quicksave","margin","3px");
            dom.uca("BUTTON","saveload-quickload","QuickLoad","divsaveload","onclick","saveload.load('quick');");
            dom.s("saveload-quickload","margin","3px");
            //LOAD SAVE REMOVE
            dom.us("DIV","divsaveloadmessage","divsaveload");
            dom.uc("P","saveload-txt","Enter File Name","divsaveload");
            dom.s("saveload-txt","margin","5px");
            dom.us("INPUT","saveload-path","divsaveload");dom.s("saveload-path","width","10em");
            dom.s("saveload-path","margin","5px");
            dom.uca("BUTTON","saveload-clear","Clear","divsaveload","onclick","interface.cleartext('saveload-path');");
            dom.us("BR","","divsaveload");
            dom.uca("BUTTON","saveload-load","Load","divsaveload","onclick","saveload.load()");
            dom.uca("BUTTON","saveload-save","Save","divsaveload","onclick","saveload.save()");
            dom.uca("BUTTON","saveload-remove","Remove","divsaveload","onclick","saveload.remove()");
            //FILE TABLE
            dom.us("BR","","divsaveload");
            dom.us("DIV","divsaveloadfiles","divsaveload");    
            //////
            saveload.updatetable();
            dom.g("saveload-path").value =saveload.path;
            saveload.checkfiles();
        };
        f.message = function(message) {
            dom.ac("divsaveloadmessage");
            dom.uc("P","saveload-message",message ,"divsaveloadmessage");
        };
        
        f.load = function(mode) {
            if (mode === undefined) {
                var file = saveload.findname(dom.gv("saveload-path"));
                var msg = "File Do Exist";
                var msgnull = "File Doesn't Exist";
                var goback = 0;
            }else if (mode === "quick") {
                var file = saveload.findname("QuickSaveLoadFile");
                var msg = "Quick Load Success";
                var msgnull = "Quick Save Is Empty!";
                var goback = saveload.prevmain;
            };
            
            var code = localStorage.getItem(file);
            if (code === null) {saveload.message(msgnull);
            }else {engine.load(code); rfeature.change(goback); saveload.message(msg);};
        };
        f.save = function(mode) {
            if (mode === undefined) {
                var file = saveload.getname(dom.gv("saveload-path"));
                var msg = "File Succesfully Saved!";
            }else if (mode === "quick") {
                var file = saveload.getname("QuickSaveLoadFile");
                var msg = "Quick Save Success";
            };
            
            if (typeof(file)=== "string") {
                var code = engine.retrieve("text");
                localStorage.setItem(file,code);
                saveload.message(msg);saveload.updatetable();
            }else if (typeof(file)==="number" && file === 7841) {
               //FILE ALREADY EXIST
            };
            
        };
        
        f.replaceit = function(name,pos,count) {
            var symbol = saveload.symbol;
            var txt1 = pos.concat(symbol);
            var txt2 = txt1.concat(count);
            var txt3 = txt2.concat(symbol);
            var file = txt3.concat(name);
            var code = localStorage.getItem(file);
            if (code === null) {saveload.message("File Not Detected");}
            else {
                localStorage.removeItem(file);
                saveload.updatetable();
                code = engine.retrieve("text");
                file = saveload.getname(name);
                localStorage.setItem(file,code);
                saveload.message("File Replaced Succesfully!");
                saveload.updatetable();
            }; 
            
            
        };
        f.remove = function() {
            //saveload.removeall();
            
            var file = saveload.findname(dom.gv("saveload-path"));
            var code = localStorage.getItem(file);
            if (code === null) {saveload.message("File Doesn't Exist");}
            else {saveload.message("File Succesfully Removed!");localStorage.removeItem(file);saveload.updatetable();}; 
            
        };
        
        f.removeall = function() {
            
            var i = localStorage.length;
            var target = "";
            while(i--) {
                target = localStorage.key(i);
                localStorage.removeItem(target);
            };
            saveload.updatetable();
        };
        f.updatetable = function(mode) {
            if (mode !== undefined) {saveload.sortmode = mode;};
            dom.ac("divsaveloadfiles");
            saveload.checkfiles();
            
            var filelength = localStorage.length;
            if (filelength > 0) {
                if (saveload.filetablehidden === true) {
                    dom.uca("BUTTON","saveload-show","Show File List","divsaveloadfiles","onclick","dom.dl('saveload-show');saveload.filetablehidden = false;saveload.updatetable();");
                }else if (saveload.filetablehidden === false) {
                    dom.uca("BUTTON","saveload-show","Hide File List","divsaveloadfiles","onclick","dom.dl('saveload-show');saveload.filetablehidden = true;saveload.updatetable();");
                    dom.uc("P","saveload-tabletxt","List of Files","divsaveloadfiles");
                    dom.s("saveload-tabletxt","paddingTop","8px");
                    dom.dl("saveload-sort");
                    dom.us("SELECT","saveload-sort","saveload-tabletxt");
                    dom.a("saveload-sort","name",saveload);
                    dom.a("saveload-sort","size","1");
                    dom.a("saveload-sort","onchange","saveload.choosesorting();");
                    dom.us("OPTION","saveload-sort01","saveload-sort");
                    dom.us("OPTION","saveload-sort02","saveload-sort");
                
                    dom.us("TABLE","saveload-filetable","divsaveloadfiles");
                    dom.a("saveload-filetable","border","1");
                    dom.us("TR","","saveload-filetable");
                    dom.uc("TD","","File Name","saveload-filetable");
                    dom.uc("TD","","File Content","saveload-filetable");
                };
                if (saveload.sortmode === "latest" && saveload.filetablehidden === false) { 
                    
                    dom.uc("P","saveload-sort01txt","Latest","saveload-sort01");
                    dom.a("saveload-sort01","value","latest");
                    dom.uc("P","saveload-sort02txt","Old","saveload-sort02");
                    dom.a("saveload-sort02","value","old");
                    
                    var x = filelength;
                    var y = 1;
                    var min = 0;
                    //alert(x);
                    
                     if (saveload.filepos[0] === "0000") {
                        dom.us("TR","","saveload-filetable");
                        dom.uc("TD","",saveload.filenames[0],"saveload-filetable");
                        dom.uc("TD","",localStorage.getItem(localStorage.key(0)),"saveload-filetable");
                        min = 1;
                    };
                    
                    while (x > min) {
                        x--;
                        //alert("UPDATING DOWN " + x);
                        dom.us("TR","","saveload-filetable");
                        dom.uc("TD","",saveload.filenames[x],"saveload-filetable");
                        dom.uc("TD","",localStorage.getItem(localStorage.key(x)),"saveload-filetable");
                    };
                }else if(saveload.sortmode === "old" && saveload.filetablehidden === false) {
                    
                    dom.uc("P","saveload-sort01txt","Old","saveload-sort01");
                    dom.a("saveload-sort01","value","old");
                    dom.uc("P","saveload-sort02txt","Latest","saveload-sort02");
                    dom.a("saveload-sort02","value","latest");
                    
                    var i = 0;
                    var n = 0;
                    for (;i < filelength;i++) {
                        dom.us("TR","","saveload-filetable");
                        dom.uc("TD","",saveload.filenames[i],"saveload-filetable");
                        dom.uc("TD","",localStorage.getItem(localStorage.key(i)),"saveload-filetable");
                    };
                };
            }else if (filelength <= 0) {
               dom.uc("P","saveload-tabletxt2","No Saved File","divsaveloadfiles");
               dom.s("saveload-tabletxt2","paddingTop","8px");
            };
        };
        
        f.checkfiles = function() {
            saveload.filepos = [];
            saveload.filecounts = [];
            saveload.filenames = [];
            saveload.highest = 0;
            var target = [];
            var file = "";
            var count = 0;
            
            var filelength = localStorage.length;
            if (filelength > 0) {
                var i = 0;
                for (;i < filelength;i++) {
                    file = localStorage.key(i);
                    target = file.split(saveload.symbol);
                    saveload.filepos.push(target[0]);
                    saveload.filecounts.push(target[1]);
                    saveload.filenames.push(target[2]);
                    count = parseInt(target[1]);
                    if (count > saveload.highest) {saveload.highest = count;};
                    //alert("Pos " + saveload.filepos);
                    //alert("Count" + saveload.filecounts);
                    //alert("Name " + saveload.filenames);
                    //alert("Highest Count " + saveload.highest);
                };
            };
        };
        
        
        f.getname = function(thename) {
            saveload.checkfiles();
            var name = saveload.extractsymbol(thename);
            var fullname = "";
            var count = saveload.highest;
            var pos = "";
            var symbol = saveload.symbol;
            var digit = "";
            
            //CHECK IF FILE ALREADY EXIST
            var i = 0;
            for (;i < saveload.filenames.length;i++){
                if (saveload.filenames[i] === name && name !== "QuickSaveLoadFile" ) {
                    var n = "'" + saveload.filenames[i] + "',";
                    var p = "'" + saveload.filepos[i] + "',";
                    var c = "'" + saveload.filecounts[i] + "'";
                    var t = n + p + c;
                    saveload.message("File Already Exist!");
                    dom.uca("BUTTON","saveload-replaceit","Replace It","divsaveloadmessage","onclick","dom.dl('saveload-replaceit');saveload.replaceit(" + t +");");
                    
                    return 7841; //ERROR FILE ALREADY EXIST!
                    break;
                };
            }; 
            
            if(name === "QuickSaveLoadFile") {count = -1;};
            
            if (count <= 9) {digit = "000";}
            else if (count >= 10 && count <= 99) {digit = "00";}
            else if (count >= 100 && count <= 999) {digit = "0";}
            else if (count >= 1000 && count <= 9999) {digit = "";};
            
            count++
            pos = digit.concat(count);
            if (count > saveload.highest) {saveload.highest = count;};

            var txt1 = pos.concat(symbol);
            var txt2 = txt1.concat(count);
            var txt3 = txt2.concat(symbol);
            var txt4 = txt3.concat(name);
            fullname = txt4;
                      
            //alert(fullname);
            return fullname;            
        };
        
        f.findname = function(thename) {
            
            saveload.checkfiles();
            var fullname = "";
            var name = saveload.extractsymbol(thename);
            var count = "";
             var pos = "";
            var symbol = saveload.symbol;
            var i = 0;
            for (; i < saveload.filenames.length; i++) {
                if (saveload.filenames[i]=== name) {
                    pos = saveload.filepos[i];
                    count = saveload.filecounts[i];
                    break;
                };
            };
            
            var txt1 = pos.concat(symbol);
            var txt2 = txt1.concat(count);
            var txt3 = txt2.concat(symbol);
            var txt4 = txt3.concat(name);
            fullname = txt4;
                      
            //alert(fullname);
            return fullname;    
            
        };
       
       f.extractsymbol = function(thename) {
           var name = thename;
           var symbol = saveload.symbol;
           var check = name.search(symbol);
           var namecleaned = "";
   
           if (check >= 0) {
               namecleaned = name.replace(symbol,"");
               //alert(namecleaned);
               return namecleaned;
           }else if (check <= -1) {
               return name;
           };
           
       };
       
       f.choosesorting = function() {
             var sortlist = dom.g("saveload-sort");
             //var select = sortlist.options[sortlist.selectedIndex].value;
             //alert(select);
             saveload.updatetable(sortlist.options[sortlist.selectedIndex].value);
        };
        
        f.close = function() {
            saveload.path = dom.gv("saveload-loadpath");
        };
        return f;
    };
    if(typeof(window.saveload)==="undefined"){window.saveload = saveloadfunctions();};
})(window);