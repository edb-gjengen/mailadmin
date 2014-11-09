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
output += "\n<div class=\"fwdlist col-md-12\">\n\t<div class=\"panel panel-default\">\n\t    <div class=\"panel-heading\">";
output += runtime.suppressValue(t_4, env.autoesc);
output += "</div>\n\t\t<table class=\"table\">\n\t\t\t<thead>\n\t\t        <tr>\n\t\t\t        <th>Medlem</th>\n\t\t\t        <th class=\"text-center\">Slett</th>\n\t\t        </tr>\n\t        </thead>\n\t        <tbody>\n\t\t\t";
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
output += "</td><td class=\"text-center\"><input type=\"checkbox\" name='fwd-delete' value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_9),"uri_dest", env.autoesc), env.autoesc);
output += "=";
output += runtime.suppressValue(runtime.memberLookup((t_9),"uri_forward", env.autoesc), env.autoesc);
output += "\"></td></tr>\n\t\t\t";
;
}
}
frame = frame.pop();
output += "\n\t\t\t\t<tr><td>\n\t\t\t\t<div class=\"input-group\"><input type=\"email\" name=\"\" class=\"form-control\"><span class=\"input-group-btn\"><button class=\"btn btn-default\" type=\"button\">Legg til</button></span></div>\n\t\t\t\t<td></td></tr>\n\t\t\t</tbody>\n\t\t</table>\n\t</div>\n</div>\n";
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
output += "\n<div class=\"fwdlist col-md-12\">\n\t<div class=\"panel panel-default\">\n\t    <div class=\"panel-heading\">";
output += runtime.suppressValue(t_10, env.autoesc);
output += "</div>\n\t\t<table class=\"table\">\n\t\t\t<thead>\n\t\t        <tr>\n\t\t\t        <th>Medlem</th>\n\t\t\t        <th class=\"text-center\">Slett</th>\n\t\t        </tr>\n\t        </thead>\n\t        <tbody>\n\t\t\t";
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
output += "</td><td class=\"text-center\"><input type=\"checkbox\" name='fwd-delete' value=\"";
output += runtime.suppressValue(runtime.memberLookup((t_15),"uri_dest", env.autoesc), env.autoesc);
output += "=";
output += runtime.suppressValue(runtime.memberLookup((t_15),"uri_forward", env.autoesc), env.autoesc);
output += "\"></td></tr>\n\t\t\t";
;
}
}
frame = frame.pop();
output += "\n\t\t\t\t<tr><td>\n\t\t\t\t<div class=\"input-group\"><input type=\"email\" name=\"\" class=\"form-control\"><span class=\"input-group-btn\"><button class=\"btn btn-default\" type=\"button\">Legg til</button></span></div>\n\t\t\t\t<td></td></tr>\n\t\t\t</tbody>\n\t\t</table>\n\t</div>\n</div>\n";
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
