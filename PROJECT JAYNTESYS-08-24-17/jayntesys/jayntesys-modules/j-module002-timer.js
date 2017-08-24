(function(window){
    function module_functions (){
        var f = {};
        
        f.count = 0;
        f.thour = 0;
        f.tminutes = 0;
        f.tseconds = 0;
        f.morethansec = false;
        f.tsec = 0;
        f.tmin = 0;
        f.thour = 0;
        f.ttime = 0;
        f.ispaused = false;
        f.ishidden = false;
        
        f.showparameters = function() {
            var div = "div_module_cdtimer" + modulebook.s;
            dom.us("DIV",div,"divparamarea"+ modulebook.s);
             
            var ih = modulebook.m[modulebook.s][3][0];
            var im = modulebook.m[modulebook.s][3][1];
            var is = modulebook.m[modulebook.s][3][2];
            var ts = modulebook.m[modulebook.s][3][3];
             
            dom.uc("P",div+"cdtimertxt01","Hour(s)-[Unlimited]",div);
            dom.us("INPUT",div+"cdtimerinput01",div);
            dom.uc("P",div+"cdtimertxt02","Minute(s)-[Max:60]",div);
            dom.us("INPUT",div+"cdtimerinput02",div);
            dom.uc("P",div+"cdtimertxt03","Seconds(s)-[Max:60]",div);
            dom.us("INPUT",div+"cdtimerinput03",div);
            dom.uc("P",div+"cdtimertxt03","Time Font Size",div);
            dom.us("INPUT",div+"cdtimerinput04",div);
              
            dom.g(div+"cdtimerinput01").value = ih;
            dom.g(div+"cdtimerinput02").value = im;
            dom.g(div+"cdtimerinput03").value = is;
            dom.g(div+"cdtimerinput04").value = ts;
              
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
            modulebook.m[modulebook.s][3][3] = dom.gv(div+"cdtimerinput04");
        };
        
        f.start = function(hour,minute,second,fontsize) {
            
            dom.uc("P","cdtimertxt","","divrender");
            
            var ih = parseInt(hour);
            var im = parseInt(minute);
            var is = parseInt(second);
            var ts = parseInt(fontsize);
            var ihc = isNaN(ih);
            var imc = isNaN(im);
            var isc = isNaN(is);
            var tsc = isNaN(ts);
            if (ihc === true) {ih = 0;};
            if (imc === true) {im = 0;};
            if (isc === true) {is = 0;};
            if (tsc === true) {ts = 20;};
            module_cdtimer.thour = ih;
            module_cdtimer.tminutes = im;
            module_cdtimer.tseconds = is;
 
            dom.s("cdtimertxt","fontSize",ts + "px");
            
            if (im > 60) {im = 60;};
            if (is > 60) {is = 60;};
            
            
            
            var ihv = ih * 60 * 60;
            var imv = im * 60;
            
            var totaltime = ihv + imv + is;
            module_cdtimer.ttime = totaltime;
            
            module_cdtimer.morethansec = false;
            if (module_cdtimer.ttime > 60){module_cdtimer.morethansec = true;};
           
            module_cdtimer.tsec = is;
            module_cdtimer.tmin = im;
            module_cdtimer.thour = ih;
            module_cdtimer.ispaused = false;
            module_cdtimer.ishidden = false;
            
            var txthour = ih < 10 ? "0" + ih : ih;
            var txtmin = im < 10 ? "0" + im : im;
            var txtsec = is < 10 ? "0" + is: is;
            dom.g("cdtimertxt").innerHTML = txthour + ":" + txtmin + ":" + txtsec;
            
            
            dom.us("DIV","cdtimerdiv","divrender");
            dom.uca("BUTTON","cdtimerinit","Begin Countdown!","cdtimerdiv","onclick","module_cdtimer.timer();");
            
            
        };
        f.timer = function() {
            var morethansec = module_cdtimer.morethansec;
            var tsec = module_cdtimer.tsec;
            var tmin = module_cdtimer.tmin;
            var thour = module_cdtimer.thour;
            var ttime = module_cdtimer.ttime;
            var txthour;
            var txtmin;
            var txtsec;
            
            module_cdtimer.createbuttons();
            if (tmin >= 1 && tsec === 0){tmin = tmin - 1; tsec = 60;};
            setInterval(function () {
                    if (ttime > 0 && module_cdtimer.ispaused === false) {
                        if (morethansec === true) {
                            if (tsec !== 0) {
                                tsec--;
                            }else if (tsec === 0) {
                                if (tmin !== 0){
                                    tmin--;
                                }else if(tmin === 0 && thour !== 0){
                                    tmin = 59;
                                    thour--;
                                };
                            tsec = 59;
                           };
                        }else if (morethansec === false) {tsec--;};
                        ttime--;
                    }else if (ttime <= 0 && module_cdtimer.ispaused === false){clearInterval();};
                    
                    if (ttime > 0) {
                        txthour = thour < 10 ? "0" + thour : thour;
                        txtmin = tmin < 10 ? "0" + tmin : tmin;
                        txtsec = tsec < 10 ? "0" + tsec: tsec;
                        if (module_cdtimer.ishidden === false) {
                            dom.g("cdtimertxt").innerHTML = txthour + ":" + txtmin + ":" + txtsec;
                        }else if (module_cdtimer.ishidden === true) {
                            dom.g("cdtimertxt").innerHTML = "";
                        }; 
                    }else if (ttime <= 0){
                        clearInterval();
                        if (module_cdtimer.ishidden === false) {
                            dom.g("cdtimertxt").innerHTML = "TIME'S UP!!!";
                        }else if (module_cdtimer.ishidden === true) {
                            module_cdtimer.ishidden = false;
                            module_cdtimer.createbuttons();
                            dom.g("cdtimertxt").innerHTML = "TIME'S UP!!!";
                        };  
                    };
                    
                    
            }, 1000);
        };
        f.createbuttons = function() {
            dom.ac("cdtimerdiv");
            if (module_cdtimer.ispaused === false && module_cdtimer.ishidden === false) {
                dom.uca("BUTTON","cdtimerstop","Pause","cdtimerdiv","onclick","module_cdtimer.ispaused = true;module_cdtimer.createbuttons();");
            }else if (module_cdtimer.ispaused === true && module_cdtimer.ishidden === false) {
                dom.uca("BUTTON","cdtimerstart","Start","cdtimerdiv","onclick","module_cdtimer.ispaused = false;module_cdtimer.createbuttons();");
            };
            
            if (module_cdtimer.ishidden === false) {
                dom.uca("BUTTON","cdtimerhide","Hide Timer","cdtimerdiv","onclick","module_cdtimer.ishidden = true;module_cdtimer.createbuttons();");
            }else if (module_cdtimer.ishidden === true) {
                dom.g("cdtimertxt").innerHTML = "";
                dom.uca("BUTTON","cdtimershow","Show Timer","cdtimerdiv","onclick","module_cdtimer.ishidden = false;module_cdtimer.createbuttons();");
            };
            //DESTROY TIMER
             dom.uca("BUTTON","cdtimerdestroy","Destroy","cdtimerdiv","onclick","module_cdtimer.ispaused = true; dom.dl('cdtimertxt');dom.dl('cdtimerdiv');");
            
        };
        return f;
    };
    
    
    if (typeof(window.module_cdtimer)==="undefined"){window.module_cdtimer = module_functions();};
})(window);