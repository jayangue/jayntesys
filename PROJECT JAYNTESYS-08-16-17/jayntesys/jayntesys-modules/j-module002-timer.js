(function(window){
    function module_functions (){
        var f = {};
        
        f.count = 0;
        
        f.showparameters = function() {
             var div = "div_module_cdtimer" + modulebook.s;
             dom.us("DIV",div,"divparamarea"+ modulebook.s);
             
            var ih = modulebook.m[modulebook.s][3][0];
            var im = modulebook.m[modulebook.s][3][1];
            var is = modulebook.m[modulebook.s][3][2];
             
              dom.uc("P",div+"cdtimertxt01","Hour(s)-[Unlimited]",div);
              dom.us("INPUT",div+"cdtimerinput01",div);
              dom.uc("P",div+"cdtimertxt02","Minute(s)-[Max:60]",div);
              dom.us("INPUT",div+"cdtimerinput02",div);
              dom.uc("P",div+"cdtimertxt03","Seconds(s)-[Max:60]",div);
              dom.us("INPUT",div+"cdtimerinput03",div);
              
              dom.g(div+"cdtimerinput01").value = ih;
              dom.g(div+"cdtimerinput02").value = im;
              dom.g(div+"cdtimerinput03").value = is;
              
        };
        
        f.saveparameters = function() {
            var div = "div_module_cdtimer" + modulebook.s;
            
            var im = dom.gv(div+"cdtimerinput02");
            var is = dom.gv(div+"cdtimerinput03");
            
            if (im > 60) {im = 60;};
            if (is > 60) {is = 60;};
            
            modulebook.m[modulebook.s][3][0] = dom.gv(div+"cdtimerinput01");
            modulebook.m[modulebook.s][3][1] = im;
            modulebook.m[modulebook.s][3][2] = is;
        };
        
        f.start = function(hour,minute,second) {
            var ih = parseInt(hour);
            var im = parseInt(minute);
            var is = parseInt(second);
            var ihc = isNaN(ih);
            var imc = isNaN(im);
            var isc = isNaN(is);
            if (ihc === true) {ih = 0;};
            if (imc === true) {im = 0;};
            if (isc === true) {is = 0;};
            //alert(ihc);
            //alert(im);
            //alert(is);
            
            
            if (im > 60) {im = 60;};
            if (is > 60) {is = 60;};
            
            var ihv = ih * 60 * 60;
            var imv = im * 60;
            
            var totaltime = ihv + imv + is;
            
            alert("Total Time: " + totaltime );
          
            
            setInterval(alert("hello"),1);
            
        };
        
        f.calculate = function() {
            module_cdtimer.count++;
            dom.dl("mytxt");
            dom.uc("P","mytxt",module_cdtimer.count,"divrender");
        };
        return f;
    };
    
    
    if (typeof(window.module_cdtimer)==="undefined"){window.module_cdtimer = module_functions();};
})(window);