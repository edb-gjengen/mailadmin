(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["alert.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"alert alert-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "alertClass"), env.autoesc);
output += "\">\n\t<a class=\"close\" data-dismiss=\"alert\">×</a>\n\t";
if(runtime.contextOrFrameLookup(context, frame, "iconClass")) {
output += "<span class=\"glyphicon glyphicon-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "iconClass "), env.autoesc);
output += "\"></span> ";
;
}
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
output += "\">\n\t<div class=\"panel panel-default\">\n\t    <div class=\"panel-heading\"><span class=\"glyphicon glyphicon-list-alt icon-faded\" aria-hidden=\"true\"></span> ";
output += runtime.suppressValue(t_4, env.autoesc);
output += " <span class=\"badge\">";
output += runtime.suppressValue(env.getFilter("length").call(context, t_5), env.autoesc);
output += "</span></div>\n\t\t<table class=\"table table-condensed\">\n\t        <tbody>\n\t\t\t";
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
output += "\n\t\t\t\t<tr><td class=\"member\">";
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
output += "\n\t\t\t\t<tr class=\"action-row\">\n\t\t\t\t<td>\n\t\t\t\t\t<a href=\"#\" class=\"link-add js-toggle-email-textarea\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span> Legg til</a>\n\t\t\t\t</td>\n\t\t\t\t<td>\n\t\t\t\t\t<a href=\"#\" class=\"link-del js-del-selected\" type=\"button\" data-delete-list-name=\"";
output += runtime.suppressValue(t_4, env.autoesc);
output += "\"><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span> Slett</a>\n\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr class=\"textarea-row\">\n\t\t\t\t<td colspan=\"2\">\n\t\t\t\t\t<h4>Eposter <span class=\"badge email-counter\"></span></h4>\n    \t\t\t\t<textarea class=\"form-control js-add-list-textarea\" data-list-name=\"";
output += runtime.suppressValue(t_4, env.autoesc);
output += "\" placeholder=\"asdf@studentersamfundet.no, qwerty@studentersamfundet.no f.eks. Klipp og lim så mye du orker\" rows=\"4\"></textarea>\n    \t\t\t\t<button type=\"button\" class=\"btn btn-primary btn-add-list js-new-email\"><span class=\"glyphicon glyphicon-plus js-new-email\" aria-hidden=\"true\"></span> Legg til</button>\n    \t\t\t</td>\n    \t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t\t<div class=\"result-alert\"></div>\n\t</div>\n</div>\n";
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
output += "\">\n\t<div class=\"panel panel-default\">\n\t    <div class=\"panel-heading\"><span class=\"glyphicon glyphicon-list-alt icon-faded\" aria-hidden=\"true\"></span> ";
output += runtime.suppressValue(t_10, env.autoesc);
output += " <span class=\"badge\">";
output += runtime.suppressValue(env.getFilter("length").call(context, t_11), env.autoesc);
output += "</span></div>\n\t\t<table class=\"table table-condensed\">\n\t        <tbody>\n\t\t\t";
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
output += "\n\t\t\t\t<tr><td class=\"member\">";
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
output += "\n\t\t\t\t<tr class=\"action-row\">\n\t\t\t\t<td>\n\t\t\t\t\t<a href=\"#\" class=\"link-add js-toggle-email-textarea\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span> Legg til</a>\n\t\t\t\t</td>\n\t\t\t\t<td>\n\t\t\t\t\t<a href=\"#\" class=\"link-del js-del-selected\" type=\"button\" data-delete-list-name=\"";
output += runtime.suppressValue(t_10, env.autoesc);
output += "\"><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span> Slett</a>\n\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr class=\"textarea-row\">\n\t\t\t\t<td colspan=\"2\">\n\t\t\t\t\t<h4>Eposter <span class=\"badge email-counter\"></span></h4>\n    \t\t\t\t<textarea class=\"form-control js-add-list-textarea\" data-list-name=\"";
output += runtime.suppressValue(t_10, env.autoesc);
output += "\" placeholder=\"asdf@studentersamfundet.no, qwerty@studentersamfundet.no f.eks. Klipp og lim så mye du orker\" rows=\"4\"></textarea>\n    \t\t\t\t<button type=\"button\" class=\"btn btn-primary btn-add-list js-new-email\"><span class=\"glyphicon glyphicon-plus js-new-email\" aria-hidden=\"true\"></span> Legg til</button>\n    \t\t\t</td>\n    \t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t\t<div class=\"result-alert\"></div>\n\t</div>\n</div>\n";
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
output += "<div class=\"panel panel-default\">\n  <div class=\"panel-heading\"><span class=\"glyphicon glyphicon-list-alt icon-faded\" aria-hidden=\"true\"></span> <span class=\"js-new-list-preview\">Ny liste</span></div>\n  <div class=\"panel-body\">\n  \t<div class=\"input-group\">\n\t\t<span class=\"input-group-btn\">\n\t\t\t<button type=\"button\" class=\"btn btn-default prefix-btn dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">";
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
output += "\n\t\t\t</ul>\n\t\t</span>\n\t\t<input type=\"text\" class=\"form-control js-new-list-name\">\n\t\t<span class=\"input-group-addon\">@studentersamfundet.no</span>\n\t</div>\n  \t<h4>Eposter <span class=\"badge email-counter\"></span></h4>\n    <textarea class=\"form-control\" placeholder=\"asdf@studentersamfundet.no, qwerty@studentersamfundet.no f.eks. Klipp og lim så mye du orker\" rows=\"4\"></textarea>\n    <button type=\"button\" class=\"btn btn-primary btn-add-list js-add-list\"><span class=\"glyphicon glyphicon-plus js-add-list\" aria-hidden=\"true\"></span> Opprett liste</button>\n  </div>\n</div>";
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
output += "<li class=\"active\"><a href=\"/lists/\" data-prefix=\".*\">Alle</a></li>\n";
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
output += " (";
output += runtime.suppressValue(runtime.memberLookup((t_4),"prefix", env.autoesc), env.autoesc);
output += ")</a></li>\n";
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

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["orgunits_select.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<select class=\"orgunits-select form-control\">\n    <option value=\".+\">Alle</option>\n\t";
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
output += "\n\t<option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"prefix", env.autoesc), env.autoesc);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name", env.autoesc), env.autoesc);
output += "</option>\n\t";
;
}
}
frame = frame.pop();
output += "\n</select>";
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
