//=========================================================================
//======================== MODULE *** DEFAULT =============================
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
//=========================================================================
//======================== MODULE *** SAMPLE1 =============================
//=========================================================================
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
