//=========================================================================
//============= DOCUMENT OBJECT MODEL AND CANVAS LIBRARY ==================
//=========================================================================
    (function(window){
        function domfunctions() {
            var f = {};
            //g = getElementById
            f.g = function(id) {var a = document.getElementById(id); return a;};
            //gv = getElementById.value
            f.gv = function(id) {var a = document.getElementById(id);if(a !== null){return a.value;}else{return "";};};
            //gi = getElementById.innerHTML
            f.gi = function(id,value) {var a = document.getElementById(id).innerHTML = value; return a;};
            //All Clear
            f.ac = function(id) {var a = document.getElementById(id); if(a !== null) {while (a.hasChildNodes()){a.removeChild(a.firstChild);};};};
            //DELETE
            f.dl = function(id) {var a = document.getElementById(id); if(a !== null) {a.parentNode.removeChild(a);};};
            //COntainer
            f.co = function (type, id) {var a = document.createElement(type); a.setAttribute("id", id); document.body.appendChild(a);};
            //UI Add Text
            f.uat = function (id,text) {var a = document.getElementById(id); var b = document.createTextNode(text); if (a.hasChildNodes()===true){a.removeChild(a.firstChild);a.appendChild(b);};};
            // Simple
            f.us = function (type,id,attach) {var a = document.createElement(type); var c = document.getElementById(attach); a.setAttribute("id",id); c.appendChild(a);};
            // Complex
            f.uc = function (type,id,text,attach) {var a = document.createElement(type); var b = document.createTextNode(text); var c = document.getElementById(attach); a.setAttribute("id",id); a.appendChild(b); c.appendChild(a);};
            //Complex + Advance Functions
            f.uca = function (type,id,text,attach,action,func) {var a = document.createElement(type); var b = document.createTextNode(text); var c = document.getElementById(attach); a.setAttribute("id",id); a.setAttribute(action,func); a.appendChild(b); c.appendChild(a);};
            //Complex + Width Height >> For html tags that uses width and height
            f.ubta = function (id,text,attach,width,height) {var a = document.createElement("TEXTAREA"); var b = document.createTextNode(text); var c = document.getElementById(attach); a.setAttribute("id",id);a.appendChild(b); c.appendChild(a);dom.s(id, "width", width); dom.s(id, "height", height);};
            //Canvas
            f.canvas = function(name,attach,width,height) {dom.us("CANVAS",name,attach);dom.s(name,"width",width + "px");dom.s(name,"height",height + "px");};
            //Attribute
            f.a = function (id,type,value) {var a = document.getElementById(id); a.setAttribute(type,value);};
            //Styles
            f.s = function (elementid, theproperty, value) {
                var a = document.getElementById(elementid); 
                switch (theproperty) {
                    // ADD CSS ELEMENTS HERE
                    case "color": a.style.color = value; break;
                    case "textAlign": a.style.textAlign = value; break;
                    case "position":a.style.position = value;break;
                    case "display": a.style.display = value; break;
                    case "backgroundColor": a.style.backgroundColor = value; break;
                    case "size": a.style.size = value; break;
                    case "margin": a.style.margin = value; break;
                    case "marginTop": a.style.marginTop = value; break;
                    case "marginBottom": a.style.marginBottom = value; break;
                    case "marginLeft": a.style.marginLeft = value; break;
                    case "marginRight": a.style.marginRight = value; break;
                    case "padding": a.style.padding = value; break;
                    case "paddingTop": a.style.paddingTop = value; break;
                    case "paddingBottom": a.style.paddingBottom = value; break;
                    case "paddingLeft": a.style.paddingLeft = value; break;
                    case "paddingRight": a.style.paddingRight = value; break;
                    case "fontSize": a.style.fontSize = value; break;
                    case "width": a.style.width = value; break;
                    case "height": a.style.height = value; break;
                    //============================
                    default: alert("property not found");
                }; 
            };
            
            f.windowwidth = 0;
            f.windowheight = 0;
            f.changeareatarget = [];
            f.changeareawidth = [];
            f.changeareaheight = [];
            f.changeareawidthmin = [];
            f.changeareaheightmin = [];
            f.changeareawidthmax = [];
            f.changeareaheightmax = [];
            
            f.changearea = function(target,width,height,widthmin,heightmin,widthmax,heightmax) {
                var n = dom.changeareatarget.length;
                var contains = false;
                var i = 0;
                while (n--) {
                    if(dom.changeareatarget[n] === target) {
                        contains = true;
                        i = n;
                    };
                };
                if(contains === true) {
                    dom.changeareawidth[i] = width;
                    dom.changeareaheight[i] = height;
                    dom.changeareawidthmin[i] = widthmin;
                    dom.changeareaheightmin[i] = heightmin;
                    dom.changeareawidthmax[i] = widthmax;
                    dom.changeareaheightmax[i] = heightmax;
                }else if(contains === false){
                    dom.changeareatarget.push(target);
                    dom.changeareawidth.push(width);
                    dom.changeareaheight.push(height);
                    dom.changeareawidthmin.push(widthmin);
                    dom.changeareaheightmin.push(heightmin);
                    dom.changeareawidthmax.push(widthmax);
                    dom.changeareaheightmax.push(heightmax);
                    i = dom.changeareatarget.length - 1;
                };
                clearInterval(dom.changeareaupdate);
                setInterval(dom.changeareaupdate,100);
                
                var getw = window.innerWidth;
                var geth = window.innerHeight;
                
                if (dom.changeareawidth[i] >= 1) {
                    var w = getw / dom.changeareawidth[i];
                            
                    if (w <= dom.changeareawidthmin[i] && dom.changeareawidthmin[i] >= 1) {
                        w = dom.changeareawidthmin[i];
                    }else if (w >= dom.changeareawidthmax[i] && dom.changeareawidthmax[i] >= 1) {
                        w = dom.changeareawidthmax[i];
                    };
                    //alert(dom.changeareatarget[i] + " width: " + w);
                    dom.s(dom.changeareatarget[i],"width",w + "em");
                };
                        
                if (dom.changeareaheight[i] >= 1) {
                    var h = geth / dom.changeareaheight[i];
                            
                    if (h <= dom.changeareaheightmin[i] && dom.changeareaheightmin[i] >= 1) {
                        h = dom.changeareaheightmin[i];
                    }else if (h >= dom.changeareaheightmax[i] && dom.changeareaheightmax[i] >= 1) {
                        h = dom.changeareaheightmax[i];
                    };
                            
                    //alert(dom.changeareatarget[i] + " height: " + h);
                    dom.s(dom.changeareatarget[i],"height",h + "em");
                            
                };
            };
            f.changeareaupdate = function() {
                
                var getw = window.innerWidth;
                var geth = window.innerHeight;
                if (getw !== dom.windowwidth || geth !== dom.windowheight) {
                    dom.windowwidth = getw;
                    dom.windowheight = geth;
                    var i = 0;
                    for (;i < dom.changeareatarget.length;i++) {
                        var target = dom.g(dom.changeareatarget[i]);
                        if (target !== null) {
                            if (dom.changeareawidth[i] >= 1) {
                                var w = getw / dom.changeareawidth[i];
                            
                                if (w <= dom.changeareawidthmin[i] && dom.changeareawidthmin[i] >= 1) {
                                    w = dom.changeareawidthmin[i];
                                }else if (w >= dom.changeareawidthmax[i] && dom.changeareawidthmax[i] >= 1) {
                                    w = dom.changeareawidthmax[i];
                                };
                            
                                //alert(dom.changeareatarget[i] + " width: " + w);
                                dom.s(dom.changeareatarget[i],"width",w + "em");
                            };
                        
                            if (dom.changeareaheight[i] >= 1) {
                                var h = geth / dom.changeareaheight[i];
                            
                                if (h <= dom.changeareaheightmin[i] && dom.changeareaheightmin[i] >= 1) {
                                    h = dom.changeareaheightmin[i];
                                }else if (h >= dom.changeareaheightmax[i] && dom.changeareaheightmax[i] >= 1) {
                                    h = dom.changeareaheightmax[i];
                                };
                            
                                //alert(dom.changeareatarget[i] + " height: " + h);
                                dom.s(dom.changeareatarget[i],"height",h + "em");
                            
                            };
                        };
                          
                    };
                };
            };
            
            return f;
        };
        
        if(typeof(window.dom)==="undefined") {window.dom = domfunctions();};
        
    })(window);
    window.canvas = (function(){
        
        /*SAMPLE CANVAS
         * dom.co(st.h.dv,"thecanvas");
         * var a = canvas("paper","thecanvas",500,500);
         * a.fstyle("black");
         * a.frect(0,0,a.w,a.h);
         * a.sstyle("white");
         * a.linew(5);
         * a.bpath();
         * a.move(100,100);
         * a.line(150,200);
         * a.cpath();
         * a.stroke();
         * a.font("20px Helvetica");
         * a.ftext("fuck",50,50);
         * a.circle(50,50,50); */
        
        return function(name,attach,width,height) {
            dom.us("CANVAS",name,attach);
            dom.s(name,"width",width + "px");
            dom.s(name,"height",height + "px");
            var thecanvas = document.getElementById(name);
            var c = thecanvas.getContext("2d");
            var f = {};
            
            f.w = thecanvas.width;
            f.h = thecanvas.height;
            //for fills
            f.fill =  function() {c.fill();};
            f.fstyle = function(color) {c.fillStyle = color;};
            f.frect = function(posx,posy,thewidth,theheight) {
                c.fillRect(posx,posy,thewidth,theheight);
            };
            //for strokes
            f.stroke =  function() {c.stroke();};
            f.sstyle = function(color){c.strokeStyle = color;};
            f.srect = function(posx,posy,thewidth,theheight) {
                c.strokeRect(posx,posy,thewidth,theheight);
            };
            //for lines
            f.linew = function(width){c.lineWidth = width;};
            f.line = function(posx,posy) {c.lineTo(posx,posy);};
            f.move = function(posx,posy) {c.moveTo(posx,posy);};
            //for path
            f.bpath =  function() {c.beginPath();};
            f.cpath =  function() {c.closePath();};
            f.restore = function() {c.restore();};
            //for text
            f.font = function(font) {c.font = font;};
            f.ftext = function(txt,posx,posy) {c.fillText(txt,posx,posy);};
            
            //for shapes
            f.arc = function(posx,posy,radius,radiusstart,reverse) {
                c.arc(posx,posy,radius,radiusstart,Math.PI * 2, reverse);
            };
            f.circle = function(posx,posy,radius,color) {
                c.arc(posx,posy,radius,0,Math.PI * 2, false);
                if (typeof(color)==="undefined") {c.fill();}else if (typeof(color)==="string"){c.fillStyle = color;c.fill();}; 
            };

            return f; 
        };
    }());
//=========================================================================
//======================== END OF JAVASCRIPT ==============================
//=========================================================================