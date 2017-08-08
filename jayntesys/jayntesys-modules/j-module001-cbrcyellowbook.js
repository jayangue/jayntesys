(function(window){
    function module_functions() {
        var f = {};
        
        f.qstart = 0;
        f.qend = 0;
        f.qanset = "";//Answer List;
        f.answerset = [];
        f.cbrcyblist = ["CBRC Yellow Book (1 - 500)","B","A","B","B","A","A","B","A","B","A","A","B","B","A","A","A","A","B","B","A","B","A","B","A","A","B","B","B","A","B","B","B","B","A","A","A","B","A","A","B","B","A","A","A","B","B","B","A","B","A","B","B","A","A","A","B","A","A","B","A","A","B","A","B","B","A","A","A","A","A","A","B","A","A","A","A","B","B","B","Z","B","A","A","A","A","A","A","B","B","B","A","A","B","B","A","A","A","A","B","B","A","A","B","B","A","A","A","A","A","A","A","A","B","B","A","B","A","A","B","A","B","A","B","A","A","A","A","A","A","A","A","B","B","A","A","A","B","B","A","A","B","A","A","A","A","B","A","B","B","A","A","A","B","B","B","B","A","B","B","A","A","A","B","A","B","A","B","A","A","B","A","B","A","A","B","A","B","B","A","B","B","A","B","A","B","B","A","B","A","B","A","B","B","B","A","A","A","B","B","B","B","A","B","A","A","B","A","B","A","A","B","B","B","B","A","A","B","B","A","B","A","B","A","B","B","A","B","B","B","A","B","B","A","A","B","A","A","A","A","A","B","A","A","B","A","A","B","A","B","B","B","B","A","A","B","B","A","B","B","B","A","B","B","A","A","B","B","A","A","B","B","A","A","A","A","B","B","A","A","A","A","B","A","B","B","A","B","A","A","A","A","A","7440","B","A","A","A","A","A","A","A","B","A","A","B","A","A","A","A","B","A","A","B","A","B","A","A","A","A","A","A","B","A","A","B","B","A","A","A","A","A","B","A","A","A","B","B","B","B","A","B","B","B","A","B","B","A","A","B","B","A","A","A","A","B","B","A","B","A","B","B","A","A","B","A","A","A","A","A","B","A","B","A","A","A","B","A","A","B","A","A","A","A","A","B","B","B","B","A","A","A","A","A","B","A","A","B","A","B","A","A","B","B","B","B","A","B","B","A","A","A","B","B","B","A","A","A","A","A","A","B","A","A","A","A","B","B","B","A","B","A","A","A","A","B","B","B","A","A","B","B","B","A","A","A","B","A","A","B","A","B","B","A","A","A","B","A","B","B","A","A","A","A","A","A","B","B","A","B","A","B","A","B","B","A","A","A","A","A","A","A","A","B","A","A","A","B","A","B","A","B","A","A","B","A","A","B","A","B","A"];
        
        f.showparameters = function() {
            var div = "div_module_cbrcyb" + modulebook.s;
            var qstart = modulebook.m[modulebook.s][3][0];
            var qend = modulebook.m[modulebook.s][3][1];
            var qas = modulebook.m[modulebook.s][3][2];
            
            dom.us("DIV",div,"divparamarea"+modulebook.s);
            dom.uc("P",div+"qstarttxt","Starting Number",div);
            dom.us("INPUT",div+"qstartinput",div);
            dom.uc("P",div+"qendtxt","End Number",div);
            dom.us("INPUT",div+"qendinput",div);
            dom.uc("P",div+"qastxt","Answer Set",div);
            dom.us("INPUT",div+"qasinput",div);
            dom.us("SELECT",div+"qasset",div);
            dom.us("OPTION",div+"qasset0",div+"qasset"); //Question Answer Set 0 
            dom.uc("P",div+"qassettxt0","CBRC Yellow Book",div+"qasset0");
            
            
            
            dom.g(div+"qstartinput").value = qstart;
            dom.g(div+"qendinput").value = qend;
            dom.g(div+"qasinput").value = qas;
            
            
            
        };
        
        f.saveparameters = function() {
            var div = "div_module_cbrcyb" + modulebook.s;
            modulebook.m[modulebook.s][3][0] = dom.gv(div+"qstartinput");
            modulebook.m[modulebook.s][3][1] = dom.gv(div+"qendinput");
            modulebook.m[modulebook.s][3][2] = dom.gv(div+"qasinput");
        };
        
        f.start = function(qstart,qend,answers) {
           
            module_cbrcyb.qstart = parseInt(qstart);
            module_cbrcyb.qend = parseInt(qend);
            module_cbrcyb.qanset = answers;
            
            var ns = module_cbrcyb.qstart;
            var ne = module_cbrcyb.qend;
            
            switch(module_cbrcyb.qanset) {
                case "cbrcyb": 
                    module_cbrcyb.answerset = module_cbrcyb.cbrcyblist;
                    alert("cbrcyb detected");
                    break;
                default:
                    module_cbrcyb.answerset = module_cbrcyb.cbrcyblist;
                    alert("cbrcyb not detected");
                    break;
            }
          
            
            module_cbrcyb.answersheet();
           
            
            var i = ns;
            var ic = 0;
            for (; i <= ne; i++) {
                ic++;
                module_cbrcyb.answerspace(i);
            };
            
           dom.dl("cbrccheck"); dom.dl("cbrcrestart");
           dom.uca("BUTTON","cbrccheck","Check","divrender","onclick","module_cbrcyb.answercheck();");
           dom.uca("BUTTON","cbrcrestart","Restart","divrender","onclick","module_cbrcyb.start(module_cbrcyb.qstart,module_cbrcyb.qend,module_cbrcyb.qanset);");
           
            alert(qstart + " | " + qend + " == " + ic);
            
            
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
        
        f.answerspace = function(idn) {
            var id = idn;
            dom.us("TR","","cbrcybtable");
            dom.uc("TD","cbrcybnum"+id,id,"cbrcybtable");
            dom.uc("TD","cbrcybans"+id,"","cbrcybtable");
            dom.uc("TD","cbrcybstats"+id,"Uncheck","cbrcybtable");
            
            dom.us("INPUT","cbrcybinput"+id,"cbrcybans"+id);
            dom.s("cbrcybinput"+id,"size","10px");
        };
        
        f.answercheck = function() {
            var ns = module_cbrcyb.qstart;
            var ne = module_cbrcyb.qend;
            
            var i = ns;
            for (; i <= ne; i++) {
                var getans = dom.g("cbrcybinput"+i).value;
                var tempans = module_cbrcyb.answerset[i];
                var theans = tempans.toLowerCase();
                var yourans = getans.toLowerCase();
                //alert(i + " : " + getans + " | " + theans);
                if (yourans === theans) {
                    //alert("check!");
                    dom.g("cbrcybstats"+i).innerHTML = "Check";
                }else if (yourans !== theans) {
                    //alert("wrong!");
                    dom.g("cbrcybstats"+i).innerHTML = "Wrong";
                };
                
            };
            
            
            
        };
        
        return f;
    };
    
    
    
    
    if(typeof(window.module_cbrcyb)=== "undefined"){window.module_cbrcyb = module_functions();};
})(window);