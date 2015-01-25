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

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["aliases.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "aliases");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("alias", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n<tr class=\"alias-row\">\n    <td class=\"alias\"><span class=\"js-destination\" title=\"Lagt til ";
output += runtime.suppressValue(env.getFilter("datefromnow").call(context, runtime.memberLookup((t_4),"created", env.autoesc)), env.autoesc);
output += " (";
output += runtime.suppressValue(env.getFilter("date").call(context, runtime.memberLookup((t_4),"created", env.autoesc),"LLLL"), env.autoesc);
output += ")\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"destination", env.autoesc), env.autoesc);
output += "</span></td>\n    <td class=\"del-cell\">\n        <label class=\"del-label\" for=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id", env.autoesc), env.autoesc);
output += "\"><input id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id", env.autoesc), env.autoesc);
output += "\" type=\"checkbox\" name='fwd-delete' value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id", env.autoesc), env.autoesc);
output += "\" data-source=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"source", env.autoesc), env.autoesc);
output += "\" data-destination=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"destination", env.autoesc), env.autoesc);
output += "\" data-domain=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"domain", env.autoesc), env.autoesc);
output += "\"/></label>\n    </td>\n</tr>\n";
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
frame.set("aliases", t_3[t_1][1]);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n<div class=\"fwdlist\" data-list-name=\"";
output += runtime.suppressValue(t_4, env.autoesc);
output += "\" data-domain=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_5),0, env.autoesc)),"domain", env.autoesc), env.autoesc);
output += "\">\n\t<div class=\"panel panel-default\">\n\t    <div class=\"panel-heading\"><span class=\"glyphicon glyphicon-list-alt icon-faded\" aria-hidden=\"true\"></span> ";
output += runtime.suppressValue(t_4, env.autoesc);
output += " <span class=\"badge badge-list-total\">";
output += runtime.suppressValue(env.getFilter("length").call(context, t_5), env.autoesc);
output += "</span></div>\n\t\t<table class=\"table table-condensed\">\n\t        <tbody>\n\t        \t<!-- Aliases -->\n\t\t\t\t";
env.getTemplate("aliases.html", function(t_8,t_6) {
if(t_8) { cb(t_8); return; }
t_6.render(context.getVariables(), frame.push(), function(t_9,t_7) {
if(t_9) { cb(t_9); return; }
output += t_7
output += "\n\t\t\t\t<!-- Actions: Add/Remove -->\n\t\t\t\t<tr class=\"action-row\">\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<a href=\"#\" class=\"link-add js-toggle-email-textarea\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span> Legg til</a>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<a href=\"#\" class=\"link-del js-del-selected\" type=\"button\" data-delete-list-name=\"";
output += runtime.suppressValue(t_4, env.autoesc);
output += "\"><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span> Slett</a>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr class=\"textarea-row\">\n\t\t\t\t\t<td colspan=\"2\">\n\t\t\t\t\t\t<h4>Eposter <span class=\"badge email-counter\"></span></h4>\n\t    \t\t\t\t<textarea class=\"form-control js-add-list-textarea\" data-list-name=\"";
output += runtime.suppressValue(t_4, env.autoesc);
output += "\" placeholder=\"asdf@studentersamfundet.no, qwerty@studentersamfundet.no f.eks. Klipp og lim så mye du orker\" rows=\"4\"></textarea>\n\t    \t\t\t\t<button type=\"button\" class=\"btn btn-primary btn-add-list js-new-email\" data-list-name=\"";
output += runtime.suppressValue(t_4, env.autoesc);
output += "\"><span class=\"glyphicon glyphicon-plus js-new-email\" aria-hidden=\"true\"></span> Legg til</button>\n\t    \t\t\t</td>\n    \t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t\t<div class=\"result-alert\"></div>\n\t</div>\n</div>\n";
})});
}
} else {
t_1 = -1;
var t_2 = runtime.keys(t_3).length;
for(var t_10 in t_3) {
t_1++;
var t_11 = t_3[t_10];
frame.set("list", t_10);
frame.set("aliases", t_11);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n<div class=\"fwdlist\" data-list-name=\"";
output += runtime.suppressValue(t_10, env.autoesc);
output += "\" data-domain=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((t_11),0, env.autoesc)),"domain", env.autoesc), env.autoesc);
output += "\">\n\t<div class=\"panel panel-default\">\n\t    <div class=\"panel-heading\"><span class=\"glyphicon glyphicon-list-alt icon-faded\" aria-hidden=\"true\"></span> ";
output += runtime.suppressValue(t_10, env.autoesc);
output += " <span class=\"badge badge-list-total\">";
output += runtime.suppressValue(env.getFilter("length").call(context, t_11), env.autoesc);
output += "</span></div>\n\t\t<table class=\"table table-condensed\">\n\t        <tbody>\n\t        \t<!-- Aliases -->\n\t\t\t\t";
env.getTemplate("aliases.html", function(t_14,t_12) {
if(t_14) { cb(t_14); return; }
t_12.render(context.getVariables(), frame.push(), function(t_15,t_13) {
if(t_15) { cb(t_15); return; }
output += t_13
output += "\n\t\t\t\t<!-- Actions: Add/Remove -->\n\t\t\t\t<tr class=\"action-row\">\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<a href=\"#\" class=\"link-add js-toggle-email-textarea\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span> Legg til</a>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<a href=\"#\" class=\"link-del js-del-selected\" type=\"button\" data-delete-list-name=\"";
output += runtime.suppressValue(t_10, env.autoesc);
output += "\"><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span> Slett</a>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr class=\"textarea-row\">\n\t\t\t\t\t<td colspan=\"2\">\n\t\t\t\t\t\t<h4>Eposter <span class=\"badge email-counter\"></span></h4>\n\t    \t\t\t\t<textarea class=\"form-control js-add-list-textarea\" data-list-name=\"";
output += runtime.suppressValue(t_10, env.autoesc);
output += "\" placeholder=\"asdf@studentersamfundet.no, qwerty@studentersamfundet.no f.eks. Klipp og lim så mye du orker\" rows=\"4\"></textarea>\n\t    \t\t\t\t<button type=\"button\" class=\"btn btn-primary btn-add-list js-new-email\" data-list-name=\"";
output += runtime.suppressValue(t_10, env.autoesc);
output += "\"><span class=\"glyphicon glyphicon-plus js-new-email\" aria-hidden=\"true\"></span> Legg til</button>\n\t    \t\t\t</td>\n    \t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t\t<div class=\"result-alert\"></div>\n\t</div>\n</div>\n";
})});
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
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "orgunits")),0, env.autoesc)),"prefixes", env.autoesc)),0, env.autoesc), env.autoesc);
output += "- <span class=\"caret\"></span></button>\n\t\t\t<ul class=\"dropdown-menu prefix-select\">\n            ";
var t_1;
t_1 = true;
frame.set("first", t_1, true);
if(!frame.parent) {
context.setVariable("first", t_1);
context.addExport("first");
}
output += "\n\t\t\t";
frame = frame.push();
var t_4 = runtime.contextOrFrameLookup(context, frame, "orgunits");
if(t_4) {var t_3 = t_4.length;
for(var t_2=0; t_2 < t_4.length; t_2++) {
var t_5 = t_4[t_2];
frame.set("ou", t_5);
frame.set("loop.index", t_2 + 1);
frame.set("loop.index0", t_2);
frame.set("loop.revindex", t_3 - t_2);
frame.set("loop.revindex0", t_3 - t_2 - 1);
frame.set("loop.first", t_2 === 0);
frame.set("loop.last", t_2 === t_3 - 1);
frame.set("loop.length", t_3);
output += "\n                ";
frame = frame.push();
var t_8 = runtime.memberLookup((t_5),"prefixes", env.autoesc);
if(t_8) {var t_7 = t_8.length;
for(var t_6=0; t_6 < t_8.length; t_6++) {
var t_9 = t_8[t_6];
frame.set("prefix", t_9);
frame.set("loop.index", t_6 + 1);
frame.set("loop.index0", t_6);
frame.set("loop.revindex", t_7 - t_6);
frame.set("loop.revindex0", t_7 - t_6 - 1);
frame.set("loop.first", t_6 === 0);
frame.set("loop.last", t_6 === t_7 - 1);
frame.set("loop.length", t_7);
output += "\n\t\t\t\t    <li";
if(runtime.contextOrFrameLookup(context, frame, "first")) {
output += " class=\"active\"";
var t_10;
t_10 = false;
frame.set("first", t_10, true);
if(!frame.parent) {
context.setVariable("first", t_10);
context.addExport("first");
}
;
}
output += " data-value=\"";
output += runtime.suppressValue(t_9, env.autoesc);
output += "-\"><a href=\"#\">";
output += runtime.suppressValue(t_9, env.autoesc);
output += "-</a></li>\n\t\t\t    ";
;
}
}
frame = frame.pop();
output += "\n\t\t\t";
;
}
}
frame = frame.pop();
output += "\n\t\t\t</ul>\n\t\t</span>\n\t\t<input type=\"text\" class=\"form-control js-new-list-name\">\n\t\t<span class=\"input-group-addon\">@";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "email_domain")),"name", env.autoesc), env.autoesc);
output += "</span>\n\t</div>\n  \t<h4>Eposter <span class=\"badge email-counter\"></span></h4>\n    <textarea class=\"form-control\" data-list-name='newlist@example.com' placeholder=\"asdf@studentersamfundet.no, qwerty@studentersamfundet.no f.eks. Klipp og lim så mye du orker\" rows=\"4\"></textarea>\n    <button type=\"button\" class=\"btn btn-primary btn-add-list js-add-list\"><span class=\"glyphicon glyphicon-plus js-add-list\" aria-hidden=\"true\"></span> Opprett liste</button>\n  </div>\n</div>";
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
output += "<li class=\"active\"><a href=\"/lists/\" data-id=\"\" data-prefix=\".+\">Alle</a></li>\n";
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
output += "\n<li><a href=\"/lists/?orgunit=";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id", env.autoesc), env.autoesc);
output += "\" data-prefix=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"prefixes_regex", env.autoesc), env.autoesc);
output += "\" data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id", env.autoesc), env.autoesc);
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

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["orgunits_select.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<select class=\"orgunits-select form-control\">\n    <option value=\"\" data-prefix=\".+\">Alle</option>\n\t";
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
output += "\n\t    <option value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id", env.autoesc), env.autoesc);
output += "\" data-prefix=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"prefixes_regex", env.autoesc), env.autoesc);
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
