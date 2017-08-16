(function(window){
    function module_functions() {
        var f = {};
        
        f.qstart = 0;
        f.qend = 0;
        f.qbegin = 0;
        f.qanset = "cbrc-yb-ge";//Answer List;
        f.minimumstart = 0;
        f.maximumend = 0;
        f.answerset = [];
        f.cbrcybge = ["CBRC YB-Gen.Ed. (1 - 500)","B","A","B","B","A","A","B","A","B","A","A","B","B","A","A","A","A","B","B","A","B","A","B","A","A","B","B","B","A","B","B","B","B","A","A","A","B","A","A","B","B","A","A","A","B","B","B","A","B","A","B","B","A","A","A","B","A","A","B","A","A","B","A","B","B","A","A","A","A","A","A","B","A","A","A","A","B","B","B","Z","B","A","A","A","A","A","A","B","B","B","A","A","B","B","A","A","A","A","B","B","A","A","B","B","A","A","A","A","A","A","A","A","B","B","A","B","A","A","B","A","B","A","B","A","A","A","A","A","A","A","A","B","B","A","A","A","B","B","A","A","B","A","A","A","A","B","A","B","B","A","A","A","B","B","B","B","A","B","B","A","A","A","B","A","B","A","B","A","A","B","A","B","A","A","B","A","B","B","A","B","B","A","B","A","B","B","A","B","A","B","A","B","B","B","A","A","A","B","B","B","B","A","B","A","A","B","A","B","A","A","B","B","B","B","A","A","B","B","A","B","A","B","A","B","B","A","B","B","B","A","B","B","A","A","B","A","A","A","A","A","B","A","A","B","A","A","B","A","B","B","B","B","A","A","B","B","A","B","B","B","A","B","B","A","A","B","B","A","A","B","B","A","A","A","A","B","B","A","A","A","A","B","A","B","B","A","B","A","A","A","A","A","7440","B","A","A","A","A","A","A","A","B","A","A","B","A","A","A","A","B","A","A","B","A","B","A","A","A","A","A","A","B","A","A","B","B","A","A","A","A","A","B","A","A","A","B","B","B","B","A","B","B","B","A","B","B","A","A","B","B","A","A","A","A","B","B","A","B","A","B","B","A","A","B","A","A","A","A","A","B","A","B","A","A","A","B","A","A","B","A","A","A","A","A","B","B","B","B","A","A","A","A","A","B","A","A","B","A","B","A","A","B","B","B","B","A","B","B","A","A","A","B","B","B","A","A","A","A","A","A","B","A","A","A","A","B","B","B","A","B","A","A","A","A","B","B","B","A","A","B","B","B","A","A","A","B","A","A","B","A","B","B","A","A","A","B","A","B","B","A","A","A","A","A","A","B","B","A","B","A","B","A","B","B","A","A","A","A","A","A","A","A","B","A","A","A","B","A","B","A","B","A","A","B","A","A","B","A","B","A"];
        f.cbrcybpe = ["CBRC YB-Prof.Ed. (501-1000)","A","A","B","B","B","B","A","B","B","B","A","B","A","A","A","B","A","B","B","A","A","B","B","A","A","A","B","A","A","A","A","A","B","B","B","B","A","B","A","B","A","A","B","A","A","B","A","B","A","A","B","A","B","A","B","B","A","B","A","A","A","A","B","B","A","B","B","B","B","A","A","A","A","B","B","B","B","A","A","B","B","A","B","A","A","B","A","A","A","A","A","B","A","B","B","B","B","B","B","A","B","A","B","B","A","B","B","A","B","B","B","A","A","A","B","B","B","A","A","A","B","B","B","A","A","B","A","A","A","A","B","A","A","A","A","A","B","A","A","B","B","B","A","A","A","A","B","B","B","B","B","A","B","A","A","B","A","A","B","A","B","B","B","B","A","B","A","A","A","B","A","A","B","A","B","A","A","A","A","B","B","A","A","B","A","B","B","A","A","B","B","B","A","A","A","B","A","A","B","A","A","A","B","A","A","A","B","B","A","A","A","B","A","B","B","B","B","B","A","A","A","B","B","A","B","A","A","A","A","B","B","B","A","A","A","B","A","A","A","A","A","B","A","B","B","A","B","B","B","A","B","A","A","A","B","B","B","A","A","A","A","A","A","B","B","A","B","B","B","A","B","A","A","B","B","A","B","A","A","B","A","B","A","B","A","A","A","B","B","B","A","B","B","B","A","B","B","A","A","B","A","B","B","A","B","A","B","A","B","B","B","B","A","B","B","A","B","B","A","B","A","B","A","B","B","B","A","B","B","A","B","B","A","B","B","B","B","B","B","A","A","B","A","A","A","B","B","B","A","B","A","A","A","B","B","B","A","B","A","A","A","B","B","A","B","A","A","B","B","B","B","B","B","B","B","B","A","A","B","B","A","B","B","A","B","B","B","B","B","A","A","A","A","A","B","A","B","B","B","B","B","B","B","B","B","B","B","A","A","B","A","B","B","B","B","A","A","B","B","A","A","B","A","A","B","A","B","B","B","A","B","A","A","A","A","B","B","A","B","A","B","B","B","A","A","B","B","B","B","B","B","B","B","A","B","B","A","B","B","A","B","B","B","B","B","A","B","A","A","B","B","B","B","A","B","B","A","A","B","B","B","A","B","B","B","A","B","B","A","B","A","B","B","A","A","B","B","A","A","B",];
        
        f.showparameters = function() {
            ///////////// ESSENTIAL CODES /////////////////
            var div = "div_module_cbrcyb" + modulebook.s;
            dom.us("DIV",div,"divparamarea"+modulebook.s);
            
            var qstart = modulebook.m[modulebook.s][3][0];
            var qend = modulebook.m[modulebook.s][3][1];
            var qas = modulebook.m[modulebook.s][3][2];
            
            
            dom.uc("P",div+"qstarttxt","Starting Number",div);
            dom.us("INPUT",div+"qstartinput",div);
            dom.uc("P",div+"qendtxt","End Number",div);
            dom.us("INPUT",div+"qendinput",div);
            dom.uc("P",div+"qastxt","Answer Set",div);
            
            //============================================
            dom.us("SELECT",div+"qasset",div);
            //===========================================
            dom.us("OPTION",div+"qasset0",div+"qasset");
            dom.uc("P",div+"qassettxt0",module_cbrcyb.cbrcybge[0],div+"qasset0");
            dom.a(div+"qasset0","value","cbrc-yb-ge");
            /////
            dom.us("OPTION",div+"qasset1",div+"qasset");
            dom.uc("P",div+"qassettxt1",module_cbrcyb.cbrcybpe[0],div+"qasset1");
            dom.a(div+"qasset1","value","cbrc-yb-pe");
            //===========================================
           dom.a(div+"qasset","onchange","module_cbrcyb.theanswerset();");
            //==========================================
            
            
            
            dom.g(div+"qstartinput").value = qstart;
            dom.g(div+"qendinput").value = qend;
            
            //Initialize Answer Set
            if (qas==="") {qas = module_cbrcyb.qanset;};
            dom.g(div+"qasset").value = qas;
            

            
            
        };
        
        
        f.saveparameters = function() {
            var div = "div_module_cbrcyb" + modulebook.s;
            modulebook.m[modulebook.s][3][0] = dom.gv(div+"qstartinput");
            modulebook.m[modulebook.s][3][1] = dom.gv(div+"qendinput");
            modulebook.m[modulebook.s][3][2] = module_cbrcyb.qanset;
        };
        
        f.theanswerset = function() {
            var div = "div_module_cbrcyb" + modulebook.s;
            var qassetmain = dom.g(div+"qasset");
            var qassetvalue = qassetmain.options[qassetmain.selectedIndex].value;
            module_cbrcyb.qanset = qassetvalue;
            //alert(module_cbrcyb.qanset);
        };
        
        f.start = function(qstart,qend,answers) {
           
            module_cbrcyb.qstart = parseInt(qstart);
            module_cbrcyb.qend = parseInt(qend);
            module_cbrcyb.qanset = answers;
            
            var ns = module_cbrcyb.qstart;
            var ne = module_cbrcyb.qend;
            
            switch(module_cbrcyb.qanset) {
                case "cbrc-yb-ge": 
                    module_cbrcyb.answerset = module_cbrcyb.cbrcybge;
                    module_cbrcyb.qbegin = 0;
                    module_cbrcyb.minimumstart = 1;
                    module_cbrcyb.maximumend = 500;
                    break;
                case "cbrc-yb-pe":
                    module_cbrcyb.answerset = module_cbrcyb.cbrcybpe;
                    module_cbrcyb.qbegin = 500;
                    module_cbrcyb.minimumstart = 501;
                    module_cbrcyb.maximumend = 1000;
                    break;
                default:
                    module_cbrcyb.answerset = module_cbrcyb.cbrcybge;
                    module_cbrcyb.qbegin = 0;
                    break;
            }
          
            
            module_cbrcyb.answersheet();
           
            var ns = module_cbrcyb.qstart;
            var ne = module_cbrcyb.qend;
            var nb = module_cbrcyb.qbegin;
            
            
            
            var newns = ns - nb;
            var newne = ne - nb;

            


            var i = ns;
            var ic = ns - nb - 1;
            for (; i <= ne; i++) { 
                ic++;
                module_cbrcyb.answerspace(i,ic);
            };
            
           dom.dl("cbrccheck"); dom.dl("cbrcrestart"); dom.dl("cbrcresult1");dom.dl("cbrcresult2");
           dom.uca("BUTTON","cbrccheck","Check","divrender","onclick","module_cbrcyb.answercheck();");
           dom.uca("BUTTON","cbrcrestart","Restart","divrender","onclick","module_cbrcyb.start(module_cbrcyb.qstart,module_cbrcyb.qend,module_cbrcyb.qanset);");
            //alert(qstart + " | " + qend + " == " + ic);
            
            
           //WARNS IF START AND END DOESN'T FOLLOW THE RULES
            if (ns < module_cbrcyb.minimumstart) {
                dom.ac("divrender");
                //alert("Starting Number Too Small!");
                dom.uc("P","cbrcybtitle","Starting Number Too Small!","divrender");
            }else if (ne > module_cbrcyb.maximumend) {
                dom.ac("divrender");
                dom.uc("P","cbrcybtitle","Ending Number Too Big!","divrender");
                //alert("Ending Number Too Big!");
            } 
            
        };
        
        f.answersheet = function() {
            dom.dl("cbrcybtitle");
            dom.uc("P","cbrcybtitle",module_cbrcyb.answerset[0],"divrender");
            
            dom.ac("cbrcybtable");
            dom.us("TABLE","cbrcybtable","cbrcybtitle");
            dom.a("cbrcybtable","border","1");
            dom.s("cbrcybtable","padding","2px");
            dom.s("cbrcybtable","marginTop","10px");
            //CREATE TABLE LABELS
            dom.us("TR","","cbrcybtable");
            dom.uc("TD","","Number","cbrcybtable");
            dom.uc("TD","","Answer","cbrcybtable");
            dom.uc("TD","","Status","cbrcybtable");
            
        };
        
        f.answerspace = function(id,idn) {
            var i = id;
            var n = idn;
            dom.us("TR","","cbrcybtable");
            dom.uc("TD","cbrcybnum"+n,i,"cbrcybtable");
            dom.uc("TD","cbrcybans"+n,"","cbrcybtable");
            dom.uc("TD","cbrcybstats"+n,"Uncheck","cbrcybtable");
            
            dom.us("INPUT","cbrcybinput"+n,"cbrcybans"+n);
            dom.s("cbrcybinput"+n,"size","10px");
        };
        
        f.answercheck = function() {
            var ns = module_cbrcyb.qstart;
            var ne = module_cbrcyb.qend;
            var nb = module_cbrcyb.qbegin;
            
            var newns = ns - nb;
            var newne = ne - nb;
            
            var checkcount = 0;
            var itemcount = 0;
            //var n = ns;
            var i = newns;
            for (; i <= newne; i++) {
                itemcount++;
                var getans = dom.g("cbrcybinput"+i).value;
                var tempans = module_cbrcyb.answerset[i];
                var theans = tempans.toLowerCase();
                var yourans = getans.toLowerCase();
                //alert(i + " : " + getans + " | " + theans);
                if (yourans === theans) {
                    //alert("check!");
                    checkcount++;
                    dom.g("cbrcybstats"+i).innerHTML = "Check";
                }else if (yourans !== theans) {
                    //alert("wrong!");
                    dom.g("cbrcybstats"+i).innerHTML = "Wrong";
                };
                
            };
            
            dom.dl("cbrcresult1");dom.dl("cbrcresult2");
            dom.uc("P","cbrcresult1","RESULT","divrender");
            dom.uc("P","cbrcresult2",checkcount + " / " +  itemcount,"divrender");
            
            
            
        };
        
        return f;
    };
    
    
    
    
    if(typeof(window.module_cbrcyb)=== "undefined"){window.module_cbrcyb = module_functions();};
})(window);