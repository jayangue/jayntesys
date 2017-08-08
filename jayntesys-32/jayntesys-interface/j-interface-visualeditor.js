//=========================================================================
//========================= VISUAL EDITOR =================================
//=========================================================================
(function(window){
    function visualeditorfunctions() {
        var f = {};
        
        f.tempname = "";
        f.input = ["**Your code must contain atleast 2 lines of code**"];
        f.sourceid = 1;
        f.eventid = "";
        f.parameterishidden = [true];
        f.c = 0;
        f.linecount = 0;
        f.moduleposition = [];
        f.modulename = [];
        
        f.viewcode = function(){
            if (dom.g("veditor-inputarea") !== null) {
                var shownodes = visualeditor.input.join("\n");
                dom.g("veditor-inputarea").value = shownodes;
            };
        };
        
        f.start = function() {
            visualeditor.input = ["**Your code must contain atleast 2 lines of code**"];
            visualeditor.sourceid = 1;
            visualeditor.eventid = "";
            visualeditor.parameterishidden = [true];
            visualeditor.c = 0;
            visualeditor.linecount = 0;
            
        
            interface.clearmain();
            //SET CURRENT MAIN
            interface.currentmain = 1;
            
            //RETREIEVE CODE
            var input = engine.retrieve("visual");
            
            
            if (input !== "ERROR ABORT BUILDING") {
                //CREATE DIV HOLDER
                dom.us("DIV","divveditor","divrmain");
                dom.us("DIV","divveditoropts","divrmain"); //visual editor options
                //SET TITLE
                dom.uc("P","vetitle","JAYNTESYS VISUAL EDITOR","divveditor");
                dom.s("vetitle","marginTop","10px");
                ////
                dom.us("DIV","divvecenter","divveditor");
                dom.ac("divvecenter");
                dom.uc("P","ve-txt101","**How to add a new Module?**","divvecenter");
                dom.uc("P","ve-txt102","Enter the Module's name (optional)","divvecenter");
                dom.uc("P","ve-txt103","Press Add Module Button","divvecenter");
                //CREATE BUTTONS
                dom.s("divveditoropts","paddingTop","10px");
                dom.uca("BUTTON","veditor-add","Add Module","divveditoropts","onclick","visualeditor.add();");
                dom.uc("INPUT","veditor-name","","divveditoropts");
                dom.s("veditor-name","width","5em");
                dom.uca("BUTTON","veditor-clear","Clear","divveditoropts","onclick","interface.cleartext('veditor-name');");
                dom.us("BR","","divveditoropts");
                dom.uca("BUTTON","feat-sl","Load/Save","divveditoropts","onclick","rfeature.change(3);");
                dom.uca("BUTTON","veditor-removeall","Remove All","divveditoropts","onclick","visualeditor.removeall();");
                /////////
                dom.us("BR","","divveditoropts");
                dom.ubta("veditor-inputarea","","divveditoropts","10em","10em");
                dom.changearea("veditor-inputarea",20,20,0,0,30,10);
                clearInterval(visualeditor.viewcode);
                setInterval(visualeditor.viewcode,100);
                ////////
                dom.g("veditor-name").value = visualeditor.tempname;
                
                if (input.length >= 2) {
                    visualeditor.build(input);
                };
            }else if (input === "ERROR ABORT BUILDING") {
                //CREATE DIV HOLDER
                dom.us("DIV","divveditor","divrmain");
                //CREATE BUTTONS
                dom.us("BR","","divveditor");
                dom.uc("P","vewarning","VISUAL EDITOR CAN'T START BECAUSE!","divveditor");
                dom.uc("P","vewarning","YOUR JAYNGUAGE CONTAINS AN ERROR!","divveditor");
                dom.s("vewarning","marginTop","10px");
                dom.us("BR","","divveditor");
                dom.uc("P","vewarning3","Error is located in line " + engine.errorinfo[0],"divveditor");
                dom.uc("P","vewarning4","Which contains the following:","divveditor");
                dom.uc("P","vewarning4",engine.errorinfo[2],"divveditor");
                dom.us("BR","","divveditor");
                dom.uc("P","vewarning1","Fix it in Text Editor","divveditor");
                dom.uca("BUTTON","vewarning-edit","Yes I Will!","divveditor","onclick","visualeditor.erroraction(1);");
                dom.us("BR","","divveditor");
                dom.uc("P","vewarning1","Delete it and start a new one","divveditor");
                dom.uca("BUTTON","vewarning-edit","Bring It On! ","divveditor","onclick","visualeditor.erroraction(2)");
                
            };
        };
        
        f.erroraction = function(id) {
            switch (id) {
                case 1: texteditor.start(); break;
                case 2:  engine.store(""); visualeditor.start();break;
                default: break;
            };
        };
        
        f.build = function(input) {
            var i = 1;
            for (;i < input.length;i++) {
                visualeditor.c++;
                visualeditor.node(visualeditor.c,input[i][0],input[i][1],input[i][2],"PRESENT");
            };  
        };
        
        f.add = function(){
            var thename = dom.gv("veditor-name");
            if (thename === "") {thename = "No Name";};
            ////////////
            visualeditor.c++;

            visualeditor.node(visualeditor.c,thename,modulebook.list[0],modulebook.get(modulebook.list[0],"parameter"),"PRESENT");
            
        };
        
        f.node = function(id,name,module,parameters,status){
            visualeditor.linecount++;
            var nodeid = id;
            var nodename = name;
            var nodemodule = module;
            var nodeparams = parameters;
            var nodestatus = status;
            
            var nodeinfo = [];
            var jicount = nodeid.toString();
            nodeinfo.push(jicount);
            nodeinfo.push(nodename);
            nodeinfo.push(nodemodule);
            nodeinfo.push(nodeparams);
            nodeinfo.push(nodestatus);
           
            visualeditor.input.push(nodeinfo);
            visualeditor.parameterishidden.push(true);
            
            if (visualeditor.linecount <= 1) {
                dom.ac("divvecenter");
                //CREATE TABLE
                dom.us("TABLE","vemaintable","divvecenter");
                dom.a("vemaintable","border","1");
                dom.s("vemaintable","padding","2px");
                dom.s("vemaintable","marginTop","10px");
                //CREATE TABLE LABELS
                dom.us("TR","","vemaintable");
                dom.uc("TD","","Options","vemaintable");
                dom.uc("TD","","Name","vemaintable");
                dom.uc("TD","","Module","vemaintable");
                dom.uc("TD","","Parameter(s)","vemaintable");
            };
            
            ///////////
            dom.us("TR","line"+nodeid,"vemaintable");
            dom.us("TD","option"+nodeid,"line"+nodeid);
            dom.s("option"+nodeid,"padding","5px");
            dom.us("TD","name"+nodeid,"line"+nodeid);
            dom.s("name"+nodeid,"padding","5px");
            dom.us("TD","subject"+nodeid,"line"+nodeid);
            dom.s("subject"+nodeid,"padding","5px");
            dom.us("TD","predicate"+nodeid,"line"+nodeid);
            dom.s("predicate"+nodeid,"padding","5px");
            ///////////
            dom.uc("P","nametxt"+nodeid,nodename,"name"+nodeid);
            ///////////
            dom.uca("BUTTON","remove"+nodeid,"Remove","option"+nodeid,"onclick","visualeditor.detectevent(" + nodeid + ",'remove');visualeditor.remove();");
            dom.uca("BUTTON","edit"+nodeid,"Edit","option"+nodeid,"onclick","visualeditor.detectevent(" + nodeid + ",'edit');visualeditor.edit();");
            //////////
            //dom.uc("P","mtxt"+nodeid,"Module:","subject"+nodeid);
            dom.us("SELECT","modulelist"+nodeid,"subject"+nodeid);
            dom.a("modulelist"+nodeid,"name","ModuleList"+nodeid);
            dom.a("modulelist"+nodeid,"size","1");
            dom.a("modulelist"+nodeid,"onchange","visualeditor.detectevent(" + nodeid + ",'choosemodule');visualeditor.choosemodule();");
            visualeditor.option(nodeid, "modulelist"+nodeid);
            dom.g("modulelist"+nodeid).value = nodemodule;
            /////////
            dom.uca("BUTTON","show"+nodeid,"Edit Parameter(s)","predicate"+nodeid,"onclick","visualeditor.detectevent(" + nodeid + ",'showparameters');visualeditor.showparameters();" + modulebook.get(nodemodule,"showparams"));
            ///////
            visualeditor.updateeditposition();
            
        };
        
        f.option = function(id,attachment) {
            var i = 0;
            for (;i < modulebook.list.length;i++) {
                dom.us("OPTION","m"+id+"opt"+i,attachment);
                dom.uc("P","mopt"+id+"txt"+i,modulebook.list[i],"m"+id+"opt"+i);
                dom.a("m"+id+"opt"+i,"value",modulebook.list[i]);
            };
            
        };
        f.detectevent = function(source,event) {
            visualeditor.sourceid = source;
            visualeditor.eventid = event;
            modulebook.update();
            //alert("The Node #" + visualeditor.sourceid + " has launch an event of " + visualeditor.eventid);
        };
        f.remove = function() {
            dom.dl("line"+visualeditor.sourceid);
            visualeditor.input[visualeditor.sourceid][4] = "REMOVED";
            visualeditor.linecount--;
            if (visualeditor.linecount <= 0) {
                dom.dl("vemaintable");
                dom.ac("divvecenter");
                dom.uc("P","ve-txt101","**How to add a new Module?**","divvecenter");
                dom.uc("P","ve-txt102","Enter the Module's name (optional)","divvecenter");
                dom.uc("P","ve-txt103","Press Add Module Button","divvecenter");
            };
            visualeditor.updateeditposition();
        };
        f.removeall = function() {
            
             var i = 1;
             for (; i < visualeditor.input.length; i++) {
                 if (dom.g("remove"+i)!== null) {
                     dom.g("remove"+i).click();
                 };
             };
             
            
            
        };
        f.edit = function() {
            dom.us("DIV","divedit"+visualeditor.sourceid,"option"+visualeditor.sourceid);
            dom.a("edit"+visualeditor.sourceid,"onclick","visualeditor.detectevent(" + visualeditor.sourceid + ",'edithide');visualeditor.edithide();");
            dom.g("edit"+visualeditor.sourceid).innerHTML = "Hide Edit";
            
            dom.s("divedit"+visualeditor.sourceid,"paddingTop","10px");
            dom.uc("INPUT","editnameinput"+visualeditor.sourceid,"","divedit"+visualeditor.sourceid);
            dom.us("BR","","divedit"+visualeditor.sourceid);
            dom.uca("BUTTON","editnamebutton"+visualeditor.sourceid,"Edit Name","divedit"+visualeditor.sourceid,"onclick","visualeditor.detectevent(" + visualeditor.sourceid + ",'editname');visualeditor.editname();");
            
            dom.us("DIV","editpos"+visualeditor.sourceid,"divedit"+visualeditor.sourceid);
            visualeditor.editposition(visualeditor.sourceid,"editpos"+visualeditor.sourceid);
            
        };
        f.edithide = function() {
            dom.a("edit"+visualeditor.sourceid,"onclick","visualeditor.detectevent(" + visualeditor.sourceid + ",'edit');visualeditor.edit();");
            dom.g("edit"+visualeditor.sourceid).innerHTML = "Edit";
            dom.dl("divedit"+visualeditor.sourceid);
        };
        f.editname = function() {
            var nodename = dom.g("editnameinput"+visualeditor.sourceid).value;
            visualeditor.input[visualeditor.sourceid][1] = nodename;
            dom.g("name"+visualeditor.sourceid).innerHTML = visualeditor.input[visualeditor.sourceid][1];
            visualeditor.updateeditposition();
            //alert(visualeditor.input);
        };
        f.editposition = function(id,attachment) {
            visualeditor.moduleposition = [];
            visualeditor.modulename = [];
            var i = 1;
            for (;i < visualeditor.input.length;i++) {
                if (visualeditor.input[i][4] === "PRESENT") {
                    visualeditor.moduleposition.push(visualeditor.input[i][0]);
                    visualeditor.modulename.push(visualeditor.input[i][1]);
                };
            };
            dom.uca("BUTTON","swap"+id,"Swap",attachment,"onclick","visualeditor.detectevent(" + id + ",'showparameters');visualeditor.changeposition("+id+");");
            dom.us("SELECT","presentmodules"+id,attachment);
            dom.a("presentmodules"+id,"name","ModulePos"+id);
            dom.a("presentmodules"+id,"size","1");
            dom.a("presentmodules"+id,"onchange","visualeditor.detectevent(" + id + ",'changeposition');");
            visualeditor.checkmodules(id, "presentmodules"+id);
            dom.g("presentmodules"+id).value = visualeditor.moduleposition[0];
        };
        f.editchangeposition = function() {
            
        };
        f.showparameters = function() {
            //alert(visualeditor.sourceid);
            visualeditor.parameterishidden[visualeditor.sourceid] = false;
            
             dom.a("show"+visualeditor.sourceid,"onclick","visualeditor.detectevent(" + visualeditor.sourceid + ",'hideparamters');" + modulebook.get(visualeditor.input[visualeditor.sourceid][2],"saveparams")+ "visualeditor.hideparameters();");
             dom.g("show"+visualeditor.sourceid).innerHTML = "Save Parameter(s)";
             dom.us("DIV","divparamarea"+visualeditor.sourceid,"predicate"+visualeditor.sourceid);
             dom.s("divparamarea"+visualeditor.sourceid,"padding","5px");
        };
        f.hideparameters = function() {
            //alert(visualeditor.sourceid);
            visualeditor.parameterishidden[visualeditor.sourceid] = true;
            
            dom.a("show"+visualeditor.sourceid,"onclick","visualeditor.detectevent(" + visualeditor.sourceid + ",'showparamters');" + "visualeditor.showparameters();" + modulebook.get(visualeditor.input[visualeditor.sourceid][2],"showparams"));
            dom.g("show"+visualeditor.sourceid).innerHTML = "Edit Parameter(s)";
            dom.dl("divparamarea"+visualeditor.sourceid);
        };
        f.choosemodule = function() {
             var modulelist = dom.g("modulelist"+visualeditor.sourceid);
             var newmodule = modulelist.options[modulelist.selectedIndex].value;
             visualeditor.input[visualeditor.sourceid][2] = newmodule;
             var targetmodule =  visualeditor.input[visualeditor.sourceid][2];
             var newparameter = modulebook.get(targetmodule,"parameter");
             visualeditor.input[visualeditor.sourceid][3] = newparameter;
             
             if (visualeditor.parameterishidden[visualeditor.sourceid] === false) {
                 visualeditor.hideparameters();
             }else if (visualeditor.parameterishidden[visualeditor.sourceid] === true) {
                dom.a("show"+visualeditor.sourceid,"onclick","visualeditor.detectevent(" + visualeditor.sourceid + ",'showparamters');visualeditor.showparameters();" + modulebook.get(targetmodule,"showparams")); 
             };
             //dom.a("show"+visualeditor.sourceid,"onclick","visualeditor.detectevent(" + visualeditor.sourceid + ",'showparamters');" + "module_" + targetmodule + ".showparameters();visualeditor.showparameters();");
            //alert(visualeditor.input);
        };
        
        f.changeposition = function(source) {
            var targetholder = dom.g("presentmodules"+source);
            var target = targetholder.options[targetholder.selectedIndex].value;
            var thesource = visualeditor.input[source];
            var thetarget = visualeditor.input[target];
            visualeditor.input[source] = thetarget;
            visualeditor.input[target] = thesource;
            visualeditor.input[source][0] = source;
            visualeditor.input[target][0] = target;
            //alert("Swaping fom " + thesource + " to " + thetarget);
            
            dom.ac("option"+source);
            dom.ac("name"+source);
            dom.ac("subject"+source);
            dom.ac("predicate"+source);
            ///////////////
            dom.ac("option"+target);
            dom.ac("name"+target);
            dom.ac("subject"+target);
            dom.ac("predicate"+target);
            //////////////
            visualeditor.rebuild(source);
            visualeditor.rebuild(target);
            
 
        };
        f.rebuild = function(id) {
            var nodeid = visualeditor.input[id][0];
            var nodename = visualeditor.input[id][1];
            var nodemodule = visualeditor.input[id][2];
            visualeditor.parameterishidden[id] = true;
             ///////////
            dom.uc("P","nametxt"+nodeid,nodename,"name"+nodeid);
            ///////////
            dom.uca("BUTTON","remove"+nodeid,"Remove","option"+nodeid,"onclick","visualeditor.detectevent(" + nodeid + ",'remove');visualeditor.remove();");
            dom.uca("BUTTON","edit"+nodeid,"Edit","option"+nodeid,"onclick","visualeditor.detectevent(" + nodeid + ",'edit');visualeditor.edit();");
            //////////
            //dom.uc("P","mtxt"+nodeid,"Module:","subject"+nodeid);
            dom.us("SELECT","modulelist"+nodeid,"subject"+nodeid);
            dom.a("modulelist"+nodeid,"name","ModuleList"+nodeid);
            dom.a("modulelist"+nodeid,"size","1");
            dom.a("modulelist"+nodeid,"onchange","visualeditor.detectevent(" + nodeid + ",'choosemodule');visualeditor.choosemodule();");
            visualeditor.option(nodeid, "modulelist"+nodeid);
            dom.g("modulelist"+nodeid).value = nodemodule;
            /////////
            dom.uca("BUTTON","show"+nodeid,"Edit Parameter(s)","predicate"+nodeid,"onclick","visualeditor.detectevent(" + nodeid + ",'showparameters');visualeditor.showparameters();" + modulebook.get(nodemodule,"showparams"));
            ///////
            visualeditor.updateeditposition();
            
        };
        f.checkmodules = function(id,attachment) {
            
            var i = 0;
            for (;i < visualeditor.moduleposition.length;i++) {
                dom.us("OPTION","mp"+id+"mpopt"+i,attachment);
                dom.uc("P","mpopt"+id+"mptxt"+i,visualeditor.modulename[i],"mp"+id+"mpopt"+i);
                dom.a("mp"+id+"mpopt"+i,"value",visualeditor.moduleposition[i]);
            };
        };
        f.updateeditposition = function() {
            var i = 1;
            for (i; i < visualeditor.input.length;i++) {
                if (dom.g("editpos"+i)!== null) {
                    dom.ac("editpos"+i);
                    visualeditor.editposition(i,"editpos"+i);
                    //alert("editpos"+i);
                };
            };
        };
        f.close = function() {
            visualeditor.tempname = dom.gv("veditor-name");
            engine.store(visualeditor.input);
        };
        
        return f;
    };
    if(typeof(window.visualeditor)==="undefined"){window.visualeditor = visualeditorfunctions();};
})(window);
//=========================================================================
//========================= VISUAL EDITOR =================================
//=========================================================================