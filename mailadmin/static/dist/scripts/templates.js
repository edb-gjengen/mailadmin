(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["alert.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"alert alert-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "cssClass"), env.autoesc);
output += "\">\n\t<a class=\"close\" data-dismiss=\"alert\">×</a>\n\t";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "msg"), env.autoesc);
output += "\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["list.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "lists");
if(t_3) {var t_1;
if(runtime.isArray(t_3)) {
var t_2 = t_3.length;
for(t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1][0]
frame.set("list", t_3[t_1][0]);
var t_5 = t_3[t_1][1]
frame.set("members", t_3[t_1][1]);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n<div class=\"fwdlist\" data-list-name=\"";
output += runtime.suppressValue(t_4, env.autoesc);
output += "\">\n\t<div class=\"panel panel-default\">\n\t    <div class=\"panel-heading\">";
output += runtime.suppressValue(t_4, env.autoesc);
output += " <span class=\"badge\">";
output += runtime.suppressValue(env.getFilter("length").call(context, t_5), env.autoesc);
output += "</span></div>\n\t\t<table class=\"table table-striped table-condensed\">\n\t\t\t<thead>\n\t\t        <tr>\n\t\t\t        <th>Medlem</th>\n\t\t\t        <th class=\"del-header\">Velg</th>\n\t\t        </tr>\n\t        </thead>\n\t        <tbody>\n\t\t\t";
frame = frame.push();
var t_8 = t_5;
if(t_8) {var t_7 = t_8.length;
for(var t_6=0; t_6 < t_8.length; t_6++) {
var t_9 = t_8[t_6];
frame.set("member", t_9);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
output += "\n\t\t\t\t<tr><td>";
output += runtime.suppressValue(runtime.memberLookup((t_9),"forward", env.autoesc), env.autoesc);
output += "</td><td class=\"del-cell\"><label class=\"del-label\" for=\"";
output += runtime.suppressValue(runtime.memberLookup((t_9),"dest", env.autoesc), env.autoesc);
output += "=";
output += runtime.suppressValue(runtime.memberLookup((t_9),"forward", env.autoesc), env.autoesc);
output += "\"><input id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_9),"dest", env.autoesc), env.autoesc);
output += "=";
output += runtime.suppressValue(runtime.memberLookup((t_9),"forward", env.autoesc), env.autoesc);
output += "\" type=\"checkbox\" name='fwd-delete' value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_9),"dest", env.autoesc), env.autoesc);
output += "=";
output += runtime.suppressValue(runtime.memberLookup((t_9),"forward", env.autoesc), env.autoesc);
output += "\"></label></td></tr>\n\t\t\t";
;
}
}
frame = frame.pop();
output += "\n\t\t\t\t<tr><td>\n\t\t\t\t<form><div class=\"input-group\">\n\t\t\t\t\t<input type=\"email\" name=\"new-email\" class=\"form-control\">\n\t\t\t\t\t<span class=\"input-group-btn\"><button class=\"btn btn-default js-new-email\" type=\"button\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span> Legg til</button></span>\n\t\t\t\t</div></form>\n\t\t\t\t</td><td><button class=\"btn btn-default btn-del js-del-selected\" type=\"button\" data-delete-list-name=\"";
output += runtime.suppressValue(t_4, env.autoesc);
output += "\"><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span> Slett</button></td></tr>\n\t\t\t</tbody>\n\t\t</table>\n\t\t<div class=\"result-alert\"></div>\n\t</div>\n</div>\n";
;
}
} else {
t_1 = -1;
var t_2 = runtime.keys(t_3).length;
for(var t_10 in t_3) {
t_1++;
var t_11 = t_3[t_10];
frame.set("list", t_10);
frame.set("members", t_11);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n<div class=\"fwdlist\" data-list-name=\"";
output += runtime.suppressValue(t_10, env.autoesc);
output += "\">\n\t<div class=\"panel panel-default\">\n\t    <div class=\"panel-heading\">";
output += runtime.suppressValue(t_10, env.autoesc);
output += " <span class=\"badge\">";
output += runtime.suppressValue(env.getFilter("length").call(context, t_11), env.autoesc);
output += "</span></div>\n\t\t<table class=\"table table-striped table-condensed\">\n\t\t\t<thead>\n\t\t        <tr>\n\t\t\t        <th>Medlem</th>\n\t\t\t        <th class=\"del-header\">Velg</th>\n\t\t        </tr>\n\t        </thead>\n\t        <tbody>\n\t\t\t";
frame = frame.push();
var t_14 = t_11;
if(t_14) {var t_13 = t_14.length;
for(var t_12=0; t_12 < t_14.length; t_12++) {
var t_15 = t_14[t_12];
frame.set("member", t_15);
frame.set("loop.index", t_12 + 1);
frame.set("loop.index0", t_12);
frame.set("loop.revindex", t_13 - t_12);
frame.set("loop.revindex0", t_13 - t_12 - 1);
frame.set("loop.first", t_12 === 0);
frame.set("loop.last", t_12 === t_13 - 1);
frame.set("loop.length", t_13);
output += "\n\t\t\t\t<tr><td>";
output += runtime.suppressValue(runtime.memberLookup((t_15),"forward", env.autoesc), env.autoesc);
output += "</td><td class=\"del-cell\"><label class=\"del-label\" for=\"";
output += runtime.suppressValue(runtime.memberLookup((t_15),"dest", env.autoesc), env.autoesc);
output += "=";
output += runtime.suppressValue(runtime.memberLookup((t_15),"forward", env.autoesc), env.autoesc);
output += "\"><input id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_15),"dest", env.autoesc), env.autoesc);
output += "=";
output += runtime.suppressValue(runtime.memberLookup((t_15),"forward", env.autoesc), env.autoesc);
output += "\" type=\"checkbox\" name='fwd-delete' value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_15),"dest", env.autoesc), env.autoesc);
output += "=";
output += runtime.suppressValue(runtime.memberLookup((t_15),"forward", env.autoesc), env.autoesc);
output += "\"></label></td></tr>\n\t\t\t";
;
}
}
frame = frame.pop();
output += "\n\t\t\t\t<tr><td>\n\t\t\t\t<form><div class=\"input-group\">\n\t\t\t\t\t<input type=\"email\" name=\"new-email\" class=\"form-control\">\n\t\t\t\t\t<span class=\"input-group-btn\"><button class=\"btn btn-default js-new-email\" type=\"button\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span> Legg til</button></span>\n\t\t\t\t</div></form>\n\t\t\t\t</td><td><button class=\"btn btn-default btn-del js-del-selected\" type=\"button\" data-delete-list-name=\"";
output += runtime.suppressValue(t_10, env.autoesc);
output += "\"><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span> Slett</button></td></tr>\n\t\t\t</tbody>\n\t\t</table>\n\t\t<div class=\"result-alert\"></div>\n\t</div>\n</div>\n";
;
}
}
}
frame = frame.pop();
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["new_list.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"panel panel-default\">\n  <div class=\"panel-heading\">Ny liste</div>\n  <div class=\"panel-body\">\n  \t<div class=\"input-group\">\n\t\t<span class=\"input-group-btn\">\n\t\t\t<button type=\"button\" class=\"btn btn-default prefix-btn dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "orgunits")),0, env.autoesc)),"prefix", env.autoesc), env.autoesc);
output += "- <span class=\"caret\"></span></button>\n\t\t\t<ul class=\"dropdown-menu prefix-select\">\n\t\t\t";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "orgunits");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("ou", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n\t\t\t\t<li";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"first", env.autoesc)) {
output += " class=\"active\"";
;
}
output += " data-value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"prefix", env.autoesc), env.autoesc);
output += "-\"><a href=\"#\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"prefix", env.autoesc), env.autoesc);
output += "-</a></li>\n\t\t\t";
;
}
}
frame = frame.pop();
output += "\n\t\t\t</ul>\n\t\t</span>\n\t\t<input type=\"text\" class=\"form-control js-new-list-name\">\n\t\t<span class=\"input-group-addon\">@studentersamfundet.no</span>\n\t</div>\n  \t<h4>Eposter <span class=\"badge email-counter\"></span></h4>\n    <textarea class=\"form-control\" placeholder=\"asdf@studentersamfundet.no, qwerty@studentersamfundet.no\" rows=\"4\"></textarea>\n    <button type=\"button\" class=\"btn btn-primary btn-add-list js-add-list\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span> Opprett liste</button>\n  </div>\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["orgunits.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "orgunits");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("ou", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n<li><a href=\"/lists/?q=";
output += runtime.suppressValue(runtime.memberLookup((t_4),"prefix", env.autoesc), env.autoesc);
output += "\" data-prefix=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"prefix", env.autoesc), env.autoesc);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name", env.autoesc), env.autoesc);
output += "</a></li>\n";
;
}
}
frame = frame.pop();
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
