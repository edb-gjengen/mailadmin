(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["alert.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"alert alert-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "alertClass"), env.opts.autoescape);
output += "\">\n\t<a class=\"close\" data-dismiss=\"alert\">×</a>\n\t";
if(runtime.contextOrFrameLookup(context, frame, "iconClass")) {
output += "<span class=\"glyphicon glyphicon-";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "iconClass"), env.opts.autoescape);
output += "\"></span> ";
;
}
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "msg"), env.opts.autoescape);
output += "\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
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

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["aliases.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
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
output += runtime.suppressValue(env.getFilter("datefromnow").call(context, runtime.memberLookup((t_4),"created")), env.opts.autoescape);
output += " (";
output += runtime.suppressValue(env.getFilter("date").call(context, runtime.memberLookup((t_4),"created"),"LLLL"), env.opts.autoescape);
output += ")\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"destination"), env.opts.autoescape);
output += "</span></td>\n    <td class=\"del-cell\">\n        <label class=\"del-label\" for=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id"), env.opts.autoescape);
output += "\"><input id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id"), env.opts.autoescape);
output += "\" type=\"checkbox\" name='fwd-delete' value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id"), env.opts.autoescape);
output += "\" data-source=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"source"), env.opts.autoescape);
output += "\" data-destination=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"destination"), env.opts.autoescape);
output += "\" data-domain=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"domain"), env.opts.autoescape);
output += "\"/></label>\n    </td>\n</tr>\n";
;
}
}
frame = frame.pop();
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
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

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["list.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "lists");
runtime.asyncEach(t_3, 2, function(list,aliases,t_1,t_2,next) {frame.set("list", list);
frame.set("aliases", aliases);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\n<div class=\"fwdlist\" data-list-name=\"";
output += runtime.suppressValue(list, env.opts.autoescape);
output += "\" data-domain=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((aliases),0)),"domain"), env.opts.autoescape);
output += "\">\n\t<div class=\"panel panel-default\">\n\t    <div class=\"panel-heading\"><span class=\"glyphicon glyphicon-list-alt icon-faded\" aria-hidden=\"true\"></span> ";
output += runtime.suppressValue(list, env.opts.autoescape);
output += " <span class=\"badge badge-list-total\">";
output += runtime.suppressValue(env.getFilter("length").call(context, aliases), env.opts.autoescape);
output += "</span></div>\n\t\t<table class=\"table table-condensed\">\n\t        <tbody>\n\t        \t<!-- Aliases -->\n\t\t\t\t";
env.getTemplate("aliases.html", false, "list.html", null, function(t_6,t_4) {
if(t_6) { cb(t_6); return; }
t_4.render(context.getVariables(), frame, function(t_7,t_5) {
if(t_7) { cb(t_7); return; }
output += t_5
output += "\n\t\t\t\t<!-- Actions: Add/Remove -->\n\t\t\t\t<tr class=\"action-row\">\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<a href=\"#\" class=\"link-add js-toggle-email-textarea\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span> Legg til</a>\n\t\t\t\t\t</td>\n\t\t\t\t\t<td>\n\t\t\t\t\t\t<a href=\"#\" class=\"link-del js-del-selected\" type=\"button\" data-delete-list-name=\"";
output += runtime.suppressValue(list, env.opts.autoescape);
output += "\"><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span> Slett</a>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t<tr class=\"textarea-row\">\n\t\t\t\t\t<td colspan=\"2\">\n\t\t\t\t\t\t<h4>Eposter <span class=\"badge email-counter\"></span></h4>\n\t    \t\t\t\t<textarea class=\"form-control js-add-list-textarea\" data-list-name=\"";
output += runtime.suppressValue(list, env.opts.autoescape);
output += "\" placeholder=\"asdf@studentersamfundet.no, qwerty@studentersamfundet.no f.eks. Klipp og lim så mye du orker\" rows=\"4\"></textarea>\n\t    \t\t\t\t<button type=\"button\" class=\"btn btn-primary btn-add-list js-new-email\" data-list-name=\"";
output += runtime.suppressValue(list, env.opts.autoescape);
output += "\"><span class=\"glyphicon glyphicon-plus js-new-email\" aria-hidden=\"true\"></span> Legg til</button>\n\t    \t\t\t</td>\n    \t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>\n\t\t<div class=\"result-alert\"></div>\n\t</div>\n</div>\n";
next(t_1);
})});
}, function(t_9,t_8) {
if(t_9) { cb(t_9); return; }
frame = frame.pop();
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
});
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["new_list.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
output += "<div class=\"panel panel-default\">\n  <div class=\"panel-heading\"><span class=\"glyphicon glyphicon-list-alt icon-faded\" aria-hidden=\"true\"></span> <span class=\"js-new-list-preview\">Ny liste</span></div>\n  <div class=\"panel-body\">\n  \t<div class=\"input-group\">\n\t\t<span class=\"input-group-btn\">\n\t\t\t<button type=\"button\" class=\"btn btn-default prefix-btn dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.memberLookup((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "orgunits")),0)),"prefixes")),0), env.opts.autoescape);
output += "- <span class=\"caret\"></span></button>\n\t\t\t<ul class=\"dropdown-menu prefix-select\">\n            ";
var t_1;
t_1 = true;
frame.set("first", t_1, true);
if(frame.topLevel) {
context.setVariable("first", t_1);
}
if(frame.topLevel) {
context.addExport("first", t_1);
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
var t_8 = runtime.memberLookup((t_5),"prefixes");
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
if(frame.topLevel) {
context.setVariable("first", t_10);
}
if(frame.topLevel) {
context.addExport("first", t_10);
}
;
}
output += " data-value=\"";
output += runtime.suppressValue(t_9, env.opts.autoescape);
output += "-\"><a href=\"#\">";
output += runtime.suppressValue(t_9, env.opts.autoescape);
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
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "email_domain")),"name"), env.opts.autoescape);
output += "</span>\n\t</div>\n  \t<h4>Eposter <span class=\"badge email-counter\"></span></h4>\n    <textarea class=\"form-control\" data-list-name='newlist@example.com' placeholder=\"asdf@studentersamfundet.no, qwerty@studentersamfundet.no f.eks. Klipp og lim så mye du orker\" rows=\"4\"></textarea>\n    <button type=\"button\" class=\"btn btn-primary btn-add-list js-add-list\"><span class=\"glyphicon glyphicon-plus js-add-list\" aria-hidden=\"true\"></span> Opprett liste</button>\n  </div>\n</div>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
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

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["orgunits.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
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
output += runtime.suppressValue(runtime.memberLookup((t_4),"id"), env.opts.autoescape);
output += "\" data-prefix=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"prefixes_regex"), env.opts.autoescape);
output += "\" data-id=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"id"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name"), env.opts.autoescape);
output += "</a></li>\n";
;
}
}
frame = frame.pop();
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
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

(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["orgunits_select.html"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
var parentTemplate = null;
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
output += runtime.suppressValue(runtime.memberLookup((t_4),"id"), env.opts.autoescape);
output += "\" data-prefix=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"prefixes_regex"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"name"), env.opts.autoescape);
output += "</option>\n\t";
;
}
}
frame = frame.pop();
output += "\n</select>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
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
