!function(t) {
if ("undefined" != typeof module && module.exports) module.exports = t(this); else if ("function" == typeof define && define.amd) {
var e = this;
define("i18n", function() {
return t(e);
});
} else this.I18n = t(this);
}(function(t) {
"use strict";
var e = t && t.I18n || {}, n = Array.prototype.slice, i = function(t) {
return ("0" + t.toString()).substr(-2);
}, r = function(t, e) {
return a("round", t, -e).toFixed(e);
}, o = function(t) {
var e = typeof t;
return "function" === e || "object" === e && !!t;
}, s = function(t) {
return Array.isArray ? Array.isArray(t) :"[object Array]" === Object.prototype.toString.call(t);
}, a = function(t, e, n) {
return "undefined" == typeof n || 0 === +n ? Math[t](e) :(e = +e, n = +n, isNaN(e) || "number" != typeof n || n % 1 !== 0 ? 0/0 :(e = e.toString().split("e"), 
e = Math[t](+(e[0] + "e" + (e[1] ? +e[1] - n :-n))), e = e.toString().split("e"), 
+(e[0] + "e" + (e[1] ? +e[1] + n :n))));
}, u = function(t, e) {
var n, i;
for (n in e) e.hasOwnProperty(n) && (i = e[n], "[object String]" === Object.prototype.toString.call(i) ? t[n] = i :(null == t[n] && (t[n] = {}), 
u(t[n], i)));
return t;
}, l = {
day_names:[ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
abbr_day_names:[ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ],
month_names:[ null, "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
abbr_month_names:[ null, "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ],
meridian:[ "AM", "PM" ]
}, c = {
precision:3,
separator:".",
delimiter:",",
strip_insignificant_zeros:!1
}, h = {
unit:"$",
precision:2,
format:"%u%n",
sign_first:!0,
delimiter:",",
separator:"."
}, d = {
unit:"%",
precision:3,
format:"%n%u",
separator:".",
delimiter:""
}, f = [ null, "kb", "mb", "gb", "tb" ], p = {
defaultLocale:"en",
locale:"en",
defaultSeparator:".",
placeholder:/(?:\{\{|%\{)(.*?)(?:\}\}?)/gm,
fallbacks:!1,
translations:{},
missingBehaviour:"message",
missingTranslationPrefix:""
};
return e.reset = function() {
this.defaultLocale = p.defaultLocale, this.locale = p.locale, this.defaultSeparator = p.defaultSeparator, 
this.placeholder = p.placeholder, this.fallbacks = p.fallbacks, this.translations = p.translations, 
this.missingBehaviour = p.missingBehaviour, this.missingTranslationPrefix = p.missingTranslationPrefix;
}, e.initializeOptions = function() {
"undefined" == typeof this.defaultLocale && null !== this.defaultLocale && (this.defaultLocale = p.defaultLocale), 
"undefined" == typeof this.locale && null !== this.locale && (this.locale = p.locale), 
"undefined" == typeof this.defaultSeparator && null !== this.defaultSeparator && (this.defaultSeparator = p.defaultSeparator), 
"undefined" == typeof this.placeholder && null !== this.placeholder && (this.placeholder = p.placeholder), 
"undefined" == typeof this.fallbacks && null !== this.fallbacks && (this.fallbacks = p.fallbacks), 
"undefined" == typeof this.translations && null !== this.translations && (this.translations = p.translations), 
"undefined" == typeof this.missingBehaviour && null !== this.missingBehaviour && (this.missingBehaviour = p.missingBehaviour), 
"undefined" == typeof this.missingTranslationPrefix && null !== this.missingTranslationPrefix && (this.missingTranslationPrefix = p.missingTranslationPrefix);
}, e.initializeOptions(), e.locales = {}, e.locales.get = function(t) {
var n = this[t] || this[e.locale] || this["default"];
return "function" == typeof n && (n = n(t)), s(n) === !1 && (n = [ n ]), n;
}, e.locales["default"] = function(t) {
var n, i = [], r = [];
return t && i.push(t), !t && e.locale && i.push(e.locale), e.fallbacks && e.defaultLocale && i.push(e.defaultLocale), 
i.forEach(function(t) {
n = t.split("-")[0], ~r.indexOf(t) || r.push(t), e.fallbacks && n && n !== t && !~r.indexOf(n) && r.push(n);
}), i.length || i.push("en"), r;
}, e.pluralization = {}, e.pluralization.get = function(t) {
return this[t] || this[e.locale] || this["default"];
}, e.pluralization["default"] = function(t) {
switch (t) {
case 0:
return [ "zero", "other" ];

case 1:
return [ "one" ];

default:
return [ "other" ];
}
}, e.currentLocale = function() {
return this.locale || this.defaultLocale;
}, e.isSet = function(t) {
return void 0 !== t && null !== t;
}, e.lookup = function(t, e) {
e = this.prepareOptions(e);
{
var n, i, r, o = this.locales.get(e.locale).slice();
o[0];
}
for (t = this.getFullScope(t, e); o.length; ) if (n = o.shift(), i = t.split(this.defaultSeparator), 
r = this.translations[n]) {
for (;i.length && (r = r[i.shift()], void 0 !== r && null !== r); ) ;
if (void 0 !== r && null !== r) return r;
}
return this.isSet(e.defaultValue) ? e.defaultValue :void 0;
}, e.meridian = function() {
var t = this.lookup("time"), e = this.lookup("date");
return t && t.am && t.pm ? [ t.am, t.pm ] :e && e.meridian ? e.meridian :l.meridian;
}, e.prepareOptions = function() {
for (var t, e = n.call(arguments), i = {}; e.length; ) if (t = e.shift(), "object" == typeof t) for (var r in t) t.hasOwnProperty(r) && (this.isSet(i[r]) || (i[r] = t[r]));
return i;
}, e.createTranslationOptions = function(t, e) {
var n = [ {
scope:t
} ];
return this.isSet(e.defaults) && (n = n.concat(e.defaults)), this.isSet(e.defaultValue) && (n.push({
message:e.defaultValue
}), delete e.defaultValue), n;
}, e.translate = function(t, e) {
e = this.prepareOptions(e);
var n, i = this.createTranslationOptions(t, e), r = i.some(function(t) {
return this.isSet(t.scope) ? n = this.lookup(t.scope, e) :this.isSet(t.message) && (n = t.message), 
void 0 !== n && null !== n ? !0 :void 0;
}, this);
return r ? ("string" == typeof n ? n = this.interpolate(n, e) :o(n) && this.isSet(e.count) && (n = this.pluralize(e.count, n, e)), 
n) :this.missingTranslation(t, e);
}, e.interpolate = function(t, e) {
e = this.prepareOptions(e);
var n, i, r, o, s = t.match(this.placeholder);
if (!s) return t;
for (var i; s.length; ) n = s.shift(), r = n.replace(this.placeholder, "$1"), i = this.isSet(e[r]) ? e[r].toString().replace(/\$/gm, "_#$#_") :r in e ? this.nullPlaceholder(n, t, e) :this.missingPlaceholder(n, t, e), 
o = new RegExp(n.replace(/\{/gm, "\\{").replace(/\}/gm, "\\}")), t = t.replace(o, i);
return t.replace(/_#\$#_/g, "$");
}, e.pluralize = function(t, e, n) {
n = this.prepareOptions(n);
var i, r, s, a, u;
if (i = o(e) ? e :this.lookup(e, n), !i) return this.missingTranslation(e, n);
for (r = this.pluralization.get(n.locale), s = r(t); s.length; ) if (a = s.shift(), 
this.isSet(i[a])) {
u = i[a];
break;
}
return n.count = String(t), this.interpolate(u, n);
}, e.missingTranslation = function(t, e) {
if ("guess" == this.missingBehaviour) {
var n = t.split(".").slice(-1)[0];
return (this.missingTranslationPrefix.length > 0 ? this.missingTranslationPrefix :"") + n.replace("_", " ").replace(/([a-z])([A-Z])/g, function(t, e, n) {
return e + " " + n.toLowerCase();
});
}
var i = null != e && null != e.locale ? e.locale :this.currentLocale(), r = this.getFullScope(t, e), o = [ i, r ].join(this.defaultSeparator);
return '[missing "' + o + '" translation]';
}, e.missingPlaceholder = function(t) {
return "[missing " + t + " value]";
}, e.nullPlaceholder = function() {
return e.missingPlaceholder.apply(e, arguments);
}, e.toNumber = function(t, e) {
e = this.prepareOptions(e, this.lookup("number.format"), c);
var n, i, o = 0 > t, s = r(Math.abs(t), e.precision).toString(), a = s.split("."), u = [], l = e.format || "%n", h = o ? "-" :"";
for (t = a[0], n = a[1]; t.length > 0; ) u.unshift(t.substr(Math.max(0, t.length - 3), 3)), 
t = t.substr(0, t.length - 3);
return i = u.join(e.delimiter), e.strip_insignificant_zeros && n && (n = n.replace(/0+$/, "")), 
e.precision > 0 && n && (i += e.separator + n), l = e.sign_first ? "%s" + l :l.replace("%n", "%s%n"), 
i = l.replace("%u", e.unit).replace("%n", i).replace("%s", h);
}, e.toCurrency = function(t, e) {
return e = this.prepareOptions(e, this.lookup("number.currency.format"), this.lookup("number.format"), h), 
this.toNumber(t, e);
}, e.localize = function(t, e, n) {
switch (n || (n = {}), t) {
case "currency":
return this.toCurrency(e);

case "number":
return t = this.lookup("number.format"), this.toNumber(e, t);

case "percentage":
return this.toPercentage(e);

default:
var i;
return i = t.match(/^(date|time)/) ? this.toTime(t, e) :e.toString(), this.interpolate(i, n);
}
}, e.parseDate = function(t) {
var e, n, i;
if ("object" == typeof t) return t;
if (e = t.toString().match(/(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2})([\.,]\d{1,3})?)?(Z|\+00:?00)?/)) {
for (var r = 1; 6 >= r; r++) e[r] = parseInt(e[r], 10) || 0;
e[2] -= 1, i = e[7] ? 1e3 * ("0" + e[7]) :null, n = e[8] ? new Date(Date.UTC(e[1], e[2], e[3], e[4], e[5], e[6], i)) :new Date(e[1], e[2], e[3], e[4], e[5], e[6], i);
} else "number" == typeof t ? (n = new Date(), n.setTime(t)) :t.match(/([A-Z][a-z]{2}) ([A-Z][a-z]{2}) (\d+) (\d+:\d+:\d+) ([+-]\d+) (\d+)/) ? (n = new Date(), 
n.setTime(Date.parse([ RegExp.$1, RegExp.$2, RegExp.$3, RegExp.$6, RegExp.$4, RegExp.$5 ].join(" ")))) :t.match(/\d+ \d+:\d+:\d+ [+-]\d+ \d+/) ? (n = new Date(), 
n.setTime(Date.parse(t))) :(n = new Date(), n.setTime(Date.parse(t)));
return n;
}, e.strftime = function(t, n) {
var r = this.lookup("date"), o = e.meridian();
if (r || (r = {}), r = this.prepareOptions(r, l), isNaN(t.getTime())) throw new Error("I18n.strftime() requires a valid date object, but received an invalid date.");
var s = t.getDay(), a = t.getDate(), u = t.getFullYear(), c = t.getMonth() + 1, h = t.getHours(), d = h, f = h > 11 ? 1 :0, p = t.getSeconds(), m = t.getMinutes(), g = t.getTimezoneOffset(), v = Math.floor(Math.abs(g / 60)), y = Math.abs(g) - 60 * v, _ = (g > 0 ? "-" :"+") + (v.toString().length < 2 ? "0" + v :v) + (y.toString().length < 2 ? "0" + y :y);
return d > 12 ? d -= 12 :0 === d && (d = 12), n = n.replace("%a", r.abbr_day_names[s]), 
n = n.replace("%A", r.day_names[s]), n = n.replace("%b", r.abbr_month_names[c]), 
n = n.replace("%B", r.month_names[c]), n = n.replace("%d", i(a)), n = n.replace("%e", a), 
n = n.replace("%-d", a), n = n.replace("%H", i(h)), n = n.replace("%-H", h), n = n.replace("%I", i(d)), 
n = n.replace("%-I", d), n = n.replace("%m", i(c)), n = n.replace("%-m", c), n = n.replace("%M", i(m)), 
n = n.replace("%-M", m), n = n.replace("%p", o[f]), n = n.replace("%S", i(p)), n = n.replace("%-S", p), 
n = n.replace("%w", s), n = n.replace("%y", i(u)), n = n.replace("%-y", i(u).replace(/^0+/, "")), 
n = n.replace("%Y", u), n = n.replace("%z", _);
}, e.toTime = function(t, e) {
var n = this.parseDate(e), i = this.lookup(t);
return n.toString().match(/invalid/i) ? n.toString() :i ? this.strftime(n, i) :n.toString();
}, e.toPercentage = function(t, e) {
return e = this.prepareOptions(e, this.lookup("number.percentage.format"), this.lookup("number.format"), d), 
this.toNumber(t, e);
}, e.toHumanSize = function(t, e) {
for (var n, i, r = 1024, o = t, s = 0; o >= r && 4 > s; ) o /= r, s += 1;
return 0 === s ? (n = this.t("number.human.storage_units.units.byte", {
count:o
}), i = 0) :(n = this.t("number.human.storage_units.units." + f[s]), i = o - Math.floor(o) === 0 ? 0 :1), 
e = this.prepareOptions(e, {
unit:n,
precision:i,
format:"%n%u",
delimiter:""
}), this.toNumber(o, e);
}, e.getFullScope = function(t, e) {
return e = this.prepareOptions(e), t.constructor === Array && (t = t.join(this.defaultSeparator)), 
e.scope && (t = [ e.scope, t ].join(this.defaultSeparator)), t;
}, e.extend = function(t, e) {
return "undefined" == typeof t && "undefined" == typeof e ? {} :u(t, e);
}, e.t = e.translate, e.l = e.localize, e.p = e.pluralize, e;
}), function(t, e) {
"object" == typeof module && "object" == typeof module.exports ? module.exports = t.document ? e(t, !0) :function(t) {
if (!t.document) throw new Error("jQuery requires a window with a document");
return e(t);
} :e(t);
}("undefined" != typeof window ? window :this, function(t, e) {
function n(t) {
var e = !!t && "length" in t && t.length, n = oe.type(t);
return "function" === n || oe.isWindow(t) ? !1 :"array" === n || 0 === e || "number" == typeof e && e > 0 && e - 1 in t;
}
function i(t, e, n) {
if (oe.isFunction(e)) return oe.grep(t, function(t, i) {
return !!e.call(t, i, t) !== n;
});
if (e.nodeType) return oe.grep(t, function(t) {
return t === e !== n;
});
if ("string" == typeof e) {
if (me.test(e)) return oe.filter(e, t, n);
e = oe.filter(e, t);
}
return oe.grep(t, function(t) {
return Q.call(e, t) > -1 !== n;
});
}
function r(t, e) {
for (;(t = t[e]) && 1 !== t.nodeType; ) ;
return t;
}
function o(t) {
var e = {};
return oe.each(t.match(we) || [], function(t, n) {
e[n] = !0;
}), e;
}
function s() {
X.removeEventListener("DOMContentLoaded", s), t.removeEventListener("load", s), 
oe.ready();
}
function a() {
this.expando = oe.expando + a.uid++;
}
function u(t, e, n) {
var i;
if (void 0 === n && 1 === t.nodeType) if (i = "data-" + e.replace(De, "-$&").toLowerCase(), 
n = t.getAttribute(i), "string" == typeof n) {
try {
n = "true" === n ? !0 :"false" === n ? !1 :"null" === n ? null :+n + "" === n ? +n :Ee.test(n) ? oe.parseJSON(n) :n;
} catch (r) {}
Te.set(t, e, n);
} else n = void 0;
return n;
}
function l(t, e, n, i) {
var r, o = 1, s = 20, a = i ? function() {
return i.cur();
} :function() {
return oe.css(t, e, "");
}, u = a(), l = n && n[3] || (oe.cssNumber[e] ? "" :"px"), c = (oe.cssNumber[e] || "px" !== l && +u) && Oe.exec(oe.css(t, e));
if (c && c[3] !== l) {
l = l || c[3], n = n || [], c = +u || 1;
do o = o || ".5", c /= o, oe.style(t, e, c + l); while (o !== (o = a() / u) && 1 !== o && --s);
}
return n && (c = +c || +u || 0, r = n[1] ? c + (n[1] + 1) * n[2] :+n[2], i && (i.unit = l, 
i.start = c, i.end = r)), r;
}
function c(t, e) {
var n = "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e || "*") :"undefined" != typeof t.querySelectorAll ? t.querySelectorAll(e || "*") :[];
return void 0 === e || e && oe.nodeName(t, e) ? oe.merge([ t ], n) :n;
}
function h(t, e) {
for (var n = 0, i = t.length; i > n; n++) Ce.set(t[n], "globalEval", !e || Ce.get(e[n], "globalEval"));
}
function d(t, e, n, i, r) {
for (var o, s, a, u, l, d, f = e.createDocumentFragment(), p = [], m = 0, g = t.length; g > m; m++) if (o = t[m], 
o || 0 === o) if ("object" === oe.type(o)) oe.merge(p, o.nodeType ? [ o ] :o); else if (He.test(o)) {
for (s = s || f.appendChild(e.createElement("div")), a = (Le.exec(o) || [ "", "" ])[1].toLowerCase(), 
u = Pe[a] || Pe._default, s.innerHTML = u[1] + oe.htmlPrefilter(o) + u[2], d = u[0]; d--; ) s = s.lastChild;
oe.merge(p, s.childNodes), s = f.firstChild, s.textContent = "";
} else p.push(e.createTextNode(o));
for (f.textContent = "", m = 0; o = p[m++]; ) if (i && oe.inArray(o, i) > -1) r && r.push(o); else if (l = oe.contains(o.ownerDocument, o), 
s = c(f.appendChild(o), "script"), l && h(s), n) for (d = 0; o = s[d++]; ) ze.test(o.type || "") && n.push(o);
return f;
}
function f() {
return !0;
}
function p() {
return !1;
}
function m() {
try {
return X.activeElement;
} catch (t) {}
}
function g(t, e, n, i, r, o) {
var s, a;
if ("object" == typeof e) {
"string" != typeof n && (i = i || n, n = void 0);
for (a in e) g(t, a, n, i, e[a], o);
return t;
}
if (null == i && null == r ? (r = n, i = n = void 0) :null == r && ("string" == typeof n ? (r = i, 
i = void 0) :(r = i, i = n, n = void 0)), r === !1) r = p; else if (!r) return t;
return 1 === o && (s = r, r = function(t) {
return oe().off(t), s.apply(this, arguments);
}, r.guid = s.guid || (s.guid = oe.guid++)), t.each(function() {
oe.event.add(this, e, r, i, n);
});
}
function v(t, e) {
return oe.nodeName(t, "table") && oe.nodeName(11 !== e.nodeType ? e :e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) :t;
}
function y(t) {
return t.type = (null !== t.getAttribute("type")) + "/" + t.type, t;
}
function _(t) {
var e = Be.exec(t.type);
return e ? t.type = e[1] :t.removeAttribute("type"), t;
}
function b(t, e) {
var n, i, r, o, s, a, u, l;
if (1 === e.nodeType) {
if (Ce.hasData(t) && (o = Ce.access(t), s = Ce.set(e, o), l = o.events)) {
delete s.handle, s.events = {};
for (r in l) for (n = 0, i = l[r].length; i > n; n++) oe.event.add(e, r, l[r][n]);
}
Te.hasData(t) && (a = Te.access(t), u = oe.extend({}, a), Te.set(e, u));
}
}
function w(t, e) {
var n = e.nodeName.toLowerCase();
"input" === n && Ae.test(t.type) ? e.checked = t.checked :("input" === n || "textarea" === n) && (e.defaultValue = t.defaultValue);
}
function x(t, e, n, i) {
e = Z.apply([], e);
var r, o, s, a, u, l, h = 0, f = t.length, p = f - 1, m = e[0], g = oe.isFunction(m);
if (g || f > 1 && "string" == typeof m && !ie.checkClone && Ue.test(m)) return t.each(function(r) {
var o = t.eq(r);
g && (e[0] = m.call(this, r, o.html())), x(o, e, n, i);
});
if (f && (r = d(e, t[0].ownerDocument, !1, t, i), o = r.firstChild, 1 === r.childNodes.length && (r = o), 
o || i)) {
for (s = oe.map(c(r, "script"), y), a = s.length; f > h; h++) u = r, h !== p && (u = oe.clone(u, !0, !0), 
a && oe.merge(s, c(u, "script"))), n.call(t[h], u, h);
if (a) for (l = s[s.length - 1].ownerDocument, oe.map(s, _), h = 0; a > h; h++) u = s[h], 
ze.test(u.type || "") && !Ce.access(u, "globalEval") && oe.contains(l, u) && (u.src ? oe._evalUrl && oe._evalUrl(u.src) :oe.globalEval(u.textContent.replace(Ye, "")));
}
return t;
}
function S(t, e, n) {
for (var i, r = e ? oe.filter(e, t) :t, o = 0; null != (i = r[o]); o++) n || 1 !== i.nodeType || oe.cleanData(c(i)), 
i.parentNode && (n && oe.contains(i.ownerDocument, i) && h(c(i, "script")), i.parentNode.removeChild(i));
return t;
}
function k(t, e) {
var n = oe(e.createElement(t)).appendTo(e.body), i = oe.css(n[0], "display");
return n.detach(), i;
}
function C(t) {
var e = X, n = Ve[t];
return n || (n = k(t, e), "none" !== n && n || (We = (We || oe("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement), 
e = We[0].contentDocument, e.write(), e.close(), n = k(t, e), We.detach()), Ve[t] = n), 
n;
}
function T(t, e, n) {
var i, r, o, s, a = t.style;
return n = n || Je(t), s = n ? n.getPropertyValue(e) || n[e] :void 0, "" !== s && void 0 !== s || oe.contains(t.ownerDocument, t) || (s = oe.style(t, e)), 
n && !ie.pixelMarginRight() && Xe.test(s) && Ge.test(e) && (i = a.width, r = a.minWidth, 
o = a.maxWidth, a.minWidth = a.maxWidth = a.width = s, s = n.width, a.width = i, 
a.minWidth = r, a.maxWidth = o), void 0 !== s ? s + "" :s;
}
function E(t, e) {
return {
get:function() {
return t() ? void delete this.get :(this.get = e).apply(this, arguments);
}
};
}
function D(t) {
if (t in rn) return t;
for (var e = t[0].toUpperCase() + t.slice(1), n = nn.length; n--; ) if (t = nn[n] + e, 
t in rn) return t;
}
function M(t, e, n) {
var i = Oe.exec(e);
return i ? Math.max(0, i[2] - (n || 0)) + (i[3] || "px") :e;
}
function O(t, e, n, i, r) {
for (var o = n === (i ? "border" :"content") ? 4 :"width" === e ? 1 :0, s = 0; 4 > o; o += 2) "margin" === n && (s += oe.css(t, n + Ie[o], !0, r)), 
i ? ("content" === n && (s -= oe.css(t, "padding" + Ie[o], !0, r)), "margin" !== n && (s -= oe.css(t, "border" + Ie[o] + "Width", !0, r))) :(s += oe.css(t, "padding" + Ie[o], !0, r), 
"padding" !== n && (s += oe.css(t, "border" + Ie[o] + "Width", !0, r)));
return s;
}
function I(t, e, n) {
var i = !0, r = "width" === e ? t.offsetWidth :t.offsetHeight, o = Je(t), s = "border-box" === oe.css(t, "boxSizing", !1, o);
if (0 >= r || null == r) {
if (r = T(t, e, o), (0 > r || null == r) && (r = t.style[e]), Xe.test(r)) return r;
i = s && (ie.boxSizingReliable() || r === t.style[e]), r = parseFloat(r) || 0;
}
return r + O(t, e, n || (s ? "border" :"content"), i, o) + "px";
}
function j(t, e) {
for (var n, i, r, o = [], s = 0, a = t.length; a > s; s++) i = t[s], i.style && (o[s] = Ce.get(i, "olddisplay"), 
n = i.style.display, e ? (o[s] || "none" !== n || (i.style.display = ""), "" === i.style.display && je(i) && (o[s] = Ce.access(i, "olddisplay", C(i.nodeName)))) :(r = je(i), 
"none" === n && r || Ce.set(i, "olddisplay", r ? n :oe.css(i, "display"))));
for (s = 0; a > s; s++) i = t[s], i.style && (e && "none" !== i.style.display && "" !== i.style.display || (i.style.display = e ? o[s] || "" :"none"));
return t;
}
function A(t, e, n, i, r) {
return new A.prototype.init(t, e, n, i, r);
}
function L() {
return t.setTimeout(function() {
on = void 0;
}), on = oe.now();
}
function z(t, e) {
var n, i = 0, r = {
height:t
};
for (e = e ? 1 :0; 4 > i; i += 2 - e) n = Ie[i], r["margin" + n] = r["padding" + n] = t;
return e && (r.opacity = r.width = t), r;
}
function P(t, e, n) {
for (var i, r = (R.tweeners[e] || []).concat(R.tweeners["*"]), o = 0, s = r.length; s > o; o++) if (i = r[o].call(n, e, t)) return i;
}
function H(t, e, n) {
var i, r, o, s, a, u, l, c, h = this, d = {}, f = t.style, p = t.nodeType && je(t), m = Ce.get(t, "fxshow");
n.queue || (a = oe._queueHooks(t, "fx"), null == a.unqueued && (a.unqueued = 0, 
u = a.empty.fire, a.empty.fire = function() {
a.unqueued || u();
}), a.unqueued++, h.always(function() {
h.always(function() {
a.unqueued--, oe.queue(t, "fx").length || a.empty.fire();
});
})), 1 === t.nodeType && ("height" in e || "width" in e) && (n.overflow = [ f.overflow, f.overflowX, f.overflowY ], 
l = oe.css(t, "display"), c = "none" === l ? Ce.get(t, "olddisplay") || C(t.nodeName) :l, 
"inline" === c && "none" === oe.css(t, "float") && (f.display = "inline-block")), 
n.overflow && (f.overflow = "hidden", h.always(function() {
f.overflow = n.overflow[0], f.overflowX = n.overflow[1], f.overflowY = n.overflow[2];
}));
for (i in e) if (r = e[i], an.exec(r)) {
if (delete e[i], o = o || "toggle" === r, r === (p ? "hide" :"show")) {
if ("show" !== r || !m || void 0 === m[i]) continue;
p = !0;
}
d[i] = m && m[i] || oe.style(t, i);
} else l = void 0;
if (oe.isEmptyObject(d)) "inline" === ("none" === l ? C(t.nodeName) :l) && (f.display = l); else {
m ? "hidden" in m && (p = m.hidden) :m = Ce.access(t, "fxshow", {}), o && (m.hidden = !p), 
p ? oe(t).show() :h.done(function() {
oe(t).hide();
}), h.done(function() {
var e;
Ce.remove(t, "fxshow");
for (e in d) oe.style(t, e, d[e]);
});
for (i in d) s = P(p ? m[i] :0, i, h), i in m || (m[i] = s.start, p && (s.end = s.start, 
s.start = "width" === i || "height" === i ? 1 :0));
}
}
function N(t, e) {
var n, i, r, o, s;
for (n in t) if (i = oe.camelCase(n), r = e[i], o = t[n], oe.isArray(o) && (r = o[1], 
o = t[n] = o[0]), n !== i && (t[i] = o, delete t[n]), s = oe.cssHooks[i], s && "expand" in s) {
o = s.expand(o), delete t[i];
for (n in o) n in t || (t[n] = o[n], e[n] = r);
} else e[i] = r;
}
function R(t, e, n) {
var i, r, o = 0, s = R.prefilters.length, a = oe.Deferred().always(function() {
delete u.elem;
}), u = function() {
if (r) return !1;
for (var e = on || L(), n = Math.max(0, l.startTime + l.duration - e), i = n / l.duration || 0, o = 1 - i, s = 0, u = l.tweens.length; u > s; s++) l.tweens[s].run(o);
return a.notifyWith(t, [ l, o, n ]), 1 > o && u ? n :(a.resolveWith(t, [ l ]), !1);
}, l = a.promise({
elem:t,
props:oe.extend({}, e),
opts:oe.extend(!0, {
specialEasing:{},
easing:oe.easing._default
}, n),
originalProperties:e,
originalOptions:n,
startTime:on || L(),
duration:n.duration,
tweens:[],
createTween:function(e, n) {
var i = oe.Tween(t, l.opts, e, n, l.opts.specialEasing[e] || l.opts.easing);
return l.tweens.push(i), i;
},
stop:function(e) {
var n = 0, i = e ? l.tweens.length :0;
if (r) return this;
for (r = !0; i > n; n++) l.tweens[n].run(1);
return e ? (a.notifyWith(t, [ l, 1, 0 ]), a.resolveWith(t, [ l, e ])) :a.rejectWith(t, [ l, e ]), 
this;
}
}), c = l.props;
for (N(c, l.opts.specialEasing); s > o; o++) if (i = R.prefilters[o].call(l, t, c, l.opts)) return oe.isFunction(i.stop) && (oe._queueHooks(l.elem, l.opts.queue).stop = oe.proxy(i.stop, i)), 
i;
return oe.map(c, P, l), oe.isFunction(l.opts.start) && l.opts.start.call(t, l), 
oe.fx.timer(oe.extend(u, {
elem:t,
anim:l,
queue:l.opts.queue
})), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always);
}
function $(t) {
return t.getAttribute && t.getAttribute("class") || "";
}
function F(t) {
return function(e, n) {
"string" != typeof e && (n = e, e = "*");
var i, r = 0, o = e.toLowerCase().match(we) || [];
if (oe.isFunction(n)) for (;i = o[r++]; ) "+" === i[0] ? (i = i.slice(1) || "*", 
(t[i] = t[i] || []).unshift(n)) :(t[i] = t[i] || []).push(n);
};
}
function q(t, e, n, i) {
function r(a) {
var u;
return o[a] = !0, oe.each(t[a] || [], function(t, a) {
var l = a(e, n, i);
return "string" != typeof l || s || o[l] ? s ? !(u = l) :void 0 :(e.dataTypes.unshift(l), 
r(l), !1);
}), u;
}
var o = {}, s = t === En;
return r(e.dataTypes[0]) || !o["*"] && r("*");
}
function U(t, e) {
var n, i, r = oe.ajaxSettings.flatOptions || {};
for (n in e) void 0 !== e[n] && ((r[n] ? t :i || (i = {}))[n] = e[n]);
return i && oe.extend(!0, t, i), t;
}
function B(t, e, n) {
for (var i, r, o, s, a = t.contents, u = t.dataTypes; "*" === u[0]; ) u.shift(), 
void 0 === i && (i = t.mimeType || e.getResponseHeader("Content-Type"));
if (i) for (r in a) if (a[r] && a[r].test(i)) {
u.unshift(r);
break;
}
if (u[0] in n) o = u[0]; else {
for (r in n) {
if (!u[0] || t.converters[r + " " + u[0]]) {
o = r;
break;
}
s || (s = r);
}
o = o || s;
}
return o ? (o !== u[0] && u.unshift(o), n[o]) :void 0;
}
function Y(t, e, n, i) {
var r, o, s, a, u, l = {}, c = t.dataTypes.slice();
if (c[1]) for (s in t.converters) l[s.toLowerCase()] = t.converters[s];
for (o = c.shift(); o; ) if (t.responseFields[o] && (n[t.responseFields[o]] = e), 
!u && i && t.dataFilter && (e = t.dataFilter(e, t.dataType)), u = o, o = c.shift()) if ("*" === o) o = u; else if ("*" !== u && u !== o) {
if (s = l[u + " " + o] || l["* " + o], !s) for (r in l) if (a = r.split(" "), a[1] === o && (s = l[u + " " + a[0]] || l["* " + a[0]])) {
s === !0 ? s = l[r] :l[r] !== !0 && (o = a[0], c.unshift(a[1]));
break;
}
if (s !== !0) if (s && t["throws"]) e = s(e); else try {
e = s(e);
} catch (h) {
return {
state:"parsererror",
error:s ? h :"No conversion from " + u + " to " + o
};
}
}
return {
state:"success",
data:e
};
}
function W(t, e, n, i) {
var r;
if (oe.isArray(e)) oe.each(e, function(e, r) {
n || In.test(t) ? i(t, r) :W(t + "[" + ("object" == typeof r && null != r ? e :"") + "]", r, n, i);
}); else if (n || "object" !== oe.type(e)) i(t, e); else for (r in e) W(t + "[" + r + "]", e[r], n, i);
}
function V(t) {
return oe.isWindow(t) ? t :9 === t.nodeType && t.defaultView;
}
var G = [], X = t.document, J = G.slice, Z = G.concat, K = G.push, Q = G.indexOf, te = {}, ee = te.toString, ne = te.hasOwnProperty, ie = {}, re = "2.2.4", oe = function(t, e) {
return new oe.fn.init(t, e);
}, se = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ae = /^-ms-/, ue = /-([\da-z])/gi, le = function(t, e) {
return e.toUpperCase();
};
oe.fn = oe.prototype = {
jquery:re,
constructor:oe,
selector:"",
length:0,
toArray:function() {
return J.call(this);
},
get:function(t) {
return null != t ? 0 > t ? this[t + this.length] :this[t] :J.call(this);
},
pushStack:function(t) {
var e = oe.merge(this.constructor(), t);
return e.prevObject = this, e.context = this.context, e;
},
each:function(t) {
return oe.each(this, t);
},
map:function(t) {
return this.pushStack(oe.map(this, function(e, n) {
return t.call(e, n, e);
}));
},
slice:function() {
return this.pushStack(J.apply(this, arguments));
},
first:function() {
return this.eq(0);
},
last:function() {
return this.eq(-1);
},
eq:function(t) {
var e = this.length, n = +t + (0 > t ? e :0);
return this.pushStack(n >= 0 && e > n ? [ this[n] ] :[]);
},
end:function() {
return this.prevObject || this.constructor();
},
push:K,
sort:G.sort,
splice:G.splice
}, oe.extend = oe.fn.extend = function() {
var t, e, n, i, r, o, s = arguments[0] || {}, a = 1, u = arguments.length, l = !1;
for ("boolean" == typeof s && (l = s, s = arguments[a] || {}, a++), "object" == typeof s || oe.isFunction(s) || (s = {}), 
a === u && (s = this, a--); u > a; a++) if (null != (t = arguments[a])) for (e in t) n = s[e], 
i = t[e], s !== i && (l && i && (oe.isPlainObject(i) || (r = oe.isArray(i))) ? (r ? (r = !1, 
o = n && oe.isArray(n) ? n :[]) :o = n && oe.isPlainObject(n) ? n :{}, s[e] = oe.extend(l, o, i)) :void 0 !== i && (s[e] = i));
return s;
}, oe.extend({
expando:"jQuery" + (re + Math.random()).replace(/\D/g, ""),
isReady:!0,
error:function(t) {
throw new Error(t);
},
noop:function() {},
isFunction:function(t) {
return "function" === oe.type(t);
},
isArray:Array.isArray,
isWindow:function(t) {
return null != t && t === t.window;
},
isNumeric:function(t) {
var e = t && t.toString();
return !oe.isArray(t) && e - parseFloat(e) + 1 >= 0;
},
isPlainObject:function(t) {
var e;
if ("object" !== oe.type(t) || t.nodeType || oe.isWindow(t)) return !1;
if (t.constructor && !ne.call(t, "constructor") && !ne.call(t.constructor.prototype || {}, "isPrototypeOf")) return !1;
for (e in t) ;
return void 0 === e || ne.call(t, e);
},
isEmptyObject:function(t) {
var e;
for (e in t) return !1;
return !0;
},
type:function(t) {
return null == t ? t + "" :"object" == typeof t || "function" == typeof t ? te[ee.call(t)] || "object" :typeof t;
},
globalEval:function(t) {
var e, n = eval;
t = oe.trim(t), t && (1 === t.indexOf("use strict") ? (e = X.createElement("script"), 
e.text = t, X.head.appendChild(e).parentNode.removeChild(e)) :n(t));
},
camelCase:function(t) {
return t.replace(ae, "ms-").replace(ue, le);
},
nodeName:function(t, e) {
return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase();
},
each:function(t, e) {
var i, r = 0;
if (n(t)) for (i = t.length; i > r && e.call(t[r], r, t[r]) !== !1; r++) ; else for (r in t) if (e.call(t[r], r, t[r]) === !1) break;
return t;
},
trim:function(t) {
return null == t ? "" :(t + "").replace(se, "");
},
makeArray:function(t, e) {
var i = e || [];
return null != t && (n(Object(t)) ? oe.merge(i, "string" == typeof t ? [ t ] :t) :K.call(i, t)), 
i;
},
inArray:function(t, e, n) {
return null == e ? -1 :Q.call(e, t, n);
},
merge:function(t, e) {
for (var n = +e.length, i = 0, r = t.length; n > i; i++) t[r++] = e[i];
return t.length = r, t;
},
grep:function(t, e, n) {
for (var i, r = [], o = 0, s = t.length, a = !n; s > o; o++) i = !e(t[o], o), i !== a && r.push(t[o]);
return r;
},
map:function(t, e, i) {
var r, o, s = 0, a = [];
if (n(t)) for (r = t.length; r > s; s++) o = e(t[s], s, i), null != o && a.push(o); else for (s in t) o = e(t[s], s, i), 
null != o && a.push(o);
return Z.apply([], a);
},
guid:1,
proxy:function(t, e) {
var n, i, r;
return "string" == typeof e && (n = t[e], e = t, t = n), oe.isFunction(t) ? (i = J.call(arguments, 2), 
r = function() {
return t.apply(e || this, i.concat(J.call(arguments)));
}, r.guid = t.guid = t.guid || oe.guid++, r) :void 0;
},
now:Date.now,
support:ie
}), "function" == typeof Symbol && (oe.fn[Symbol.iterator] = G[Symbol.iterator]), 
oe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(t, e) {
te["[object " + e + "]"] = e.toLowerCase();
});
var ce = function(t) {
function e(t, e, n, i) {
var r, o, s, a, u, l, h, f, p = e && e.ownerDocument, m = e ? e.nodeType :9;
if (n = n || [], "string" != typeof t || !t || 1 !== m && 9 !== m && 11 !== m) return n;
if (!i && ((e ? e.ownerDocument || e :$) !== j && I(e), e = e || j, L)) {
if (11 !== m && (l = ve.exec(t))) if (r = l[1]) {
if (9 === m) {
if (!(s = e.getElementById(r))) return n;
if (s.id === r) return n.push(s), n;
} else if (p && (s = p.getElementById(r)) && N(e, s) && s.id === r) return n.push(s), 
n;
} else {
if (l[2]) return K.apply(n, e.getElementsByTagName(t)), n;
if ((r = l[3]) && w.getElementsByClassName && e.getElementsByClassName) return K.apply(n, e.getElementsByClassName(r)), 
n;
}
if (!(!w.qsa || Y[t + " "] || z && z.test(t))) {
if (1 !== m) p = e, f = t; else if ("object" !== e.nodeName.toLowerCase()) {
for ((a = e.getAttribute("id")) ? a = a.replace(_e, "\\$&") :e.setAttribute("id", a = R), 
h = C(t), o = h.length, u = de.test(a) ? "#" + a :"[id='" + a + "']"; o--; ) h[o] = u + " " + d(h[o]);
f = h.join(","), p = ye.test(t) && c(e.parentNode) || e;
}
if (f) try {
return K.apply(n, p.querySelectorAll(f)), n;
} catch (g) {} finally {
a === R && e.removeAttribute("id");
}
}
}
return E(t.replace(ae, "$1"), e, n, i);
}
function n() {
function t(n, i) {
return e.push(n + " ") > x.cacheLength && delete t[e.shift()], t[n + " "] = i;
}
var e = [];
return t;
}
function i(t) {
return t[R] = !0, t;
}
function r(t) {
var e = j.createElement("div");
try {
return !!t(e);
} catch (n) {
return !1;
} finally {
e.parentNode && e.parentNode.removeChild(e), e = null;
}
}
function o(t, e) {
for (var n = t.split("|"), i = n.length; i--; ) x.attrHandle[n[i]] = e;
}
function s(t, e) {
var n = e && t, i = n && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || V) - (~t.sourceIndex || V);
if (i) return i;
if (n) for (;n = n.nextSibling; ) if (n === e) return -1;
return t ? 1 :-1;
}
function a(t) {
return function(e) {
var n = e.nodeName.toLowerCase();
return "input" === n && e.type === t;
};
}
function u(t) {
return function(e) {
var n = e.nodeName.toLowerCase();
return ("input" === n || "button" === n) && e.type === t;
};
}
function l(t) {
return i(function(e) {
return e = +e, i(function(n, i) {
for (var r, o = t([], n.length, e), s = o.length; s--; ) n[r = o[s]] && (n[r] = !(i[r] = n[r]));
});
});
}
function c(t) {
return t && "undefined" != typeof t.getElementsByTagName && t;
}
function h() {}
function d(t) {
for (var e = 0, n = t.length, i = ""; n > e; e++) i += t[e].value;
return i;
}
function f(t, e, n) {
var i = e.dir, r = n && "parentNode" === i, o = q++;
return e.first ? function(e, n, o) {
for (;e = e[i]; ) if (1 === e.nodeType || r) return t(e, n, o);
} :function(e, n, s) {
var a, u, l, c = [ F, o ];
if (s) {
for (;e = e[i]; ) if ((1 === e.nodeType || r) && t(e, n, s)) return !0;
} else for (;e = e[i]; ) if (1 === e.nodeType || r) {
if (l = e[R] || (e[R] = {}), u = l[e.uniqueID] || (l[e.uniqueID] = {}), (a = u[i]) && a[0] === F && a[1] === o) return c[2] = a[2];
if (u[i] = c, c[2] = t(e, n, s)) return !0;
}
};
}
function p(t) {
return t.length > 1 ? function(e, n, i) {
for (var r = t.length; r--; ) if (!t[r](e, n, i)) return !1;
return !0;
} :t[0];
}
function m(t, n, i) {
for (var r = 0, o = n.length; o > r; r++) e(t, n[r], i);
return i;
}
function g(t, e, n, i, r) {
for (var o, s = [], a = 0, u = t.length, l = null != e; u > a; a++) (o = t[a]) && (!n || n(o, i, r)) && (s.push(o), 
l && e.push(a));
return s;
}
function v(t, e, n, r, o, s) {
return r && !r[R] && (r = v(r)), o && !o[R] && (o = v(o, s)), i(function(i, s, a, u) {
var l, c, h, d = [], f = [], p = s.length, v = i || m(e || "*", a.nodeType ? [ a ] :a, []), y = !t || !i && e ? v :g(v, d, t, a, u), _ = n ? o || (i ? t :p || r) ? [] :s :y;
if (n && n(y, _, a, u), r) for (l = g(_, f), r(l, [], a, u), c = l.length; c--; ) (h = l[c]) && (_[f[c]] = !(y[f[c]] = h));
if (i) {
if (o || t) {
if (o) {
for (l = [], c = _.length; c--; ) (h = _[c]) && l.push(y[c] = h);
o(null, _ = [], l, u);
}
for (c = _.length; c--; ) (h = _[c]) && (l = o ? te(i, h) :d[c]) > -1 && (i[l] = !(s[l] = h));
}
} else _ = g(_ === s ? _.splice(p, _.length) :_), o ? o(null, s, _, u) :K.apply(s, _);
});
}
function y(t) {
for (var e, n, i, r = t.length, o = x.relative[t[0].type], s = o || x.relative[" "], a = o ? 1 :0, u = f(function(t) {
return t === e;
}, s, !0), l = f(function(t) {
return te(e, t) > -1;
}, s, !0), c = [ function(t, n, i) {
var r = !o && (i || n !== D) || ((e = n).nodeType ? u(t, n, i) :l(t, n, i));
return e = null, r;
} ]; r > a; a++) if (n = x.relative[t[a].type]) c = [ f(p(c), n) ]; else {
if (n = x.filter[t[a].type].apply(null, t[a].matches), n[R]) {
for (i = ++a; r > i && !x.relative[t[i].type]; i++) ;
return v(a > 1 && p(c), a > 1 && d(t.slice(0, a - 1).concat({
value:" " === t[a - 2].type ? "*" :""
})).replace(ae, "$1"), n, i > a && y(t.slice(a, i)), r > i && y(t = t.slice(i)), r > i && d(t));
}
c.push(n);
}
return p(c);
}
function _(t, n) {
var r = n.length > 0, o = t.length > 0, s = function(i, s, a, u, l) {
var c, h, d, f = 0, p = "0", m = i && [], v = [], y = D, _ = i || o && x.find.TAG("*", l), b = F += null == y ? 1 :Math.random() || .1, w = _.length;
for (l && (D = s === j || s || l); p !== w && null != (c = _[p]); p++) {
if (o && c) {
for (h = 0, s || c.ownerDocument === j || (I(c), a = !L); d = t[h++]; ) if (d(c, s || j, a)) {
u.push(c);
break;
}
l && (F = b);
}
r && ((c = !d && c) && f--, i && m.push(c));
}
if (f += p, r && p !== f) {
for (h = 0; d = n[h++]; ) d(m, v, s, a);
if (i) {
if (f > 0) for (;p--; ) m[p] || v[p] || (v[p] = J.call(u));
v = g(v);
}
K.apply(u, v), l && !i && v.length > 0 && f + n.length > 1 && e.uniqueSort(u);
}
return l && (F = b, D = y), m;
};
return r ? i(s) :s;
}
var b, w, x, S, k, C, T, E, D, M, O, I, j, A, L, z, P, H, N, R = "sizzle" + 1 * new Date(), $ = t.document, F = 0, q = 0, U = n(), B = n(), Y = n(), W = function(t, e) {
return t === e && (O = !0), 0;
}, V = 1 << 31, G = {}.hasOwnProperty, X = [], J = X.pop, Z = X.push, K = X.push, Q = X.slice, te = function(t, e) {
for (var n = 0, i = t.length; i > n; n++) if (t[n] === e) return n;
return -1;
}, ee = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ne = "[\\x20\\t\\r\\n\\f]", ie = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", re = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + ie + "))|)" + ne + "*\\]", oe = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + re + ")*)|.*)\\)|)", se = new RegExp(ne + "+", "g"), ae = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"), ue = new RegExp("^" + ne + "*," + ne + "*"), le = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"), ce = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"), he = new RegExp(oe), de = new RegExp("^" + ie + "$"), fe = {
ID:new RegExp("^#(" + ie + ")"),
CLASS:new RegExp("^\\.(" + ie + ")"),
TAG:new RegExp("^(" + ie + "|[*])"),
ATTR:new RegExp("^" + re),
PSEUDO:new RegExp("^" + oe),
CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
bool:new RegExp("^(?:" + ee + ")$", "i"),
needsContext:new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
}, pe = /^(?:input|select|textarea|button)$/i, me = /^h\d$/i, ge = /^[^{]+\{\s*\[native \w/, ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ye = /[+~]/, _e = /'|\\/g, be = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"), we = function(t, e, n) {
var i = "0x" + e - 65536;
return i !== i || n ? e :0 > i ? String.fromCharCode(i + 65536) :String.fromCharCode(i >> 10 | 55296, 1023 & i | 56320);
}, xe = function() {
I();
};
try {
K.apply(X = Q.call($.childNodes), $.childNodes), X[$.childNodes.length].nodeType;
} catch (Se) {
K = {
apply:X.length ? function(t, e) {
Z.apply(t, Q.call(e));
} :function(t, e) {
for (var n = t.length, i = 0; t[n++] = e[i++]; ) ;
t.length = n - 1;
}
};
}
w = e.support = {}, k = e.isXML = function(t) {
var e = t && (t.ownerDocument || t).documentElement;
return e ? "HTML" !== e.nodeName :!1;
}, I = e.setDocument = function(t) {
var e, n, i = t ? t.ownerDocument || t :$;
return i !== j && 9 === i.nodeType && i.documentElement ? (j = i, A = j.documentElement, 
L = !k(j), (n = j.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", xe, !1) :n.attachEvent && n.attachEvent("onunload", xe)), 
w.attributes = r(function(t) {
return t.className = "i", !t.getAttribute("className");
}), w.getElementsByTagName = r(function(t) {
return t.appendChild(j.createComment("")), !t.getElementsByTagName("*").length;
}), w.getElementsByClassName = ge.test(j.getElementsByClassName), w.getById = r(function(t) {
return A.appendChild(t).id = R, !j.getElementsByName || !j.getElementsByName(R).length;
}), w.getById ? (x.find.ID = function(t, e) {
if ("undefined" != typeof e.getElementById && L) {
var n = e.getElementById(t);
return n ? [ n ] :[];
}
}, x.filter.ID = function(t) {
var e = t.replace(be, we);
return function(t) {
return t.getAttribute("id") === e;
};
}) :(delete x.find.ID, x.filter.ID = function(t) {
var e = t.replace(be, we);
return function(t) {
var n = "undefined" != typeof t.getAttributeNode && t.getAttributeNode("id");
return n && n.value === e;
};
}), x.find.TAG = w.getElementsByTagName ? function(t, e) {
return "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t) :w.qsa ? e.querySelectorAll(t) :void 0;
} :function(t, e) {
var n, i = [], r = 0, o = e.getElementsByTagName(t);
if ("*" === t) {
for (;n = o[r++]; ) 1 === n.nodeType && i.push(n);
return i;
}
return o;
}, x.find.CLASS = w.getElementsByClassName && function(t, e) {
return "undefined" != typeof e.getElementsByClassName && L ? e.getElementsByClassName(t) :void 0;
}, P = [], z = [], (w.qsa = ge.test(j.querySelectorAll)) && (r(function(t) {
A.appendChild(t).innerHTML = "<a id='" + R + "'></a><select id='" + R + "-\r\\' msallowcapture=''><option selected=''></option></select>", 
t.querySelectorAll("[msallowcapture^='']").length && z.push("[*^$]=" + ne + "*(?:''|\"\")"), 
t.querySelectorAll("[selected]").length || z.push("\\[" + ne + "*(?:value|" + ee + ")"), 
t.querySelectorAll("[id~=" + R + "-]").length || z.push("~="), t.querySelectorAll(":checked").length || z.push(":checked"), 
t.querySelectorAll("a#" + R + "+*").length || z.push(".#.+[+~]");
}), r(function(t) {
var e = j.createElement("input");
e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("name", "D"), t.querySelectorAll("[name=d]").length && z.push("name" + ne + "*[*^$|!~]?="), 
t.querySelectorAll(":enabled").length || z.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), 
z.push(",.*:");
})), (w.matchesSelector = ge.test(H = A.matches || A.webkitMatchesSelector || A.mozMatchesSelector || A.oMatchesSelector || A.msMatchesSelector)) && r(function(t) {
w.disconnectedMatch = H.call(t, "div"), H.call(t, "[s!='']:x"), P.push("!=", oe);
}), z = z.length && new RegExp(z.join("|")), P = P.length && new RegExp(P.join("|")), 
e = ge.test(A.compareDocumentPosition), N = e || ge.test(A.contains) ? function(t, e) {
var n = 9 === t.nodeType ? t.documentElement :t, i = e && e.parentNode;
return t === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) :t.compareDocumentPosition && 16 & t.compareDocumentPosition(i)));
} :function(t, e) {
if (e) for (;e = e.parentNode; ) if (e === t) return !0;
return !1;
}, W = e ? function(t, e) {
if (t === e) return O = !0, 0;
var n = !t.compareDocumentPosition - !e.compareDocumentPosition;
return n ? n :(n = (t.ownerDocument || t) === (e.ownerDocument || e) ? t.compareDocumentPosition(e) :1, 
1 & n || !w.sortDetached && e.compareDocumentPosition(t) === n ? t === j || t.ownerDocument === $ && N($, t) ? -1 :e === j || e.ownerDocument === $ && N($, e) ? 1 :M ? te(M, t) - te(M, e) :0 :4 & n ? -1 :1);
} :function(t, e) {
if (t === e) return O = !0, 0;
var n, i = 0, r = t.parentNode, o = e.parentNode, a = [ t ], u = [ e ];
if (!r || !o) return t === j ? -1 :e === j ? 1 :r ? -1 :o ? 1 :M ? te(M, t) - te(M, e) :0;
if (r === o) return s(t, e);
for (n = t; n = n.parentNode; ) a.unshift(n);
for (n = e; n = n.parentNode; ) u.unshift(n);
for (;a[i] === u[i]; ) i++;
return i ? s(a[i], u[i]) :a[i] === $ ? -1 :u[i] === $ ? 1 :0;
}, j) :j;
}, e.matches = function(t, n) {
return e(t, null, null, n);
}, e.matchesSelector = function(t, n) {
if ((t.ownerDocument || t) !== j && I(t), n = n.replace(ce, "='$1']"), !(!w.matchesSelector || !L || Y[n + " "] || P && P.test(n) || z && z.test(n))) try {
var i = H.call(t, n);
if (i || w.disconnectedMatch || t.document && 11 !== t.document.nodeType) return i;
} catch (r) {}
return e(n, j, null, [ t ]).length > 0;
}, e.contains = function(t, e) {
return (t.ownerDocument || t) !== j && I(t), N(t, e);
}, e.attr = function(t, e) {
(t.ownerDocument || t) !== j && I(t);
var n = x.attrHandle[e.toLowerCase()], i = n && G.call(x.attrHandle, e.toLowerCase()) ? n(t, e, !L) :void 0;
return void 0 !== i ? i :w.attributes || !L ? t.getAttribute(e) :(i = t.getAttributeNode(e)) && i.specified ? i.value :null;
}, e.error = function(t) {
throw new Error("Syntax error, unrecognized expression: " + t);
}, e.uniqueSort = function(t) {
var e, n = [], i = 0, r = 0;
if (O = !w.detectDuplicates, M = !w.sortStable && t.slice(0), t.sort(W), O) {
for (;e = t[r++]; ) e === t[r] && (i = n.push(r));
for (;i--; ) t.splice(n[i], 1);
}
return M = null, t;
}, S = e.getText = function(t) {
var e, n = "", i = 0, r = t.nodeType;
if (r) {
if (1 === r || 9 === r || 11 === r) {
if ("string" == typeof t.textContent) return t.textContent;
for (t = t.firstChild; t; t = t.nextSibling) n += S(t);
} else if (3 === r || 4 === r) return t.nodeValue;
} else for (;e = t[i++]; ) n += S(e);
return n;
}, x = e.selectors = {
cacheLength:50,
createPseudo:i,
match:fe,
attrHandle:{},
find:{},
relative:{
">":{
dir:"parentNode",
first:!0
},
" ":{
dir:"parentNode"
},
"+":{
dir:"previousSibling",
first:!0
},
"~":{
dir:"previousSibling"
}
},
preFilter:{
ATTR:function(t) {
return t[1] = t[1].replace(be, we), t[3] = (t[3] || t[4] || t[5] || "").replace(be, we), 
"~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4);
},
CHILD:function(t) {
return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || e.error(t[0]), 
t[4] = +(t[4] ? t[5] + (t[6] || 1) :2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) :t[3] && e.error(t[0]), 
t;
},
PSEUDO:function(t) {
var e, n = !t[6] && t[2];
return fe.CHILD.test(t[0]) ? null :(t[3] ? t[2] = t[4] || t[5] || "" :n && he.test(n) && (e = C(n, !0)) && (e = n.indexOf(")", n.length - e) - n.length) && (t[0] = t[0].slice(0, e), 
t[2] = n.slice(0, e)), t.slice(0, 3));
}
},
filter:{
TAG:function(t) {
var e = t.replace(be, we).toLowerCase();
return "*" === t ? function() {
return !0;
} :function(t) {
return t.nodeName && t.nodeName.toLowerCase() === e;
};
},
CLASS:function(t) {
var e = U[t + " "];
return e || (e = new RegExp("(^|" + ne + ")" + t + "(" + ne + "|$)")) && U(t, function(t) {
return e.test("string" == typeof t.className && t.className || "undefined" != typeof t.getAttribute && t.getAttribute("class") || "");
});
},
ATTR:function(t, n, i) {
return function(r) {
var o = e.attr(r, t);
return null == o ? "!=" === n :n ? (o += "", "=" === n ? o === i :"!=" === n ? o !== i :"^=" === n ? i && 0 === o.indexOf(i) :"*=" === n ? i && o.indexOf(i) > -1 :"$=" === n ? i && o.slice(-i.length) === i :"~=" === n ? (" " + o.replace(se, " ") + " ").indexOf(i) > -1 :"|=" === n ? o === i || o.slice(0, i.length + 1) === i + "-" :!1) :!0;
};
},
CHILD:function(t, e, n, i, r) {
var o = "nth" !== t.slice(0, 3), s = "last" !== t.slice(-4), a = "of-type" === e;
return 1 === i && 0 === r ? function(t) {
return !!t.parentNode;
} :function(e, n, u) {
var l, c, h, d, f, p, m = o !== s ? "nextSibling" :"previousSibling", g = e.parentNode, v = a && e.nodeName.toLowerCase(), y = !u && !a, _ = !1;
if (g) {
if (o) {
for (;m; ) {
for (d = e; d = d[m]; ) if (a ? d.nodeName.toLowerCase() === v :1 === d.nodeType) return !1;
p = m = "only" === t && !p && "nextSibling";
}
return !0;
}
if (p = [ s ? g.firstChild :g.lastChild ], s && y) {
for (d = g, h = d[R] || (d[R] = {}), c = h[d.uniqueID] || (h[d.uniqueID] = {}), 
l = c[t] || [], f = l[0] === F && l[1], _ = f && l[2], d = f && g.childNodes[f]; d = ++f && d && d[m] || (_ = f = 0) || p.pop(); ) if (1 === d.nodeType && ++_ && d === e) {
c[t] = [ F, f, _ ];
break;
}
} else if (y && (d = e, h = d[R] || (d[R] = {}), c = h[d.uniqueID] || (h[d.uniqueID] = {}), 
l = c[t] || [], f = l[0] === F && l[1], _ = f), _ === !1) for (;(d = ++f && d && d[m] || (_ = f = 0) || p.pop()) && ((a ? d.nodeName.toLowerCase() !== v :1 !== d.nodeType) || !++_ || (y && (h = d[R] || (d[R] = {}), 
c = h[d.uniqueID] || (h[d.uniqueID] = {}), c[t] = [ F, _ ]), d !== e)); ) ;
return _ -= r, _ === i || _ % i === 0 && _ / i >= 0;
}
};
},
PSEUDO:function(t, n) {
var r, o = x.pseudos[t] || x.setFilters[t.toLowerCase()] || e.error("unsupported pseudo: " + t);
return o[R] ? o(n) :o.length > 1 ? (r = [ t, t, "", n ], x.setFilters.hasOwnProperty(t.toLowerCase()) ? i(function(t, e) {
for (var i, r = o(t, n), s = r.length; s--; ) i = te(t, r[s]), t[i] = !(e[i] = r[s]);
}) :function(t) {
return o(t, 0, r);
}) :o;
}
},
pseudos:{
not:i(function(t) {
var e = [], n = [], r = T(t.replace(ae, "$1"));
return r[R] ? i(function(t, e, n, i) {
for (var o, s = r(t, null, i, []), a = t.length; a--; ) (o = s[a]) && (t[a] = !(e[a] = o));
}) :function(t, i, o) {
return e[0] = t, r(e, null, o, n), e[0] = null, !n.pop();
};
}),
has:i(function(t) {
return function(n) {
return e(t, n).length > 0;
};
}),
contains:i(function(t) {
return t = t.replace(be, we), function(e) {
return (e.textContent || e.innerText || S(e)).indexOf(t) > -1;
};
}),
lang:i(function(t) {
return de.test(t || "") || e.error("unsupported lang: " + t), t = t.replace(be, we).toLowerCase(), 
function(e) {
var n;
do if (n = L ? e.lang :e.getAttribute("xml:lang") || e.getAttribute("lang")) return n = n.toLowerCase(), 
n === t || 0 === n.indexOf(t + "-"); while ((e = e.parentNode) && 1 === e.nodeType);
return !1;
};
}),
target:function(e) {
var n = t.location && t.location.hash;
return n && n.slice(1) === e.id;
},
root:function(t) {
return t === A;
},
focus:function(t) {
return t === j.activeElement && (!j.hasFocus || j.hasFocus()) && !!(t.type || t.href || ~t.tabIndex);
},
enabled:function(t) {
return t.disabled === !1;
},
disabled:function(t) {
return t.disabled === !0;
},
checked:function(t) {
var e = t.nodeName.toLowerCase();
return "input" === e && !!t.checked || "option" === e && !!t.selected;
},
selected:function(t) {
return t.parentNode && t.parentNode.selectedIndex, t.selected === !0;
},
empty:function(t) {
for (t = t.firstChild; t; t = t.nextSibling) if (t.nodeType < 6) return !1;
return !0;
},
parent:function(t) {
return !x.pseudos.empty(t);
},
header:function(t) {
return me.test(t.nodeName);
},
input:function(t) {
return pe.test(t.nodeName);
},
button:function(t) {
var e = t.nodeName.toLowerCase();
return "input" === e && "button" === t.type || "button" === e;
},
text:function(t) {
var e;
return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || "text" === e.toLowerCase());
},
first:l(function() {
return [ 0 ];
}),
last:l(function(t, e) {
return [ e - 1 ];
}),
eq:l(function(t, e, n) {
return [ 0 > n ? n + e :n ];
}),
even:l(function(t, e) {
for (var n = 0; e > n; n += 2) t.push(n);
return t;
}),
odd:l(function(t, e) {
for (var n = 1; e > n; n += 2) t.push(n);
return t;
}),
lt:l(function(t, e, n) {
for (var i = 0 > n ? n + e :n; --i >= 0; ) t.push(i);
return t;
}),
gt:l(function(t, e, n) {
for (var i = 0 > n ? n + e :n; ++i < e; ) t.push(i);
return t;
})
}
}, x.pseudos.nth = x.pseudos.eq;
for (b in {
radio:!0,
checkbox:!0,
file:!0,
password:!0,
image:!0
}) x.pseudos[b] = a(b);
for (b in {
submit:!0,
reset:!0
}) x.pseudos[b] = u(b);
return h.prototype = x.filters = x.pseudos, x.setFilters = new h(), C = e.tokenize = function(t, n) {
var i, r, o, s, a, u, l, c = B[t + " "];
if (c) return n ? 0 :c.slice(0);
for (a = t, u = [], l = x.preFilter; a; ) {
(!i || (r = ue.exec(a))) && (r && (a = a.slice(r[0].length) || a), u.push(o = [])), 
i = !1, (r = le.exec(a)) && (i = r.shift(), o.push({
value:i,
type:r[0].replace(ae, " ")
}), a = a.slice(i.length));
for (s in x.filter) !(r = fe[s].exec(a)) || l[s] && !(r = l[s](r)) || (i = r.shift(), 
o.push({
value:i,
type:s,
matches:r
}), a = a.slice(i.length));
if (!i) break;
}
return n ? a.length :a ? e.error(t) :B(t, u).slice(0);
}, T = e.compile = function(t, e) {
var n, i = [], r = [], o = Y[t + " "];
if (!o) {
for (e || (e = C(t)), n = e.length; n--; ) o = y(e[n]), o[R] ? i.push(o) :r.push(o);
o = Y(t, _(r, i)), o.selector = t;
}
return o;
}, E = e.select = function(t, e, n, i) {
var r, o, s, a, u, l = "function" == typeof t && t, h = !i && C(t = l.selector || t);
if (n = n || [], 1 === h.length) {
if (o = h[0] = h[0].slice(0), o.length > 2 && "ID" === (s = o[0]).type && w.getById && 9 === e.nodeType && L && x.relative[o[1].type]) {
if (e = (x.find.ID(s.matches[0].replace(be, we), e) || [])[0], !e) return n;
l && (e = e.parentNode), t = t.slice(o.shift().value.length);
}
for (r = fe.needsContext.test(t) ? 0 :o.length; r-- && (s = o[r], !x.relative[a = s.type]); ) if ((u = x.find[a]) && (i = u(s.matches[0].replace(be, we), ye.test(o[0].type) && c(e.parentNode) || e))) {
if (o.splice(r, 1), t = i.length && d(o), !t) return K.apply(n, i), n;
break;
}
}
return (l || T(t, h))(i, e, !L, n, !e || ye.test(t) && c(e.parentNode) || e), n;
}, w.sortStable = R.split("").sort(W).join("") === R, w.detectDuplicates = !!O, 
I(), w.sortDetached = r(function(t) {
return 1 & t.compareDocumentPosition(j.createElement("div"));
}), r(function(t) {
return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href");
}) || o("type|href|height|width", function(t, e, n) {
return n ? void 0 :t.getAttribute(e, "type" === e.toLowerCase() ? 1 :2);
}), w.attributes && r(function(t) {
return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value");
}) || o("value", function(t, e, n) {
return n || "input" !== t.nodeName.toLowerCase() ? void 0 :t.defaultValue;
}), r(function(t) {
return null == t.getAttribute("disabled");
}) || o(ee, function(t, e, n) {
var i;
return n ? void 0 :t[e] === !0 ? e.toLowerCase() :(i = t.getAttributeNode(e)) && i.specified ? i.value :null;
}), e;
}(t);
oe.find = ce, oe.expr = ce.selectors, oe.expr[":"] = oe.expr.pseudos, oe.uniqueSort = oe.unique = ce.uniqueSort, 
oe.text = ce.getText, oe.isXMLDoc = ce.isXML, oe.contains = ce.contains;
var he = function(t, e, n) {
for (var i = [], r = void 0 !== n; (t = t[e]) && 9 !== t.nodeType; ) if (1 === t.nodeType) {
if (r && oe(t).is(n)) break;
i.push(t);
}
return i;
}, de = function(t, e) {
for (var n = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && n.push(t);
return n;
}, fe = oe.expr.match.needsContext, pe = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/, me = /^.[^:#\[\.,]*$/;
oe.filter = function(t, e, n) {
var i = e[0];
return n && (t = ":not(" + t + ")"), 1 === e.length && 1 === i.nodeType ? oe.find.matchesSelector(i, t) ? [ i ] :[] :oe.find.matches(t, oe.grep(e, function(t) {
return 1 === t.nodeType;
}));
}, oe.fn.extend({
find:function(t) {
var e, n = this.length, i = [], r = this;
if ("string" != typeof t) return this.pushStack(oe(t).filter(function() {
for (e = 0; n > e; e++) if (oe.contains(r[e], this)) return !0;
}));
for (e = 0; n > e; e++) oe.find(t, r[e], i);
return i = this.pushStack(n > 1 ? oe.unique(i) :i), i.selector = this.selector ? this.selector + " " + t :t, 
i;
},
filter:function(t) {
return this.pushStack(i(this, t || [], !1));
},
not:function(t) {
return this.pushStack(i(this, t || [], !0));
},
is:function(t) {
return !!i(this, "string" == typeof t && fe.test(t) ? oe(t) :t || [], !1).length;
}
});
var ge, ve = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, ye = oe.fn.init = function(t, e, n) {
var i, r;
if (!t) return this;
if (n = n || ge, "string" == typeof t) {
if (i = "<" === t[0] && ">" === t[t.length - 1] && t.length >= 3 ? [ null, t, null ] :ve.exec(t), 
!i || !i[1] && e) return !e || e.jquery ? (e || n).find(t) :this.constructor(e).find(t);
if (i[1]) {
if (e = e instanceof oe ? e[0] :e, oe.merge(this, oe.parseHTML(i[1], e && e.nodeType ? e.ownerDocument || e :X, !0)), 
pe.test(i[1]) && oe.isPlainObject(e)) for (i in e) oe.isFunction(this[i]) ? this[i](e[i]) :this.attr(i, e[i]);
return this;
}
return r = X.getElementById(i[2]), r && r.parentNode && (this.length = 1, this[0] = r), 
this.context = X, this.selector = t, this;
}
return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) :oe.isFunction(t) ? void 0 !== n.ready ? n.ready(t) :t(oe) :(void 0 !== t.selector && (this.selector = t.selector, 
this.context = t.context), oe.makeArray(t, this));
};
ye.prototype = oe.fn, ge = oe(X);
var _e = /^(?:parents|prev(?:Until|All))/, be = {
children:!0,
contents:!0,
next:!0,
prev:!0
};
oe.fn.extend({
has:function(t) {
var e = oe(t, this), n = e.length;
return this.filter(function() {
for (var t = 0; n > t; t++) if (oe.contains(this, e[t])) return !0;
});
},
closest:function(t, e) {
for (var n, i = 0, r = this.length, o = [], s = fe.test(t) || "string" != typeof t ? oe(t, e || this.context) :0; r > i; i++) for (n = this[i]; n && n !== e; n = n.parentNode) if (n.nodeType < 11 && (s ? s.index(n) > -1 :1 === n.nodeType && oe.find.matchesSelector(n, t))) {
o.push(n);
break;
}
return this.pushStack(o.length > 1 ? oe.uniqueSort(o) :o);
},
index:function(t) {
return t ? "string" == typeof t ? Q.call(oe(t), this[0]) :Q.call(this, t.jquery ? t[0] :t) :this[0] && this[0].parentNode ? this.first().prevAll().length :-1;
},
add:function(t, e) {
return this.pushStack(oe.uniqueSort(oe.merge(this.get(), oe(t, e))));
},
addBack:function(t) {
return this.add(null == t ? this.prevObject :this.prevObject.filter(t));
}
}), oe.each({
parent:function(t) {
var e = t.parentNode;
return e && 11 !== e.nodeType ? e :null;
},
parents:function(t) {
return he(t, "parentNode");
},
parentsUntil:function(t, e, n) {
return he(t, "parentNode", n);
},
next:function(t) {
return r(t, "nextSibling");
},
prev:function(t) {
return r(t, "previousSibling");
},
nextAll:function(t) {
return he(t, "nextSibling");
},
prevAll:function(t) {
return he(t, "previousSibling");
},
nextUntil:function(t, e, n) {
return he(t, "nextSibling", n);
},
prevUntil:function(t, e, n) {
return he(t, "previousSibling", n);
},
siblings:function(t) {
return de((t.parentNode || {}).firstChild, t);
},
children:function(t) {
return de(t.firstChild);
},
contents:function(t) {
return t.contentDocument || oe.merge([], t.childNodes);
}
}, function(t, e) {
oe.fn[t] = function(n, i) {
var r = oe.map(this, e, n);
return "Until" !== t.slice(-5) && (i = n), i && "string" == typeof i && (r = oe.filter(i, r)), 
this.length > 1 && (be[t] || oe.uniqueSort(r), _e.test(t) && r.reverse()), this.pushStack(r);
};
});
var we = /\S+/g;
oe.Callbacks = function(t) {
t = "string" == typeof t ? o(t) :oe.extend({}, t);
var e, n, i, r, s = [], a = [], u = -1, l = function() {
for (r = t.once, i = e = !0; a.length; u = -1) for (n = a.shift(); ++u < s.length; ) s[u].apply(n[0], n[1]) === !1 && t.stopOnFalse && (u = s.length, 
n = !1);
t.memory || (n = !1), e = !1, r && (s = n ? [] :"");
}, c = {
add:function() {
return s && (n && !e && (u = s.length - 1, a.push(n)), function i(e) {
oe.each(e, function(e, n) {
oe.isFunction(n) ? t.unique && c.has(n) || s.push(n) :n && n.length && "string" !== oe.type(n) && i(n);
});
}(arguments), n && !e && l()), this;
},
remove:function() {
return oe.each(arguments, function(t, e) {
for (var n; (n = oe.inArray(e, s, n)) > -1; ) s.splice(n, 1), u >= n && u--;
}), this;
},
has:function(t) {
return t ? oe.inArray(t, s) > -1 :s.length > 0;
},
empty:function() {
return s && (s = []), this;
},
disable:function() {
return r = a = [], s = n = "", this;
},
disabled:function() {
return !s;
},
lock:function() {
return r = a = [], n || (s = n = ""), this;
},
locked:function() {
return !!r;
},
fireWith:function(t, n) {
return r || (n = n || [], n = [ t, n.slice ? n.slice() :n ], a.push(n), e || l()), 
this;
},
fire:function() {
return c.fireWith(this, arguments), this;
},
fired:function() {
return !!i;
}
};
return c;
}, oe.extend({
Deferred:function(t) {
var e = [ [ "resolve", "done", oe.Callbacks("once memory"), "resolved" ], [ "reject", "fail", oe.Callbacks("once memory"), "rejected" ], [ "notify", "progress", oe.Callbacks("memory") ] ], n = "pending", i = {
state:function() {
return n;
},
always:function() {
return r.done(arguments).fail(arguments), this;
},
then:function() {
var t = arguments;
return oe.Deferred(function(n) {
oe.each(e, function(e, o) {
var s = oe.isFunction(t[e]) && t[e];
r[o[1]](function() {
var t = s && s.apply(this, arguments);
t && oe.isFunction(t.promise) ? t.promise().progress(n.notify).done(n.resolve).fail(n.reject) :n[o[0] + "With"](this === i ? n.promise() :this, s ? [ t ] :arguments);
});
}), t = null;
}).promise();
},
promise:function(t) {
return null != t ? oe.extend(t, i) :i;
}
}, r = {};
return i.pipe = i.then, oe.each(e, function(t, o) {
var s = o[2], a = o[3];
i[o[1]] = s.add, a && s.add(function() {
n = a;
}, e[1 ^ t][2].disable, e[2][2].lock), r[o[0]] = function() {
return r[o[0] + "With"](this === r ? i :this, arguments), this;
}, r[o[0] + "With"] = s.fireWith;
}), i.promise(r), t && t.call(r, r), r;
},
when:function(t) {
var e, n, i, r = 0, o = J.call(arguments), s = o.length, a = 1 !== s || t && oe.isFunction(t.promise) ? s :0, u = 1 === a ? t :oe.Deferred(), l = function(t, n, i) {
return function(r) {
n[t] = this, i[t] = arguments.length > 1 ? J.call(arguments) :r, i === e ? u.notifyWith(n, i) :--a || u.resolveWith(n, i);
};
};
if (s > 1) for (e = new Array(s), n = new Array(s), i = new Array(s); s > r; r++) o[r] && oe.isFunction(o[r].promise) ? o[r].promise().progress(l(r, n, e)).done(l(r, i, o)).fail(u.reject) :--a;
return a || u.resolveWith(i, o), u.promise();
}
});
var xe;
oe.fn.ready = function(t) {
return oe.ready.promise().done(t), this;
}, oe.extend({
isReady:!1,
readyWait:1,
holdReady:function(t) {
t ? oe.readyWait++ :oe.ready(!0);
},
ready:function(t) {
(t === !0 ? --oe.readyWait :oe.isReady) || (oe.isReady = !0, t !== !0 && --oe.readyWait > 0 || (xe.resolveWith(X, [ oe ]), 
oe.fn.triggerHandler && (oe(X).triggerHandler("ready"), oe(X).off("ready"))));
}
}), oe.ready.promise = function(e) {
return xe || (xe = oe.Deferred(), "complete" === X.readyState || "loading" !== X.readyState && !X.documentElement.doScroll ? t.setTimeout(oe.ready) :(X.addEventListener("DOMContentLoaded", s), 
t.addEventListener("load", s))), xe.promise(e);
}, oe.ready.promise();
var Se = function(t, e, n, i, r, o, s) {
var a = 0, u = t.length, l = null == n;
if ("object" === oe.type(n)) {
r = !0;
for (a in n) Se(t, e, a, n[a], !0, o, s);
} else if (void 0 !== i && (r = !0, oe.isFunction(i) || (s = !0), l && (s ? (e.call(t, i), 
e = null) :(l = e, e = function(t, e, n) {
return l.call(oe(t), n);
})), e)) for (;u > a; a++) e(t[a], n, s ? i :i.call(t[a], a, e(t[a], n)));
return r ? t :l ? e.call(t) :u ? e(t[0], n) :o;
}, ke = function(t) {
return 1 === t.nodeType || 9 === t.nodeType || !+t.nodeType;
};
a.uid = 1, a.prototype = {
register:function(t, e) {
var n = e || {};
return t.nodeType ? t[this.expando] = n :Object.defineProperty(t, this.expando, {
value:n,
writable:!0,
configurable:!0
}), t[this.expando];
},
cache:function(t) {
if (!ke(t)) return {};
var e = t[this.expando];
return e || (e = {}, ke(t) && (t.nodeType ? t[this.expando] = e :Object.defineProperty(t, this.expando, {
value:e,
configurable:!0
}))), e;
},
set:function(t, e, n) {
var i, r = this.cache(t);
if ("string" == typeof e) r[e] = n; else for (i in e) r[i] = e[i];
return r;
},
get:function(t, e) {
return void 0 === e ? this.cache(t) :t[this.expando] && t[this.expando][e];
},
access:function(t, e, n) {
var i;
return void 0 === e || e && "string" == typeof e && void 0 === n ? (i = this.get(t, e), 
void 0 !== i ? i :this.get(t, oe.camelCase(e))) :(this.set(t, e, n), void 0 !== n ? n :e);
},
remove:function(t, e) {
var n, i, r, o = t[this.expando];
if (void 0 !== o) {
if (void 0 === e) this.register(t); else {
oe.isArray(e) ? i = e.concat(e.map(oe.camelCase)) :(r = oe.camelCase(e), e in o ? i = [ e, r ] :(i = r, 
i = i in o ? [ i ] :i.match(we) || [])), n = i.length;
for (;n--; ) delete o[i[n]];
}
(void 0 === e || oe.isEmptyObject(o)) && (t.nodeType ? t[this.expando] = void 0 :delete t[this.expando]);
}
},
hasData:function(t) {
var e = t[this.expando];
return void 0 !== e && !oe.isEmptyObject(e);
}
};
var Ce = new a(), Te = new a(), Ee = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, De = /[A-Z]/g;
oe.extend({
hasData:function(t) {
return Te.hasData(t) || Ce.hasData(t);
},
data:function(t, e, n) {
return Te.access(t, e, n);
},
removeData:function(t, e) {
Te.remove(t, e);
},
_data:function(t, e, n) {
return Ce.access(t, e, n);
},
_removeData:function(t, e) {
Ce.remove(t, e);
}
}), oe.fn.extend({
data:function(t, e) {
var n, i, r, o = this[0], s = o && o.attributes;
if (void 0 === t) {
if (this.length && (r = Te.get(o), 1 === o.nodeType && !Ce.get(o, "hasDataAttrs"))) {
for (n = s.length; n--; ) s[n] && (i = s[n].name, 0 === i.indexOf("data-") && (i = oe.camelCase(i.slice(5)), 
u(o, i, r[i])));
Ce.set(o, "hasDataAttrs", !0);
}
return r;
}
return "object" == typeof t ? this.each(function() {
Te.set(this, t);
}) :Se(this, function(e) {
var n, i;
if (o && void 0 === e) {
if (n = Te.get(o, t) || Te.get(o, t.replace(De, "-$&").toLowerCase()), void 0 !== n) return n;
if (i = oe.camelCase(t), n = Te.get(o, i), void 0 !== n) return n;
if (n = u(o, i, void 0), void 0 !== n) return n;
} else i = oe.camelCase(t), this.each(function() {
var n = Te.get(this, i);
Te.set(this, i, e), t.indexOf("-") > -1 && void 0 !== n && Te.set(this, t, e);
});
}, null, e, arguments.length > 1, null, !0);
},
removeData:function(t) {
return this.each(function() {
Te.remove(this, t);
});
}
}), oe.extend({
queue:function(t, e, n) {
var i;
return t ? (e = (e || "fx") + "queue", i = Ce.get(t, e), n && (!i || oe.isArray(n) ? i = Ce.access(t, e, oe.makeArray(n)) :i.push(n)), 
i || []) :void 0;
},
dequeue:function(t, e) {
e = e || "fx";
var n = oe.queue(t, e), i = n.length, r = n.shift(), o = oe._queueHooks(t, e), s = function() {
oe.dequeue(t, e);
};
"inprogress" === r && (r = n.shift(), i--), r && ("fx" === e && n.unshift("inprogress"), 
delete o.stop, r.call(t, s, o)), !i && o && o.empty.fire();
},
_queueHooks:function(t, e) {
var n = e + "queueHooks";
return Ce.get(t, n) || Ce.access(t, n, {
empty:oe.Callbacks("once memory").add(function() {
Ce.remove(t, [ e + "queue", n ]);
})
});
}
}), oe.fn.extend({
queue:function(t, e) {
var n = 2;
return "string" != typeof t && (e = t, t = "fx", n--), arguments.length < n ? oe.queue(this[0], t) :void 0 === e ? this :this.each(function() {
var n = oe.queue(this, t, e);
oe._queueHooks(this, t), "fx" === t && "inprogress" !== n[0] && oe.dequeue(this, t);
});
},
dequeue:function(t) {
return this.each(function() {
oe.dequeue(this, t);
});
},
clearQueue:function(t) {
return this.queue(t || "fx", []);
},
promise:function(t, e) {
var n, i = 1, r = oe.Deferred(), o = this, s = this.length, a = function() {
--i || r.resolveWith(o, [ o ]);
};
for ("string" != typeof t && (e = t, t = void 0), t = t || "fx"; s--; ) n = Ce.get(o[s], t + "queueHooks"), 
n && n.empty && (i++, n.empty.add(a));
return a(), r.promise(e);
}
});
var Me = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Oe = new RegExp("^(?:([+-])=|)(" + Me + ")([a-z%]*)$", "i"), Ie = [ "Top", "Right", "Bottom", "Left" ], je = function(t, e) {
return t = e || t, "none" === oe.css(t, "display") || !oe.contains(t.ownerDocument, t);
}, Ae = /^(?:checkbox|radio)$/i, Le = /<([\w:-]+)/, ze = /^$|\/(?:java|ecma)script/i, Pe = {
option:[ 1, "<select multiple='multiple'>", "</select>" ],
thead:[ 1, "<table>", "</table>" ],
col:[ 2, "<table><colgroup>", "</colgroup></table>" ],
tr:[ 2, "<table><tbody>", "</tbody></table>" ],
td:[ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
_default:[ 0, "", "" ]
};
Pe.optgroup = Pe.option, Pe.tbody = Pe.tfoot = Pe.colgroup = Pe.caption = Pe.thead, 
Pe.th = Pe.td;
var He = /<|&#?\w+;/;
!function() {
var t = X.createDocumentFragment(), e = t.appendChild(X.createElement("div")), n = X.createElement("input");
n.setAttribute("type", "radio"), n.setAttribute("checked", "checked"), n.setAttribute("name", "t"), 
e.appendChild(n), ie.checkClone = e.cloneNode(!0).cloneNode(!0).lastChild.checked, 
e.innerHTML = "<textarea>x</textarea>", ie.noCloneChecked = !!e.cloneNode(!0).lastChild.defaultValue;
}();
var Ne = /^key/, Re = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, $e = /^([^.]*)(?:\.(.+)|)/;
oe.event = {
global:{},
add:function(t, e, n, i, r) {
var o, s, a, u, l, c, h, d, f, p, m, g = Ce.get(t);
if (g) for (n.handler && (o = n, n = o.handler, r = o.selector), n.guid || (n.guid = oe.guid++), 
(u = g.events) || (u = g.events = {}), (s = g.handle) || (s = g.handle = function(e) {
return "undefined" != typeof oe && oe.event.triggered !== e.type ? oe.event.dispatch.apply(t, arguments) :void 0;
}), e = (e || "").match(we) || [ "" ], l = e.length; l--; ) a = $e.exec(e[l]) || [], 
f = m = a[1], p = (a[2] || "").split(".").sort(), f && (h = oe.event.special[f] || {}, 
f = (r ? h.delegateType :h.bindType) || f, h = oe.event.special[f] || {}, c = oe.extend({
type:f,
origType:m,
data:i,
handler:n,
guid:n.guid,
selector:r,
needsContext:r && oe.expr.match.needsContext.test(r),
namespace:p.join(".")
}, o), (d = u[f]) || (d = u[f] = [], d.delegateCount = 0, h.setup && h.setup.call(t, i, p, s) !== !1 || t.addEventListener && t.addEventListener(f, s)), 
h.add && (h.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), r ? d.splice(d.delegateCount++, 0, c) :d.push(c), 
oe.event.global[f] = !0);
},
remove:function(t, e, n, i, r) {
var o, s, a, u, l, c, h, d, f, p, m, g = Ce.hasData(t) && Ce.get(t);
if (g && (u = g.events)) {
for (e = (e || "").match(we) || [ "" ], l = e.length; l--; ) if (a = $e.exec(e[l]) || [], 
f = m = a[1], p = (a[2] || "").split(".").sort(), f) {
for (h = oe.event.special[f] || {}, f = (i ? h.delegateType :h.bindType) || f, d = u[f] || [], 
a = a[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = d.length; o--; ) c = d[o], 
!r && m !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || i && i !== c.selector && ("**" !== i || !c.selector) || (d.splice(o, 1), 
c.selector && d.delegateCount--, h.remove && h.remove.call(t, c));
s && !d.length && (h.teardown && h.teardown.call(t, p, g.handle) !== !1 || oe.removeEvent(t, f, g.handle), 
delete u[f]);
} else for (f in u) oe.event.remove(t, f + e[l], n, i, !0);
oe.isEmptyObject(u) && Ce.remove(t, "handle events");
}
},
dispatch:function(t) {
t = oe.event.fix(t);
var e, n, i, r, o, s = [], a = J.call(arguments), u = (Ce.get(this, "events") || {})[t.type] || [], l = oe.event.special[t.type] || {};
if (a[0] = t, t.delegateTarget = this, !l.preDispatch || l.preDispatch.call(this, t) !== !1) {
for (s = oe.event.handlers.call(this, t, u), e = 0; (r = s[e++]) && !t.isPropagationStopped(); ) for (t.currentTarget = r.elem, 
n = 0; (o = r.handlers[n++]) && !t.isImmediatePropagationStopped(); ) (!t.rnamespace || t.rnamespace.test(o.namespace)) && (t.handleObj = o, 
t.data = o.data, i = ((oe.event.special[o.origType] || {}).handle || o.handler).apply(r.elem, a), 
void 0 !== i && (t.result = i) === !1 && (t.preventDefault(), t.stopPropagation()));
return l.postDispatch && l.postDispatch.call(this, t), t.result;
}
},
handlers:function(t, e) {
var n, i, r, o, s = [], a = e.delegateCount, u = t.target;
if (a && u.nodeType && ("click" !== t.type || isNaN(t.button) || t.button < 1)) for (;u !== this; u = u.parentNode || this) if (1 === u.nodeType && (u.disabled !== !0 || "click" !== t.type)) {
for (i = [], n = 0; a > n; n++) o = e[n], r = o.selector + " ", void 0 === i[r] && (i[r] = o.needsContext ? oe(r, this).index(u) > -1 :oe.find(r, this, null, [ u ]).length), 
i[r] && i.push(o);
i.length && s.push({
elem:u,
handlers:i
});
}
return a < e.length && s.push({
elem:this,
handlers:e.slice(a)
}), s;
},
props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
fixHooks:{},
keyHooks:{
props:"char charCode key keyCode".split(" "),
filter:function(t, e) {
return null == t.which && (t.which = null != e.charCode ? e.charCode :e.keyCode), 
t;
}
},
mouseHooks:{
props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
filter:function(t, e) {
var n, i, r, o = e.button;
return null == t.pageX && null != e.clientX && (n = t.target.ownerDocument || X, 
i = n.documentElement, r = n.body, t.pageX = e.clientX + (i && i.scrollLeft || r && r.scrollLeft || 0) - (i && i.clientLeft || r && r.clientLeft || 0), 
t.pageY = e.clientY + (i && i.scrollTop || r && r.scrollTop || 0) - (i && i.clientTop || r && r.clientTop || 0)), 
t.which || void 0 === o || (t.which = 1 & o ? 1 :2 & o ? 3 :4 & o ? 2 :0), t;
}
},
fix:function(t) {
if (t[oe.expando]) return t;
var e, n, i, r = t.type, o = t, s = this.fixHooks[r];
for (s || (this.fixHooks[r] = s = Re.test(r) ? this.mouseHooks :Ne.test(r) ? this.keyHooks :{}), 
i = s.props ? this.props.concat(s.props) :this.props, t = new oe.Event(o), e = i.length; e--; ) n = i[e], 
t[n] = o[n];
return t.target || (t.target = X), 3 === t.target.nodeType && (t.target = t.target.parentNode), 
s.filter ? s.filter(t, o) :t;
},
special:{
load:{
noBubble:!0
},
focus:{
trigger:function() {
return this !== m() && this.focus ? (this.focus(), !1) :void 0;
},
delegateType:"focusin"
},
blur:{
trigger:function() {
return this === m() && this.blur ? (this.blur(), !1) :void 0;
},
delegateType:"focusout"
},
click:{
trigger:function() {
return "checkbox" === this.type && this.click && oe.nodeName(this, "input") ? (this.click(), 
!1) :void 0;
},
_default:function(t) {
return oe.nodeName(t.target, "a");
}
},
beforeunload:{
postDispatch:function(t) {
void 0 !== t.result && t.originalEvent && (t.originalEvent.returnValue = t.result);
}
}
}
}, oe.removeEvent = function(t, e, n) {
t.removeEventListener && t.removeEventListener(e, n);
}, oe.Event = function(t, e) {
return this instanceof oe.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, 
this.isDefaultPrevented = t.defaultPrevented || void 0 === t.defaultPrevented && t.returnValue === !1 ? f :p) :this.type = t, 
e && oe.extend(this, e), this.timeStamp = t && t.timeStamp || oe.now(), void (this[oe.expando] = !0)) :new oe.Event(t, e);
}, oe.Event.prototype = {
constructor:oe.Event,
isDefaultPrevented:p,
isPropagationStopped:p,
isImmediatePropagationStopped:p,
isSimulated:!1,
preventDefault:function() {
var t = this.originalEvent;
this.isDefaultPrevented = f, t && !this.isSimulated && t.preventDefault();
},
stopPropagation:function() {
var t = this.originalEvent;
this.isPropagationStopped = f, t && !this.isSimulated && t.stopPropagation();
},
stopImmediatePropagation:function() {
var t = this.originalEvent;
this.isImmediatePropagationStopped = f, t && !this.isSimulated && t.stopImmediatePropagation(), 
this.stopPropagation();
}
}, oe.each({
mouseenter:"mouseover",
mouseleave:"mouseout",
pointerenter:"pointerover",
pointerleave:"pointerout"
}, function(t, e) {
oe.event.special[t] = {
delegateType:e,
bindType:e,
handle:function(t) {
var n, i = this, r = t.relatedTarget, o = t.handleObj;
return (!r || r !== i && !oe.contains(i, r)) && (t.type = o.origType, n = o.handler.apply(this, arguments), 
t.type = e), n;
}
};
}), oe.fn.extend({
on:function(t, e, n, i) {
return g(this, t, e, n, i);
},
one:function(t, e, n, i) {
return g(this, t, e, n, i, 1);
},
off:function(t, e, n) {
var i, r;
if (t && t.preventDefault && t.handleObj) return i = t.handleObj, oe(t.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace :i.origType, i.selector, i.handler), 
this;
if ("object" == typeof t) {
for (r in t) this.off(r, e, t[r]);
return this;
}
return (e === !1 || "function" == typeof e) && (n = e, e = void 0), n === !1 && (n = p), 
this.each(function() {
oe.event.remove(this, t, n, e);
});
}
});
var Fe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi, qe = /<script|<style|<link/i, Ue = /checked\s*(?:[^=]|=\s*.checked.)/i, Be = /^true\/(.*)/, Ye = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
oe.extend({
htmlPrefilter:function(t) {
return t.replace(Fe, "<$1></$2>");
},
clone:function(t, e, n) {
var i, r, o, s, a = t.cloneNode(!0), u = oe.contains(t.ownerDocument, t);
if (!(ie.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || oe.isXMLDoc(t))) for (s = c(a), 
o = c(t), i = 0, r = o.length; r > i; i++) w(o[i], s[i]);
if (e) if (n) for (o = o || c(t), s = s || c(a), i = 0, r = o.length; r > i; i++) b(o[i], s[i]); else b(t, a);
return s = c(a, "script"), s.length > 0 && h(s, !u && c(t, "script")), a;
},
cleanData:function(t) {
for (var e, n, i, r = oe.event.special, o = 0; void 0 !== (n = t[o]); o++) if (ke(n)) {
if (e = n[Ce.expando]) {
if (e.events) for (i in e.events) r[i] ? oe.event.remove(n, i) :oe.removeEvent(n, i, e.handle);
n[Ce.expando] = void 0;
}
n[Te.expando] && (n[Te.expando] = void 0);
}
}
}), oe.fn.extend({
domManip:x,
detach:function(t) {
return S(this, t, !0);
},
remove:function(t) {
return S(this, t);
},
text:function(t) {
return Se(this, function(t) {
return void 0 === t ? oe.text(this) :this.empty().each(function() {
(1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = t);
});
}, null, t, arguments.length);
},
append:function() {
return x(this, arguments, function(t) {
if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
var e = v(this, t);
e.appendChild(t);
}
});
},
prepend:function() {
return x(this, arguments, function(t) {
if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
var e = v(this, t);
e.insertBefore(t, e.firstChild);
}
});
},
before:function() {
return x(this, arguments, function(t) {
this.parentNode && this.parentNode.insertBefore(t, this);
});
},
after:function() {
return x(this, arguments, function(t) {
this.parentNode && this.parentNode.insertBefore(t, this.nextSibling);
});
},
empty:function() {
for (var t, e = 0; null != (t = this[e]); e++) 1 === t.nodeType && (oe.cleanData(c(t, !1)), 
t.textContent = "");
return this;
},
clone:function(t, e) {
return t = null == t ? !1 :t, e = null == e ? t :e, this.map(function() {
return oe.clone(this, t, e);
});
},
html:function(t) {
return Se(this, function(t) {
var e = this[0] || {}, n = 0, i = this.length;
if (void 0 === t && 1 === e.nodeType) return e.innerHTML;
if ("string" == typeof t && !qe.test(t) && !Pe[(Le.exec(t) || [ "", "" ])[1].toLowerCase()]) {
t = oe.htmlPrefilter(t);
try {
for (;i > n; n++) e = this[n] || {}, 1 === e.nodeType && (oe.cleanData(c(e, !1)), 
e.innerHTML = t);
e = 0;
} catch (r) {}
}
e && this.empty().append(t);
}, null, t, arguments.length);
},
replaceWith:function() {
var t = [];
return x(this, arguments, function(e) {
var n = this.parentNode;
oe.inArray(this, t) < 0 && (oe.cleanData(c(this)), n && n.replaceChild(e, this));
}, t);
}
}), oe.each({
appendTo:"append",
prependTo:"prepend",
insertBefore:"before",
insertAfter:"after",
replaceAll:"replaceWith"
}, function(t, e) {
oe.fn[t] = function(t) {
for (var n, i = [], r = oe(t), o = r.length - 1, s = 0; o >= s; s++) n = s === o ? this :this.clone(!0), 
oe(r[s])[e](n), K.apply(i, n.get());
return this.pushStack(i);
};
});
var We, Ve = {
HTML:"block",
BODY:"block"
}, Ge = /^margin/, Xe = new RegExp("^(" + Me + ")(?!px)[a-z%]+$", "i"), Je = function(e) {
var n = e.ownerDocument.defaultView;
return n && n.opener || (n = t), n.getComputedStyle(e);
}, Ze = function(t, e, n, i) {
var r, o, s = {};
for (o in e) s[o] = t.style[o], t.style[o] = e[o];
r = n.apply(t, i || []);
for (o in e) t.style[o] = s[o];
return r;
}, Ke = X.documentElement;
!function() {
function e() {
a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", 
a.innerHTML = "", Ke.appendChild(s);
var e = t.getComputedStyle(a);
n = "1%" !== e.top, o = "2px" === e.marginLeft, i = "4px" === e.width, a.style.marginRight = "50%", 
r = "4px" === e.marginRight, Ke.removeChild(s);
}
var n, i, r, o, s = X.createElement("div"), a = X.createElement("div");
a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", 
ie.clearCloneStyle = "content-box" === a.style.backgroundClip, s.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", 
s.appendChild(a), oe.extend(ie, {
pixelPosition:function() {
return e(), n;
},
boxSizingReliable:function() {
return null == i && e(), i;
},
pixelMarginRight:function() {
return null == i && e(), r;
},
reliableMarginLeft:function() {
return null == i && e(), o;
},
reliableMarginRight:function() {
var e, n = a.appendChild(X.createElement("div"));
return n.style.cssText = a.style.cssText = "-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", 
n.style.marginRight = n.style.width = "0", a.style.width = "1px", Ke.appendChild(s), 
e = !parseFloat(t.getComputedStyle(n).marginRight), Ke.removeChild(s), a.removeChild(n), 
e;
}
}));
}();
var Qe = /^(none|table(?!-c[ea]).+)/, tn = {
position:"absolute",
visibility:"hidden",
display:"block"
}, en = {
letterSpacing:"0",
fontWeight:"400"
}, nn = [ "Webkit", "O", "Moz", "ms" ], rn = X.createElement("div").style;
oe.extend({
cssHooks:{
opacity:{
get:function(t, e) {
if (e) {
var n = T(t, "opacity");
return "" === n ? "1" :n;
}
}
}
},
cssNumber:{
animationIterationCount:!0,
columnCount:!0,
fillOpacity:!0,
flexGrow:!0,
flexShrink:!0,
fontWeight:!0,
lineHeight:!0,
opacity:!0,
order:!0,
orphans:!0,
widows:!0,
zIndex:!0,
zoom:!0
},
cssProps:{
"float":"cssFloat"
},
style:function(t, e, n, i) {
if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
var r, o, s, a = oe.camelCase(e), u = t.style;
return e = oe.cssProps[a] || (oe.cssProps[a] = D(a) || a), s = oe.cssHooks[e] || oe.cssHooks[a], 
void 0 === n ? s && "get" in s && void 0 !== (r = s.get(t, !1, i)) ? r :u[e] :(o = typeof n, 
"string" === o && (r = Oe.exec(n)) && r[1] && (n = l(t, e, r), o = "number"), null != n && n === n && ("number" === o && (n += r && r[3] || (oe.cssNumber[a] ? "" :"px")), 
ie.clearCloneStyle || "" !== n || 0 !== e.indexOf("background") || (u[e] = "inherit"), 
s && "set" in s && void 0 === (n = s.set(t, n, i)) || (u[e] = n)), void 0);
}
},
css:function(t, e, n, i) {
var r, o, s, a = oe.camelCase(e);
return e = oe.cssProps[a] || (oe.cssProps[a] = D(a) || a), s = oe.cssHooks[e] || oe.cssHooks[a], 
s && "get" in s && (r = s.get(t, !0, n)), void 0 === r && (r = T(t, e, i)), "normal" === r && e in en && (r = en[e]), 
"" === n || n ? (o = parseFloat(r), n === !0 || isFinite(o) ? o || 0 :r) :r;
}
}), oe.each([ "height", "width" ], function(t, e) {
oe.cssHooks[e] = {
get:function(t, n, i) {
return n ? Qe.test(oe.css(t, "display")) && 0 === t.offsetWidth ? Ze(t, tn, function() {
return I(t, e, i);
}) :I(t, e, i) :void 0;
},
set:function(t, n, i) {
var r, o = i && Je(t), s = i && O(t, e, i, "border-box" === oe.css(t, "boxSizing", !1, o), o);
return s && (r = Oe.exec(n)) && "px" !== (r[3] || "px") && (t.style[e] = n, n = oe.css(t, e)), 
M(t, n, s);
}
};
}), oe.cssHooks.marginLeft = E(ie.reliableMarginLeft, function(t, e) {
return e ? (parseFloat(T(t, "marginLeft")) || t.getBoundingClientRect().left - Ze(t, {
marginLeft:0
}, function() {
return t.getBoundingClientRect().left;
})) + "px" :void 0;
}), oe.cssHooks.marginRight = E(ie.reliableMarginRight, function(t, e) {
return e ? Ze(t, {
display:"inline-block"
}, T, [ t, "marginRight" ]) :void 0;
}), oe.each({
margin:"",
padding:"",
border:"Width"
}, function(t, e) {
oe.cssHooks[t + e] = {
expand:function(n) {
for (var i = 0, r = {}, o = "string" == typeof n ? n.split(" ") :[ n ]; 4 > i; i++) r[t + Ie[i] + e] = o[i] || o[i - 2] || o[0];
return r;
}
}, Ge.test(t) || (oe.cssHooks[t + e].set = M);
}), oe.fn.extend({
css:function(t, e) {
return Se(this, function(t, e, n) {
var i, r, o = {}, s = 0;
if (oe.isArray(e)) {
for (i = Je(t), r = e.length; r > s; s++) o[e[s]] = oe.css(t, e[s], !1, i);
return o;
}
return void 0 !== n ? oe.style(t, e, n) :oe.css(t, e);
}, t, e, arguments.length > 1);
},
show:function() {
return j(this, !0);
},
hide:function() {
return j(this);
},
toggle:function(t) {
return "boolean" == typeof t ? t ? this.show() :this.hide() :this.each(function() {
je(this) ? oe(this).show() :oe(this).hide();
});
}
}), oe.Tween = A, A.prototype = {
constructor:A,
init:function(t, e, n, i, r, o) {
this.elem = t, this.prop = n, this.easing = r || oe.easing._default, this.options = e, 
this.start = this.now = this.cur(), this.end = i, this.unit = o || (oe.cssNumber[n] ? "" :"px");
},
cur:function() {
var t = A.propHooks[this.prop];
return t && t.get ? t.get(this) :A.propHooks._default.get(this);
},
run:function(t) {
var e, n = A.propHooks[this.prop];
return this.pos = e = this.options.duration ? oe.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) :t, 
this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), 
n && n.set ? n.set(this) :A.propHooks._default.set(this), this;
}
}, A.prototype.init.prototype = A.prototype, A.propHooks = {
_default:{
get:function(t) {
var e;
return 1 !== t.elem.nodeType || null != t.elem[t.prop] && null == t.elem.style[t.prop] ? t.elem[t.prop] :(e = oe.css(t.elem, t.prop, ""), 
e && "auto" !== e ? e :0);
},
set:function(t) {
oe.fx.step[t.prop] ? oe.fx.step[t.prop](t) :1 !== t.elem.nodeType || null == t.elem.style[oe.cssProps[t.prop]] && !oe.cssHooks[t.prop] ? t.elem[t.prop] = t.now :oe.style(t.elem, t.prop, t.now + t.unit);
}
}
}, A.propHooks.scrollTop = A.propHooks.scrollLeft = {
set:function(t) {
t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now);
}
}, oe.easing = {
linear:function(t) {
return t;
},
swing:function(t) {
return .5 - Math.cos(t * Math.PI) / 2;
},
_default:"swing"
}, oe.fx = A.prototype.init, oe.fx.step = {};
var on, sn, an = /^(?:toggle|show|hide)$/, un = /queueHooks$/;
oe.Animation = oe.extend(R, {
tweeners:{
"*":[ function(t, e) {
var n = this.createTween(t, e);
return l(n.elem, t, Oe.exec(e), n), n;
} ]
},
tweener:function(t, e) {
oe.isFunction(t) ? (e = t, t = [ "*" ]) :t = t.match(we);
for (var n, i = 0, r = t.length; r > i; i++) n = t[i], R.tweeners[n] = R.tweeners[n] || [], 
R.tweeners[n].unshift(e);
},
prefilters:[ H ],
prefilter:function(t, e) {
e ? R.prefilters.unshift(t) :R.prefilters.push(t);
}
}), oe.speed = function(t, e, n) {
var i = t && "object" == typeof t ? oe.extend({}, t) :{
complete:n || !n && e || oe.isFunction(t) && t,
duration:t,
easing:n && e || e && !oe.isFunction(e) && e
};
return i.duration = oe.fx.off ? 0 :"number" == typeof i.duration ? i.duration :i.duration in oe.fx.speeds ? oe.fx.speeds[i.duration] :oe.fx.speeds._default, 
(null == i.queue || i.queue === !0) && (i.queue = "fx"), i.old = i.complete, i.complete = function() {
oe.isFunction(i.old) && i.old.call(this), i.queue && oe.dequeue(this, i.queue);
}, i;
}, oe.fn.extend({
fadeTo:function(t, e, n, i) {
return this.filter(je).css("opacity", 0).show().end().animate({
opacity:e
}, t, n, i);
},
animate:function(t, e, n, i) {
var r = oe.isEmptyObject(t), o = oe.speed(e, n, i), s = function() {
var e = R(this, oe.extend({}, t), o);
(r || Ce.get(this, "finish")) && e.stop(!0);
};
return s.finish = s, r || o.queue === !1 ? this.each(s) :this.queue(o.queue, s);
},
stop:function(t, e, n) {
var i = function(t) {
var e = t.stop;
delete t.stop, e(n);
};
return "string" != typeof t && (n = e, e = t, t = void 0), e && t !== !1 && this.queue(t || "fx", []), 
this.each(function() {
var e = !0, r = null != t && t + "queueHooks", o = oe.timers, s = Ce.get(this);
if (r) s[r] && s[r].stop && i(s[r]); else for (r in s) s[r] && s[r].stop && un.test(r) && i(s[r]);
for (r = o.length; r--; ) o[r].elem !== this || null != t && o[r].queue !== t || (o[r].anim.stop(n), 
e = !1, o.splice(r, 1));
(e || !n) && oe.dequeue(this, t);
});
},
finish:function(t) {
return t !== !1 && (t = t || "fx"), this.each(function() {
var e, n = Ce.get(this), i = n[t + "queue"], r = n[t + "queueHooks"], o = oe.timers, s = i ? i.length :0;
for (n.finish = !0, oe.queue(this, t, []), r && r.stop && r.stop.call(this, !0), 
e = o.length; e--; ) o[e].elem === this && o[e].queue === t && (o[e].anim.stop(!0), 
o.splice(e, 1));
for (e = 0; s > e; e++) i[e] && i[e].finish && i[e].finish.call(this);
delete n.finish;
});
}
}), oe.each([ "toggle", "show", "hide" ], function(t, e) {
var n = oe.fn[e];
oe.fn[e] = function(t, i, r) {
return null == t || "boolean" == typeof t ? n.apply(this, arguments) :this.animate(z(e, !0), t, i, r);
};
}), oe.each({
slideDown:z("show"),
slideUp:z("hide"),
slideToggle:z("toggle"),
fadeIn:{
opacity:"show"
},
fadeOut:{
opacity:"hide"
},
fadeToggle:{
opacity:"toggle"
}
}, function(t, e) {
oe.fn[t] = function(t, n, i) {
return this.animate(e, t, n, i);
};
}), oe.timers = [], oe.fx.tick = function() {
var t, e = 0, n = oe.timers;
for (on = oe.now(); e < n.length; e++) t = n[e], t() || n[e] !== t || n.splice(e--, 1);
n.length || oe.fx.stop(), on = void 0;
}, oe.fx.timer = function(t) {
oe.timers.push(t), t() ? oe.fx.start() :oe.timers.pop();
}, oe.fx.interval = 13, oe.fx.start = function() {
sn || (sn = t.setInterval(oe.fx.tick, oe.fx.interval));
}, oe.fx.stop = function() {
t.clearInterval(sn), sn = null;
}, oe.fx.speeds = {
slow:600,
fast:200,
_default:400
}, oe.fn.delay = function(e, n) {
return e = oe.fx ? oe.fx.speeds[e] || e :e, n = n || "fx", this.queue(n, function(n, i) {
var r = t.setTimeout(n, e);
i.stop = function() {
t.clearTimeout(r);
};
});
}, function() {
var t = X.createElement("input"), e = X.createElement("select"), n = e.appendChild(X.createElement("option"));
t.type = "checkbox", ie.checkOn = "" !== t.value, ie.optSelected = n.selected, e.disabled = !0, 
ie.optDisabled = !n.disabled, t = X.createElement("input"), t.value = "t", t.type = "radio", 
ie.radioValue = "t" === t.value;
}();
var ln, cn = oe.expr.attrHandle;
oe.fn.extend({
attr:function(t, e) {
return Se(this, oe.attr, t, e, arguments.length > 1);
},
removeAttr:function(t) {
return this.each(function() {
oe.removeAttr(this, t);
});
}
}), oe.extend({
attr:function(t, e, n) {
var i, r, o = t.nodeType;
if (3 !== o && 8 !== o && 2 !== o) return "undefined" == typeof t.getAttribute ? oe.prop(t, e, n) :(1 === o && oe.isXMLDoc(t) || (e = e.toLowerCase(), 
r = oe.attrHooks[e] || (oe.expr.match.bool.test(e) ? ln :void 0)), void 0 !== n ? null === n ? void oe.removeAttr(t, e) :r && "set" in r && void 0 !== (i = r.set(t, n, e)) ? i :(t.setAttribute(e, n + ""), 
n) :r && "get" in r && null !== (i = r.get(t, e)) ? i :(i = oe.find.attr(t, e), 
null == i ? void 0 :i));
},
attrHooks:{
type:{
set:function(t, e) {
if (!ie.radioValue && "radio" === e && oe.nodeName(t, "input")) {
var n = t.value;
return t.setAttribute("type", e), n && (t.value = n), e;
}
}
}
},
removeAttr:function(t, e) {
var n, i, r = 0, o = e && e.match(we);
if (o && 1 === t.nodeType) for (;n = o[r++]; ) i = oe.propFix[n] || n, oe.expr.match.bool.test(n) && (t[i] = !1), 
t.removeAttribute(n);
}
}), ln = {
set:function(t, e, n) {
return e === !1 ? oe.removeAttr(t, n) :t.setAttribute(n, n), n;
}
}, oe.each(oe.expr.match.bool.source.match(/\w+/g), function(t, e) {
var n = cn[e] || oe.find.attr;
cn[e] = function(t, e, i) {
var r, o;
return i || (o = cn[e], cn[e] = r, r = null != n(t, e, i) ? e.toLowerCase() :null, 
cn[e] = o), r;
};
});
var hn = /^(?:input|select|textarea|button)$/i, dn = /^(?:a|area)$/i;
oe.fn.extend({
prop:function(t, e) {
return Se(this, oe.prop, t, e, arguments.length > 1);
},
removeProp:function(t) {
return this.each(function() {
delete this[oe.propFix[t] || t];
});
}
}), oe.extend({
prop:function(t, e, n) {
var i, r, o = t.nodeType;
if (3 !== o && 8 !== o && 2 !== o) return 1 === o && oe.isXMLDoc(t) || (e = oe.propFix[e] || e, 
r = oe.propHooks[e]), void 0 !== n ? r && "set" in r && void 0 !== (i = r.set(t, n, e)) ? i :t[e] = n :r && "get" in r && null !== (i = r.get(t, e)) ? i :t[e];
},
propHooks:{
tabIndex:{
get:function(t) {
var e = oe.find.attr(t, "tabindex");
return e ? parseInt(e, 10) :hn.test(t.nodeName) || dn.test(t.nodeName) && t.href ? 0 :-1;
}
}
},
propFix:{
"for":"htmlFor",
"class":"className"
}
}), ie.optSelected || (oe.propHooks.selected = {
get:function(t) {
var e = t.parentNode;
return e && e.parentNode && e.parentNode.selectedIndex, null;
},
set:function(t) {
var e = t.parentNode;
e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex);
}
}), oe.each([ "tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable" ], function() {
oe.propFix[this.toLowerCase()] = this;
});
var fn = /[\t\r\n\f]/g;
oe.fn.extend({
addClass:function(t) {
var e, n, i, r, o, s, a, u = 0;
if (oe.isFunction(t)) return this.each(function(e) {
oe(this).addClass(t.call(this, e, $(this)));
});
if ("string" == typeof t && t) for (e = t.match(we) || []; n = this[u++]; ) if (r = $(n), 
i = 1 === n.nodeType && (" " + r + " ").replace(fn, " ")) {
for (s = 0; o = e[s++]; ) i.indexOf(" " + o + " ") < 0 && (i += o + " ");
a = oe.trim(i), r !== a && n.setAttribute("class", a);
}
return this;
},
removeClass:function(t) {
var e, n, i, r, o, s, a, u = 0;
if (oe.isFunction(t)) return this.each(function(e) {
oe(this).removeClass(t.call(this, e, $(this)));
});
if (!arguments.length) return this.attr("class", "");
if ("string" == typeof t && t) for (e = t.match(we) || []; n = this[u++]; ) if (r = $(n), 
i = 1 === n.nodeType && (" " + r + " ").replace(fn, " ")) {
for (s = 0; o = e[s++]; ) for (;i.indexOf(" " + o + " ") > -1; ) i = i.replace(" " + o + " ", " ");
a = oe.trim(i), r !== a && n.setAttribute("class", a);
}
return this;
},
toggleClass:function(t, e) {
var n = typeof t;
return "boolean" == typeof e && "string" === n ? e ? this.addClass(t) :this.removeClass(t) :this.each(oe.isFunction(t) ? function(n) {
oe(this).toggleClass(t.call(this, n, $(this), e), e);
} :function() {
var e, i, r, o;
if ("string" === n) for (i = 0, r = oe(this), o = t.match(we) || []; e = o[i++]; ) r.hasClass(e) ? r.removeClass(e) :r.addClass(e); else (void 0 === t || "boolean" === n) && (e = $(this), 
e && Ce.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || t === !1 ? "" :Ce.get(this, "__className__") || ""));
});
},
hasClass:function(t) {
var e, n, i = 0;
for (e = " " + t + " "; n = this[i++]; ) if (1 === n.nodeType && (" " + $(n) + " ").replace(fn, " ").indexOf(e) > -1) return !0;
return !1;
}
});
var pn = /\r/g, mn = /[\x20\t\r\n\f]+/g;
oe.fn.extend({
val:function(t) {
var e, n, i, r = this[0];
{
if (arguments.length) return i = oe.isFunction(t), this.each(function(n) {
var r;
1 === this.nodeType && (r = i ? t.call(this, n, oe(this).val()) :t, null == r ? r = "" :"number" == typeof r ? r += "" :oe.isArray(r) && (r = oe.map(r, function(t) {
return null == t ? "" :t + "";
})), e = oe.valHooks[this.type] || oe.valHooks[this.nodeName.toLowerCase()], e && "set" in e && void 0 !== e.set(this, r, "value") || (this.value = r));
});
if (r) return e = oe.valHooks[r.type] || oe.valHooks[r.nodeName.toLowerCase()], 
e && "get" in e && void 0 !== (n = e.get(r, "value")) ? n :(n = r.value, "string" == typeof n ? n.replace(pn, "") :null == n ? "" :n);
}
}
}), oe.extend({
valHooks:{
option:{
get:function(t) {
var e = oe.find.attr(t, "value");
return null != e ? e :oe.trim(oe.text(t)).replace(mn, " ");
}
},
select:{
get:function(t) {
for (var e, n, i = t.options, r = t.selectedIndex, o = "select-one" === t.type || 0 > r, s = o ? null :[], a = o ? r + 1 :i.length, u = 0 > r ? a :o ? r :0; a > u; u++) if (n = i[u], 
!(!n.selected && u !== r || (ie.optDisabled ? n.disabled :null !== n.getAttribute("disabled")) || n.parentNode.disabled && oe.nodeName(n.parentNode, "optgroup"))) {
if (e = oe(n).val(), o) return e;
s.push(e);
}
return s;
},
set:function(t, e) {
for (var n, i, r = t.options, o = oe.makeArray(e), s = r.length; s--; ) i = r[s], 
(i.selected = oe.inArray(oe.valHooks.option.get(i), o) > -1) && (n = !0);
return n || (t.selectedIndex = -1), o;
}
}
}
}), oe.each([ "radio", "checkbox" ], function() {
oe.valHooks[this] = {
set:function(t, e) {
return oe.isArray(e) ? t.checked = oe.inArray(oe(t).val(), e) > -1 :void 0;
}
}, ie.checkOn || (oe.valHooks[this].get = function(t) {
return null === t.getAttribute("value") ? "on" :t.value;
});
});
var gn = /^(?:focusinfocus|focusoutblur)$/;
oe.extend(oe.event, {
trigger:function(e, n, i, r) {
var o, s, a, u, l, c, h, d = [ i || X ], f = ne.call(e, "type") ? e.type :e, p = ne.call(e, "namespace") ? e.namespace.split(".") :[];
if (s = a = i = i || X, 3 !== i.nodeType && 8 !== i.nodeType && !gn.test(f + oe.event.triggered) && (f.indexOf(".") > -1 && (p = f.split("."), 
f = p.shift(), p.sort()), l = f.indexOf(":") < 0 && "on" + f, e = e[oe.expando] ? e :new oe.Event(f, "object" == typeof e && e), 
e.isTrigger = r ? 2 :3, e.namespace = p.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") :null, 
e.result = void 0, e.target || (e.target = i), n = null == n ? [ e ] :oe.makeArray(n, [ e ]), 
h = oe.event.special[f] || {}, r || !h.trigger || h.trigger.apply(i, n) !== !1)) {
if (!r && !h.noBubble && !oe.isWindow(i)) {
for (u = h.delegateType || f, gn.test(u + f) || (s = s.parentNode); s; s = s.parentNode) d.push(s), 
a = s;
a === (i.ownerDocument || X) && d.push(a.defaultView || a.parentWindow || t);
}
for (o = 0; (s = d[o++]) && !e.isPropagationStopped(); ) e.type = o > 1 ? u :h.bindType || f, 
c = (Ce.get(s, "events") || {})[e.type] && Ce.get(s, "handle"), c && c.apply(s, n), 
c = l && s[l], c && c.apply && ke(s) && (e.result = c.apply(s, n), e.result === !1 && e.preventDefault());
return e.type = f, r || e.isDefaultPrevented() || h._default && h._default.apply(d.pop(), n) !== !1 || !ke(i) || l && oe.isFunction(i[f]) && !oe.isWindow(i) && (a = i[l], 
a && (i[l] = null), oe.event.triggered = f, i[f](), oe.event.triggered = void 0, 
a && (i[l] = a)), e.result;
}
},
simulate:function(t, e, n) {
var i = oe.extend(new oe.Event(), n, {
type:t,
isSimulated:!0
});
oe.event.trigger(i, null, e);
}
}), oe.fn.extend({
trigger:function(t, e) {
return this.each(function() {
oe.event.trigger(t, e, this);
});
},
triggerHandler:function(t, e) {
var n = this[0];
return n ? oe.event.trigger(t, e, n, !0) :void 0;
}
}), oe.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
oe.fn[e] = function(t, n) {
return arguments.length > 0 ? this.on(e, null, t, n) :this.trigger(e);
};
}), oe.fn.extend({
hover:function(t, e) {
return this.mouseenter(t).mouseleave(e || t);
}
}), ie.focusin = "onfocusin" in t, ie.focusin || oe.each({
focus:"focusin",
blur:"focusout"
}, function(t, e) {
var n = function(t) {
oe.event.simulate(e, t.target, oe.event.fix(t));
};
oe.event.special[e] = {
setup:function() {
var i = this.ownerDocument || this, r = Ce.access(i, e);
r || i.addEventListener(t, n, !0), Ce.access(i, e, (r || 0) + 1);
},
teardown:function() {
var i = this.ownerDocument || this, r = Ce.access(i, e) - 1;
r ? Ce.access(i, e, r) :(i.removeEventListener(t, n, !0), Ce.remove(i, e));
}
};
});
var vn = t.location, yn = oe.now(), _n = /\?/;
oe.parseJSON = function(t) {
return JSON.parse(t + "");
}, oe.parseXML = function(e) {
var n;
if (!e || "string" != typeof e) return null;
try {
n = new t.DOMParser().parseFromString(e, "text/xml");
} catch (i) {
n = void 0;
}
return (!n || n.getElementsByTagName("parsererror").length) && oe.error("Invalid XML: " + e), 
n;
};
var bn = /#.*$/, wn = /([?&])_=[^&]*/, xn = /^(.*?):[ \t]*([^\r\n]*)$/gm, Sn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, kn = /^(?:GET|HEAD)$/, Cn = /^\/\//, Tn = {}, En = {}, Dn = "*/".concat("*"), Mn = X.createElement("a");
Mn.href = vn.href, oe.extend({
active:0,
lastModified:{},
etag:{},
ajaxSettings:{
url:vn.href,
type:"GET",
isLocal:Sn.test(vn.protocol),
global:!0,
processData:!0,
async:!0,
contentType:"application/x-www-form-urlencoded; charset=UTF-8",
accepts:{
"*":Dn,
text:"text/plain",
html:"text/html",
xml:"application/xml, text/xml",
json:"application/json, text/javascript"
},
contents:{
xml:/\bxml\b/,
html:/\bhtml/,
json:/\bjson\b/
},
responseFields:{
xml:"responseXML",
text:"responseText",
json:"responseJSON"
},
converters:{
"* text":String,
"text html":!0,
"text json":oe.parseJSON,
"text xml":oe.parseXML
},
flatOptions:{
url:!0,
context:!0
}
},
ajaxSetup:function(t, e) {
return e ? U(U(t, oe.ajaxSettings), e) :U(oe.ajaxSettings, t);
},
ajaxPrefilter:F(Tn),
ajaxTransport:F(En),
ajax:function(e, n) {
function i(e, n, i, a) {
var l, h, y, _, w, S = n;
2 !== b && (b = 2, u && t.clearTimeout(u), r = void 0, s = a || "", x.readyState = e > 0 ? 4 :0, 
l = e >= 200 && 300 > e || 304 === e, i && (_ = B(d, x, i)), _ = Y(d, _, x, l), 
l ? (d.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (oe.lastModified[o] = w), 
w = x.getResponseHeader("etag"), w && (oe.etag[o] = w)), 204 === e || "HEAD" === d.type ? S = "nocontent" :304 === e ? S = "notmodified" :(S = _.state, 
h = _.data, y = _.error, l = !y)) :(y = S, (e || !S) && (S = "error", 0 > e && (e = 0))), 
x.status = e, x.statusText = (n || S) + "", l ? m.resolveWith(f, [ h, S, x ]) :m.rejectWith(f, [ x, S, y ]), 
x.statusCode(v), v = void 0, c && p.trigger(l ? "ajaxSuccess" :"ajaxError", [ x, d, l ? h :y ]), 
g.fireWith(f, [ x, S ]), c && (p.trigger("ajaxComplete", [ x, d ]), --oe.active || oe.event.trigger("ajaxStop")));
}
"object" == typeof e && (n = e, e = void 0), n = n || {};
var r, o, s, a, u, l, c, h, d = oe.ajaxSetup({}, n), f = d.context || d, p = d.context && (f.nodeType || f.jquery) ? oe(f) :oe.event, m = oe.Deferred(), g = oe.Callbacks("once memory"), v = d.statusCode || {}, y = {}, _ = {}, b = 0, w = "canceled", x = {
readyState:0,
getResponseHeader:function(t) {
var e;
if (2 === b) {
if (!a) for (a = {}; e = xn.exec(s); ) a[e[1].toLowerCase()] = e[2];
e = a[t.toLowerCase()];
}
return null == e ? null :e;
},
getAllResponseHeaders:function() {
return 2 === b ? s :null;
},
setRequestHeader:function(t, e) {
var n = t.toLowerCase();
return b || (t = _[n] = _[n] || t, y[t] = e), this;
},
overrideMimeType:function(t) {
return b || (d.mimeType = t), this;
},
statusCode:function(t) {
var e;
if (t) if (2 > b) for (e in t) v[e] = [ v[e], t[e] ]; else x.always(t[x.status]);
return this;
},
abort:function(t) {
var e = t || w;
return r && r.abort(e), i(0, e), this;
}
};
if (m.promise(x).complete = g.add, x.success = x.done, x.error = x.fail, d.url = ((e || d.url || vn.href) + "").replace(bn, "").replace(Cn, vn.protocol + "//"), 
d.type = n.method || n.type || d.method || d.type, d.dataTypes = oe.trim(d.dataType || "*").toLowerCase().match(we) || [ "" ], 
null == d.crossDomain) {
l = X.createElement("a");
try {
l.href = d.url, l.href = l.href, d.crossDomain = Mn.protocol + "//" + Mn.host != l.protocol + "//" + l.host;
} catch (S) {
d.crossDomain = !0;
}
}
if (d.data && d.processData && "string" != typeof d.data && (d.data = oe.param(d.data, d.traditional)), 
q(Tn, d, n, x), 2 === b) return x;
c = oe.event && d.global, c && 0 === oe.active++ && oe.event.trigger("ajaxStart"), 
d.type = d.type.toUpperCase(), d.hasContent = !kn.test(d.type), o = d.url, d.hasContent || (d.data && (o = d.url += (_n.test(o) ? "&" :"?") + d.data, 
delete d.data), d.cache === !1 && (d.url = wn.test(o) ? o.replace(wn, "$1_=" + yn++) :o + (_n.test(o) ? "&" :"?") + "_=" + yn++)), 
d.ifModified && (oe.lastModified[o] && x.setRequestHeader("If-Modified-Since", oe.lastModified[o]), 
oe.etag[o] && x.setRequestHeader("If-None-Match", oe.etag[o])), (d.data && d.hasContent && d.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", d.contentType), 
x.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + Dn + "; q=0.01" :"") :d.accepts["*"]);
for (h in d.headers) x.setRequestHeader(h, d.headers[h]);
if (d.beforeSend && (d.beforeSend.call(f, x, d) === !1 || 2 === b)) return x.abort();
w = "abort";
for (h in {
success:1,
error:1,
complete:1
}) x[h](d[h]);
if (r = q(En, d, n, x)) {
if (x.readyState = 1, c && p.trigger("ajaxSend", [ x, d ]), 2 === b) return x;
d.async && d.timeout > 0 && (u = t.setTimeout(function() {
x.abort("timeout");
}, d.timeout));
try {
b = 1, r.send(y, i);
} catch (S) {
if (!(2 > b)) throw S;
i(-1, S);
}
} else i(-1, "No Transport");
return x;
},
getJSON:function(t, e, n) {
return oe.get(t, e, n, "json");
},
getScript:function(t, e) {
return oe.get(t, void 0, e, "script");
}
}), oe.each([ "get", "post" ], function(t, e) {
oe[e] = function(t, n, i, r) {
return oe.isFunction(n) && (r = r || i, i = n, n = void 0), oe.ajax(oe.extend({
url:t,
type:e,
dataType:r,
data:n,
success:i
}, oe.isPlainObject(t) && t));
};
}), oe._evalUrl = function(t) {
return oe.ajax({
url:t,
type:"GET",
dataType:"script",
async:!1,
global:!1,
"throws":!0
});
}, oe.fn.extend({
wrapAll:function(t) {
var e;
return oe.isFunction(t) ? this.each(function(e) {
oe(this).wrapAll(t.call(this, e));
}) :(this[0] && (e = oe(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), 
e.map(function() {
for (var t = this; t.firstElementChild; ) t = t.firstElementChild;
return t;
}).append(this)), this);
},
wrapInner:function(t) {
return this.each(oe.isFunction(t) ? function(e) {
oe(this).wrapInner(t.call(this, e));
} :function() {
var e = oe(this), n = e.contents();
n.length ? n.wrapAll(t) :e.append(t);
});
},
wrap:function(t) {
var e = oe.isFunction(t);
return this.each(function(n) {
oe(this).wrapAll(e ? t.call(this, n) :t);
});
},
unwrap:function() {
return this.parent().each(function() {
oe.nodeName(this, "body") || oe(this).replaceWith(this.childNodes);
}).end();
}
}), oe.expr.filters.hidden = function(t) {
return !oe.expr.filters.visible(t);
}, oe.expr.filters.visible = function(t) {
return t.offsetWidth > 0 || t.offsetHeight > 0 || t.getClientRects().length > 0;
};
var On = /%20/g, In = /\[\]$/, jn = /\r?\n/g, An = /^(?:submit|button|image|reset|file)$/i, Ln = /^(?:input|select|textarea|keygen)/i;
oe.param = function(t, e) {
var n, i = [], r = function(t, e) {
e = oe.isFunction(e) ? e() :null == e ? "" :e, i[i.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e);
};
if (void 0 === e && (e = oe.ajaxSettings && oe.ajaxSettings.traditional), oe.isArray(t) || t.jquery && !oe.isPlainObject(t)) oe.each(t, function() {
r(this.name, this.value);
}); else for (n in t) W(n, t[n], e, r);
return i.join("&").replace(On, "+");
}, oe.fn.extend({
serialize:function() {
return oe.param(this.serializeArray());
},
serializeArray:function() {
return this.map(function() {
var t = oe.prop(this, "elements");
return t ? oe.makeArray(t) :this;
}).filter(function() {
var t = this.type;
return this.name && !oe(this).is(":disabled") && Ln.test(this.nodeName) && !An.test(t) && (this.checked || !Ae.test(t));
}).map(function(t, e) {
var n = oe(this).val();
return null == n ? null :oe.isArray(n) ? oe.map(n, function(t) {
return {
name:e.name,
value:t.replace(jn, "\r\n")
};
}) :{
name:e.name,
value:n.replace(jn, "\r\n")
};
}).get();
}
}), oe.ajaxSettings.xhr = function() {
try {
return new t.XMLHttpRequest();
} catch (e) {}
};
var zn = {
0:200,
1223:204
}, Pn = oe.ajaxSettings.xhr();
ie.cors = !!Pn && "withCredentials" in Pn, ie.ajax = Pn = !!Pn, oe.ajaxTransport(function(e) {
var n, i;
return ie.cors || Pn && !e.crossDomain ? {
send:function(r, o) {
var s, a = e.xhr();
if (a.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields) for (s in e.xhrFields) a[s] = e.xhrFields[s];
e.mimeType && a.overrideMimeType && a.overrideMimeType(e.mimeType), e.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
for (s in r) a.setRequestHeader(s, r[s]);
n = function(t) {
return function() {
n && (n = i = a.onload = a.onerror = a.onabort = a.onreadystatechange = null, "abort" === t ? a.abort() :"error" === t ? "number" != typeof a.status ? o(0, "error") :o(a.status, a.statusText) :o(zn[a.status] || a.status, a.statusText, "text" !== (a.responseType || "text") || "string" != typeof a.responseText ? {
binary:a.response
} :{
text:a.responseText
}, a.getAllResponseHeaders()));
};
}, a.onload = n(), i = a.onerror = n("error"), void 0 !== a.onabort ? a.onabort = i :a.onreadystatechange = function() {
4 === a.readyState && t.setTimeout(function() {
n && i();
});
}, n = n("abort");
try {
a.send(e.hasContent && e.data || null);
} catch (u) {
if (n) throw u;
}
},
abort:function() {
n && n();
}
} :void 0;
}), oe.ajaxSetup({
accepts:{
script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
},
contents:{
script:/\b(?:java|ecma)script\b/
},
converters:{
"text script":function(t) {
return oe.globalEval(t), t;
}
}
}), oe.ajaxPrefilter("script", function(t) {
void 0 === t.cache && (t.cache = !1), t.crossDomain && (t.type = "GET");
}), oe.ajaxTransport("script", function(t) {
if (t.crossDomain) {
var e, n;
return {
send:function(i, r) {
e = oe("<script>").prop({
charset:t.scriptCharset,
src:t.url
}).on("load error", n = function(t) {
e.remove(), n = null, t && r("error" === t.type ? 404 :200, t.type);
}), X.head.appendChild(e[0]);
},
abort:function() {
n && n();
}
};
}
});
var Hn = [], Nn = /(=)\?(?=&|$)|\?\?/;
oe.ajaxSetup({
jsonp:"callback",
jsonpCallback:function() {
var t = Hn.pop() || oe.expando + "_" + yn++;
return this[t] = !0, t;
}
}), oe.ajaxPrefilter("json jsonp", function(e, n, i) {
var r, o, s, a = e.jsonp !== !1 && (Nn.test(e.url) ? "url" :"string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Nn.test(e.data) && "data");
return a || "jsonp" === e.dataTypes[0] ? (r = e.jsonpCallback = oe.isFunction(e.jsonpCallback) ? e.jsonpCallback() :e.jsonpCallback, 
a ? e[a] = e[a].replace(Nn, "$1" + r) :e.jsonp !== !1 && (e.url += (_n.test(e.url) ? "&" :"?") + e.jsonp + "=" + r), 
e.converters["script json"] = function() {
return s || oe.error(r + " was not called"), s[0];
}, e.dataTypes[0] = "json", o = t[r], t[r] = function() {
s = arguments;
}, i.always(function() {
void 0 === o ? oe(t).removeProp(r) :t[r] = o, e[r] && (e.jsonpCallback = n.jsonpCallback, 
Hn.push(r)), s && oe.isFunction(o) && o(s[0]), s = o = void 0;
}), "script") :void 0;
}), oe.parseHTML = function(t, e, n) {
if (!t || "string" != typeof t) return null;
"boolean" == typeof e && (n = e, e = !1), e = e || X;
var i = pe.exec(t), r = !n && [];
return i ? [ e.createElement(i[1]) ] :(i = d([ t ], e, r), r && r.length && oe(r).remove(), 
oe.merge([], i.childNodes));
};
var Rn = oe.fn.load;
oe.fn.load = function(t, e, n) {
if ("string" != typeof t && Rn) return Rn.apply(this, arguments);
var i, r, o, s = this, a = t.indexOf(" ");
return a > -1 && (i = oe.trim(t.slice(a)), t = t.slice(0, a)), oe.isFunction(e) ? (n = e, 
e = void 0) :e && "object" == typeof e && (r = "POST"), s.length > 0 && oe.ajax({
url:t,
type:r || "GET",
dataType:"html",
data:e
}).done(function(t) {
o = arguments, s.html(i ? oe("<div>").append(oe.parseHTML(t)).find(i) :t);
}).always(n && function(t, e) {
s.each(function() {
n.apply(this, o || [ t.responseText, e, t ]);
});
}), this;
}, oe.each([ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function(t, e) {
oe.fn[e] = function(t) {
return this.on(e, t);
};
}), oe.expr.filters.animated = function(t) {
return oe.grep(oe.timers, function(e) {
return t === e.elem;
}).length;
}, oe.offset = {
setOffset:function(t, e, n) {
var i, r, o, s, a, u, l, c = oe.css(t, "position"), h = oe(t), d = {};
"static" === c && (t.style.position = "relative"), a = h.offset(), o = oe.css(t, "top"), 
u = oe.css(t, "left"), l = ("absolute" === c || "fixed" === c) && (o + u).indexOf("auto") > -1, 
l ? (i = h.position(), s = i.top, r = i.left) :(s = parseFloat(o) || 0, r = parseFloat(u) || 0), 
oe.isFunction(e) && (e = e.call(t, n, oe.extend({}, a))), null != e.top && (d.top = e.top - a.top + s), 
null != e.left && (d.left = e.left - a.left + r), "using" in e ? e.using.call(t, d) :h.css(d);
}
}, oe.fn.extend({
offset:function(t) {
if (arguments.length) return void 0 === t ? this :this.each(function(e) {
oe.offset.setOffset(this, t, e);
});
var e, n, i = this[0], r = {
top:0,
left:0
}, o = i && i.ownerDocument;
if (o) return e = o.documentElement, oe.contains(e, i) ? (r = i.getBoundingClientRect(), 
n = V(o), {
top:r.top + n.pageYOffset - e.clientTop,
left:r.left + n.pageXOffset - e.clientLeft
}) :r;
},
position:function() {
if (this[0]) {
var t, e, n = this[0], i = {
top:0,
left:0
};
return "fixed" === oe.css(n, "position") ? e = n.getBoundingClientRect() :(t = this.offsetParent(), 
e = this.offset(), oe.nodeName(t[0], "html") || (i = t.offset()), i.top += oe.css(t[0], "borderTopWidth", !0), 
i.left += oe.css(t[0], "borderLeftWidth", !0)), {
top:e.top - i.top - oe.css(n, "marginTop", !0),
left:e.left - i.left - oe.css(n, "marginLeft", !0)
};
}
},
offsetParent:function() {
return this.map(function() {
for (var t = this.offsetParent; t && "static" === oe.css(t, "position"); ) t = t.offsetParent;
return t || Ke;
});
}
}), oe.each({
scrollLeft:"pageXOffset",
scrollTop:"pageYOffset"
}, function(t, e) {
var n = "pageYOffset" === e;
oe.fn[t] = function(i) {
return Se(this, function(t, i, r) {
var o = V(t);
return void 0 === r ? o ? o[e] :t[i] :void (o ? o.scrollTo(n ? o.pageXOffset :r, n ? r :o.pageYOffset) :t[i] = r);
}, t, i, arguments.length);
};
}), oe.each([ "top", "left" ], function(t, e) {
oe.cssHooks[e] = E(ie.pixelPosition, function(t, n) {
return n ? (n = T(t, e), Xe.test(n) ? oe(t).position()[e] + "px" :n) :void 0;
});
}), oe.each({
Height:"height",
Width:"width"
}, function(t, e) {
oe.each({
padding:"inner" + t,
content:e,
"":"outer" + t
}, function(n, i) {
oe.fn[i] = function(i, r) {
var o = arguments.length && (n || "boolean" != typeof i), s = n || (i === !0 || r === !0 ? "margin" :"border");
return Se(this, function(e, n, i) {
var r;
return oe.isWindow(e) ? e.document.documentElement["client" + t] :9 === e.nodeType ? (r = e.documentElement, 
Math.max(e.body["scroll" + t], r["scroll" + t], e.body["offset" + t], r["offset" + t], r["client" + t])) :void 0 === i ? oe.css(e, n, s) :oe.style(e, n, i, s);
}, e, o ? i :void 0, o, null);
};
});
}), oe.fn.extend({
bind:function(t, e, n) {
return this.on(t, null, e, n);
},
unbind:function(t, e) {
return this.off(t, null, e);
},
delegate:function(t, e, n, i) {
return this.on(e, t, n, i);
},
undelegate:function(t, e, n) {
return 1 === arguments.length ? this.off(t, "**") :this.off(e, t || "**", n);
},
size:function() {
return this.length;
}
}), oe.fn.andSelf = oe.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
return oe;
});
var $n = t.jQuery, Fn = t.$;
return oe.noConflict = function(e) {
return t.$ === oe && (t.$ = Fn), e && t.jQuery === oe && (t.jQuery = $n), oe;
}, e || (t.jQuery = t.$ = oe), oe;
}), function(t, e) {
"use strict";
t.rails !== e && t.error("jquery-ujs has already been loaded!");
var n, i = t(document);
t.rails = n = {
linkClickSelector:"a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
buttonClickSelector:"button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",
inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",
formSubmitSelector:"form",
formInputClickSelector:"form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
disableSelector:"input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
enableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
requiredInputSelector:"input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",
fileInputSelector:"input[name][type=file]:not([disabled])",
linkDisableSelector:"a[data-disable-with], a[data-disable]",
buttonDisableSelector:"button[data-remote][data-disable-with], button[data-remote][data-disable]",
csrfToken:function() {
return t("meta[name=csrf-token]").attr("content");
},
csrfParam:function() {
return t("meta[name=csrf-param]").attr("content");
},
CSRFProtection:function(t) {
var e = n.csrfToken();
e && t.setRequestHeader("X-CSRF-Token", e);
},
refreshCSRFTokens:function() {
t('form input[name="' + n.csrfParam() + '"]').val(n.csrfToken());
},
fire:function(e, n, i) {
var r = t.Event(n);
return e.trigger(r, i), r.result !== !1;
},
confirm:function(t) {
return confirm(t);
},
ajax:function(e) {
return t.ajax(e);
},
href:function(t) {
return t[0].href;
},
isRemote:function(t) {
return t.data("remote") !== e && t.data("remote") !== !1;
},
handleRemote:function(i) {
var r, o, s, a, u, l;
if (n.fire(i, "ajax:before")) {
if (a = i.data("with-credentials") || null, u = i.data("type") || t.ajaxSettings && t.ajaxSettings.dataType, 
i.is("form")) {
r = i.data("ujs:submit-button-formmethod") || i.attr("method"), o = i.data("ujs:submit-button-formaction") || i.attr("action"), 
s = t(i[0]).serializeArray();
var c = i.data("ujs:submit-button");
c && (s.push(c), i.data("ujs:submit-button", null)), i.data("ujs:submit-button-formmethod", null), 
i.data("ujs:submit-button-formaction", null);
} else i.is(n.inputChangeSelector) ? (r = i.data("method"), o = i.data("url"), s = i.serialize(), 
i.data("params") && (s = s + "&" + i.data("params"))) :i.is(n.buttonClickSelector) ? (r = i.data("method") || "get", 
o = i.data("url"), s = i.serialize(), i.data("params") && (s = s + "&" + i.data("params"))) :(r = i.data("method"), 
o = n.href(i), s = i.data("params") || null);
return l = {
type:r || "GET",
data:s,
dataType:u,
beforeSend:function(t, r) {
return r.dataType === e && t.setRequestHeader("accept", "*/*;q=0.5, " + r.accepts.script), 
n.fire(i, "ajax:beforeSend", [ t, r ]) ? void i.trigger("ajax:send", t) :!1;
},
success:function(t, e, n) {
i.trigger("ajax:success", [ t, e, n ]);
},
complete:function(t, e) {
i.trigger("ajax:complete", [ t, e ]);
},
error:function(t, e, n) {
i.trigger("ajax:error", [ t, e, n ]);
},
crossDomain:n.isCrossDomain(o)
}, a && (l.xhrFields = {
withCredentials:a
}), o && (l.url = o), n.ajax(l);
}
return !1;
},
isCrossDomain:function(t) {
var e = document.createElement("a");
e.href = location.href;
var n = document.createElement("a");
try {
return n.href = t, n.href = n.href, !((!n.protocol || ":" === n.protocol) && !n.host || e.protocol + "//" + e.host == n.protocol + "//" + n.host);
} catch (i) {
return !0;
}
},
handleMethod:function(i) {
var r = n.href(i), o = i.data("method"), s = i.attr("target"), a = n.csrfToken(), u = n.csrfParam(), l = t('<form method="post" action="' + r + '"></form>'), c = '<input name="_method" value="' + o + '" type="hidden" />';
u === e || a === e || n.isCrossDomain(r) || (c += '<input name="' + u + '" value="' + a + '" type="hidden" />'), 
s && l.attr("target", s), l.hide().append(c).appendTo("body"), l.submit();
},
formElements:function(e, n) {
return e.is("form") ? t(e[0].elements).filter(n) :e.find(n);
},
disableFormElements:function(e) {
n.formElements(e, n.disableSelector).each(function() {
n.disableFormElement(t(this));
});
},
disableFormElement:function(t) {
var n, i;
n = t.is("button") ? "html" :"val", i = t.data("disable-with"), i !== e && (t.data("ujs:enable-with", t[n]()), 
t[n](i)), t.prop("disabled", !0), t.data("ujs:disabled", !0);
},
enableFormElements:function(e) {
n.formElements(e, n.enableSelector).each(function() {
n.enableFormElement(t(this));
});
},
enableFormElement:function(t) {
var n = t.is("button") ? "html" :"val";
t.data("ujs:enable-with") !== e && (t[n](t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), 
t.prop("disabled", !1), t.removeData("ujs:disabled");
},
allowAction:function(t) {
var e, i = t.data("confirm"), r = !1;
if (!i) return !0;
if (n.fire(t, "confirm")) {
try {
r = n.confirm(i);
} catch (o) {
(console.error || console.log).call(console, o.stack || o);
}
e = n.fire(t, "confirm:complete", [ r ]);
}
return r && e;
},
blankInputs:function(e, n, i) {
var r, o, s, a, u = t(), l = n || "input,textarea", c = e.find(l), h = {};
return c.each(function() {
r = t(this), r.is("input[type=radio]") ? (a = r.attr("name"), h[a] || (0 === e.find('input[type=radio]:checked[name="' + a + '"]').length && (s = e.find('input[type=radio][name="' + a + '"]'), 
u = u.add(s)), h[a] = a)) :(o = r.is("input[type=checkbox],input[type=radio]") ? r.is(":checked") :!!r.val(), 
o === i && (u = u.add(r)));
}), u.length ? u :!1;
},
nonBlankInputs:function(t, e) {
return n.blankInputs(t, e, !0);
},
stopEverything:function(e) {
return t(e.target).trigger("ujs:everythingStopped"), e.stopImmediatePropagation(), 
!1;
},
disableElement:function(t) {
var i = t.data("disable-with");
i !== e && (t.data("ujs:enable-with", t.html()), t.html(i)), t.bind("click.railsDisable", function(t) {
return n.stopEverything(t);
}), t.data("ujs:disabled", !0);
},
enableElement:function(t) {
t.data("ujs:enable-with") !== e && (t.html(t.data("ujs:enable-with")), t.removeData("ujs:enable-with")), 
t.unbind("click.railsDisable"), t.removeData("ujs:disabled");
}
}, n.fire(i, "rails:attachBindings") && (t.ajaxPrefilter(function(t, e, i) {
t.crossDomain || n.CSRFProtection(i);
}), t(window).on("pageshow.rails", function() {
t(t.rails.enableSelector).each(function() {
var e = t(this);
e.data("ujs:disabled") && t.rails.enableFormElement(e);
}), t(t.rails.linkDisableSelector).each(function() {
var e = t(this);
e.data("ujs:disabled") && t.rails.enableElement(e);
});
}), i.on("ajax:complete", n.linkDisableSelector, function() {
n.enableElement(t(this));
}), i.on("ajax:complete", n.buttonDisableSelector, function() {
n.enableFormElement(t(this));
}), i.on("click.rails", n.linkClickSelector, function(e) {
var i = t(this), r = i.data("method"), o = i.data("params"), s = e.metaKey || e.ctrlKey;
if (!n.allowAction(i)) return n.stopEverything(e);
if (!s && i.is(n.linkDisableSelector) && n.disableElement(i), n.isRemote(i)) {
if (s && (!r || "GET" === r) && !o) return !0;
var a = n.handleRemote(i);
return a === !1 ? n.enableElement(i) :a.fail(function() {
n.enableElement(i);
}), !1;
}
return r ? (n.handleMethod(i), !1) :void 0;
}), i.on("click.rails", n.buttonClickSelector, function(e) {
var i = t(this);
if (!n.allowAction(i) || !n.isRemote(i)) return n.stopEverything(e);
i.is(n.buttonDisableSelector) && n.disableFormElement(i);
var r = n.handleRemote(i);
return r === !1 ? n.enableFormElement(i) :r.fail(function() {
n.enableFormElement(i);
}), !1;
}), i.on("change.rails", n.inputChangeSelector, function(e) {
var i = t(this);
return n.allowAction(i) && n.isRemote(i) ? (n.handleRemote(i), !1) :n.stopEverything(e);
}), i.on("submit.rails", n.formSubmitSelector, function(i) {
var r, o, s = t(this), a = n.isRemote(s);
if (!n.allowAction(s)) return n.stopEverything(i);
if (s.attr("novalidate") === e) if (s.data("ujs:formnovalidate-button") === e) {
if (r = n.blankInputs(s, n.requiredInputSelector, !1), r && n.fire(s, "ajax:aborted:required", [ r ])) return n.stopEverything(i);
} else s.data("ujs:formnovalidate-button", e);
if (a) {
if (o = n.nonBlankInputs(s, n.fileInputSelector)) {
setTimeout(function() {
n.disableFormElements(s);
}, 13);
var u = n.fire(s, "ajax:aborted:file", [ o ]);
return u || setTimeout(function() {
n.enableFormElements(s);
}, 13), u;
}
return n.handleRemote(s), !1;
}
setTimeout(function() {
n.disableFormElements(s);
}, 13);
}), i.on("click.rails", n.formInputClickSelector, function(e) {
var i = t(this);
if (!n.allowAction(i)) return n.stopEverything(e);
var r = i.attr("name"), o = r ? {
name:r,
value:i.val()
} :null, s = i.closest("form");
0 === s.length && (s = t("#" + i.attr("form"))), s.data("ujs:submit-button", o), 
s.data("ujs:formnovalidate-button", i.attr("formnovalidate")), s.data("ujs:submit-button-formaction", i.attr("formaction")), 
s.data("ujs:submit-button-formmethod", i.attr("formmethod"));
}), i.on("ajax:send.rails", n.formSubmitSelector, function(e) {
this === e.target && n.disableFormElements(t(this));
}), i.on("ajax:complete.rails", n.formSubmitSelector, function(e) {
this === e.target && n.enableFormElements(t(this));
}), t(function() {
n.refreshCSRFTokens();
}));
}(jQuery), function() {
function t(t) {
function e(e, n, i, r, o, s) {
for (;o >= 0 && s > o; o += t) {
var a = r ? r[o] :o;
i = n(i, e[a], a, e);
}
return i;
}
return function(n, i, r, o) {
i = _(i, o, 4);
var s = !T(n) && y.keys(n), a = (s || n).length, u = t > 0 ? 0 :a - 1;
return arguments.length < 3 && (r = n[s ? s[u] :u], u += t), e(n, i, r, s, u, a);
};
}
function e(t) {
return function(e, n, i) {
n = b(n, i);
for (var r = C(e), o = t > 0 ? 0 :r - 1; o >= 0 && r > o; o += t) if (n(e[o], o, e)) return o;
return -1;
};
}
function n(t, e, n) {
return function(i, r, o) {
var s = 0, a = C(i);
if ("number" == typeof o) t > 0 ? s = o >= 0 ? o :Math.max(o + a, s) :a = o >= 0 ? Math.min(o + 1, a) :o + a + 1; else if (n && o && a) return o = n(i, r), 
i[o] === r ? o :-1;
if (r !== r) return o = e(c.call(i, s, a), y.isNaN), o >= 0 ? o + s :-1;
for (o = t > 0 ? s :a - 1; o >= 0 && a > o; o += t) if (i[o] === r) return o;
return -1;
};
}
function i(t, e) {
var n = I.length, i = t.constructor, r = y.isFunction(i) && i.prototype || a, o = "constructor";
for (y.has(t, o) && !y.contains(e, o) && e.push(o); n--; ) o = I[n], o in t && t[o] !== r[o] && !y.contains(e, o) && e.push(o);
}
var r = this, o = r._, s = Array.prototype, a = Object.prototype, u = Function.prototype, l = s.push, c = s.slice, h = a.toString, d = a.hasOwnProperty, f = Array.isArray, p = Object.keys, m = u.bind, g = Object.create, v = function() {}, y = function(t) {
return t instanceof y ? t :this instanceof y ? void (this._wrapped = t) :new y(t);
};
"undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = y), 
exports._ = y) :r._ = y, y.VERSION = "1.8.3";
var _ = function(t, e, n) {
if (void 0 === e) return t;
switch (null == n ? 3 :n) {
case 1:
return function(n) {
return t.call(e, n);
};

case 2:
return function(n, i) {
return t.call(e, n, i);
};

case 3:
return function(n, i, r) {
return t.call(e, n, i, r);
};

case 4:
return function(n, i, r, o) {
return t.call(e, n, i, r, o);
};
}
return function() {
return t.apply(e, arguments);
};
}, b = function(t, e, n) {
return null == t ? y.identity :y.isFunction(t) ? _(t, e, n) :y.isObject(t) ? y.matcher(t) :y.property(t);
};
y.iteratee = function(t, e) {
return b(t, e, 1/0);
};
var w = function(t, e) {
return function(n) {
var i = arguments.length;
if (2 > i || null == n) return n;
for (var r = 1; i > r; r++) for (var o = arguments[r], s = t(o), a = s.length, u = 0; a > u; u++) {
var l = s[u];
e && void 0 !== n[l] || (n[l] = o[l]);
}
return n;
};
}, x = function(t) {
if (!y.isObject(t)) return {};
if (g) return g(t);
v.prototype = t;
var e = new v();
return v.prototype = null, e;
}, S = function(t) {
return function(e) {
return null == e ? void 0 :e[t];
};
}, k = Math.pow(2, 53) - 1, C = S("length"), T = function(t) {
var e = C(t);
return "number" == typeof e && e >= 0 && k >= e;
};
y.each = y.forEach = function(t, e, n) {
e = _(e, n);
var i, r;
if (T(t)) for (i = 0, r = t.length; r > i; i++) e(t[i], i, t); else {
var o = y.keys(t);
for (i = 0, r = o.length; r > i; i++) e(t[o[i]], o[i], t);
}
return t;
}, y.map = y.collect = function(t, e, n) {
e = b(e, n);
for (var i = !T(t) && y.keys(t), r = (i || t).length, o = Array(r), s = 0; r > s; s++) {
var a = i ? i[s] :s;
o[s] = e(t[a], a, t);
}
return o;
}, y.reduce = y.foldl = y.inject = t(1), y.reduceRight = y.foldr = t(-1), y.find = y.detect = function(t, e, n) {
var i;
return i = T(t) ? y.findIndex(t, e, n) :y.findKey(t, e, n), void 0 !== i && -1 !== i ? t[i] :void 0;
}, y.filter = y.select = function(t, e, n) {
var i = [];
return e = b(e, n), y.each(t, function(t, n, r) {
e(t, n, r) && i.push(t);
}), i;
}, y.reject = function(t, e, n) {
return y.filter(t, y.negate(b(e)), n);
}, y.every = y.all = function(t, e, n) {
e = b(e, n);
for (var i = !T(t) && y.keys(t), r = (i || t).length, o = 0; r > o; o++) {
var s = i ? i[o] :o;
if (!e(t[s], s, t)) return !1;
}
return !0;
}, y.some = y.any = function(t, e, n) {
e = b(e, n);
for (var i = !T(t) && y.keys(t), r = (i || t).length, o = 0; r > o; o++) {
var s = i ? i[o] :o;
if (e(t[s], s, t)) return !0;
}
return !1;
}, y.contains = y.includes = y.include = function(t, e, n, i) {
return T(t) || (t = y.values(t)), ("number" != typeof n || i) && (n = 0), y.indexOf(t, e, n) >= 0;
}, y.invoke = function(t, e) {
var n = c.call(arguments, 2), i = y.isFunction(e);
return y.map(t, function(t) {
var r = i ? e :t[e];
return null == r ? r :r.apply(t, n);
});
}, y.pluck = function(t, e) {
return y.map(t, y.property(e));
}, y.where = function(t, e) {
return y.filter(t, y.matcher(e));
}, y.findWhere = function(t, e) {
return y.find(t, y.matcher(e));
}, y.max = function(t, e, n) {
var i, r, o = -1/0, s = -1/0;
if (null == e && null != t) {
t = T(t) ? t :y.values(t);
for (var a = 0, u = t.length; u > a; a++) i = t[a], i > o && (o = i);
} else e = b(e, n), y.each(t, function(t, n, i) {
r = e(t, n, i), (r > s || r === -1/0 && o === -1/0) && (o = t, s = r);
});
return o;
}, y.min = function(t, e, n) {
var i, r, o = 1/0, s = 1/0;
if (null == e && null != t) {
t = T(t) ? t :y.values(t);
for (var a = 0, u = t.length; u > a; a++) i = t[a], o > i && (o = i);
} else e = b(e, n), y.each(t, function(t, n, i) {
r = e(t, n, i), (s > r || 1/0 === r && 1/0 === o) && (o = t, s = r);
});
return o;
}, y.shuffle = function(t) {
for (var e, n = T(t) ? t :y.values(t), i = n.length, r = Array(i), o = 0; i > o; o++) e = y.random(0, o), 
e !== o && (r[o] = r[e]), r[e] = n[o];
return r;
}, y.sample = function(t, e, n) {
return null == e || n ? (T(t) || (t = y.values(t)), t[y.random(t.length - 1)]) :y.shuffle(t).slice(0, Math.max(0, e));
}, y.sortBy = function(t, e, n) {
return e = b(e, n), y.pluck(y.map(t, function(t, n, i) {
return {
value:t,
index:n,
criteria:e(t, n, i)
};
}).sort(function(t, e) {
var n = t.criteria, i = e.criteria;
if (n !== i) {
if (n > i || void 0 === n) return 1;
if (i > n || void 0 === i) return -1;
}
return t.index - e.index;
}), "value");
};
var E = function(t) {
return function(e, n, i) {
var r = {};
return n = b(n, i), y.each(e, function(i, o) {
var s = n(i, o, e);
t(r, i, s);
}), r;
};
};
y.groupBy = E(function(t, e, n) {
y.has(t, n) ? t[n].push(e) :t[n] = [ e ];
}), y.indexBy = E(function(t, e, n) {
t[n] = e;
}), y.countBy = E(function(t, e, n) {
y.has(t, n) ? t[n]++ :t[n] = 1;
}), y.toArray = function(t) {
return t ? y.isArray(t) ? c.call(t) :T(t) ? y.map(t, y.identity) :y.values(t) :[];
}, y.size = function(t) {
return null == t ? 0 :T(t) ? t.length :y.keys(t).length;
}, y.partition = function(t, e, n) {
e = b(e, n);
var i = [], r = [];
return y.each(t, function(t, n, o) {
(e(t, n, o) ? i :r).push(t);
}), [ i, r ];
}, y.first = y.head = y.take = function(t, e, n) {
return null == t ? void 0 :null == e || n ? t[0] :y.initial(t, t.length - e);
}, y.initial = function(t, e, n) {
return c.call(t, 0, Math.max(0, t.length - (null == e || n ? 1 :e)));
}, y.last = function(t, e, n) {
return null == t ? void 0 :null == e || n ? t[t.length - 1] :y.rest(t, Math.max(0, t.length - e));
}, y.rest = y.tail = y.drop = function(t, e, n) {
return c.call(t, null == e || n ? 1 :e);
}, y.compact = function(t) {
return y.filter(t, y.identity);
};
var D = function(t, e, n, i) {
for (var r = [], o = 0, s = i || 0, a = C(t); a > s; s++) {
var u = t[s];
if (T(u) && (y.isArray(u) || y.isArguments(u))) {
e || (u = D(u, e, n));
var l = 0, c = u.length;
for (r.length += c; c > l; ) r[o++] = u[l++];
} else n || (r[o++] = u);
}
return r;
};
y.flatten = function(t, e) {
return D(t, e, !1);
}, y.without = function(t) {
return y.difference(t, c.call(arguments, 1));
}, y.uniq = y.unique = function(t, e, n, i) {
y.isBoolean(e) || (i = n, n = e, e = !1), null != n && (n = b(n, i));
for (var r = [], o = [], s = 0, a = C(t); a > s; s++) {
var u = t[s], l = n ? n(u, s, t) :u;
e ? (s && o === l || r.push(u), o = l) :n ? y.contains(o, l) || (o.push(l), r.push(u)) :y.contains(r, u) || r.push(u);
}
return r;
}, y.union = function() {
return y.uniq(D(arguments, !0, !0));
}, y.intersection = function(t) {
for (var e = [], n = arguments.length, i = 0, r = C(t); r > i; i++) {
var o = t[i];
if (!y.contains(e, o)) {
for (var s = 1; n > s && y.contains(arguments[s], o); s++) ;
s === n && e.push(o);
}
}
return e;
}, y.difference = function(t) {
var e = D(arguments, !0, !0, 1);
return y.filter(t, function(t) {
return !y.contains(e, t);
});
}, y.zip = function() {
return y.unzip(arguments);
}, y.unzip = function(t) {
for (var e = t && y.max(t, C).length || 0, n = Array(e), i = 0; e > i; i++) n[i] = y.pluck(t, i);
return n;
}, y.object = function(t, e) {
for (var n = {}, i = 0, r = C(t); r > i; i++) e ? n[t[i]] = e[i] :n[t[i][0]] = t[i][1];
return n;
}, y.findIndex = e(1), y.findLastIndex = e(-1), y.sortedIndex = function(t, e, n, i) {
n = b(n, i, 1);
for (var r = n(e), o = 0, s = C(t); s > o; ) {
var a = Math.floor((o + s) / 2);
n(t[a]) < r ? o = a + 1 :s = a;
}
return o;
}, y.indexOf = n(1, y.findIndex, y.sortedIndex), y.lastIndexOf = n(-1, y.findLastIndex), 
y.range = function(t, e, n) {
null == e && (e = t || 0, t = 0), n = n || 1;
for (var i = Math.max(Math.ceil((e - t) / n), 0), r = Array(i), o = 0; i > o; o++, 
t += n) r[o] = t;
return r;
};
var M = function(t, e, n, i, r) {
if (!(i instanceof e)) return t.apply(n, r);
var o = x(t.prototype), s = t.apply(o, r);
return y.isObject(s) ? s :o;
};
y.bind = function(t, e) {
if (m && t.bind === m) return m.apply(t, c.call(arguments, 1));
if (!y.isFunction(t)) throw new TypeError("Bind must be called on a function");
var n = c.call(arguments, 2), i = function() {
return M(t, i, e, this, n.concat(c.call(arguments)));
};
return i;
}, y.partial = function(t) {
var e = c.call(arguments, 1), n = function() {
for (var i = 0, r = e.length, o = Array(r), s = 0; r > s; s++) o[s] = e[s] === y ? arguments[i++] :e[s];
for (;i < arguments.length; ) o.push(arguments[i++]);
return M(t, n, this, this, o);
};
return n;
}, y.bindAll = function(t) {
var e, n, i = arguments.length;
if (1 >= i) throw new Error("bindAll must be passed function names");
for (e = 1; i > e; e++) n = arguments[e], t[n] = y.bind(t[n], t);
return t;
}, y.memoize = function(t, e) {
var n = function(i) {
var r = n.cache, o = "" + (e ? e.apply(this, arguments) :i);
return y.has(r, o) || (r[o] = t.apply(this, arguments)), r[o];
};
return n.cache = {}, n;
}, y.delay = function(t, e) {
var n = c.call(arguments, 2);
return setTimeout(function() {
return t.apply(null, n);
}, e);
}, y.defer = y.partial(y.delay, y, 1), y.throttle = function(t, e, n) {
var i, r, o, s = null, a = 0;
n || (n = {});
var u = function() {
a = n.leading === !1 ? 0 :y.now(), s = null, o = t.apply(i, r), s || (i = r = null);
};
return function() {
var l = y.now();
a || n.leading !== !1 || (a = l);
var c = e - (l - a);
return i = this, r = arguments, 0 >= c || c > e ? (s && (clearTimeout(s), s = null), 
a = l, o = t.apply(i, r), s || (i = r = null)) :s || n.trailing === !1 || (s = setTimeout(u, c)), 
o;
};
}, y.debounce = function(t, e, n) {
var i, r, o, s, a, u = function() {
var l = y.now() - s;
e > l && l >= 0 ? i = setTimeout(u, e - l) :(i = null, n || (a = t.apply(o, r), 
i || (o = r = null)));
};
return function() {
o = this, r = arguments, s = y.now();
var l = n && !i;
return i || (i = setTimeout(u, e)), l && (a = t.apply(o, r), o = r = null), a;
};
}, y.wrap = function(t, e) {
return y.partial(e, t);
}, y.negate = function(t) {
return function() {
return !t.apply(this, arguments);
};
}, y.compose = function() {
var t = arguments, e = t.length - 1;
return function() {
for (var n = e, i = t[e].apply(this, arguments); n--; ) i = t[n].call(this, i);
return i;
};
}, y.after = function(t, e) {
return function() {
return --t < 1 ? e.apply(this, arguments) :void 0;
};
}, y.before = function(t, e) {
var n;
return function() {
return --t > 0 && (n = e.apply(this, arguments)), 1 >= t && (e = null), n;
};
}, y.once = y.partial(y.before, 2);
var O = !{
toString:null
}.propertyIsEnumerable("toString"), I = [ "valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString" ];
y.keys = function(t) {
if (!y.isObject(t)) return [];
if (p) return p(t);
var e = [];
for (var n in t) y.has(t, n) && e.push(n);
return O && i(t, e), e;
}, y.allKeys = function(t) {
if (!y.isObject(t)) return [];
var e = [];
for (var n in t) e.push(n);
return O && i(t, e), e;
}, y.values = function(t) {
for (var e = y.keys(t), n = e.length, i = Array(n), r = 0; n > r; r++) i[r] = t[e[r]];
return i;
}, y.mapObject = function(t, e, n) {
e = b(e, n);
for (var i, r = y.keys(t), o = r.length, s = {}, a = 0; o > a; a++) i = r[a], s[i] = e(t[i], i, t);
return s;
}, y.pairs = function(t) {
for (var e = y.keys(t), n = e.length, i = Array(n), r = 0; n > r; r++) i[r] = [ e[r], t[e[r]] ];
return i;
}, y.invert = function(t) {
for (var e = {}, n = y.keys(t), i = 0, r = n.length; r > i; i++) e[t[n[i]]] = n[i];
return e;
}, y.functions = y.methods = function(t) {
var e = [];
for (var n in t) y.isFunction(t[n]) && e.push(n);
return e.sort();
}, y.extend = w(y.allKeys), y.extendOwn = y.assign = w(y.keys), y.findKey = function(t, e, n) {
e = b(e, n);
for (var i, r = y.keys(t), o = 0, s = r.length; s > o; o++) if (i = r[o], e(t[i], i, t)) return i;
}, y.pick = function(t, e, n) {
var i, r, o = {}, s = t;
if (null == s) return o;
y.isFunction(e) ? (r = y.allKeys(s), i = _(e, n)) :(r = D(arguments, !1, !1, 1), 
i = function(t, e, n) {
return e in n;
}, s = Object(s));
for (var a = 0, u = r.length; u > a; a++) {
var l = r[a], c = s[l];
i(c, l, s) && (o[l] = c);
}
return o;
}, y.omit = function(t, e, n) {
if (y.isFunction(e)) e = y.negate(e); else {
var i = y.map(D(arguments, !1, !1, 1), String);
e = function(t, e) {
return !y.contains(i, e);
};
}
return y.pick(t, e, n);
}, y.defaults = w(y.allKeys, !0), y.create = function(t, e) {
var n = x(t);
return e && y.extendOwn(n, e), n;
}, y.clone = function(t) {
return y.isObject(t) ? y.isArray(t) ? t.slice() :y.extend({}, t) :t;
}, y.tap = function(t, e) {
return e(t), t;
}, y.isMatch = function(t, e) {
var n = y.keys(e), i = n.length;
if (null == t) return !i;
for (var r = Object(t), o = 0; i > o; o++) {
var s = n[o];
if (e[s] !== r[s] || !(s in r)) return !1;
}
return !0;
};
var j = function(t, e, n, i) {
if (t === e) return 0 !== t || 1 / t === 1 / e;
if (null == t || null == e) return t === e;
t instanceof y && (t = t._wrapped), e instanceof y && (e = e._wrapped);
var r = h.call(t);
if (r !== h.call(e)) return !1;
switch (r) {
case "[object RegExp]":
case "[object String]":
return "" + t == "" + e;

case "[object Number]":
return +t !== +t ? +e !== +e :0 === +t ? 1 / +t === 1 / e :+t === +e;

case "[object Date]":
case "[object Boolean]":
return +t === +e;
}
var o = "[object Array]" === r;
if (!o) {
if ("object" != typeof t || "object" != typeof e) return !1;
var s = t.constructor, a = e.constructor;
if (s !== a && !(y.isFunction(s) && s instanceof s && y.isFunction(a) && a instanceof a) && "constructor" in t && "constructor" in e) return !1;
}
n = n || [], i = i || [];
for (var u = n.length; u--; ) if (n[u] === t) return i[u] === e;
if (n.push(t), i.push(e), o) {
if (u = t.length, u !== e.length) return !1;
for (;u--; ) if (!j(t[u], e[u], n, i)) return !1;
} else {
var l, c = y.keys(t);
if (u = c.length, y.keys(e).length !== u) return !1;
for (;u--; ) if (l = c[u], !y.has(e, l) || !j(t[l], e[l], n, i)) return !1;
}
return n.pop(), i.pop(), !0;
};
y.isEqual = function(t, e) {
return j(t, e);
}, y.isEmpty = function(t) {
return null == t ? !0 :T(t) && (y.isArray(t) || y.isString(t) || y.isArguments(t)) ? 0 === t.length :0 === y.keys(t).length;
}, y.isElement = function(t) {
return !(!t || 1 !== t.nodeType);
}, y.isArray = f || function(t) {
return "[object Array]" === h.call(t);
}, y.isObject = function(t) {
var e = typeof t;
return "function" === e || "object" === e && !!t;
}, y.each([ "Arguments", "Function", "String", "Number", "Date", "RegExp", "Error" ], function(t) {
y["is" + t] = function(e) {
return h.call(e) === "[object " + t + "]";
};
}), y.isArguments(arguments) || (y.isArguments = function(t) {
return y.has(t, "callee");
}), "function" != typeof /./ && "object" != typeof Int8Array && (y.isFunction = function(t) {
return "function" == typeof t || !1;
}), y.isFinite = function(t) {
return isFinite(t) && !isNaN(parseFloat(t));
}, y.isNaN = function(t) {
return y.isNumber(t) && t !== +t;
}, y.isBoolean = function(t) {
return t === !0 || t === !1 || "[object Boolean]" === h.call(t);
}, y.isNull = function(t) {
return null === t;
}, y.isUndefined = function(t) {
return void 0 === t;
}, y.has = function(t, e) {
return null != t && d.call(t, e);
}, y.noConflict = function() {
return r._ = o, this;
}, y.identity = function(t) {
return t;
}, y.constant = function(t) {
return function() {
return t;
};
}, y.noop = function() {}, y.property = S, y.propertyOf = function(t) {
return null == t ? function() {} :function(e) {
return t[e];
};
}, y.matcher = y.matches = function(t) {
return t = y.extendOwn({}, t), function(e) {
return y.isMatch(e, t);
};
}, y.times = function(t, e, n) {
var i = Array(Math.max(0, t));
e = _(e, n, 1);
for (var r = 0; t > r; r++) i[r] = e(r);
return i;
}, y.random = function(t, e) {
return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1));
}, y.now = Date.now || function() {
return new Date().getTime();
};
var A = {
"&":"&amp;",
"<":"&lt;",
">":"&gt;",
'"':"&quot;",
"'":"&#x27;",
"`":"&#x60;"
}, L = y.invert(A), z = function(t) {
var e = function(e) {
return t[e];
}, n = "(?:" + y.keys(t).join("|") + ")", i = RegExp(n), r = RegExp(n, "g");
return function(t) {
return t = null == t ? "" :"" + t, i.test(t) ? t.replace(r, e) :t;
};
};
y.escape = z(A), y.unescape = z(L), y.result = function(t, e, n) {
var i = null == t ? void 0 :t[e];
return void 0 === i && (i = n), y.isFunction(i) ? i.call(t) :i;
};
var P = 0;
y.uniqueId = function(t) {
var e = ++P + "";
return t ? t + e :e;
}, y.templateSettings = {
evaluate:/<%([\s\S]+?)%>/g,
interpolate:/<%=([\s\S]+?)%>/g,
escape:/<%-([\s\S]+?)%>/g
};
var H = /(.)^/, N = {
"'":"'",
"\\":"\\",
"\r":"r",
"\n":"n",
"\u2028":"u2028",
"\u2029":"u2029"
}, R = /\\|'|\r|\n|\u2028|\u2029/g, $ = function(t) {
return "\\" + N[t];
};
y.template = function(t, e, n) {
!e && n && (e = n), e = y.defaults({}, e, y.templateSettings);
var i = RegExp([ (e.escape || H).source, (e.interpolate || H).source, (e.evaluate || H).source ].join("|") + "|$", "g"), r = 0, o = "__p+='";
t.replace(i, function(e, n, i, s, a) {
return o += t.slice(r, a).replace(R, $), r = a + e.length, n ? o += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'" :i ? o += "'+\n((__t=(" + i + "))==null?'':__t)+\n'" :s && (o += "';\n" + s + "\n__p+='"), 
e;
}), o += "';\n", e.variable || (o = "with(obj||{}){\n" + o + "}\n"), o = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + o + "return __p;\n";
try {
var s = new Function(e.variable || "obj", "_", o);
} catch (a) {
throw a.source = o, a;
}
var u = function(t) {
return s.call(this, t, y);
}, l = e.variable || "obj";
return u.source = "function(" + l + "){\n" + o + "}", u;
}, y.chain = function(t) {
var e = y(t);
return e._chain = !0, e;
};
var F = function(t, e) {
return t._chain ? y(e).chain() :e;
};
y.mixin = function(t) {
y.each(y.functions(t), function(e) {
var n = y[e] = t[e];
y.prototype[e] = function() {
var t = [ this._wrapped ];
return l.apply(t, arguments), F(this, n.apply(y, t));
};
});
}, y.mixin(y), y.each([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(t) {
var e = s[t];
y.prototype[t] = function() {
var n = this._wrapped;
return e.apply(n, arguments), "shift" !== t && "splice" !== t || 0 !== n.length || delete n[0], 
F(this, n);
};
}), y.each([ "concat", "join", "slice" ], function(t) {
var e = s[t];
y.prototype[t] = function() {
return F(this, e.apply(this._wrapped, arguments));
};
}), y.prototype.value = function() {
return this._wrapped;
}, y.prototype.valueOf = y.prototype.toJSON = y.prototype.value, y.prototype.toString = function() {
return "" + this._wrapped;
}, "function" == typeof define && define.amd && define("underscore", [], function() {
return y;
});
}.call(this), function(t) {
var e = "object" == typeof self && self.self == self && self || "object" == typeof global && global.global == global && global;
if ("function" == typeof define && define.amd) define([ "underscore", "jquery", "exports" ], function(n, i, r) {
e.Backbone = t(e, r, n, i);
}); else if ("undefined" != typeof exports) {
var n, i = require("underscore");
try {
n = require("jquery");
} catch (r) {}
t(e, exports, i, n);
} else e.Backbone = t(e, {}, e._, e.jQuery || e.Zepto || e.ender || e.$);
}(function(t, e, n, i) {
var r = t.Backbone, o = [].slice;
e.VERSION = "1.2.1", e.$ = i, e.noConflict = function() {
return t.Backbone = r, this;
}, e.emulateHTTP = !1, e.emulateJSON = !1;
var s = function(t, e, i) {
switch (t) {
case 1:
return function() {
return n[e](this[i]);
};

case 2:
return function(t) {
return n[e](this[i], t);
};

case 3:
return function(t, r) {
return n[e](this[i], t, r);
};

case 4:
return function(t, r, o) {
return n[e](this[i], t, r, o);
};

default:
return function() {
var t = o.call(arguments);
return t.unshift(this[i]), n[e].apply(n, t);
};
}
}, a = function(t, e, i) {
n.each(e, function(e, r) {
n[r] && (t.prototype[r] = s(e, r, i));
});
}, u = e.Events = {}, l = /\s+/, c = function(t, e, i, r, o) {
var s, a = 0;
if (i && "object" == typeof i) {
void 0 !== r && "context" in o && void 0 === o.context && (o.context = r);
for (s = n.keys(i); a < s.length; a++) e = t(e, s[a], i[s[a]], o);
} else if (i && l.test(i)) for (s = i.split(l); a < s.length; a++) e = t(e, s[a], r, o); else e = t(e, i, r, o);
return e;
};
u.on = function(t, e, n) {
return h(this, t, e, n);
};
var h = function(t, e, n, i, r) {
if (t._events = c(d, t._events || {}, e, n, {
context:i,
ctx:t,
listening:r
}), r) {
var o = t._listeners || (t._listeners = {});
o[r.id] = r;
}
return t;
};
u.listenTo = function(t, e, i) {
if (!t) return this;
var r = t._listenId || (t._listenId = n.uniqueId("l")), o = this._listeningTo || (this._listeningTo = {}), s = o[r];
if (!s) {
var a = this._listenId || (this._listenId = n.uniqueId("l"));
s = o[r] = {
obj:t,
objId:r,
id:a,
listeningTo:o,
count:0
};
}
return h(t, e, i, this, s), this;
};
var d = function(t, e, n, i) {
if (n) {
var r = t[e] || (t[e] = []), o = i.context, s = i.ctx, a = i.listening;
a && a.count++, r.push({
callback:n,
context:o,
ctx:o || s,
listening:a
});
}
return t;
};
u.off = function(t, e, n) {
return this._events ? (this._events = c(f, this._events, t, e, {
context:n,
listeners:this._listeners
}), this) :this;
}, u.stopListening = function(t, e, i) {
var r = this._listeningTo;
if (!r) return this;
for (var o = t ? [ t._listenId ] :n.keys(r), s = 0; s < o.length; s++) {
var a = r[o[s]];
if (!a) break;
a.obj.off(e, i, this);
}
return n.isEmpty(r) && (this._listeningTo = void 0), this;
};
var f = function(t, e, i, r) {
if (t) {
var o, s = 0, a = r.context, u = r.listeners;
if (e || i || a) {
for (var l = e ? [ e ] :n.keys(t); s < l.length; s++) {
e = l[s];
var c = t[e];
if (!c) break;
for (var h = [], d = 0; d < c.length; d++) {
var f = c[d];
i && i !== f.callback && i !== f.callback._callback || a && a !== f.context ? h.push(f) :(o = f.listening, 
o && 0 === --o.count && (delete u[o.id], delete o.listeningTo[o.objId]));
}
h.length ? t[e] = h :delete t[e];
}
return n.size(t) ? t :void 0;
}
for (var p = n.keys(u); s < p.length; s++) o = u[p[s]], delete u[o.id], delete o.listeningTo[o.objId];
}
};
u.once = function(t, e, i) {
var r = c(p, {}, t, e, n.bind(this.off, this));
return this.on(r, void 0, i);
}, u.listenToOnce = function(t, e, i) {
var r = c(p, {}, e, i, n.bind(this.stopListening, this, t));
return this.listenTo(t, r);
};
var p = function(t, e, i, r) {
if (i) {
var o = t[e] = n.once(function() {
r(e, o), i.apply(this, arguments);
});
o._callback = i;
}
return t;
};
u.trigger = function(t) {
if (!this._events) return this;
for (var e = Math.max(0, arguments.length - 1), n = Array(e), i = 0; e > i; i++) n[i] = arguments[i + 1];
return c(m, this._events, t, void 0, n), this;
};
var m = function(t, e, n, i) {
if (t) {
var r = t[e], o = t.all;
r && o && (o = o.slice()), r && g(r, i), o && g(o, [ e ].concat(i));
}
return t;
}, g = function(t, e) {
var n, i = -1, r = t.length, o = e[0], s = e[1], a = e[2];
switch (e.length) {
case 0:
for (;++i < r; ) (n = t[i]).callback.call(n.ctx);
return;

case 1:
for (;++i < r; ) (n = t[i]).callback.call(n.ctx, o);
return;

case 2:
for (;++i < r; ) (n = t[i]).callback.call(n.ctx, o, s);
return;

case 3:
for (;++i < r; ) (n = t[i]).callback.call(n.ctx, o, s, a);
return;

default:
for (;++i < r; ) (n = t[i]).callback.apply(n.ctx, e);
return;
}
};
u.bind = u.on, u.unbind = u.off, n.extend(e, u);
var v = e.Model = function(t, e) {
var i = t || {};
e || (e = {}), this.cid = n.uniqueId(this.cidPrefix), this.attributes = {}, e.collection && (this.collection = e.collection), 
e.parse && (i = this.parse(i, e) || {}), i = n.defaults({}, i, n.result(this, "defaults")), 
this.set(i, e), this.changed = {}, this.initialize.apply(this, arguments);
};
n.extend(v.prototype, u, {
changed:null,
validationError:null,
idAttribute:"id",
cidPrefix:"c",
initialize:function() {},
toJSON:function() {
return n.clone(this.attributes);
},
sync:function() {
return e.sync.apply(this, arguments);
},
get:function(t) {
return this.attributes[t];
},
escape:function(t) {
return n.escape(this.get(t));
},
has:function(t) {
return null != this.get(t);
},
matches:function(t) {
return !!n.iteratee(t, this)(this.attributes);
},
set:function(t, e, i) {
if (null == t) return this;
var r;
if ("object" == typeof t ? (r = t, i = e) :(r = {})[t] = e, i || (i = {}), !this._validate(r, i)) return !1;
var o = i.unset, s = i.silent, a = [], u = this._changing;
this._changing = !0, u || (this._previousAttributes = n.clone(this.attributes), 
this.changed = {});
var l = this.attributes, c = this.changed, h = this._previousAttributes;
this.idAttribute in r && (this.id = r[this.idAttribute]);
for (var d in r) e = r[d], n.isEqual(l[d], e) || a.push(d), n.isEqual(h[d], e) ? delete c[d] :c[d] = e, 
o ? delete l[d] :l[d] = e;
if (!s) {
a.length && (this._pending = i);
for (var f = 0; f < a.length; f++) this.trigger("change:" + a[f], this, l[a[f]], i);
}
if (u) return this;
if (!s) for (;this._pending; ) i = this._pending, this._pending = !1, this.trigger("change", this, i);
return this._pending = !1, this._changing = !1, this;
},
unset:function(t, e) {
return this.set(t, void 0, n.extend({}, e, {
unset:!0
}));
},
clear:function(t) {
var e = {};
for (var i in this.attributes) e[i] = void 0;
return this.set(e, n.extend({}, t, {
unset:!0
}));
},
hasChanged:function(t) {
return null == t ? !n.isEmpty(this.changed) :n.has(this.changed, t);
},
changedAttributes:function(t) {
if (!t) return this.hasChanged() ? n.clone(this.changed) :!1;
var e = this._changing ? this._previousAttributes :this.attributes, i = {};
for (var r in t) {
var o = t[r];
n.isEqual(e[r], o) || (i[r] = o);
}
return n.size(i) ? i :!1;
},
previous:function(t) {
return null != t && this._previousAttributes ? this._previousAttributes[t] :null;
},
previousAttributes:function() {
return n.clone(this._previousAttributes);
},
fetch:function(t) {
t = n.extend({
parse:!0
}, t);
var e = this, i = t.success;
return t.success = function(n) {
var r = t.parse ? e.parse(n, t) :n;
return e.set(r, t) ? (i && i.call(t.context, e, n, t), void e.trigger("sync", e, n, t)) :!1;
}, R(this, t), this.sync("read", this, t);
},
save:function(t, e, i) {
var r;
null == t || "object" == typeof t ? (r = t, i = e) :(r = {})[t] = e, i = n.extend({
validate:!0,
parse:!0
}, i);
var o = i.wait;
if (r && !o) {
if (!this.set(r, i)) return !1;
} else if (!this._validate(r, i)) return !1;
var s = this, a = i.success, u = this.attributes;
i.success = function(t) {
s.attributes = u;
var e = i.parse ? s.parse(t, i) :t;
return o && (e = n.extend({}, r, e)), e && !s.set(e, i) ? !1 :(a && a.call(i.context, s, t, i), 
void s.trigger("sync", s, t, i));
}, R(this, i), r && o && (this.attributes = n.extend({}, u, r));
var l = this.isNew() ? "create" :i.patch ? "patch" :"update";
"patch" !== l || i.attrs || (i.attrs = r);
var c = this.sync(l, this, i);
return this.attributes = u, c;
},
destroy:function(t) {
t = t ? n.clone(t) :{};
var e = this, i = t.success, r = t.wait, o = function() {
e.stopListening(), e.trigger("destroy", e, e.collection, t);
};
t.success = function(n) {
r && o(), i && i.call(t.context, e, n, t), e.isNew() || e.trigger("sync", e, n, t);
};
var s = !1;
return this.isNew() ? n.defer(t.success) :(R(this, t), s = this.sync("delete", this, t)), 
r || o(), s;
},
url:function() {
var t = n.result(this, "urlRoot") || n.result(this.collection, "url") || N();
if (this.isNew()) return t;
var e = this.get(this.idAttribute);
return t.replace(/[^\/]$/, "$&/") + encodeURIComponent(e);
},
parse:function(t) {
return t;
},
clone:function() {
return new this.constructor(this.attributes);
},
isNew:function() {
return !this.has(this.idAttribute);
},
isValid:function(t) {
return this._validate({}, n.defaults({
validate:!0
}, t));
},
_validate:function(t, e) {
if (!e.validate || !this.validate) return !0;
t = n.extend({}, this.attributes, t);
var i = this.validationError = this.validate(t, e) || null;
return i ? (this.trigger("invalid", this, i, n.extend(e, {
validationError:i
})), !1) :!0;
}
});
var y = {
keys:1,
values:1,
pairs:1,
invert:1,
pick:0,
omit:0,
chain:1,
isEmpty:1
};
a(v, y, "attributes");
var _ = e.Collection = function(t, e) {
e || (e = {}), e.model && (this.model = e.model), void 0 !== e.comparator && (this.comparator = e.comparator), 
this._reset(), this.initialize.apply(this, arguments), t && this.reset(t, n.extend({
silent:!0
}, e));
}, b = {
add:!0,
remove:!0,
merge:!0
}, w = {
add:!0,
remove:!1
};
n.extend(_.prototype, u, {
model:v,
initialize:function() {},
toJSON:function(t) {
return this.map(function(e) {
return e.toJSON(t);
});
},
sync:function() {
return e.sync.apply(this, arguments);
},
add:function(t, e) {
return this.set(t, n.extend({
merge:!1
}, e, w));
},
remove:function(t, e) {
e = n.extend({}, e);
var i = !n.isArray(t);
t = i ? [ t ] :n.clone(t);
var r = this._removeModels(t, e);
return !e.silent && r && this.trigger("update", this, e), i ? r[0] :r;
},
set:function(t, e) {
e = n.defaults({}, e, b), e.parse && !this._isModel(t) && (t = this.parse(t, e));
var i = !n.isArray(t);
t = i ? t ? [ t ] :[] :t.slice();
var r, o, s, a, u, l = e.at;
null != l && (l = +l), 0 > l && (l += this.length + 1);
for (var c = this.comparator && null == l && e.sort !== !1, h = n.isString(this.comparator) ? this.comparator :null, d = [], f = [], p = {}, m = e.add, g = e.merge, v = e.remove, y = !c && m && v ? [] :!1, _ = !1, w = 0; w < t.length; w++) {
if (s = t[w], a = this.get(s)) v && (p[a.cid] = !0), g && s !== a && (s = this._isModel(s) ? s.attributes :s, 
e.parse && (s = a.parse(s, e)), a.set(s, e), c && !u && a.hasChanged(h) && (u = !0)), 
t[w] = a; else if (m) {
if (o = t[w] = this._prepareModel(s, e), !o) continue;
d.push(o), this._addReference(o, e);
}
o = a || o, o && (r = this.modelId(o.attributes), !y || !o.isNew() && p[r] || (y.push(o), 
_ = _ || !this.models[w] || o.cid !== this.models[w].cid), p[r] = !0);
}
if (v) {
for (var w = 0; w < this.length; w++) p[(o = this.models[w]).cid] || f.push(o);
f.length && this._removeModels(f, e);
}
if (d.length || _) if (c && (u = !0), this.length += d.length, null != l) for (var w = 0; w < d.length; w++) this.models.splice(l + w, 0, d[w]); else {
y && (this.models.length = 0);
for (var x = y || d, w = 0; w < x.length; w++) this.models.push(x[w]);
}
if (u && this.sort({
silent:!0
}), !e.silent) {
for (var S = null != l ? n.clone(e) :e, w = 0; w < d.length; w++) null != l && (S.index = l + w), 
(o = d[w]).trigger("add", o, this, S);
(u || _) && this.trigger("sort", this, e), (d.length || f.length) && this.trigger("update", this, e);
}
return i ? t[0] :t;
},
reset:function(t, e) {
e = e ? n.clone(e) :{};
for (var i = 0; i < this.models.length; i++) this._removeReference(this.models[i], e);
return e.previousModels = this.models, this._reset(), t = this.add(t, n.extend({
silent:!0
}, e)), e.silent || this.trigger("reset", this, e), t;
},
push:function(t, e) {
return this.add(t, n.extend({
at:this.length
}, e));
},
pop:function(t) {
var e = this.at(this.length - 1);
return this.remove(e, t);
},
unshift:function(t, e) {
return this.add(t, n.extend({
at:0
}, e));
},
shift:function(t) {
var e = this.at(0);
return this.remove(e, t);
},
slice:function() {
return o.apply(this.models, arguments);
},
get:function(t) {
if (null == t) return void 0;
var e = this.modelId(this._isModel(t) ? t.attributes :t);
return this._byId[t] || this._byId[e] || this._byId[t.cid];
},
at:function(t) {
return 0 > t && (t += this.length), this.models[t];
},
where:function(t, e) {
var i = n.matches(t);
return this[e ? "find" :"filter"](function(t) {
return i(t.attributes);
});
},
findWhere:function(t) {
return this.where(t, !0);
},
sort:function(t) {
if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
return t || (t = {}), n.isString(this.comparator) || 1 === this.comparator.length ? this.models = this.sortBy(this.comparator, this) :this.models.sort(n.bind(this.comparator, this)), 
t.silent || this.trigger("sort", this, t), this;
},
pluck:function(t) {
return n.invoke(this.models, "get", t);
},
fetch:function(t) {
t = n.extend({
parse:!0
}, t);
var e = t.success, i = this;
return t.success = function(n) {
var r = t.reset ? "reset" :"set";
i[r](n, t), e && e.call(t.context, i, n, t), i.trigger("sync", i, n, t);
}, R(this, t), this.sync("read", this, t);
},
create:function(t, e) {
e = e ? n.clone(e) :{};
var i = e.wait;
if (t = this._prepareModel(t, e), !t) return !1;
i || this.add(t, e);
var r = this, o = e.success;
return e.success = function(t, e, n) {
i && r.add(t, n), o && o.call(n.context, t, e, n);
}, t.save(null, e), t;
},
parse:function(t) {
return t;
},
clone:function() {
return new this.constructor(this.models, {
model:this.model,
comparator:this.comparator
});
},
modelId:function(t) {
return t[this.model.prototype.idAttribute || "id"];
},
_reset:function() {
this.length = 0, this.models = [], this._byId = {};
},
_prepareModel:function(t, e) {
if (this._isModel(t)) return t.collection || (t.collection = this), t;
e = e ? n.clone(e) :{}, e.collection = this;
var i = new this.model(t, e);
return i.validationError ? (this.trigger("invalid", this, i.validationError, e), 
!1) :i;
},
_removeModels:function(t, e) {
for (var n = [], i = 0; i < t.length; i++) {
var r = this.get(t[i]);
if (r) {
var o = this.indexOf(r);
this.models.splice(o, 1), this.length--, e.silent || (e.index = o, r.trigger("remove", r, this, e)), 
n.push(r), this._removeReference(r, e);
}
}
return n.length ? n :!1;
},
_isModel:function(t) {
return t instanceof v;
},
_addReference:function(t) {
this._byId[t.cid] = t;
var e = this.modelId(t.attributes);
null != e && (this._byId[e] = t), t.on("all", this._onModelEvent, this);
},
_removeReference:function(t) {
delete this._byId[t.cid];
var e = this.modelId(t.attributes);
null != e && delete this._byId[e], this === t.collection && delete t.collection, 
t.off("all", this._onModelEvent, this);
},
_onModelEvent:function(t, e, n, i) {
if ("add" !== t && "remove" !== t || n === this) {
if ("destroy" === t && this.remove(e, i), "change" === t) {
var r = this.modelId(e.previousAttributes()), o = this.modelId(e.attributes);
r !== o && (null != r && delete this._byId[r], null != o && (this._byId[o] = e));
}
this.trigger.apply(this, arguments);
}
}
});
var x = {
forEach:3,
each:3,
map:3,
collect:3,
reduce:4,
foldl:4,
inject:4,
reduceRight:4,
foldr:4,
find:3,
detect:3,
filter:3,
select:3,
reject:3,
every:3,
all:3,
some:3,
any:3,
include:2,
contains:2,
invoke:0,
max:3,
min:3,
toArray:1,
size:1,
first:3,
head:3,
take:3,
initial:3,
rest:3,
tail:3,
drop:3,
last:3,
without:0,
difference:0,
indexOf:3,
shuffle:1,
lastIndexOf:3,
isEmpty:1,
chain:1,
sample:3,
partition:3
};
a(_, x, "models");
var S = [ "groupBy", "countBy", "sortBy", "indexBy" ];
n.each(S, function(t) {
n[t] && (_.prototype[t] = function(e, i) {
var r = n.isFunction(e) ? e :function(t) {
return t.get(e);
};
return n[t](this.models, r, i);
});
});
var k = e.View = function(t) {
this.cid = n.uniqueId("view"), n.extend(this, n.pick(t, T)), this._ensureElement(), 
this.initialize.apply(this, arguments);
}, C = /^(\S+)\s*(.*)$/, T = [ "model", "collection", "el", "id", "attributes", "className", "tagName", "events" ];
n.extend(k.prototype, u, {
tagName:"div",
$:function(t) {
return this.$el.find(t);
},
initialize:function() {},
render:function() {
return this;
},
remove:function() {
return this._removeElement(), this.stopListening(), this;
},
_removeElement:function() {
this.$el.remove();
},
setElement:function(t) {
return this.undelegateEvents(), this._setElement(t), this.delegateEvents(), this;
},
_setElement:function(t) {
this.$el = t instanceof e.$ ? t :e.$(t), this.el = this.$el[0];
},
delegateEvents:function(t) {
if (t || (t = n.result(this, "events")), !t) return this;
this.undelegateEvents();
for (var e in t) {
var i = t[e];
if (n.isFunction(i) || (i = this[i]), i) {
var r = e.match(C);
this.delegate(r[1], r[2], n.bind(i, this));
}
}
return this;
},
delegate:function(t, e, n) {
return this.$el.on(t + ".delegateEvents" + this.cid, e, n), this;
},
undelegateEvents:function() {
return this.$el && this.$el.off(".delegateEvents" + this.cid), this;
},
undelegate:function(t, e, n) {
return this.$el.off(t + ".delegateEvents" + this.cid, e, n), this;
},
_createElement:function(t) {
return document.createElement(t);
},
_ensureElement:function() {
if (this.el) this.setElement(n.result(this, "el")); else {
var t = n.extend({}, n.result(this, "attributes"));
this.id && (t.id = n.result(this, "id")), this.className && (t["class"] = n.result(this, "className")), 
this.setElement(this._createElement(n.result(this, "tagName"))), this._setAttributes(t);
}
},
_setAttributes:function(t) {
this.$el.attr(t);
}
}), e.sync = function(t, i, r) {
var o = E[t];
n.defaults(r || (r = {}), {
emulateHTTP:e.emulateHTTP,
emulateJSON:e.emulateJSON
});
var s = {
type:o,
dataType:"json"
};
if (r.url || (s.url = n.result(i, "url") || N()), null != r.data || !i || "create" !== t && "update" !== t && "patch" !== t || (s.contentType = "application/json", 
s.data = JSON.stringify(r.attrs || i.toJSON(r))), r.emulateJSON && (s.contentType = "application/x-www-form-urlencoded", 
s.data = s.data ? {
model:s.data
} :{}), r.emulateHTTP && ("PUT" === o || "DELETE" === o || "PATCH" === o)) {
s.type = "POST", r.emulateJSON && (s.data._method = o);
var a = r.beforeSend;
r.beforeSend = function(t) {
return t.setRequestHeader("X-HTTP-Method-Override", o), a ? a.apply(this, arguments) :void 0;
};
}
"GET" === s.type || r.emulateJSON || (s.processData = !1);
var u = r.error;
r.error = function(t, e, n) {
r.textStatus = e, r.errorThrown = n, u && u.call(r.context, t, e, n);
};
var l = r.xhr = e.ajax(n.extend(s, r));
return i.trigger("request", i, l, r), l;
};
var E = {
create:"POST",
update:"PUT",
patch:"PATCH",
"delete":"DELETE",
read:"GET"
};
e.ajax = function() {
return e.$.ajax.apply(e.$, arguments);
};
var D = e.Router = function(t) {
t || (t = {}), t.routes && (this.routes = t.routes), this._bindRoutes(), this.initialize.apply(this, arguments);
}, M = /\((.*?)\)/g, O = /(\(\?)?:\w+/g, I = /\*\w+/g, j = /[\-{}\[\]+?.,\\\^$|#\s]/g;
n.extend(D.prototype, u, {
initialize:function() {},
route:function(t, i, r) {
n.isRegExp(t) || (t = this._routeToRegExp(t)), n.isFunction(i) && (r = i, i = ""), 
r || (r = this[i]);
var o = this;
return e.history.route(t, function(n) {
var s = o._extractParameters(t, n);
o.execute(r, s, i) !== !1 && (o.trigger.apply(o, [ "route:" + i ].concat(s)), o.trigger("route", i, s), 
e.history.trigger("route", o, i, s));
}), this;
},
execute:function(t, e) {
t && t.apply(this, e);
},
navigate:function(t, n) {
return e.history.navigate(t, n), this;
},
_bindRoutes:function() {
if (this.routes) {
this.routes = n.result(this, "routes");
for (var t, e = n.keys(this.routes); null != (t = e.pop()); ) this.route(t, this.routes[t]);
}
},
_routeToRegExp:function(t) {
return t = t.replace(j, "\\$&").replace(M, "(?:$1)?").replace(O, function(t, e) {
return e ? t :"([^/?]+)";
}).replace(I, "([^?]*?)"), new RegExp("^" + t + "(?:\\?([\\s\\S]*))?$");
},
_extractParameters:function(t, e) {
var i = t.exec(e).slice(1);
return n.map(i, function(t, e) {
return e === i.length - 1 ? t || null :t ? decodeURIComponent(t) :null;
});
}
});
var A = e.History = function() {
this.handlers = [], n.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, 
this.history = window.history);
}, L = /^[#\/]|\s+$/g, z = /^\/+|\/+$/g, P = /#.*$/;
A.started = !1, n.extend(A.prototype, u, {
interval:50,
atRoot:function() {
var t = this.location.pathname.replace(/[^\/]$/, "$&/");
return t === this.root && !this.getSearch();
},
matchRoot:function() {
var t = this.decodeFragment(this.location.pathname), e = t.slice(0, this.root.length - 1) + "/";
return e === this.root;
},
decodeFragment:function(t) {
return decodeURI(t.replace(/%25/g, "%2525"));
},
getSearch:function() {
var t = this.location.href.replace(/#.*/, "").match(/\?.+/);
return t ? t[0] :"";
},
getHash:function(t) {
var e = (t || this).location.href.match(/#(.*)$/);
return e ? e[1] :"";
},
getPath:function() {
var t = this.decodeFragment(this.location.pathname + this.getSearch()).slice(this.root.length - 1);
return "/" === t.charAt(0) ? t.slice(1) :t;
},
getFragment:function(t) {
return null == t && (t = this._usePushState || !this._wantsHashChange ? this.getPath() :this.getHash()), 
t.replace(L, "");
},
start:function(t) {
if (A.started) throw new Error("Backbone.history has already been started");
if (A.started = !0, this.options = n.extend({
root:"/"
}, this.options, t), this.root = this.options.root, this._wantsHashChange = this.options.hashChange !== !1, 
this._hasHashChange = "onhashchange" in window, this._useHashChange = this._wantsHashChange && this._hasHashChange, 
this._wantsPushState = !!this.options.pushState, this._hasPushState = !(!this.history || !this.history.pushState), 
this._usePushState = this._wantsPushState && this._hasPushState, this.fragment = this.getFragment(), 
this.root = ("/" + this.root + "/").replace(z, "/"), this._wantsHashChange && this._wantsPushState) {
if (!this._hasPushState && !this.atRoot()) {
var e = this.root.slice(0, -1) || "/";
return this.location.replace(e + "#" + this.getPath()), !0;
}
this._hasPushState && this.atRoot() && this.navigate(this.getHash(), {
replace:!0
});
}
if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
this.iframe = document.createElement("iframe"), this.iframe.src = "javascript:0", 
this.iframe.style.display = "none", this.iframe.tabIndex = -1;
var i = document.body, r = i.insertBefore(this.iframe, i.firstChild).contentWindow;
r.document.open(), r.document.close(), r.location.hash = "#" + this.fragment;
}
var o = window.addEventListener || function(t, e) {
return attachEvent("on" + t, e);
};
return this._usePushState ? o("popstate", this.checkUrl, !1) :this._useHashChange && !this.iframe ? o("hashchange", this.checkUrl, !1) :this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), 
this.options.silent ? void 0 :this.loadUrl();
},
stop:function() {
var t = window.removeEventListener || function(t, e) {
return detachEvent("on" + t, e);
};
this._usePushState ? t("popstate", this.checkUrl, !1) :this._useHashChange && !this.iframe && t("hashchange", this.checkUrl, !1), 
this.iframe && (document.body.removeChild(this.iframe), this.iframe = null), this._checkUrlInterval && clearInterval(this._checkUrlInterval), 
A.started = !1;
},
route:function(t, e) {
this.handlers.unshift({
route:t,
callback:e
});
},
checkUrl:function() {
var t = this.getFragment();
return t === this.fragment && this.iframe && (t = this.getHash(this.iframe.contentWindow)), 
t === this.fragment ? !1 :(this.iframe && this.navigate(t), void this.loadUrl());
},
loadUrl:function(t) {
return this.matchRoot() ? (t = this.fragment = this.getFragment(t), n.any(this.handlers, function(e) {
return e.route.test(t) ? (e.callback(t), !0) :void 0;
})) :!1;
},
navigate:function(t, e) {
if (!A.started) return !1;
e && e !== !0 || (e = {
trigger:!!e
}), t = this.getFragment(t || "");
var n = this.root;
("" === t || "?" === t.charAt(0)) && (n = n.slice(0, -1) || "/");
var i = n + t;
if (t = this.decodeFragment(t.replace(P, "")), this.fragment !== t) {
if (this.fragment = t, this._usePushState) this.history[e.replace ? "replaceState" :"pushState"]({}, document.title, i); else {
if (!this._wantsHashChange) return this.location.assign(i);
if (this._updateHash(this.location, t, e.replace), this.iframe && t !== this.getHash(this.iframe.contentWindow)) {
var r = this.iframe.contentWindow;
e.replace || (r.document.open(), r.document.close()), this._updateHash(r.location, t, e.replace);
}
}
return e.trigger ? this.loadUrl(t) :void 0;
}
},
_updateHash:function(t, e, n) {
if (n) {
var i = t.href.replace(/(javascript:|#).*$/, "");
t.replace(i + "#" + e);
} else t.hash = "#" + e;
}
}), e.history = new A();
var H = function(t, e) {
var i, r = this;
i = t && n.has(t, "constructor") ? t.constructor :function() {
return r.apply(this, arguments);
}, n.extend(i, r, e);
var o = function() {
this.constructor = i;
};
return o.prototype = r.prototype, i.prototype = new o(), t && n.extend(i.prototype, t), 
i.__super__ = r.prototype, i;
};
v.extend = _.extend = D.extend = k.extend = A.extend = H;
var N = function() {
throw new Error('A "url" property or function must be specified');
}, R = function(t, e) {
var n = e.error;
e.error = function(i) {
n && n.call(e.context, t, i, e), t.trigger("error", t, i, e);
};
};
return e;
}), function(t, e) {
"object" == typeof exports && "undefined" != typeof module ? module.exports = e() :"function" == typeof define && define.amd ? define(e) :t.moment = e();
}(this, function() {
"use strict";
function t() {
return mr.apply(null, arguments);
}
function e(t) {
mr = t;
}
function n(t) {
return t instanceof Array || "[object Array]" === Object.prototype.toString.call(t);
}
function i(t) {
return null != t && "[object Object]" === Object.prototype.toString.call(t);
}
function r(t) {
var e;
for (e in t) return !1;
return !0;
}
function o(t) {
return "number" == typeof t || "[object Number]" === Object.prototype.toString.call(t);
}
function s(t) {
return t instanceof Date || "[object Date]" === Object.prototype.toString.call(t);
}
function a(t, e) {
var n, i = [];
for (n = 0; n < t.length; ++n) i.push(e(t[n], n));
return i;
}
function u(t, e) {
return Object.prototype.hasOwnProperty.call(t, e);
}
function l(t, e) {
for (var n in e) u(e, n) && (t[n] = e[n]);
return u(e, "toString") && (t.toString = e.toString), u(e, "valueOf") && (t.valueOf = e.valueOf), 
t;
}
function c(t, e, n, i) {
return yn(t, e, n, i, !0).utc();
}
function h() {
return {
empty:!1,
unusedTokens:[],
unusedInput:[],
overflow:-2,
charsLeftOver:0,
nullInput:!1,
invalidMonth:null,
invalidFormat:!1,
userInvalidated:!1,
iso:!1,
parsedDateParts:[],
meridiem:null
};
}
function d(t) {
return null == t._pf && (t._pf = h()), t._pf;
}
function f(t) {
if (null == t._isValid) {
var e = d(t), n = vr.call(e.parsedDateParts, function(t) {
return null != t;
}), i = !isNaN(t._d.getTime()) && e.overflow < 0 && !e.empty && !e.invalidMonth && !e.invalidWeekday && !e.nullInput && !e.invalidFormat && !e.userInvalidated && (!e.meridiem || e.meridiem && n);
if (t._strict && (i = i && 0 === e.charsLeftOver && 0 === e.unusedTokens.length && void 0 === e.bigHour), 
null != Object.isFrozen && Object.isFrozen(t)) return i;
t._isValid = i;
}
return t._isValid;
}
function p(t) {
var e = c(0/0);
return null != t ? l(d(e), t) :d(e).userInvalidated = !0, e;
}
function m(t) {
return void 0 === t;
}
function g(t, e) {
var n, i, r;
if (m(e._isAMomentObject) || (t._isAMomentObject = e._isAMomentObject), m(e._i) || (t._i = e._i), 
m(e._f) || (t._f = e._f), m(e._l) || (t._l = e._l), m(e._strict) || (t._strict = e._strict), 
m(e._tzm) || (t._tzm = e._tzm), m(e._isUTC) || (t._isUTC = e._isUTC), m(e._offset) || (t._offset = e._offset), 
m(e._pf) || (t._pf = d(e)), m(e._locale) || (t._locale = e._locale), yr.length > 0) for (n in yr) i = yr[n], 
r = e[i], m(r) || (t[i] = r);
return t;
}
function v(e) {
g(this, e), this._d = new Date(null != e._d ? e._d.getTime() :0/0), this.isValid() || (this._d = new Date(0/0)), 
_r === !1 && (_r = !0, t.updateOffset(this), _r = !1);
}
function y(t) {
return t instanceof v || null != t && null != t._isAMomentObject;
}
function _(t) {
return 0 > t ? Math.ceil(t) || 0 :Math.floor(t);
}
function b(t) {
var e = +t, n = 0;
return 0 !== e && isFinite(e) && (n = _(e)), n;
}
function w(t, e, n) {
var i, r = Math.min(t.length, e.length), o = Math.abs(t.length - e.length), s = 0;
for (i = 0; r > i; i++) (n && t[i] !== e[i] || !n && b(t[i]) !== b(e[i])) && s++;
return s + o;
}
function x(e) {
t.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e);
}
function S(e, n) {
var i = !0;
return l(function() {
if (null != t.deprecationHandler && t.deprecationHandler(null, e), i) {
for (var r, o = [], s = 0; s < arguments.length; s++) {
if (r = "", "object" == typeof arguments[s]) {
r += "\n[" + s + "] ";
for (var a in arguments[0]) r += a + ": " + arguments[0][a] + ", ";
r = r.slice(0, -2);
} else r = arguments[s];
o.push(r);
}
x(e + "\nArguments: " + Array.prototype.slice.call(o).join("") + "\n" + new Error().stack), 
i = !1;
}
return n.apply(this, arguments);
}, n);
}
function k(e, n) {
null != t.deprecationHandler && t.deprecationHandler(e, n), br[e] || (x(n), br[e] = !0);
}
function C(t) {
return t instanceof Function || "[object Function]" === Object.prototype.toString.call(t);
}
function T(t) {
var e, n;
for (n in t) e = t[n], C(e) ? this[n] = e :this["_" + n] = e;
this._config = t, this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source);
}
function E(t, e) {
var n, r = l({}, t);
for (n in e) u(e, n) && (i(t[n]) && i(e[n]) ? (r[n] = {}, l(r[n], t[n]), l(r[n], e[n])) :null != e[n] ? r[n] = e[n] :delete r[n]);
for (n in t) u(t, n) && !u(e, n) && i(t[n]) && (r[n] = l({}, r[n]));
return r;
}
function D(t) {
null != t && this.set(t);
}
function M(t, e, n) {
var i = this._calendar[t] || this._calendar.sameElse;
return C(i) ? i.call(e, n) :i;
}
function O(t) {
var e = this._longDateFormat[t], n = this._longDateFormat[t.toUpperCase()];
return e || !n ? e :(this._longDateFormat[t] = n.replace(/MMMM|MM|DD|dddd/g, function(t) {
return t.slice(1);
}), this._longDateFormat[t]);
}
function I() {
return this._invalidDate;
}
function j(t) {
return this._ordinal.replace("%d", t);
}
function A(t, e, n, i) {
var r = this._relativeTime[n];
return C(r) ? r(t, e, n, i) :r.replace(/%d/i, t);
}
function L(t, e) {
var n = this._relativeTime[t > 0 ? "future" :"past"];
return C(n) ? n(e) :n.replace(/%s/i, e);
}
function z(t, e) {
var n = t.toLowerCase();
Or[n] = Or[n + "s"] = Or[e] = t;
}
function P(t) {
return "string" == typeof t ? Or[t] || Or[t.toLowerCase()] :void 0;
}
function H(t) {
var e, n, i = {};
for (n in t) u(t, n) && (e = P(n), e && (i[e] = t[n]));
return i;
}
function N(t, e) {
Ir[t] = e;
}
function R(t) {
var e = [];
for (var n in t) e.push({
unit:n,
priority:Ir[n]
});
return e.sort(function(t, e) {
return t.priority - e.priority;
}), e;
}
function $(e, n) {
return function(i) {
return null != i ? (q(this, e, i), t.updateOffset(this, n), this) :F(this, e);
};
}
function F(t, e) {
return t.isValid() ? t._d["get" + (t._isUTC ? "UTC" :"") + e]() :0/0;
}
function q(t, e, n) {
t.isValid() && t._d["set" + (t._isUTC ? "UTC" :"") + e](n);
}
function U(t) {
return t = P(t), C(this[t]) ? this[t]() :this;
}
function B(t, e) {
if ("object" == typeof t) {
t = H(t);
for (var n = R(t), i = 0; i < n.length; i++) this[n[i].unit](t[n[i].unit]);
} else if (t = P(t), C(this[t])) return this[t](e);
return this;
}
function Y(t, e, n) {
var i = "" + Math.abs(t), r = e - i.length, o = t >= 0;
return (o ? n ? "+" :"" :"-") + Math.pow(10, Math.max(0, r)).toString().substr(1) + i;
}
function W(t, e, n, i) {
var r = i;
"string" == typeof i && (r = function() {
return this[i]();
}), t && (zr[t] = r), e && (zr[e[0]] = function() {
return Y(r.apply(this, arguments), e[1], e[2]);
}), n && (zr[n] = function() {
return this.localeData().ordinal(r.apply(this, arguments), t);
});
}
function V(t) {
return t.match(/\[[\s\S]/) ? t.replace(/^\[|\]$/g, "") :t.replace(/\\/g, "");
}
function G(t) {
var e, n, i = t.match(jr);
for (e = 0, n = i.length; n > e; e++) i[e] = zr[i[e]] ? zr[i[e]] :V(i[e]);
return function(e) {
var r, o = "";
for (r = 0; n > r; r++) o += i[r] instanceof Function ? i[r].call(e, t) :i[r];
return o;
};
}
function X(t, e) {
return t.isValid() ? (e = J(e, t.localeData()), Lr[e] = Lr[e] || G(e), Lr[e](t)) :t.localeData().invalidDate();
}
function J(t, e) {
function n(t) {
return e.longDateFormat(t) || t;
}
var i = 5;
for (Ar.lastIndex = 0; i >= 0 && Ar.test(t); ) t = t.replace(Ar, n), Ar.lastIndex = 0, 
i -= 1;
return t;
}
function Z(t, e, n) {
Qr[t] = C(e) ? e :function(t) {
return t && n ? n :e;
};
}
function K(t, e) {
return u(Qr, t) ? Qr[t](e._strict, e._locale) :new RegExp(Q(t));
}
function Q(t) {
return te(t.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(t, e, n, i, r) {
return e || n || i || r;
}));
}
function te(t) {
return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
function ee(t, e) {
var n, i = e;
for ("string" == typeof t && (t = [ t ]), o(e) && (i = function(t, n) {
n[e] = b(t);
}), n = 0; n < t.length; n++) to[t[n]] = i;
}
function ne(t, e) {
ee(t, function(t, n, i, r) {
i._w = i._w || {}, e(t, i._w, i, r);
});
}
function ie(t, e, n) {
null != e && u(to, t) && to[t](e, n._a, n, t);
}
function re(t, e) {
return new Date(Date.UTC(t, e + 1, 0)).getUTCDate();
}
function oe(t, e) {
return t ? n(this._months) ? this._months[t.month()] :this._months[(this._months.isFormat || ho).test(e) ? "format" :"standalone"][t.month()] :this._months;
}
function se(t, e) {
return t ? n(this._monthsShort) ? this._monthsShort[t.month()] :this._monthsShort[ho.test(e) ? "format" :"standalone"][t.month()] :this._monthsShort;
}
function ae(t, e, n) {
var i, r, o, s = t.toLocaleLowerCase();
if (!this._monthsParse) for (this._monthsParse = [], this._longMonthsParse = [], 
this._shortMonthsParse = [], i = 0; 12 > i; ++i) o = c([ 2e3, i ]), this._shortMonthsParse[i] = this.monthsShort(o, "").toLocaleLowerCase(), 
this._longMonthsParse[i] = this.months(o, "").toLocaleLowerCase();
return n ? "MMM" === e ? (r = co.call(this._shortMonthsParse, s), -1 !== r ? r :null) :(r = co.call(this._longMonthsParse, s), 
-1 !== r ? r :null) :"MMM" === e ? (r = co.call(this._shortMonthsParse, s), -1 !== r ? r :(r = co.call(this._longMonthsParse, s), 
-1 !== r ? r :null)) :(r = co.call(this._longMonthsParse, s), -1 !== r ? r :(r = co.call(this._shortMonthsParse, s), 
-1 !== r ? r :null));
}
function ue(t, e, n) {
var i, r, o;
if (this._monthsParseExact) return ae.call(this, t, e, n);
for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), 
i = 0; 12 > i; i++) {
if (r = c([ 2e3, i ]), n && !this._longMonthsParse[i] && (this._longMonthsParse[i] = new RegExp("^" + this.months(r, "").replace(".", "") + "$", "i"), 
this._shortMonthsParse[i] = new RegExp("^" + this.monthsShort(r, "").replace(".", "") + "$", "i")), 
n || this._monthsParse[i] || (o = "^" + this.months(r, "") + "|^" + this.monthsShort(r, ""), 
this._monthsParse[i] = new RegExp(o.replace(".", ""), "i")), n && "MMMM" === e && this._longMonthsParse[i].test(t)) return i;
if (n && "MMM" === e && this._shortMonthsParse[i].test(t)) return i;
if (!n && this._monthsParse[i].test(t)) return i;
}
}
function le(t, e) {
var n;
if (!t.isValid()) return t;
if ("string" == typeof e) if (/^\d+$/.test(e)) e = b(e); else if (e = t.localeData().monthsParse(e), 
!o(e)) return t;
return n = Math.min(t.date(), re(t.year(), e)), t._d["set" + (t._isUTC ? "UTC" :"") + "Month"](e, n), 
t;
}
function ce(e) {
return null != e ? (le(this, e), t.updateOffset(this, !0), this) :F(this, "Month");
}
function he() {
return re(this.year(), this.month());
}
function de(t) {
return this._monthsParseExact ? (u(this, "_monthsRegex") || pe.call(this), t ? this._monthsShortStrictRegex :this._monthsShortRegex) :(u(this, "_monthsShortRegex") || (this._monthsShortRegex = mo), 
this._monthsShortStrictRegex && t ? this._monthsShortStrictRegex :this._monthsShortRegex);
}
function fe(t) {
return this._monthsParseExact ? (u(this, "_monthsRegex") || pe.call(this), t ? this._monthsStrictRegex :this._monthsRegex) :(u(this, "_monthsRegex") || (this._monthsRegex = go), 
this._monthsStrictRegex && t ? this._monthsStrictRegex :this._monthsRegex);
}
function pe() {
function t(t, e) {
return e.length - t.length;
}
var e, n, i = [], r = [], o = [];
for (e = 0; 12 > e; e++) n = c([ 2e3, e ]), i.push(this.monthsShort(n, "")), r.push(this.months(n, "")), 
o.push(this.months(n, "")), o.push(this.monthsShort(n, ""));
for (i.sort(t), r.sort(t), o.sort(t), e = 0; 12 > e; e++) i[e] = te(i[e]), r[e] = te(r[e]);
for (e = 0; 24 > e; e++) o[e] = te(o[e]);
this._monthsRegex = new RegExp("^(" + o.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, 
this._monthsStrictRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + i.join("|") + ")", "i");
}
function me(t) {
return ge(t) ? 366 :365;
}
function ge(t) {
return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0;
}
function ve() {
return ge(this.year());
}
function ye(t, e, n, i, r, o, s) {
var a = new Date(t, e, n, i, r, o, s);
return 100 > t && t >= 0 && isFinite(a.getFullYear()) && a.setFullYear(t), a;
}
function _e(t) {
var e = new Date(Date.UTC.apply(null, arguments));
return 100 > t && t >= 0 && isFinite(e.getUTCFullYear()) && e.setUTCFullYear(t), 
e;
}
function be(t, e, n) {
var i = 7 + e - n, r = (7 + _e(t, 0, i).getUTCDay() - e) % 7;
return -r + i - 1;
}
function we(t, e, n, i, r) {
var o, s, a = (7 + n - i) % 7, u = be(t, i, r), l = 1 + 7 * (e - 1) + a + u;
return 0 >= l ? (o = t - 1, s = me(o) + l) :l > me(t) ? (o = t + 1, s = l - me(t)) :(o = t, 
s = l), {
year:o,
dayOfYear:s
};
}
function xe(t, e, n) {
var i, r, o = be(t.year(), e, n), s = Math.floor((t.dayOfYear() - o - 1) / 7) + 1;
return 1 > s ? (r = t.year() - 1, i = s + Se(r, e, n)) :s > Se(t.year(), e, n) ? (i = s - Se(t.year(), e, n), 
r = t.year() + 1) :(r = t.year(), i = s), {
week:i,
year:r
};
}
function Se(t, e, n) {
var i = be(t, e, n), r = be(t + 1, e, n);
return (me(t) - i + r) / 7;
}
function ke(t) {
return xe(t, this._week.dow, this._week.doy).week;
}
function Ce() {
return this._week.dow;
}
function Te() {
return this._week.doy;
}
function Ee(t) {
var e = this.localeData().week(this);
return null == t ? e :this.add(7 * (t - e), "d");
}
function De(t) {
var e = xe(this, 1, 4).week;
return null == t ? e :this.add(7 * (t - e), "d");
}
function Me(t, e) {
return "string" != typeof t ? t :isNaN(t) ? (t = e.weekdaysParse(t), "number" == typeof t ? t :null) :parseInt(t, 10);
}
function Oe(t, e) {
return "string" == typeof t ? e.weekdaysParse(t) % 7 || 7 :isNaN(t) ? null :t;
}
function Ie(t, e) {
return t ? n(this._weekdays) ? this._weekdays[t.day()] :this._weekdays[this._weekdays.isFormat.test(e) ? "format" :"standalone"][t.day()] :this._weekdays;
}
function je(t) {
return t ? this._weekdaysShort[t.day()] :this._weekdaysShort;
}
function Ae(t) {
return t ? this._weekdaysMin[t.day()] :this._weekdaysMin;
}
function Le(t, e, n) {
var i, r, o, s = t.toLocaleLowerCase();
if (!this._weekdaysParse) for (this._weekdaysParse = [], this._shortWeekdaysParse = [], 
this._minWeekdaysParse = [], i = 0; 7 > i; ++i) o = c([ 2e3, 1 ]).day(i), this._minWeekdaysParse[i] = this.weekdaysMin(o, "").toLocaleLowerCase(), 
this._shortWeekdaysParse[i] = this.weekdaysShort(o, "").toLocaleLowerCase(), this._weekdaysParse[i] = this.weekdays(o, "").toLocaleLowerCase();
return n ? "dddd" === e ? (r = co.call(this._weekdaysParse, s), -1 !== r ? r :null) :"ddd" === e ? (r = co.call(this._shortWeekdaysParse, s), 
-1 !== r ? r :null) :(r = co.call(this._minWeekdaysParse, s), -1 !== r ? r :null) :"dddd" === e ? (r = co.call(this._weekdaysParse, s), 
-1 !== r ? r :(r = co.call(this._shortWeekdaysParse, s), -1 !== r ? r :(r = co.call(this._minWeekdaysParse, s), 
-1 !== r ? r :null))) :"ddd" === e ? (r = co.call(this._shortWeekdaysParse, s), 
-1 !== r ? r :(r = co.call(this._weekdaysParse, s), -1 !== r ? r :(r = co.call(this._minWeekdaysParse, s), 
-1 !== r ? r :null))) :(r = co.call(this._minWeekdaysParse, s), -1 !== r ? r :(r = co.call(this._weekdaysParse, s), 
-1 !== r ? r :(r = co.call(this._shortWeekdaysParse, s), -1 !== r ? r :null)));
}
function ze(t, e, n) {
var i, r, o;
if (this._weekdaysParseExact) return Le.call(this, t, e, n);
for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], 
this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), i = 0; 7 > i; i++) {
if (r = c([ 2e3, 1 ]).day(i), n && !this._fullWeekdaysParse[i] && (this._fullWeekdaysParse[i] = new RegExp("^" + this.weekdays(r, "").replace(".", ".?") + "$", "i"), 
this._shortWeekdaysParse[i] = new RegExp("^" + this.weekdaysShort(r, "").replace(".", ".?") + "$", "i"), 
this._minWeekdaysParse[i] = new RegExp("^" + this.weekdaysMin(r, "").replace(".", ".?") + "$", "i")), 
this._weekdaysParse[i] || (o = "^" + this.weekdays(r, "") + "|^" + this.weekdaysShort(r, "") + "|^" + this.weekdaysMin(r, ""), 
this._weekdaysParse[i] = new RegExp(o.replace(".", ""), "i")), n && "dddd" === e && this._fullWeekdaysParse[i].test(t)) return i;
if (n && "ddd" === e && this._shortWeekdaysParse[i].test(t)) return i;
if (n && "dd" === e && this._minWeekdaysParse[i].test(t)) return i;
if (!n && this._weekdaysParse[i].test(t)) return i;
}
}
function Pe(t) {
if (!this.isValid()) return null != t ? this :0/0;
var e = this._isUTC ? this._d.getUTCDay() :this._d.getDay();
return null != t ? (t = Me(t, this.localeData()), this.add(t - e, "d")) :e;
}
function He(t) {
if (!this.isValid()) return null != t ? this :0/0;
var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
return null == t ? e :this.add(t - e, "d");
}
function Ne(t) {
if (!this.isValid()) return null != t ? this :0/0;
if (null != t) {
var e = Oe(t, this.localeData());
return this.day(this.day() % 7 ? e :e - 7);
}
return this.day() || 7;
}
function Re(t) {
return this._weekdaysParseExact ? (u(this, "_weekdaysRegex") || qe.call(this), t ? this._weekdaysStrictRegex :this._weekdaysRegex) :(u(this, "_weekdaysRegex") || (this._weekdaysRegex = xo), 
this._weekdaysStrictRegex && t ? this._weekdaysStrictRegex :this._weekdaysRegex);
}
function $e(t) {
return this._weekdaysParseExact ? (u(this, "_weekdaysRegex") || qe.call(this), t ? this._weekdaysShortStrictRegex :this._weekdaysShortRegex) :(u(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = So), 
this._weekdaysShortStrictRegex && t ? this._weekdaysShortStrictRegex :this._weekdaysShortRegex);
}
function Fe(t) {
return this._weekdaysParseExact ? (u(this, "_weekdaysRegex") || qe.call(this), t ? this._weekdaysMinStrictRegex :this._weekdaysMinRegex) :(u(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = ko), 
this._weekdaysMinStrictRegex && t ? this._weekdaysMinStrictRegex :this._weekdaysMinRegex);
}
function qe() {
function t(t, e) {
return e.length - t.length;
}
var e, n, i, r, o, s = [], a = [], u = [], l = [];
for (e = 0; 7 > e; e++) n = c([ 2e3, 1 ]).day(e), i = this.weekdaysMin(n, ""), r = this.weekdaysShort(n, ""), 
o = this.weekdays(n, ""), s.push(i), a.push(r), u.push(o), l.push(i), l.push(r), 
l.push(o);
for (s.sort(t), a.sort(t), u.sort(t), l.sort(t), e = 0; 7 > e; e++) a[e] = te(a[e]), 
u[e] = te(u[e]), l[e] = te(l[e]);
this._weekdaysRegex = new RegExp("^(" + l.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, 
this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + u.join("|") + ")", "i"), 
this._weekdaysShortStrictRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + s.join("|") + ")", "i");
}
function Ue() {
return this.hours() % 12 || 12;
}
function Be() {
return this.hours() || 24;
}
function Ye(t, e) {
W(t, 0, 0, function() {
return this.localeData().meridiem(this.hours(), this.minutes(), e);
});
}
function We(t, e) {
return e._meridiemParse;
}
function Ve(t) {
return "p" === (t + "").toLowerCase().charAt(0);
}
function Ge(t, e, n) {
return t > 11 ? n ? "pm" :"PM" :n ? "am" :"AM";
}
function Xe(t) {
return t ? t.toLowerCase().replace("_", "-") :t;
}
function Je(t) {
for (var e, n, i, r, o = 0; o < t.length; ) {
for (r = Xe(t[o]).split("-"), e = r.length, n = Xe(t[o + 1]), n = n ? n.split("-") :null; e > 0; ) {
if (i = Ze(r.slice(0, e).join("-"))) return i;
if (n && n.length >= e && w(r, n, !0) >= e - 1) break;
e--;
}
o++;
}
return null;
}
function Ze(t) {
var e = null;
if (!Mo[t] && "undefined" != typeof module && module && module.exports) try {
e = Co._abbr, require("./locale/" + t), Ke(e);
} catch (n) {}
return Mo[t];
}
function Ke(t, e) {
var n;
return t && (n = m(e) ? en(t) :Qe(t, e), n && (Co = n)), Co._abbr;
}
function Qe(t, e) {
if (null !== e) {
var n = Do;
if (e.abbr = t, null != Mo[t]) k("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), 
n = Mo[t]._config; else if (null != e.parentLocale) {
if (null == Mo[e.parentLocale]) return Oo[e.parentLocale] || (Oo[e.parentLocale] = []), 
Oo[e.parentLocale].push({
name:t,
config:e
}), null;
n = Mo[e.parentLocale]._config;
}
return Mo[t] = new D(E(n, e)), Oo[t] && Oo[t].forEach(function(t) {
Qe(t.name, t.config);
}), Ke(t), Mo[t];
}
return delete Mo[t], null;
}
function tn(t, e) {
if (null != e) {
var n, i = Do;
null != Mo[t] && (i = Mo[t]._config), e = E(i, e), n = new D(e), n.parentLocale = Mo[t], 
Mo[t] = n, Ke(t);
} else null != Mo[t] && (null != Mo[t].parentLocale ? Mo[t] = Mo[t].parentLocale :null != Mo[t] && delete Mo[t]);
return Mo[t];
}
function en(t) {
var e;
if (t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t) return Co;
if (!n(t)) {
if (e = Ze(t)) return e;
t = [ t ];
}
return Je(t);
}
function nn() {
return Sr(Mo);
}
function rn(t) {
var e, n = t._a;
return n && -2 === d(t).overflow && (e = n[no] < 0 || n[no] > 11 ? no :n[io] < 1 || n[io] > re(n[eo], n[no]) ? io :n[ro] < 0 || n[ro] > 24 || 24 === n[ro] && (0 !== n[oo] || 0 !== n[so] || 0 !== n[ao]) ? ro :n[oo] < 0 || n[oo] > 59 ? oo :n[so] < 0 || n[so] > 59 ? so :n[ao] < 0 || n[ao] > 999 ? ao :-1, 
d(t)._overflowDayOfYear && (eo > e || e > io) && (e = io), d(t)._overflowWeeks && -1 === e && (e = uo), 
d(t)._overflowWeekday && -1 === e && (e = lo), d(t).overflow = e), t;
}
function on(t) {
var e, n, i, r, o, s, a = t._i, u = Io.exec(a) || jo.exec(a);
if (u) {
for (d(t).iso = !0, e = 0, n = Lo.length; n > e; e++) if (Lo[e][1].exec(u[1])) {
r = Lo[e][0], i = Lo[e][2] !== !1;
break;
}
if (null == r) return void (t._isValid = !1);
if (u[3]) {
for (e = 0, n = zo.length; n > e; e++) if (zo[e][1].exec(u[3])) {
o = (u[2] || " ") + zo[e][0];
break;
}
if (null == o) return void (t._isValid = !1);
}
if (!i && null != o) return void (t._isValid = !1);
if (u[4]) {
if (!Ao.exec(u[4])) return void (t._isValid = !1);
s = "Z";
}
t._f = r + (o || "") + (s || ""), hn(t);
} else t._isValid = !1;
}
function sn(e) {
var n = Po.exec(e._i);
return null !== n ? void (e._d = new Date(+n[1])) :(on(e), void (e._isValid === !1 && (delete e._isValid, 
t.createFromInputFallback(e))));
}
function an(t, e, n) {
return null != t ? t :null != e ? e :n;
}
function un(e) {
var n = new Date(t.now());
return e._useUTC ? [ n.getUTCFullYear(), n.getUTCMonth(), n.getUTCDate() ] :[ n.getFullYear(), n.getMonth(), n.getDate() ];
}
function ln(t) {
var e, n, i, r, o = [];
if (!t._d) {
for (i = un(t), t._w && null == t._a[io] && null == t._a[no] && cn(t), t._dayOfYear && (r = an(t._a[eo], i[eo]), 
t._dayOfYear > me(r) && (d(t)._overflowDayOfYear = !0), n = _e(r, 0, t._dayOfYear), 
t._a[no] = n.getUTCMonth(), t._a[io] = n.getUTCDate()), e = 0; 3 > e && null == t._a[e]; ++e) t._a[e] = o[e] = i[e];
for (;7 > e; e++) t._a[e] = o[e] = null == t._a[e] ? 2 === e ? 1 :0 :t._a[e];
24 === t._a[ro] && 0 === t._a[oo] && 0 === t._a[so] && 0 === t._a[ao] && (t._nextDay = !0, 
t._a[ro] = 0), t._d = (t._useUTC ? _e :ye).apply(null, o), null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm), 
t._nextDay && (t._a[ro] = 24);
}
}
function cn(t) {
var e, n, i, r, o, s, a, u;
if (e = t._w, null != e.GG || null != e.W || null != e.E) o = 1, s = 4, n = an(e.GG, t._a[eo], xe(_n(), 1, 4).year), 
i = an(e.W, 1), r = an(e.E, 1), (1 > r || r > 7) && (u = !0); else {
o = t._locale._week.dow, s = t._locale._week.doy;
var l = xe(_n(), o, s);
n = an(e.gg, t._a[eo], l.year), i = an(e.w, l.week), null != e.d ? (r = e.d, (0 > r || r > 6) && (u = !0)) :null != e.e ? (r = e.e + o, 
(e.e < 0 || e.e > 6) && (u = !0)) :r = o;
}
1 > i || i > Se(n, o, s) ? d(t)._overflowWeeks = !0 :null != u ? d(t)._overflowWeekday = !0 :(a = we(n, i, r, o, s), 
t._a[eo] = a.year, t._dayOfYear = a.dayOfYear);
}
function hn(e) {
if (e._f === t.ISO_8601) return void on(e);
e._a = [], d(e).empty = !0;
var n, i, r, o, s, a = "" + e._i, u = a.length, l = 0;
for (r = J(e._f, e._locale).match(jr) || [], n = 0; n < r.length; n++) o = r[n], 
i = (a.match(K(o, e)) || [])[0], i && (s = a.substr(0, a.indexOf(i)), s.length > 0 && d(e).unusedInput.push(s), 
a = a.slice(a.indexOf(i) + i.length), l += i.length), zr[o] ? (i ? d(e).empty = !1 :d(e).unusedTokens.push(o), 
ie(o, i, e)) :e._strict && !i && d(e).unusedTokens.push(o);
d(e).charsLeftOver = u - l, a.length > 0 && d(e).unusedInput.push(a), e._a[ro] <= 12 && d(e).bigHour === !0 && e._a[ro] > 0 && (d(e).bigHour = void 0), 
d(e).parsedDateParts = e._a.slice(0), d(e).meridiem = e._meridiem, e._a[ro] = dn(e._locale, e._a[ro], e._meridiem), 
ln(e), rn(e);
}
function dn(t, e, n) {
var i;
return null == n ? e :null != t.meridiemHour ? t.meridiemHour(e, n) :null != t.isPM ? (i = t.isPM(n), 
i && 12 > e && (e += 12), i || 12 !== e || (e = 0), e) :e;
}
function fn(t) {
var e, n, i, r, o;
if (0 === t._f.length) return d(t).invalidFormat = !0, void (t._d = new Date(0/0));
for (r = 0; r < t._f.length; r++) o = 0, e = g({}, t), null != t._useUTC && (e._useUTC = t._useUTC), 
e._f = t._f[r], hn(e), f(e) && (o += d(e).charsLeftOver, o += 10 * d(e).unusedTokens.length, 
d(e).score = o, (null == i || i > o) && (i = o, n = e));
l(t, n || e);
}
function pn(t) {
if (!t._d) {
var e = H(t._i);
t._a = a([ e.year, e.month, e.day || e.date, e.hour, e.minute, e.second, e.millisecond ], function(t) {
return t && parseInt(t, 10);
}), ln(t);
}
}
function mn(t) {
var e = new v(rn(gn(t)));
return e._nextDay && (e.add(1, "d"), e._nextDay = void 0), e;
}
function gn(t) {
var e = t._i, i = t._f;
return t._locale = t._locale || en(t._l), null === e || void 0 === i && "" === e ? p({
nullInput:!0
}) :("string" == typeof e && (t._i = e = t._locale.preparse(e)), y(e) ? new v(rn(e)) :(s(e) ? t._d = e :n(i) ? fn(t) :i ? hn(t) :vn(t), 
f(t) || (t._d = null), t));
}
function vn(e) {
var i = e._i;
void 0 === i ? e._d = new Date(t.now()) :s(i) ? e._d = new Date(i.valueOf()) :"string" == typeof i ? sn(e) :n(i) ? (e._a = a(i.slice(0), function(t) {
return parseInt(t, 10);
}), ln(e)) :"object" == typeof i ? pn(e) :o(i) ? e._d = new Date(i) :t.createFromInputFallback(e);
}
function yn(t, e, o, s, a) {
var u = {};
return (o === !0 || o === !1) && (s = o, o = void 0), (i(t) && r(t) || n(t) && 0 === t.length) && (t = void 0), 
u._isAMomentObject = !0, u._useUTC = u._isUTC = a, u._l = o, u._i = t, u._f = e, 
u._strict = s, mn(u);
}
function _n(t, e, n, i) {
return yn(t, e, n, i, !1);
}
function bn(t, e) {
var i, r;
if (1 === e.length && n(e[0]) && (e = e[0]), !e.length) return _n();
for (i = e[0], r = 1; r < e.length; ++r) (!e[r].isValid() || e[r][t](i)) && (i = e[r]);
return i;
}
function wn() {
var t = [].slice.call(arguments, 0);
return bn("isBefore", t);
}
function xn() {
var t = [].slice.call(arguments, 0);
return bn("isAfter", t);
}
function Sn(t) {
var e = H(t), n = e.year || 0, i = e.quarter || 0, r = e.month || 0, o = e.week || 0, s = e.day || 0, a = e.hour || 0, u = e.minute || 0, l = e.second || 0, c = e.millisecond || 0;
this._milliseconds = +c + 1e3 * l + 6e4 * u + 1e3 * a * 60 * 60, this._days = +s + 7 * o, 
this._months = +r + 3 * i + 12 * n, this._data = {}, this._locale = en(), this._bubble();
}
function kn(t) {
return t instanceof Sn;
}
function Cn(t) {
return 0 > t ? -1 * Math.round(-1 * t) :Math.round(t);
}
function Tn(t, e) {
W(t, 0, 0, function() {
var t = this.utcOffset(), n = "+";
return 0 > t && (t = -t, n = "-"), n + Y(~~(t / 60), 2) + e + Y(~~t % 60, 2);
});
}
function En(t, e) {
var n = (e || "").match(t);
if (null === n) return null;
var i = n[n.length - 1] || [], r = (i + "").match($o) || [ "-", 0, 0 ], o = +(60 * r[1]) + b(r[2]);
return 0 === o ? 0 :"+" === r[0] ? o :-o;
}
function Dn(e, n) {
var i, r;
return n._isUTC ? (i = n.clone(), r = (y(e) || s(e) ? e.valueOf() :_n(e).valueOf()) - i.valueOf(), 
i._d.setTime(i._d.valueOf() + r), t.updateOffset(i, !1), i) :_n(e).local();
}
function Mn(t) {
return 15 * -Math.round(t._d.getTimezoneOffset() / 15);
}
function On(e, n) {
var i, r = this._offset || 0;
if (!this.isValid()) return null != e ? this :0/0;
if (null != e) {
if ("string" == typeof e) {
if (e = En(Jr, e), null === e) return this;
} else Math.abs(e) < 16 && (e = 60 * e);
return !this._isUTC && n && (i = Mn(this)), this._offset = e, this._isUTC = !0, 
null != i && this.add(i, "m"), r !== e && (!n || this._changeInProgress ? Wn(this, Fn(e - r, "m"), 1, !1) :this._changeInProgress || (this._changeInProgress = !0, 
t.updateOffset(this, !0), this._changeInProgress = null)), this;
}
return this._isUTC ? r :Mn(this);
}
function In(t, e) {
return null != t ? ("string" != typeof t && (t = -t), this.utcOffset(t, e), this) :-this.utcOffset();
}
function jn(t) {
return this.utcOffset(0, t);
}
function An(t) {
return this._isUTC && (this.utcOffset(0, t), this._isUTC = !1, t && this.subtract(Mn(this), "m")), 
this;
}
function Ln() {
if (null != this._tzm) this.utcOffset(this._tzm); else if ("string" == typeof this._i) {
var t = En(Xr, this._i);
null != t ? this.utcOffset(t) :this.utcOffset(0, !0);
}
return this;
}
function zn(t) {
return this.isValid() ? (t = t ? _n(t).utcOffset() :0, (this.utcOffset() - t) % 60 === 0) :!1;
}
function Pn() {
return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset();
}
function Hn() {
if (!m(this._isDSTShifted)) return this._isDSTShifted;
var t = {};
if (g(t, this), t = gn(t), t._a) {
var e = t._isUTC ? c(t._a) :_n(t._a);
this._isDSTShifted = this.isValid() && w(t._a, e.toArray()) > 0;
} else this._isDSTShifted = !1;
return this._isDSTShifted;
}
function Nn() {
return this.isValid() ? !this._isUTC :!1;
}
function Rn() {
return this.isValid() ? this._isUTC :!1;
}
function $n() {
return this.isValid() ? this._isUTC && 0 === this._offset :!1;
}
function Fn(t, e) {
var n, i, r, s = t, a = null;
return kn(t) ? s = {
ms:t._milliseconds,
d:t._days,
M:t._months
} :o(t) ? (s = {}, e ? s[e] = t :s.milliseconds = t) :(a = Fo.exec(t)) ? (n = "-" === a[1] ? -1 :1, 
s = {
y:0,
d:b(a[io]) * n,
h:b(a[ro]) * n,
m:b(a[oo]) * n,
s:b(a[so]) * n,
ms:b(Cn(1e3 * a[ao])) * n
}) :(a = qo.exec(t)) ? (n = "-" === a[1] ? -1 :1, s = {
y:qn(a[2], n),
M:qn(a[3], n),
w:qn(a[4], n),
d:qn(a[5], n),
h:qn(a[6], n),
m:qn(a[7], n),
s:qn(a[8], n)
}) :null == s ? s = {} :"object" == typeof s && ("from" in s || "to" in s) && (r = Bn(_n(s.from), _n(s.to)), 
s = {}, s.ms = r.milliseconds, s.M = r.months), i = new Sn(s), kn(t) && u(t, "_locale") && (i._locale = t._locale), 
i;
}
function qn(t, e) {
var n = t && parseFloat(t.replace(",", "."));
return (isNaN(n) ? 0 :n) * e;
}
function Un(t, e) {
var n = {
milliseconds:0,
months:0
};
return n.months = e.month() - t.month() + 12 * (e.year() - t.year()), t.clone().add(n.months, "M").isAfter(e) && --n.months, 
n.milliseconds = +e - +t.clone().add(n.months, "M"), n;
}
function Bn(t, e) {
var n;
return t.isValid() && e.isValid() ? (e = Dn(e, t), t.isBefore(e) ? n = Un(t, e) :(n = Un(e, t), 
n.milliseconds = -n.milliseconds, n.months = -n.months), n) :{
milliseconds:0,
months:0
};
}
function Yn(t, e) {
return function(n, i) {
var r, o;
return null === i || isNaN(+i) || (k(e, "moment()." + e + "(period, number) is deprecated. Please use moment()." + e + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), 
o = n, n = i, i = o), n = "string" == typeof n ? +n :n, r = Fn(n, i), Wn(this, r, t), 
this;
};
}
function Wn(e, n, i, r) {
var o = n._milliseconds, s = Cn(n._days), a = Cn(n._months);
e.isValid() && (r = null == r ? !0 :r, o && e._d.setTime(e._d.valueOf() + o * i), 
s && q(e, "Date", F(e, "Date") + s * i), a && le(e, F(e, "Month") + a * i), r && t.updateOffset(e, s || a));
}
function Vn(t, e) {
var n = t.diff(e, "days", !0);
return -6 > n ? "sameElse" :-1 > n ? "lastWeek" :0 > n ? "lastDay" :1 > n ? "sameDay" :2 > n ? "nextDay" :7 > n ? "nextWeek" :"sameElse";
}
function Gn(e, n) {
var i = e || _n(), r = Dn(i, this).startOf("day"), o = t.calendarFormat(this, r) || "sameElse", s = n && (C(n[o]) ? n[o].call(this, i) :n[o]);
return this.format(s || this.localeData().calendar(o, this, _n(i)));
}
function Xn() {
return new v(this);
}
function Jn(t, e) {
var n = y(t) ? t :_n(t);
return this.isValid() && n.isValid() ? (e = P(m(e) ? "millisecond" :e), "millisecond" === e ? this.valueOf() > n.valueOf() :n.valueOf() < this.clone().startOf(e).valueOf()) :!1;
}
function Zn(t, e) {
var n = y(t) ? t :_n(t);
return this.isValid() && n.isValid() ? (e = P(m(e) ? "millisecond" :e), "millisecond" === e ? this.valueOf() < n.valueOf() :this.clone().endOf(e).valueOf() < n.valueOf()) :!1;
}
function Kn(t, e, n, i) {
return i = i || "()", ("(" === i[0] ? this.isAfter(t, n) :!this.isBefore(t, n)) && (")" === i[1] ? this.isBefore(e, n) :!this.isAfter(e, n));
}
function Qn(t, e) {
var n, i = y(t) ? t :_n(t);
return this.isValid() && i.isValid() ? (e = P(e || "millisecond"), "millisecond" === e ? this.valueOf() === i.valueOf() :(n = i.valueOf(), 
this.clone().startOf(e).valueOf() <= n && n <= this.clone().endOf(e).valueOf())) :!1;
}
function ti(t, e) {
return this.isSame(t, e) || this.isAfter(t, e);
}
function ei(t, e) {
return this.isSame(t, e) || this.isBefore(t, e);
}
function ni(t, e, n) {
var i, r, o, s;
return this.isValid() ? (i = Dn(t, this), i.isValid() ? (r = 6e4 * (i.utcOffset() - this.utcOffset()), 
e = P(e), "year" === e || "month" === e || "quarter" === e ? (s = ii(this, i), "quarter" === e ? s /= 3 :"year" === e && (s /= 12)) :(o = this - i, 
s = "second" === e ? o / 1e3 :"minute" === e ? o / 6e4 :"hour" === e ? o / 36e5 :"day" === e ? (o - r) / 864e5 :"week" === e ? (o - r) / 6048e5 :o), 
n ? s :_(s)) :0/0) :0/0;
}
function ii(t, e) {
var n, i, r = 12 * (e.year() - t.year()) + (e.month() - t.month()), o = t.clone().add(r, "months");
return 0 > e - o ? (n = t.clone().add(r - 1, "months"), i = (e - o) / (o - n)) :(n = t.clone().add(r + 1, "months"), 
i = (e - o) / (n - o)), -(r + i) || 0;
}
function ri() {
return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
}
function oi() {
var t = this.clone().utc();
return 0 < t.year() && t.year() <= 9999 ? C(Date.prototype.toISOString) ? this.toDate().toISOString() :X(t, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") :X(t, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
}
function si() {
if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
var t = "moment", e = "";
this.isLocal() || (t = 0 === this.utcOffset() ? "moment.utc" :"moment.parseZone", 
e = "Z");
var n = "[" + t + '("]', i = 0 < this.year() && this.year() <= 9999 ? "YYYY" :"YYYYYY", r = "-MM-DD[T]HH:mm:ss.SSS", o = e + '[")]';
return this.format(n + i + r + o);
}
function ai(e) {
e || (e = this.isUtc() ? t.defaultFormatUtc :t.defaultFormat);
var n = X(this, e);
return this.localeData().postformat(n);
}
function ui(t, e) {
return this.isValid() && (y(t) && t.isValid() || _n(t).isValid()) ? Fn({
to:this,
from:t
}).locale(this.locale()).humanize(!e) :this.localeData().invalidDate();
}
function li(t) {
return this.from(_n(), t);
}
function ci(t, e) {
return this.isValid() && (y(t) && t.isValid() || _n(t).isValid()) ? Fn({
from:this,
to:t
}).locale(this.locale()).humanize(!e) :this.localeData().invalidDate();
}
function hi(t) {
return this.to(_n(), t);
}
function di(t) {
var e;
return void 0 === t ? this._locale._abbr :(e = en(t), null != e && (this._locale = e), 
this);
}
function fi() {
return this._locale;
}
function pi(t) {
switch (t = P(t)) {
case "year":
this.month(0);

case "quarter":
case "month":
this.date(1);

case "week":
case "isoWeek":
case "day":
case "date":
this.hours(0);

case "hour":
this.minutes(0);

case "minute":
this.seconds(0);

case "second":
this.milliseconds(0);
}
return "week" === t && this.weekday(0), "isoWeek" === t && this.isoWeekday(1), "quarter" === t && this.month(3 * Math.floor(this.month() / 3)), 
this;
}
function mi(t) {
return t = P(t), void 0 === t || "millisecond" === t ? this :("date" === t && (t = "day"), 
this.startOf(t).add(1, "isoWeek" === t ? "week" :t).subtract(1, "ms"));
}
function gi() {
return this._d.valueOf() - 6e4 * (this._offset || 0);
}
function vi() {
return Math.floor(this.valueOf() / 1e3);
}
function yi() {
return new Date(this.valueOf());
}
function _i() {
var t = this;
return [ t.year(), t.month(), t.date(), t.hour(), t.minute(), t.second(), t.millisecond() ];
}
function bi() {
var t = this;
return {
years:t.year(),
months:t.month(),
date:t.date(),
hours:t.hours(),
minutes:t.minutes(),
seconds:t.seconds(),
milliseconds:t.milliseconds()
};
}
function wi() {
return this.isValid() ? this.toISOString() :null;
}
function xi() {
return f(this);
}
function Si() {
return l({}, d(this));
}
function ki() {
return d(this).overflow;
}
function Ci() {
return {
input:this._i,
format:this._f,
locale:this._locale,
isUTC:this._isUTC,
strict:this._strict
};
}
function Ti(t, e) {
W(0, [ t, t.length ], 0, e);
}
function Ei(t) {
return Ii.call(this, t, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy);
}
function Di(t) {
return Ii.call(this, t, this.isoWeek(), this.isoWeekday(), 1, 4);
}
function Mi() {
return Se(this.year(), 1, 4);
}
function Oi() {
var t = this.localeData()._week;
return Se(this.year(), t.dow, t.doy);
}
function Ii(t, e, n, i, r) {
var o;
return null == t ? xe(this, i, r).year :(o = Se(t, i, r), e > o && (e = o), ji.call(this, t, e, n, i, r));
}
function ji(t, e, n, i, r) {
var o = we(t, e, n, i, r), s = _e(o.year, 0, o.dayOfYear);
return this.year(s.getUTCFullYear()), this.month(s.getUTCMonth()), this.date(s.getUTCDate()), 
this;
}
function Ai(t) {
return null == t ? Math.ceil((this.month() + 1) / 3) :this.month(3 * (t - 1) + this.month() % 3);
}
function Li(t) {
var e = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
return null == t ? e :this.add(t - e, "d");
}
function zi(t, e) {
e[ao] = b(1e3 * ("0." + t));
}
function Pi() {
return this._isUTC ? "UTC" :"";
}
function Hi() {
return this._isUTC ? "Coordinated Universal Time" :"";
}
function Ni(t) {
return _n(1e3 * t);
}
function Ri() {
return _n.apply(null, arguments).parseZone();
}
function $i(t) {
return t;
}
function Fi(t, e, n, i) {
var r = en(), o = c().set(i, e);
return r[n](o, t);
}
function qi(t, e, n) {
if (o(t) && (e = t, t = void 0), t = t || "", null != e) return Fi(t, e, n, "month");
var i, r = [];
for (i = 0; 12 > i; i++) r[i] = Fi(t, i, n, "month");
return r;
}
function Ui(t, e, n, i) {
"boolean" == typeof t ? (o(e) && (n = e, e = void 0), e = e || "") :(e = t, n = e, 
t = !1, o(e) && (n = e, e = void 0), e = e || "");
var r = en(), s = t ? r._week.dow :0;
if (null != n) return Fi(e, (n + s) % 7, i, "day");
var a, u = [];
for (a = 0; 7 > a; a++) u[a] = Fi(e, (a + s) % 7, i, "day");
return u;
}
function Bi(t, e) {
return qi(t, e, "months");
}
function Yi(t, e) {
return qi(t, e, "monthsShort");
}
function Wi(t, e, n) {
return Ui(t, e, n, "weekdays");
}
function Vi(t, e, n) {
return Ui(t, e, n, "weekdaysShort");
}
function Gi(t, e, n) {
return Ui(t, e, n, "weekdaysMin");
}
function Xi() {
var t = this._data;
return this._milliseconds = Qo(this._milliseconds), this._days = Qo(this._days), 
this._months = Qo(this._months), t.milliseconds = Qo(t.milliseconds), t.seconds = Qo(t.seconds), 
t.minutes = Qo(t.minutes), t.hours = Qo(t.hours), t.months = Qo(t.months), t.years = Qo(t.years), 
this;
}
function Ji(t, e, n, i) {
var r = Fn(e, n);
return t._milliseconds += i * r._milliseconds, t._days += i * r._days, t._months += i * r._months, 
t._bubble();
}
function Zi(t, e) {
return Ji(this, t, e, 1);
}
function Ki(t, e) {
return Ji(this, t, e, -1);
}
function Qi(t) {
return 0 > t ? Math.floor(t) :Math.ceil(t);
}
function tr() {
var t, e, n, i, r, o = this._milliseconds, s = this._days, a = this._months, u = this._data;
return o >= 0 && s >= 0 && a >= 0 || 0 >= o && 0 >= s && 0 >= a || (o += 864e5 * Qi(nr(a) + s), 
s = 0, a = 0), u.milliseconds = o % 1e3, t = _(o / 1e3), u.seconds = t % 60, e = _(t / 60), 
u.minutes = e % 60, n = _(e / 60), u.hours = n % 24, s += _(n / 24), r = _(er(s)), 
a += r, s -= Qi(nr(r)), i = _(a / 12), a %= 12, u.days = s, u.months = a, u.years = i, 
this;
}
function er(t) {
return 4800 * t / 146097;
}
function nr(t) {
return 146097 * t / 4800;
}
function ir(t) {
var e, n, i = this._milliseconds;
if (t = P(t), "month" === t || "year" === t) return e = this._days + i / 864e5, 
n = this._months + er(e), "month" === t ? n :n / 12;
switch (e = this._days + Math.round(nr(this._months)), t) {
case "week":
return e / 7 + i / 6048e5;

case "day":
return e + i / 864e5;

case "hour":
return 24 * e + i / 36e5;

case "minute":
return 1440 * e + i / 6e4;

case "second":
return 86400 * e + i / 1e3;

case "millisecond":
return Math.floor(864e5 * e) + i;

default:
throw new Error("Unknown unit " + t);
}
}
function rr() {
return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * b(this._months / 12);
}
function or(t) {
return function() {
return this.as(t);
};
}
function sr(t) {
return t = P(t), this[t + "s"]();
}
function ar(t) {
return function() {
return this._data[t];
};
}
function ur() {
return _(this.days() / 7);
}
function lr(t, e, n, i, r) {
return r.relativeTime(e || 1, !!n, t, i);
}
function cr(t, e, n) {
var i = Fn(t).abs(), r = ms(i.as("s")), o = ms(i.as("m")), s = ms(i.as("h")), a = ms(i.as("d")), u = ms(i.as("M")), l = ms(i.as("y")), c = r < gs.s && [ "s", r ] || 1 >= o && [ "m" ] || o < gs.m && [ "mm", o ] || 1 >= s && [ "h" ] || s < gs.h && [ "hh", s ] || 1 >= a && [ "d" ] || a < gs.d && [ "dd", a ] || 1 >= u && [ "M" ] || u < gs.M && [ "MM", u ] || 1 >= l && [ "y" ] || [ "yy", l ];
return c[2] = e, c[3] = +t > 0, c[4] = n, lr.apply(null, c);
}
function hr(t) {
return void 0 === t ? ms :"function" == typeof t ? (ms = t, !0) :!1;
}
function dr(t, e) {
return void 0 === gs[t] ? !1 :void 0 === e ? gs[t] :(gs[t] = e, !0);
}
function fr(t) {
var e = this.localeData(), n = cr(this, !t, e);
return t && (n = e.pastFuture(+this, n)), e.postformat(n);
}
function pr() {
var t, e, n, i = vs(this._milliseconds) / 1e3, r = vs(this._days), o = vs(this._months);
t = _(i / 60), e = _(t / 60), i %= 60, t %= 60, n = _(o / 12), o %= 12;
var s = n, a = o, u = r, l = e, c = t, h = i, d = this.asSeconds();
return d ? (0 > d ? "-" :"") + "P" + (s ? s + "Y" :"") + (a ? a + "M" :"") + (u ? u + "D" :"") + (l || c || h ? "T" :"") + (l ? l + "H" :"") + (c ? c + "M" :"") + (h ? h + "S" :"") :"P0D";
}
var mr, gr;
gr = Array.prototype.some ? Array.prototype.some :function(t) {
for (var e = Object(this), n = e.length >>> 0, i = 0; n > i; i++) if (i in e && t.call(this, e[i], i, e)) return !0;
return !1;
};
var vr = gr, yr = t.momentProperties = [], _r = !1, br = {};
t.suppressDeprecationWarnings = !1, t.deprecationHandler = null;
var wr;
wr = Object.keys ? Object.keys :function(t) {
var e, n = [];
for (e in t) u(t, e) && n.push(e);
return n;
};
var xr, Sr = wr, kr = {
sameDay:"[Today at] LT",
nextDay:"[Tomorrow at] LT",
nextWeek:"dddd [at] LT",
lastDay:"[Yesterday at] LT",
lastWeek:"[Last] dddd [at] LT",
sameElse:"L"
}, Cr = {
LTS:"h:mm:ss A",
LT:"h:mm A",
L:"MM/DD/YYYY",
LL:"MMMM D, YYYY",
LLL:"MMMM D, YYYY h:mm A",
LLLL:"dddd, MMMM D, YYYY h:mm A"
}, Tr = "Invalid date", Er = "%d", Dr = /\d{1,2}/, Mr = {
future:"in %s",
past:"%s ago",
s:"a few seconds",
m:"a minute",
mm:"%d minutes",
h:"an hour",
hh:"%d hours",
d:"a day",
dd:"%d days",
M:"a month",
MM:"%d months",
y:"a year",
yy:"%d years"
}, Or = {}, Ir = {}, jr = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, Ar = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Lr = {}, zr = {}, Pr = /\d/, Hr = /\d\d/, Nr = /\d{3}/, Rr = /\d{4}/, $r = /[+-]?\d{6}/, Fr = /\d\d?/, qr = /\d\d\d\d?/, Ur = /\d\d\d\d\d\d?/, Br = /\d{1,3}/, Yr = /\d{1,4}/, Wr = /[+-]?\d{1,6}/, Vr = /\d+/, Gr = /[+-]?\d+/, Xr = /Z|[+-]\d\d:?\d\d/gi, Jr = /Z|[+-]\d\d(?::?\d\d)?/gi, Zr = /[+-]?\d+(\.\d{1,3})?/, Kr = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Qr = {}, to = {}, eo = 0, no = 1, io = 2, ro = 3, oo = 4, so = 5, ao = 6, uo = 7, lo = 8;
xr = Array.prototype.indexOf ? Array.prototype.indexOf :function(t) {
var e;
for (e = 0; e < this.length; ++e) if (this[e] === t) return e;
return -1;
};
var co = xr;
W("M", [ "MM", 2 ], "Mo", function() {
return this.month() + 1;
}), W("MMM", 0, 0, function(t) {
return this.localeData().monthsShort(this, t);
}), W("MMMM", 0, 0, function(t) {
return this.localeData().months(this, t);
}), z("month", "M"), N("month", 8), Z("M", Fr), Z("MM", Fr, Hr), Z("MMM", function(t, e) {
return e.monthsShortRegex(t);
}), Z("MMMM", function(t, e) {
return e.monthsRegex(t);
}), ee([ "M", "MM" ], function(t, e) {
e[no] = b(t) - 1;
}), ee([ "MMM", "MMMM" ], function(t, e, n, i) {
var r = n._locale.monthsParse(t, i, n._strict);
null != r ? e[no] = r :d(n).invalidMonth = t;
});
var ho = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, fo = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), po = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), mo = Kr, go = Kr;
W("Y", 0, 0, function() {
var t = this.year();
return 9999 >= t ? "" + t :"+" + t;
}), W(0, [ "YY", 2 ], 0, function() {
return this.year() % 100;
}), W(0, [ "YYYY", 4 ], 0, "year"), W(0, [ "YYYYY", 5 ], 0, "year"), W(0, [ "YYYYYY", 6, !0 ], 0, "year"), 
z("year", "y"), N("year", 1), Z("Y", Gr), Z("YY", Fr, Hr), Z("YYYY", Yr, Rr), Z("YYYYY", Wr, $r), 
Z("YYYYYY", Wr, $r), ee([ "YYYYY", "YYYYYY" ], eo), ee("YYYY", function(e, n) {
n[eo] = 2 === e.length ? t.parseTwoDigitYear(e) :b(e);
}), ee("YY", function(e, n) {
n[eo] = t.parseTwoDigitYear(e);
}), ee("Y", function(t, e) {
e[eo] = parseInt(t, 10);
}), t.parseTwoDigitYear = function(t) {
return b(t) + (b(t) > 68 ? 1900 :2e3);
};
var vo = $("FullYear", !0);
W("w", [ "ww", 2 ], "wo", "week"), W("W", [ "WW", 2 ], "Wo", "isoWeek"), z("week", "w"), 
z("isoWeek", "W"), N("week", 5), N("isoWeek", 5), Z("w", Fr), Z("ww", Fr, Hr), Z("W", Fr), 
Z("WW", Fr, Hr), ne([ "w", "ww", "W", "WW" ], function(t, e, n, i) {
e[i.substr(0, 1)] = b(t);
});
var yo = {
dow:0,
doy:6
};
W("d", 0, "do", "day"), W("dd", 0, 0, function(t) {
return this.localeData().weekdaysMin(this, t);
}), W("ddd", 0, 0, function(t) {
return this.localeData().weekdaysShort(this, t);
}), W("dddd", 0, 0, function(t) {
return this.localeData().weekdays(this, t);
}), W("e", 0, 0, "weekday"), W("E", 0, 0, "isoWeekday"), z("day", "d"), z("weekday", "e"), 
z("isoWeekday", "E"), N("day", 11), N("weekday", 11), N("isoWeekday", 11), Z("d", Fr), 
Z("e", Fr), Z("E", Fr), Z("dd", function(t, e) {
return e.weekdaysMinRegex(t);
}), Z("ddd", function(t, e) {
return e.weekdaysShortRegex(t);
}), Z("dddd", function(t, e) {
return e.weekdaysRegex(t);
}), ne([ "dd", "ddd", "dddd" ], function(t, e, n, i) {
var r = n._locale.weekdaysParse(t, i, n._strict);
null != r ? e.d = r :d(n).invalidWeekday = t;
}), ne([ "d", "e", "E" ], function(t, e, n, i) {
e[i] = b(t);
});
var _o = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), bo = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), wo = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), xo = Kr, So = Kr, ko = Kr;
W("H", [ "HH", 2 ], 0, "hour"), W("h", [ "hh", 2 ], 0, Ue), W("k", [ "kk", 2 ], 0, Be), 
W("hmm", 0, 0, function() {
return "" + Ue.apply(this) + Y(this.minutes(), 2);
}), W("hmmss", 0, 0, function() {
return "" + Ue.apply(this) + Y(this.minutes(), 2) + Y(this.seconds(), 2);
}), W("Hmm", 0, 0, function() {
return "" + this.hours() + Y(this.minutes(), 2);
}), W("Hmmss", 0, 0, function() {
return "" + this.hours() + Y(this.minutes(), 2) + Y(this.seconds(), 2);
}), Ye("a", !0), Ye("A", !1), z("hour", "h"), N("hour", 13), Z("a", We), Z("A", We), 
Z("H", Fr), Z("h", Fr), Z("HH", Fr, Hr), Z("hh", Fr, Hr), Z("hmm", qr), Z("hmmss", Ur), 
Z("Hmm", qr), Z("Hmmss", Ur), ee([ "H", "HH" ], ro), ee([ "a", "A" ], function(t, e, n) {
n._isPm = n._locale.isPM(t), n._meridiem = t;
}), ee([ "h", "hh" ], function(t, e, n) {
e[ro] = b(t), d(n).bigHour = !0;
}), ee("hmm", function(t, e, n) {
var i = t.length - 2;
e[ro] = b(t.substr(0, i)), e[oo] = b(t.substr(i)), d(n).bigHour = !0;
}), ee("hmmss", function(t, e, n) {
var i = t.length - 4, r = t.length - 2;
e[ro] = b(t.substr(0, i)), e[oo] = b(t.substr(i, 2)), e[so] = b(t.substr(r)), d(n).bigHour = !0;
}), ee("Hmm", function(t, e) {
var n = t.length - 2;
e[ro] = b(t.substr(0, n)), e[oo] = b(t.substr(n));
}), ee("Hmmss", function(t, e) {
var n = t.length - 4, i = t.length - 2;
e[ro] = b(t.substr(0, n)), e[oo] = b(t.substr(n, 2)), e[so] = b(t.substr(i));
});
var Co, To = /[ap]\.?m?\.?/i, Eo = $("Hours", !0), Do = {
calendar:kr,
longDateFormat:Cr,
invalidDate:Tr,
ordinal:Er,
ordinalParse:Dr,
relativeTime:Mr,
months:fo,
monthsShort:po,
week:yo,
weekdays:_o,
weekdaysMin:wo,
weekdaysShort:bo,
meridiemParse:To
}, Mo = {}, Oo = {}, Io = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, jo = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, Ao = /Z|[+-]\d\d(?::?\d\d)?/, Lo = [ [ "YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/ ], [ "YYYY-MM-DD", /\d{4}-\d\d-\d\d/ ], [ "GGGG-[W]WW-E", /\d{4}-W\d\d-\d/ ], [ "GGGG-[W]WW", /\d{4}-W\d\d/, !1 ], [ "YYYY-DDD", /\d{4}-\d{3}/ ], [ "YYYY-MM", /\d{4}-\d\d/, !1 ], [ "YYYYYYMMDD", /[+-]\d{10}/ ], [ "YYYYMMDD", /\d{8}/ ], [ "GGGG[W]WWE", /\d{4}W\d{3}/ ], [ "GGGG[W]WW", /\d{4}W\d{2}/, !1 ], [ "YYYYDDD", /\d{7}/ ] ], zo = [ [ "HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/ ], [ "HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/ ], [ "HH:mm:ss", /\d\d:\d\d:\d\d/ ], [ "HH:mm", /\d\d:\d\d/ ], [ "HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/ ], [ "HHmmss,SSSS", /\d\d\d\d\d\d,\d+/ ], [ "HHmmss", /\d\d\d\d\d\d/ ], [ "HHmm", /\d\d\d\d/ ], [ "HH", /\d\d/ ] ], Po = /^\/?Date\((\-?\d+)/i;
t.createFromInputFallback = S("value provided is not in a recognized ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(t) {
t._d = new Date(t._i + (t._useUTC ? " UTC" :""));
}), t.ISO_8601 = function() {};
var Ho = S("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
var t = _n.apply(null, arguments);
return this.isValid() && t.isValid() ? this > t ? this :t :p();
}), No = S("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
var t = _n.apply(null, arguments);
return this.isValid() && t.isValid() ? t > this ? this :t :p();
}), Ro = function() {
return Date.now ? Date.now() :+new Date();
};
Tn("Z", ":"), Tn("ZZ", ""), Z("Z", Jr), Z("ZZ", Jr), ee([ "Z", "ZZ" ], function(t, e, n) {
n._useUTC = !0, n._tzm = En(Jr, t);
});
var $o = /([\+\-]|\d\d)/gi;
t.updateOffset = function() {};
var Fo = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/, qo = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;
Fn.fn = Sn.prototype;
var Uo = Yn(1, "add"), Bo = Yn(-1, "subtract");
t.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", t.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
var Yo = S("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(t) {
return void 0 === t ? this.localeData() :this.locale(t);
});
W(0, [ "gg", 2 ], 0, function() {
return this.weekYear() % 100;
}), W(0, [ "GG", 2 ], 0, function() {
return this.isoWeekYear() % 100;
}), Ti("gggg", "weekYear"), Ti("ggggg", "weekYear"), Ti("GGGG", "isoWeekYear"), 
Ti("GGGGG", "isoWeekYear"), z("weekYear", "gg"), z("isoWeekYear", "GG"), N("weekYear", 1), 
N("isoWeekYear", 1), Z("G", Gr), Z("g", Gr), Z("GG", Fr, Hr), Z("gg", Fr, Hr), Z("GGGG", Yr, Rr), 
Z("gggg", Yr, Rr), Z("GGGGG", Wr, $r), Z("ggggg", Wr, $r), ne([ "gggg", "ggggg", "GGGG", "GGGGG" ], function(t, e, n, i) {
e[i.substr(0, 2)] = b(t);
}), ne([ "gg", "GG" ], function(e, n, i, r) {
n[r] = t.parseTwoDigitYear(e);
}), W("Q", 0, "Qo", "quarter"), z("quarter", "Q"), N("quarter", 7), Z("Q", Pr), 
ee("Q", function(t, e) {
e[no] = 3 * (b(t) - 1);
}), W("D", [ "DD", 2 ], "Do", "date"), z("date", "D"), N("date", 9), Z("D", Fr), 
Z("DD", Fr, Hr), Z("Do", function(t, e) {
return t ? e._ordinalParse :e._ordinalParseLenient;
}), ee([ "D", "DD" ], io), ee("Do", function(t, e) {
e[io] = b(t.match(Fr)[0], 10);
});
var Wo = $("Date", !0);
W("DDD", [ "DDDD", 3 ], "DDDo", "dayOfYear"), z("dayOfYear", "DDD"), N("dayOfYear", 4), 
Z("DDD", Br), Z("DDDD", Nr), ee([ "DDD", "DDDD" ], function(t, e, n) {
n._dayOfYear = b(t);
}), W("m", [ "mm", 2 ], 0, "minute"), z("minute", "m"), N("minute", 14), Z("m", Fr), 
Z("mm", Fr, Hr), ee([ "m", "mm" ], oo);
var Vo = $("Minutes", !1);
W("s", [ "ss", 2 ], 0, "second"), z("second", "s"), N("second", 15), Z("s", Fr), 
Z("ss", Fr, Hr), ee([ "s", "ss" ], so);
var Go = $("Seconds", !1);
W("S", 0, 0, function() {
return ~~(this.millisecond() / 100);
}), W(0, [ "SS", 2 ], 0, function() {
return ~~(this.millisecond() / 10);
}), W(0, [ "SSS", 3 ], 0, "millisecond"), W(0, [ "SSSS", 4 ], 0, function() {
return 10 * this.millisecond();
}), W(0, [ "SSSSS", 5 ], 0, function() {
return 100 * this.millisecond();
}), W(0, [ "SSSSSS", 6 ], 0, function() {
return 1e3 * this.millisecond();
}), W(0, [ "SSSSSSS", 7 ], 0, function() {
return 1e4 * this.millisecond();
}), W(0, [ "SSSSSSSS", 8 ], 0, function() {
return 1e5 * this.millisecond();
}), W(0, [ "SSSSSSSSS", 9 ], 0, function() {
return 1e6 * this.millisecond();
}), z("millisecond", "ms"), N("millisecond", 16), Z("S", Br, Pr), Z("SS", Br, Hr), 
Z("SSS", Br, Nr);
var Xo;
for (Xo = "SSSS"; Xo.length <= 9; Xo += "S") Z(Xo, Vr);
for (Xo = "S"; Xo.length <= 9; Xo += "S") ee(Xo, zi);
var Jo = $("Milliseconds", !1);
W("z", 0, 0, "zoneAbbr"), W("zz", 0, 0, "zoneName");
var Zo = v.prototype;
Zo.add = Uo, Zo.calendar = Gn, Zo.clone = Xn, Zo.diff = ni, Zo.endOf = mi, Zo.format = ai, 
Zo.from = ui, Zo.fromNow = li, Zo.to = ci, Zo.toNow = hi, Zo.get = U, Zo.invalidAt = ki, 
Zo.isAfter = Jn, Zo.isBefore = Zn, Zo.isBetween = Kn, Zo.isSame = Qn, Zo.isSameOrAfter = ti, 
Zo.isSameOrBefore = ei, Zo.isValid = xi, Zo.lang = Yo, Zo.locale = di, Zo.localeData = fi, 
Zo.max = No, Zo.min = Ho, Zo.parsingFlags = Si, Zo.set = B, Zo.startOf = pi, Zo.subtract = Bo, 
Zo.toArray = _i, Zo.toObject = bi, Zo.toDate = yi, Zo.toISOString = oi, Zo.inspect = si, 
Zo.toJSON = wi, Zo.toString = ri, Zo.unix = vi, Zo.valueOf = gi, Zo.creationData = Ci, 
Zo.year = vo, Zo.isLeapYear = ve, Zo.weekYear = Ei, Zo.isoWeekYear = Di, Zo.quarter = Zo.quarters = Ai, 
Zo.month = ce, Zo.daysInMonth = he, Zo.week = Zo.weeks = Ee, Zo.isoWeek = Zo.isoWeeks = De, 
Zo.weeksInYear = Oi, Zo.isoWeeksInYear = Mi, Zo.date = Wo, Zo.day = Zo.days = Pe, 
Zo.weekday = He, Zo.isoWeekday = Ne, Zo.dayOfYear = Li, Zo.hour = Zo.hours = Eo, 
Zo.minute = Zo.minutes = Vo, Zo.second = Zo.seconds = Go, Zo.millisecond = Zo.milliseconds = Jo, 
Zo.utcOffset = On, Zo.utc = jn, Zo.local = An, Zo.parseZone = Ln, Zo.hasAlignedHourOffset = zn, 
Zo.isDST = Pn, Zo.isLocal = Nn, Zo.isUtcOffset = Rn, Zo.isUtc = $n, Zo.isUTC = $n, 
Zo.zoneAbbr = Pi, Zo.zoneName = Hi, Zo.dates = S("dates accessor is deprecated. Use date instead.", Wo), 
Zo.months = S("months accessor is deprecated. Use month instead", ce), Zo.years = S("years accessor is deprecated. Use year instead", vo), 
Zo.zone = S("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", In), 
Zo.isDSTShifted = S("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", Hn);
var Ko = D.prototype;
Ko.calendar = M, Ko.longDateFormat = O, Ko.invalidDate = I, Ko.ordinal = j, Ko.preparse = $i, 
Ko.postformat = $i, Ko.relativeTime = A, Ko.pastFuture = L, Ko.set = T, Ko.months = oe, 
Ko.monthsShort = se, Ko.monthsParse = ue, Ko.monthsRegex = fe, Ko.monthsShortRegex = de, 
Ko.week = ke, Ko.firstDayOfYear = Te, Ko.firstDayOfWeek = Ce, Ko.weekdays = Ie, 
Ko.weekdaysMin = Ae, Ko.weekdaysShort = je, Ko.weekdaysParse = ze, Ko.weekdaysRegex = Re, 
Ko.weekdaysShortRegex = $e, Ko.weekdaysMinRegex = Fe, Ko.isPM = Ve, Ko.meridiem = Ge, 
Ke("en", {
ordinalParse:/\d{1,2}(th|st|nd|rd)/,
ordinal:function(t) {
var e = t % 10, n = 1 === b(t % 100 / 10) ? "th" :1 === e ? "st" :2 === e ? "nd" :3 === e ? "rd" :"th";
return t + n;
}
}), t.lang = S("moment.lang is deprecated. Use moment.locale instead.", Ke), t.langData = S("moment.langData is deprecated. Use moment.localeData instead.", en);
var Qo = Math.abs, ts = or("ms"), es = or("s"), ns = or("m"), is = or("h"), rs = or("d"), os = or("w"), ss = or("M"), as = or("y"), us = ar("milliseconds"), ls = ar("seconds"), cs = ar("minutes"), hs = ar("hours"), ds = ar("days"), fs = ar("months"), ps = ar("years"), ms = Math.round, gs = {
s:45,
m:45,
h:22,
d:26,
M:11
}, vs = Math.abs, ys = Sn.prototype;
return ys.abs = Xi, ys.add = Zi, ys.subtract = Ki, ys.as = ir, ys.asMilliseconds = ts, 
ys.asSeconds = es, ys.asMinutes = ns, ys.asHours = is, ys.asDays = rs, ys.asWeeks = os, 
ys.asMonths = ss, ys.asYears = as, ys.valueOf = rr, ys._bubble = tr, ys.get = sr, 
ys.milliseconds = us, ys.seconds = ls, ys.minutes = cs, ys.hours = hs, ys.days = ds, 
ys.weeks = ur, ys.months = fs, ys.years = ps, ys.humanize = fr, ys.toISOString = pr, 
ys.toString = pr, ys.toJSON = pr, ys.locale = di, ys.localeData = fi, ys.toIsoString = S("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", pr), 
ys.lang = Yo, W("X", 0, 0, "unix"), W("x", 0, 0, "valueOf"), Z("x", Gr), Z("X", Zr), 
ee("X", function(t, e, n) {
n._d = new Date(1e3 * parseFloat(t, 10));
}), ee("x", function(t, e, n) {
n._d = new Date(b(t));
}), t.version = "2.17.1", e(_n), t.fn = Zo, t.min = wn, t.max = xn, t.now = Ro, 
t.utc = c, t.unix = Ni, t.months = Bi, t.isDate = s, t.locale = Ke, t.invalid = p, 
t.duration = Fn, t.isMoment = y, t.weekdays = Wi, t.parseZone = Ri, t.localeData = en, 
t.isDuration = kn, t.monthsShort = Yi, t.weekdaysMin = Gi, t.defineLocale = Qe, 
t.updateLocale = tn, t.locales = nn, t.weekdaysShort = Vi, t.normalizeUnits = P, 
t.relativeTimeRounding = hr, t.relativeTimeThreshold = dr, t.calendarFormat = Vn, 
t.prototype = Zo, t;
}), function() {
var t, e;
t = "undefined" != typeof require && null !== require ? require("moment") :this.moment, 
e = {
a:"ddd",
A:"dddd",
b:"MMM",
B:"MMMM",
d:"DD",
e:"D",
F:"YYYY-MM-DD",
H:"HH",
I:"hh",
j:"DDDD",
k:"H",
l:"h",
m:"MM",
M:"mm",
p:"A",
S:"ss",
u:"E",
w:"d",
W:"WW",
y:"YY",
Y:"YYYY",
z:"ZZ",
Z:"z",
"%":"%"
}, t.fn.strftime = function(t) {
var n, i;
return n = t.replace(/[^%](\w+)/g, function(t) {
return "[" + t + "]";
}), Object.keys(e).forEach(function(t) {
i = e[t], n = n.replace("%" + t, i);
}), this.format(n);
}, "undefined" != typeof module && null !== module ? module.exports = t :this.moment = t;
}.call(this), function(t) {
"function" == typeof define && define.amd ? define([ "moment" ], t) :"object" == typeof exports ? module.exports = t(require("../moment")) :t(window.moment);
}(function(t) {
return t.defineLocale("fr", {
weekdaysMin:"D_L_M_M_J_V_S".split("_"),
longDateFormat:{
LT:"HH:mm",
L:"DD/MM/YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY LT",
LLLL:"dddd D MMMM YYYY LT"
},
calendar:{
sameDay:"[Aujourd'hui \xe0] LT",
nextDay:"[Demain \xe0] LT",
nextWeek:"dddd [\xe0] LT",
lastDay:"[Hier \xe0] LT",
lastWeek:"dddd [dernier \xe0] LT",
sameElse:"L"
},
relativeTime:{
future:"dans %s",
past:"il y a %s",
s:"quelques secondes",
m:"une minute",
mm:"%d minutes",
h:"une heure",
hh:"%d heures",
d:"un jour",
dd:"%d jours",
M:"un mois",
MM:"%d mois",
y:"un an",
yy:"%d ans"
},
ordinal:function(t) {
return t + (1 === t ? "er" :"");
},
week:{
dow:1,
doy:4
}
});
}), function(t) {
"function" == typeof define && define.amd ? define([ "moment" ], t) :"object" == typeof exports ? module.exports = t(require("../moment")) :t(window.moment);
}(function(t) {
function e(t, e, n) {
var i = {
m:[ "eine Minute", "einer Minute" ],
h:[ "eine Stunde", "einer Stunde" ],
d:[ "ein Tag", "einem Tag" ],
dd:[ t + " Tage", t + " Tagen" ],
M:[ "ein Monat", "einem Monat" ],
MM:[ t + " Monate", t + " Monaten" ],
y:[ "ein Jahr", "einem Jahr" ],
yy:[ t + " Jahre", t + " Jahren" ]
};
return e ? i[n][0] :i[n][1];
}
return t.defineLocale("de", {
weekdaysMin:"So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
longDateFormat:{
LT:"HH:mm [Uhr]",
L:"DD.MM.YYYY",
LL:"D. MMMM YYYY",
LLL:"D. MMMM YYYY LT",
LLLL:"dddd, D. MMMM YYYY LT"
},
calendar:{
sameDay:"[Heute um] LT",
sameElse:"L",
nextDay:"[Morgen um] LT",
nextWeek:"dddd [um] LT",
lastDay:"[Gestern um] LT",
lastWeek:"[letzten] dddd [um] LT"
},
relativeTime:{
future:"in %s",
past:"vor %s",
s:"ein paar Sekunden",
m:e,
mm:"%d Minuten",
h:e,
hh:"%d Stunden",
d:e,
dd:e,
M:e,
MM:e,
y:e,
yy:e
},
ordinal:"%d.",
week:{
dow:1,
doy:4
}
});
}), function(t, e) {
"object" == typeof exports && "undefined" != typeof module ? e(require("../moment")) :"function" == typeof define && define.amd ? define([ "moment" ], e) :e(t.moment);
}(this, function(t) {
"use strict";
return t.defineLocale("es", {
weekdaysMin:"Do_Lu_Ma_Mi_Ju_Vi_S\xe1".split("_"),
longDateFormat:{
LT:"H:mm",
LTS:"LT:ss",
L:"DD/MM/YYYY",
LL:"D [de] MMMM [de] YYYY",
LLL:"D [de] MMMM [de] YYYY LT",
LLLL:"dddd, D [de] MMMM [de] YYYY LT"
},
calendar:{
sameDay:function() {
return "[hoy a la" + (1 !== this.hours() ? "s" :"") + "] LT";
},
nextDay:function() {
return "[ma\xf1ana a la" + (1 !== this.hours() ? "s" :"") + "] LT";
},
nextWeek:function() {
return "dddd [a la" + (1 !== this.hours() ? "s" :"") + "] LT";
},
lastDay:function() {
return "[ayer a la" + (1 !== this.hours() ? "s" :"") + "] LT";
},
lastWeek:function() {
return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" :"") + "] LT";
},
sameElse:"L"
},
relativeTime:{
future:"en %s",
past:"hace %s",
s:"unos segundos",
m:"un minuto",
mm:"%d minutos",
h:"una hora",
hh:"%d horas",
d:"un d\xeda",
dd:"%d d\xedas",
M:"un mes",
MM:"%d meses",
y:"un a\xf1o",
yy:"%d a\xf1os"
},
ordinalParse:/\d{1,2}\xba/,
ordinal:"%d\xba",
week:{
dow:1,
doy:4
}
});
}), function(t, e) {
"object" == typeof exports && "undefined" != typeof module && "function" == typeof require ? e(require("../moment")) :"function" == typeof define && define.amd ? define([ "moment" ], e) :e(t.moment);
}(this, function(t) {
"use strict";
"jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split("_"), "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_");
return t.defineLocale("nl", {
monthsParseExact:!0,
weekdaysMin:"Zo_Ma_Di_Wo_Do_Vr_Za".split("_"),
weekdaysParseExact:!0,
longDateFormat:{
LT:"HH:mm",
LTS:"HH:mm:ss",
L:"DD-MM-YYYY",
LL:"D MMMM YYYY",
LLL:"D MMMM YYYY HH:mm",
LLLL:"dddd D MMMM YYYY HH:mm"
},
calendar:{
sameDay:"[vandaag om] LT",
nextDay:"[morgen om] LT",
nextWeek:"dddd [om] LT",
lastDay:"[gisteren om] LT",
lastWeek:"[afgelopen] dddd [om] LT",
sameElse:"L"
},
relativeTime:{
future:"over %s",
past:"%s geleden",
s:"een paar seconden",
m:"\xe9\xe9n minuut",
mm:"%d minuten",
h:"\xe9\xe9n uur",
hh:"%d uur",
d:"\xe9\xe9n dag",
dd:"%d dagen",
M:"\xe9\xe9n maand",
MM:"%d maanden",
y:"\xe9\xe9n jaar",
yy:"%d jaar"
},
ordinalParse:/\d{1,2}(ste|de)/,
ordinal:function(t) {
return t + (1 === t || 8 === t || t >= 20 ? "ste" :"de");
},
week:{
dow:1,
doy:4
}
});
}), Config.momentLocaleOptions && moment.updateLocale(I18n.locale.split("_")[0], Config.momentLocaleOptions), 
function() {
function t(t) {
this._value = t;
}
function e(t, e, n, i) {
var r, o, s = Math.pow(10, e);
return o = (n(t * s) / s).toFixed(e), i && (r = new RegExp("0{1," + i + "}$"), o = o.replace(r, "")), 
o;
}
function n(t, e, n) {
var i;
return i = e.indexOf("$") > -1 ? r(t, e, n) :e.indexOf("%") > -1 ? o(t, e, n) :e.indexOf(":") > -1 ? s(t, e) :u(t._value, e, n);
}
function i(t, e) {
var n, i, r, o, s, u = e, l = [ "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" ], c = !1;
if (e.indexOf(":") > -1) t._value = a(e); else if (e === g) t._value = 0; else {
for ("." !== p[m].delimiters.decimal && (e = e.replace(/\./g, "").replace(p[m].delimiters.decimal, ".")), 
n = new RegExp("[^a-zA-Z]" + p[m].abbreviations.thousand + "(?:\\)|(\\" + p[m].currency.symbol + ")?(?:\\))?)?$"), 
i = new RegExp("[^a-zA-Z]" + p[m].abbreviations.million + "(?:\\)|(\\" + p[m].currency.symbol + ")?(?:\\))?)?$"), 
r = new RegExp("[^a-zA-Z]" + p[m].abbreviations.billion + "(?:\\)|(\\" + p[m].currency.symbol + ")?(?:\\))?)?$"), 
o = new RegExp("[^a-zA-Z]" + p[m].abbreviations.trillion + "(?:\\)|(\\" + p[m].currency.symbol + ")?(?:\\))?)?$"), 
s = 0; s <= l.length && !(c = e.indexOf(l[s]) > -1 ? Math.pow(1024, s + 1) :!1); s++) ;
t._value = (c ? c :1) * (u.match(n) ? Math.pow(10, 3) :1) * (u.match(i) ? Math.pow(10, 6) :1) * (u.match(r) ? Math.pow(10, 9) :1) * (u.match(o) ? Math.pow(10, 12) :1) * (e.indexOf("%") > -1 ? .01 :1) * ((e.split("-").length + Math.min(e.split("(").length - 1, e.split(")").length - 1)) % 2 ? 1 :-1) * Number(e.replace(/[^0-9\.]+/g, "")), 
t._value = c ? Math.ceil(t._value) :t._value;
}
return t._value;
}
function r(t, e, n) {
var i, r, o = e.indexOf("$"), s = e.indexOf("("), a = e.indexOf("-"), l = "";
return e.indexOf(" $") > -1 ? (l = " ", e = e.replace(" $", "")) :e.indexOf("$ ") > -1 ? (l = " ", 
e = e.replace("$ ", "")) :e = e.replace("$", ""), r = u(t._value, e, n), 1 >= o ? r.indexOf("(") > -1 || r.indexOf("-") > -1 ? (r = r.split(""), 
i = 1, (s > o || a > o) && (i = 0), r.splice(i, 0, p[m].currency.symbol + l), r = r.join("")) :r = p[m].currency.symbol + l + r :r.indexOf(")") > -1 ? (r = r.split(""), 
r.splice(-1, 0, l + p[m].currency.symbol), r = r.join("")) :r = r + l + p[m].currency.symbol, 
r;
}
function o(t, e, n) {
var i, r = "", o = 100 * t._value;
return e.indexOf(" %") > -1 ? (r = " ", e = e.replace(" %", "")) :e = e.replace("%", ""), 
i = u(o, e, n), i.indexOf(")") > -1 ? (i = i.split(""), i.splice(-1, 0, r + "%"), 
i = i.join("")) :i = i + r + "%", i;
}
function s(t) {
var e = Math.floor(t._value / 60 / 60), n = Math.floor((t._value - 60 * e * 60) / 60), i = Math.round(t._value - 60 * e * 60 - 60 * n);
return e + ":" + (10 > n ? "0" + n :n) + ":" + (10 > i ? "0" + i :i);
}
function a(t) {
var e = t.split(":"), n = 0;
return 3 === e.length ? (n += 60 * Number(e[0]) * 60, n += 60 * Number(e[1]), n += Number(e[2])) :2 === e.length && (n += 60 * Number(e[0]), 
n += Number(e[1])), Number(n);
}
function u(t, n, i) {
var r, o, s, a, u, l, c = !1, h = !1, d = !1, f = "", v = !1, y = !1, _ = !1, b = !1, w = !1, x = "", S = "", k = Math.abs(t), C = [ "B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" ], T = "", E = !1;
if (0 === t && null !== g) return g;
if (n.indexOf("(") > -1 ? (c = !0, n = n.slice(1, -1)) :n.indexOf("+") > -1 && (h = !0, 
n = n.replace(/\+/g, "")), n.indexOf("a") > -1 && (v = n.indexOf("aK") >= 0, y = n.indexOf("aM") >= 0, 
_ = n.indexOf("aB") >= 0, b = n.indexOf("aT") >= 0, w = v || y || _ || b, n.indexOf(" a") > -1 ? (f = " ", 
n = n.replace(" a", "")) :n = n.replace("a", ""), k >= Math.pow(10, 12) && !w || b ? (f += p[m].abbreviations.trillion, 
t /= Math.pow(10, 12)) :k < Math.pow(10, 12) && k >= Math.pow(10, 9) && !w || _ ? (f += p[m].abbreviations.billion, 
t /= Math.pow(10, 9)) :k < Math.pow(10, 9) && k >= Math.pow(10, 6) && !w || y ? (f += p[m].abbreviations.million, 
t /= Math.pow(10, 6)) :(k < Math.pow(10, 6) && k >= Math.pow(10, 3) && !w || v) && (f += p[m].abbreviations.thousand, 
t /= Math.pow(10, 3))), n.indexOf("b") > -1) for (n.indexOf(" b") > -1 ? (x = " ", 
n = n.replace(" b", "")) :n = n.replace("b", ""), s = 0; s <= C.length; s++) if (r = Math.pow(1024, s), 
o = Math.pow(1024, s + 1), t >= r && o > t) {
x += C[s], r > 0 && (t /= r);
break;
}
return n.indexOf("o") > -1 && (n.indexOf(" o") > -1 ? (S = " ", n = n.replace(" o", "")) :n = n.replace("o", ""), 
S += p[m].ordinal(t)), n.indexOf("[.]") > -1 && (d = !0, n = n.replace("[.]", ".")), 
a = t.toString().split(".")[0], u = n.split(".")[1], l = n.indexOf(","), u ? (u.indexOf("[") > -1 ? (u = u.replace("]", ""), 
u = u.split("["), T = e(t, u[0].length + u[1].length, i, u[1].length)) :T = e(t, u.length, i), 
a = T.split(".")[0], T = T.split(".")[1].length ? p[m].delimiters.decimal + T.split(".")[1] :"", 
d && 0 === Number(T.slice(1)) && (T = "")) :a = e(t, null, i), a.indexOf("-") > -1 && (a = a.slice(1), 
E = !0), l > -1 && (a = a.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + p[m].delimiters.thousands)), 
0 === n.indexOf(".") && (a = ""), (c && E ? "(" :"") + (!c && E ? "-" :"") + (!E && h ? "+" :"") + a + T + (S ? S :"") + (f ? f :"") + (x ? x :"") + (c && E ? ")" :"");
}
function l(t, e) {
p[t] = e;
}
function c(t) {
var e = t.toString().split(".");
return e.length < 2 ? 1 :Math.pow(10, e[1].length);
}
function h() {
var t = Array.prototype.slice.call(arguments);
return t.reduce(function(t, e) {
var n = c(t), i = c(e);
return n > i ? n :i;
}, -1/0);
}
var d, f = "1.5.3", p = {}, m = "en", g = null, v = "0,0", y = "undefined" != typeof module && module.exports;
d = function(e) {
return d.isNumeral(e) ? e = e.value() :0 === e || "undefined" == typeof e ? e = 0 :Number(e) || (e = d.fn.unformat(e)), 
new t(Number(e));
}, d.version = f, d.isNumeral = function(e) {
return e instanceof t;
}, d.language = function(t, e) {
if (!t) return m;
if (t && !e) {
if (!p[t]) throw new Error("Unknown language : " + t);
m = t;
}
return (e || !p[t]) && l(t, e), d;
}, d.languageData = function(t) {
if (!t) return p[m];
if (!p[t]) throw new Error("Unknown language : " + t);
return p[t];
}, d.language("en", {
delimiters:{
thousands:",",
decimal:"."
},
abbreviations:{
thousand:"k",
million:"m",
billion:"b",
trillion:"t"
},
ordinal:function(t) {
var e = t % 10;
return 1 === ~~(t % 100 / 10) ? "th" :1 === e ? "st" :2 === e ? "nd" :3 === e ? "rd" :"th";
},
currency:{
symbol:"$"
}
}), d.zeroFormat = function(t) {
g = "string" == typeof t ? t :null;
}, d.defaultFormat = function(t) {
v = "string" == typeof t ? t :"0.0";
}, "function" != typeof Array.prototype.reduce && (Array.prototype.reduce = function(t, e) {
"use strict";
if (null === this || "undefined" == typeof this) throw new TypeError("Array.prototype.reduce called on null or undefined");
if ("function" != typeof t) throw new TypeError(t + " is not a function");
var n, i, r = this.length >>> 0, o = !1;
for (1 < arguments.length && (i = e, o = !0), n = 0; r > n; ++n) this.hasOwnProperty(n) && (o ? i = t(i, this[n], n, this) :(i = this[n], 
o = !0));
if (!o) throw new TypeError("Reduce of empty array with no initial value");
return i;
}), d.fn = t.prototype = {
clone:function() {
return d(this);
},
format:function(t, e) {
return n(this, t ? t :v, void 0 !== e ? e :Math.round);
},
unformat:function(t) {
return "[object Number]" === Object.prototype.toString.call(t) ? t :i(this, t ? t :v);
},
value:function() {
return this._value;
},
valueOf:function() {
return this._value;
},
set:function(t) {
return this._value = Number(t), this;
},
add:function(t) {
function e(t, e) {
return t + n * e;
}
var n = h.call(null, this._value, t);
return this._value = [ this._value, t ].reduce(e, 0) / n, this;
},
subtract:function(t) {
function e(t, e) {
return t - n * e;
}
var n = h.call(null, this._value, t);
return this._value = [ t ].reduce(e, this._value * n) / n, this;
},
multiply:function(t) {
function e(t, e) {
var n = h(t, e);
return t * n * e * n / (n * n);
}
return this._value = [ this._value, t ].reduce(e, 1), this;
},
divide:function(t) {
function e(t, e) {
var n = h(t, e);
return t * n / (e * n);
}
return this._value = [ this._value, t ].reduce(e), this;
},
difference:function(t) {
return Math.abs(d(this._value).subtract(t).value());
}
}, y && (module.exports = d), "undefined" == typeof ender && (this.numeral = d), 
"function" == typeof define && define.amd && define([], function() {
return d;
});
}.call(this), numeral.language("fr", {
delimiters:{
thousands:" ",
decimal:","
},
abbreviations:{
thousand:"k",
million:"m",
billion:"M",
trillion:"T"
},
ordinal:function(t) {
return 1 === t ? "er" :"\xe8me";
},
currency:{
symbol:"\u20ac"
}
}), numeral.language("de", {
delimiters:{
thousands:",",
decimal:"."
},
abbreviations:{
thousand:"k",
million:"m",
billion:"b",
trillion:"t"
},
ordinal:function() {
return ".";
},
currency:{
symbol:"\u20ac"
}
}), numeral.language("de_AT", {
delimiters:{
thousands:",",
decimal:"."
},
abbreviations:{
thousand:"k",
million:"m",
billion:"b",
trillion:"t"
},
ordinal:function() {
return ".";
},
currency:{
symbol:"\u20ac"
}
}), numeral.language("en", {
delimiters:{
thousands:",",
decimal:"."
},
abbreviations:{
thousand:"k",
million:"m",
billion:"b",
trillion:"t"
},
ordinal:function(t) {
var e = t % 10;
return 1 === ~~(t % 100 / 10) ? "th" :1 === e ? "st" :2 === e ? "nd" :3 === e ? "rd" :"th";
},
currency:{
symbol:"\u20ac"
}
}), numeral.language("es", {
delimiters:{
thousands:",",
decimal:"."
},
abbreviations:{
thousand:"k",
million:"mm",
billion:"b",
trillion:"t"
},
ordinal:function(t) {
var e = t % 10;
return 1 === e || 3 === e ? "er" :2 === e ? "do" :7 === e || 0 === e ? "mo" :8 === e ? "vo" :9 === e ? "no" :"to";
},
currency:{
symbol:"\u20ac"
}
}), numeral.language("nl_BE", {
delimiters:{
thousands:",",
decimal:"."
},
abbreviations:{
thousand:"k",
million:" mln",
billion:" mld",
trillion:" bln"
},
ordinal:function(t) {
var e = t % 100;
return 0 !== t && 1 >= e || 8 === e || e >= 20 ? "ste" :"de";
},
currency:{
symbol:"\u20ac"
}
}), numeral.language("fr_BE", {
delimiters:{
thousands:" ",
decimal:","
},
abbreviations:{
thousand:"k",
million:"m",
billion:"M",
trillion:"T"
},
ordinal:function(t) {
return 1 === t ? "er" :"\xe8me";
},
currency:{
symbol:"\u20ac"
}
}), numeral.language("en_GB", {
delimiters:{
thousands:",",
decimal:"."
},
abbreviations:{
thousand:"k",
million:"m",
billion:"b",
trillion:"t"
},
ordinal:function(t) {
var e = t % 10;
return 1 === ~~(t % 100 / 10) ? "th" :1 === e ? "st" :2 === e ? "nd" :3 === e ? "rd" :"th";
},
currency:{
symbol:"\u20ac"
}
}), numeral.language(I18n.locale), numeral.defaultFormat("fr" == I18n.locale || "fr_BE" == I18n.locale ? "0,0.00$" :"$0,0.00"), 
function(t, e) {
"undefined" != typeof module && module.exports ? module.exports = e() :"function" == typeof define && define.amd ? define(e) :this[t] = e();
}("$script", function() {
function t(t, e) {
for (var n = 0, i = t.length; i > n; ++n) if (!e(t[n])) return u;
return 1;
}
function e(e, n) {
t(e, function(t) {
return !n(t);
});
}
function n(o, s, a) {
function u(t) {
return t.call ? t() :d[t];
}
function c() {
if (!--y) {
d[v] = 1, g && g();
for (var n in p) t(n.split("|"), u) && !e(p[n], u) && (p[n] = []);
}
}
o = o[l] ? o :[ o ];
var h = s && s.call, g = h ? s :a, v = h ? o.join("") :s, y = o.length;
return setTimeout(function() {
e(o, function t(e, n) {
return null === e ? c() :(n || /^https?:\/\//.test(e) || !r || (e = -1 === e.indexOf(".js") ? r + e + ".js" :r + e), 
m[e] ? (v && (f[v] = 1), 2 == m[e] ? c() :setTimeout(function() {
t(e, !0);
}, 0)) :(m[e] = 1, v && (f[v] = 1), void i(e, c)));
});
}, 0), n;
}
function i(t, e) {
var n, i = s.createElement("script");
i.onload = i.onerror = i[h] = function() {
i[c] && !/^c|loade/.test(i[c]) || n || (i.onload = i[h] = null, n = 1, m[t] = 2, 
e());
}, i.async = 1, i.src = o ? t + (-1 === t.indexOf("?") ? "?" :"&") + o :t, a.insertBefore(i, a.lastChild);
}
var r, o, s = document, a = s.getElementsByTagName("head")[0], u = !1, l = "push", c = "readyState", h = "onreadystatechange", d = {}, f = {}, p = {}, m = {};
return n.get = i, n.order = function(t, e, i) {
!function r(o) {
o = t.shift(), t.length ? n(o, r) :n(o, e, i);
}();
}, n.path = function(t) {
r = t;
}, n.urlArgs = function(t) {
o = t;
}, n.ready = function(i, r, o) {
i = i[l] ? i :[ i ];
var s = [];
return !e(i, function(t) {
d[t] || s[l](t);
}) && t(i, function(t) {
return d[t];
}) ? r() :!function(t) {
p[t] = p[t] || [], p[t][l](r), o && o(s);
}(i.join("|")), n;
}, n.done = function(t) {
n([ null ], t);
}, n;
}), +function(t) {
"use strict";
function e(e) {
return this.each(function() {
var i = t(this), r = i.data("bs.tooltip"), o = "object" == typeof e && e;
(r || "destroy" != e) && (r || i.data("bs.tooltip", r = new n(this, o)), "string" == typeof e && r[e]());
});
}
var n = function(t, e) {
this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, 
this.init("tooltip", t, e);
};
n.VERSION = "3.3.2", n.TRANSITION_DURATION = 150, n.DEFAULTS = {
animation:!0,
placement:"top",
selector:!1,
template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
trigger:"hover focus",
title:"",
delay:0,
html:!1,
container:!1,
viewport:{
selector:"body",
padding:0
}
}, n.prototype.init = function(e, n, i) {
this.enabled = !0, this.type = e, this.$element = t(n), this.options = this.getOptions(i), 
this.$viewport = this.options.viewport && t(this.options.viewport.selector || this.options.viewport);
for (var r = this.options.trigger.split(" "), o = r.length; o--; ) {
var s = r[o];
if ("click" == s) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)); else if ("manual" != s) {
var a = "hover" == s ? "mouseenter" :"focusin", u = "hover" == s ? "mouseleave" :"focusout";
this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), 
this.$element.on(u + "." + this.type, this.options.selector, t.proxy(this.leave, this));
}
}
this.options.selector ? this._options = t.extend({}, this.options, {
trigger:"manual",
selector:""
}) :this.fixTitle();
}, n.prototype.getDefaults = function() {
return n.DEFAULTS;
}, n.prototype.getOptions = function(e) {
return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
show:e.delay,
hide:e.delay
}), e;
}, n.prototype.getDelegateOptions = function() {
var e = {}, n = this.getDefaults();
return this._options && t.each(this._options, function(t, i) {
n[t] != i && (e[t] = i);
}), e;
}, n.prototype.enter = function(e) {
var n = e instanceof this.constructor ? e :t(e.currentTarget).data("bs." + this.type);
return n && n.$tip && n.$tip.is(":visible") ? void (n.hoverState = "in") :(n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), 
t(e.currentTarget).data("bs." + this.type, n)), clearTimeout(n.timeout), n.hoverState = "in", 
n.options.delay && n.options.delay.show ? void (n.timeout = setTimeout(function() {
"in" == n.hoverState && n.show();
}, n.options.delay.show)) :n.show());
}, n.prototype.leave = function(e) {
var n = e instanceof this.constructor ? e :t(e.currentTarget).data("bs." + this.type);
return n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), 
t(e.currentTarget).data("bs." + this.type, n)), clearTimeout(n.timeout), n.hoverState = "out", 
n.options.delay && n.options.delay.hide ? void (n.timeout = setTimeout(function() {
"out" == n.hoverState && n.hide();
}, n.options.delay.hide)) :n.hide();
}, n.prototype.show = function() {
var e = t.Event("show.bs." + this.type);
if (this.hasContent() && this.enabled) {
this.$element.trigger(e);
var i = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
if (e.isDefaultPrevented() || !i) return;
var r = this, o = this.tip(), s = this.getUID(this.type);
this.setContent(), o.attr("id", s), this.$element.attr("aria-describedby", s), this.options.animation && o.addClass("fade");
var a = "function" == typeof this.options.placement ? this.options.placement.call(this, o[0], this.$element[0]) :this.options.placement, u = /\s?auto?\s?/i, l = u.test(a);
l && (a = a.replace(u, "") || "top"), o.detach().css({
top:0,
left:0,
display:"block"
}).addClass(a).data("bs." + this.type, this), this.options.container ? o.appendTo(this.options.container) :o.insertAfter(this.$element);
var c = this.getPosition(), h = o[0].offsetWidth, d = o[0].offsetHeight;
if (l) {
var f = a, p = this.options.container ? t(this.options.container) :this.$element.parent(), m = this.getPosition(p);
a = "bottom" == a && c.bottom + d > m.bottom ? "top" :"top" == a && c.top - d < m.top ? "bottom" :"right" == a && c.right + h > m.width ? "left" :"left" == a && c.left - h < m.left ? "right" :a, 
o.removeClass(f).addClass(a);
}
var g = this.getCalculatedOffset(a, c, h, d);
this.applyPlacement(g, a);
var v = function() {
var t = r.hoverState;
r.$element.trigger("shown.bs." + r.type), r.hoverState = null, "out" == t && r.leave(r);
};
t.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", v).emulateTransitionEnd(n.TRANSITION_DURATION) :v();
}
}, n.prototype.applyPlacement = function(e, n) {
var i = this.tip(), r = i[0].offsetWidth, o = i[0].offsetHeight, s = parseInt(i.css("margin-top"), 10), a = parseInt(i.css("margin-left"), 10);
isNaN(s) && (s = 0), isNaN(a) && (a = 0), e.top = e.top + s, e.left = e.left + a, 
t.offset.setOffset(i[0], t.extend({
using:function(t) {
i.css({
top:Math.round(t.top),
left:Math.round(t.left)
});
}
}, e), 0), i.addClass("in");
var u = i[0].offsetWidth, l = i[0].offsetHeight;
"top" == n && l != o && (e.top = e.top + o - l);
var c = this.getViewportAdjustedDelta(n, e, u, l);
c.left ? e.left += c.left :e.top += c.top;
var h = /top|bottom/.test(n), d = h ? 2 * c.left - r + u :2 * c.top - o + l, f = h ? "offsetWidth" :"offsetHeight";
i.offset(e), this.replaceArrow(d, i[0][f], h);
}, n.prototype.replaceArrow = function(t, e, n) {
this.arrow().css(n ? "left" :"top", 50 * (1 - t / e) + "%").css(n ? "top" :"left", "");
}, n.prototype.setContent = function() {
var t = this.tip(), e = this.getTitle();
t.find(".tooltip-inner")[this.options.html ? "html" :"text"](e), t.removeClass("fade in top bottom left right");
}, n.prototype.hide = function(e) {
function i() {
"in" != r.hoverState && o.detach(), r.$element.removeAttr("aria-describedby").trigger("hidden.bs." + r.type), 
e && e();
}
var r = this, o = this.tip(), s = t.Event("hide.bs." + this.type);
return this.$element.trigger(s), s.isDefaultPrevented() ? void 0 :(o.removeClass("in"), 
t.support.transition && this.$tip.hasClass("fade") ? o.one("bsTransitionEnd", i).emulateTransitionEnd(n.TRANSITION_DURATION) :i(), 
this.hoverState = null, this);
}, n.prototype.fixTitle = function() {
var t = this.$element;
(t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "");
}, n.prototype.hasContent = function() {
return this.getTitle();
}, n.prototype.getPosition = function(e) {
e = e || this.$element;
var n = e[0], i = "BODY" == n.tagName, r = n.getBoundingClientRect();
null == r.width && (r = t.extend({}, r, {
width:r.right - r.left,
height:r.bottom - r.top
}));
var o = i ? {
top:0,
left:0
} :e.offset(), s = {
scroll:i ? document.documentElement.scrollTop || document.body.scrollTop :e.scrollTop()
}, a = i ? {
width:t(window).width(),
height:t(window).height()
} :null;
return t.extend({}, r, s, a, o);
}, n.prototype.getCalculatedOffset = function(t, e, n, i) {
return "bottom" == t ? {
top:e.top + e.height,
left:e.left + e.width / 2 - n / 2
} :"top" == t ? {
top:e.top - i,
left:e.left + e.width / 2 - n / 2
} :"left" == t ? {
top:e.top + e.height / 2 - i / 2,
left:e.left - n
} :{
top:e.top + e.height / 2 - i / 2,
left:e.left + e.width
};
}, n.prototype.getViewportAdjustedDelta = function(t, e, n, i) {
var r = {
top:0,
left:0
};
if (!this.$viewport) return r;
var o = this.options.viewport && this.options.viewport.padding || 0, s = this.getPosition(this.$viewport);
if (/right|left/.test(t)) {
var a = e.top - o - s.scroll, u = e.top + o - s.scroll + i;
a < s.top ? r.top = s.top - a :u > s.top + s.height && (r.top = s.top + s.height - u);
} else {
var l = e.left - o, c = e.left + o + n;
l < s.left ? r.left = s.left - l :c > s.width && (r.left = s.left + s.width - c);
}
return r;
}, n.prototype.getTitle = function() {
var t, e = this.$element, n = this.options;
return t = e.attr("data-original-title") || ("function" == typeof n.title ? n.title.call(e[0]) :n.title);
}, n.prototype.getUID = function(t) {
do t += ~~(1e6 * Math.random()); while (document.getElementById(t));
return t;
}, n.prototype.tip = function() {
return this.$tip = this.$tip || t(this.options.template);
}, n.prototype.arrow = function() {
return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
}, n.prototype.enable = function() {
this.enabled = !0;
}, n.prototype.disable = function() {
this.enabled = !1;
}, n.prototype.toggleEnabled = function() {
this.enabled = !this.enabled;
}, n.prototype.toggle = function(e) {
var n = this;
e && (n = t(e.currentTarget).data("bs." + this.type), n || (n = new this.constructor(e.currentTarget, this.getDelegateOptions()), 
t(e.currentTarget).data("bs." + this.type, n))), n.tip().hasClass("in") ? n.leave(n) :n.enter(n);
}, n.prototype.destroy = function() {
var t = this;
clearTimeout(this.timeout), this.hide(function() {
t.$element.off("." + t.type).removeData("bs." + t.type);
});
};
var i = t.fn.tooltip;
t.fn.tooltip = e, t.fn.tooltip.Constructor = n, t.fn.tooltip.noConflict = function() {
return t.fn.tooltip = i, this;
};
}(jQuery), +function(t) {
"use strict";
function e() {
var t = document.createElement("bootstrap"), e = {
WebkitTransition:"webkitTransitionEnd",
MozTransition:"transitionend",
OTransition:"oTransitionEnd otransitionend",
transition:"transitionend"
};
for (var n in e) if (void 0 !== t.style[n]) return {
end:e[n]
};
return !1;
}
t.fn.emulateTransitionEnd = function(e) {
var n = !1, i = this;
t(this).one("bsTransitionEnd", function() {
n = !0;
});
var r = function() {
n || t(i).trigger(t.support.transition.end);
};
return setTimeout(r, e), this;
}, t(function() {
t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
bindType:t.support.transition.end,
delegateType:t.support.transition.end,
handle:function(e) {
return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) :void 0;
}
});
});
}(jQuery), +function(t) {
"use strict";
function e(e) {
return this.each(function() {
var i = t(this), r = i.data("bs.affix"), o = "object" == typeof e && e;
r || i.data("bs.affix", r = new n(this, o)), "string" == typeof e && r[e]();
});
}
var n = function(e, i) {
this.options = t.extend({}, n.DEFAULTS, i), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), 
this.$element = t(e), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition();
};
n.VERSION = "3.3.2", n.RESET = "affix affix-top affix-bottom", n.DEFAULTS = {
offset:0,
target:window
}, n.prototype.getState = function(t, e, n, i) {
var r = this.$target.scrollTop(), o = this.$element.offset(), s = this.$target.height();
if (null != n && "top" == this.affixed) return n > r ? "top" :!1;
if ("bottom" == this.affixed) return null != n ? r + this.unpin <= o.top ? !1 :"bottom" :t - i >= r + s ? !1 :"bottom";
var a = null == this.affixed, u = a ? r :o.top, l = a ? s :e;
return null != n && n >= r ? "top" :null != i && u + l >= t - i ? "bottom" :!1;
}, n.prototype.getPinnedOffset = function() {
if (this.pinnedOffset) return this.pinnedOffset;
this.$element.removeClass(n.RESET).addClass("affix");
var t = this.$target.scrollTop(), e = this.$element.offset();
return this.pinnedOffset = e.top - t;
}, n.prototype.checkPositionWithEventLoop = function() {
setTimeout(t.proxy(this.checkPosition, this), 1);
}, n.prototype.checkPosition = function() {
if (this.$element.is(":visible")) {
var e = this.$element.height(), i = this.options.offset, r = i.top, o = i.bottom, s = t("body").height();
"object" != typeof i && (o = r = i), "function" == typeof r && (r = i.top(this.$element)), 
"function" == typeof o && (o = i.bottom(this.$element));
var a = this.getState(s, e, r, o);
if (this.affixed != a) {
null != this.unpin && this.$element.css("top", "");
var u = "affix" + (a ? "-" + a :""), l = t.Event(u + ".bs.affix");
if (this.$element.trigger(l), l.isDefaultPrevented()) return;
this.affixed = a, this.unpin = "bottom" == a ? this.getPinnedOffset() :null, this.$element.removeClass(n.RESET).addClass(u).trigger(u.replace("affix", "affixed") + ".bs.affix");
}
"bottom" == a && this.$element.offset({
top:s - e - o
});
}
};
var i = t.fn.affix;
t.fn.affix = e, t.fn.affix.Constructor = n, t.fn.affix.noConflict = function() {
return t.fn.affix = i, this;
}, t(window).on("load", function() {
t('[data-spy="affix"]').each(function() {
var n = t(this), i = n.data();
i.offset = i.offset || {}, null != i.offsetBottom && (i.offset.bottom = i.offsetBottom), 
null != i.offsetTop && (i.offset.top = i.offsetTop), e.call(n, i);
});
});
}(jQuery), function(t, e) {
"object" == typeof exports && "undefined" != typeof module ? module.exports = e() :"function" == typeof define && define.amd ? define(e) :t.Immutable = e();
}(this, function() {
"use strict";
function t(t, e) {
e && (t.prototype = Object.create(e.prototype)), t.prototype.constructor = t;
}
function e(t) {
return o(t) ? t :M(t);
}
function n(t) {
return s(t) ? t :O(t);
}
function i(t) {
return a(t) ? t :I(t);
}
function r(t) {
return o(t) && !u(t) ? t :j(t);
}
function o(t) {
return !(!t || !t[li]);
}
function s(t) {
return !(!t || !t[ci]);
}
function a(t) {
return !(!t || !t[hi]);
}
function u(t) {
return s(t) || a(t);
}
function l(t) {
return !(!t || !t[di]);
}
function c(t) {
return t.value = !1, t;
}
function h(t) {
t && (t.value = !0);
}
function d() {}
function f(t, e) {
e = e || 0;
for (var n = Math.max(0, t.length - e), i = new Array(n), r = 0; n > r; r++) i[r] = t[r + e];
return i;
}
function p(t) {
return void 0 === t.size && (t.size = t.__iterate(g)), t.size;
}
function m(t, e) {
if ("number" != typeof e) {
var n = e >>> 0;
if ("" + n !== e || 4294967295 === n) return 0/0;
e = n;
}
return 0 > e ? p(t) + e :e;
}
function g() {
return !0;
}
function v(t, e, n) {
return (0 === t || void 0 !== n && -n >= t) && (void 0 === e || void 0 !== n && e >= n);
}
function y(t, e) {
return b(t, e, 0);
}
function _(t, e) {
return b(t, e, e);
}
function b(t, e, n) {
return void 0 === t ? n :0 > t ? Math.max(0, e + t) :void 0 === e ? t :Math.min(e, t);
}
function w(t) {
this.next = t;
}
function x(t, e, n, i) {
var r = 0 === t ? e :1 === t ? n :[ e, n ];
return i ? i.value = r :i = {
value:r,
done:!1
}, i;
}
function S() {
return {
value:void 0,
done:!0
};
}
function k(t) {
return !!E(t);
}
function C(t) {
return t && "function" == typeof t.next;
}
function T(t) {
var e = E(t);
return e && e.call(t);
}
function E(t) {
var e = t && (Si && t[Si] || t[ki]);
return "function" == typeof e ? e :void 0;
}
function D(t) {
return t && "number" == typeof t.length;
}
function M(t) {
return null === t || void 0 === t ? N() :o(t) ? t.toSeq() :F(t);
}
function O(t) {
return null === t || void 0 === t ? N().toKeyedSeq() :o(t) ? s(t) ? t.toSeq() :t.fromEntrySeq() :R(t);
}
function I(t) {
return null === t || void 0 === t ? N() :o(t) ? s(t) ? t.entrySeq() :t.toIndexedSeq() :$(t);
}
function j(t) {
return (null === t || void 0 === t ? N() :o(t) ? s(t) ? t.entrySeq() :t :$(t)).toSetSeq();
}
function A(t) {
this._array = t, this.size = t.length;
}
function L(t) {
var e = Object.keys(t);
this._object = t, this._keys = e, this.size = e.length;
}
function z(t) {
this._iterable = t, this.size = t.length || t.size;
}
function P(t) {
this._iterator = t, this._iteratorCache = [];
}
function H(t) {
return !(!t || !t[Ti]);
}
function N() {
return Ei || (Ei = new A([]));
}
function R(t) {
var e = Array.isArray(t) ? new A(t).fromEntrySeq() :C(t) ? new P(t).fromEntrySeq() :k(t) ? new z(t).fromEntrySeq() :"object" == typeof t ? new L(t) :void 0;
if (!e) throw new TypeError("Expected Array or iterable object of [k, v] entries, or keyed object: " + t);
return e;
}
function $(t) {
var e = q(t);
if (!e) throw new TypeError("Expected Array or iterable object of values: " + t);
return e;
}
function F(t) {
var e = q(t) || "object" == typeof t && new L(t);
if (!e) throw new TypeError("Expected Array or iterable object of values, or keyed object: " + t);
return e;
}
function q(t) {
return D(t) ? new A(t) :C(t) ? new P(t) :k(t) ? new z(t) :void 0;
}
function U(t, e, n, i) {
var r = t._cache;
if (r) {
for (var o = r.length - 1, s = 0; o >= s; s++) {
var a = r[n ? o - s :s];
if (e(a[1], i ? a[0] :s, t) === !1) return s + 1;
}
return s;
}
return t.__iterateUncached(e, n);
}
function B(t, e, n, i) {
var r = t._cache;
if (r) {
var o = r.length - 1, s = 0;
return new w(function() {
var t = r[n ? o - s :s];
return s++ > o ? S() :x(e, i ? t[0] :s - 1, t[1]);
});
}
return t.__iteratorUncached(e, n);
}
function Y(t, e) {
return e ? W(e, t, "", {
"":t
}) :V(t);
}
function W(t, e, n, i) {
return Array.isArray(e) ? t.call(i, n, I(e).map(function(n, i) {
return W(t, n, i, e);
})) :G(e) ? t.call(i, n, O(e).map(function(n, i) {
return W(t, n, i, e);
})) :e;
}
function V(t) {
return Array.isArray(t) ? I(t).map(V).toList() :G(t) ? O(t).map(V).toMap() :t;
}
function G(t) {
return t && (t.constructor === Object || void 0 === t.constructor);
}
function X(t, e) {
if (t === e || t !== t && e !== e) return !0;
if (!t || !e) return !1;
if ("function" == typeof t.valueOf && "function" == typeof e.valueOf) {
if (t = t.valueOf(), e = e.valueOf(), t === e || t !== t && e !== e) return !0;
if (!t || !e) return !1;
}
return "function" == typeof t.equals && "function" == typeof e.equals && t.equals(e) ? !0 :!1;
}
function J(t, e) {
if (t === e) return !0;
if (!o(e) || void 0 !== t.size && void 0 !== e.size && t.size !== e.size || void 0 !== t.__hash && void 0 !== e.__hash && t.__hash !== e.__hash || s(t) !== s(e) || a(t) !== a(e) || l(t) !== l(e)) return !1;
if (0 === t.size && 0 === e.size) return !0;
var n = !u(t);
if (l(t)) {
var i = t.entries();
return e.every(function(t, e) {
var r = i.next().value;
return r && X(r[1], t) && (n || X(r[0], e));
}) && i.next().done;
}
var r = !1;
if (void 0 === t.size) if (void 0 === e.size) "function" == typeof t.cacheResult && t.cacheResult(); else {
r = !0;
var c = t;
t = e, e = c;
}
var h = !0, d = e.__iterate(function(e, i) {
return (n ? t.has(e) :r ? X(e, t.get(i, vi)) :X(t.get(i, vi), e)) ? void 0 :(h = !1, 
!1);
});
return h && t.size === d;
}
function Z(t, e) {
if (!(this instanceof Z)) return new Z(t, e);
if (this._value = t, this.size = void 0 === e ? 1/0 :Math.max(0, e), 0 === this.size) {
if (Di) return Di;
Di = this;
}
}
function K(t, e) {
if (!t) throw new Error(e);
}
function Q(t, e, n) {
if (!(this instanceof Q)) return new Q(t, e, n);
if (K(0 !== n, "Cannot step a Range by 0"), t = t || 0, void 0 === e && (e = 1/0), 
n = void 0 === n ? 1 :Math.abs(n), t > e && (n = -n), this._start = t, this._end = e, 
this._step = n, this.size = Math.max(0, Math.ceil((e - t) / n - 1) + 1), 0 === this.size) {
if (Mi) return Mi;
Mi = this;
}
}
function te() {
throw TypeError("Abstract");
}
function ee() {}
function ne() {}
function ie() {}
function re(t) {
return t >>> 1 & 1073741824 | 3221225471 & t;
}
function oe(t) {
if (t === !1 || null === t || void 0 === t) return 0;
if ("function" == typeof t.valueOf && (t = t.valueOf(), t === !1 || null === t || void 0 === t)) return 0;
if (t === !0) return 1;
var e = typeof t;
if ("number" === e) {
var n = 0 | t;
for (n !== t && (n ^= 4294967295 * t); t > 4294967295; ) t /= 4294967295, n ^= t;
return re(n);
}
if ("string" === e) return t.length > Hi ? se(t) :ae(t);
if ("function" == typeof t.hashCode) return t.hashCode();
if ("object" === e) return ue(t);
if ("function" == typeof t.toString) return ae(t.toString());
throw new Error("Value type " + e + " cannot be hashed.");
}
function se(t) {
var e = $i[t];
return void 0 === e && (e = ae(t), Ri === Ni && (Ri = 0, $i = {}), Ri++, $i[t] = e), 
e;
}
function ae(t) {
for (var e = 0, n = 0; n < t.length; n++) e = 31 * e + t.charCodeAt(n) | 0;
return re(e);
}
function ue(t) {
var e;
if (Li && (e = Oi.get(t), void 0 !== e)) return e;
if (e = t[Pi], void 0 !== e) return e;
if (!Ai) {
if (e = t.propertyIsEnumerable && t.propertyIsEnumerable[Pi], void 0 !== e) return e;
if (e = le(t), void 0 !== e) return e;
}
if (e = ++zi, 1073741824 & zi && (zi = 0), Li) Oi.set(t, e); else {
if (void 0 !== ji && ji(t) === !1) throw new Error("Non-extensible objects are not allowed as keys.");
if (Ai) Object.defineProperty(t, Pi, {
enumerable:!1,
configurable:!1,
writable:!1,
value:e
}); else if (void 0 !== t.propertyIsEnumerable && t.propertyIsEnumerable === t.constructor.prototype.propertyIsEnumerable) t.propertyIsEnumerable = function() {
return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
}, t.propertyIsEnumerable[Pi] = e; else {
if (void 0 === t.nodeType) throw new Error("Unable to set a non-enumerable property on object.");
t[Pi] = e;
}
}
return e;
}
function le(t) {
if (t && t.nodeType > 0) switch (t.nodeType) {
case 1:
return t.uniqueID;

case 9:
return t.documentElement && t.documentElement.uniqueID;
}
}
function ce(t) {
K(1/0 !== t, "Cannot perform this action with an infinite size.");
}
function he(t) {
return null === t || void 0 === t ? xe() :de(t) && !l(t) ? t :xe().withMutations(function(e) {
var i = n(t);
ce(i.size), i.forEach(function(t, n) {
return e.set(n, t);
});
});
}
function de(t) {
return !(!t || !t[Fi]);
}
function fe(t, e) {
this.ownerID = t, this.entries = e;
}
function pe(t, e, n) {
this.ownerID = t, this.bitmap = e, this.nodes = n;
}
function me(t, e, n) {
this.ownerID = t, this.count = e, this.nodes = n;
}
function ge(t, e, n) {
this.ownerID = t, this.keyHash = e, this.entries = n;
}
function ve(t, e, n) {
this.ownerID = t, this.keyHash = e, this.entry = n;
}
function ye(t, e, n) {
this._type = e, this._reverse = n, this._stack = t._root && be(t._root);
}
function _e(t, e) {
return x(t, e[0], e[1]);
}
function be(t, e) {
return {
node:t,
index:0,
__prev:e
};
}
function we(t, e, n, i) {
var r = Object.create(qi);
return r.size = t, r._root = e, r.__ownerID = n, r.__hash = i, r.__altered = !1, 
r;
}
function xe() {
return Ui || (Ui = we(0));
}
function Se(t, e, n) {
var i, r;
if (t._root) {
var o = c(yi), s = c(_i);
if (i = ke(t._root, t.__ownerID, 0, void 0, e, n, o, s), !s.value) return t;
r = t.size + (o.value ? n === vi ? -1 :1 :0);
} else {
if (n === vi) return t;
r = 1, i = new fe(t.__ownerID, [ [ e, n ] ]);
}
return t.__ownerID ? (t.size = r, t._root = i, t.__hash = void 0, t.__altered = !0, 
t) :i ? we(r, i) :xe();
}
function ke(t, e, n, i, r, o, s, a) {
return t ? t.update(e, n, i, r, o, s, a) :o === vi ? t :(h(a), h(s), new ve(e, i, [ r, o ]));
}
function Ce(t) {
return t.constructor === ve || t.constructor === ge;
}
function Te(t, e, n, i, r) {
if (t.keyHash === i) return new ge(e, i, [ t.entry, r ]);
var o, s = (0 === n ? t.keyHash :t.keyHash >>> n) & gi, a = (0 === n ? i :i >>> n) & gi, u = s === a ? [ Te(t, e, n + pi, i, r) ] :(o = new ve(e, i, r), 
a > s ? [ t, o ] :[ o, t ]);
return new pe(e, 1 << s | 1 << a, u);
}
function Ee(t, e, n, i) {
t || (t = new d());
for (var r = new ve(t, oe(n), [ n, i ]), o = 0; o < e.length; o++) {
var s = e[o];
r = r.update(t, 0, void 0, s[0], s[1]);
}
return r;
}
function De(t, e, n, i) {
for (var r = 0, o = 0, s = new Array(n), a = 0, u = 1, l = e.length; l > a; a++, 
u <<= 1) {
var c = e[a];
void 0 !== c && a !== i && (r |= u, s[o++] = c);
}
return new pe(t, r, s);
}
function Me(t, e, n, i, r) {
for (var o = 0, s = new Array(mi), a = 0; 0 !== n; a++, n >>>= 1) s[a] = 1 & n ? e[o++] :void 0;
return s[i] = r, new me(t, o + 1, s);
}
function Oe(t, e, i) {
for (var r = [], s = 0; s < i.length; s++) {
var a = i[s], u = n(a);
o(a) || (u = u.map(function(t) {
return Y(t);
})), r.push(u);
}
return Ae(t, e, r);
}
function Ie(t, e) {
return t && t.mergeDeep && o(e) ? t.mergeDeep(e) :X(t, e) ? t :e;
}
function je(t) {
return function(e, n, i) {
if (e && e.mergeDeepWith && o(n)) return e.mergeDeepWith(t, n);
var r = t(e, n, i);
return X(e, r) ? e :r;
};
}
function Ae(t, e, n) {
return n = n.filter(function(t) {
return 0 !== t.size;
}), 0 === n.length ? t :0 !== t.size || t.__ownerID || 1 !== n.length ? t.withMutations(function(t) {
for (var i = e ? function(n, i) {
t.update(i, vi, function(t) {
return t === vi ? n :e(t, n, i);
});
} :function(e, n) {
t.set(n, e);
}, r = 0; r < n.length; r++) n[r].forEach(i);
}) :t.constructor(n[0]);
}
function Le(t, e, n, i) {
var r = t === vi, o = e.next();
if (o.done) {
var s = r ? n :t, a = i(s);
return a === s ? t :a;
}
K(r || t && t.set, "invalid keyPath");
var u = o.value, l = r ? vi :t.get(u, vi), c = Le(l, e, n, i);
return c === l ? t :c === vi ? t.remove(u) :(r ? xe() :t).set(u, c);
}
function ze(t) {
return t -= t >> 1 & 1431655765, t = (858993459 & t) + (t >> 2 & 858993459), t = t + (t >> 4) & 252645135, 
t += t >> 8, t += t >> 16, 127 & t;
}
function Pe(t, e, n, i) {
var r = i ? t :f(t);
return r[e] = n, r;
}
function He(t, e, n, i) {
var r = t.length + 1;
if (i && e + 1 === r) return t[e] = n, t;
for (var o = new Array(r), s = 0, a = 0; r > a; a++) a === e ? (o[a] = n, s = -1) :o[a] = t[a + s];
return o;
}
function Ne(t, e, n) {
var i = t.length - 1;
if (n && e === i) return t.pop(), t;
for (var r = new Array(i), o = 0, s = 0; i > s; s++) s === e && (o = 1), r[s] = t[s + o];
return r;
}
function Re(t) {
var e = Be();
if (null === t || void 0 === t) return e;
if ($e(t)) return t;
var n = i(t), r = n.size;
return 0 === r ? e :(ce(r), r > 0 && mi > r ? Ue(0, r, pi, null, new Fe(n.toArray())) :e.withMutations(function(t) {
t.setSize(r), n.forEach(function(e, n) {
return t.set(n, e);
});
}));
}
function $e(t) {
return !(!t || !t[Vi]);
}
function Fe(t, e) {
this.array = t, this.ownerID = e;
}
function qe(t, e) {
function n(t, e, n) {
return 0 === e ? i(t, n) :r(t, e, n);
}
function i(t, n) {
var i = n === a ? u && u.array :t && t.array, r = n > o ? 0 :o - n, l = s - n;
return l > mi && (l = mi), function() {
if (r === l) return Ji;
var t = e ? --l :r++;
return i && i[t];
};
}
function r(t, i, r) {
var a, u = t && t.array, l = r > o ? 0 :o - r >> i, c = (s - r >> i) + 1;
return c > mi && (c = mi), function() {
for (;;) {
if (a) {
var t = a();
if (t !== Ji) return t;
a = null;
}
if (l === c) return Ji;
var o = e ? --c :l++;
a = n(u && u[o], i - pi, r + (o << i));
}
};
}
var o = t._origin, s = t._capacity, a = Ze(s), u = t._tail;
return n(t._root, t._level, 0);
}
function Ue(t, e, n, i, r, o, s) {
var a = Object.create(Gi);
return a.size = e - t, a._origin = t, a._capacity = e, a._level = n, a._root = i, 
a._tail = r, a.__ownerID = o, a.__hash = s, a.__altered = !1, a;
}
function Be() {
return Xi || (Xi = Ue(0, 0, pi));
}
function Ye(t, e, n) {
if (e = m(t, e), e !== e) return t;
if (e >= t.size || 0 > e) return t.withMutations(function(t) {
0 > e ? Xe(t, e).set(0, n) :Xe(t, 0, e + 1).set(e, n);
});
e += t._origin;
var i = t._tail, r = t._root, o = c(_i);
return e >= Ze(t._capacity) ? i = We(i, t.__ownerID, 0, e, n, o) :r = We(r, t.__ownerID, t._level, e, n, o), 
o.value ? t.__ownerID ? (t._root = r, t._tail = i, t.__hash = void 0, t.__altered = !0, 
t) :Ue(t._origin, t._capacity, t._level, r, i) :t;
}
function We(t, e, n, i, r, o) {
var s = i >>> n & gi, a = t && s < t.array.length;
if (!a && void 0 === r) return t;
var u;
if (n > 0) {
var l = t && t.array[s], c = We(l, e, n - pi, i, r, o);
return c === l ? t :(u = Ve(t, e), u.array[s] = c, u);
}
return a && t.array[s] === r ? t :(h(o), u = Ve(t, e), void 0 === r && s === u.array.length - 1 ? u.array.pop() :u.array[s] = r, 
u);
}
function Ve(t, e) {
return e && t && e === t.ownerID ? t :new Fe(t ? t.array.slice() :[], e);
}
function Ge(t, e) {
if (e >= Ze(t._capacity)) return t._tail;
if (e < 1 << t._level + pi) {
for (var n = t._root, i = t._level; n && i > 0; ) n = n.array[e >>> i & gi], i -= pi;
return n;
}
}
function Xe(t, e, n) {
void 0 !== e && (e = 0 | e), void 0 !== n && (n = 0 | n);
var i = t.__ownerID || new d(), r = t._origin, o = t._capacity, s = r + e, a = void 0 === n ? o :0 > n ? o + n :r + n;
if (s === r && a === o) return t;
if (s >= a) return t.clear();
for (var u = t._level, l = t._root, c = 0; 0 > s + c; ) l = new Fe(l && l.array.length ? [ void 0, l ] :[], i), 
u += pi, c += 1 << u;
c && (s += c, r += c, a += c, o += c);
for (var h = Ze(o), f = Ze(a); f >= 1 << u + pi; ) l = new Fe(l && l.array.length ? [ l ] :[], i), 
u += pi;
var p = t._tail, m = h > f ? Ge(t, a - 1) :f > h ? new Fe([], i) :p;
if (p && f > h && o > s && p.array.length) {
l = Ve(l, i);
for (var g = l, v = u; v > pi; v -= pi) {
var y = h >>> v & gi;
g = g.array[y] = Ve(g.array[y], i);
}
g.array[h >>> pi & gi] = p;
}
if (o > a && (m = m && m.removeAfter(i, 0, a)), s >= f) s -= f, a -= f, u = pi, 
l = null, m = m && m.removeBefore(i, 0, s); else if (s > r || h > f) {
for (c = 0; l; ) {
var _ = s >>> u & gi;
if (_ !== f >>> u & gi) break;
_ && (c += (1 << u) * _), u -= pi, l = l.array[_];
}
l && s > r && (l = l.removeBefore(i, u, s - c)), l && h > f && (l = l.removeAfter(i, u, f - c)), 
c && (s -= c, a -= c);
}
return t.__ownerID ? (t.size = a - s, t._origin = s, t._capacity = a, t._level = u, 
t._root = l, t._tail = m, t.__hash = void 0, t.__altered = !0, t) :Ue(s, a, u, l, m);
}
function Je(t, e, n) {
for (var r = [], s = 0, a = 0; a < n.length; a++) {
var u = n[a], l = i(u);
l.size > s && (s = l.size), o(u) || (l = l.map(function(t) {
return Y(t);
})), r.push(l);
}
return s > t.size && (t = t.setSize(s)), Ae(t, e, r);
}
function Ze(t) {
return mi > t ? 0 :t - 1 >>> pi << pi;
}
function Ke(t) {
return null === t || void 0 === t ? en() :Qe(t) ? t :en().withMutations(function(e) {
var i = n(t);
ce(i.size), i.forEach(function(t, n) {
return e.set(n, t);
});
});
}
function Qe(t) {
return de(t) && l(t);
}
function tn(t, e, n, i) {
var r = Object.create(Ke.prototype);
return r.size = t ? t.size :0, r._map = t, r._list = e, r.__ownerID = n, r.__hash = i, 
r;
}
function en() {
return Zi || (Zi = tn(xe(), Be()));
}
function nn(t, e, n) {
var i, r, o = t._map, s = t._list, a = o.get(e), u = void 0 !== a;
if (n === vi) {
if (!u) return t;
s.size >= mi && s.size >= 2 * o.size ? (r = s.filter(function(t, e) {
return void 0 !== t && a !== e;
}), i = r.toKeyedSeq().map(function(t) {
return t[0];
}).flip().toMap(), t.__ownerID && (i.__ownerID = r.__ownerID = t.__ownerID)) :(i = o.remove(e), 
r = a === s.size - 1 ? s.pop() :s.set(a, void 0));
} else if (u) {
if (n === s.get(a)[1]) return t;
i = o, r = s.set(a, [ e, n ]);
} else i = o.set(e, s.size), r = s.set(s.size, [ e, n ]);
return t.__ownerID ? (t.size = i.size, t._map = i, t._list = r, t.__hash = void 0, 
t) :tn(i, r);
}
function rn(t, e) {
this._iter = t, this._useKeys = e, this.size = t.size;
}
function on(t) {
this._iter = t, this.size = t.size;
}
function sn(t) {
this._iter = t, this.size = t.size;
}
function an(t) {
this._iter = t, this.size = t.size;
}
function un(t) {
var e = Mn(t);
return e._iter = t, e.size = t.size, e.flip = function() {
return t;
}, e.reverse = function() {
var e = t.reverse.apply(this);
return e.flip = function() {
return t.reverse();
}, e;
}, e.has = function(e) {
return t.includes(e);
}, e.includes = function(e) {
return t.has(e);
}, e.cacheResult = On, e.__iterateUncached = function(e, n) {
var i = this;
return t.__iterate(function(t, n) {
return e(n, t, i) !== !1;
}, n);
}, e.__iteratorUncached = function(e, n) {
if (e === xi) {
var i = t.__iterator(e, n);
return new w(function() {
var t = i.next();
if (!t.done) {
var e = t.value[0];
t.value[0] = t.value[1], t.value[1] = e;
}
return t;
});
}
return t.__iterator(e === wi ? bi :wi, n);
}, e;
}
function ln(t, e, n) {
var i = Mn(t);
return i.size = t.size, i.has = function(e) {
return t.has(e);
}, i.get = function(i, r) {
var o = t.get(i, vi);
return o === vi ? r :e.call(n, o, i, t);
}, i.__iterateUncached = function(i, r) {
var o = this;
return t.__iterate(function(t, r, s) {
return i(e.call(n, t, r, s), r, o) !== !1;
}, r);
}, i.__iteratorUncached = function(i, r) {
var o = t.__iterator(xi, r);
return new w(function() {
var r = o.next();
if (r.done) return r;
var s = r.value, a = s[0];
return x(i, a, e.call(n, s[1], a, t), r);
});
}, i;
}
function cn(t, e) {
var n = Mn(t);
return n._iter = t, n.size = t.size, n.reverse = function() {
return t;
}, t.flip && (n.flip = function() {
var e = un(t);
return e.reverse = function() {
return t.flip();
}, e;
}), n.get = function(n, i) {
return t.get(e ? n :-1 - n, i);
}, n.has = function(n) {
return t.has(e ? n :-1 - n);
}, n.includes = function(e) {
return t.includes(e);
}, n.cacheResult = On, n.__iterate = function(e, n) {
var i = this;
return t.__iterate(function(t, n) {
return e(t, n, i);
}, !n);
}, n.__iterator = function(e, n) {
return t.__iterator(e, !n);
}, n;
}
function hn(t, e, n, i) {
var r = Mn(t);
return i && (r.has = function(i) {
var r = t.get(i, vi);
return r !== vi && !!e.call(n, r, i, t);
}, r.get = function(i, r) {
var o = t.get(i, vi);
return o !== vi && e.call(n, o, i, t) ? o :r;
}), r.__iterateUncached = function(r, o) {
var s = this, a = 0;
return t.__iterate(function(t, o, u) {
return e.call(n, t, o, u) ? (a++, r(t, i ? o :a - 1, s)) :void 0;
}, o), a;
}, r.__iteratorUncached = function(r, o) {
var s = t.__iterator(xi, o), a = 0;
return new w(function() {
for (;;) {
var o = s.next();
if (o.done) return o;
var u = o.value, l = u[0], c = u[1];
if (e.call(n, c, l, t)) return x(r, i ? l :a++, c, o);
}
});
}, r;
}
function dn(t, e, n) {
var i = he().asMutable();
return t.__iterate(function(r, o) {
i.update(e.call(n, r, o, t), 0, function(t) {
return t + 1;
});
}), i.asImmutable();
}
function fn(t, e, n) {
var i = s(t), r = (l(t) ? Ke() :he()).asMutable();
t.__iterate(function(o, s) {
r.update(e.call(n, o, s, t), function(t) {
return t = t || [], t.push(i ? [ s, o ] :o), t;
});
});
var o = Dn(t);
return r.map(function(e) {
return Cn(t, o(e));
});
}
function pn(t, e, n, i) {
var r = t.size;
if (void 0 !== e && (e = 0 | e), void 0 !== n && (n = 0 | n), v(e, n, r)) return t;
var o = y(e, r), s = _(n, r);
if (o !== o || s !== s) return pn(t.toSeq().cacheResult(), e, n, i);
var a, u = s - o;
u === u && (a = 0 > u ? 0 :u);
var l = Mn(t);
return l.size = 0 === a ? a :t.size && a || void 0, !i && H(t) && a >= 0 && (l.get = function(e, n) {
return e = m(this, e), e >= 0 && a > e ? t.get(e + o, n) :n;
}), l.__iterateUncached = function(e, n) {
var r = this;
if (0 === a) return 0;
if (n) return this.cacheResult().__iterate(e, n);
var s = 0, u = !0, l = 0;
return t.__iterate(function(t, n) {
return u && (u = s++ < o) ? void 0 :(l++, e(t, i ? n :l - 1, r) !== !1 && l !== a);
}), l;
}, l.__iteratorUncached = function(e, n) {
if (0 !== a && n) return this.cacheResult().__iterator(e, n);
var r = 0 !== a && t.__iterator(e, n), s = 0, u = 0;
return new w(function() {
for (;s++ < o; ) r.next();
if (++u > a) return S();
var t = r.next();
return i || e === wi ? t :e === bi ? x(e, u - 1, void 0, t) :x(e, u - 1, t.value[1], t);
});
}, l;
}
function mn(t, e, n) {
var i = Mn(t);
return i.__iterateUncached = function(i, r) {
var o = this;
if (r) return this.cacheResult().__iterate(i, r);
var s = 0;
return t.__iterate(function(t, r, a) {
return e.call(n, t, r, a) && ++s && i(t, r, o);
}), s;
}, i.__iteratorUncached = function(i, r) {
var o = this;
if (r) return this.cacheResult().__iterator(i, r);
var s = t.__iterator(xi, r), a = !0;
return new w(function() {
if (!a) return S();
var t = s.next();
if (t.done) return t;
var r = t.value, u = r[0], l = r[1];
return e.call(n, l, u, o) ? i === xi ? t :x(i, u, l, t) :(a = !1, S());
});
}, i;
}
function gn(t, e, n, i) {
var r = Mn(t);
return r.__iterateUncached = function(r, o) {
var s = this;
if (o) return this.cacheResult().__iterate(r, o);
var a = !0, u = 0;
return t.__iterate(function(t, o, l) {
return a && (a = e.call(n, t, o, l)) ? void 0 :(u++, r(t, i ? o :u - 1, s));
}), u;
}, r.__iteratorUncached = function(r, o) {
var s = this;
if (o) return this.cacheResult().__iterator(r, o);
var a = t.__iterator(xi, o), u = !0, l = 0;
return new w(function() {
var t, o, c;
do {
if (t = a.next(), t.done) return i || r === wi ? t :r === bi ? x(r, l++, void 0, t) :x(r, l++, t.value[1], t);
var h = t.value;
o = h[0], c = h[1], u && (u = e.call(n, c, o, s));
} while (u);
return r === xi ? t :x(r, o, c, t);
});
}, r;
}
function vn(t, e) {
var i = s(t), r = [ t ].concat(e).map(function(t) {
return o(t) ? i && (t = n(t)) :t = i ? R(t) :$(Array.isArray(t) ? t :[ t ]), t;
}).filter(function(t) {
return 0 !== t.size;
});
if (0 === r.length) return t;
if (1 === r.length) {
var u = r[0];
if (u === t || i && s(u) || a(t) && a(u)) return u;
}
var l = new A(r);
return i ? l = l.toKeyedSeq() :a(t) || (l = l.toSetSeq()), l = l.flatten(!0), l.size = r.reduce(function(t, e) {
if (void 0 !== t) {
var n = e.size;
if (void 0 !== n) return t + n;
}
}, 0), l;
}
function yn(t, e, n) {
var i = Mn(t);
return i.__iterateUncached = function(i, r) {
function s(t, l) {
var c = this;
t.__iterate(function(t, r) {
return (!e || e > l) && o(t) ? s(t, l + 1) :i(t, n ? r :a++, c) === !1 && (u = !0), 
!u;
}, r);
}
var a = 0, u = !1;
return s(t, 0), a;
}, i.__iteratorUncached = function(i, r) {
var s = t.__iterator(i, r), a = [], u = 0;
return new w(function() {
for (;s; ) {
var t = s.next();
if (t.done === !1) {
var l = t.value;
if (i === xi && (l = l[1]), e && !(a.length < e) || !o(l)) return n ? t :x(i, u++, l, t);
a.push(s), s = l.__iterator(i, r);
} else s = a.pop();
}
return S();
});
}, i;
}
function _n(t, e, n) {
var i = Dn(t);
return t.toSeq().map(function(r, o) {
return i(e.call(n, r, o, t));
}).flatten(!0);
}
function bn(t, e) {
var n = Mn(t);
return n.size = t.size && 2 * t.size - 1, n.__iterateUncached = function(n, i) {
var r = this, o = 0;
return t.__iterate(function(t) {
return (!o || n(e, o++, r) !== !1) && n(t, o++, r) !== !1;
}, i), o;
}, n.__iteratorUncached = function(n, i) {
var r, o = t.__iterator(wi, i), s = 0;
return new w(function() {
return (!r || s % 2) && (r = o.next(), r.done) ? r :s % 2 ? x(n, s++, e) :x(n, s++, r.value, r);
});
}, n;
}
function wn(t, e, n) {
e || (e = In);
var i = s(t), r = 0, o = t.toSeq().map(function(e, i) {
return [ i, e, r++, n ? n(e, i, t) :e ];
}).toArray();
return o.sort(function(t, n) {
return e(t[3], n[3]) || t[2] - n[2];
}).forEach(i ? function(t, e) {
o[e].length = 2;
} :function(t, e) {
o[e] = t[1];
}), i ? O(o) :a(t) ? I(o) :j(o);
}
function xn(t, e, n) {
if (e || (e = In), n) {
var i = t.toSeq().map(function(e, i) {
return [ e, n(e, i, t) ];
}).reduce(function(t, n) {
return Sn(e, t[1], n[1]) ? n :t;
});
return i && i[0];
}
return t.reduce(function(t, n) {
return Sn(e, t, n) ? n :t;
});
}
function Sn(t, e, n) {
var i = t(n, e);
return 0 === i && n !== e && (void 0 === n || null === n || n !== n) || i > 0;
}
function kn(t, n, i) {
var r = Mn(t);
return r.size = new A(i).map(function(t) {
return t.size;
}).min(), r.__iterate = function(t, e) {
for (var n, i = this.__iterator(wi, e), r = 0; !(n = i.next()).done && t(n.value, r++, this) !== !1; ) ;
return r;
}, r.__iteratorUncached = function(t, r) {
var o = i.map(function(t) {
return t = e(t), T(r ? t.reverse() :t);
}), s = 0, a = !1;
return new w(function() {
var e;
return a || (e = o.map(function(t) {
return t.next();
}), a = e.some(function(t) {
return t.done;
})), a ? S() :x(t, s++, n.apply(null, e.map(function(t) {
return t.value;
})));
});
}, r;
}
function Cn(t, e) {
return H(t) ? e :t.constructor(e);
}
function Tn(t) {
if (t !== Object(t)) throw new TypeError("Expected [K, V] tuple: " + t);
}
function En(t) {
return ce(t.size), p(t);
}
function Dn(t) {
return s(t) ? n :a(t) ? i :r;
}
function Mn(t) {
return Object.create((s(t) ? O :a(t) ? I :j).prototype);
}
function On() {
return this._iter.cacheResult ? (this._iter.cacheResult(), this.size = this._iter.size, 
this) :M.prototype.cacheResult.call(this);
}
function In(t, e) {
return t > e ? 1 :e > t ? -1 :0;
}
function jn(t) {
var n = T(t);
if (!n) {
if (!D(t)) throw new TypeError("Expected iterable or array-like: " + t);
n = T(e(t));
}
return n;
}
function An(t, e) {
var n, i = function(o) {
if (o instanceof i) return o;
if (!(this instanceof i)) return new i(o);
if (!n) {
n = !0;
var s = Object.keys(t);
Pn(r, s), r.size = s.length, r._name = e, r._keys = s, r._defaultValues = t;
}
this._map = he(o);
}, r = i.prototype = Object.create(Ki);
return r.constructor = i, i;
}
function Ln(t, e, n) {
var i = Object.create(Object.getPrototypeOf(t));
return i._map = e, i.__ownerID = n, i;
}
function zn(t) {
return t._name || t.constructor.name || "Record";
}
function Pn(t, e) {
try {
e.forEach(Hn.bind(void 0, t));
} catch (n) {}
}
function Hn(t, e) {
Object.defineProperty(t, e, {
get:function() {
return this.get(e);
},
set:function(t) {
K(this.__ownerID, "Cannot set on an immutable record."), this.set(e, t);
}
});
}
function Nn(t) {
return null === t || void 0 === t ? qn() :Rn(t) && !l(t) ? t :qn().withMutations(function(e) {
var n = r(t);
ce(n.size), n.forEach(function(t) {
return e.add(t);
});
});
}
function Rn(t) {
return !(!t || !t[Qi]);
}
function $n(t, e) {
return t.__ownerID ? (t.size = e.size, t._map = e, t) :e === t._map ? t :0 === e.size ? t.__empty() :t.__make(e);
}
function Fn(t, e) {
var n = Object.create(tr);
return n.size = t ? t.size :0, n._map = t, n.__ownerID = e, n;
}
function qn() {
return er || (er = Fn(xe()));
}
function Un(t) {
return null === t || void 0 === t ? Wn() :Bn(t) ? t :Wn().withMutations(function(e) {
var n = r(t);
ce(n.size), n.forEach(function(t) {
return e.add(t);
});
});
}
function Bn(t) {
return Rn(t) && l(t);
}
function Yn(t, e) {
var n = Object.create(nr);
return n.size = t ? t.size :0, n._map = t, n.__ownerID = e, n;
}
function Wn() {
return ir || (ir = Yn(en()));
}
function Vn(t) {
return null === t || void 0 === t ? Jn() :Gn(t) ? t :Jn().unshiftAll(t);
}
function Gn(t) {
return !(!t || !t[rr]);
}
function Xn(t, e, n, i) {
var r = Object.create(or);
return r.size = t, r._head = e, r.__ownerID = n, r.__hash = i, r.__altered = !1, 
r;
}
function Jn() {
return sr || (sr = Xn(0));
}
function Zn(t, e) {
var n = function(n) {
t.prototype[n] = e[n];
};
return Object.keys(e).forEach(n), Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(e).forEach(n), 
t;
}
function Kn(t, e) {
return e;
}
function Qn(t, e) {
return [ e, t ];
}
function ti(t) {
return function() {
return !t.apply(this, arguments);
};
}
function ei(t) {
return function() {
return -t.apply(this, arguments);
};
}
function ni(t) {
return "string" == typeof t ? JSON.stringify(t) :t;
}
function ii() {
return f(arguments);
}
function ri(t, e) {
return e > t ? 1 :t > e ? -1 :0;
}
function oi(t) {
if (1/0 === t.size) return 0;
var e = l(t), n = s(t), i = e ? 1 :0, r = t.__iterate(n ? e ? function(t, e) {
i = 31 * i + ai(oe(t), oe(e)) | 0;
} :function(t, e) {
i = i + ai(oe(t), oe(e)) | 0;
} :e ? function(t) {
i = 31 * i + oe(t) | 0;
} :function(t) {
i = i + oe(t) | 0;
});
return si(r, i);
}
function si(t, e) {
return e = Ii(e, 3432918353), e = Ii(e << 15 | e >>> -15, 461845907), e = Ii(e << 13 | e >>> -13, 5), 
e = (e + 3864292196 | 0) ^ t, e = Ii(e ^ e >>> 16, 2246822507), e = Ii(e ^ e >>> 13, 3266489909), 
e = re(e ^ e >>> 16);
}
function ai(t, e) {
return t ^ e + 2654435769 + (t << 6) + (t >> 2) | 0;
}
var ui = Array.prototype.slice;
t(n, e), t(i, e), t(r, e), e.isIterable = o, e.isKeyed = s, e.isIndexed = a, e.isAssociative = u, 
e.isOrdered = l, e.Keyed = n, e.Indexed = i, e.Set = r;
var li = "@@__IMMUTABLE_ITERABLE__@@", ci = "@@__IMMUTABLE_KEYED__@@", hi = "@@__IMMUTABLE_INDEXED__@@", di = "@@__IMMUTABLE_ORDERED__@@", fi = "delete", pi = 5, mi = 1 << pi, gi = mi - 1, vi = {}, yi = {
value:!1
}, _i = {
value:!1
}, bi = 0, wi = 1, xi = 2, Si = "function" == typeof Symbol && Symbol.iterator, ki = "@@iterator", Ci = Si || ki;
w.prototype.toString = function() {
return "[Iterator]";
}, w.KEYS = bi, w.VALUES = wi, w.ENTRIES = xi, w.prototype.inspect = w.prototype.toSource = function() {
return this.toString();
}, w.prototype[Ci] = function() {
return this;
}, t(M, e), M.of = function() {
return M(arguments);
}, M.prototype.toSeq = function() {
return this;
}, M.prototype.toString = function() {
return this.__toString("Seq {", "}");
}, M.prototype.cacheResult = function() {
return !this._cache && this.__iterateUncached && (this._cache = this.entrySeq().toArray(), 
this.size = this._cache.length), this;
}, M.prototype.__iterate = function(t, e) {
return U(this, t, e, !0);
}, M.prototype.__iterator = function(t, e) {
return B(this, t, e, !0);
}, t(O, M), O.prototype.toKeyedSeq = function() {
return this;
}, t(I, M), I.of = function() {
return I(arguments);
}, I.prototype.toIndexedSeq = function() {
return this;
}, I.prototype.toString = function() {
return this.__toString("Seq [", "]");
}, I.prototype.__iterate = function(t, e) {
return U(this, t, e, !1);
}, I.prototype.__iterator = function(t, e) {
return B(this, t, e, !1);
}, t(j, M), j.of = function() {
return j(arguments);
}, j.prototype.toSetSeq = function() {
return this;
}, M.isSeq = H, M.Keyed = O, M.Set = j, M.Indexed = I;
var Ti = "@@__IMMUTABLE_SEQ__@@";
M.prototype[Ti] = !0, t(A, I), A.prototype.get = function(t, e) {
return this.has(t) ? this._array[m(this, t)] :e;
}, A.prototype.__iterate = function(t, e) {
for (var n = this._array, i = n.length - 1, r = 0; i >= r; r++) if (t(n[e ? i - r :r], r, this) === !1) return r + 1;
return r;
}, A.prototype.__iterator = function(t, e) {
var n = this._array, i = n.length - 1, r = 0;
return new w(function() {
return r > i ? S() :x(t, r, n[e ? i - r++ :r++]);
});
}, t(L, O), L.prototype.get = function(t, e) {
return void 0 === e || this.has(t) ? this._object[t] :e;
}, L.prototype.has = function(t) {
return this._object.hasOwnProperty(t);
}, L.prototype.__iterate = function(t, e) {
for (var n = this._object, i = this._keys, r = i.length - 1, o = 0; r >= o; o++) {
var s = i[e ? r - o :o];
if (t(n[s], s, this) === !1) return o + 1;
}
return o;
}, L.prototype.__iterator = function(t, e) {
var n = this._object, i = this._keys, r = i.length - 1, o = 0;
return new w(function() {
var s = i[e ? r - o :o];
return o++ > r ? S() :x(t, s, n[s]);
});
}, L.prototype[di] = !0, t(z, I), z.prototype.__iterateUncached = function(t, e) {
if (e) return this.cacheResult().__iterate(t, e);
var n = this._iterable, i = T(n), r = 0;
if (C(i)) for (var o; !(o = i.next()).done && t(o.value, r++, this) !== !1; ) ;
return r;
}, z.prototype.__iteratorUncached = function(t, e) {
if (e) return this.cacheResult().__iterator(t, e);
var n = this._iterable, i = T(n);
if (!C(i)) return new w(S);
var r = 0;
return new w(function() {
var e = i.next();
return e.done ? e :x(t, r++, e.value);
});
}, t(P, I), P.prototype.__iterateUncached = function(t, e) {
if (e) return this.cacheResult().__iterate(t, e);
for (var n = this._iterator, i = this._iteratorCache, r = 0; r < i.length; ) if (t(i[r], r++, this) === !1) return r;
for (var o; !(o = n.next()).done; ) {
var s = o.value;
if (i[r] = s, t(s, r++, this) === !1) break;
}
return r;
}, P.prototype.__iteratorUncached = function(t, e) {
if (e) return this.cacheResult().__iterator(t, e);
var n = this._iterator, i = this._iteratorCache, r = 0;
return new w(function() {
if (r >= i.length) {
var e = n.next();
if (e.done) return e;
i[r] = e.value;
}
return x(t, r, i[r++]);
});
};
var Ei;
t(Z, I), Z.prototype.toString = function() {
return 0 === this.size ? "Repeat []" :"Repeat [ " + this._value + " " + this.size + " times ]";
}, Z.prototype.get = function(t, e) {
return this.has(t) ? this._value :e;
}, Z.prototype.includes = function(t) {
return X(this._value, t);
}, Z.prototype.slice = function(t, e) {
var n = this.size;
return v(t, e, n) ? this :new Z(this._value, _(e, n) - y(t, n));
}, Z.prototype.reverse = function() {
return this;
}, Z.prototype.indexOf = function(t) {
return X(this._value, t) ? 0 :-1;
}, Z.prototype.lastIndexOf = function(t) {
return X(this._value, t) ? this.size :-1;
}, Z.prototype.__iterate = function(t) {
for (var e = 0; e < this.size; e++) if (t(this._value, e, this) === !1) return e + 1;
return e;
}, Z.prototype.__iterator = function(t) {
var e = this, n = 0;
return new w(function() {
return n < e.size ? x(t, n++, e._value) :S();
});
}, Z.prototype.equals = function(t) {
return t instanceof Z ? X(this._value, t._value) :J(t);
};
var Di;
t(Q, I), Q.prototype.toString = function() {
return 0 === this.size ? "Range []" :"Range [ " + this._start + "..." + this._end + (this._step > 1 ? " by " + this._step :"") + " ]";
}, Q.prototype.get = function(t, e) {
return this.has(t) ? this._start + m(this, t) * this._step :e;
}, Q.prototype.includes = function(t) {
var e = (t - this._start) / this._step;
return e >= 0 && e < this.size && e === Math.floor(e);
}, Q.prototype.slice = function(t, e) {
return v(t, e, this.size) ? this :(t = y(t, this.size), e = _(e, this.size), t >= e ? new Q(0, 0) :new Q(this.get(t, this._end), this.get(e, this._end), this._step));
}, Q.prototype.indexOf = function(t) {
var e = t - this._start;
if (e % this._step === 0) {
var n = e / this._step;
if (n >= 0 && n < this.size) return n;
}
return -1;
}, Q.prototype.lastIndexOf = function(t) {
return this.indexOf(t);
}, Q.prototype.__iterate = function(t, e) {
for (var n = this.size - 1, i = this._step, r = e ? this._start + n * i :this._start, o = 0; n >= o; o++) {
if (t(r, o, this) === !1) return o + 1;
r += e ? -i :i;
}
return o;
}, Q.prototype.__iterator = function(t, e) {
var n = this.size - 1, i = this._step, r = e ? this._start + n * i :this._start, o = 0;
return new w(function() {
var s = r;
return r += e ? -i :i, o > n ? S() :x(t, o++, s);
});
}, Q.prototype.equals = function(t) {
return t instanceof Q ? this._start === t._start && this._end === t._end && this._step === t._step :J(this, t);
};
var Mi;
t(te, e), t(ee, te), t(ne, te), t(ie, te), te.Keyed = ee, te.Indexed = ne, te.Set = ie;
var Oi, Ii = "function" == typeof Math.imul && -2 === Math.imul(4294967295, 2) ? Math.imul :function(t, e) {
t = 0 | t, e = 0 | e;
var n = 65535 & t, i = 65535 & e;
return n * i + ((t >>> 16) * i + n * (e >>> 16) << 16 >>> 0) | 0;
}, ji = Object.isExtensible, Ai = function() {
try {
return Object.defineProperty({}, "@", {}), !0;
} catch (t) {
return !1;
}
}(), Li = "function" == typeof WeakMap;
Li && (Oi = new WeakMap());
var zi = 0, Pi = "__immutablehash__";
"function" == typeof Symbol && (Pi = Symbol(Pi));
var Hi = 16, Ni = 255, Ri = 0, $i = {};
t(he, ee), he.prototype.toString = function() {
return this.__toString("Map {", "}");
}, he.prototype.get = function(t, e) {
return this._root ? this._root.get(0, void 0, t, e) :e;
}, he.prototype.set = function(t, e) {
return Se(this, t, e);
}, he.prototype.setIn = function(t, e) {
return this.updateIn(t, vi, function() {
return e;
});
}, he.prototype.remove = function(t) {
return Se(this, t, vi);
}, he.prototype.deleteIn = function(t) {
return this.updateIn(t, function() {
return vi;
});
}, he.prototype.update = function(t, e, n) {
return 1 === arguments.length ? t(this) :this.updateIn([ t ], e, n);
}, he.prototype.updateIn = function(t, e, n) {
n || (n = e, e = void 0);
var i = Le(this, jn(t), e, n);
return i === vi ? void 0 :i;
}, he.prototype.clear = function() {
return 0 === this.size ? this :this.__ownerID ? (this.size = 0, this._root = null, 
this.__hash = void 0, this.__altered = !0, this) :xe();
}, he.prototype.merge = function() {
return Oe(this, void 0, arguments);
}, he.prototype.mergeWith = function(t) {
var e = ui.call(arguments, 1);
return Oe(this, t, e);
}, he.prototype.mergeIn = function(t) {
var e = ui.call(arguments, 1);
return this.updateIn(t, xe(), function(t) {
return "function" == typeof t.merge ? t.merge.apply(t, e) :e[e.length - 1];
});
}, he.prototype.mergeDeep = function() {
return Oe(this, Ie, arguments);
}, he.prototype.mergeDeepWith = function(t) {
var e = ui.call(arguments, 1);
return Oe(this, je(t), e);
}, he.prototype.mergeDeepIn = function(t) {
var e = ui.call(arguments, 1);
return this.updateIn(t, xe(), function(t) {
return "function" == typeof t.mergeDeep ? t.mergeDeep.apply(t, e) :e[e.length - 1];
});
}, he.prototype.sort = function(t) {
return Ke(wn(this, t));
}, he.prototype.sortBy = function(t, e) {
return Ke(wn(this, e, t));
}, he.prototype.withMutations = function(t) {
var e = this.asMutable();
return t(e), e.wasAltered() ? e.__ensureOwner(this.__ownerID) :this;
}, he.prototype.asMutable = function() {
return this.__ownerID ? this :this.__ensureOwner(new d());
}, he.prototype.asImmutable = function() {
return this.__ensureOwner();
}, he.prototype.wasAltered = function() {
return this.__altered;
}, he.prototype.__iterator = function(t, e) {
return new ye(this, t, e);
}, he.prototype.__iterate = function(t, e) {
var n = this, i = 0;
return this._root && this._root.iterate(function(e) {
return i++, t(e[1], e[0], n);
}, e), i;
}, he.prototype.__ensureOwner = function(t) {
return t === this.__ownerID ? this :t ? we(this.size, this._root, t, this.__hash) :(this.__ownerID = t, 
this.__altered = !1, this);
}, he.isMap = de;
var Fi = "@@__IMMUTABLE_MAP__@@", qi = he.prototype;
qi[Fi] = !0, qi[fi] = qi.remove, qi.removeIn = qi.deleteIn, fe.prototype.get = function(t, e, n, i) {
for (var r = this.entries, o = 0, s = r.length; s > o; o++) if (X(n, r[o][0])) return r[o][1];
return i;
}, fe.prototype.update = function(t, e, n, i, r, o, s) {
for (var a = r === vi, u = this.entries, l = 0, c = u.length; c > l && !X(i, u[l][0]); l++) ;
var d = c > l;
if (d ? u[l][1] === r :a) return this;
if (h(s), (a || !d) && h(o), !a || 1 !== u.length) {
if (!d && !a && u.length >= Bi) return Ee(t, u, i, r);
var p = t && t === this.ownerID, m = p ? u :f(u);
return d ? a ? l === c - 1 ? m.pop() :m[l] = m.pop() :m[l] = [ i, r ] :m.push([ i, r ]), 
p ? (this.entries = m, this) :new fe(t, m);
}
}, pe.prototype.get = function(t, e, n, i) {
void 0 === e && (e = oe(n));
var r = 1 << ((0 === t ? e :e >>> t) & gi), o = this.bitmap;
return 0 === (o & r) ? i :this.nodes[ze(o & r - 1)].get(t + pi, e, n, i);
}, pe.prototype.update = function(t, e, n, i, r, o, s) {
void 0 === n && (n = oe(i));
var a = (0 === e ? n :n >>> e) & gi, u = 1 << a, l = this.bitmap, c = 0 !== (l & u);
if (!c && r === vi) return this;
var h = ze(l & u - 1), d = this.nodes, f = c ? d[h] :void 0, p = ke(f, t, e + pi, n, i, r, o, s);
if (p === f) return this;
if (!c && p && d.length >= Yi) return Me(t, d, l, a, p);
if (c && !p && 2 === d.length && Ce(d[1 ^ h])) return d[1 ^ h];
if (c && p && 1 === d.length && Ce(p)) return p;
var m = t && t === this.ownerID, g = c ? p ? l :l ^ u :l | u, v = c ? p ? Pe(d, h, p, m) :Ne(d, h, m) :He(d, h, p, m);
return m ? (this.bitmap = g, this.nodes = v, this) :new pe(t, g, v);
}, me.prototype.get = function(t, e, n, i) {
void 0 === e && (e = oe(n));
var r = (0 === t ? e :e >>> t) & gi, o = this.nodes[r];
return o ? o.get(t + pi, e, n, i) :i;
}, me.prototype.update = function(t, e, n, i, r, o, s) {
void 0 === n && (n = oe(i));
var a = (0 === e ? n :n >>> e) & gi, u = r === vi, l = this.nodes, c = l[a];
if (u && !c) return this;
var h = ke(c, t, e + pi, n, i, r, o, s);
if (h === c) return this;
var d = this.count;
if (c) {
if (!h && (d--, Wi > d)) return De(t, l, d, a);
} else d++;
var f = t && t === this.ownerID, p = Pe(l, a, h, f);
return f ? (this.count = d, this.nodes = p, this) :new me(t, d, p);
}, ge.prototype.get = function(t, e, n, i) {
for (var r = this.entries, o = 0, s = r.length; s > o; o++) if (X(n, r[o][0])) return r[o][1];
return i;
}, ge.prototype.update = function(t, e, n, i, r, o, s) {
void 0 === n && (n = oe(i));
var a = r === vi;
if (n !== this.keyHash) return a ? this :(h(s), h(o), Te(this, t, e, n, [ i, r ]));
for (var u = this.entries, l = 0, c = u.length; c > l && !X(i, u[l][0]); l++) ;
var d = c > l;
if (d ? u[l][1] === r :a) return this;
if (h(s), (a || !d) && h(o), a && 2 === c) return new ve(t, this.keyHash, u[1 ^ l]);
var p = t && t === this.ownerID, m = p ? u :f(u);
return d ? a ? l === c - 1 ? m.pop() :m[l] = m.pop() :m[l] = [ i, r ] :m.push([ i, r ]), 
p ? (this.entries = m, this) :new ge(t, this.keyHash, m);
}, ve.prototype.get = function(t, e, n, i) {
return X(n, this.entry[0]) ? this.entry[1] :i;
}, ve.prototype.update = function(t, e, n, i, r, o, s) {
var a = r === vi, u = X(i, this.entry[0]);
return (u ? r === this.entry[1] :a) ? this :(h(s), a ? void h(o) :u ? t && t === this.ownerID ? (this.entry[1] = r, 
this) :new ve(t, this.keyHash, [ i, r ]) :(h(o), Te(this, t, e, oe(i), [ i, r ])));
}, fe.prototype.iterate = ge.prototype.iterate = function(t, e) {
for (var n = this.entries, i = 0, r = n.length - 1; r >= i; i++) if (t(n[e ? r - i :i]) === !1) return !1;
}, pe.prototype.iterate = me.prototype.iterate = function(t, e) {
for (var n = this.nodes, i = 0, r = n.length - 1; r >= i; i++) {
var o = n[e ? r - i :i];
if (o && o.iterate(t, e) === !1) return !1;
}
}, ve.prototype.iterate = function(t) {
return t(this.entry);
}, t(ye, w), ye.prototype.next = function() {
for (var t = this._type, e = this._stack; e; ) {
var n, i = e.node, r = e.index++;
if (i.entry) {
if (0 === r) return _e(t, i.entry);
} else if (i.entries) {
if (n = i.entries.length - 1, n >= r) return _e(t, i.entries[this._reverse ? n - r :r]);
} else if (n = i.nodes.length - 1, n >= r) {
var o = i.nodes[this._reverse ? n - r :r];
if (o) {
if (o.entry) return _e(t, o.entry);
e = this._stack = be(o, e);
}
continue;
}
e = this._stack = this._stack.__prev;
}
return S();
};
var Ui, Bi = mi / 4, Yi = mi / 2, Wi = mi / 4;
t(Re, ne), Re.of = function() {
return this(arguments);
}, Re.prototype.toString = function() {
return this.__toString("List [", "]");
}, Re.prototype.get = function(t, e) {
if (t = m(this, t), t >= 0 && t < this.size) {
t += this._origin;
var n = Ge(this, t);
return n && n.array[t & gi];
}
return e;
}, Re.prototype.set = function(t, e) {
return Ye(this, t, e);
}, Re.prototype.remove = function(t) {
return this.has(t) ? 0 === t ? this.shift() :t === this.size - 1 ? this.pop() :this.splice(t, 1) :this;
}, Re.prototype.insert = function(t, e) {
return this.splice(t, 0, e);
}, Re.prototype.clear = function() {
return 0 === this.size ? this :this.__ownerID ? (this.size = this._origin = this._capacity = 0, 
this._level = pi, this._root = this._tail = null, this.__hash = void 0, this.__altered = !0, 
this) :Be();
}, Re.prototype.push = function() {
var t = arguments, e = this.size;
return this.withMutations(function(n) {
Xe(n, 0, e + t.length);
for (var i = 0; i < t.length; i++) n.set(e + i, t[i]);
});
}, Re.prototype.pop = function() {
return Xe(this, 0, -1);
}, Re.prototype.unshift = function() {
var t = arguments;
return this.withMutations(function(e) {
Xe(e, -t.length);
for (var n = 0; n < t.length; n++) e.set(n, t[n]);
});
}, Re.prototype.shift = function() {
return Xe(this, 1);
}, Re.prototype.merge = function() {
return Je(this, void 0, arguments);
}, Re.prototype.mergeWith = function(t) {
var e = ui.call(arguments, 1);
return Je(this, t, e);
}, Re.prototype.mergeDeep = function() {
return Je(this, Ie, arguments);
}, Re.prototype.mergeDeepWith = function(t) {
var e = ui.call(arguments, 1);
return Je(this, je(t), e);
}, Re.prototype.setSize = function(t) {
return Xe(this, 0, t);
}, Re.prototype.slice = function(t, e) {
var n = this.size;
return v(t, e, n) ? this :Xe(this, y(t, n), _(e, n));
}, Re.prototype.__iterator = function(t, e) {
var n = 0, i = qe(this, e);
return new w(function() {
var e = i();
return e === Ji ? S() :x(t, n++, e);
});
}, Re.prototype.__iterate = function(t, e) {
for (var n, i = 0, r = qe(this, e); (n = r()) !== Ji && t(n, i++, this) !== !1; ) ;
return i;
}, Re.prototype.__ensureOwner = function(t) {
return t === this.__ownerID ? this :t ? Ue(this._origin, this._capacity, this._level, this._root, this._tail, t, this.__hash) :(this.__ownerID = t, 
this);
}, Re.isList = $e;
var Vi = "@@__IMMUTABLE_LIST__@@", Gi = Re.prototype;
Gi[Vi] = !0, Gi[fi] = Gi.remove, Gi.setIn = qi.setIn, Gi.deleteIn = Gi.removeIn = qi.removeIn, 
Gi.update = qi.update, Gi.updateIn = qi.updateIn, Gi.mergeIn = qi.mergeIn, Gi.mergeDeepIn = qi.mergeDeepIn, 
Gi.withMutations = qi.withMutations, Gi.asMutable = qi.asMutable, Gi.asImmutable = qi.asImmutable, 
Gi.wasAltered = qi.wasAltered, Fe.prototype.removeBefore = function(t, e, n) {
if (n === e ? 1 << e :0 || 0 === this.array.length) return this;
var i = n >>> e & gi;
if (i >= this.array.length) return new Fe([], t);
var r, o = 0 === i;
if (e > 0) {
var s = this.array[i];
if (r = s && s.removeBefore(t, e - pi, n), r === s && o) return this;
}
if (o && !r) return this;
var a = Ve(this, t);
if (!o) for (var u = 0; i > u; u++) a.array[u] = void 0;
return r && (a.array[i] = r), a;
}, Fe.prototype.removeAfter = function(t, e, n) {
if (n === (e ? 1 << e :0) || 0 === this.array.length) return this;
var i = n - 1 >>> e & gi;
if (i >= this.array.length) return this;
var r;
if (e > 0) {
var o = this.array[i];
if (r = o && o.removeAfter(t, e - pi, n), r === o && i === this.array.length - 1) return this;
}
var s = Ve(this, t);
return s.array.splice(i + 1), r && (s.array[i] = r), s;
};
var Xi, Ji = {};
t(Ke, he), Ke.of = function() {
return this(arguments);
}, Ke.prototype.toString = function() {
return this.__toString("OrderedMap {", "}");
}, Ke.prototype.get = function(t, e) {
var n = this._map.get(t);
return void 0 !== n ? this._list.get(n)[1] :e;
}, Ke.prototype.clear = function() {
return 0 === this.size ? this :this.__ownerID ? (this.size = 0, this._map.clear(), 
this._list.clear(), this) :en();
}, Ke.prototype.set = function(t, e) {
return nn(this, t, e);
}, Ke.prototype.remove = function(t) {
return nn(this, t, vi);
}, Ke.prototype.wasAltered = function() {
return this._map.wasAltered() || this._list.wasAltered();
}, Ke.prototype.__iterate = function(t, e) {
var n = this;
return this._list.__iterate(function(e) {
return e && t(e[1], e[0], n);
}, e);
}, Ke.prototype.__iterator = function(t, e) {
return this._list.fromEntrySeq().__iterator(t, e);
}, Ke.prototype.__ensureOwner = function(t) {
if (t === this.__ownerID) return this;
var e = this._map.__ensureOwner(t), n = this._list.__ensureOwner(t);
return t ? tn(e, n, t, this.__hash) :(this.__ownerID = t, this._map = e, this._list = n, 
this);
}, Ke.isOrderedMap = Qe, Ke.prototype[di] = !0, Ke.prototype[fi] = Ke.prototype.remove;
var Zi;
t(rn, O), rn.prototype.get = function(t, e) {
return this._iter.get(t, e);
}, rn.prototype.has = function(t) {
return this._iter.has(t);
}, rn.prototype.valueSeq = function() {
return this._iter.valueSeq();
}, rn.prototype.reverse = function() {
var t = this, e = cn(this, !0);
return this._useKeys || (e.valueSeq = function() {
return t._iter.toSeq().reverse();
}), e;
}, rn.prototype.map = function(t, e) {
var n = this, i = ln(this, t, e);
return this._useKeys || (i.valueSeq = function() {
return n._iter.toSeq().map(t, e);
}), i;
}, rn.prototype.__iterate = function(t, e) {
var n, i = this;
return this._iter.__iterate(this._useKeys ? function(e, n) {
return t(e, n, i);
} :(n = e ? En(this) :0, function(r) {
return t(r, e ? --n :n++, i);
}), e);
}, rn.prototype.__iterator = function(t, e) {
if (this._useKeys) return this._iter.__iterator(t, e);
var n = this._iter.__iterator(wi, e), i = e ? En(this) :0;
return new w(function() {
var r = n.next();
return r.done ? r :x(t, e ? --i :i++, r.value, r);
});
}, rn.prototype[di] = !0, t(on, I), on.prototype.includes = function(t) {
return this._iter.includes(t);
}, on.prototype.__iterate = function(t, e) {
var n = this, i = 0;
return this._iter.__iterate(function(e) {
return t(e, i++, n);
}, e);
}, on.prototype.__iterator = function(t, e) {
var n = this._iter.__iterator(wi, e), i = 0;
return new w(function() {
var e = n.next();
return e.done ? e :x(t, i++, e.value, e);
});
}, t(sn, j), sn.prototype.has = function(t) {
return this._iter.includes(t);
}, sn.prototype.__iterate = function(t, e) {
var n = this;
return this._iter.__iterate(function(e) {
return t(e, e, n);
}, e);
}, sn.prototype.__iterator = function(t, e) {
var n = this._iter.__iterator(wi, e);
return new w(function() {
var e = n.next();
return e.done ? e :x(t, e.value, e.value, e);
});
}, t(an, O), an.prototype.entrySeq = function() {
return this._iter.toSeq();
}, an.prototype.__iterate = function(t, e) {
var n = this;
return this._iter.__iterate(function(e) {
if (e) {
Tn(e);
var i = o(e);
return t(i ? e.get(1) :e[1], i ? e.get(0) :e[0], n);
}
}, e);
}, an.prototype.__iterator = function(t, e) {
var n = this._iter.__iterator(wi, e);
return new w(function() {
for (;;) {
var e = n.next();
if (e.done) return e;
var i = e.value;
if (i) {
Tn(i);
var r = o(i);
return x(t, r ? i.get(0) :i[0], r ? i.get(1) :i[1], e);
}
}
});
}, on.prototype.cacheResult = rn.prototype.cacheResult = sn.prototype.cacheResult = an.prototype.cacheResult = On, 
t(An, ee), An.prototype.toString = function() {
return this.__toString(zn(this) + " {", "}");
}, An.prototype.has = function(t) {
return this._defaultValues.hasOwnProperty(t);
}, An.prototype.get = function(t, e) {
if (!this.has(t)) return e;
var n = this._defaultValues[t];
return this._map ? this._map.get(t, n) :n;
}, An.prototype.clear = function() {
if (this.__ownerID) return this._map && this._map.clear(), this;
var t = this.constructor;
return t._empty || (t._empty = Ln(this, xe()));
}, An.prototype.set = function(t, e) {
if (!this.has(t)) throw new Error('Cannot set unknown key "' + t + '" on ' + zn(this));
var n = this._map && this._map.set(t, e);
return this.__ownerID || n === this._map ? this :Ln(this, n);
}, An.prototype.remove = function(t) {
if (!this.has(t)) return this;
var e = this._map && this._map.remove(t);
return this.__ownerID || e === this._map ? this :Ln(this, e);
}, An.prototype.wasAltered = function() {
return this._map.wasAltered();
}, An.prototype.__iterator = function(t, e) {
var i = this;
return n(this._defaultValues).map(function(t, e) {
return i.get(e);
}).__iterator(t, e);
}, An.prototype.__iterate = function(t, e) {
var i = this;
return n(this._defaultValues).map(function(t, e) {
return i.get(e);
}).__iterate(t, e);
}, An.prototype.__ensureOwner = function(t) {
if (t === this.__ownerID) return this;
var e = this._map && this._map.__ensureOwner(t);
return t ? Ln(this, e, t) :(this.__ownerID = t, this._map = e, this);
};
var Ki = An.prototype;
Ki[fi] = Ki.remove, Ki.deleteIn = Ki.removeIn = qi.removeIn, Ki.merge = qi.merge, 
Ki.mergeWith = qi.mergeWith, Ki.mergeIn = qi.mergeIn, Ki.mergeDeep = qi.mergeDeep, 
Ki.mergeDeepWith = qi.mergeDeepWith, Ki.mergeDeepIn = qi.mergeDeepIn, Ki.setIn = qi.setIn, 
Ki.update = qi.update, Ki.updateIn = qi.updateIn, Ki.withMutations = qi.withMutations, 
Ki.asMutable = qi.asMutable, Ki.asImmutable = qi.asImmutable, t(Nn, ie), Nn.of = function() {
return this(arguments);
}, Nn.fromKeys = function(t) {
return this(n(t).keySeq());
}, Nn.prototype.toString = function() {
return this.__toString("Set {", "}");
}, Nn.prototype.has = function(t) {
return this._map.has(t);
}, Nn.prototype.add = function(t) {
return $n(this, this._map.set(t, !0));
}, Nn.prototype.remove = function(t) {
return $n(this, this._map.remove(t));
}, Nn.prototype.clear = function() {
return $n(this, this._map.clear());
}, Nn.prototype.union = function() {
var t = ui.call(arguments, 0);
return t = t.filter(function(t) {
return 0 !== t.size;
}), 0 === t.length ? this :0 !== this.size || this.__ownerID || 1 !== t.length ? this.withMutations(function(e) {
for (var n = 0; n < t.length; n++) r(t[n]).forEach(function(t) {
return e.add(t);
});
}) :this.constructor(t[0]);
}, Nn.prototype.intersect = function() {
var t = ui.call(arguments, 0);
if (0 === t.length) return this;
t = t.map(function(t) {
return r(t);
});
var e = this;
return this.withMutations(function(n) {
e.forEach(function(e) {
t.every(function(t) {
return t.includes(e);
}) || n.remove(e);
});
});
}, Nn.prototype.subtract = function() {
var t = ui.call(arguments, 0);
if (0 === t.length) return this;
t = t.map(function(t) {
return r(t);
});
var e = this;
return this.withMutations(function(n) {
e.forEach(function(e) {
t.some(function(t) {
return t.includes(e);
}) && n.remove(e);
});
});
}, Nn.prototype.merge = function() {
return this.union.apply(this, arguments);
}, Nn.prototype.mergeWith = function() {
var t = ui.call(arguments, 1);
return this.union.apply(this, t);
}, Nn.prototype.sort = function(t) {
return Un(wn(this, t));
}, Nn.prototype.sortBy = function(t, e) {
return Un(wn(this, e, t));
}, Nn.prototype.wasAltered = function() {
return this._map.wasAltered();
}, Nn.prototype.__iterate = function(t, e) {
var n = this;
return this._map.__iterate(function(e, i) {
return t(i, i, n);
}, e);
}, Nn.prototype.__iterator = function(t, e) {
return this._map.map(function(t, e) {
return e;
}).__iterator(t, e);
}, Nn.prototype.__ensureOwner = function(t) {
if (t === this.__ownerID) return this;
var e = this._map.__ensureOwner(t);
return t ? this.__make(e, t) :(this.__ownerID = t, this._map = e, this);
}, Nn.isSet = Rn;
var Qi = "@@__IMMUTABLE_SET__@@", tr = Nn.prototype;
tr[Qi] = !0, tr[fi] = tr.remove, tr.mergeDeep = tr.merge, tr.mergeDeepWith = tr.mergeWith, 
tr.withMutations = qi.withMutations, tr.asMutable = qi.asMutable, tr.asImmutable = qi.asImmutable, 
tr.__empty = qn, tr.__make = Fn;
var er;
t(Un, Nn), Un.of = function() {
return this(arguments);
}, Un.fromKeys = function(t) {
return this(n(t).keySeq());
}, Un.prototype.toString = function() {
return this.__toString("OrderedSet {", "}");
}, Un.isOrderedSet = Bn;
var nr = Un.prototype;
nr[di] = !0, nr.__empty = Wn, nr.__make = Yn;
var ir;
t(Vn, ne), Vn.of = function() {
return this(arguments);
}, Vn.prototype.toString = function() {
return this.__toString("Stack [", "]");
}, Vn.prototype.get = function(t, e) {
var n = this._head;
for (t = m(this, t); n && t--; ) n = n.next;
return n ? n.value :e;
}, Vn.prototype.peek = function() {
return this._head && this._head.value;
}, Vn.prototype.push = function() {
if (0 === arguments.length) return this;
for (var t = this.size + arguments.length, e = this._head, n = arguments.length - 1; n >= 0; n--) e = {
value:arguments[n],
next:e
};
return this.__ownerID ? (this.size = t, this._head = e, this.__hash = void 0, this.__altered = !0, 
this) :Xn(t, e);
}, Vn.prototype.pushAll = function(t) {
if (t = i(t), 0 === t.size) return this;
ce(t.size);
var e = this.size, n = this._head;
return t.reverse().forEach(function(t) {
e++, n = {
value:t,
next:n
};
}), this.__ownerID ? (this.size = e, this._head = n, this.__hash = void 0, this.__altered = !0, 
this) :Xn(e, n);
}, Vn.prototype.pop = function() {
return this.slice(1);
}, Vn.prototype.unshift = function() {
return this.push.apply(this, arguments);
}, Vn.prototype.unshiftAll = function(t) {
return this.pushAll(t);
}, Vn.prototype.shift = function() {
return this.pop.apply(this, arguments);
}, Vn.prototype.clear = function() {
return 0 === this.size ? this :this.__ownerID ? (this.size = 0, this._head = void 0, 
this.__hash = void 0, this.__altered = !0, this) :Jn();
}, Vn.prototype.slice = function(t, e) {
if (v(t, e, this.size)) return this;
var n = y(t, this.size), i = _(e, this.size);
if (i !== this.size) return ne.prototype.slice.call(this, t, e);
for (var r = this.size - n, o = this._head; n--; ) o = o.next;
return this.__ownerID ? (this.size = r, this._head = o, this.__hash = void 0, this.__altered = !0, 
this) :Xn(r, o);
}, Vn.prototype.__ensureOwner = function(t) {
return t === this.__ownerID ? this :t ? Xn(this.size, this._head, t, this.__hash) :(this.__ownerID = t, 
this.__altered = !1, this);
}, Vn.prototype.__iterate = function(t, e) {
if (e) return this.reverse().__iterate(t);
for (var n = 0, i = this._head; i && t(i.value, n++, this) !== !1; ) i = i.next;
return n;
}, Vn.prototype.__iterator = function(t, e) {
if (e) return this.reverse().__iterator(t);
var n = 0, i = this._head;
return new w(function() {
if (i) {
var e = i.value;
return i = i.next, x(t, n++, e);
}
return S();
});
}, Vn.isStack = Gn;
var rr = "@@__IMMUTABLE_STACK__@@", or = Vn.prototype;
or[rr] = !0, or.withMutations = qi.withMutations, or.asMutable = qi.asMutable, or.asImmutable = qi.asImmutable, 
or.wasAltered = qi.wasAltered;
var sr;
e.Iterator = w, Zn(e, {
toArray:function() {
ce(this.size);
var t = new Array(this.size || 0);
return this.valueSeq().__iterate(function(e, n) {
t[n] = e;
}), t;
},
toIndexedSeq:function() {
return new on(this);
},
toJS:function() {
return this.toSeq().map(function(t) {
return t && "function" == typeof t.toJS ? t.toJS() :t;
}).__toJS();
},
toJSON:function() {
return this.toSeq().map(function(t) {
return t && "function" == typeof t.toJSON ? t.toJSON() :t;
}).__toJS();
},
toKeyedSeq:function() {
return new rn(this, !0);
},
toMap:function() {
return he(this.toKeyedSeq());
},
toObject:function() {
ce(this.size);
var t = {};
return this.__iterate(function(e, n) {
t[n] = e;
}), t;
},
toOrderedMap:function() {
return Ke(this.toKeyedSeq());
},
toOrderedSet:function() {
return Un(s(this) ? this.valueSeq() :this);
},
toSet:function() {
return Nn(s(this) ? this.valueSeq() :this);
},
toSetSeq:function() {
return new sn(this);
},
toSeq:function() {
return a(this) ? this.toIndexedSeq() :s(this) ? this.toKeyedSeq() :this.toSetSeq();
},
toStack:function() {
return Vn(s(this) ? this.valueSeq() :this);
},
toList:function() {
return Re(s(this) ? this.valueSeq() :this);
},
toString:function() {
return "[Iterable]";
},
__toString:function(t, e) {
return 0 === this.size ? t + e :t + " " + this.toSeq().map(this.__toStringMapper).join(", ") + " " + e;
},
concat:function() {
var t = ui.call(arguments, 0);
return Cn(this, vn(this, t));
},
includes:function(t) {
return this.some(function(e) {
return X(e, t);
});
},
entries:function() {
return this.__iterator(xi);
},
every:function(t, e) {
ce(this.size);
var n = !0;
return this.__iterate(function(i, r, o) {
return t.call(e, i, r, o) ? void 0 :(n = !1, !1);
}), n;
},
filter:function(t, e) {
return Cn(this, hn(this, t, e, !0));
},
find:function(t, e, n) {
var i = this.findEntry(t, e);
return i ? i[1] :n;
},
findEntry:function(t, e) {
var n;
return this.__iterate(function(i, r, o) {
return t.call(e, i, r, o) ? (n = [ r, i ], !1) :void 0;
}), n;
},
findLastEntry:function(t, e) {
return this.toSeq().reverse().findEntry(t, e);
},
forEach:function(t, e) {
return ce(this.size), this.__iterate(e ? t.bind(e) :t);
},
join:function(t) {
ce(this.size), t = void 0 !== t ? "" + t :",";
var e = "", n = !0;
return this.__iterate(function(i) {
n ? n = !1 :e += t, e += null !== i && void 0 !== i ? i.toString() :"";
}), e;
},
keys:function() {
return this.__iterator(bi);
},
map:function(t, e) {
return Cn(this, ln(this, t, e));
},
reduce:function(t, e, n) {
ce(this.size);
var i, r;
return arguments.length < 2 ? r = !0 :i = e, this.__iterate(function(e, o, s) {
r ? (r = !1, i = e) :i = t.call(n, i, e, o, s);
}), i;
},
reduceRight:function() {
var t = this.toKeyedSeq().reverse();
return t.reduce.apply(t, arguments);
},
reverse:function() {
return Cn(this, cn(this, !0));
},
slice:function(t, e) {
return Cn(this, pn(this, t, e, !0));
},
some:function(t, e) {
return !this.every(ti(t), e);
},
sort:function(t) {
return Cn(this, wn(this, t));
},
values:function() {
return this.__iterator(wi);
},
butLast:function() {
return this.slice(0, -1);
},
isEmpty:function() {
return void 0 !== this.size ? 0 === this.size :!this.some(function() {
return !0;
});
},
count:function(t, e) {
return p(t ? this.toSeq().filter(t, e) :this);
},
countBy:function(t, e) {
return dn(this, t, e);
},
equals:function(t) {
return J(this, t);
},
entrySeq:function() {
var t = this;
if (t._cache) return new A(t._cache);
var e = t.toSeq().map(Qn).toIndexedSeq();
return e.fromEntrySeq = function() {
return t.toSeq();
}, e;
},
filterNot:function(t, e) {
return this.filter(ti(t), e);
},
findLast:function(t, e, n) {
return this.toKeyedSeq().reverse().find(t, e, n);
},
first:function() {
return this.find(g);
},
flatMap:function(t, e) {
return Cn(this, _n(this, t, e));
},
flatten:function(t) {
return Cn(this, yn(this, t, !0));
},
fromEntrySeq:function() {
return new an(this);
},
get:function(t, e) {
return this.find(function(e, n) {
return X(n, t);
}, void 0, e);
},
getIn:function(t, e) {
for (var n, i = this, r = jn(t); !(n = r.next()).done; ) {
var o = n.value;
if (i = i && i.get ? i.get(o, vi) :vi, i === vi) return e;
}
return i;
},
groupBy:function(t, e) {
return fn(this, t, e);
},
has:function(t) {
return this.get(t, vi) !== vi;
},
hasIn:function(t) {
return this.getIn(t, vi) !== vi;
},
isSubset:function(t) {
return t = "function" == typeof t.includes ? t :e(t), this.every(function(e) {
return t.includes(e);
});
},
isSuperset:function(t) {
return t = "function" == typeof t.isSubset ? t :e(t), t.isSubset(this);
},
keySeq:function() {
return this.toSeq().map(Kn).toIndexedSeq();
},
last:function() {
return this.toSeq().reverse().first();
},
max:function(t) {
return xn(this, t);
},
maxBy:function(t, e) {
return xn(this, e, t);
},
min:function(t) {
return xn(this, t ? ei(t) :ri);
},
minBy:function(t, e) {
return xn(this, e ? ei(e) :ri, t);
},
rest:function() {
return this.slice(1);
},
skip:function(t) {
return this.slice(Math.max(0, t));
},
skipLast:function(t) {
return Cn(this, this.toSeq().reverse().skip(t).reverse());
},
skipWhile:function(t, e) {
return Cn(this, gn(this, t, e, !0));
},
skipUntil:function(t, e) {
return this.skipWhile(ti(t), e);
},
sortBy:function(t, e) {
return Cn(this, wn(this, e, t));
},
take:function(t) {
return this.slice(0, Math.max(0, t));
},
takeLast:function(t) {
return Cn(this, this.toSeq().reverse().take(t).reverse());
},
takeWhile:function(t, e) {
return Cn(this, mn(this, t, e));
},
takeUntil:function(t, e) {
return this.takeWhile(ti(t), e);
},
valueSeq:function() {
return this.toIndexedSeq();
},
hashCode:function() {
return this.__hash || (this.__hash = oi(this));
}
});
var ar = e.prototype;
ar[li] = !0, ar[Ci] = ar.values, ar.__toJS = ar.toArray, ar.__toStringMapper = ni, 
ar.inspect = ar.toSource = function() {
return this.toString();
}, ar.chain = ar.flatMap, ar.contains = ar.includes, function() {
try {
Object.defineProperty(ar, "length", {
get:function() {
if (!e.noLengthWarning) {
var t;
try {
throw new Error();
} catch (n) {
t = n.stack;
}
if (-1 === t.indexOf("_wrapObject")) return console && console.warn && console.warn("iterable.length has been deprecated, use iterable.size or iterable.count(). This warning will become a silent error in a future version. " + t), 
this.size;
}
}
});
} catch (t) {}
}(), Zn(n, {
flip:function() {
return Cn(this, un(this));
},
findKey:function(t, e) {
var n = this.findEntry(t, e);
return n && n[0];
},
findLastKey:function(t, e) {
return this.toSeq().reverse().findKey(t, e);
},
keyOf:function(t) {
return this.findKey(function(e) {
return X(e, t);
});
},
lastKeyOf:function(t) {
return this.findLastKey(function(e) {
return X(e, t);
});
},
mapEntries:function(t, e) {
var n = this, i = 0;
return Cn(this, this.toSeq().map(function(r, o) {
return t.call(e, [ o, r ], i++, n);
}).fromEntrySeq());
},
mapKeys:function(t, e) {
var n = this;
return Cn(this, this.toSeq().flip().map(function(i, r) {
return t.call(e, i, r, n);
}).flip());
}
});
var ur = n.prototype;
ur[ci] = !0, ur[Ci] = ar.entries, ur.__toJS = ar.toObject, ur.__toStringMapper = function(t, e) {
return JSON.stringify(e) + ": " + ni(t);
}, Zn(i, {
toKeyedSeq:function() {
return new rn(this, !1);
},
filter:function(t, e) {
return Cn(this, hn(this, t, e, !1));
},
findIndex:function(t, e) {
var n = this.findEntry(t, e);
return n ? n[0] :-1;
},
indexOf:function(t) {
var e = this.toKeyedSeq().keyOf(t);
return void 0 === e ? -1 :e;
},
lastIndexOf:function(t) {
var e = this.toKeyedSeq().reverse().keyOf(t);
return void 0 === e ? -1 :e;
},
reverse:function() {
return Cn(this, cn(this, !1));
},
slice:function(t, e) {
return Cn(this, pn(this, t, e, !1));
},
splice:function(t, e) {
var n = arguments.length;
if (e = Math.max(0 | e, 0), 0 === n || 2 === n && !e) return this;
t = y(t, 0 > t ? this.count() :this.size);
var i = this.slice(0, t);
return Cn(this, 1 === n ? i :i.concat(f(arguments, 2), this.slice(t + e)));
},
findLastIndex:function(t, e) {
var n = this.toKeyedSeq().findLastKey(t, e);
return void 0 === n ? -1 :n;
},
first:function() {
return this.get(0);
},
flatten:function(t) {
return Cn(this, yn(this, t, !1));
},
get:function(t, e) {
return t = m(this, t), 0 > t || 1/0 === this.size || void 0 !== this.size && t > this.size ? e :this.find(function(e, n) {
return n === t;
}, void 0, e);
},
has:function(t) {
return t = m(this, t), t >= 0 && (void 0 !== this.size ? 1/0 === this.size || t < this.size :-1 !== this.indexOf(t));
},
interpose:function(t) {
return Cn(this, bn(this, t));
},
interleave:function() {
var t = [ this ].concat(f(arguments)), e = kn(this.toSeq(), I.of, t), n = e.flatten(!0);
return e.size && (n.size = e.size * t.length), Cn(this, n);
},
last:function() {
return this.get(-1);
},
skipWhile:function(t, e) {
return Cn(this, gn(this, t, e, !1));
},
zip:function() {
var t = [ this ].concat(f(arguments));
return Cn(this, kn(this, ii, t));
},
zipWith:function(t) {
var e = f(arguments);
return e[0] = this, Cn(this, kn(this, t, e));
}
}), i.prototype[hi] = !0, i.prototype[di] = !0, Zn(r, {
get:function(t, e) {
return this.has(t) ? t :e;
},
includes:function(t) {
return this.has(t);
},
keySeq:function() {
return this.valueSeq();
}
}), r.prototype.has = ar.includes, Zn(O, n.prototype), Zn(I, i.prototype), Zn(j, r.prototype), 
Zn(ee, n.prototype), Zn(ne, i.prototype), Zn(ie, r.prototype);
var lr = {
Iterable:e,
Seq:M,
Collection:te,
Map:he,
OrderedMap:Ke,
List:Re,
Stack:Vn,
Set:Nn,
OrderedSet:Un,
Record:An,
Range:Q,
Repeat:Z,
is:X,
fromJS:Y
};
return lr;
}), function() {
function t(t) {
var e = Array.isArray(t) ? {
label:t[0],
value:t[1]
} :"object" == typeof t && "label" in t && "value" in t ? t :{
label:t,
value:t
};
this.label = e.label || e.value, this.value = e.value;
}
function e(t, e, n) {
for (var i in e) {
var r = e[i], o = t.input.getAttribute("data-" + i.toLowerCase());
t[i] = "number" == typeof r ? parseInt(o) :r === !1 ? null !== o :r instanceof Function ? null :o, 
t[i] || 0 === t[i] || (t[i] = i in n ? n[i] :r);
}
}
function n(t, e) {
return "string" == typeof t ? (e || document).querySelector(t) :t || null;
}
function i(t, e) {
return s.call((e || document).querySelectorAll(t));
}
function r() {
i("input.awesomplete").forEach(function(t) {
new o(t);
});
}
var o = function(t, i) {
var r = this;
this.input = n(t), this.input.setAttribute("autocomplete", "off"), this.input.setAttribute("aria-autocomplete", "list"), 
i = i || {}, e(this, {
minChars:2,
maxItems:10,
autoFirst:!1,
data:o.DATA,
filter:o.FILTER_CONTAINS,
sort:o.SORT_BYLENGTH,
item:o.ITEM,
replace:o.REPLACE
}, i), this.index = -1, this.container = n.create("div", {
className:"awesomplete",
around:t
}), this.ul = n.create("ul", {
hidden:"hidden",
inside:this.container
}), this.status = n.create("span", {
className:"visually-hidden",
role:"status",
"aria-live":"assertive",
"aria-relevant":"additions",
inside:this.container
}), n.bind(this.input, {
input:this.evaluate.bind(this),
blur:this.close.bind(this, {
reason:"blur"
}),
keydown:function(t) {
var e = t.keyCode;
r.opened && (13 === e && r.selected ? (t.preventDefault(), r.select()) :27 === e ? r.close({
reason:"esc"
}) :(38 === e || 40 === e) && (t.preventDefault(), r[38 === e ? "previous" :"next"]()));
}
}), n.bind(this.input.form, {
submit:this.close.bind(this, {
reason:"submit"
})
}), n.bind(this.ul, {
mousedown:function(t) {
var e = t.target;
if (e !== this) {
for (;e && !/li/i.test(e.nodeName); ) e = e.parentNode;
e && 0 === t.button && (t.preventDefault(), r.select(e, t.target));
}
}
}), this.input.hasAttribute("list") ? (this.list = "#" + this.input.getAttribute("list"), 
this.input.removeAttribute("list")) :this.list = this.input.getAttribute("data-list") || i.list || [], 
o.all.push(this);
};
o.prototype = {
set list(t) {
if (Array.isArray(t)) this._list = t; else if ("string" == typeof t && t.indexOf(",") > -1) this._list = t.split(/\s*,\s*/); else if (t = n(t), 
t && t.children) {
var e = [];
s.apply(t.children).forEach(function(t) {
if (!t.disabled) {
var n = t.textContent.trim(), i = t.value || n, r = t.label || n;
"" !== i && e.push({
label:r,
value:i
});
}
}), this._list = e;
}
document.activeElement === this.input && this.evaluate();
},
get selected() {
return this.index > -1;
},
get opened() {
return !this.ul.hasAttribute("hidden");
},
close:function(t) {
this.opened && (this.ul.setAttribute("hidden", ""), this.index = -1, n.fire(this.input, "awesomplete-close", t || {}));
},
open:function() {
this.ul.removeAttribute("hidden"), this.autoFirst && -1 === this.index && this["goto"](0), 
n.fire(this.input, "awesomplete-open");
},
next:function() {
var t = this.ul.children.length;
this["goto"](this.index < t - 1 ? this.index + 1 :-1);
},
previous:function() {
var t = this.ul.children.length;
this["goto"](this.selected ? this.index - 1 :t - 1);
},
"goto":function(t) {
var e = this.ul.children;
this.selected && e[this.index].setAttribute("aria-selected", "false"), this.index = t, 
t > -1 && e.length > 0 && (e[t].setAttribute("aria-selected", "true"), this.status.textContent = e[t].textContent, 
n.fire(this.input, "awesomplete-highlight", {
text:this.suggestions[this.index]
}));
},
select:function(t, e) {
if (t ? this.index = n.siblingIndex(t) :t = this.ul.children[this.index], t) {
var i = this.suggestions[this.index], r = n.fire(this.input, "awesomplete-select", {
text:i,
origin:e || t
});
r && (this.replace(i), this.close({
reason:"select"
}), n.fire(this.input, "awesomplete-selectcomplete", {
text:i
}));
}
},
evaluate:function() {
var e = this, n = this.input.value;
n.length >= this.minChars && this._list.length > 0 ? (this.index = -1, this.ul.innerHTML = "", 
this.suggestions = this._list.map(function(i) {
return new t(e.data(i, n));
}).filter(function(t) {
return e.filter(t, n);
}).sort(this.sort).slice(0, this.maxItems), this.suggestions.forEach(function(t) {
e.ul.appendChild(e.item(t, n));
}), 0 === this.ul.children.length ? this.close({
reason:"nomatches"
}) :this.open()) :this.close({
reason:"nomatches"
});
}
}, o.all = [], o.FILTER_CONTAINS = function(t, e) {
return RegExp(n.regExpEscape(e.trim()), "i").test(t);
}, o.FILTER_STARTSWITH = function(t, e) {
return RegExp("^" + n.regExpEscape(e.trim()), "i").test(t);
}, o.SORT_BYLENGTH = function(t, e) {
return t.length !== e.length ? t.length - e.length :e > t ? -1 :1;
}, o.ITEM = function(t, e) {
var i = "" === e ? t :t.replace(RegExp(n.regExpEscape(e.trim()), "gi"), "<mark>$&</mark>");
return n.create("li", {
innerHTML:i,
"aria-selected":"false"
});
}, o.REPLACE = function(t) {
this.input.value = t.value;
}, o.DATA = function(t) {
return t;
}, Object.defineProperty(t.prototype = Object.create(String.prototype), "length", {
get:function() {
return this.label.length;
}
}), t.prototype.toString = t.prototype.valueOf = function() {
return "" + this.label;
};
var s = Array.prototype.slice;
return n.create = function(t, e) {
var i = document.createElement(t);
for (var r in e) {
var o = e[r];
if ("inside" === r) n(o).appendChild(i); else if ("around" === r) {
var s = n(o);
s.parentNode.insertBefore(i, s), i.appendChild(s);
} else r in i ? i[r] = o :i.setAttribute(r, o);
}
return i;
}, n.bind = function(t, e) {
if (t) for (var n in e) {
var i = e[n];
n.split(/\s+/).forEach(function(e) {
t.addEventListener(e, i);
});
}
}, n.fire = function(t, e, n) {
var i = document.createEvent("HTMLEvents");
i.initEvent(e, !0, !0);
for (var r in n) i[r] = n[r];
return t.dispatchEvent(i);
}, n.regExpEscape = function(t) {
return t.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
}, n.siblingIndex = function(t) {
for (var e = 0; t = t.previousElementSibling; e++) ;
return e;
}, "undefined" != typeof Document && ("loading" !== document.readyState ? r() :document.addEventListener("DOMContentLoaded", r)), 
o.$ = n, o.$$ = i, "undefined" != typeof self && (self.Awesomplete = o), "object" == typeof module && module.exports && (module.exports = o), 
o;
}(), function(t) {
"function" == typeof define && define.amd ? define([ "jquery" ], t) :t("object" == typeof exports ? require("jquery") :window.jQuery || window.Zepto);
}(function(t) {
var e, n, i, r, o, s, a = "Close", u = "BeforeClose", l = "AfterClose", c = "BeforeAppend", h = "MarkupParse", d = "Open", f = "Change", p = "mfp", m = "." + p, g = "mfp-ready", v = "mfp-removing", y = "mfp-prevent-close", _ = function() {}, b = !!window.jQuery, w = t(window), x = function(t, n) {
e.ev.on(p + t + m, n);
}, S = function(e, n, i, r) {
var o = document.createElement("div");
return o.className = "mfp-" + e, i && (o.innerHTML = i), r ? n && n.appendChild(o) :(o = t(o), 
n && o.appendTo(n)), o;
}, k = function(n, i) {
e.ev.triggerHandler(p + n, i), e.st.callbacks && (n = n.charAt(0).toLowerCase() + n.slice(1), 
e.st.callbacks[n] && e.st.callbacks[n].apply(e, t.isArray(i) ? i :[ i ]));
}, C = function(n) {
return n === s && e.currTemplate.closeBtn || (e.currTemplate.closeBtn = t(e.st.closeMarkup.replace("%title%", e.st.tClose)), 
s = n), e.currTemplate.closeBtn;
}, T = function() {
t.magnificPopup.instance || (e = new _(), e.init(), t.magnificPopup.instance = e);
}, E = function() {
var t = document.createElement("p").style, e = [ "ms", "O", "Moz", "Webkit" ];
if (void 0 !== t.transition) return !0;
for (;e.length; ) if (e.pop() + "Transition" in t) return !0;
return !1;
};
_.prototype = {
constructor:_,
init:function() {
var n = navigator.appVersion;
e.isIE7 = -1 !== n.indexOf("MSIE 7."), e.isIE8 = -1 !== n.indexOf("MSIE 8."), e.isLowIE = e.isIE7 || e.isIE8, 
e.isAndroid = /android/gi.test(n), e.isIOS = /iphone|ipad|ipod/gi.test(n), e.supportsTransition = E(), 
e.probablyMobile = e.isAndroid || e.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), 
i = t(document), e.popupsCache = {};
},
open:function(n) {
var r;
if (n.isObj === !1) {
e.items = n.items.toArray(), e.index = 0;
var s, a = n.items;
for (r = 0; r < a.length; r++) if (s = a[r], s.parsed && (s = s.el[0]), s === n.el[0]) {
e.index = r;
break;
}
} else e.items = t.isArray(n.items) ? n.items :[ n.items ], e.index = n.index || 0;
if (e.isOpen) return void e.updateItemHTML();
e.types = [], o = "", e.ev = n.mainEl && n.mainEl.length ? n.mainEl.eq(0) :i, n.key ? (e.popupsCache[n.key] || (e.popupsCache[n.key] = {}), 
e.currTemplate = e.popupsCache[n.key]) :e.currTemplate = {}, e.st = t.extend(!0, {}, t.magnificPopup.defaults, n), 
e.fixedContentPos = "auto" === e.st.fixedContentPos ? !e.probablyMobile :e.st.fixedContentPos, 
e.st.modal && (e.st.closeOnContentClick = !1, e.st.closeOnBgClick = !1, e.st.showCloseBtn = !1, 
e.st.enableEscapeKey = !1), e.bgOverlay || (e.bgOverlay = S("bg").on("click" + m, function() {
e.close();
}), e.wrap = S("wrap").attr("tabindex", -1).on("click" + m, function(t) {
e._checkIfClose(t.target) && e.close();
}), e.container = S("container", e.wrap)), e.contentContainer = S("content"), e.st.preloader && (e.preloader = S("preloader", e.container, e.st.tLoading));
var u = t.magnificPopup.modules;
for (r = 0; r < u.length; r++) {
var l = u[r];
l = l.charAt(0).toUpperCase() + l.slice(1), e["init" + l].call(e);
}
k("BeforeOpen"), e.st.showCloseBtn && (e.st.closeBtnInside ? (x(h, function(t, e, n, i) {
n.close_replaceWith = C(i.type);
}), o += " mfp-close-btn-in") :e.wrap.append(C())), e.st.alignTop && (o += " mfp-align-top"), 
e.wrap.css(e.fixedContentPos ? {
overflow:e.st.overflowY,
overflowX:"hidden",
overflowY:e.st.overflowY
} :{
top:w.scrollTop(),
position:"absolute"
}), (e.st.fixedBgPos === !1 || "auto" === e.st.fixedBgPos && !e.fixedContentPos) && e.bgOverlay.css({
height:i.height(),
position:"absolute"
}), e.st.enableEscapeKey && i.on("keyup" + m, function(t) {
27 === t.keyCode && e.close();
}), w.on("resize" + m, function() {
e.updateSize();
}), e.st.closeOnContentClick || (o += " mfp-auto-cursor"), o && e.wrap.addClass(o);
var c = e.wH = w.height(), f = {};
if (e.fixedContentPos && e._hasScrollBar(c)) {
var p = e._getScrollbarSize();
p && (f.marginRight = p);
}
e.fixedContentPos && (e.isIE7 ? t("body, html").css("overflow", "hidden") :f.overflow = "hidden");
var v = e.st.mainClass;
return e.isIE7 && (v += " mfp-ie7"), v && e._addClassToMFP(v), e.updateItemHTML(), 
k("BuildControls"), t("html").css(f), e.bgOverlay.add(e.wrap).prependTo(e.st.prependTo || t(document.body)), 
e._lastFocusedEl = document.activeElement, setTimeout(function() {
e.content ? (e._addClassToMFP(g), e._setFocus()) :e.bgOverlay.addClass(g), i.on("focusin" + m, e._onFocusIn);
}, 16), e.isOpen = !0, e.updateSize(c), k(d), n;
},
close:function() {
e.isOpen && (k(u), e.isOpen = !1, e.st.removalDelay && !e.isLowIE && e.supportsTransition ? (e._addClassToMFP(v), 
setTimeout(function() {
e._close();
}, e.st.removalDelay)) :e._close());
},
_close:function() {
k(a);
var n = v + " " + g + " ";
if (e.bgOverlay.detach(), e.wrap.detach(), e.container.empty(), e.st.mainClass && (n += e.st.mainClass + " "), 
e._removeClassFromMFP(n), e.fixedContentPos) {
var r = {
marginRight:""
};
e.isIE7 ? t("body, html").css("overflow", "") :r.overflow = "", t("html").css(r);
}
i.off("keyup" + m + " focusin" + m), e.ev.off(m), e.wrap.attr("class", "mfp-wrap").removeAttr("style"), 
e.bgOverlay.attr("class", "mfp-bg"), e.container.attr("class", "mfp-container"), 
!e.st.showCloseBtn || e.st.closeBtnInside && e.currTemplate[e.currItem.type] !== !0 || e.currTemplate.closeBtn && e.currTemplate.closeBtn.detach(), 
e._lastFocusedEl && t(e._lastFocusedEl).focus(), e.currItem = null, e.content = null, 
e.currTemplate = null, e.prevHeight = 0, k(l);
},
updateSize:function(t) {
if (e.isIOS) {
var n = document.documentElement.clientWidth / window.innerWidth, i = window.innerHeight * n;
e.wrap.css("height", i), e.wH = i;
} else e.wH = t || w.height();
e.fixedContentPos || e.wrap.css("height", e.wH), k("Resize");
},
updateItemHTML:function() {
var n = e.items[e.index];
e.contentContainer.detach(), e.content && e.content.detach(), n.parsed || (n = e.parseEl(e.index));
var i = n.type;
if (k("BeforeChange", [ e.currItem ? e.currItem.type :"", i ]), e.currItem = n, 
!e.currTemplate[i]) {
var o = e.st[i] ? e.st[i].markup :!1;
k("FirstMarkupParse", o), e.currTemplate[i] = o ? t(o) :!0;
}
r && r !== n.type && e.container.removeClass("mfp-" + r + "-holder");
var s = e["get" + i.charAt(0).toUpperCase() + i.slice(1)](n, e.currTemplate[i]);
e.appendContent(s, i), n.preloaded = !0, k(f, n), r = n.type, e.container.prepend(e.contentContainer), 
k("AfterChange");
},
appendContent:function(t, n) {
e.content = t, t ? e.st.showCloseBtn && e.st.closeBtnInside && e.currTemplate[n] === !0 ? e.content.find(".mfp-close").length || e.content.append(C()) :e.content = t :e.content = "", 
k(c), e.container.addClass("mfp-" + n + "-holder"), e.contentContainer.append(e.content);
},
parseEl:function(n) {
var i, r = e.items[n];
if (r.tagName ? r = {
el:t(r)
} :(i = r.type, r = {
data:r,
src:r.src
}), r.el) {
for (var o = e.types, s = 0; s < o.length; s++) if (r.el.hasClass("mfp-" + o[s])) {
i = o[s];
break;
}
r.src = r.el.attr("data-mfp-src"), r.src || (r.src = r.el.attr("href"));
}
return r.type = i || e.st.type || "inline", r.index = n, r.parsed = !0, e.items[n] = r, 
k("ElementParse", r), e.items[n];
},
addGroup:function(t, n) {
var i = function(i) {
i.mfpEl = this, e._openClick(i, t, n);
};
n || (n = {});
var r = "click.magnificPopup";
n.mainEl = t, n.items ? (n.isObj = !0, t.off(r).on(r, i)) :(n.isObj = !1, n.delegate ? t.off(r).on(r, n.delegate, i) :(n.items = t, 
t.off(r).on(r, i)));
},
_openClick:function(n, i, r) {
var o = void 0 !== r.midClick ? r.midClick :t.magnificPopup.defaults.midClick;
if (o || 2 !== n.which && !n.ctrlKey && !n.metaKey) {
var s = void 0 !== r.disableOn ? r.disableOn :t.magnificPopup.defaults.disableOn;
if (s) if (t.isFunction(s)) {
if (!s.call(e)) return !0;
} else if (w.width() < s) return !0;
n.type && (n.preventDefault(), e.isOpen && n.stopPropagation()), r.el = t(n.mfpEl), 
r.delegate && (r.items = i.find(r.delegate)), e.open(r);
}
},
updateStatus:function(t, i) {
if (e.preloader) {
n !== t && e.container.removeClass("mfp-s-" + n), i || "loading" !== t || (i = e.st.tLoading);
var r = {
status:t,
text:i
};
k("UpdateStatus", r), t = r.status, i = r.text, e.preloader.html(i), e.preloader.find("a").on("click", function(t) {
t.stopImmediatePropagation();
}), e.container.addClass("mfp-s-" + t), n = t;
}
},
_checkIfClose:function(n) {
if (!t(n).hasClass(y)) {
var i = e.st.closeOnContentClick, r = e.st.closeOnBgClick;
if (i && r) return !0;
if (!e.content || t(n).hasClass("mfp-close") || e.preloader && n === e.preloader[0]) return !0;
if (n === e.content[0] || t.contains(e.content[0], n)) {
if (i) return !0;
} else if (r && t.contains(document, n)) return !0;
return !1;
}
},
_addClassToMFP:function(t) {
e.bgOverlay.addClass(t), e.wrap.addClass(t);
},
_removeClassFromMFP:function(t) {
this.bgOverlay.removeClass(t), e.wrap.removeClass(t);
},
_hasScrollBar:function(t) {
return (e.isIE7 ? i.height() :document.body.scrollHeight) > (t || w.height());
},
_setFocus:function() {
(e.st.focus ? e.content.find(e.st.focus).eq(0) :e.wrap).focus();
},
_onFocusIn:function(n) {
return n.target === e.wrap[0] || t.contains(e.wrap[0], n.target) ? void 0 :(e._setFocus(), 
!1);
},
_parseMarkup:function(e, n, i) {
var r;
i.data && (n = t.extend(i.data, n)), k(h, [ e, n, i ]), t.each(n, function(t, n) {
if (void 0 === n || n === !1) return !0;
if (r = t.split("_"), r.length > 1) {
var i = e.find(m + "-" + r[0]);
if (i.length > 0) {
var o = r[1];
"replaceWith" === o ? i[0] !== n[0] && i.replaceWith(n) :"img" === o ? i.is("img") ? i.attr("src", n) :i.replaceWith('<img src="' + n + '" class="' + i.attr("class") + '" />') :i.attr(r[1], n);
}
} else e.find(m + "-" + t).html(n);
});
},
_getScrollbarSize:function() {
if (void 0 === e.scrollbarSize) {
var t = document.createElement("div");
t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", 
document.body.appendChild(t), e.scrollbarSize = t.offsetWidth - t.clientWidth, document.body.removeChild(t);
}
return e.scrollbarSize;
}
}, t.magnificPopup = {
instance:null,
proto:_.prototype,
modules:[],
open:function(e, n) {
return T(), e = e ? t.extend(!0, {}, e) :{}, e.isObj = !0, e.index = n || 0, this.instance.open(e);
},
close:function() {
return t.magnificPopup.instance && t.magnificPopup.instance.close();
},
registerModule:function(e, n) {
n.options && (t.magnificPopup.defaults[e] = n.options), t.extend(this.proto, n.proto), 
this.modules.push(e);
},
defaults:{
disableOn:0,
key:null,
midClick:!1,
mainClass:"",
preloader:!0,
focus:"",
closeOnContentClick:!1,
closeOnBgClick:!0,
closeBtnInside:!0,
showCloseBtn:!0,
enableEscapeKey:!0,
modal:!1,
alignTop:!1,
removalDelay:0,
prependTo:null,
fixedContentPos:"auto",
fixedBgPos:"auto",
overflowY:"auto",
closeMarkup:'<button title="%title%" type="button" class="mfp-close">&times;</button>',
tClose:"Close (Esc)",
tLoading:"Loading..."
}
}, t.fn.magnificPopup = function(n) {
T();
var i = t(this);
if ("string" == typeof n) if ("open" === n) {
var r, o = b ? i.data("magnificPopup") :i[0].magnificPopup, s = parseInt(arguments[1], 10) || 0;
o.items ? r = o.items[s] :(r = i, o.delegate && (r = r.find(o.delegate)), r = r.eq(s)), 
e._openClick({
mfpEl:r
}, i, o);
} else e.isOpen && e[n].apply(e, Array.prototype.slice.call(arguments, 1)); else n = t.extend(!0, {}, n), 
b ? i.data("magnificPopup", n) :i[0].magnificPopup = n, e.addGroup(i, n);
return i;
};
var D, M, O, I = "inline", j = function() {
O && (M.after(O.addClass(D)).detach(), O = null);
};
t.magnificPopup.registerModule(I, {
options:{
hiddenClass:"hide",
markup:"",
tNotFound:"Content not found"
},
proto:{
initInline:function() {
e.types.push(I), x(a + "." + I, function() {
j();
});
},
getInline:function(n, i) {
if (j(), n.src) {
var r = e.st.inline, o = t(n.src);
if (o.length) {
var s = o[0].parentNode;
s && s.tagName && (M || (D = r.hiddenClass, M = S(D), D = "mfp-" + D), O = o.after(M).detach().removeClass(D)), 
e.updateStatus("ready");
} else e.updateStatus("error", r.tNotFound), o = t("<div>");
return n.inlineElement = o, o;
}
return e.updateStatus("ready"), e._parseMarkup(i, {}, n), i;
}
}
});
var A, L = "ajax", z = function() {
A && t(document.body).removeClass(A);
}, P = function() {
z(), e.req && e.req.abort();
};
t.magnificPopup.registerModule(L, {
options:{
settings:null,
cursor:"mfp-ajax-cur",
tError:'<a href="%url%">The content</a> could not be loaded.'
},
proto:{
initAjax:function() {
e.types.push(L), A = e.st.ajax.cursor, x(a + "." + L, P), x("BeforeChange." + L, P);
},
getAjax:function(n) {
A && t(document.body).addClass(A), e.updateStatus("loading");
var i = t.extend({
url:n.src,
success:function(i, r, o) {
var s = {
data:i,
xhr:o
};
k("ParseAjax", s), e.appendContent(t(s.data), L), n.finished = !0, z(), e._setFocus(), 
setTimeout(function() {
e.wrap.addClass(g);
}, 16), e.updateStatus("ready"), k("AjaxContentAdded");
},
error:function() {
z(), n.finished = n.loadError = !0, e.updateStatus("error", e.st.ajax.tError.replace("%url%", n.src));
}
}, e.st.ajax.settings);
return e.req = t.ajax(i), "";
}
}
});
var H, N = function(n) {
if (n.data && void 0 !== n.data.title) return n.data.title;
var i = e.st.image.titleSrc;
if (i) {
if (t.isFunction(i)) return i.call(e, n);
if (n.el) return n.el.attr(i) || "";
}
return "";
};
t.magnificPopup.registerModule("image", {
options:{
markup:'<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
cursor:"mfp-zoom-out-cur",
titleSrc:"title",
verticalFit:!0,
tError:'<a href="%url%">The image</a> could not be loaded.'
},
proto:{
initImage:function() {
var n = e.st.image, i = ".image";
e.types.push("image"), x(d + i, function() {
"image" === e.currItem.type && n.cursor && t(document.body).addClass(n.cursor);
}), x(a + i, function() {
n.cursor && t(document.body).removeClass(n.cursor), w.off("resize" + m);
}), x("Resize" + i, e.resizeImage), e.isLowIE && x("AfterChange", e.resizeImage);
},
resizeImage:function() {
var t = e.currItem;
if (t && t.img && e.st.image.verticalFit) {
var n = 0;
e.isLowIE && (n = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)), 
t.img.css("max-height", e.wH - n);
}
},
_onImageHasSize:function(t) {
t.img && (t.hasSize = !0, H && clearInterval(H), t.isCheckingImgSize = !1, k("ImageHasSize", t), 
t.imgHidden && (e.content && e.content.removeClass("mfp-loading"), t.imgHidden = !1));
},
findImageSize:function(t) {
var n = 0, i = t.img[0], r = function(o) {
H && clearInterval(H), H = setInterval(function() {
return i.naturalWidth > 0 ? void e._onImageHasSize(t) :(n > 200 && clearInterval(H), 
n++, void (3 === n ? r(10) :40 === n ? r(50) :100 === n && r(500)));
}, o);
};
r(1);
},
getImage:function(n, i) {
var r = 0, o = function() {
n && (n.img[0].complete ? (n.img.off(".mfploader"), n === e.currItem && (e._onImageHasSize(n), 
e.updateStatus("ready")), n.hasSize = !0, n.loaded = !0, k("ImageLoadComplete")) :(r++, 
200 > r ? setTimeout(o, 100) :s()));
}, s = function() {
n && (n.img.off(".mfploader"), n === e.currItem && (e._onImageHasSize(n), e.updateStatus("error", a.tError.replace("%url%", n.src))), 
n.hasSize = !0, n.loaded = !0, n.loadError = !0);
}, a = e.st.image, u = i.find(".mfp-img");
if (u.length) {
var l = document.createElement("img");
l.className = "mfp-img", n.el && n.el.find("img").length && (l.alt = n.el.find("img").attr("alt")), 
n.img = t(l).on("load.mfploader", o).on("error.mfploader", s), l.src = n.src, u.is("img") && (n.img = n.img.clone()), 
l = n.img[0], l.naturalWidth > 0 ? n.hasSize = !0 :l.width || (n.hasSize = !1);
}
return e._parseMarkup(i, {
title:N(n),
img_replaceWith:n.img
}, n), e.resizeImage(), n.hasSize ? (H && clearInterval(H), n.loadError ? (i.addClass("mfp-loading"), 
e.updateStatus("error", a.tError.replace("%url%", n.src))) :(i.removeClass("mfp-loading"), 
e.updateStatus("ready")), i) :(e.updateStatus("loading"), n.loading = !0, n.hasSize || (n.imgHidden = !0, 
i.addClass("mfp-loading"), e.findImageSize(n)), i);
}
}
});
var R, $ = function() {
return void 0 === R && (R = void 0 !== document.createElement("p").style.MozTransform), 
R;
};
t.magnificPopup.registerModule("zoom", {
options:{
enabled:!1,
easing:"ease-in-out",
duration:300,
opener:function(t) {
return t.is("img") ? t :t.find("img");
}
},
proto:{
initZoom:function() {
var t, n = e.st.zoom, i = ".zoom";
if (n.enabled && e.supportsTransition) {
var r, o, s = n.duration, l = function(t) {
var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"), i = "all " + n.duration / 1e3 + "s " + n.easing, r = {
position:"fixed",
zIndex:9999,
left:0,
top:0,
"-webkit-backface-visibility":"hidden"
}, o = "transition";
return r["-webkit-" + o] = r["-moz-" + o] = r["-o-" + o] = r[o] = i, e.css(r), e;
}, c = function() {
e.content.css("visibility", "visible");
};
x("BuildControls" + i, function() {
if (e._allowZoom()) {
if (clearTimeout(r), e.content.css("visibility", "hidden"), t = e._getItemToZoom(), 
!t) return void c();
o = l(t), o.css(e._getOffset()), e.wrap.append(o), r = setTimeout(function() {
o.css(e._getOffset(!0)), r = setTimeout(function() {
c(), setTimeout(function() {
o.remove(), t = o = null, k("ZoomAnimationEnded");
}, 16);
}, s);
}, 16);
}
}), x(u + i, function() {
if (e._allowZoom()) {
if (clearTimeout(r), e.st.removalDelay = s, !t) {
if (t = e._getItemToZoom(), !t) return;
o = l(t);
}
o.css(e._getOffset(!0)), e.wrap.append(o), e.content.css("visibility", "hidden"), 
setTimeout(function() {
o.css(e._getOffset());
}, 16);
}
}), x(a + i, function() {
e._allowZoom() && (c(), o && o.remove(), t = null);
});
}
},
_allowZoom:function() {
return "image" === e.currItem.type;
},
_getItemToZoom:function() {
return e.currItem.hasSize ? e.currItem.img :!1;
},
_getOffset:function(n) {
var i;
i = n ? e.currItem.img :e.st.zoom.opener(e.currItem.el || e.currItem);
var r = i.offset(), o = parseInt(i.css("padding-top"), 10), s = parseInt(i.css("padding-bottom"), 10);
r.top -= t(window).scrollTop() - o;
var a = {
width:i.width(),
height:(b ? i.innerHeight() :i[0].offsetHeight) - s - o
};
return $() ? a["-moz-transform"] = a.transform = "translate(" + r.left + "px," + r.top + "px)" :(a.left = r.left, 
a.top = r.top), a;
}
}
});
var F = "iframe", q = "//about:blank", U = function(t) {
if (e.currTemplate[F]) {
var n = e.currTemplate[F].find("iframe");
n.length && (t || (n[0].src = q), e.isIE8 && n.css("display", t ? "block" :"none"));
}
};
t.magnificPopup.registerModule(F, {
options:{
markup:'<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
srcAction:"iframe_src",
patterns:{
youtube:{
index:"youtube.com",
id:"v=",
src:"//www.youtube.com/embed/%id%?autoplay=1"
},
vimeo:{
index:"vimeo.com/",
id:"/",
src:"//player.vimeo.com/video/%id%?autoplay=1"
},
gmaps:{
index:"//maps.google.",
src:"%id%&output=embed"
}
}
},
proto:{
initIframe:function() {
e.types.push(F), x("BeforeChange", function(t, e, n) {
e !== n && (e === F ? U() :n === F && U(!0));
}), x(a + "." + F, function() {
U();
});
},
getIframe:function(n, i) {
var r = n.src, o = e.st.iframe;
t.each(o.patterns, function() {
return r.indexOf(this.index) > -1 ? (this.id && (r = "string" == typeof this.id ? r.substr(r.lastIndexOf(this.id) + this.id.length, r.length) :this.id.call(this, r)), 
r = this.src.replace("%id%", r), !1) :void 0;
});
var s = {};
return o.srcAction && (s[o.srcAction] = r), e._parseMarkup(i, s, n), e.updateStatus("ready"), 
i;
}
}
});
var B = function(t) {
var n = e.items.length;
return t > n - 1 ? t - n :0 > t ? n + t :t;
}, Y = function(t, e, n) {
return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, n);
};
t.magnificPopup.registerModule("gallery", {
options:{
enabled:!1,
arrowMarkup:'<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
preload:[ 0, 2 ],
navigateByImgClick:!0,
arrows:!0,
tPrev:"Previous (Left arrow key)",
tNext:"Next (Right arrow key)",
tCounter:"%curr% of %total%"
},
proto:{
initGallery:function() {
var n = e.st.gallery, r = ".mfp-gallery", s = Boolean(t.fn.mfpFastClick);
return e.direction = !0, n && n.enabled ? (o += " mfp-gallery", x(d + r, function() {
n.navigateByImgClick && e.wrap.on("click" + r, ".mfp-img", function() {
return e.items.length > 1 ? (e.next(), !1) :void 0;
}), i.on("keydown" + r, function(t) {
37 === t.keyCode ? e.prev() :39 === t.keyCode && e.next();
});
}), x("UpdateStatus" + r, function(t, n) {
n.text && (n.text = Y(n.text, e.currItem.index, e.items.length));
}), x(h + r, function(t, i, r, o) {
var s = e.items.length;
r.counter = s > 1 ? Y(n.tCounter, o.index, s) :"";
}), x("BuildControls" + r, function() {
if (e.items.length > 1 && n.arrows && !e.arrowLeft) {
var i = n.arrowMarkup, r = e.arrowLeft = t(i.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(y), o = e.arrowRight = t(i.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(y), a = s ? "mfpFastClick" :"click";
r[a](function() {
e.prev();
}), o[a](function() {
e.next();
}), e.isIE7 && (S("b", r[0], !1, !0), S("a", r[0], !1, !0), S("b", o[0], !1, !0), 
S("a", o[0], !1, !0)), e.container.append(r.add(o));
}
}), x(f + r, function() {
e._preloadTimeout && clearTimeout(e._preloadTimeout), e._preloadTimeout = setTimeout(function() {
e.preloadNearbyImages(), e._preloadTimeout = null;
}, 16);
}), void x(a + r, function() {
i.off(r), e.wrap.off("click" + r), e.arrowLeft && s && e.arrowLeft.add(e.arrowRight).destroyMfpFastClick(), 
e.arrowRight = e.arrowLeft = null;
})) :!1;
},
next:function() {
e.direction = !0, e.index = B(e.index + 1), e.updateItemHTML();
},
prev:function() {
e.direction = !1, e.index = B(e.index - 1), e.updateItemHTML();
},
goTo:function(t) {
e.direction = t >= e.index, e.index = t, e.updateItemHTML();
},
preloadNearbyImages:function() {
var t, n = e.st.gallery.preload, i = Math.min(n[0], e.items.length), r = Math.min(n[1], e.items.length);
for (t = 1; t <= (e.direction ? r :i); t++) e._preloadItem(e.index + t);
for (t = 1; t <= (e.direction ? i :r); t++) e._preloadItem(e.index - t);
},
_preloadItem:function(n) {
if (n = B(n), !e.items[n].preloaded) {
var i = e.items[n];
i.parsed || (i = e.parseEl(n)), k("LazyLoad", i), "image" === i.type && (i.img = t('<img class="mfp-img" />').on("load.mfploader", function() {
i.hasSize = !0;
}).on("error.mfploader", function() {
i.hasSize = !0, i.loadError = !0, k("LazyLoadError", i);
}).attr("src", i.src)), i.preloaded = !0;
}
}
}
});
var W = "retina";
t.magnificPopup.registerModule(W, {
options:{
replaceSrc:function(t) {
return t.src.replace(/\.\w+$/, function(t) {
return "@2x" + t;
});
},
ratio:1
},
proto:{
initRetina:function() {
if (window.devicePixelRatio > 1) {
var t = e.st.retina, n = t.ratio;
n = isNaN(n) ? n() :n, n > 1 && (x("ImageHasSize." + W, function(t, e) {
e.img.css({
"max-width":e.img[0].naturalWidth / n,
width:"100%"
});
}), x("ElementParse." + W, function(e, i) {
i.src = t.replaceSrc(i, n);
}));
}
}
}
}), function() {
var e = 1e3, n = "ontouchstart" in window, i = function() {
w.off("touchmove" + o + " touchend" + o);
}, r = "mfpFastClick", o = "." + r;
t.fn.mfpFastClick = function(r) {
return t(this).each(function() {
var s, a = t(this);
if (n) {
var u, l, c, h, d, f;
a.on("touchstart" + o, function(t) {
h = !1, f = 1, d = t.originalEvent ? t.originalEvent.touches[0] :t.touches[0], l = d.clientX, 
c = d.clientY, w.on("touchmove" + o, function(t) {
d = t.originalEvent ? t.originalEvent.touches :t.touches, f = d.length, d = d[0], 
(Math.abs(d.clientX - l) > 10 || Math.abs(d.clientY - c) > 10) && (h = !0, i());
}).on("touchend" + o, function(t) {
i(), h || f > 1 || (s = !0, t.preventDefault(), clearTimeout(u), u = setTimeout(function() {
s = !1;
}, e), r());
});
});
}
a.on("click" + o, function() {
s || r();
});
});
}, t.fn.destroyMfpFastClick = function() {
t(this).off("touchstart" + o + " click" + o), n && w.off("touchmove" + o + " touchend" + o);
};
}(), T();
}), function(t) {
var e, n = {
className:"autosizejs",
id:"autosizejs",
append:"\n",
callback:!1,
resizeDelay:10,
placeholder:!0
}, i = [ "fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent", "whiteSpace" ], r = t('<textarea tabindex="-1"/>').data("autosize", !0)[0];
r.style.cssText = "position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;", 
r.style.lineHeight = "99px", "99px" === t(r).css("lineHeight") && i.push("lineHeight"), 
r.style.lineHeight = "", t.fn.autosize = function(o) {
return this.length ? (o = t.extend({}, n, o || {}), r.parentNode !== document.body && t(document.body).append(r), 
this.each(function() {
function n() {
var e, n = window.getComputedStyle ? window.getComputedStyle(d, null) :null;
n ? (e = parseFloat(n.width), ("border-box" === n.boxSizing || "border-box" === n.webkitBoxSizing || "border-box" === n.mozBoxSizing) && t.each([ "paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth" ], function(t, i) {
e -= parseFloat(n[i]);
})) :e = f.width(), r.style.width = Math.max(e, 0) + "px";
}
function s() {
var s = {};
if (e = d, r.className = o.className, r.id = o.id, l = parseFloat(f.css("maxHeight")), 
t.each(i, function(t, e) {
s[e] = f.css(e);
}), t(r).css(s).attr("wrap", f.attr("wrap")), n(), window.chrome) {
var a = d.style.width;
d.style.width = "0px";
{
d.offsetWidth;
}
d.style.width = a;
}
}
function a() {
var t, i;
e !== d ? s() :n(), r.value = !d.value && o.placeholder ? f.attr("placeholder") || "" :d.value, 
r.value += o.append || "", r.style.overflowY = d.style.overflowY, i = parseFloat(d.style.height) || 0, 
r.scrollTop = 0, r.scrollTop = 9e4, t = r.scrollTop, l && t > l ? (d.style.overflowY = "scroll", 
t = l) :(d.style.overflowY = "hidden", c > t && (t = c)), t += p, Math.abs(i - t) > .01 && (d.style.height = t + "px", 
r.className = r.className, m && o.callback.call(d, d), f.trigger("autosize.resized"));
}
function u() {
clearTimeout(h), h = setTimeout(function() {
var t = f.width();
t !== v && (v = t, a());
}, parseInt(o.resizeDelay, 10));
}
var l, c, h, d = this, f = t(d), p = 0, m = t.isFunction(o.callback), g = {
height:d.style.height,
overflow:d.style.overflow,
overflowY:d.style.overflowY,
wordWrap:d.style.wordWrap,
resize:d.style.resize
}, v = f.width(), y = f.css("resize");
f.data("autosize") || (f.data("autosize", !0), ("border-box" === f.css("box-sizing") || "border-box" === f.css("-moz-box-sizing") || "border-box" === f.css("-webkit-box-sizing")) && (p = f.outerHeight() - f.height()), 
c = Math.max(parseFloat(f.css("minHeight")) - p || 0, f.height()), f.css({
overflow:"hidden",
overflowY:"hidden",
wordWrap:"break-word"
}), "vertical" === y ? f.css("resize", "none") :"both" === y && f.css("resize", "horizontal"), 
"onpropertychange" in d ? "oninput" in d ? f.on("input.autosize keyup.autosize", a) :f.on("propertychange.autosize", function() {
"value" === event.propertyName && a();
}) :f.on("input.autosize", a), o.resizeDelay !== !1 && t(window).on("resize.autosize", u), 
f.on("autosize.resize", a), f.on("autosize.resizeIncludeStyle", function() {
e = null, a();
}), f.on("autosize.destroy", function() {
e = null, clearTimeout(h), t(window).off("resize", u), f.off("autosize").off(".autosize").css(g).removeData("autosize");
}), a());
})) :this;
};
}(jQuery || $), function(t) {
t.fn.maxlength = function(e) {
var n = t(this);
return n.each(function() {
e = t.extend({}, {
counterContainer:!1,
text:"%left characters left"
}, e);
var n = t(this), i = {
options:e,
field:n,
counter:t('<div class="maxlength"></div>'),
maxLength:parseInt(n.attr("maxlength"), 10),
lastLength:null,
updateCounter:function() {
var e = this.field.val().length, n = this.options.text.replace(/\B%(length|maxlength|left)\b/g, t.proxy(function(t, n) {
return "length" == n ? e :"maxlength" == n ? this.maxLength :this.maxLength - e;
}, this));
this.counter.html(n), e != this.lastLength && this.updateLength(e);
},
updateLength:function(t) {
this.field.trigger("update.maxlength", [ this.field, this.lastLength, t, this.maxLength, this.maxLength - t ]), 
this.lastLength = t;
}
};
i.maxLength && (i.field.data("maxlength", i).bind({
"keyup change":function() {
t(this).data("maxlength").updateCounter();
},
"cut paste drop":function() {
setTimeout(t.proxy(function() {
t(this).data("maxlength").updateCounter();
}, this), 1);
}
}), e.counterContainer ? e.counterContainer.append(i.counter) :i.field.after(i.counter), 
i.updateCounter());
}), n;
};
}(jQuery), function(t) {
t.simplePlaceholder = {
placeholderClass:null,
hidePlaceholder:function() {
var e = t(this);
e.val() == e.attr("placeholder") && e.data(t.simplePlaceholder.placeholderData) && e.val("").removeClass(t.simplePlaceholder.placeholderClass).data(t.simplePlaceholder.placeholderData, !1);
},
showPlaceholder:function() {
var e = t(this);
"" == e.val() && e.val(e.attr("placeholder")).addClass(t.simplePlaceholder.placeholderClass).data(t.simplePlaceholder.placeholderData, !0);
},
preventPlaceholderSubmit:function() {
return t(this).find(".simple-placeholder").each(function() {
var e = t(this);
e.val() == e.attr("placeholder") && e.data(t.simplePlaceholder.placeholderData) && e.val("");
}), !0;
}
}, t.fn.simplePlaceholder = function(e) {
if (void 0 == document.createElement("input").placeholder) {
var n = {
placeholderClass:"placeholding",
placeholderData:"simplePlaceholder.placeholding"
};
e && t.extend(n, e), t.extend(t.simplePlaceholder, n), this.each(function() {
var e = t(this);
e.focus(t.simplePlaceholder.hidePlaceholder), e.blur(t.simplePlaceholder.showPlaceholder), 
e.data(t.simplePlaceholder.placeholderData, !1), "" == e.val() && (e.val(e.attr("placeholder")), 
e.addClass(t.simplePlaceholder.placeholderClass), e.data(t.simplePlaceholder.placeholderData, !0)), 
e.addClass("simple-placeholder"), t(this.form).submit(t.simplePlaceholder.preventPlaceholderSubmit);
});
}
return this;
};
}(jQuery), function(t) {
"use strict";
var e = function(t, n, i) {
var r, o, s = document.createElement("img");
if (s.onerror = n, s.onload = function() {
!o || i && i.noRevoke || e.revokeObjectURL(o), n && n(e.scale(s, i));
}, e.isInstanceOf("Blob", t) || e.isInstanceOf("File", t)) r = o = e.createObjectURL(t), 
s._type = t.type; else {
if ("string" != typeof t) return !1;
r = t, i && i.crossOrigin && (s.crossOrigin = i.crossOrigin);
}
return r ? (s.src = r, s) :e.readFile(t, function(t) {
var e = t.target;
e && e.result ? s.src = e.result :n && n(t);
});
}, n = window.createObjectURL && window || window.URL && URL.revokeObjectURL && URL || window.webkitURL && webkitURL;
e.isInstanceOf = function(t, e) {
return Object.prototype.toString.call(e) === "[object " + t + "]";
}, e.transformCoordinates = function() {}, e.getTransformedOptions = function(t, e) {
var n, i, r, o, s = e.aspectRatio;
if (!s) return e;
n = {};
for (i in e) e.hasOwnProperty(i) && (n[i] = e[i]);
return n.crop = !0, r = t.naturalWidth || t.width, o = t.naturalHeight || t.height, 
r / o > s ? (n.maxWidth = o * s, n.maxHeight = o) :(n.maxWidth = r, n.maxHeight = r / s), 
n;
}, e.renderImageToCanvas = function(t, e, n, i, r, o, s, a, u, l) {
return t.getContext("2d").drawImage(e, n, i, r, o, s, a, u, l), t;
}, e.hasCanvasOption = function(t) {
return t.canvas || t.crop || t.aspectRatio;
}, e.scale = function(t, n) {
n = n || {};
var i, r, o, s, a, u, l, c, h, d = document.createElement("canvas"), f = t.getContext || e.hasCanvasOption(n) && d.getContext, p = t.naturalWidth || t.width, m = t.naturalHeight || t.height, g = p, v = m, y = function() {
var t = Math.max((o || g) / g, (s || v) / v);
t > 1 && (g *= t, v *= t);
}, _ = function() {
var t = Math.min((i || g) / g, (r || v) / v);
1 > t && (g *= t, v *= t);
};
return f && (n = e.getTransformedOptions(t, n), l = n.left || 0, c = n.top || 0, 
n.sourceWidth ? (a = n.sourceWidth, void 0 !== n.right && void 0 === n.left && (l = p - a - n.right)) :a = p - l - (n.right || 0), 
n.sourceHeight ? (u = n.sourceHeight, void 0 !== n.bottom && void 0 === n.top && (c = m - u - n.bottom)) :u = m - c - (n.bottom || 0), 
g = a, v = u), i = n.maxWidth, r = n.maxHeight, o = n.minWidth, s = n.minHeight, 
f && i && r && n.crop ? (g = i, v = r, h = a / u - i / r, 0 > h ? (u = r * a / i, 
void 0 === n.top && void 0 === n.bottom && (c = (m - u) / 2)) :h > 0 && (a = i * u / r, 
void 0 === n.left && void 0 === n.right && (l = (p - a) / 2))) :((n.contain || n.cover) && (o = i = i || o, 
s = r = r || s), n.cover ? (_(), y()) :(y(), _())), f ? (d.width = g, d.height = v, 
e.transformCoordinates(d, n), e.renderImageToCanvas(d, t, l, c, a, u, 0, 0, g, v)) :(t.width = g, 
t.height = v, t);
}, e.createObjectURL = function(t) {
return n ? n.createObjectURL(t) :!1;
}, e.revokeObjectURL = function(t) {
return n ? n.revokeObjectURL(t) :!1;
}, e.readFile = function(t, e, n) {
if (window.FileReader) {
var i = new FileReader();
if (i.onload = i.onerror = e, n = n || "readAsDataURL", i[n]) return i[n](t), i;
}
return !1;
}, "function" == typeof define && define.amd ? define(function() {
return e;
}) :t.loadImage = e;
}(this), function(t) {
"use strict";
"function" == typeof define && define.amd ? define([ "jquery" ], t) :t("object" == typeof exports ? require("jquery") :window.jQuery);
}(function(t) {
"use strict";
var e = 0;
t.ajaxTransport("iframe", function(n) {
if (n.async) {
var i, r, o, s = n.initialIframeSrc || "javascript:false;";
return {
send:function(a, u) {
i = t('<form style="display:none;"></form>'), i.attr("accept-charset", n.formAcceptCharset), 
o = /\?/.test(n.url) ? "&" :"?", "DELETE" === n.type ? (n.url = n.url + o + "_method=DELETE", 
n.type = "POST") :"PUT" === n.type ? (n.url = n.url + o + "_method=PUT", n.type = "POST") :"PATCH" === n.type && (n.url = n.url + o + "_method=PATCH", 
n.type = "POST"), e += 1, r = t('<iframe src="' + s + '" name="iframe-transport-' + e + '"></iframe>').bind("load", function() {
var e, o = t.isArray(n.paramName) ? n.paramName :[ n.paramName ];
r.unbind("load").bind("load", function() {
var e;
try {
if (e = r.contents(), !e.length || !e[0].firstChild) throw new Error();
} catch (n) {
e = void 0;
}
u(200, "success", {
iframe:e
}), t('<iframe src="' + s + '"></iframe>').appendTo(i), window.setTimeout(function() {
i.remove();
}, 0);
}), i.prop("target", r.prop("name")).prop("action", n.url).prop("method", n.type), 
n.formData && t.each(n.formData, function(e, n) {
t('<input type="hidden"/>').prop("name", n.name).val(n.value).appendTo(i);
}), n.fileInput && n.fileInput.length && "POST" === n.type && (e = n.fileInput.clone(), 
n.fileInput.after(function(t) {
return e[t];
}), n.paramName && n.fileInput.each(function(e) {
t(this).prop("name", o[e] || n.paramName);
}), i.append(n.fileInput).prop("enctype", "multipart/form-data").prop("encoding", "multipart/form-data"), 
n.fileInput.removeAttr("form")), i.submit(), e && e.length && n.fileInput.each(function(n, i) {
var r = t(e[n]);
t(i).prop("name", r.prop("name")).attr("form", r.attr("form")), r.replaceWith(i);
});
}), i.append(r).appendTo(document.body);
},
abort:function() {
r && r.unbind("load").prop("src", s), i && i.remove();
}
};
}
}), t.ajaxSetup({
converters:{
"iframe text":function(e) {
return e && t(e[0].body).text();
},
"iframe json":function(e) {
return e && t.parseJSON(t(e[0].body).text());
},
"iframe html":function(e) {
return e && t(e[0].body).html();
},
"iframe xml":function(e) {
var n = e && e[0];
return n && t.isXMLDoc(n) ? n :t.parseXML(n.XMLDocument && n.XMLDocument.xml || t(n.body).html());
},
"iframe script":function(e) {
return e && t.globalEval(t(e[0].body).text());
}
}
});
}), function(t) {
"function" == typeof define && define.amd ? define([ "jquery" ], t) :t("object" == typeof exports ? require("jquery") :jQuery);
}(function(t) {
var e = 0, n = Array.prototype.slice;
t.cleanData = function(e) {
return function(n) {
var i, r, o;
for (o = 0; null != (r = n[o]); o++) try {
i = t._data(r, "events"), i && i.remove && t(r).triggerHandler("remove");
} catch (s) {}
e(n);
};
}(t.cleanData), t.widget = function(e, n, i) {
var r, o, s, a, u = {}, l = e.split(".")[0];
return e = e.split(".")[1], r = l + "-" + e, i || (i = n, n = t.Widget), t.expr[":"][r.toLowerCase()] = function(e) {
return !!t.data(e, r);
}, t[l] = t[l] || {}, o = t[l][e], s = t[l][e] = function(t, e) {
return this._createWidget ? void (arguments.length && this._createWidget(t, e)) :new s(t, e);
}, t.extend(s, o, {
version:i.version,
_proto:t.extend({}, i),
_childConstructors:[]
}), a = new n(), a.options = t.widget.extend({}, a.options), t.each(i, function(e, i) {
return t.isFunction(i) ? void (u[e] = function() {
var t = function() {
return n.prototype[e].apply(this, arguments);
}, r = function(t) {
return n.prototype[e].apply(this, t);
};
return function() {
var e, n = this._super, o = this._superApply;
return this._super = t, this._superApply = r, e = i.apply(this, arguments), this._super = n, 
this._superApply = o, e;
};
}()) :void (u[e] = i);
}), s.prototype = t.widget.extend(a, {
widgetEventPrefix:o ? a.widgetEventPrefix || e :e
}, u, {
constructor:s,
namespace:l,
widgetName:e,
widgetFullName:r
}), o ? (t.each(o._childConstructors, function(e, n) {
var i = n.prototype;
t.widget(i.namespace + "." + i.widgetName, s, n._proto);
}), delete o._childConstructors) :n._childConstructors.push(s), t.widget.bridge(e, s), 
s;
}, t.widget.extend = function(e) {
for (var i, r, o = n.call(arguments, 1), s = 0, a = o.length; a > s; s++) for (i in o[s]) r = o[s][i], 
o[s].hasOwnProperty(i) && void 0 !== r && (e[i] = t.isPlainObject(r) ? t.isPlainObject(e[i]) ? t.widget.extend({}, e[i], r) :t.widget.extend({}, r) :r);
return e;
}, t.widget.bridge = function(e, i) {
var r = i.prototype.widgetFullName || e;
t.fn[e] = function(o) {
var s = "string" == typeof o, a = n.call(arguments, 1), u = this;
return o = !s && a.length ? t.widget.extend.apply(null, [ o ].concat(a)) :o, this.each(s ? function() {
var n, i = t.data(this, r);
return "instance" === o ? (u = i, !1) :i ? t.isFunction(i[o]) && "_" !== o.charAt(0) ? (n = i[o].apply(i, a), 
n !== i && void 0 !== n ? (u = n && n.jquery ? u.pushStack(n.get()) :n, !1) :void 0) :t.error("no such method '" + o + "' for " + e + " widget instance") :t.error("cannot call methods on " + e + " prior to initialization; attempted to call method '" + o + "'");
} :function() {
var e = t.data(this, r);
e ? (e.option(o || {}), e._init && e._init()) :t.data(this, r, new i(o, this));
}), u;
};
}, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
widgetName:"widget",
widgetEventPrefix:"",
defaultElement:"<div>",
options:{
disabled:!1,
create:null
},
_createWidget:function(n, i) {
i = t(i || this.defaultElement || this)[0], this.element = t(i), this.uuid = e++, 
this.eventNamespace = "." + this.widgetName + this.uuid, this.options = t.widget.extend({}, this.options, this._getCreateOptions(), n), 
this.bindings = t(), this.hoverable = t(), this.focusable = t(), i !== this && (t.data(i, this.widgetFullName, this), 
this._on(!0, this.element, {
remove:function(t) {
t.target === i && this.destroy();
}
}), this.document = t(i.style ? i.ownerDocument :i.document || i), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), 
this._create(), this._trigger("create", null, this._getCreateEventData()), this._init();
},
_getCreateOptions:t.noop,
_getCreateEventData:t.noop,
_create:t.noop,
_init:t.noop,
destroy:function() {
this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), 
this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), 
this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), 
this.focusable.removeClass("ui-state-focus");
},
_destroy:t.noop,
widget:function() {
return this.element;
},
option:function(e, n) {
var i, r, o, s = e;
if (0 === arguments.length) return t.widget.extend({}, this.options);
if ("string" == typeof e) if (s = {}, i = e.split("."), e = i.shift(), i.length) {
for (r = s[e] = t.widget.extend({}, this.options[e]), o = 0; o < i.length - 1; o++) r[i[o]] = r[i[o]] || {}, 
r = r[i[o]];
if (e = i.pop(), 1 === arguments.length) return void 0 === r[e] ? null :r[e];
r[e] = n;
} else {
if (1 === arguments.length) return void 0 === this.options[e] ? null :this.options[e];
s[e] = n;
}
return this._setOptions(s), this;
},
_setOptions:function(t) {
var e;
for (e in t) this._setOption(e, t[e]);
return this;
},
_setOption:function(t, e) {
return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!e), 
e && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), 
this;
},
enable:function() {
return this._setOptions({
disabled:!1
});
},
disable:function() {
return this._setOptions({
disabled:!0
});
},
_on:function(e, n, i) {
var r, o = this;
"boolean" != typeof e && (i = n, n = e, e = !1), i ? (n = r = t(n), this.bindings = this.bindings.add(n)) :(i = n, 
n = this.element, r = this.widget()), t.each(i, function(i, s) {
function a() {
return e || o.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof s ? o[s] :s).apply(o, arguments) :void 0;
}
"string" != typeof s && (a.guid = s.guid = s.guid || a.guid || t.guid++);
var u = i.match(/^([\w:-]*)\s*(.*)$/), l = u[1] + o.eventNamespace, c = u[2];
c ? r.delegate(c, l, a) :n.bind(l, a);
});
},
_off:function(t, e) {
e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, 
t.unbind(e).undelegate(e);
},
_delay:function(t, e) {
function n() {
return ("string" == typeof t ? i[t] :t).apply(i, arguments);
}
var i = this;
return setTimeout(n, e || 0);
},
_hoverable:function(e) {
this.hoverable = this.hoverable.add(e), this._on(e, {
mouseenter:function(e) {
t(e.currentTarget).addClass("ui-state-hover");
},
mouseleave:function(e) {
t(e.currentTarget).removeClass("ui-state-hover");
}
});
},
_focusable:function(e) {
this.focusable = this.focusable.add(e), this._on(e, {
focusin:function(e) {
t(e.currentTarget).addClass("ui-state-focus");
},
focusout:function(e) {
t(e.currentTarget).removeClass("ui-state-focus");
}
});
},
_trigger:function(e, n, i) {
var r, o, s = this.options[e];
if (i = i || {}, n = t.Event(n), n.type = (e === this.widgetEventPrefix ? e :this.widgetEventPrefix + e).toLowerCase(), 
n.target = this.element[0], o = n.originalEvent) for (r in o) r in n || (n[r] = o[r]);
return this.element.trigger(n, i), !(t.isFunction(s) && s.apply(this.element[0], [ n ].concat(i)) === !1 || n.isDefaultPrevented());
}
}, t.each({
show:"fadeIn",
hide:"fadeOut"
}, function(e, n) {
t.Widget.prototype["_" + e] = function(i, r, o) {
"string" == typeof r && (r = {
effect:r
});
var s, a = r ? r === !0 || "number" == typeof r ? n :r.effect || n :e;
r = r || {}, "number" == typeof r && (r = {
duration:r
}), s = !t.isEmptyObject(r), r.complete = o, r.delay && i.delay(r.delay), s && t.effects && t.effects.effect[a] ? i[e](r) :a !== e && i[a] ? i[a](r.duration, r.easing, o) :i.queue(function(n) {
t(this)[e](), o && o.call(i[0]), n();
});
};
});
t.widget;
}), function(t) {
"use strict";
"function" == typeof define && define.amd ? define([ "jquery", "jquery.ui.widget" ], t) :"object" == typeof exports ? t(require("jquery"), require("./vendor/jquery.ui.widget")) :t(window.jQuery);
}(function(t) {
"use strict";
function e(e) {
var n = "dragover" === e;
return function(i) {
i.dataTransfer = i.originalEvent && i.originalEvent.dataTransfer;
var r = i.dataTransfer;
r && -1 !== t.inArray("Files", r.types) && this._trigger(e, t.Event(e, {
delegatedEvent:i
})) !== !1 && (i.preventDefault(), n && (r.dropEffect = "copy"));
};
}
t.support.fileInput = !(new RegExp("(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))").test(window.navigator.userAgent) || t('<input type="file">').prop("disabled")), 
t.support.xhrFileUpload = !(!window.ProgressEvent || !window.FileReader), t.support.xhrFormDataFileUpload = !!window.FormData, 
t.support.blobSlice = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice), 
t.widget("blueimp.fileupload", {
options:{
dropZone:t(document),
pasteZone:void 0,
fileInput:void 0,
replaceFileInput:!0,
paramName:void 0,
singleFileUploads:!0,
limitMultiFileUploads:void 0,
limitMultiFileUploadSize:void 0,
limitMultiFileUploadSizeOverhead:512,
sequentialUploads:!1,
limitConcurrentUploads:void 0,
forceIframeTransport:!1,
redirect:void 0,
redirectParamName:void 0,
postMessage:void 0,
multipart:!0,
maxChunkSize:void 0,
uploadedBytes:void 0,
recalculateProgress:!0,
progressInterval:100,
bitrateInterval:500,
autoUpload:!0,
messages:{
uploadedBytes:"Uploaded bytes exceed file size"
},
i18n:function(e, n) {
return e = this.messages[e] || e.toString(), n && t.each(n, function(t, n) {
e = e.replace("{" + t + "}", n);
}), e;
},
formData:function(t) {
return t.serializeArray();
},
add:function(e, n) {
return e.isDefaultPrevented() ? !1 :void ((n.autoUpload || n.autoUpload !== !1 && t(this).fileupload("option", "autoUpload")) && n.process().done(function() {
n.submit();
}));
},
processData:!1,
contentType:!1,
cache:!1,
timeout:0
},
_specialOptions:[ "fileInput", "dropZone", "pasteZone", "multipart", "forceIframeTransport" ],
_blobSlice:t.support.blobSlice && function() {
var t = this.slice || this.webkitSlice || this.mozSlice;
return t.apply(this, arguments);
},
_BitrateTimer:function() {
this.timestamp = Date.now ? Date.now() :new Date().getTime(), this.loaded = 0, this.bitrate = 0, 
this.getBitrate = function(t, e, n) {
var i = t - this.timestamp;
return (!this.bitrate || !n || i > n) && (this.bitrate = (e - this.loaded) * (1e3 / i) * 8, 
this.loaded = e, this.timestamp = t), this.bitrate;
};
},
_isXHRUpload:function(e) {
return !e.forceIframeTransport && (!e.multipart && t.support.xhrFileUpload || t.support.xhrFormDataFileUpload);
},
_getFormData:function(e) {
var n;
return "function" === t.type(e.formData) ? e.formData(e.form) :t.isArray(e.formData) ? e.formData :"object" === t.type(e.formData) ? (n = [], 
t.each(e.formData, function(t, e) {
n.push({
name:t,
value:e
});
}), n) :[];
},
_getTotal:function(e) {
var n = 0;
return t.each(e, function(t, e) {
n += e.size || 1;
}), n;
},
_initProgressObject:function(e) {
var n = {
loaded:0,
total:0,
bitrate:0
};
e._progress ? t.extend(e._progress, n) :e._progress = n;
},
_initResponseObject:function(t) {
var e;
if (t._response) for (e in t._response) t._response.hasOwnProperty(e) && delete t._response[e]; else t._response = {};
},
_onProgress:function(e, n) {
if (e.lengthComputable) {
var i, r = Date.now ? Date.now() :new Date().getTime();
if (n._time && n.progressInterval && r - n._time < n.progressInterval && e.loaded !== e.total) return;
n._time = r, i = Math.floor(e.loaded / e.total * (n.chunkSize || n._progress.total)) + (n.uploadedBytes || 0), 
this._progress.loaded += i - n._progress.loaded, this._progress.bitrate = this._bitrateTimer.getBitrate(r, this._progress.loaded, n.bitrateInterval), 
n._progress.loaded = n.loaded = i, n._progress.bitrate = n.bitrate = n._bitrateTimer.getBitrate(r, i, n.bitrateInterval), 
this._trigger("progress", t.Event("progress", {
delegatedEvent:e
}), n), this._trigger("progressall", t.Event("progressall", {
delegatedEvent:e
}), this._progress);
}
},
_initProgressListener:function(e) {
var n = this, i = e.xhr ? e.xhr() :t.ajaxSettings.xhr();
i.upload && (t(i.upload).bind("progress", function(t) {
var i = t.originalEvent;
t.lengthComputable = i.lengthComputable, t.loaded = i.loaded, t.total = i.total, 
n._onProgress(t, e);
}), e.xhr = function() {
return i;
});
},
_isInstanceOf:function(t, e) {
return Object.prototype.toString.call(e) === "[object " + t + "]";
},
_initXHRData:function(e) {
var n, i = this, r = e.files[0], o = e.multipart || !t.support.xhrFileUpload, s = "array" === t.type(e.paramName) ? e.paramName[0] :e.paramName;
e.headers = t.extend({}, e.headers), e.contentRange && (e.headers["Content-Range"] = e.contentRange), 
o && !e.blob && this._isInstanceOf("File", r) || (e.headers["Content-Disposition"] = 'attachment; filename="' + encodeURI(r.name) + '"'), 
o ? t.support.xhrFormDataFileUpload && (e.postMessage ? (n = this._getFormData(e), 
e.blob ? n.push({
name:s,
value:e.blob
}) :t.each(e.files, function(i, r) {
n.push({
name:"array" === t.type(e.paramName) && e.paramName[i] || s,
value:r
});
})) :(i._isInstanceOf("FormData", e.formData) ? n = e.formData :(n = new FormData(), 
t.each(this._getFormData(e), function(t, e) {
n.append(e.name, e.value);
})), e.blob ? n.append(s, e.blob, r.name) :t.each(e.files, function(r, o) {
(i._isInstanceOf("File", o) || i._isInstanceOf("Blob", o)) && n.append("array" === t.type(e.paramName) && e.paramName[r] || s, o, o.uploadName || o.name);
})), e.data = n) :(e.contentType = r.type || "application/octet-stream", e.data = e.blob || r), 
e.blob = null;
},
_initIframeSettings:function(e) {
var n = t("<a></a>").prop("href", e.url).prop("host");
e.dataType = "iframe " + (e.dataType || ""), e.formData = this._getFormData(e), 
e.redirect && n && n !== location.host && e.formData.push({
name:e.redirectParamName || "redirect",
value:e.redirect
});
},
_initDataSettings:function(t) {
this._isXHRUpload(t) ? (this._chunkedUpload(t, !0) || (t.data || this._initXHRData(t), 
this._initProgressListener(t)), t.postMessage && (t.dataType = "postmessage " + (t.dataType || ""))) :this._initIframeSettings(t);
},
_getParamName:function(e) {
var n = t(e.fileInput), i = e.paramName;
return i ? t.isArray(i) || (i = [ i ]) :(i = [], n.each(function() {
for (var e = t(this), n = e.prop("name") || "files[]", r = (e.prop("files") || [ 1 ]).length; r; ) i.push(n), 
r -= 1;
}), i.length || (i = [ n.prop("name") || "files[]" ])), i;
},
_initFormSettings:function(e) {
e.form && e.form.length || (e.form = t(e.fileInput.prop("form")), e.form.length || (e.form = t(this.options.fileInput.prop("form")))), 
e.paramName = this._getParamName(e), e.url || (e.url = e.form.prop("action") || location.href), 
e.type = (e.type || "string" === t.type(e.form.prop("method")) && e.form.prop("method") || "").toUpperCase(), 
"POST" !== e.type && "PUT" !== e.type && "PATCH" !== e.type && (e.type = "POST"), 
e.formAcceptCharset || (e.formAcceptCharset = e.form.attr("accept-charset"));
},
_getAJAXSettings:function(e) {
var n = t.extend({}, this.options, e);
return this._initFormSettings(n), this._initDataSettings(n), n;
},
_getDeferredState:function(t) {
return t.state ? t.state() :t.isResolved() ? "resolved" :t.isRejected() ? "rejected" :"pending";
},
_enhancePromise:function(t) {
return t.success = t.done, t.error = t.fail, t.complete = t.always, t;
},
_getXHRPromise:function(e, n, i) {
var r = t.Deferred(), o = r.promise();
return n = n || this.options.context || o, e === !0 ? r.resolveWith(n, i) :e === !1 && r.rejectWith(n, i), 
o.abort = r.promise, this._enhancePromise(o);
},
_addConvenienceMethods:function(e, n) {
var i = this, r = function(e) {
return t.Deferred().resolveWith(i, e).promise();
};
n.process = function(e, o) {
return (e || o) && (n._processQueue = this._processQueue = (this._processQueue || r([ this ])).pipe(function() {
return n.errorThrown ? t.Deferred().rejectWith(i, [ n ]).promise() :r(arguments);
}).pipe(e, o)), this._processQueue || r([ this ]);
}, n.submit = function() {
return "pending" !== this.state() && (n.jqXHR = this.jqXHR = i._trigger("submit", t.Event("submit", {
delegatedEvent:e
}), this) !== !1 && i._onSend(e, this)), this.jqXHR || i._getXHRPromise();
}, n.abort = function() {
return this.jqXHR ? this.jqXHR.abort() :(this.errorThrown = "abort", i._trigger("fail", null, this), 
i._getXHRPromise(!1));
}, n.state = function() {
return this.jqXHR ? i._getDeferredState(this.jqXHR) :this._processQueue ? i._getDeferredState(this._processQueue) :void 0;
}, n.processing = function() {
return !this.jqXHR && this._processQueue && "pending" === i._getDeferredState(this._processQueue);
}, n.progress = function() {
return this._progress;
}, n.response = function() {
return this._response;
};
},
_getUploadedBytes:function(t) {
var e = t.getResponseHeader("Range"), n = e && e.split("-"), i = n && n.length > 1 && parseInt(n[1], 10);
return i && i + 1;
},
_chunkedUpload:function(e, n) {
e.uploadedBytes = e.uploadedBytes || 0;
var i, r, o = this, s = e.files[0], a = s.size, u = e.uploadedBytes, l = e.maxChunkSize || a, c = this._blobSlice, h = t.Deferred(), d = h.promise();
return this._isXHRUpload(e) && c && (u || a > l) && !e.data ? n ? !0 :u >= a ? (s.error = e.i18n("uploadedBytes"), 
this._getXHRPromise(!1, e.context, [ null, "error", s.error ])) :(r = function() {
var n = t.extend({}, e), d = n._progress.loaded;
n.blob = c.call(s, u, u + l, s.type), n.chunkSize = n.blob.size, n.contentRange = "bytes " + u + "-" + (u + n.chunkSize - 1) + "/" + a, 
o._initXHRData(n), o._initProgressListener(n), i = (o._trigger("chunksend", null, n) !== !1 && t.ajax(n) || o._getXHRPromise(!1, n.context)).done(function(i, s, l) {
u = o._getUploadedBytes(l) || u + n.chunkSize, d + n.chunkSize - n._progress.loaded && o._onProgress(t.Event("progress", {
lengthComputable:!0,
loaded:u - n.uploadedBytes,
total:u - n.uploadedBytes
}), n), e.uploadedBytes = n.uploadedBytes = u, n.result = i, n.textStatus = s, n.jqXHR = l, 
o._trigger("chunkdone", null, n), o._trigger("chunkalways", null, n), a > u ? r() :h.resolveWith(n.context, [ i, s, l ]);
}).fail(function(t, e, i) {
n.jqXHR = t, n.textStatus = e, n.errorThrown = i, o._trigger("chunkfail", null, n), 
o._trigger("chunkalways", null, n), h.rejectWith(n.context, [ t, e, i ]);
});
}, this._enhancePromise(d), d.abort = function() {
return i.abort();
}, r(), d) :!1;
},
_beforeSend:function(t, e) {
0 === this._active && (this._trigger("start"), this._bitrateTimer = new this._BitrateTimer(), 
this._progress.loaded = this._progress.total = 0, this._progress.bitrate = 0), this._initResponseObject(e), 
this._initProgressObject(e), e._progress.loaded = e.loaded = e.uploadedBytes || 0, 
e._progress.total = e.total = this._getTotal(e.files) || 1, e._progress.bitrate = e.bitrate = 0, 
this._active += 1, this._progress.loaded += e.loaded, this._progress.total += e.total;
},
_onDone:function(e, n, i, r) {
var o = r._progress.total, s = r._response;
r._progress.loaded < o && this._onProgress(t.Event("progress", {
lengthComputable:!0,
loaded:o,
total:o
}), r), s.result = r.result = e, s.textStatus = r.textStatus = n, s.jqXHR = r.jqXHR = i, 
this._trigger("done", null, r);
},
_onFail:function(t, e, n, i) {
var r = i._response;
i.recalculateProgress && (this._progress.loaded -= i._progress.loaded, this._progress.total -= i._progress.total), 
r.jqXHR = i.jqXHR = t, r.textStatus = i.textStatus = e, r.errorThrown = i.errorThrown = n, 
this._trigger("fail", null, i);
},
_onAlways:function(t, e, n, i) {
this._trigger("always", null, i);
},
_onSend:function(e, n) {
n.submit || this._addConvenienceMethods(e, n);
var i, r, o, s, a = this, u = a._getAJAXSettings(n), l = function() {
return a._sending += 1, u._bitrateTimer = new a._BitrateTimer(), i = i || ((r || a._trigger("send", t.Event("send", {
delegatedEvent:e
}), u) === !1) && a._getXHRPromise(!1, u.context, r) || a._chunkedUpload(u) || t.ajax(u)).done(function(t, e, n) {
a._onDone(t, e, n, u);
}).fail(function(t, e, n) {
a._onFail(t, e, n, u);
}).always(function(t, e, n) {
if (a._onAlways(t, e, n, u), a._sending -= 1, a._active -= 1, u.limitConcurrentUploads && u.limitConcurrentUploads > a._sending) for (var i = a._slots.shift(); i; ) {
if ("pending" === a._getDeferredState(i)) {
i.resolve();
break;
}
i = a._slots.shift();
}
0 === a._active && a._trigger("stop");
});
};
return this._beforeSend(e, u), this.options.sequentialUploads || this.options.limitConcurrentUploads && this.options.limitConcurrentUploads <= this._sending ? (this.options.limitConcurrentUploads > 1 ? (o = t.Deferred(), 
this._slots.push(o), s = o.pipe(l)) :(this._sequence = this._sequence.pipe(l, l), 
s = this._sequence), s.abort = function() {
return r = [ void 0, "abort", "abort" ], i ? i.abort() :(o && o.rejectWith(u.context, r), 
l());
}, this._enhancePromise(s)) :l();
},
_onAdd:function(e, n) {
var i, r, o, s, a = this, u = !0, l = t.extend({}, this.options, n), c = n.files, h = c.length, d = l.limitMultiFileUploads, f = l.limitMultiFileUploadSize, p = l.limitMultiFileUploadSizeOverhead, m = 0, g = this._getParamName(l), v = 0;
if (!h) return !1;
if (f && void 0 === c[0].size && (f = void 0), (l.singleFileUploads || d || f) && this._isXHRUpload(l)) if (l.singleFileUploads || f || !d) if (!l.singleFileUploads && f) for (o = [], 
i = [], s = 0; h > s; s += 1) m += c[s].size + p, (s + 1 === h || m + c[s + 1].size + p > f || d && s + 1 - v >= d) && (o.push(c.slice(v, s + 1)), 
r = g.slice(v, s + 1), r.length || (r = g), i.push(r), v = s + 1, m = 0); else i = g; else for (o = [], 
i = [], s = 0; h > s; s += d) o.push(c.slice(s, s + d)), r = g.slice(s, s + d), 
r.length || (r = g), i.push(r); else o = [ c ], i = [ g ];
return n.originalFiles = c, t.each(o || c, function(r, s) {
var l = t.extend({}, n);
return l.files = o ? s :[ s ], l.paramName = i[r], a._initResponseObject(l), a._initProgressObject(l), 
a._addConvenienceMethods(e, l), u = a._trigger("add", t.Event("add", {
delegatedEvent:e
}), l);
}), u;
},
_replaceFileInput:function(e) {
var n = e.fileInput, i = n.clone(!0);
e.fileInputClone = i, t("<form></form>").append(i)[0].reset(), n.after(i).detach(), 
t.cleanData(n.unbind("remove")), this.options.fileInput = this.options.fileInput.map(function(t, e) {
return e === n[0] ? i[0] :e;
}), n[0] === this.element[0] && (this.element = i);
},
_handleFileTreeEntry:function(e, n) {
var i, r = this, o = t.Deferred(), s = function(t) {
t && !t.entry && (t.entry = e), o.resolve([ t ]);
}, a = function(t) {
r._handleFileTreeEntries(t, n + e.name + "/").done(function(t) {
o.resolve(t);
}).fail(s);
}, u = function() {
i.readEntries(function(t) {
t.length ? (l = l.concat(t), u()) :a(l);
}, s);
}, l = [];
return n = n || "", e.isFile ? e._file ? (e._file.relativePath = n, o.resolve(e._file)) :e.file(function(t) {
t.relativePath = n, o.resolve(t);
}, s) :e.isDirectory ? (i = e.createReader(), u()) :o.resolve([]), o.promise();
},
_handleFileTreeEntries:function(e, n) {
var i = this;
return t.when.apply(t, t.map(e, function(t) {
return i._handleFileTreeEntry(t, n);
})).pipe(function() {
return Array.prototype.concat.apply([], arguments);
});
},
_getDroppedFiles:function(e) {
e = e || {};
var n = e.items;
return n && n.length && (n[0].webkitGetAsEntry || n[0].getAsEntry) ? this._handleFileTreeEntries(t.map(n, function(t) {
var e;
return t.webkitGetAsEntry ? (e = t.webkitGetAsEntry(), e && (e._file = t.getAsFile()), 
e) :t.getAsEntry();
})) :t.Deferred().resolve(t.makeArray(e.files)).promise();
},
_getSingleFileInputFiles:function(e) {
e = t(e);
var n, i, r = e.prop("webkitEntries") || e.prop("entries");
if (r && r.length) return this._handleFileTreeEntries(r);
if (n = t.makeArray(e.prop("files")), n.length) void 0 === n[0].name && n[0].fileName && t.each(n, function(t, e) {
e.name = e.fileName, e.size = e.fileSize;
}); else {
if (i = e.prop("value"), !i) return t.Deferred().resolve([]).promise();
n = [ {
name:i.replace(/^.*\\/, "")
} ];
}
return t.Deferred().resolve(n).promise();
},
_getFileInputFiles:function(e) {
return e instanceof t && 1 !== e.length ? t.when.apply(t, t.map(e, this._getSingleFileInputFiles)).pipe(function() {
return Array.prototype.concat.apply([], arguments);
}) :this._getSingleFileInputFiles(e);
},
_onChange:function(e) {
var n = this, i = {
fileInput:t(e.target),
form:t(e.target.form)
};
this._getFileInputFiles(i.fileInput).always(function(r) {
i.files = r, n.options.replaceFileInput && n._replaceFileInput(i), n._trigger("change", t.Event("change", {
delegatedEvent:e
}), i) !== !1 && n._onAdd(e, i);
});
},
_onPaste:function(e) {
var n = e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.items, i = {
files:[]
};
n && n.length && (t.each(n, function(t, e) {
var n = e.getAsFile && e.getAsFile();
n && i.files.push(n);
}), this._trigger("paste", t.Event("paste", {
delegatedEvent:e
}), i) !== !1 && this._onAdd(e, i));
},
_onDrop:function(e) {
e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
var n = this, i = e.dataTransfer, r = {};
i && i.files && i.files.length && (e.preventDefault(), this._getDroppedFiles(i).always(function(i) {
r.files = i, n._trigger("drop", t.Event("drop", {
delegatedEvent:e
}), r) !== !1 && n._onAdd(e, r);
}));
},
_onDragOver:e("dragover"),
_onDragEnter:e("dragenter"),
_onDragLeave:e("dragleave"),
_initEventHandlers:function() {
this._isXHRUpload(this.options) && (this._on(this.options.dropZone, {
dragover:this._onDragOver,
drop:this._onDrop,
dragenter:this._onDragEnter,
dragleave:this._onDragLeave
}), this._on(this.options.pasteZone, {
paste:this._onPaste
})), t.support.fileInput && this._on(this.options.fileInput, {
change:this._onChange
});
},
_destroyEventHandlers:function() {
this._off(this.options.dropZone, "dragenter dragleave dragover drop"), this._off(this.options.pasteZone, "paste"), 
this._off(this.options.fileInput, "change");
},
_setOption:function(e, n) {
var i = -1 !== t.inArray(e, this._specialOptions);
i && this._destroyEventHandlers(), this._super(e, n), i && (this._initSpecialOptions(), 
this._initEventHandlers());
},
_initSpecialOptions:function() {
var e = this.options;
void 0 === e.fileInput ? e.fileInput = this.element.is('input[type="file"]') ? this.element :this.element.find('input[type="file"]') :e.fileInput instanceof t || (e.fileInput = t(e.fileInput)), 
e.dropZone instanceof t || (e.dropZone = t(e.dropZone)), e.pasteZone instanceof t || (e.pasteZone = t(e.pasteZone));
},
_getRegExp:function(t) {
var e = t.split("/"), n = e.pop();
return e.shift(), new RegExp(e.join("/"), n);
},
_isRegExpOption:function(e, n) {
return "url" !== e && "string" === t.type(n) && /^\/.*\/[igm]{0,3}$/.test(n);
},
_initDataAttributes:function() {
var e = this, n = this.options, i = this.element.data();
t.each(this.element[0].attributes, function(t, r) {
var o, s = r.name.toLowerCase();
/^data-/.test(s) && (s = s.slice(5).replace(/-[a-z]/g, function(t) {
return t.charAt(1).toUpperCase();
}), o = i[s], e._isRegExpOption(s, o) && (o = e._getRegExp(o)), n[s] = o);
});
},
_create:function() {
this._initDataAttributes(), this._initSpecialOptions(), this._slots = [], this._sequence = this._getXHRPromise(!0), 
this._sending = this._active = 0, this._initProgressObject(this), this._initEventHandlers();
},
active:function() {
return this._active;
},
progress:function() {
return this._progress;
},
add:function(e) {
var n = this;
e && !this.options.disabled && (e.fileInput && !e.files ? this._getFileInputFiles(e.fileInput).always(function(t) {
e.files = t, n._onAdd(null, e);
}) :(e.files = t.makeArray(e.files), this._onAdd(null, e)));
},
send:function(e) {
if (e && !this.options.disabled) {
if (e.fileInput && !e.files) {
var n, i, r = this, o = t.Deferred(), s = o.promise();
return s.abort = function() {
return i = !0, n ? n.abort() :(o.reject(null, "abort", "abort"), s);
}, this._getFileInputFiles(e.fileInput).always(function(t) {
if (!i) {
if (!t.length) return void o.reject();
e.files = t, n = r._onSend(null, e), n.then(function(t, e, n) {
o.resolve(t, e, n);
}, function(t, e, n) {
o.reject(t, e, n);
});
}
}), this._enhancePromise(s);
}
if (e.files = t.makeArray(e.files), e.files.length) return this._onSend(null, e);
}
return this._getXHRPromise(!1, e && e.context);
}
});
}), function(t, e, n, i) {
function r(e, n) {
this.settings = null, this.options = t.extend({}, r.Defaults, n), this.$element = t(e), 
this._handlers = {}, this._plugins = {}, this._supress = {}, this._current = null, 
this._speed = null, this._coordinates = [], this._breakpoint = null, this._width = null, 
this._items = [], this._clones = [], this._mergers = [], this._widths = [], this._invalidated = {}, 
this._pipe = [], this._drag = {
time:null,
target:null,
pointer:null,
stage:{
start:null,
current:null
},
direction:null
}, this._states = {
current:{},
tags:{
initializing:[ "busy" ],
animating:[ "busy" ],
dragging:[ "interacting" ]
}
}, t.each([ "onResize", "onThrottledResize" ], t.proxy(function(e, n) {
this._handlers[n] = t.proxy(this[n], this);
}, this)), t.each(r.Plugins, t.proxy(function(t, e) {
this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this);
}, this)), t.each(r.Workers, t.proxy(function(e, n) {
this._pipe.push({
filter:n.filter,
run:t.proxy(n.run, this)
});
}, this)), this.setup(), this.initialize();
}
r.Defaults = {
items:3,
loop:!1,
center:!1,
rewind:!1,
mouseDrag:!0,
touchDrag:!0,
pullDrag:!0,
freeDrag:!1,
margin:0,
stagePadding:0,
merge:!1,
mergeFit:!0,
autoWidth:!1,
startPosition:0,
rtl:!1,
smartSpeed:250,
fluidSpeed:!1,
dragEndSpeed:!1,
responsive:{},
responsiveRefreshRate:200,
responsiveBaseElement:e,
fallbackEasing:"swing",
info:!1,
nestedItemSelector:!1,
itemElement:"div",
stageElement:"div",
refreshClass:"owl-refresh",
loadedClass:"owl-loaded",
loadingClass:"owl-loading",
rtlClass:"owl-rtl",
responsiveClass:"owl-responsive",
dragClass:"owl-drag",
itemClass:"owl-item",
stageClass:"owl-stage",
stageOuterClass:"owl-stage-outer",
grabClass:"owl-grab"
}, r.Width = {
Default:"default",
Inner:"inner",
Outer:"outer"
}, r.Type = {
Event:"event",
State:"state"
}, r.Plugins = {}, r.Workers = [ {
filter:[ "width", "settings" ],
run:function() {
this._width = this.$element.width();
}
}, {
filter:[ "width", "items", "settings" ],
run:function(t) {
t.current = this._items && this._items[this.relative(this._current)];
}
}, {
filter:[ "items", "settings" ],
run:function() {
this.$stage.children(".cloned").remove();
}
}, {
filter:[ "width", "items", "settings" ],
run:function(t) {
var e = this.settings.margin || "", n = !this.settings.autoWidth, i = this.settings.rtl, r = {
width:"auto",
"margin-left":i ? e :"",
"margin-right":i ? "" :e
};
!n && this.$stage.children().css(r), t.css = r;
}
}, {
filter:[ "width", "items", "settings" ],
run:function(t) {
var e = (this.width() / this.settings.items).toFixed(3) - this.settings.margin, n = null, i = this._items.length, r = !this.settings.autoWidth, o = [];
for (t.items = {
merge:!1,
width:e
}; i--; ) n = this._mergers[i], n = this.settings.mergeFit && Math.min(n, this.settings.items) || n, 
t.items.merge = n > 1 || t.items.merge, o[i] = r ? e * n :this._items[i].width();
this._widths = o;
}
}, {
filter:[ "items", "settings" ],
run:function() {
var e = [], n = this._items, i = this.settings, r = Math.max(2 * i.items, 4), o = 2 * Math.ceil(n.length / 2), s = i.loop && n.length ? i.rewind ? r :Math.max(r, o) :0, a = "", u = "";
for (s /= 2; s--; ) e.push(this.normalize(e.length / 2, !0)), a += n[e[e.length - 1]][0].outerHTML, 
e.push(this.normalize(n.length - 1 - (e.length - 1) / 2, !0)), u = n[e[e.length - 1]][0].outerHTML + u;
this._clones = e, t(a).addClass("cloned").appendTo(this.$stage), t(u).addClass("cloned").prependTo(this.$stage);
}
}, {
filter:[ "width", "items", "settings" ],
run:function() {
for (var t = this.settings.rtl ? 1 :-1, e = this._clones.length + this._items.length, n = -1, i = 0, r = 0, o = []; ++n < e; ) i = o[n - 1] || 0, 
r = this._widths[this.relative(n)] + this.settings.margin, o.push(i + r * t);
this._coordinates = o;
}
}, {
filter:[ "width", "items", "settings" ],
run:function() {
var t = this.settings.stagePadding, e = this._coordinates, n = {
width:Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
"padding-left":t || "",
"padding-right":t || ""
};
this.$stage.css(n);
}
}, {
filter:[ "width", "items", "settings" ],
run:function(t) {
var e = this._coordinates.length, n = !this.settings.autoWidth, i = this.$stage.children();
if (n && t.items.merge) for (;e--; ) t.css.width = this._widths[this.relative(e)], 
i.eq(e).css(t.css); else n && (t.css.width = t.items.width, i.css(t.css));
}
}, {
filter:[ "items" ],
run:function() {
this._coordinates.length < 1 && this.$stage.removeAttr("style");
}
}, {
filter:[ "width", "items", "settings" ],
run:function(t) {
t.current = t.current ? this.$stage.children().index(t.current) :0, t.current = Math.max(this.minimum(), Math.min(this.maximum(), t.current)), 
this.reset(t.current);
}
}, {
filter:[ "position" ],
run:function() {
this.animate(this.coordinates(this._current));
}
}, {
filter:[ "width", "position", "items", "settings" ],
run:function() {
var t, e, n, i, r = this.settings.rtl ? 1 :-1, o = 2 * this.settings.stagePadding, s = this.coordinates(this.current()) + o, a = s + this.width() * r, u = [];
for (n = 0, i = this._coordinates.length; i > n; n++) t = this._coordinates[n - 1] || 0, 
e = Math.abs(this._coordinates[n]) + o * r, (this.op(t, "<=", s) && this.op(t, ">", a) || this.op(e, "<", s) && this.op(e, ">", a)) && u.push(n);
this.$stage.children(".active").removeClass("active"), this.$stage.children(":eq(" + u.join("), :eq(") + ")").addClass("active"), 
this.settings.center && (this.$stage.children(".center").removeClass("center"), 
this.$stage.children().eq(this.current()).addClass("center"));
}
} ], r.prototype.initialize = function() {
if (this.enter("initializing"), this.trigger("initialize"), this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl), 
this.settings.autoWidth && !this.is("pre-loading")) {
var e, n, r;
e = this.$element.find("img"), n = this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector :i, 
r = this.$element.children(n).width(), e.length && 0 >= r && this.preloadAutoWidthImages(e);
}
this.$element.addClass(this.options.loadingClass), this.$stage = t("<" + this.settings.stageElement + ' class="' + this.settings.stageClass + '"/>').wrap('<div class="' + this.settings.stageOuterClass + '"/>'), 
this.$element.append(this.$stage.parent()), this.replace(this.$element.children().not(this.$stage.parent())), 
this.$element.is(":visible") ? this.refresh() :this.invalidate("width"), this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass), 
this.registerEventHandlers(), this.leave("initializing"), this.trigger("initialized");
}, r.prototype.setup = function() {
var e = this.viewport(), n = this.options.responsive, i = -1, r = null;
n ? (t.each(n, function(t) {
e >= t && t > i && (i = Number(t));
}), r = t.extend({}, this.options, n[i]), "function" == typeof r.stagePadding && (r.stagePadding = r.stagePadding()), 
delete r.responsive, r.responsiveClass && this.$element.attr("class", this.$element.attr("class").replace(new RegExp("(" + this.options.responsiveClass + "-)\\S+\\s", "g"), "$1" + i))) :r = t.extend({}, this.options), 
this.trigger("change", {
property:{
name:"settings",
value:r
}
}), this._breakpoint = i, this.settings = r, this.invalidate("settings"), this.trigger("changed", {
property:{
name:"settings",
value:this.settings
}
});
}, r.prototype.optionsLogic = function() {
this.settings.autoWidth && (this.settings.stagePadding = !1, this.settings.merge = !1);
}, r.prototype.prepare = function(e) {
var n = this.trigger("prepare", {
content:e
});
return n.data || (n.data = t("<" + this.settings.itemElement + "/>").addClass(this.options.itemClass).append(e)), 
this.trigger("prepared", {
content:n.data
}), n.data;
}, r.prototype.update = function() {
for (var e = 0, n = this._pipe.length, i = t.proxy(function(t) {
return this[t];
}, this._invalidated), r = {}; n > e; ) (this._invalidated.all || t.grep(this._pipe[e].filter, i).length > 0) && this._pipe[e].run(r), 
e++;
this._invalidated = {}, !this.is("valid") && this.enter("valid");
}, r.prototype.width = function(t) {
switch (t = t || r.Width.Default) {
case r.Width.Inner:
case r.Width.Outer:
return this._width;

default:
return this._width - 2 * this.settings.stagePadding + this.settings.margin;
}
}, r.prototype.refresh = function() {
this.enter("refreshing"), this.trigger("refresh"), this.setup(), this.optionsLogic(), 
this.$element.addClass(this.options.refreshClass), this.update(), this.$element.removeClass(this.options.refreshClass), 
this.leave("refreshing"), this.trigger("refreshed");
}, r.prototype.onThrottledResize = function() {
e.clearTimeout(this.resizeTimer), this.resizeTimer = e.setTimeout(this._handlers.onResize, this.settings.responsiveRefreshRate);
}, r.prototype.onResize = function() {
return this._items.length ? this._width === this.$element.width() ? !1 :this.$element.is(":visible") ? (this.enter("resizing"), 
this.trigger("resize").isDefaultPrevented() ? (this.leave("resizing"), !1) :(this.invalidate("width"), 
this.refresh(), this.leave("resizing"), void this.trigger("resized"))) :!1 :!1;
}, r.prototype.registerEventHandlers = function() {
t.support.transition && this.$stage.on(t.support.transition.end + ".owl.core", t.proxy(this.onTransitionEnd, this)), 
this.settings.responsive !== !1 && this.on(e, "resize", this._handlers.onThrottledResize), 
this.settings.mouseDrag && (this.$element.addClass(this.options.dragClass), this.$stage.on("mousedown.owl.core", t.proxy(this.onDragStart, this)), 
this.$stage.on("dragstart.owl.core selectstart.owl.core", function() {
return !1;
})), this.settings.touchDrag && (this.$stage.on("touchstart.owl.core", t.proxy(this.onDragStart, this)), 
this.$stage.on("touchcancel.owl.core", t.proxy(this.onDragEnd, this)));
}, r.prototype.onDragStart = function(e) {
var i = null;
3 !== e.which && (t.support.transform ? (i = this.$stage.css("transform").replace(/.*\(|\)| /g, "").split(","), 
i = {
x:i[16 === i.length ? 12 :4],
y:i[16 === i.length ? 13 :5]
}) :(i = this.$stage.position(), i = {
x:this.settings.rtl ? i.left + this.$stage.width() - this.width() + this.settings.margin :i.left,
y:i.top
}), this.is("animating") && (t.support.transform ? this.animate(i.x) :this.$stage.stop(), 
this.invalidate("position")), this.$element.toggleClass(this.options.grabClass, "mousedown" === e.type), 
this.speed(0), this._drag.time = new Date().getTime(), this._drag.target = t(e.target), 
this._drag.stage.start = i, this._drag.stage.current = i, this._drag.pointer = this.pointer(e), 
t(n).on("mouseup.owl.core touchend.owl.core", t.proxy(this.onDragEnd, this)), t(n).one("mousemove.owl.core touchmove.owl.core", t.proxy(function(e) {
var i = this.difference(this._drag.pointer, this.pointer(e));
t(n).on("mousemove.owl.core touchmove.owl.core", t.proxy(this.onDragMove, this)), 
Math.abs(i.x) < Math.abs(i.y) && this.is("valid") || (e.preventDefault(), this.enter("dragging"), 
this.trigger("drag"));
}, this)));
}, r.prototype.onDragMove = function(t) {
var e = null, n = null, i = null, r = this.difference(this._drag.pointer, this.pointer(t)), o = this.difference(this._drag.stage.start, r);
this.is("dragging") && (t.preventDefault(), this.settings.loop ? (e = this.coordinates(this.minimum()), 
n = this.coordinates(this.maximum() + 1) - e, o.x = ((o.x - e) % n + n) % n + e) :(e = this.coordinates(this.settings.rtl ? this.maximum() :this.minimum()), 
n = this.coordinates(this.settings.rtl ? this.minimum() :this.maximum()), i = this.settings.pullDrag ? -1 * r.x / 5 :0, 
o.x = Math.max(Math.min(o.x, e + i), n + i)), this._drag.stage.current = o, this.animate(o.x));
}, r.prototype.onDragEnd = function(e) {
var i = this.difference(this._drag.pointer, this.pointer(e)), r = this._drag.stage.current, o = i.x > 0 ^ this.settings.rtl ? "left" :"right";
t(n).off(".owl.core"), this.$element.removeClass(this.options.grabClass), (0 !== i.x && this.is("dragging") || !this.is("valid")) && (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed), 
this.current(this.closest(r.x, 0 !== i.x ? o :this._drag.direction)), this.invalidate("position"), 
this.update(), this._drag.direction = o, (Math.abs(i.x) > 3 || new Date().getTime() - this._drag.time > 300) && this._drag.target.one("click.owl.core", function() {
return !1;
})), this.is("dragging") && (this.leave("dragging"), this.trigger("dragged"));
}, r.prototype.closest = function(e, n) {
var i = -1, r = 30, o = this.width(), s = this.coordinates();
return this.settings.freeDrag || t.each(s, t.proxy(function(t, a) {
return "left" === n && e > a - r && a + r > e ? i = t :"right" === n && e > a - o - r && a - o + r > e ? i = t + 1 :this.op(e, "<", a) && this.op(e, ">", s[t + 1] || a - o) && (i = "left" === n ? t + 1 :t), 
-1 === i;
}, this)), this.settings.loop || (this.op(e, ">", s[this.minimum()]) ? i = e = this.minimum() :this.op(e, "<", s[this.maximum()]) && (i = e = this.maximum())), 
i;
}, r.prototype.animate = function(e) {
var n = this.speed() > 0;
this.is("animating") && this.onTransitionEnd(), n && (this.enter("animating"), this.trigger("translate")), 
t.support.transform3d && t.support.transition ? this.$stage.css({
transform:"translate3d(" + e + "px,0px,0px)",
transition:this.speed() / 1e3 + "s"
}) :n ? this.$stage.animate({
left:e + "px"
}, this.speed(), this.settings.fallbackEasing, t.proxy(this.onTransitionEnd, this)) :this.$stage.css({
left:e + "px"
});
}, r.prototype.is = function(t) {
return this._states.current[t] && this._states.current[t] > 0;
}, r.prototype.current = function(t) {
if (t === i) return this._current;
if (0 === this._items.length) return i;
if (t = this.normalize(t), this._current !== t) {
var e = this.trigger("change", {
property:{
name:"position",
value:t
}
});
e.data !== i && (t = this.normalize(e.data)), this._current = t, this.invalidate("position"), 
this.trigger("changed", {
property:{
name:"position",
value:this._current
}
});
}
return this._current;
}, r.prototype.invalidate = function(e) {
return "string" === t.type(e) && (this._invalidated[e] = !0, this.is("valid") && this.leave("valid")), 
t.map(this._invalidated, function(t, e) {
return e;
});
}, r.prototype.reset = function(t) {
t = this.normalize(t), t !== i && (this._speed = 0, this._current = t, this.suppress([ "translate", "translated" ]), 
this.animate(this.coordinates(t)), this.release([ "translate", "translated" ]));
}, r.prototype.normalize = function(t, e) {
var n = this._items.length, r = e ? 0 :this._clones.length;
return !this.isNumeric(t) || 1 > n ? t = i :(0 > t || t >= n + r) && (t = ((t - r / 2) % n + n) % n + r / 2), 
t;
}, r.prototype.relative = function(t) {
return t -= this._clones.length / 2, this.normalize(t, !0);
}, r.prototype.maximum = function(t) {
var e, n, i, r = this.settings, o = this._coordinates.length;
if (r.loop) o = this._clones.length / 2 + this._items.length - 1; else if (r.autoWidth || r.merge) {
for (e = this._items.length, n = this._items[--e].width(), i = this.$element.width(); e-- && (n += this._items[e].width() + this.settings.margin, 
!(n > i)); ) ;
o = e + 1;
} else o = r.center ? this._items.length - 1 :this._items.length - r.items;
return t && (o -= this._clones.length / 2), Math.max(o, 0);
}, r.prototype.minimum = function(t) {
return t ? 0 :this._clones.length / 2;
}, r.prototype.items = function(t) {
return t === i ? this._items.slice() :(t = this.normalize(t, !0), this._items[t]);
}, r.prototype.mergers = function(t) {
return t === i ? this._mergers.slice() :(t = this.normalize(t, !0), this._mergers[t]);
}, r.prototype.clones = function(e) {
var n = this._clones.length / 2, r = n + this._items.length, o = function(t) {
return t % 2 === 0 ? r + t / 2 :n - (t + 1) / 2;
};
return e === i ? t.map(this._clones, function(t, e) {
return o(e);
}) :t.map(this._clones, function(t, n) {
return t === e ? o(n) :null;
});
}, r.prototype.speed = function(t) {
return t !== i && (this._speed = t), this._speed;
}, r.prototype.coordinates = function(e) {
var n, r = 1, o = e - 1;
return e === i ? t.map(this._coordinates, t.proxy(function(t, e) {
return this.coordinates(e);
}, this)) :(this.settings.center ? (this.settings.rtl && (r = -1, o = e + 1), n = this._coordinates[e], 
n += (this.width() - n + (this._coordinates[o] || 0)) / 2 * r) :n = this._coordinates[o] || 0, 
n = Math.ceil(n));
}, r.prototype.duration = function(t, e, n) {
return 0 === n ? 0 :Math.min(Math.max(Math.abs(e - t), 1), 6) * Math.abs(n || this.settings.smartSpeed);
}, r.prototype.to = function(t, e) {
var n = this.current(), i = null, r = t - this.relative(n), o = (r > 0) - (0 > r), s = this._items.length, a = this.minimum(), u = this.maximum();
this.settings.loop ? (!this.settings.rewind && Math.abs(r) > s / 2 && (r += -1 * o * s), 
t = n + r, i = ((t - a) % s + s) % s + a, i !== t && u >= i - r && i - r > 0 && (n = i - r, 
t = i, this.reset(n))) :this.settings.rewind ? (u += 1, t = (t % u + u) % u) :t = Math.max(a, Math.min(u, t)), 
this.speed(this.duration(n, t, e)), this.current(t), this.$element.is(":visible") && this.update();
}, r.prototype.next = function(t) {
t = t || !1, this.to(this.relative(this.current()) + 1, t);
}, r.prototype.prev = function(t) {
t = t || !1, this.to(this.relative(this.current()) - 1, t);
}, r.prototype.onTransitionEnd = function(t) {
return t !== i && (t.stopPropagation(), (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0)) ? !1 :(this.leave("animating"), 
void this.trigger("translated"));
}, r.prototype.viewport = function() {
var i;
if (this.options.responsiveBaseElement !== e) i = t(this.options.responsiveBaseElement).width(); else if (e.innerWidth) i = e.innerWidth; else {
if (!n.documentElement || !n.documentElement.clientWidth) throw "Can not detect viewport width.";
i = n.documentElement.clientWidth;
}
return i;
}, r.prototype.replace = function(e) {
this.$stage.empty(), this._items = [], e && (e = e instanceof jQuery ? e :t(e)), 
this.settings.nestedItemSelector && (e = e.find("." + this.settings.nestedItemSelector)), 
e.filter(function() {
return 1 === this.nodeType;
}).each(t.proxy(function(t, e) {
e = this.prepare(e), this.$stage.append(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1);
}, this)), this.reset(this.isNumeric(this.settings.startPosition) ? this.settings.startPosition :0), 
this.invalidate("items");
}, r.prototype.add = function(e, n) {
var r = this.relative(this._current);
n = n === i ? this._items.length :this.normalize(n, !0), e = e instanceof jQuery ? e :t(e), 
this.trigger("add", {
content:e,
position:n
}), e = this.prepare(e), 0 === this._items.length || n === this._items.length ? (0 === this._items.length && this.$stage.append(e), 
0 !== this._items.length && this._items[n - 1].after(e), this._items.push(e), this._mergers.push(1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)) :(this._items[n].before(e), 
this._items.splice(n, 0, e), this._mergers.splice(n, 0, 1 * e.find("[data-merge]").addBack("[data-merge]").attr("data-merge") || 1)), 
this._items[r] && this.reset(this._items[r].index()), this.invalidate("items"), 
this.trigger("added", {
content:e,
position:n
});
}, r.prototype.remove = function(t) {
t = this.normalize(t, !0), t !== i && (this.trigger("remove", {
content:this._items[t],
position:t
}), this._items[t].remove(), this._items.splice(t, 1), this._mergers.splice(t, 1), 
this.invalidate("items"), this.trigger("removed", {
content:null,
position:t
}));
}, r.prototype.preloadAutoWidthImages = function(e) {
e.each(t.proxy(function(e, n) {
this.enter("pre-loading"), n = t(n), t(new Image()).one("load", t.proxy(function(t) {
n.attr("src", t.target.src), n.css("opacity", 1), this.leave("pre-loading"), !this.is("pre-loading") && !this.is("initializing") && this.refresh();
}, this)).attr("src", n.attr("src") || n.attr("data-src") || n.attr("data-src-retina"));
}, this));
}, r.prototype.destroy = function() {
this.$element.off(".owl.core"), this.$stage.off(".owl.core"), t(n).off(".owl.core"), 
this.settings.responsive !== !1 && (e.clearTimeout(this.resizeTimer), this.off(e, "resize", this._handlers.onThrottledResize));
for (var i in this._plugins) this._plugins[i].destroy();
this.$stage.children(".cloned").remove(), this.$stage.unwrap(), this.$stage.children().contents().unwrap(), 
this.$stage.children().unwrap(), this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class", this.$element.attr("class").replace(new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"), "")).removeData("owl.carousel");
}, r.prototype.op = function(t, e, n) {
var i = this.settings.rtl;
switch (e) {
case "<":
return i ? t > n :n > t;

case ">":
return i ? n > t :t > n;

case ">=":
return i ? n >= t :t >= n;

case "<=":
return i ? t >= n :n >= t;
}
}, r.prototype.on = function(t, e, n, i) {
t.addEventListener ? t.addEventListener(e, n, i) :t.attachEvent && t.attachEvent("on" + e, n);
}, r.prototype.off = function(t, e, n, i) {
t.removeEventListener ? t.removeEventListener(e, n, i) :t.detachEvent && t.detachEvent("on" + e, n);
}, r.prototype.trigger = function(e, n, i) {
var o = {
item:{
count:this._items.length,
index:this.current()
}
}, s = t.camelCase(t.grep([ "on", e, i ], function(t) {
return t;
}).join("-").toLowerCase()), a = t.Event([ e, "owl", i || "carousel" ].join(".").toLowerCase(), t.extend({
relatedTarget:this
}, o, n));
return this._supress[e] || (t.each(this._plugins, function(t, e) {
e.onTrigger && e.onTrigger(a);
}), this.register({
type:r.Type.Event,
name:e
}), this.$element.trigger(a), this.settings && "function" == typeof this.settings[s] && this.settings[s].call(this, a)), 
a;
}, r.prototype.enter = function(e) {
t.each([ e ].concat(this._states.tags[e] || []), t.proxy(function(t, e) {
this._states.current[e] === i && (this._states.current[e] = 0), this._states.current[e]++;
}, this));
}, r.prototype.leave = function(e) {
t.each([ e ].concat(this._states.tags[e] || []), t.proxy(function(t, e) {
this._states.current[e]--;
}, this));
}, r.prototype.register = function(e) {
if (e.type === r.Type.Event) {
if (t.event.special[e.name] || (t.event.special[e.name] = {}), !t.event.special[e.name].owl) {
var n = t.event.special[e.name]._default;
t.event.special[e.name]._default = function(t) {
return !n || !n.apply || t.namespace && -1 !== t.namespace.indexOf("owl") ? t.namespace && t.namespace.indexOf("owl") > -1 :n.apply(this, arguments);
}, t.event.special[e.name].owl = !0;
}
} else e.type === r.Type.State && (this._states.tags[e.name] = this._states.tags[e.name] ? this._states.tags[e.name].concat(e.tags) :e.tags, 
this._states.tags[e.name] = t.grep(this._states.tags[e.name], t.proxy(function(n, i) {
return t.inArray(n, this._states.tags[e.name]) === i;
}, this)));
}, r.prototype.suppress = function(e) {
t.each(e, t.proxy(function(t, e) {
this._supress[e] = !0;
}, this));
}, r.prototype.release = function(e) {
t.each(e, t.proxy(function(t, e) {
delete this._supress[e];
}, this));
}, r.prototype.pointer = function(t) {
var n = {
x:null,
y:null
};
return t = t.originalEvent || t || e.event, t = t.touches && t.touches.length ? t.touches[0] :t.changedTouches && t.changedTouches.length ? t.changedTouches[0] :t, 
t.pageX ? (n.x = t.pageX, n.y = t.pageY) :(n.x = t.clientX, n.y = t.clientY), n;
}, r.prototype.isNumeric = function(t) {
return !isNaN(parseFloat(t));
}, r.prototype.difference = function(t, e) {
return {
x:t.x - e.x,
y:t.y - e.y
};
}, t.fn.owlCarousel = function(e) {
var n = Array.prototype.slice.call(arguments, 1);
return this.each(function() {
var i = t(this), o = i.data("owl.carousel");
o || (o = new r(this, "object" == typeof e && e), i.data("owl.carousel", o), t.each([ "next", "prev", "to", "destroy", "refresh", "replace", "add", "remove" ], function(e, n) {
o.register({
type:r.Type.Event,
name:n
}), o.$element.on(n + ".owl.carousel.core", t.proxy(function(t) {
t.namespace && t.relatedTarget !== this && (this.suppress([ n ]), o[n].apply(this, [].slice.call(arguments, 1)), 
this.release([ n ]));
}, o));
})), "string" == typeof e && "_" !== e.charAt(0) && o[e].apply(o, n);
});
}, t.fn.owlCarousel.Constructor = r;
}(window.Zepto || window.jQuery, window, document), function(t, e) {
var n = function(e) {
this._core = e, this._interval = null, this._visible = null, this._handlers = {
"initialized.owl.carousel":t.proxy(function(t) {
t.namespace && this._core.settings.autoRefresh && this.watch();
}, this)
}, this._core.options = t.extend({}, n.Defaults, this._core.options), this._core.$element.on(this._handlers);
};
n.Defaults = {
autoRefresh:!0,
autoRefreshInterval:500
}, n.prototype.watch = function() {
this._interval || (this._visible = this._core.$element.is(":visible"), this._interval = e.setInterval(t.proxy(this.refresh, this), this._core.settings.autoRefreshInterval));
}, n.prototype.refresh = function() {
this._core.$element.is(":visible") !== this._visible && (this._visible = !this._visible, 
this._core.$element.toggleClass("owl-hidden", !this._visible), this._visible && this._core.invalidate("width") && this._core.refresh());
}, n.prototype.destroy = function() {
var t, n;
e.clearInterval(this._interval);
for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
for (n in Object.getOwnPropertyNames(this)) "function" != typeof this[n] && (this[n] = null);
}, t.fn.owlCarousel.Constructor.Plugins.AutoRefresh = n;
}(window.Zepto || window.jQuery, window, document), function(t, e, n, i) {
var r = function(e) {
this._core = e, this._loaded = [], this._handlers = {
"initialized.owl.carousel change.owl.carousel resized.owl.carousel":t.proxy(function(e) {
if (e.namespace && this._core.settings && this._core.settings.lazyLoad && (e.property && "position" == e.property.name || "initialized" == e.type)) for (var n = this._core.settings, r = n.center && Math.ceil(n.items / 2) || n.items, o = n.center && -1 * r || 0, s = (e.property && e.property.value !== i ? e.property.value :this._core.current()) + o, a = this._core.clones().length, u = t.proxy(function(t, e) {
this.load(e);
}, this); o++ < r; ) this.load(a / 2 + this._core.relative(s)), a && t.each(this._core.clones(this._core.relative(s)), u), 
s++;
}, this)
}, this._core.options = t.extend({}, r.Defaults, this._core.options), this._core.$element.on(this._handlers);
};
r.Defaults = {
lazyLoad:!1
}, r.prototype.load = function(n) {
var i = this._core.$stage.children().eq(n), r = i && i.find(".owl-lazy");
!r || t.inArray(i.get(0), this._loaded) > -1 || (r.each(t.proxy(function(n, i) {
var r, o = t(i), s = e.devicePixelRatio > 1 && o.attr("data-src-retina") || o.attr("data-src");
this._core.trigger("load", {
element:o,
url:s
}, "lazy"), o.is("img") ? o.one("load.owl.lazy", t.proxy(function() {
o.css("opacity", 1), this._core.trigger("loaded", {
element:o,
url:s
}, "lazy");
}, this)).attr("src", s) :(r = new Image(), r.onload = t.proxy(function() {
o.css({
"background-image":"url(" + s + ")",
opacity:"1"
}), this._core.trigger("loaded", {
element:o,
url:s
}, "lazy");
}, this), r.src = s);
}, this)), this._loaded.push(i.get(0)));
}, r.prototype.destroy = function() {
var t, e;
for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
}, t.fn.owlCarousel.Constructor.Plugins.Lazy = r;
}(window.Zepto || window.jQuery, window, document), function(t) {
var e = function(n) {
this._core = n, this._handlers = {
"initialized.owl.carousel refreshed.owl.carousel":t.proxy(function(t) {
t.namespace && this._core.settings.autoHeight && this.update();
}, this),
"changed.owl.carousel":t.proxy(function(t) {
t.namespace && this._core.settings.autoHeight && "position" == t.property.name && this.update();
}, this),
"loaded.owl.lazy":t.proxy(function(t) {
t.namespace && this._core.settings.autoHeight && t.element.closest("." + this._core.settings.itemClass).index() === this._core.current() && this.update();
}, this)
}, this._core.options = t.extend({}, e.Defaults, this._core.options), this._core.$element.on(this._handlers);
};
e.Defaults = {
autoHeight:!1,
autoHeightClass:"owl-height"
}, e.prototype.update = function() {
var e = this._core._current, n = e + this._core.settings.items, i = this._core.$stage.children().toArray().slice(e, n), r = [], o = 0;
t.each(i, function(e, n) {
r.push(t(n).height());
}), o = Math.max.apply(null, r), this._core.$stage.parent().height(o).addClass(this._core.settings.autoHeightClass);
}, e.prototype.destroy = function() {
var t, e;
for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
}, t.fn.owlCarousel.Constructor.Plugins.AutoHeight = e;
}(window.Zepto || window.jQuery, window, document), function(t, e, n) {
var i = function(e) {
this._core = e, this._videos = {}, this._playing = null, this._handlers = {
"initialized.owl.carousel":t.proxy(function(t) {
t.namespace && this._core.register({
type:"state",
name:"playing",
tags:[ "interacting" ]
});
}, this),
"resize.owl.carousel":t.proxy(function(t) {
t.namespace && this._core.settings.video && this.isInFullScreen() && t.preventDefault();
}, this),
"refreshed.owl.carousel":t.proxy(function(t) {
t.namespace && this._core.is("resizing") && this._core.$stage.find(".cloned .owl-video-frame").remove();
}, this),
"changed.owl.carousel":t.proxy(function(t) {
t.namespace && "position" === t.property.name && this._playing && this.stop();
}, this),
"prepared.owl.carousel":t.proxy(function(e) {
if (e.namespace) {
var n = t(e.content).find(".owl-video");
n.length && (n.css("display", "none"), this.fetch(n, t(e.content)));
}
}, this)
}, this._core.options = t.extend({}, i.Defaults, this._core.options), this._core.$element.on(this._handlers), 
this._core.$element.on("click.owl.video", ".owl-video-play-icon", t.proxy(function(t) {
this.play(t);
}, this));
};
i.Defaults = {
video:!1,
videoHeight:!1,
videoWidth:!1
}, i.prototype.fetch = function(t, e) {
var n = function() {
return t.attr("data-vimeo-id") ? "vimeo" :t.attr("data-vzaar-id") ? "vzaar" :"youtube";
}(), i = t.attr("data-vimeo-id") || t.attr("data-youtube-id") || t.attr("data-vzaar-id"), r = t.attr("data-width") || this._core.settings.videoWidth, o = t.attr("data-height") || this._core.settings.videoHeight, s = t.attr("href");
if (!s) throw new Error("Missing video URL.");
if (i = s.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/), 
i[3].indexOf("youtu") > -1) n = "youtube"; else if (i[3].indexOf("vimeo") > -1) n = "vimeo"; else {
if (!(i[3].indexOf("vzaar") > -1)) throw new Error("Video URL not supported.");
n = "vzaar";
}
i = i[6], this._videos[s] = {
type:n,
id:i,
width:r,
height:o
}, e.attr("data-video", s), this.thumbnail(t, this._videos[s]);
}, i.prototype.thumbnail = function(e, n) {
var i, r, o, s = n.width && n.height ? 'style="width:' + n.width + "px;height:" + n.height + 'px;"' :"", a = e.find("img"), u = "src", l = "", c = this._core.settings, h = function(t) {
r = '<div class="owl-video-play-icon"></div>', i = c.lazyLoad ? '<div class="owl-video-tn ' + l + '" ' + u + '="' + t + '"></div>' :'<div class="owl-video-tn" style="opacity:1;background-image:url(' + t + ')"></div>', 
e.after(i), e.after(r);
};
return e.wrap('<div class="owl-video-wrapper"' + s + "></div>"), this._core.settings.lazyLoad && (u = "data-src", 
l = "owl-lazy"), a.length ? (h(a.attr(u)), a.remove(), !1) :void ("youtube" === n.type ? (o = "//img.youtube.com/vi/" + n.id + "/hqdefault.jpg", 
h(o)) :"vimeo" === n.type ? t.ajax({
type:"GET",
url:"//vimeo.com/api/v2/video/" + n.id + ".json",
jsonp:"callback",
dataType:"jsonp",
success:function(t) {
o = t[0].thumbnail_large, h(o);
}
}) :"vzaar" === n.type && t.ajax({
type:"GET",
url:"//vzaar.com/api/videos/" + n.id + ".json",
jsonp:"callback",
dataType:"jsonp",
success:function(t) {
o = t.framegrab_url, h(o);
}
}));
}, i.prototype.stop = function() {
this._core.trigger("stop", null, "video"), this._playing.find(".owl-video-frame").remove(), 
this._playing.removeClass("owl-video-playing"), this._playing = null, this._core.leave("playing"), 
this._core.trigger("stopped", null, "video");
}, i.prototype.play = function(e) {
var n, i = t(e.target), r = i.closest("." + this._core.settings.itemClass), o = this._videos[r.attr("data-video")], s = o.width || "100%", a = o.height || this._core.$stage.height();
this._playing || (this._core.enter("playing"), this._core.trigger("play", null, "video"), 
r = this._core.items(this._core.relative(r.index())), this._core.reset(r.index()), 
"youtube" === o.type ? n = '<iframe width="' + s + '" height="' + a + '" src="//www.youtube.com/embed/' + o.id + "?autoplay=1&v=" + o.id + '" frameborder="0" allowfullscreen></iframe>' :"vimeo" === o.type ? n = '<iframe src="//player.vimeo.com/video/' + o.id + '?autoplay=1" width="' + s + '" height="' + a + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>' :"vzaar" === o.type && (n = '<iframe frameborder="0"height="' + a + '"width="' + s + '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' + o.id + '/player?autoplay=true"></iframe>'), 
t('<div class="owl-video-frame">' + n + "</div>").insertAfter(r.find(".owl-video")), 
this._playing = r.addClass("owl-video-playing"));
}, i.prototype.isInFullScreen = function() {
var e = n.fullscreenElement || n.mozFullScreenElement || n.webkitFullscreenElement;
return e && t(e).parent().hasClass("owl-video-frame");
}, i.prototype.destroy = function() {
var t, e;
this._core.$element.off("click.owl.video");
for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
}, t.fn.owlCarousel.Constructor.Plugins.Video = i;
}(window.Zepto || window.jQuery, window, document), function(t, e, n, i) {
var r = function(e) {
this.core = e, this.core.options = t.extend({}, r.Defaults, this.core.options), 
this.swapping = !0, this.previous = i, this.next = i, this.handlers = {
"change.owl.carousel":t.proxy(function(t) {
t.namespace && "position" == t.property.name && (this.previous = this.core.current(), 
this.next = t.property.value);
}, this),
"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":t.proxy(function(t) {
t.namespace && (this.swapping = "translated" == t.type);
}, this),
"translate.owl.carousel":t.proxy(function(t) {
t.namespace && this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap();
}, this)
}, this.core.$element.on(this.handlers);
};
r.Defaults = {
animateOut:!1,
animateIn:!1
}, r.prototype.swap = function() {
if (1 === this.core.settings.items && t.support.animation && t.support.transition) {
this.core.speed(0);
var e, n = t.proxy(this.clear, this), i = this.core.$stage.children().eq(this.previous), r = this.core.$stage.children().eq(this.next), o = this.core.settings.animateIn, s = this.core.settings.animateOut;
this.core.current() !== this.previous && (s && (e = this.core.coordinates(this.previous) - this.core.coordinates(this.next), 
i.one(t.support.animation.end, n).css({
left:e + "px"
}).addClass("animated owl-animated-out").addClass(s)), o && r.one(t.support.animation.end, n).addClass("animated owl-animated-in").addClass(o));
}
}, r.prototype.clear = function(e) {
t(e.target).css({
left:""
}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut), 
this.core.onTransitionEnd();
}, r.prototype.destroy = function() {
var t, e;
for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
}, t.fn.owlCarousel.Constructor.Plugins.Animate = r;
}(window.Zepto || window.jQuery, window, document), function(t, e, n) {
var i = function(e) {
this._core = e, this._timeout = null, this._paused = !1, this._handlers = {
"changed.owl.carousel":t.proxy(function(t) {
t.namespace && "settings" === t.property.name ? this._core.settings.autoplay ? this.play() :this.stop() :t.namespace && "position" === t.property.name && this._core.settings.autoplay && this._setAutoPlayInterval();
}, this),
"initialized.owl.carousel":t.proxy(function(t) {
t.namespace && this._core.settings.autoplay && this.play();
}, this),
"play.owl.autoplay":t.proxy(function(t, e, n) {
t.namespace && this.play(e, n);
}, this),
"stop.owl.autoplay":t.proxy(function(t) {
t.namespace && this.stop();
}, this),
"mouseover.owl.autoplay":t.proxy(function() {
this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
}, this),
"mouseleave.owl.autoplay":t.proxy(function() {
this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.play();
}, this),
"touchstart.owl.core":t.proxy(function() {
this._core.settings.autoplayHoverPause && this._core.is("rotating") && this.pause();
}, this),
"touchend.owl.core":t.proxy(function() {
this._core.settings.autoplayHoverPause && this.play();
}, this)
}, this._core.$element.on(this._handlers), this._core.options = t.extend({}, i.Defaults, this._core.options);
};
i.Defaults = {
autoplay:!1,
autoplayTimeout:5e3,
autoplayHoverPause:!1,
autoplaySpeed:!1
}, i.prototype.play = function() {
this._paused = !1, this._core.is("rotating") || (this._core.enter("rotating"), this._setAutoPlayInterval());
}, i.prototype._getNextTimeout = function(i, r) {
return this._timeout && e.clearTimeout(this._timeout), e.setTimeout(t.proxy(function() {
this._paused || this._core.is("busy") || this._core.is("interacting") || n.hidden || this._core.next(r || this._core.settings.autoplaySpeed);
}, this), i || this._core.settings.autoplayTimeout);
}, i.prototype._setAutoPlayInterval = function() {
this._timeout = this._getNextTimeout();
}, i.prototype.stop = function() {
this._core.is("rotating") && (e.clearTimeout(this._timeout), this._core.leave("rotating"));
}, i.prototype.pause = function() {
this._core.is("rotating") && (this._paused = !0);
}, i.prototype.destroy = function() {
var t, e;
this.stop();
for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
for (e in Object.getOwnPropertyNames(this)) "function" != typeof this[e] && (this[e] = null);
}, t.fn.owlCarousel.Constructor.Plugins.autoplay = i;
}(window.Zepto || window.jQuery, window, document), function(t) {
"use strict";
var e = function(n) {
this._core = n, this._initialized = !1, this._pages = [], this._controls = {}, this._templates = [], 
this.$element = this._core.$element, this._overrides = {
next:this._core.next,
prev:this._core.prev,
to:this._core.to
}, this._handlers = {
"prepared.owl.carousel":t.proxy(function(e) {
e.namespace && this._core.settings.dotsData && this._templates.push('<div class="' + this._core.settings.dotClass + '">' + t(e.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot") + "</div>");
}, this),
"added.owl.carousel":t.proxy(function(t) {
t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 0, this._templates.pop());
}, this),
"remove.owl.carousel":t.proxy(function(t) {
t.namespace && this._core.settings.dotsData && this._templates.splice(t.position, 1);
}, this),
"changed.owl.carousel":t.proxy(function(t) {
t.namespace && "position" == t.property.name && this.draw();
}, this),
"initialized.owl.carousel":t.proxy(function(t) {
t.namespace && !this._initialized && (this._core.trigger("initialize", null, "navigation"), 
this.initialize(), this.update(), this.draw(), this._initialized = !0, this._core.trigger("initialized", null, "navigation"));
}, this),
"refreshed.owl.carousel":t.proxy(function(t) {
t.namespace && this._initialized && (this._core.trigger("refresh", null, "navigation"), 
this.update(), this.draw(), this._core.trigger("refreshed", null, "navigation"));
}, this)
}, this._core.options = t.extend({}, e.Defaults, this._core.options), this.$element.on(this._handlers);
};
e.Defaults = {
nav:!1,
navText:[ "prev", "next" ],
navSpeed:!1,
navElement:"div",
navContainer:!1,
navContainerClass:"owl-nav",
navClass:[ "owl-prev", "owl-next" ],
slideBy:1,
dotClass:"owl-dot",
dotsClass:"owl-dots",
dots:!0,
dotsEach:!1,
dotsData:!1,
dotsSpeed:!1,
dotsContainer:!1
}, e.prototype.initialize = function() {
var e, n = this._core.settings;
this._controls.$relative = (n.navContainer ? t(n.navContainer) :t("<div>").addClass(n.navContainerClass).appendTo(this.$element)).addClass("disabled"), 
this._controls.$previous = t("<" + n.navElement + ">").addClass(n.navClass[0]).html(n.navText[0]).prependTo(this._controls.$relative).on("click", t.proxy(function() {
this.prev(n.navSpeed);
}, this)), this._controls.$next = t("<" + n.navElement + ">").addClass(n.navClass[1]).html(n.navText[1]).appendTo(this._controls.$relative).on("click", t.proxy(function() {
this.next(n.navSpeed);
}, this)), n.dotsData || (this._templates = [ t("<div>").addClass(n.dotClass).append(t("<span>")).prop("outerHTML") ]), 
this._controls.$absolute = (n.dotsContainer ? t(n.dotsContainer) :t("<div>").addClass(n.dotsClass).appendTo(this.$element)).addClass("disabled"), 
this._controls.$absolute.on("click", "div", t.proxy(function(e) {
var i = t(e.target).parent().is(this._controls.$absolute) ? t(e.target).index() :t(e.target).parent().index();
e.preventDefault(), this.to(i, n.dotsSpeed);
}, this));
for (e in this._overrides) this._core[e] = t.proxy(this[e], this);
}, e.prototype.destroy = function() {
var t, e, n, i;
for (t in this._handlers) this.$element.off(t, this._handlers[t]);
for (e in this._controls) this._controls[e].remove();
for (i in this.overides) this._core[i] = this._overrides[i];
for (n in Object.getOwnPropertyNames(this)) "function" != typeof this[n] && (this[n] = null);
}, e.prototype.update = function() {
var t, e, n, i = this._core.clones().length / 2, r = i + this._core.items().length, o = this._core.maximum(!0), s = this._core.settings, a = s.center || s.autoWidth || s.dotsData ? 1 :s.dotsEach || s.items;
if ("page" !== s.slideBy && (s.slideBy = Math.min(s.slideBy, s.items)), s.dots || "page" == s.slideBy) for (this._pages = [], 
t = i, e = 0, n = 0; r > t; t++) {
if (e >= a || 0 === e) {
if (this._pages.push({
start:Math.min(o, t - i),
end:t - i + a - 1
}), Math.min(o, t - i) === o) break;
e = 0, ++n;
}
e += this._core.mergers(this._core.relative(t));
}
}, e.prototype.draw = function() {
var e, n = this._core.settings, i = this._core.items().length <= n.items, r = this._core.relative(this._core.current()), o = n.loop || n.rewind;
this._controls.$relative.toggleClass("disabled", !n.nav || i), n.nav && (this._controls.$previous.toggleClass("disabled", !o && r <= this._core.minimum(!0)), 
this._controls.$next.toggleClass("disabled", !o && r >= this._core.maximum(!0))), 
this._controls.$absolute.toggleClass("disabled", !n.dots || i), n.dots && (e = this._pages.length - this._controls.$absolute.children().length, 
n.dotsData && 0 !== e ? this._controls.$absolute.html(this._templates.join("")) :e > 0 ? this._controls.$absolute.append(new Array(e + 1).join(this._templates[0])) :0 > e && this._controls.$absolute.children().slice(e).remove(), 
this._controls.$absolute.find(".active").removeClass("active"), this._controls.$absolute.children().eq(t.inArray(this.current(), this._pages)).addClass("active"));
}, e.prototype.onTrigger = function(e) {
var n = this._core.settings;
e.page = {
index:t.inArray(this.current(), this._pages),
count:this._pages.length,
size:n && (n.center || n.autoWidth || n.dotsData ? 1 :n.dotsEach || n.items)
};
}, e.prototype.current = function() {
var e = this._core.relative(this._core.current());
return t.grep(this._pages, t.proxy(function(t) {
return t.start <= e && t.end >= e;
}, this)).pop();
}, e.prototype.getPosition = function(e) {
var n, i, r = this._core.settings;
return "page" == r.slideBy ? (n = t.inArray(this.current(), this._pages), i = this._pages.length, 
e ? ++n :--n, n = this._pages[(n % i + i) % i].start) :(n = this._core.relative(this._core.current()), 
i = this._core.items().length, e ? n += r.slideBy :n -= r.slideBy), n;
}, e.prototype.next = function(e) {
t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e);
}, e.prototype.prev = function(e) {
t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e);
}, e.prototype.to = function(e, n, i) {
var r;
!i && this._pages.length ? (r = this._pages.length, t.proxy(this._overrides.to, this._core)(this._pages[(e % r + r) % r].start, n)) :t.proxy(this._overrides.to, this._core)(e, n);
}, t.fn.owlCarousel.Constructor.Plugins.Navigation = e;
}(window.Zepto || window.jQuery, window, document), function(t, e, n, i) {
"use strict";
var r = function(n) {
this._core = n, this._hashes = {}, this.$element = this._core.$element, this._handlers = {
"initialized.owl.carousel":t.proxy(function(n) {
n.namespace && "URLHash" === this._core.settings.startPosition && t(e).trigger("hashchange.owl.navigation");
}, this),
"prepared.owl.carousel":t.proxy(function(e) {
if (e.namespace) {
var n = t(e.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");
if (!n) return;
this._hashes[n] = e.content;
}
}, this),
"changed.owl.carousel":t.proxy(function(n) {
if (n.namespace && "position" === n.property.name) {
var i = this._core.items(this._core.relative(this._core.current())), r = t.map(this._hashes, function(t, e) {
return t === i ? e :null;
}).join();
if (!r || e.location.hash.slice(1) === r) return;
e.location.hash = r;
}
}, this)
}, this._core.options = t.extend({}, r.Defaults, this._core.options), this.$element.on(this._handlers), 
t(e).on("hashchange.owl.navigation", t.proxy(function() {
var t = e.location.hash.substring(1), n = this._core.$stage.children(), r = this._hashes[t] && n.index(this._hashes[t]);
r !== i && r !== this._core.current() && this._core.to(this._core.relative(r), !1, !0);
}, this));
};
r.Defaults = {
URLhashListener:!1
}, r.prototype.destroy = function() {
var n, i;
t(e).off("hashchange.owl.navigation");
for (n in this._handlers) this._core.$element.off(n, this._handlers[n]);
for (i in Object.getOwnPropertyNames(this)) "function" != typeof this[i] && (this[i] = null);
}, t.fn.owlCarousel.Constructor.Plugins.Hash = r;
}(window.Zepto || window.jQuery, window, document), function(t, e, n, i) {
function r(e, n) {
var r = !1, o = e.charAt(0).toUpperCase() + e.slice(1);
return t.each((e + " " + a.join(o + " ") + o).split(" "), function(t, e) {
return s[e] !== i ? (r = n ? e :!0, !1) :void 0;
}), r;
}
function o(t) {
return r(t, !0);
}
var s = t("<support>").get(0).style, a = "Webkit Moz O ms".split(" "), u = {
transition:{
end:{
WebkitTransition:"webkitTransitionEnd",
MozTransition:"transitionend",
OTransition:"oTransitionEnd",
transition:"transitionend"
}
},
animation:{
end:{
WebkitAnimation:"webkitAnimationEnd",
MozAnimation:"animationend",
OAnimation:"oAnimationEnd",
animation:"animationend"
}
}
}, l = {
csstransforms:function() {
return !!r("transform");
},
csstransforms3d:function() {
return !!r("perspective");
},
csstransitions:function() {
return !!r("transition");
},
cssanimations:function() {
return !!r("animation");
}
};
l.csstransitions() && (t.support.transition = new String(o("transition")), t.support.transition.end = u.transition.end[t.support.transition]), 
l.cssanimations() && (t.support.animation = new String(o("animation")), t.support.animation.end = u.animation.end[t.support.animation]), 
l.csstransforms() && (t.support.transform = new String(o("transform")), t.support.transform3d = l.csstransforms3d());
}(window.Zepto || window.jQuery, window, document), function() {
var t, e, n, i, r, o, s, a, u, l, c, h, d, f, p, m, g, v, y, _, b, w = [].slice, x = [].indexOf || function(t) {
for (var e = 0, n = this.length; n > e; e++) if (e in this && this[e] === t) return e;
return -1;
};
$.payment = {}, $.payment.fn = {}, $.fn.payment = function() {
var t, e;
return e = arguments[0], t = 2 <= arguments.length ? w.call(arguments, 1) :[], $.payment.fn[e].apply(this, t);
}, i = /(\d{1,4})/g, $.payment.cards = n = [ {
type:"visaelectron",
pattern:/^4(026|17500|405|508|844|91[37])/,
format:i,
length:[ 16 ],
cvcLength:[ 3 ],
luhn:!0
}, {
type:"maestro",
pattern:/^(5(018|0[23]|[68])|6(39|7))/,
format:i,
length:[ 12, 13, 14, 15, 16, 17, 18, 19 ],
cvcLength:[ 3 ],
luhn:!0
}, {
type:"forbrugsforeningen",
pattern:/^600/,
format:i,
length:[ 16 ],
cvcLength:[ 3 ],
luhn:!0
}, {
type:"dankort",
pattern:/^5019/,
format:i,
length:[ 16 ],
cvcLength:[ 3 ],
luhn:!0
}, {
type:"visa",
pattern:/^4/,
format:i,
length:[ 13, 16 ],
cvcLength:[ 3 ],
luhn:!0
}, {
type:"mastercard",
pattern:/^(5[0-5]|2[2-7])/,
format:i,
length:[ 16 ],
cvcLength:[ 3 ],
luhn:!0
}, {
type:"amex",
pattern:/^3[47]/,
format:/(\d{1,4})(\d{1,6})?(\d{1,5})?/,
length:[ 15 ],
cvcLength:[ 3, 4 ],
luhn:!0
}, {
type:"dinersclub",
pattern:/^3[0689]/,
format:/(\d{1,4})(\d{1,6})?(\d{1,4})?/,
length:[ 14 ],
cvcLength:[ 3 ],
luhn:!0
}, {
type:"discover",
pattern:/^6([045]|22)/,
format:i,
length:[ 16 ],
cvcLength:[ 3 ],
luhn:!0
}, {
type:"unionpay",
pattern:/^(62|88)/,
format:i,
length:[ 16, 17, 18, 19 ],
cvcLength:[ 3 ],
luhn:!1
}, {
type:"jcb",
pattern:/^35/,
format:i,
length:[ 16 ],
cvcLength:[ 3 ],
luhn:!0
} ], t = function(t) {
var e, i, r;
for (t = (t + "").replace(/\D/g, ""), i = 0, r = n.length; r > i; i++) if (e = n[i], 
e.pattern.test(t)) return e;
}, e = function(t) {
var e, i, r;
for (i = 0, r = n.length; r > i; i++) if (e = n[i], e.type === t) return e;
}, h = function(t) {
var e, n, i, r, o, s;
for (i = !0, r = 0, n = (t + "").split("").reverse(), o = 0, s = n.length; s > o; o++) e = n[o], 
e = parseInt(e, 10), (i = !i) && (e *= 2), e > 9 && (e -= 9), r += e;
return r % 10 === 0;
}, c = function(t) {
var e;
return null != t.prop("selectionStart") && t.prop("selectionStart") !== t.prop("selectionEnd") ? !0 :null != ("undefined" != typeof document && null !== document && null != (e = document.selection) ? e.createRange :void 0) && document.selection.createRange().text ? !0 :!1;
}, m = function(t) {
return setTimeout(function() {
var e, n;
return e = $(t.currentTarget), n = e.val(), n = n.replace(/\D/g, ""), e.val(n);
});
}, f = function(t) {
return setTimeout(function() {
var e, n;
return e = $(t.currentTarget), n = e.val(), n = $.payment.formatCardNumber(n), e.val(n);
});
}, s = function(e) {
var n, i, r, o, s, a, u;
return r = String.fromCharCode(e.which), !/^\d+$/.test(r) || (n = $(e.currentTarget), 
u = n.val(), i = t(u + r), o = (u.replace(/\D/g, "") + r).length, a = 16, i && (a = i.length[i.length.length - 1]), 
o >= a || null != n.prop("selectionStart") && n.prop("selectionStart") !== u.length) ? void 0 :(s = i && "amex" === i.type ? /^(\d{4}|\d{4}\s\d{6})$/ :/(?:^|\s)(\d{4})$/, 
s.test(u) ? (e.preventDefault(), setTimeout(function() {
return n.val(u + " " + r);
})) :s.test(u + r) ? (e.preventDefault(), setTimeout(function() {
return n.val(u + r + " ");
})) :void 0);
}, r = function(t) {
var e, n;
return e = $(t.currentTarget), n = e.val(), 8 !== t.which || null != e.prop("selectionStart") && e.prop("selectionStart") !== n.length ? void 0 :/\d\s$/.test(n) ? (t.preventDefault(), 
setTimeout(function() {
return e.val(n.replace(/\d\s$/, ""));
})) :/\s\d?$/.test(n) ? (t.preventDefault(), setTimeout(function() {
return e.val(n.replace(/\d$/, ""));
})) :void 0;
}, p = function(t) {
return setTimeout(function() {
var e, n;
return e = $(t.currentTarget), n = e.val(), n = $.payment.formatExpiry(n), e.val(n);
});
}, a = function(t) {
var e, n, i;
return n = String.fromCharCode(t.which), /^\d+$/.test(n) ? (e = $(t.currentTarget), 
i = e.val() + n, /^\d$/.test(i) && "0" !== i && "1" !== i ? (t.preventDefault(), 
setTimeout(function() {
return e.val("0" + i + " / ");
})) :/^\d\d$/.test(i) ? (t.preventDefault(), setTimeout(function() {
return e.val("" + i + " / ");
})) :void 0) :void 0;
}, u = function(t) {
var e, n, i;
return n = String.fromCharCode(t.which), /^\d+$/.test(n) ? (e = $(t.currentTarget), 
i = e.val(), /^\d\d$/.test(i) ? e.val("" + i + " / ") :void 0) :void 0;
}, l = function(t) {
var e, n, i;
return i = String.fromCharCode(t.which), "/" === i || " " === i ? (e = $(t.currentTarget), 
n = e.val(), /^\d$/.test(n) && "0" !== n ? e.val("0" + n + " / ") :void 0) :void 0;
}, o = function(t) {
var e, n;
return e = $(t.currentTarget), n = e.val(), 8 !== t.which || null != e.prop("selectionStart") && e.prop("selectionStart") !== n.length ? void 0 :/\d\s\/\s$/.test(n) ? (t.preventDefault(), 
setTimeout(function() {
return e.val(n.replace(/\d\s\/\s$/, ""));
})) :void 0;
}, d = function(t) {
return setTimeout(function() {
var e, n;
return e = $(t.currentTarget), n = e.val(), n = n.replace(/\D/g, "").slice(0, 4), 
e.val(n);
});
}, _ = function(t) {
var e;
return t.metaKey || t.ctrlKey ? !0 :32 === t.which ? !1 :0 === t.which ? !0 :t.which < 33 ? !0 :(e = String.fromCharCode(t.which), 
!!/[\d\s]/.test(e));
}, v = function(e) {
var n, i, r, o;
return n = $(e.currentTarget), r = String.fromCharCode(e.which), /^\d+$/.test(r) && !c(n) ? (o = (n.val() + r).replace(/\D/g, ""), 
i = t(o), i ? o.length <= i.length[i.length.length - 1] :o.length <= 16) :void 0;
}, y = function(t) {
var e, n, i;
return e = $(t.currentTarget), n = String.fromCharCode(t.which), /^\d+$/.test(n) && !c(e) ? (i = e.val() + n, 
i = i.replace(/\D/g, ""), i.length > 6 ? !1 :void 0) :void 0;
}, g = function(t) {
var e, n, i;
return e = $(t.currentTarget), n = String.fromCharCode(t.which), /^\d+$/.test(n) && !c(e) ? (i = e.val() + n, 
i.length <= 4) :void 0;
}, b = function(t) {
var e, i, r, o, s;
return e = $(t.currentTarget), s = e.val(), o = $.payment.cardType(s) || "unknown", 
e.hasClass(o) ? void 0 :(i = function() {
var t, e, i;
for (i = [], t = 0, e = n.length; e > t; t++) r = n[t], i.push(r.type);
return i;
}(), e.removeClass("unknown"), e.removeClass(i.join(" ")), e.addClass(o), e.toggleClass("identified", "unknown" !== o), 
e.trigger("payment.cardType", o));
}, $.payment.fn.formatCardCVC = function() {
return this.on("keypress", _), this.on("keypress", g), this.on("paste", d), this.on("change", d), 
this.on("input", d), this;
}, $.payment.fn.formatCardExpiry = function() {
return this.on("keypress", _), this.on("keypress", y), this.on("keypress", a), this.on("keypress", l), 
this.on("keypress", u), this.on("keydown", o), this.on("change", p), this.on("input", p), 
this;
}, $.payment.fn.formatCardNumber = function() {
return this.on("keypress", _), this.on("keypress", v), this.on("keypress", s), this.on("keydown", r), 
this.on("keyup", b), this.on("paste", f), this.on("change", f), this.on("input", f), 
this.on("input", b), this;
}, $.payment.fn.restrictNumeric = function() {
return this.on("keypress", _), this.on("paste", m), this.on("change", m), this.on("input", m), 
this;
}, $.payment.fn.cardExpiryVal = function() {
return $.payment.cardExpiryVal($(this).val());
}, $.payment.cardExpiryVal = function(t) {
var e, n, i, r;
return t = t.replace(/\s/g, ""), r = t.split("/", 2), e = r[0], i = r[1], 2 === (null != i ? i.length :void 0) && /^\d+$/.test(i) && (n = new Date().getFullYear(), 
n = n.toString().slice(0, 2), i = n + i), e = parseInt(e, 10), i = parseInt(i, 10), 
{
month:e,
year:i
};
}, $.payment.validateCardNumber = function(e) {
var n, i;
return e = (e + "").replace(/\s+|-/g, ""), /^\d+$/.test(e) ? (n = t(e), n ? (i = e.length, 
x.call(n.length, i) >= 0 && (n.luhn === !1 || h(e))) :!1) :!1;
}, $.payment.validateCardExpiry = function(t, e) {
var n, i, r;
return "object" == typeof t && "month" in t && (r = t, t = r.month, e = r.year), 
t && e ? (t = $.trim(t), e = $.trim(e), /^\d+$/.test(t) && /^\d+$/.test(e) && t >= 1 && 12 >= t ? (2 === e.length && (e = 70 > e ? "20" + e :"19" + e), 
4 !== e.length ? !1 :(i = new Date(e, t), n = new Date(), i.setMonth(i.getMonth() - 1), 
i.setMonth(i.getMonth() + 1, 1), i > n)) :!1) :!1;
}, $.payment.validateCardCVC = function(t, n) {
var i, r;
return t = $.trim(t), /^\d+$/.test(t) ? (i = e(n), null != i ? (r = t.length, x.call(i.cvcLength, r) >= 0) :t.length >= 3 && t.length <= 4) :!1;
}, $.payment.cardType = function(e) {
var n;
return e ? (null != (n = t(e)) ? n.type :void 0) || null :null;
}, $.payment.formatCardNumber = function(e) {
var n, i, r, o;
return e = e.replace(/\D/g, ""), (n = t(e)) ? (r = n.length[n.length.length - 1], 
e = e.slice(0, r), n.format.global ? null != (o = e.match(n.format)) ? o.join(" ") :void 0 :(i = n.format.exec(e), 
null != i ? (i.shift(), i = $.grep(i, function(t) {
return t;
}), i.join(" ")) :void 0)) :e;
}, $.payment.formatExpiry = function(t) {
var e, n, i, r;
return (n = t.match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/)) ? (e = n[1] || "", i = n[2] || "", 
r = n[3] || "", r.length > 0 ? i = " / " :" /" === i ? (e = e.substring(0, 1), i = "") :2 === e.length || i.length > 0 ? i = " / " :1 === e.length && "0" !== e && "1" !== e && (e = "0" + e, 
i = " / "), e + i + r) :"";
};
}.call(this), function(t, e) {
"use strict";
if ("function" != typeof t.createEvent) return !1;
var n, i, r, o, s, a, u, l, c = "undefined" != typeof jQuery, h = function(t) {
var e = t.toLowerCase(), n = "MS" + t;
return navigator.msPointerEnabled ? n :e;
}, d = !1, f = {
touchstart:h("PointerDown") + " touchstart",
touchend:h("PointerUp") + " touchend",
touchmove:h("PointerMove") + " touchmove"
}, p = function(t, e, n) {
for (var i = e.split(" "), r = i.length; r--; ) t.addEventListener(i[r], n, !1);
}, m = function(t) {
return t.targetTouches ? t.targetTouches[0] :t;
}, g = function() {
return new Date().getTime();
}, v = function(e, r, o, s) {
var a = t.createEvent("Event");
if (a.originalEvent = o, s = s || {}, s.x = n, s.y = i, s.distance = s.distance, 
c && (a = jQuery.Event(r, {
originalEvent:o
}), jQuery(e).trigger(a, s)), a.initEvent) {
for (var u in s) a[u] = s[u];
a.initEvent(r, !0, !0), e.dispatchEvent(a);
}
for (;e; ) e["on" + r] && e["on" + r](a), e = e.parentNode;
}, y = function(t) {
if ("mousedown" !== t.type && (d = !0), "mousedown" !== t.type || !d) {
var e = m(t);
r = n = e.pageX, o = i = e.pageY, l = setTimeout(function() {
v(t.target, "longtap", t), a = t.target;
}, k), s = g(), E++;
}
}, _ = function(t) {
if ("mouseup" === t.type && d) return void (d = !1);
var e = [], c = g(), h = o - i, f = r - n;
if (clearTimeout(u), clearTimeout(l), -w >= f && e.push("swiperight"), f >= w && e.push("swipeleft"), 
-w >= h && e.push("swipedown"), h >= w && e.push("swipeup"), e.length) {
for (var p = 0; p < e.length; p++) {
var m = e[p];
v(t.target, m, t, {
distance:{
x:Math.abs(f),
y:Math.abs(h)
}
});
}
E = 0;
} else r >= n - C && n + C >= r && o >= i - C && i + C >= o && s + x - c >= 0 && (v(t.target, E >= 2 && a === t.target ? "dbltap" :"tap", t), 
a = t.target), u = setTimeout(function() {
E = 0;
}, S);
}, b = function(t) {
if ("mousemove" !== t.type || !d) {
var e = m(t);
n = e.pageX, i = e.pageY;
}
}, w = e.SWIPE_THRESHOLD || 100, x = e.TAP_THRESHOLD || 150, S = e.DBL_TAP_THRESHOLD || 200, k = e.LONG_TAP_THRESHOLD || 1e3, C = e.TAP_PRECISION / 2 || 30, T = e.JUST_ON_TOUCH_DEVICES, E = 0;
p(t, f.touchstart + (T ? "" :" mousedown"), y), p(t, f.touchend + (T ? "" :" mouseup"), _), 
p(t, f.touchmove + (T ? "" :" mousemove"), b);
}(document, window), function(t, e) {
"object" == typeof module && module.exports ? module.exports = e() :"function" == typeof define && define.amd ? define(e) :t.Spinner = e();
}(this, function() {
"use strict";
function t(t, e) {
var n, i = document.createElement(t || "div");
for (n in e) i[n] = e[n];
return i;
}
function e(t) {
for (var e = 1, n = arguments.length; n > e; e++) t.appendChild(arguments[e]);
return t;
}
function n(t, e, n, i) {
var r = [ "opacity", e, ~~(100 * t), n, i ].join("-"), o = .01 + n / i * 100, s = Math.max(1 - (1 - t) / e * (100 - o), t), a = l.substring(0, l.indexOf("Animation")).toLowerCase(), u = a && "-" + a + "-" || "";
return d[r] || (c.insertRule("@" + u + "keyframes " + r + "{0%{opacity:" + s + "}" + o + "%{opacity:" + t + "}" + (o + .01) + "%{opacity:1}" + (o + e) % 100 + "%{opacity:" + t + "}100%{opacity:" + s + "}}", c.cssRules.length), 
d[r] = 1), r;
}
function i(t, e) {
var n, i, r = t.style;
if (e = e.charAt(0).toUpperCase() + e.slice(1), void 0 !== r[e]) return e;
for (i = 0; i < h.length; i++) if (n = h[i] + e, void 0 !== r[n]) return n;
}
function r(t, e) {
for (var n in e) t.style[i(t, n) || n] = e[n];
return t;
}
function o(t) {
for (var e = 1; e < arguments.length; e++) {
var n = arguments[e];
for (var i in n) void 0 === t[i] && (t[i] = n[i]);
}
return t;
}
function s(t, e) {
return "string" == typeof t ? t :t[e % t.length];
}
function a(t) {
this.opts = o(t || {}, a.defaults, f);
}
function u() {
function n(e, n) {
return t("<" + e + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', n);
}
c.addRule(".spin-vml", "behavior:url(#default#VML)"), a.prototype.lines = function(t, i) {
function o() {
return r(n("group", {
coordsize:c + " " + c,
coordorigin:-l + " " + -l
}), {
width:c,
height:c
});
}
function a(t, a, u) {
e(d, e(r(o(), {
rotation:360 / i.lines * t + "deg",
left:~~a
}), e(r(n("roundrect", {
arcsize:i.corners
}), {
width:l,
height:i.scale * i.width,
left:i.scale * i.radius,
top:-i.scale * i.width >> 1,
filter:u
}), n("fill", {
color:s(i.color, t),
opacity:i.opacity
}), n("stroke", {
opacity:0
}))));
}
var u, l = i.scale * (i.length + i.width), c = 2 * i.scale * l, h = -(i.width + i.length) * i.scale * 2 + "px", d = r(o(), {
position:"absolute",
top:h,
left:h
});
if (i.shadow) for (u = 1; u <= i.lines; u++) a(u, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
for (u = 1; u <= i.lines; u++) a(u);
return e(t, d);
}, a.prototype.opacity = function(t, e, n, i) {
var r = t.firstChild;
i = i.shadow && i.lines || 0, r && e + i < r.childNodes.length && (r = r.childNodes[e + i], 
r = r && r.firstChild, r = r && r.firstChild, r && (r.opacity = n));
};
}
var l, c, h = [ "webkit", "Moz", "ms", "O" ], d = {}, f = {
lines:12,
length:7,
width:5,
radius:10,
scale:1,
corners:1,
color:"#000",
opacity:.25,
rotate:0,
direction:1,
speed:1,
trail:100,
fps:20,
zIndex:2e9,
className:"spinner",
top:"50%",
left:"50%",
shadow:!1,
hwaccel:!1,
position:"absolute"
};
if (a.defaults = {}, o(a.prototype, {
spin:function(e) {
this.stop();
var n = this, i = n.opts, o = n.el = t(null, {
className:i.className
});
if (r(o, {
position:i.position,
width:0,
zIndex:i.zIndex,
left:i.left,
top:i.top
}), e && e.insertBefore(o, e.firstChild || null), o.setAttribute("role", "progressbar"), 
n.lines(o, n.opts), !l) {
var s, a = 0, u = (i.lines - 1) * (1 - i.direction) / 2, c = i.fps, h = c / i.speed, d = (1 - i.opacity) / (h * i.trail / 100), f = h / i.lines;
!function p() {
a++;
for (var t = 0; t < i.lines; t++) s = Math.max(1 - (a + (i.lines - t) * f) % h * d, i.opacity), 
n.opacity(o, t * i.direction + u, s, i);
n.timeout = n.el && setTimeout(p, ~~(1e3 / c));
}();
}
return n;
},
stop:function() {
var t = this.el;
return t && (clearTimeout(this.timeout), t.parentNode && t.parentNode.removeChild(t), 
this.el = void 0), this;
},
lines:function(i, o) {
function a(e, n) {
return r(t(), {
position:"absolute",
width:o.scale * (o.length + o.width) + "px",
height:o.scale * o.width + "px",
background:e,
boxShadow:n,
transformOrigin:"left",
transform:"rotate(" + ~~(360 / o.lines * c + o.rotate) + "deg) translate(" + o.scale * o.radius + "px,0)",
borderRadius:(o.corners * o.scale * o.width >> 1) + "px"
});
}
for (var u, c = 0, h = (o.lines - 1) * (1 - o.direction) / 2; c < o.lines; c++) u = r(t(), {
position:"absolute",
top:1 + ~(o.scale * o.width / 2) + "px",
transform:o.hwaccel ? "translate3d(0,0,0)" :"",
opacity:o.opacity,
animation:l && n(o.opacity, o.trail, h + c * o.direction, o.lines) + " " + 1 / o.speed + "s linear infinite"
}), o.shadow && e(u, r(a("#000", "0 0 4px #000"), {
top:"2px"
})), e(i, e(u, a(s(o.color, c), "0 0 1px rgba(0,0,0,.1)")));
return i;
},
opacity:function(t, e, n) {
e < t.childNodes.length && (t.childNodes[e].style.opacity = n);
}
}), "undefined" != typeof document) {
c = function() {
var n = t("style", {
type:"text/css"
});
return e(document.getElementsByTagName("head")[0], n), n.sheet || n.styleSheet;
}();
var p = r(t("group"), {
behavior:"url(#default#VML)"
});
!i(p, "transform") && p.adj ? u() :l = i(p, "animation");
}
return a;
}), function(t) {
"use strict";
function e(t, e) {
var n = (65535 & t) + (65535 & e), i = (t >> 16) + (e >> 16) + (n >> 16);
return i << 16 | 65535 & n;
}
function n(t, e) {
return t << e | t >>> 32 - e;
}
function i(t, i, r, o, s, a) {
return e(n(e(e(i, t), e(o, a)), s), r);
}
function r(t, e, n, r, o, s, a) {
return i(e & n | ~e & r, t, e, o, s, a);
}
function o(t, e, n, r, o, s, a) {
return i(e & r | n & ~r, t, e, o, s, a);
}
function s(t, e, n, r, o, s, a) {
return i(e ^ n ^ r, t, e, o, s, a);
}
function a(t, e, n, r, o, s, a) {
return i(n ^ (e | ~r), t, e, o, s, a);
}
function u(t, n) {
t[n >> 5] |= 128 << n % 32, t[(n + 64 >>> 9 << 4) + 14] = n;
var i, u, l, c, h, d = 1732584193, f = -271733879, p = -1732584194, m = 271733878;
for (i = 0; i < t.length; i += 16) u = d, l = f, c = p, h = m, d = r(d, f, p, m, t[i], 7, -680876936), 
m = r(m, d, f, p, t[i + 1], 12, -389564586), p = r(p, m, d, f, t[i + 2], 17, 606105819), 
f = r(f, p, m, d, t[i + 3], 22, -1044525330), d = r(d, f, p, m, t[i + 4], 7, -176418897), 
m = r(m, d, f, p, t[i + 5], 12, 1200080426), p = r(p, m, d, f, t[i + 6], 17, -1473231341), 
f = r(f, p, m, d, t[i + 7], 22, -45705983), d = r(d, f, p, m, t[i + 8], 7, 1770035416), 
m = r(m, d, f, p, t[i + 9], 12, -1958414417), p = r(p, m, d, f, t[i + 10], 17, -42063), 
f = r(f, p, m, d, t[i + 11], 22, -1990404162), d = r(d, f, p, m, t[i + 12], 7, 1804603682), 
m = r(m, d, f, p, t[i + 13], 12, -40341101), p = r(p, m, d, f, t[i + 14], 17, -1502002290), 
f = r(f, p, m, d, t[i + 15], 22, 1236535329), d = o(d, f, p, m, t[i + 1], 5, -165796510), 
m = o(m, d, f, p, t[i + 6], 9, -1069501632), p = o(p, m, d, f, t[i + 11], 14, 643717713), 
f = o(f, p, m, d, t[i], 20, -373897302), d = o(d, f, p, m, t[i + 5], 5, -701558691), 
m = o(m, d, f, p, t[i + 10], 9, 38016083), p = o(p, m, d, f, t[i + 15], 14, -660478335), 
f = o(f, p, m, d, t[i + 4], 20, -405537848), d = o(d, f, p, m, t[i + 9], 5, 568446438), 
m = o(m, d, f, p, t[i + 14], 9, -1019803690), p = o(p, m, d, f, t[i + 3], 14, -187363961), 
f = o(f, p, m, d, t[i + 8], 20, 1163531501), d = o(d, f, p, m, t[i + 13], 5, -1444681467), 
m = o(m, d, f, p, t[i + 2], 9, -51403784), p = o(p, m, d, f, t[i + 7], 14, 1735328473), 
f = o(f, p, m, d, t[i + 12], 20, -1926607734), d = s(d, f, p, m, t[i + 5], 4, -378558), 
m = s(m, d, f, p, t[i + 8], 11, -2022574463), p = s(p, m, d, f, t[i + 11], 16, 1839030562), 
f = s(f, p, m, d, t[i + 14], 23, -35309556), d = s(d, f, p, m, t[i + 1], 4, -1530992060), 
m = s(m, d, f, p, t[i + 4], 11, 1272893353), p = s(p, m, d, f, t[i + 7], 16, -155497632), 
f = s(f, p, m, d, t[i + 10], 23, -1094730640), d = s(d, f, p, m, t[i + 13], 4, 681279174), 
m = s(m, d, f, p, t[i], 11, -358537222), p = s(p, m, d, f, t[i + 3], 16, -722521979), 
f = s(f, p, m, d, t[i + 6], 23, 76029189), d = s(d, f, p, m, t[i + 9], 4, -640364487), 
m = s(m, d, f, p, t[i + 12], 11, -421815835), p = s(p, m, d, f, t[i + 15], 16, 530742520), 
f = s(f, p, m, d, t[i + 2], 23, -995338651), d = a(d, f, p, m, t[i], 6, -198630844), 
m = a(m, d, f, p, t[i + 7], 10, 1126891415), p = a(p, m, d, f, t[i + 14], 15, -1416354905), 
f = a(f, p, m, d, t[i + 5], 21, -57434055), d = a(d, f, p, m, t[i + 12], 6, 1700485571), 
m = a(m, d, f, p, t[i + 3], 10, -1894986606), p = a(p, m, d, f, t[i + 10], 15, -1051523), 
f = a(f, p, m, d, t[i + 1], 21, -2054922799), d = a(d, f, p, m, t[i + 8], 6, 1873313359), 
m = a(m, d, f, p, t[i + 15], 10, -30611744), p = a(p, m, d, f, t[i + 6], 15, -1560198380), 
f = a(f, p, m, d, t[i + 13], 21, 1309151649), d = a(d, f, p, m, t[i + 4], 6, -145523070), 
m = a(m, d, f, p, t[i + 11], 10, -1120210379), p = a(p, m, d, f, t[i + 2], 15, 718787259), 
f = a(f, p, m, d, t[i + 9], 21, -343485551), d = e(d, u), f = e(f, l), p = e(p, c), 
m = e(m, h);
return [ d, f, p, m ];
}
function l(t) {
var e, n = "";
for (e = 0; e < 32 * t.length; e += 8) n += String.fromCharCode(t[e >> 5] >>> e % 32 & 255);
return n;
}
function c(t) {
var e, n = [];
for (n[(t.length >> 2) - 1] = void 0, e = 0; e < n.length; e += 1) n[e] = 0;
for (e = 0; e < 8 * t.length; e += 8) n[e >> 5] |= (255 & t.charCodeAt(e / 8)) << e % 32;
return n;
}
function h(t) {
return l(u(c(t), 8 * t.length));
}
function d(t, e) {
var n, i, r = c(t), o = [], s = [];
for (o[15] = s[15] = void 0, r.length > 16 && (r = u(r, 8 * t.length)), n = 0; 16 > n; n += 1) o[n] = 909522486 ^ r[n], 
s[n] = 1549556828 ^ r[n];
return i = u(o.concat(c(e)), 512 + 8 * e.length), l(u(s.concat(i), 640));
}
function f(t) {
var e, n, i = "0123456789abcdef", r = "";
for (n = 0; n < t.length; n += 1) e = t.charCodeAt(n), r += i.charAt(e >>> 4 & 15) + i.charAt(15 & e);
return r;
}
function p(t) {
return unescape(encodeURIComponent(t));
}
function m(t) {
return h(p(t));
}
function g(t) {
return f(m(t));
}
function v(t, e) {
return d(p(t), p(e));
}
function y(t, e) {
return f(v(t, e));
}
function _(t, e, n) {
return e ? n ? v(e, t) :y(e, t) :n ? m(t) :g(t);
}
"function" == typeof define && define.amd ? define(function() {
return _;
}) :t.md5 = _;
}(this), function(t) {
"use strict";
function e(t, e) {
var n, u, l, c;
"undefined" == typeof document && "function" == typeof require ? (n = "file://" + (process.platform.match(/^win/i) ? "/" :"") + require("fs").realpathSync("."), 
e && "/" !== e.charAt(0) && !e.match(/^\w+:\/\//) && (e = n + require("path").sep + e), 
u = require("url").parse(e || n)) :(n = document.location.href, u = document.createElement("a"), 
u.href = e || n), c = (e || n).match(/\/\/(.*?)(?::(.*?))?@/) || [];
for (l in s) t[l] = u[s[l]] || "";
if (t.protocol = t.protocol.replace(/:$/, ""), t.query = t.query.replace(/^\?/, ""), 
t.hash = i(t.hash.replace(/^#/, "")), t.user = i(c[1] || ""), t.pass = i(c[2] || ""), 
t.port = a[t.protocol] === t.port || 0 === t.port ? "" :t.port, t.protocol || /^([a-z]+:)?\/\/\/?/.test(e)) t.path = t.path.replace(/^\/?/, "/"); else {
var h = new o(n.match(/(.*\/)/)[0]), d = h.path.split("/"), f = t.path.split("/"), p = [ "protocol", "user", "pass", "host", "port" ], m = p.length;
for (d.pop(), l = 0; m > l; l++) t[p[l]] = h[p[l]];
for (;".." == f[0]; ) d.pop(), f.shift();
t.path = ("/" != e.charAt(0) ? d.join("/") :"") + "/" + f.join("/");
}
t.paths(("/" == t.path.charAt(0) ? t.path.slice(1) :t.path).split("/")), t.query = new r(t.query);
}
function n(t) {
return encodeURIComponent(t).replace(/'/g, "%27");
}
function i(t) {
return t = t.replace(/\+/g, " "), t = t.replace(/%([ef][0-9a-f])%([89ab][0-9a-f])%([89ab][0-9a-f])/gi, function(t, e, n, i) {
var r = parseInt(e, 16) - 224, o = parseInt(n, 16) - 128;
if (0 === r && 32 > o) return t;
var s = parseInt(i, 16) - 128, a = (r << 12) + (o << 6) + s;
return a > 65535 ? t :String.fromCharCode(a);
}), t = t.replace(/%([cd][0-9a-f])%([89ab][0-9a-f])/gi, function(t, e, n) {
var i = parseInt(e, 16) - 192;
if (2 > i) return t;
var r = parseInt(n, 16) - 128;
return String.fromCharCode((i << 6) + r);
}), t.replace(/%([0-7][0-9a-f])/gi, function(t, e) {
return String.fromCharCode(parseInt(e, 16));
});
}
function r(t) {
for (var e, n = /([^=&]+)(=([^&]*))?/g; e = n.exec(t); ) {
var r = decodeURIComponent(e[1].replace(/\+/g, " ")), o = e[3] ? i(e[3]) :"";
void 0 !== this[r] && null !== this[r] ? (this[r] instanceof Array || (this[r] = [ this[r] ]), 
this[r].push(o)) :this[r] = o;
}
}
function o(t) {
e(this, t);
}
var s = {
protocol:"protocol",
host:"hostname",
port:"port",
path:"pathname",
query:"search",
hash:"hash"
}, a = {
ftp:21,
gopher:70,
http:80,
https:443,
ws:80,
wss:443
};
r.prototype.toString = function() {
var t, e, i = "", r = n;
for (t in this) if (!(this[t] instanceof Function || null === this[t])) if (this[t] instanceof Array) {
var o = this[t].length;
if (o) for (e = 0; o > e; e++) i += i ? "&" :"", i += r(t) + "=" + r(this[t][e]); else i += (i ? "&" :"") + r(t) + "=";
} else i += i ? "&" :"", i += r(t) + "=" + r(this[t]);
return i;
}, o.prototype.clearQuery = function() {
for (var t in this.query) this.query[t] instanceof Function || delete this.query[t];
return this;
}, o.prototype.queryLength = function() {
var t, e = 0;
for (t in this) this[t] instanceof Function || e++;
return e;
}, o.prototype.isEmptyQuery = function() {
return 0 === this.queryLength();
}, o.prototype.paths = function(t) {
var e, r = "", o = 0;
if (t && t.length && t + "" !== t) {
for (this.isAbsolute() && (r = "/"), e = t.length; e > o; o++) t[o] = !o && t[o].match(/^\w:$/) ? t[o] :n(t[o]);
this.path = r + t.join("/");
}
for (t = ("/" === this.path.charAt(0) ? this.path.slice(1) :this.path).split("/"), 
o = 0, e = t.length; e > o; o++) t[o] = i(t[o]);
return t;
}, o.prototype.encode = n, o.prototype.decode = i, o.prototype.isAbsolute = function() {
return this.protocol || "/" === this.path.charAt(0);
}, o.prototype.toString = function() {
return (this.protocol && this.protocol + "://") + (this.user && n(this.user) + (this.pass && ":" + n(this.pass)) + "@") + (this.host && this.host) + (this.port && ":" + this.port) + (this.path && this.path) + (this.query.toString() && "?" + this.query) + (this.hash && "#" + n(this.hash));
}, t[t.exports ? "exports" :"Url"] = o;
}("undefined" != typeof module && module.exports ? module :window), function(t, e) {
"function" == typeof define && define.amd ? define([], e) :"object" == typeof exports ? module.exports = e() :t.store = e();
}(this, function() {
function t() {
try {
return o in i && i[o];
} catch (t) {
return !1;
}
}
var e, n = {}, i = "undefined" != typeof window ? window :global, r = i.document, o = "localStorage", s = "script";
if (n.disabled = !1, n.version = "1.3.20", n.set = function() {}, n.get = function() {}, 
n.has = function(t) {
return void 0 !== n.get(t);
}, n.remove = function() {}, n.clear = function() {}, n.transact = function(t, e, i) {
null == i && (i = e, e = null), null == e && (e = {});
var r = n.get(t, e);
i(r), n.set(t, r);
}, n.getAll = function() {}, n.forEach = function() {}, n.serialize = function(t) {
return JSON.stringify(t);
}, n.deserialize = function(t) {
if ("string" != typeof t) return void 0;
try {
return JSON.parse(t);
} catch (e) {
return t || void 0;
}
}, t()) e = i[o], n.set = function(t, i) {
return void 0 === i ? n.remove(t) :(e.setItem(t, n.serialize(i)), i);
}, n.get = function(t, i) {
var r = n.deserialize(e.getItem(t));
return void 0 === r ? i :r;
}, n.remove = function(t) {
e.removeItem(t);
}, n.clear = function() {
e.clear();
}, n.getAll = function() {
var t = {};
return n.forEach(function(e, n) {
t[e] = n;
}), t;
}, n.forEach = function(t) {
for (var i = 0; i < e.length; i++) {
var r = e.key(i);
t(r, n.get(r));
}
}; else if (r && r.documentElement.addBehavior) {
var a, u;
try {
u = new ActiveXObject("htmlfile"), u.open(), u.write("<" + s + ">document.w=window</" + s + '><iframe src="/favicon.ico"></iframe>'), 
u.close(), a = u.w.frames[0].document, e = a.createElement("div");
} catch (l) {
e = r.createElement("div"), a = r.body;
}
var c = function(t) {
return function() {
var i = Array.prototype.slice.call(arguments, 0);
i.unshift(e), a.appendChild(e), e.addBehavior("#default#userData"), e.load(o);
var r = t.apply(n, i);
return a.removeChild(e), r;
};
}, h = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g"), d = function(t) {
return t.replace(/^d/, "___$&").replace(h, "___");
};
n.set = c(function(t, e, i) {
return e = d(e), void 0 === i ? n.remove(e) :(t.setAttribute(e, n.serialize(i)), 
t.save(o), i);
}), n.get = c(function(t, e, i) {
e = d(e);
var r = n.deserialize(t.getAttribute(e));
return void 0 === r ? i :r;
}), n.remove = c(function(t, e) {
e = d(e), t.removeAttribute(e), t.save(o);
}), n.clear = c(function(t) {
var e = t.XMLDocument.documentElement.attributes;
t.load(o);
for (var n = e.length - 1; n >= 0; n--) t.removeAttribute(e[n].name);
t.save(o);
}), n.getAll = function() {
var t = {};
return n.forEach(function(e, n) {
t[e] = n;
}), t;
}, n.forEach = c(function(t, e) {
for (var i, r = t.XMLDocument.documentElement.attributes, o = 0; i = r[o]; ++o) e(i.name, n.deserialize(t.getAttribute(i.name)));
});
}
try {
var f = "__storejs__";
n.set(f, f), n.get(f) != f && (n.disabled = !0), n.remove(f);
} catch (l) {
n.disabled = !0;
}
return n.enabled = !n.disabled, n;
}), "object" != typeof JSON && (JSON = {}), function() {
"use strict";
function f(t) {
return 10 > t ? "0" + t :t;
}
function quote(t) {
return escapable.lastIndex = 0, escapable.test(t) ? '"' + t.replace(escapable, function(t) {
var e = meta[t];
return "string" == typeof e ? e :"\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
}) + '"' :'"' + t + '"';
}
function str(t, e) {
var n, i, r, o, s, a = gap, u = e[t];
switch (u && "object" == typeof u && "function" == typeof u.toJSON && (u = u.toJSON(t)), 
"function" == typeof rep && (u = rep.call(e, t, u)), typeof u) {
case "string":
return quote(u);

case "number":
return isFinite(u) ? String(u) :"null";

case "boolean":
case "null":
return String(u);

case "object":
if (!u) return "null";
if (gap += indent, s = [], "[object Array]" === Object.prototype.toString.apply(u)) {
for (o = u.length, n = 0; o > n; n += 1) s[n] = str(n, u) || "null";
return r = 0 === s.length ? "[]" :gap ? "[\n" + gap + s.join(",\n" + gap) + "\n" + a + "]" :"[" + s.join(",") + "]", 
gap = a, r;
}
if (rep && "object" == typeof rep) for (o = rep.length, n = 0; o > n; n += 1) "string" == typeof rep[n] && (i = rep[n], 
r = str(i, u), r && s.push(quote(i) + (gap ? ": " :":") + r)); else for (i in u) Object.prototype.hasOwnProperty.call(u, i) && (r = str(i, u), 
r && s.push(quote(i) + (gap ? ": " :":") + r));
return r = 0 === s.length ? "{}" :gap ? "{\n" + gap + s.join(",\n" + gap) + "\n" + a + "}" :"{" + s.join(",") + "}", 
gap = a, r;
}
}
"function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" :null;
}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
return this.valueOf();
});
var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
"\b":"\\b",
"	":"\\t",
"\n":"\\n",
"\f":"\\f",
"\r":"\\r",
'"':'\\"',
"\\":"\\\\"
}, rep;
"function" != typeof JSON.stringify && (JSON.stringify = function(t, e, n) {
var i;
if (gap = "", indent = "", "number" == typeof n) for (i = 0; n > i; i += 1) indent += " "; else "string" == typeof n && (indent = n);
if (rep = e, e && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length)) throw new Error("JSON.stringify");
return str("", {
"":t
});
}), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
function walk(t, e) {
var n, i, r = t[e];
if (r && "object" == typeof r) for (n in r) Object.prototype.hasOwnProperty.call(r, n) && (i = walk(r, n), 
void 0 !== i ? r[n] = i :delete r[n]);
return reviver.call(t, e, r);
}
var j;
if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(t) {
return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
})), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), 
"function" == typeof reviver ? walk({
"":j
}, "") :j;
throw new SyntaxError("JSON.parse");
});
}(), function(t, e) {
"use strict";
var n = t.History = t.History || {}, i = t.jQuery;
if ("undefined" != typeof n.Adapter) throw new Error("History.js Adapter has already been loaded...");
n.Adapter = {
bind:function(t, e, n) {
i(t).bind(e, n);
},
trigger:function(t, e, n) {
i(t).trigger(e, n);
},
extractEventData:function(t, n, i) {
var r = n && n.originalEvent && n.originalEvent[t] || i && i[t] || e;
return r;
},
onDomLoad:function(t) {
i(t);
}
}, "undefined" != typeof n.init && n.init();
}(window), function(t) {
"use strict";
var e = t.document, n = t.setTimeout || n, i = t.clearTimeout || i, r = t.setInterval || r, o = t.History = t.History || {};
if ("undefined" != typeof o.initHtml4) throw new Error("History.js HTML4 Support has already been loaded...");
o.initHtml4 = function() {
return "undefined" != typeof o.initHtml4.initialized ? !1 :(o.initHtml4.initialized = !0, 
o.enabled = !0, o.savedHashes = [], o.isLastHash = function(t) {
var e, n = o.getHashByIndex();
return e = t === n;
}, o.isHashEqual = function(t, e) {
return t = encodeURIComponent(t).replace(/%25/g, "%"), e = encodeURIComponent(e).replace(/%25/g, "%"), 
t === e;
}, o.saveHash = function(t) {
return o.isLastHash(t) ? !1 :(o.savedHashes.push(t), !0);
}, o.getHashByIndex = function(t) {
var e = null;
return e = "undefined" == typeof t ? o.savedHashes[o.savedHashes.length - 1] :0 > t ? o.savedHashes[o.savedHashes.length + t] :o.savedHashes[t];
}, o.discardedHashes = {}, o.discardedStates = {}, o.discardState = function(t, e, n) {
var i, r = o.getHashByState(t);
return i = {
discardedState:t,
backState:n,
forwardState:e
}, o.discardedStates[r] = i, !0;
}, o.discardHash = function(t, e, n) {
var i = {
discardedHash:t,
backState:n,
forwardState:e
};
return o.discardedHashes[t] = i, !0;
}, o.discardedState = function(t) {
var e, n = o.getHashByState(t);
return e = o.discardedStates[n] || !1;
}, o.discardedHash = function(t) {
var e = o.discardedHashes[t] || !1;
return e;
}, o.recycleState = function(t) {
var e = o.getHashByState(t);
return o.discardedState(t) && delete o.discardedStates[e], !0;
}, o.emulated.hashChange && (o.hashChangeInit = function() {
o.checkerFunction = null;
var n, i, s, a, u = "", l = Boolean(o.getHash());
return o.isInternetExplorer() ? (n = "historyjs-iframe", i = e.createElement("iframe"), 
i.setAttribute("id", n), i.setAttribute("src", "#"), i.style.display = "none", e.body.appendChild(i), 
i.contentWindow.document.open(), i.contentWindow.document.close(), s = "", a = !1, 
o.checkerFunction = function() {
if (a) return !1;
a = !0;
var e = o.getHash(), n = o.getHash(i.contentWindow.document);
return e !== u ? (u = e, n !== e && (s = n = e, i.contentWindow.document.open(), 
i.contentWindow.document.close(), i.contentWindow.document.location.hash = o.escapeHash(e)), 
o.Adapter.trigger(t, "hashchange")) :n !== s && (s = n, l && "" === n ? o.back() :o.setHash(n, !1)), 
a = !1, !0;
}) :o.checkerFunction = function() {
var e = o.getHash() || "";
return e !== u && (u = e, o.Adapter.trigger(t, "hashchange")), !0;
}, o.intervalList.push(r(o.checkerFunction, o.options.hashChangeInterval)), !0;
}, o.Adapter.onDomLoad(o.hashChangeInit)), o.emulated.pushState && (o.onHashChange = function(e) {
var n, i = e && e.newURL || o.getLocationHref(), r = o.getHashByUrl(i), s = null, a = null;
return o.isLastHash(r) ? (o.busy(!1), !1) :(o.doubleCheckComplete(), o.saveHash(r), 
r && o.isTraditionalAnchor(r) ? (o.Adapter.trigger(t, "anchorchange"), o.busy(!1), 
!1) :(s = o.extractState(o.getFullUrl(r || o.getLocationHref()), !0), o.isLastSavedState(s) ? (o.busy(!1), 
!1) :(a = o.getHashByState(s), (n = o.discardedState(s)) ? (o.getHashByIndex(-2) === o.getHashByState(n.forwardState) ? o.back(!1) :o.forward(!1), 
!1) :(o.pushState(s.data, s.title, encodeURI(s.url), !1), !0))));
}, o.Adapter.bind(t, "hashchange", o.onHashChange), o.pushState = function(e, n, i, r) {
if (i = encodeURI(i).replace(/%25/g, "%"), o.getHashByUrl(i)) throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
if (r !== !1 && o.busy()) return o.pushQueue({
scope:o,
callback:o.pushState,
args:arguments,
queue:r
}), !1;
o.busy(!0);
var s = o.createStateObject(e, n, i), a = o.getHashByState(s), u = o.getState(!1), l = o.getHashByState(u), c = o.getHash(), h = o.expectedStateId == s.id;
return o.storeState(s), o.expectedStateId = s.id, o.recycleState(s), o.setTitle(s), 
a === l ? (o.busy(!1), !1) :(o.saveState(s), h || o.Adapter.trigger(t, "statechange"), 
o.isHashEqual(a, c) || o.isHashEqual(a, o.getShortUrl(o.getLocationHref())) || o.setHash(a, !1), 
o.busy(!1), !0);
}, o.replaceState = function(e, n, i, r) {
if (i = encodeURI(i).replace(/%25/g, "%"), o.getHashByUrl(i)) throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
if (r !== !1 && o.busy()) return o.pushQueue({
scope:o,
callback:o.replaceState,
args:arguments,
queue:r
}), !1;
o.busy(!0);
var s = o.createStateObject(e, n, i), a = o.getHashByState(s), u = o.getState(!1), l = o.getHashByState(u), c = o.getStateByIndex(-2);
return o.discardState(u, s, c), a === l ? (o.storeState(s), o.expectedStateId = s.id, 
o.recycleState(s), o.setTitle(s), o.saveState(s), o.Adapter.trigger(t, "statechange"), 
o.busy(!1)) :o.pushState(s.data, s.title, s.url, !1), !0;
}), void (o.emulated.pushState && o.getHash() && !o.emulated.hashChange && o.Adapter.onDomLoad(function() {
o.Adapter.trigger(t, "hashchange");
})));
}, "undefined" != typeof o.init && o.init();
}(window), function(t, e) {
"use strict";
var n = t.console || e, i = t.document, r = t.navigator, o = !1, s = t.setTimeout, a = t.clearTimeout, u = t.setInterval, l = t.clearInterval, c = t.JSON, h = t.alert, d = t.History = t.History || {}, f = t.history;
try {
o = t.sessionStorage, o.setItem("TEST", "1"), o.removeItem("TEST");
} catch (p) {
o = !1;
}
if (c.stringify = c.stringify || c.encode, c.parse = c.parse || c.decode, "undefined" != typeof d.init) throw new Error("History.js Core has already been loaded...");
d.init = function() {
return "undefined" == typeof d.Adapter ? !1 :("undefined" != typeof d.initCore && d.initCore(), 
"undefined" != typeof d.initHtml4 && d.initHtml4(), !0);
}, d.initCore = function() {
if ("undefined" != typeof d.initCore.initialized) return !1;
if (d.initCore.initialized = !0, d.options = d.options || {}, d.options.hashChangeInterval = d.options.hashChangeInterval || 100, 
d.options.safariPollInterval = d.options.safariPollInterval || 500, d.options.doubleCheckInterval = d.options.doubleCheckInterval || 500, 
d.options.disableSuid = d.options.disableSuid || !1, d.options.storeInterval = d.options.storeInterval || 1e3, 
d.options.busyDelay = d.options.busyDelay || 250, d.options.debug = d.options.debug || !1, 
d.options.initialTitle = d.options.initialTitle || i.title, d.options.html4Mode = d.options.html4Mode || !1, 
d.options.delayInit = d.options.delayInit || !1, d.intervalList = [], d.clearAllIntervals = function() {
var t, e = d.intervalList;
if ("undefined" != typeof e && null !== e) {
for (t = 0; t < e.length; t++) l(e[t]);
d.intervalList = null;
}
}, d.debug = function() {
d.options.debug && d.log.apply(d, arguments);
}, d.log = function() {
var t, e, r, o, s, a = !("undefined" == typeof n || "undefined" == typeof n.log || "undefined" == typeof n.log.apply), u = i.getElementById("log");
for (a ? (o = Array.prototype.slice.call(arguments), t = o.shift(), "undefined" != typeof n.debug ? n.debug.apply(n, [ t, o ]) :n.log.apply(n, [ t, o ])) :t = "\n" + arguments[0] + "\n", 
e = 1, r = arguments.length; r > e; ++e) {
if (s = arguments[e], "object" == typeof s && "undefined" != typeof c) try {
s = c.stringify(s);
} catch (l) {}
t += "\n" + s + "\n";
}
return u ? (u.value += t + "\n-----\n", u.scrollTop = u.scrollHeight - u.clientHeight) :a || h(t), 
!0;
}, d.getInternetExplorerMajorVersion = function() {
var t = d.getInternetExplorerMajorVersion.cached = "undefined" != typeof d.getInternetExplorerMajorVersion.cached ? d.getInternetExplorerMajorVersion.cached :function() {
for (var t = 3, e = i.createElement("div"), n = e.getElementsByTagName("i"); (e.innerHTML = "<!--[if gt IE " + ++t + "]><i></i><![endif]-->") && n[0]; ) ;
return t > 4 ? t :!1;
}();
return t;
}, d.isInternetExplorer = function() {
var t = d.isInternetExplorer.cached = "undefined" != typeof d.isInternetExplorer.cached ? d.isInternetExplorer.cached :Boolean(d.getInternetExplorerMajorVersion());
return t;
}, d.emulated = d.options.html4Mode ? {
pushState:!0,
hashChange:!0
} :{
pushState:!Boolean(t.history && t.history.pushState && t.history.replaceState && !(/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(r.userAgent) || /AppleWebKit\/5([0-2]|3[0-2])/i.test(r.userAgent))),
hashChange:Boolean(!("onhashchange" in t || "onhashchange" in i) || d.isInternetExplorer() && d.getInternetExplorerMajorVersion() < 8)
}, d.enabled = !d.emulated.pushState, d.bugs = {
setHash:Boolean(!d.emulated.pushState && "Apple Computer, Inc." === r.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(r.userAgent)),
safariPoll:Boolean(!d.emulated.pushState && "Apple Computer, Inc." === r.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(r.userAgent)),
ieDoubleCheck:Boolean(d.isInternetExplorer() && d.getInternetExplorerMajorVersion() < 8),
hashEscape:Boolean(d.isInternetExplorer() && d.getInternetExplorerMajorVersion() < 7)
}, d.isEmptyObject = function(t) {
for (var e in t) if (t.hasOwnProperty(e)) return !1;
return !0;
}, d.cloneObject = function(t) {
var e, n;
return t ? (e = c.stringify(t), n = c.parse(e)) :n = {}, n;
}, d.getRootUrl = function() {
var t = i.location.protocol + "//" + (i.location.hostname || i.location.host);
return i.location.port && (t += ":" + i.location.port), t += "/";
}, d.getBaseHref = function() {
var t = i.getElementsByTagName("base"), e = null, n = "";
return 1 === t.length && (e = t[0], n = e.href.replace(/[^\/]+$/, "")), n = n.replace(/\/+$/, ""), 
n && (n += "/"), n;
}, d.getBaseUrl = function() {
var t = d.getBaseHref() || d.getBasePageUrl() || d.getRootUrl();
return t;
}, d.getPageUrl = function() {
var t, e = d.getState(!1, !1), n = (e || {}).url || d.getLocationHref();
return t = n.replace(/\/+$/, "").replace(/[^\/]+$/, function(t) {
return /\./.test(t) ? t :t + "/";
});
}, d.getBasePageUrl = function() {
var t = d.getLocationHref().replace(/[#\?].*/, "").replace(/[^\/]+$/, function(t) {
return /[^\/]$/.test(t) ? "" :t;
}).replace(/\/+$/, "") + "/";
return t;
}, d.getFullUrl = function(t, e) {
var n = t, i = t.substring(0, 1);
return e = "undefined" == typeof e ? !0 :e, /[a-z]+\:\/\//.test(t) || (n = "/" === i ? d.getRootUrl() + t.replace(/^\/+/, "") :"#" === i ? d.getPageUrl().replace(/#.*/, "") + t :"?" === i ? d.getPageUrl().replace(/[\?#].*/, "") + t :e ? d.getBaseUrl() + t.replace(/^(\.\/)+/, "") :d.getBasePageUrl() + t.replace(/^(\.\/)+/, "")), 
n.replace(/\#$/, "");
}, d.getShortUrl = function(t) {
var e = t, n = d.getBaseUrl(), i = d.getRootUrl();
return d.emulated.pushState && (e = e.replace(n, "")), e = e.replace(i, "/"), d.isTraditionalAnchor(e) && (e = "./" + e), 
e = e.replace(/^(\.\/)+/g, "./").replace(/\#$/, "");
}, d.getLocationHref = function(t) {
return t = t || i, t.URL === t.location.href ? t.location.href :t.location.href === decodeURIComponent(t.URL) ? t.URL :t.location.hash && decodeURIComponent(t.location.href.replace(/^[^#]+/, "")) === t.location.hash ? t.location.href :-1 == t.URL.indexOf("#") && -1 != t.location.href.indexOf("#") ? t.location.href :t.URL || t.location.href;
}, d.store = {}, d.idToState = d.idToState || {}, d.stateToId = d.stateToId || {}, 
d.urlToId = d.urlToId || {}, d.storedStates = d.storedStates || [], d.savedStates = d.savedStates || [], 
d.normalizeStore = function() {
d.store.idToState = d.store.idToState || {}, d.store.urlToId = d.store.urlToId || {}, 
d.store.stateToId = d.store.stateToId || {};
}, d.getState = function(t, e) {
"undefined" == typeof t && (t = !0), "undefined" == typeof e && (e = !0);
var n = d.getLastSavedState();
return !n && e && (n = d.createStateObject()), t && (n = d.cloneObject(n), n.url = n.cleanUrl || n.url), 
n;
}, d.getIdByState = function(t) {
var e, n = d.extractId(t.url);
if (!n) if (e = d.getStateString(t), "undefined" != typeof d.stateToId[e]) n = d.stateToId[e]; else if ("undefined" != typeof d.store.stateToId[e]) n = d.store.stateToId[e]; else {
for (;;) if (n = new Date().getTime() + String(Math.random()).replace(/\D/g, ""), 
"undefined" == typeof d.idToState[n] && "undefined" == typeof d.store.idToState[n]) break;
d.stateToId[e] = n, d.idToState[n] = t;
}
return n;
}, d.normalizeState = function(t) {
var e, n;
return t && "object" == typeof t || (t = {}), "undefined" != typeof t.normalized ? t :(t.data && "object" == typeof t.data || (t.data = {}), 
e = {}, e.normalized = !0, e.title = t.title || "", e.url = d.getFullUrl(t.url ? t.url :d.getLocationHref()), 
e.hash = d.getShortUrl(e.url), e.data = d.cloneObject(t.data), e.id = d.getIdByState(e), 
e.cleanUrl = e.url.replace(/\??\&_suid.*/, ""), e.url = e.cleanUrl, n = !d.isEmptyObject(e.data), 
(e.title || n) && d.options.disableSuid !== !0 && (e.hash = d.getShortUrl(e.url).replace(/\??\&_suid.*/, ""), 
/\?/.test(e.hash) || (e.hash += "?"), e.hash += "&_suid=" + e.id), e.hashedUrl = d.getFullUrl(e.hash), 
(d.emulated.pushState || d.bugs.safariPoll) && d.hasUrlDuplicate(e) && (e.url = e.hashedUrl), 
e);
}, d.createStateObject = function(t, e, n) {
var i = {
data:t,
title:e,
url:n
};
return i = d.normalizeState(i);
}, d.getStateById = function(t) {
t = String(t);
var n = d.idToState[t] || d.store.idToState[t] || e;
return n;
}, d.getStateString = function(t) {
var e, n, i;
return e = d.normalizeState(t), n = {
data:e.data,
title:t.title,
url:t.url
}, i = c.stringify(n);
}, d.getStateId = function(t) {
var e, n;
return e = d.normalizeState(t), n = e.id;
}, d.getHashByState = function(t) {
var e, n;
return e = d.normalizeState(t), n = e.hash;
}, d.extractId = function(t) {
var e, n, i, r;
return r = -1 != t.indexOf("#") ? t.split("#")[0] :t, n = /(.*)\&_suid=([0-9]+)$/.exec(r), 
i = n ? n[1] || t :t, e = n ? String(n[2] || "") :"", e || !1;
}, d.isTraditionalAnchor = function(t) {
var e = !/[\/\?\.]/.test(t);
return e;
}, d.extractState = function(t, e) {
var n, i, r = null;
return e = e || !1, n = d.extractId(t), n && (r = d.getStateById(n)), r || (i = d.getFullUrl(t), 
n = d.getIdByUrl(i) || !1, n && (r = d.getStateById(n)), r || !e || d.isTraditionalAnchor(t) || (r = d.createStateObject(null, null, i))), 
r;
}, d.getIdByUrl = function(t) {
var n = d.urlToId[t] || d.store.urlToId[t] || e;
return n;
}, d.getLastSavedState = function() {
return d.savedStates[d.savedStates.length - 1] || e;
}, d.getLastStoredState = function() {
return d.storedStates[d.storedStates.length - 1] || e;
}, d.hasUrlDuplicate = function(t) {
var e, n = !1;
return e = d.extractState(t.url), n = e && e.id !== t.id;
}, d.storeState = function(t) {
return d.urlToId[t.url] = t.id, d.storedStates.push(d.cloneObject(t)), t;
}, d.isLastSavedState = function(t) {
var e, n, i, r = !1;
return d.savedStates.length && (e = t.id, n = d.getLastSavedState(), i = n.id, r = e === i), 
r;
}, d.saveState = function(t) {
return d.isLastSavedState(t) ? !1 :(d.savedStates.push(d.cloneObject(t)), !0);
}, d.getStateByIndex = function(t) {
var e = null;
return e = "undefined" == typeof t ? d.savedStates[d.savedStates.length - 1] :0 > t ? d.savedStates[d.savedStates.length + t] :d.savedStates[t];
}, d.getCurrentIndex = function() {
var t = null;
return t = d.savedStates.length < 1 ? 0 :d.savedStates.length - 1;
}, d.getHash = function(t) {
var e, n = d.getLocationHref(t);
return e = d.getHashByUrl(n);
}, d.unescapeHash = function(t) {
var e = d.normalizeHash(t);
return e = decodeURIComponent(e);
}, d.normalizeHash = function(t) {
var e = t.replace(/[^#]*#/, "").replace(/#.*/, "");
return e;
}, d.setHash = function(t, e) {
var n, r;
return e !== !1 && d.busy() ? (d.pushQueue({
scope:d,
callback:d.setHash,
args:arguments,
queue:e
}), !1) :(d.busy(!0), n = d.extractState(t, !0), n && !d.emulated.pushState ? d.pushState(n.data, n.title, n.url, !1) :d.getHash() !== t && (d.bugs.setHash ? (r = d.getPageUrl(), 
d.pushState(null, null, r + "#" + t, !1)) :i.location.hash = t), d);
}, d.escapeHash = function(e) {
var n = d.normalizeHash(e);
return n = t.encodeURIComponent(n), d.bugs.hashEscape || (n = n.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")), 
n;
}, d.getHashByUrl = function(t) {
var e = String(t).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
return e = d.unescapeHash(e);
}, d.setTitle = function(t) {
var e, n = t.title;
n || (e = d.getStateByIndex(0), e && e.url === t.url && (n = e.title || d.options.initialTitle));
try {
i.getElementsByTagName("title")[0].innerHTML = n.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ");
} catch (r) {}
return i.title = n, d;
}, d.queues = [], d.busy = function(t) {
if ("undefined" != typeof t ? d.busy.flag = t :"undefined" == typeof d.busy.flag && (d.busy.flag = !1), 
!d.busy.flag) {
a(d.busy.timeout);
var e = function() {
var t, n, i;
if (!d.busy.flag) for (t = d.queues.length - 1; t >= 0; --t) n = d.queues[t], 0 !== n.length && (i = n.shift(), 
d.fireQueueItem(i), d.busy.timeout = s(e, d.options.busyDelay));
};
d.busy.timeout = s(e, d.options.busyDelay);
}
return d.busy.flag;
}, d.busy.flag = !1, d.fireQueueItem = function(t) {
return t.callback.apply(t.scope || d, t.args || []);
}, d.pushQueue = function(t) {
return d.queues[t.queue || 0] = d.queues[t.queue || 0] || [], d.queues[t.queue || 0].push(t), 
d;
}, d.queue = function(t, e) {
return "function" == typeof t && (t = {
callback:t
}), "undefined" != typeof e && (t.queue = e), d.busy() ? d.pushQueue(t) :d.fireQueueItem(t), 
d;
}, d.clearQueue = function() {
return d.busy.flag = !1, d.queues = [], d;
}, d.stateChanged = !1, d.doubleChecker = !1, d.doubleCheckComplete = function() {
return d.stateChanged = !0, d.doubleCheckClear(), d;
}, d.doubleCheckClear = function() {
return d.doubleChecker && (a(d.doubleChecker), d.doubleChecker = !1), d;
}, d.doubleCheck = function(t) {
return d.stateChanged = !1, d.doubleCheckClear(), d.bugs.ieDoubleCheck && (d.doubleChecker = s(function() {
return d.doubleCheckClear(), d.stateChanged || t(), !0;
}, d.options.doubleCheckInterval)), d;
}, d.safariStatePoll = function() {
var e, n = d.extractState(d.getLocationHref());
if (!d.isLastSavedState(n)) return e = n, e || (e = d.createStateObject()), d.Adapter.trigger(t, "popstate"), 
d;
}, d.back = function(t) {
return t !== !1 && d.busy() ? (d.pushQueue({
scope:d,
callback:d.back,
args:arguments,
queue:t
}), !1) :(d.busy(!0), d.doubleCheck(function() {
d.back(!1);
}), f.go(-1), !0);
}, d.forward = function(t) {
return t !== !1 && d.busy() ? (d.pushQueue({
scope:d,
callback:d.forward,
args:arguments,
queue:t
}), !1) :(d.busy(!0), d.doubleCheck(function() {
d.forward(!1);
}), f.go(1), !0);
}, d.go = function(t, e) {
var n;
if (t > 0) for (n = 1; t >= n; ++n) d.forward(e); else {
if (!(0 > t)) throw new Error("History.go: History.go requires a positive or negative integer passed.");
for (n = -1; n >= t; --n) d.back(e);
}
return d;
}, d.emulated.pushState) {
var p = function() {};
d.pushState = d.pushState || p, d.replaceState = d.replaceState || p;
} else d.onPopState = function(e, n) {
var i, r, o = !1, s = !1;
return d.doubleCheckComplete(), (i = d.getHash()) ? (r = d.extractState(i || d.getLocationHref(), !0), 
r ? d.replaceState(r.data, r.title, r.url, !1) :(d.Adapter.trigger(t, "anchorchange"), 
d.busy(!1)), d.expectedStateId = !1, !1) :(o = d.Adapter.extractEventData("state", e, n) || !1, 
s = o ? d.getStateById(o) :d.expectedStateId ? d.getStateById(d.expectedStateId) :d.extractState(d.getLocationHref()), 
s || (s = d.createStateObject(null, null, d.getLocationHref())), d.expectedStateId = !1, 
d.isLastSavedState(s) ? (d.busy(!1), !1) :(d.storeState(s), d.saveState(s), d.setTitle(s), 
d.Adapter.trigger(t, "statechange"), d.busy(!1), !0));
}, d.Adapter.bind(t, "popstate", d.onPopState), d.pushState = function(e, n, i, r) {
if (d.getHashByUrl(i) && d.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
if (r !== !1 && d.busy()) return d.pushQueue({
scope:d,
callback:d.pushState,
args:arguments,
queue:r
}), !1;
d.busy(!0);
var o = d.createStateObject(e, n, i);
return d.isLastSavedState(o) ? d.busy(!1) :(d.storeState(o), d.expectedStateId = o.id, 
f.pushState(o.id, o.title, o.url), d.Adapter.trigger(t, "popstate")), !0;
}, d.replaceState = function(e, n, i, r) {
if (d.getHashByUrl(i) && d.emulated.pushState) throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
if (r !== !1 && d.busy()) return d.pushQueue({
scope:d,
callback:d.replaceState,
args:arguments,
queue:r
}), !1;
d.busy(!0);
var o = d.createStateObject(e, n, i);
return d.isLastSavedState(o) ? d.busy(!1) :(d.storeState(o), d.expectedStateId = o.id, 
f.replaceState(o.id, o.title, o.url), d.Adapter.trigger(t, "popstate")), !0;
};
if (o) {
try {
d.store = c.parse(o.getItem("History.store")) || {};
} catch (m) {
d.store = {};
}
d.normalizeStore();
} else d.store = {}, d.normalizeStore();
d.Adapter.bind(t, "unload", d.clearAllIntervals), d.saveState(d.storeState(d.extractState(d.getLocationHref(), !0))), 
o && (d.onUnload = function() {
var t, e, n;
try {
t = c.parse(o.getItem("History.store")) || {};
} catch (i) {
t = {};
}
t.idToState = t.idToState || {}, t.urlToId = t.urlToId || {}, t.stateToId = t.stateToId || {};
for (e in d.idToState) d.idToState.hasOwnProperty(e) && (t.idToState[e] = d.idToState[e]);
for (e in d.urlToId) d.urlToId.hasOwnProperty(e) && (t.urlToId[e] = d.urlToId[e]);
for (e in d.stateToId) d.stateToId.hasOwnProperty(e) && (t.stateToId[e] = d.stateToId[e]);
d.store = t, d.normalizeStore(), n = c.stringify(t);
try {
o.setItem("History.store", n);
} catch (r) {
if (r.code !== DOMException.QUOTA_EXCEEDED_ERR) throw r;
o.length && (o.removeItem("History.store"), o.setItem("History.store", n));
}
}, d.intervalList.push(u(d.onUnload, d.options.storeInterval)), d.Adapter.bind(t, "beforeunload", d.onUnload), 
d.Adapter.bind(t, "unload", d.onUnload)), d.emulated.pushState || (d.bugs.safariPoll && d.intervalList.push(u(d.safariStatePoll, d.options.safariPollInterval)), 
("Apple Computer, Inc." === r.vendor || "Mozilla" === (r.appCodeName || "")) && (d.Adapter.bind(t, "hashchange", function() {
d.Adapter.trigger(t, "popstate");
}), d.getHash() && d.Adapter.onDomLoad(function() {
d.Adapter.trigger(t, "hashchange");
})));
}, d.options && d.options.delayInit || d.init();
}(window), function(t, e) {
var n = e(t, t.document);
t.lazySizes = n, "object" == typeof module && module.exports ? module.exports = n :"function" == typeof define && define.amd && define(n);
}(window, function(t, e) {
"use strict";
if (e.getElementsByClassName) {
var n, i = e.documentElement, r = t.HTMLPictureElement && "sizes" in e.createElement("img"), o = "addEventListener", s = t[o], a = t.setTimeout, u = t.requestAnimationFrame || a, l = /^picture$/i, c = [ "load", "error", "lazyincluded", "_lazyloaded" ], h = {}, d = Array.prototype.forEach, f = function(t, e) {
return h[e] || (h[e] = new RegExp("(\\s|^)" + e + "(\\s|$)")), h[e].test(t.className) && h[e];
}, p = function(t, e) {
f(t, e) || (t.className = t.className.trim() + " " + e);
}, m = function(t, e) {
var n;
(n = f(t, e)) && (t.className = t.className.replace(n, " "));
}, g = function(t, e, n) {
var i = n ? o :"removeEventListener";
n && g(t, e), c.forEach(function(n) {
t[i](n, e);
});
}, v = function(t, n, i, r, o) {
var s = e.createEvent("CustomEvent");
return s.initCustomEvent(n, !r, !o, i || {}), t.dispatchEvent(s), s;
}, y = function(e, i) {
var o;
!r && (o = t.picturefill || n.pf) ? o({
reevaluate:!0,
elements:[ e ]
}) :i && i.src && (e.src = i.src);
}, _ = function(t, e) {
return (getComputedStyle(t, null) || {})[e];
}, b = function(t, e, i) {
for (i = i || t.offsetWidth; i < n.minSize && e && !t._lazysizesWidth; ) i = e.offsetWidth, 
e = e.parentNode;
return i;
}, w = function(e) {
var n, i = 0, r = t.Date, o = function() {
n = !1, i = r.now(), e();
}, s = function() {
a(o);
}, l = function() {
u(s);
};
return function() {
if (!n) {
var t = 125 - (r.now() - i);
n = !0, 6 > t && (t = 6), a(l, t);
}
};
}, x = function() {
var r, c, h, b, x, k, C, T, E, D, M, O, I, j, A = /^img$/i, L = /^iframe$/i, z = "onscroll" in t && !/glebot/.test(navigator.userAgent), P = 0, H = 0, N = 0, R = 0, $ = function(t) {
N--, t && t.target && g(t.target, $), (!t || 0 > N || !t.target) && (N = 0);
}, F = function(t, e) {
var n, i = t, r = "hidden" != _(t, "visibility");
for (E -= e, O += e, D -= e, M += e; r && (i = i.offsetParent); ) r = (_(i, "opacity") || 1) > 0, 
r && "visible" != _(i, "overflow") && (n = i.getBoundingClientRect(), r = M > n.left && D < n.right && O > n.top - 1 && E < n.bottom + 1);
return r;
}, q = function() {
var t, e, i, o, s, a, u, l, d;
if ((x = n.loadMode) && 8 > N && (t = r.length)) {
for (e = 0, R++, j > H && 1 > N && R > 3 && x > 2 ? (H = j, R = 0) :H = x > 1 && R > 2 && 6 > N ? I :P; t > e; e++) if (r[e] && !r[e]._lazyRace) if (z) if ((l = r[e].getAttribute("data-expand")) && (a = 1 * l) || (a = H), 
d !== a && (C = innerWidth + a, T = innerHeight + a, u = -1 * a, d = a), i = r[e].getBoundingClientRect(), 
(O = i.bottom) >= u && (E = i.top) <= T && (M = i.right) >= u && (D = i.left) <= C && (O || M || D || E) && (h && 3 > N && !l && (3 > x || 4 > R) || F(r[e], a))) {
if (G(r[e]), s = !0, N > 9) break;
N > 6 && (H = P);
} else !s && h && !o && 4 > N && 4 > R && x > 2 && (c[0] || n.preloadAfterLoad) && (c[0] || !l && (O || M || D || E || "auto" != r[e].getAttribute(n.sizesAttr))) && (o = c[0] || r[e]); else G(r[e]);
o && !s && G(o);
}
}, U = w(q), B = function(t) {
p(t.target, n.loadedClass), m(t.target, n.loadingClass), g(t.target, B);
}, Y = function(t, e) {
try {
t.contentWindow.location.replace(e);
} catch (n) {
t.src = e;
}
}, W = function(t) {
var e, i, r = t.getAttribute(n.srcsetAttr);
(e = n.customMedia[t.getAttribute("data-media") || t.getAttribute("media")]) && t.setAttribute("media", e), 
r && t.setAttribute("srcset", r), e && (i = t.parentNode, i.insertBefore(t.cloneNode(), t), 
i.removeChild(t));
}, V = function() {
var t, e = [], n = function() {
for (;e.length; ) e.shift()();
t = !1;
};
return function(i) {
e.push(i), t || (t = !0, u(n));
};
}(), G = function(t) {
var e, i, r, o, s, u, c, _ = A.test(t.nodeName), w = _ && (t.getAttribute(n.sizesAttr) || t.getAttribute("sizes")), x = "auto" == w;
(!x && h || !_ || !t.src && !t.srcset || t.complete || f(t, n.errorClass)) && (x && (c = t.offsetWidth), 
t._lazyRace = !0, N++, V(function() {
t._lazyRace && delete t._lazyRace, m(t, n.lazyClass), (s = v(t, "lazybeforeunveil")).defaultPrevented || (w && (x ? (p(t, n.autosizesClass), 
S.updateElem(t, !0, c)) :t.setAttribute("sizes", w)), i = t.getAttribute(n.srcsetAttr), 
e = t.getAttribute(n.srcAttr), _ && (r = t.parentNode, o = r && l.test(r.nodeName || "")), 
u = s.detail.firesLoad || "src" in t && (i || e || o), s = {
target:t
}, u && (g(t, $, !0), clearTimeout(b), b = a($, 2500), p(t, n.loadingClass), g(t, B, !0)), 
o && d.call(r.getElementsByTagName("source"), W), i ? t.setAttribute("srcset", i) :e && !o && (L.test(t.nodeName) ? Y(t, e) :t.src = e), 
(i || o) && y(t, {
src:e
})), (!u || t.complete) && (u ? $(s) :N--, B(s));
}));
}, X = function() {
if (!h) {
if (Date.now() - k < 999) return void a(X, 999);
var t, e = function() {
n.loadMode = 3, U();
};
h = !0, n.loadMode = 3, N || U(), s("scroll", function() {
3 == n.loadMode && (n.loadMode = 2), clearTimeout(t), t = a(e, 99);
}, !0);
}
};
return {
_:function() {
k = Date.now(), r = e.getElementsByClassName(n.lazyClass), c = e.getElementsByClassName(n.lazyClass + " " + n.preloadClass), 
I = n.expand, j = I * n.expFactor, s("scroll", U, !0), s("resize", U, !0), t.MutationObserver ? new MutationObserver(U).observe(i, {
childList:!0,
subtree:!0,
attributes:!0
}) :(i[o]("DOMNodeInserted", U, !0), i[o]("DOMAttrModified", U, !0), setInterval(U, 999)), 
s("hashchange", U, !0), [ "focus", "mouseover", "click", "load", "transitionend", "animationend", "webkitAnimationEnd" ].forEach(function(t) {
e[o](t, U, !0);
}), /d$|^c/.test(e.readyState) ? X() :(s("load", X), e[o]("DOMContentLoaded", U), 
a(X, 2e4)), U(r.length > 0);
},
checkElems:U,
unveil:G
};
}(), S = function() {
var t, i = function(t, e, n) {
var i, r, o, s, a = t.parentNode;
if (a && (n = b(t, a, n), s = v(t, "lazybeforesizes", {
width:n,
dataAttr:!!e
}), !s.defaultPrevented && (n = s.detail.width, n && n !== t._lazysizesWidth))) {
if (t._lazysizesWidth = n, n += "px", t.setAttribute("sizes", n), l.test(a.nodeName || "")) for (i = a.getElementsByTagName("source"), 
r = 0, o = i.length; o > r; r++) i[r].setAttribute("sizes", n);
s.detail.dataAttr || y(t, s.detail);
}
}, r = function() {
var e, n = t.length;
if (n) for (e = 0; n > e; e++) i(t[e]);
}, o = w(r);
return {
_:function() {
t = e.getElementsByClassName(n.autosizesClass), s("resize", o);
},
checkElems:o,
updateElem:i
};
}(), k = function() {
k.i || (k.i = !0, S._(), x._());
};
return function() {
var e, r = {
lazyClass:"lazyload",
loadedClass:"lazyloaded",
loadingClass:"lazyloading",
preloadClass:"lazypreload",
errorClass:"lazyerror",
autosizesClass:"lazyautosizes",
srcAttr:"data-src",
srcsetAttr:"data-srcset",
sizesAttr:"data-sizes",
minSize:40,
customMedia:{},
init:!0,
expFactor:1.7,
expand:i.clientHeight > 630 ? i.clientWidth > 890 ? 500 :410 :359,
loadMode:2
};
n = t.lazySizesConfig || t.lazysizesConfig || {};
for (e in r) e in n || (n[e] = r[e]);
t.lazySizesConfig = n, a(function() {
n.init && k();
});
}(), {
cfg:n,
autoSizer:S,
loader:x,
init:k,
uP:y,
aC:p,
rC:m,
hC:f,
fire:v,
gW:b
};
}
}), function(t, e) {
"use strict";
function n(t, n) {
if (!r[t]) {
var i = e.createElement(n ? "link" :"script"), o = e.getElementsByTagName("script")[0];
n ? (i.rel = "stylesheet", i.href = t) :i.src = t, r[t] = !0, r[i.src || i.href] = !0, 
o.parentNode.insertBefore(i, o);
}
}
var i, r = {};
e.addEventListener && (i = function(t, n) {
var i = e.createElement("img");
i.onload = function() {
i.onload = null, i.onerror = null, i = null, n();
}, i.onerror = i.onload, i.src = t, i && i.complete && i.onload && i.onload();
}, addEventListener("lazybeforeunveil", function(e) {
var r, o, s, a;
e.defaultPrevented || ("none" == e.target.preload && (e.target.preload = "auto"), 
r = e.target.getAttribute("data-link"), r && n(r, !0), r = e.target.getAttribute("data-script"), 
r && n(r), r = e.target.getAttribute("data-require"), r && t.require && require([ r ]), 
s = e.target.getAttribute("data-bg"), s && (e.detail.firesLoad = !0, o = function() {
e.target.style.backgroundImage = "url(" + s + ")", e.detail.firesLoad = !1, lazySizes.fire(e.target, "_lazyloaded", {}, !0, !0);
}, i(s, o)), a = e.target.getAttribute("data-poster"), a && (e.detail.firesLoad = !0, 
o = function() {
e.target.poster = a, e.detail.firesLoad = !1, lazySizes.fire(e.target, "_lazyloaded", {}, !0, !0);
}, i(a, o)));
}, !1));
}(window, document), function(t) {
"function" == typeof define && define.amd ? define([], t) :"object" == typeof exports ? module.exports = t() :window.noUiSlider = t();
}(function() {
"use strict";
function t(t) {
return t.filter(function(t) {
return this[t] ? !1 :this[t] = !0;
}, {});
}
function e(t, e) {
return Math.round(t / e) * e;
}
function n(t) {
var e = t.getBoundingClientRect(), n = t.ownerDocument, i = n.documentElement, r = h();
return /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (r.x = 0), {
top:e.top + r.y - i.clientTop,
left:e.left + r.x - i.clientLeft
};
}
function i(t) {
return "number" == typeof t && !isNaN(t) && isFinite(t);
}
function r(t, e, n) {
u(t, e), setTimeout(function() {
l(t, e);
}, n);
}
function o(t) {
return Math.max(Math.min(t, 100), 0);
}
function s(t) {
return Array.isArray(t) ? t :[ t ];
}
function a(t) {
var e = t.split(".");
return e.length > 1 ? e[1].length :0;
}
function u(t, e) {
t.classList ? t.classList.add(e) :t.className += " " + e;
}
function l(t, e) {
t.classList ? t.classList.remove(e) :t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " ");
}
function c(t, e) {
return t.classList ? t.classList.contains(e) :new RegExp("\\b" + e + "\\b").test(t.className);
}
function h() {
var t = void 0 !== window.pageXOffset, e = "CSS1Compat" === (document.compatMode || ""), n = t ? window.pageXOffset :e ? document.documentElement.scrollLeft :document.body.scrollLeft, i = t ? window.pageYOffset :e ? document.documentElement.scrollTop :document.body.scrollTop;
return {
x:n,
y:i
};
}
function d() {
return window.navigator.pointerEnabled ? {
start:"pointerdown",
move:"pointermove",
end:"pointerup"
} :window.navigator.msPointerEnabled ? {
start:"MSPointerDown",
move:"MSPointerMove",
end:"MSPointerUp"
} :{
start:"mousedown touchstart",
move:"mousemove touchmove",
end:"mouseup touchend"
};
}
function f(t, e) {
return 100 / (e - t);
}
function p(t, e) {
return 100 * e / (t[1] - t[0]);
}
function m(t, e) {
return p(t, t[0] < 0 ? e + Math.abs(t[0]) :e - t[0]);
}
function g(t, e) {
return e * (t[1] - t[0]) / 100 + t[0];
}
function v(t, e) {
for (var n = 1; t >= e[n]; ) n += 1;
return n;
}
function y(t, e, n) {
if (n >= t.slice(-1)[0]) return 100;
var i, r, o, s, a = v(n, t);
return i = t[a - 1], r = t[a], o = e[a - 1], s = e[a], o + m([ i, r ], n) / f(o, s);
}
function _(t, e, n) {
if (n >= 100) return t.slice(-1)[0];
var i, r, o, s, a = v(n, e);
return i = t[a - 1], r = t[a], o = e[a - 1], s = e[a], g([ i, r ], (n - o) * f(o, s));
}
function b(t, n, i, r) {
if (100 === r) return r;
var o, s, a = v(r, t);
return i ? (o = t[a - 1], s = t[a], r - o > (s - o) / 2 ? s :o) :n[a - 1] ? t[a - 1] + e(r - t[a - 1], n[a - 1]) :r;
}
function w(t, e, n) {
var r;
if ("number" == typeof e && (e = [ e ]), "[object Array]" !== Object.prototype.toString.call(e)) throw new Error("noUiSlider: 'range' contains invalid value.");
if (r = "min" === t ? 0 :"max" === t ? 100 :parseFloat(t), !i(r) || !i(e[0])) throw new Error("noUiSlider: 'range' value isn't numeric.");
n.xPct.push(r), n.xVal.push(e[0]), r ? n.xSteps.push(isNaN(e[1]) ? !1 :e[1]) :isNaN(e[1]) || (n.xSteps[0] = e[1]);
}
function x(t, e, n) {
return e ? void (n.xSteps[t] = p([ n.xVal[t], n.xVal[t + 1] ], e) / f(n.xPct[t], n.xPct[t + 1])) :!0;
}
function S(t, e, n, i) {
this.xPct = [], this.xVal = [], this.xSteps = [ i || !1 ], this.xNumSteps = [ !1 ], 
this.snap = e, this.direction = n;
var r, o = [];
for (r in t) t.hasOwnProperty(r) && o.push([ t[r], r ]);
for (o.sort(o.length && "object" == typeof o[0][0] ? function(t, e) {
return t[0][0] - e[0][0];
} :function(t, e) {
return t[0] - e[0];
}), r = 0; r < o.length; r++) w(o[r][1], o[r][0], this);
for (this.xNumSteps = this.xSteps.slice(0), r = 0; r < this.xNumSteps.length; r++) x(r, this.xNumSteps[r], this);
}
function k(t, e) {
if (!i(e)) throw new Error("noUiSlider: 'step' is not numeric.");
t.singleStep = e;
}
function C(t, e) {
if ("object" != typeof e || Array.isArray(e)) throw new Error("noUiSlider: 'range' is not an object.");
if (void 0 === e.min || void 0 === e.max) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
if (e.min === e.max) throw new Error("noUiSlider: 'range' 'min' and 'max' cannot be equal.");
t.spectrum = new S(e, t.snap, t.dir, t.singleStep);
}
function T(t, e) {
if (e = s(e), !Array.isArray(e) || !e.length || e.length > 2) throw new Error("noUiSlider: 'start' option is incorrect.");
t.handles = e.length, t.start = e;
}
function E(t, e) {
if (t.snap = e, "boolean" != typeof e) throw new Error("noUiSlider: 'snap' option must be a boolean.");
}
function D(t, e) {
if (t.animate = e, "boolean" != typeof e) throw new Error("noUiSlider: 'animate' option must be a boolean.");
}
function M(t, e) {
if (t.animationDuration = e, "number" != typeof e) throw new Error("noUiSlider: 'animationDuration' option must be a number.");
}
function O(t, e) {
if ("lower" === e && 1 === t.handles) t.connect = 1; else if ("upper" === e && 1 === t.handles) t.connect = 2; else if (e === !0 && 2 === t.handles) t.connect = 3; else {
if (e !== !1) throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
t.connect = 0;
}
}
function I(t, e) {
switch (e) {
case "horizontal":
t.ort = 0;
break;

case "vertical":
t.ort = 1;
break;

default:
throw new Error("noUiSlider: 'orientation' option is invalid.");
}
}
function j(t, e) {
if (!i(e)) throw new Error("noUiSlider: 'margin' option must be numeric.");
if (0 !== e && (t.margin = t.spectrum.getMargin(e), !t.margin)) throw new Error("noUiSlider: 'margin' option is only supported on linear sliders.");
}
function A(t, e) {
if (!i(e)) throw new Error("noUiSlider: 'limit' option must be numeric.");
if (t.limit = t.spectrum.getMargin(e), !t.limit) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders.");
}
function L(t, e) {
switch (e) {
case "ltr":
t.dir = 0;
break;

case "rtl":
t.dir = 1, t.connect = [ 0, 2, 1, 3 ][t.connect];
break;

default:
throw new Error("noUiSlider: 'direction' option was not recognized.");
}
}
function z(t, e) {
if ("string" != typeof e) throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
var n = e.indexOf("tap") >= 0, i = e.indexOf("drag") >= 0, r = e.indexOf("fixed") >= 0, o = e.indexOf("snap") >= 0, s = e.indexOf("hover") >= 0;
if (i && !t.connect) throw new Error("noUiSlider: 'drag' behaviour must be used with 'connect': true.");
t.events = {
tap:n || o,
drag:i,
fixed:r,
snap:o,
hover:s
};
}
function P(t, e) {
var n;
if (e !== !1) if (e === !0) for (t.tooltips = [], n = 0; n < t.handles; n++) t.tooltips.push(!0); else {
if (t.tooltips = s(e), t.tooltips.length !== t.handles) throw new Error("noUiSlider: must pass a formatter for all handles.");
t.tooltips.forEach(function(t) {
if ("boolean" != typeof t && ("object" != typeof t || "function" != typeof t.to)) throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
});
}
}
function H(t, e) {
if (t.format = e, "function" == typeof e.to && "function" == typeof e.from) return !0;
throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
}
function N(t, e) {
if (void 0 !== e && "string" != typeof e && e !== !1) throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
t.cssPrefix = e;
}
function R(t, e) {
if (void 0 !== e && "object" != typeof e) throw new Error("noUiSlider: 'cssClasses' must be an object.");
if ("string" == typeof t.cssPrefix) {
t.cssClasses = {};
for (var n in e) e.hasOwnProperty(n) && (t.cssClasses[n] = t.cssPrefix + e[n]);
} else t.cssClasses = e;
}
function $(t) {
var e, n = {
margin:0,
limit:0,
animate:!0,
animationDuration:300,
format:U
};
e = {
step:{
r:!1,
t:k
},
start:{
r:!0,
t:T
},
connect:{
r:!0,
t:O
},
direction:{
r:!0,
t:L
},
snap:{
r:!1,
t:E
},
animate:{
r:!1,
t:D
},
animationDuration:{
r:!1,
t:M
},
range:{
r:!0,
t:C
},
orientation:{
r:!1,
t:I
},
margin:{
r:!1,
t:j
},
limit:{
r:!1,
t:A
},
behaviour:{
r:!0,
t:z
},
format:{
r:!1,
t:H
},
tooltips:{
r:!1,
t:P
},
cssPrefix:{
r:!1,
t:N
},
cssClasses:{
r:!1,
t:R
}
};
var i = {
connect:!1,
direction:"ltr",
behaviour:"tap",
orientation:"horizontal",
cssPrefix:"noUi-",
cssClasses:{
target:"target",
base:"base",
origin:"origin",
handle:"handle",
handleLower:"handle-lower",
handleUpper:"handle-upper",
horizontal:"horizontal",
vertical:"vertical",
background:"background",
connect:"connect",
ltr:"ltr",
rtl:"rtl",
draggable:"draggable",
drag:"state-drag",
tap:"state-tap",
active:"active",
stacking:"stacking",
tooltip:"tooltip",
pips:"pips",
pipsHorizontal:"pips-horizontal",
pipsVertical:"pips-vertical",
marker:"marker",
markerHorizontal:"marker-horizontal",
markerVertical:"marker-vertical",
markerNormal:"marker-normal",
markerLarge:"marker-large",
markerSub:"marker-sub",
value:"value",
valueHorizontal:"value-horizontal",
valueVertical:"value-vertical",
valueNormal:"value-normal",
valueLarge:"value-large",
valueSub:"value-sub"
}
};
return Object.keys(e).forEach(function(r) {
if (void 0 === t[r] && void 0 === i[r]) {
if (e[r].r) throw new Error("noUiSlider: '" + r + "' is required.");
return !0;
}
e[r].t(n, void 0 === t[r] ? i[r] :t[r]);
}), n.pips = t.pips, n.style = n.ort ? "top" :"left", n;
}
function F(e, i, f) {
function p(t, e, n) {
var i = t + e[0], r = t + e[1];
return n ? (0 > i && (r += Math.abs(i)), r > 100 && (i -= r - 100), [ o(i), o(r) ]) :[ i, r ];
}
function m(t, e) {
t.preventDefault();
var n, i, r = 0 === t.type.indexOf("touch"), o = 0 === t.type.indexOf("mouse"), s = 0 === t.type.indexOf("pointer"), a = t;
return 0 === t.type.indexOf("MSPointer") && (s = !0), r && (n = t.changedTouches[0].pageX, 
i = t.changedTouches[0].pageY), e = e || h(), (o || s) && (n = t.clientX + e.x, 
i = t.clientY + e.y), a.pageOffset = e, a.points = [ n, i ], a.cursor = o || s, 
a;
}
function g(t, e) {
var n = document.createElement("div"), r = document.createElement("div"), o = [ i.cssClasses.handleLower, i.cssClasses.handleUpper ];
return t && o.reverse(), u(r, i.cssClasses.handle), u(r, o[e]), u(n, i.cssClasses.origin), 
n.appendChild(r), n;
}
function v(t, e, n) {
switch (t) {
case 1:
u(e, i.cssClasses.connect), u(n[0], i.cssClasses.background);
break;

case 3:
u(n[1], i.cssClasses.background);

case 2:
u(n[0], i.cssClasses.connect);

case 0:
u(e, i.cssClasses.background);
}
}
function y(t, e, n) {
var i, r = [];
for (i = 0; t > i; i += 1) r.push(n.appendChild(g(e, i)));
return r;
}
function _(t, e, n) {
u(n, i.cssClasses.target), 0 === t ? u(n, i.cssClasses.ltr) :u(n, i.cssClasses.rtl), 
0 === e ? u(n, i.cssClasses.horizontal) :u(n, i.cssClasses.vertical);
var r = document.createElement("div");
return u(r, i.cssClasses.base), n.appendChild(r), r;
}
function b(t, e) {
if (!i.tooltips[e]) return !1;
var n = document.createElement("div");
return n.className = i.cssClasses.tooltip, t.firstChild.appendChild(n);
}
function w() {
i.dir && i.tooltips.reverse();
var t = G.map(b);
i.dir && (t.reverse(), i.tooltips.reverse()), B("update", function(e, n, r) {
t[n] && (t[n].innerHTML = i.tooltips[n] === !0 ? e[n] :i.tooltips[n].to(r[n]));
});
}
function x(t, e, n) {
if ("range" === t || "steps" === t) return Q.xVal;
if ("count" === t) {
var i, r = 100 / (e - 1), o = 0;
for (e = []; (i = o++ * r) <= 100; ) e.push(i);
t = "positions";
}
return "positions" === t ? e.map(function(t) {
return Q.fromStepping(n ? Q.getStep(t) :t);
}) :"values" === t ? n ? e.map(function(t) {
return Q.fromStepping(Q.getStep(Q.toStepping(t)));
}) :e :void 0;
}
function S(e, n, i) {
function r(t, e) {
return (t + e).toFixed(7) / 1;
}
var o = Q.direction, s = {}, a = Q.xVal[0], u = Q.xVal[Q.xVal.length - 1], l = !1, c = !1, h = 0;
return Q.direction = 0, i = t(i.slice().sort(function(t, e) {
return t - e;
})), i[0] !== a && (i.unshift(a), l = !0), i[i.length - 1] !== u && (i.push(u), 
c = !0), i.forEach(function(t, o) {
var a, u, d, f, p, m, g, v, y, _, b = t, w = i[o + 1];
if ("steps" === n && (a = Q.xNumSteps[o]), a || (a = w - b), b !== !1 && void 0 !== w) for (u = b; w >= u; u = r(u, a)) {
for (f = Q.toStepping(u), p = f - h, v = p / e, y = Math.round(v), _ = p / y, d = 1; y >= d; d += 1) m = h + d * _, 
s[m.toFixed(5)] = [ "x", 0 ];
g = i.indexOf(u) > -1 ? 1 :"steps" === n ? 2 :0, !o && l && (g = 0), u === w && c || (s[f.toFixed(5)] = [ u, g ]), 
h = f;
}
}), Q.direction = o, s;
}
function k(t, e, n) {
function r(t, e) {
var n = e === i.cssClasses.value, r = n ? d :f, o = n ? c :h;
return e + " " + r[i.ort] + " " + o[t];
}
function o(t, e, n) {
return 'class="' + r(n[1], e) + '" style="' + i.style + ": " + t + '%"';
}
function s(t, r) {
Q.direction && (t = 100 - t), r[1] = r[1] && e ? e(r[0], r[1]) :r[1], l += "<div " + o(t, i.cssClasses.marker, r) + "></div>", 
r[1] && (l += "<div " + o(t, i.cssClasses.value, r) + ">" + n.to(r[0]) + "</div>");
}
var a = document.createElement("div"), l = "", c = [ i.cssClasses.valueNormal, i.cssClasses.valueLarge, i.cssClasses.valueSub ], h = [ i.cssClasses.markerNormal, i.cssClasses.markerLarge, i.cssClasses.markerSub ], d = [ i.cssClasses.valueHorizontal, i.cssClasses.valueVertical ], f = [ i.cssClasses.markerHorizontal, i.cssClasses.markerVertical ];
return u(a, i.cssClasses.pips), u(a, 0 === i.ort ? i.cssClasses.pipsHorizontal :i.cssClasses.pipsVertical), 
Object.keys(t).forEach(function(e) {
s(e, t[e]);
}), a.innerHTML = l, a;
}
function C(t) {
var e = t.mode, n = t.density || 1, i = t.filter || !1, r = t.values || !1, o = t.stepped || !1, s = x(e, r, o), a = S(n, e, s), u = t.format || {
to:Math.round
};
return Z.appendChild(k(a, i, u));
}
function T() {
var t = V.getBoundingClientRect(), e = "offset" + [ "Width", "Height" ][i.ort];
return 0 === i.ort ? t.width || V[e] :t.height || V[e];
}
function E(t, e, n) {
var r;
for (r = 0; r < i.handles; r++) if (-1 === K[r]) return;
void 0 !== e && 1 !== i.handles && (e = Math.abs(e - i.dir)), Object.keys(ee).forEach(function(i) {
var r = i.split(".")[0];
t === r && ee[i].forEach(function(t) {
t.call(X, s(F()), e, s(D(Array.prototype.slice.call(te))), n || !1, K);
});
});
}
function D(t) {
return 1 === t.length ? t[0] :i.dir ? t.reverse() :t;
}
function M(t, e, n, r) {
var o = function(e) {
return Z.hasAttribute("disabled") ? !1 :c(Z, i.cssClasses.tap) ? !1 :(e = m(e, r.pageOffset), 
t === J.start && void 0 !== e.buttons && e.buttons > 1 ? !1 :r.hover && e.buttons ? !1 :(e.calcPoint = e.points[i.ort], 
void n(e, r)));
}, s = [];
return t.split(" ").forEach(function(t) {
e.addEventListener(t, o, !1), s.push([ t, o ]);
}), s;
}
function O(t, e) {
if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === t.buttons && 0 !== e.buttonsProperty) return I(t, e);
var n, i, r = e.handles || G, o = !1, s = 100 * (t.calcPoint - e.start) / e.baseSize, a = r[0] === G[0] ? 0 :1;
if (n = p(s, e.positions, r.length > 1), o = H(r[0], n[a], 1 === r.length), r.length > 1) {
if (o = H(r[1], n[a ? 0 :1], !1) || o) for (i = 0; i < e.handles.length; i++) E("slide", i);
} else o && E("slide", a);
}
function I(t, e) {
var n = V.querySelector("." + i.cssClasses.active), r = e.handles[0] === G[0] ? 0 :1;
null !== n && l(n, i.cssClasses.active), t.cursor && (document.body.style.cursor = "", 
document.body.removeEventListener("selectstart", document.body.noUiListener));
var o = document.documentElement;
o.noUiListeners.forEach(function(t) {
o.removeEventListener(t[0], t[1]);
}), l(Z, i.cssClasses.drag), E("set", r), E("change", r), void 0 !== e.handleNumber && E("end", e.handleNumber);
}
function j(t, e) {
"mouseout" === t.type && "HTML" === t.target.nodeName && null === t.relatedTarget && I(t, e);
}
function A(t, e) {
var n = document.documentElement;
if (1 === e.handles.length) {
if (e.handles[0].hasAttribute("disabled")) return !1;
u(e.handles[0].children[0], i.cssClasses.active);
}
t.preventDefault(), t.stopPropagation();
var r = M(J.move, n, O, {
start:t.calcPoint,
baseSize:T(),
pageOffset:t.pageOffset,
handles:e.handles,
handleNumber:e.handleNumber,
buttonsProperty:t.buttons,
positions:[ K[0], K[G.length - 1] ]
}), o = M(J.end, n, I, {
handles:e.handles,
handleNumber:e.handleNumber
}), s = M("mouseout", n, j, {
handles:e.handles,
handleNumber:e.handleNumber
});
if (n.noUiListeners = r.concat(o, s), t.cursor) {
document.body.style.cursor = getComputedStyle(t.target).cursor, G.length > 1 && u(Z, i.cssClasses.drag);
var a = function() {
return !1;
};
document.body.noUiListener = a, document.body.addEventListener("selectstart", a, !1);
}
void 0 !== e.handleNumber && E("start", e.handleNumber);
}
function L(t) {
var e, o, s = t.calcPoint, a = 0;
return t.stopPropagation(), G.forEach(function(t) {
a += n(t)[i.style];
}), e = a / 2 > s || 1 === G.length ? 0 :1, G[e].hasAttribute("disabled") && (e = e ? 0 :1), 
s -= n(V)[i.style], o = 100 * s / T(), i.events.snap || r(Z, i.cssClasses.tap, i.animationDuration), 
G[e].hasAttribute("disabled") ? !1 :(H(G[e], o), E("slide", e, !0), E("set", e, !0), 
E("change", e, !0), void (i.events.snap && A(t, {
handles:[ G[e] ]
})));
}
function z(t) {
var e = t.calcPoint - n(V)[i.style], r = Q.getStep(100 * e / T()), o = Q.fromStepping(r);
Object.keys(ee).forEach(function(t) {
"hover" === t.split(".")[0] && ee[t].forEach(function(t) {
t.call(X, o);
});
});
}
function P(t) {
if (t.fixed || G.forEach(function(t, e) {
M(J.start, t.children[0], A, {
handles:[ t ],
handleNumber:e
});
}), t.tap && M(J.start, V, L, {
handles:G
}), t.hover && M(J.move, V, z, {
hover:!0
}), t.drag) {
var e = [ V.querySelector("." + i.cssClasses.connect) ];
u(e[0], i.cssClasses.draggable), t.fixed && e.push(G[e[0] === G[0] ? 1 :0].children[0]), 
e.forEach(function(t) {
M(J.start, t, A, {
handles:G
});
});
}
}
function H(t, e, n) {
var r = t !== G[0] ? 1 :0, s = K[0] + i.margin, a = K[1] - i.margin, c = K[0] + i.limit, h = K[1] - i.limit;
return G.length > 1 && (e = r ? Math.max(e, s) :Math.min(e, a)), n !== !1 && i.limit && G.length > 1 && (e = r ? Math.min(e, c) :Math.max(e, h)), 
e = Q.getStep(e), e = o(e), e === K[r] ? !1 :(window.requestAnimationFrame ? window.requestAnimationFrame(function() {
t.style[i.style] = e + "%";
}) :t.style[i.style] = e + "%", t.previousSibling || (l(t, i.cssClasses.stacking), 
e > 50 && u(t, i.cssClasses.stacking)), K[r] = e, te[r] = Q.fromStepping(e), E("update", r), 
!0);
}
function N(t, e) {
var n, r, o;
for (i.limit && (t += 1), n = 0; t > n; n += 1) r = n % 2, o = e[r], null !== o && o !== !1 && ("number" == typeof o && (o = String(o)), 
o = i.format.from(o), (o === !1 || isNaN(o) || H(G[r], Q.toStepping(o), n === 3 - i.dir) === !1) && E("update", r));
}
function R(t, e) {
var n, o, a = s(t);
for (e = void 0 === e ? !0 :!!e, i.dir && i.handles > 1 && a.reverse(), i.animate && -1 !== K[0] && r(Z, i.cssClasses.tap, i.animationDuration), 
n = G.length > 1 ? 3 :1, 1 === a.length && (n = 1), N(n, a), o = 0; o < G.length; o++) null !== a[o] && e && E("set", o);
}
function F() {
var t, e = [];
for (t = 0; t < i.handles; t += 1) e[t] = i.format.to(te[t]);
return D(e);
}
function q() {
for (var t in i.cssClasses) i.cssClasses.hasOwnProperty(t) && l(Z, i.cssClasses[t]);
for (;Z.firstChild; ) Z.removeChild(Z.firstChild);
delete Z.noUiSlider;
}
function U() {
var t = K.map(function(t, e) {
var n = Q.getApplicableStep(t), i = a(String(n[2])), r = te[e], o = 100 === t ? null :n[2], s = Number((r - n[2]).toFixed(i)), u = 0 === t ? null :s >= n[1] ? n[2] :n[0] || !1;
return [ u, o ];
});
return D(t);
}
function B(t, e) {
ee[t] = ee[t] || [], ee[t].push(e), "update" === t.split(".")[0] && G.forEach(function(t, e) {
E("update", e);
});
}
function Y(t) {
var e = t && t.split(".")[0], n = e && t.substring(e.length);
Object.keys(ee).forEach(function(t) {
var i = t.split(".")[0], r = t.substring(i.length);
e && e !== i || n && n !== r || delete ee[t];
});
}
function W(t, e) {
var n = F(), r = $({
start:[ 0, 0 ],
margin:t.margin,
limit:t.limit,
step:void 0 === t.step ? i.singleStep :t.step,
range:t.range,
animate:t.animate,
snap:void 0 === t.snap ? i.snap :t.snap
});
[ "margin", "limit", "range", "animate" ].forEach(function(e) {
void 0 !== t[e] && (i[e] = t[e]);
}), r.spectrum.direction = Q.direction, Q = r.spectrum, K = [ -1, -1 ], R(t.start || n, e);
}
var V, G, X, J = d(), Z = e, K = [ -1, -1 ], Q = i.spectrum, te = [], ee = {};
if (Z.noUiSlider) throw new Error("Slider was already initialized.");
return V = _(i.dir, i.ort, Z), G = y(i.handles, i.dir, V), v(i.connect, Z, G), i.pips && C(i.pips), 
i.tooltips && w(), X = {
destroy:q,
steps:U,
on:B,
off:Y,
get:F,
set:R,
updateOptions:W,
options:f,
target:Z,
pips:C
}, P(i.events), X;
}
function q(t, e) {
if (!t.nodeName) throw new Error("noUiSlider.create requires a single element.");
var n = $(e, t), i = F(t, n, e);
return i.set(n.start), t.noUiSlider = i, i;
}
S.prototype.getMargin = function(t) {
return 2 === this.xPct.length ? p(this.xVal, t) :!1;
}, S.prototype.toStepping = function(t) {
return t = y(this.xVal, this.xPct, t), this.direction && (t = 100 - t), t;
}, S.prototype.fromStepping = function(t) {
return this.direction && (t = 100 - t), _(this.xVal, this.xPct, t);
}, S.prototype.getStep = function(t) {
return this.direction && (t = 100 - t), t = b(this.xPct, this.xSteps, this.snap, t), 
this.direction && (t = 100 - t), t;
}, S.prototype.getApplicableStep = function(t) {
var e = v(t, this.xPct), n = 100 === t ? 2 :1;
return [ this.xNumSteps[e - 2], this.xVal[e - n], this.xNumSteps[e - n] ];
}, S.prototype.convert = function(t) {
return this.getStep(this.toStepping(t));
};
var U = {
to:function(t) {
return void 0 !== t && t.toFixed(2);
},
from:Number
};
return {
create:q
};
}), function(t) {
if (!t.hasInitialised) {
var e = {
escapeRegExp:function(t) {
return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
},
hasClass:function(t, e) {
var n = " ";
return 1 === t.nodeType && (n + t.className + n).replace(/[\n\t]/g, n).indexOf(n + e + n) >= 0;
},
addClass:function(t, e) {
t.className += " " + e;
},
removeClass:function(t, e) {
var n = new RegExp("\\b" + this.escapeRegExp(e) + "\\b");
t.className = t.className.replace(n, "");
},
interpolateString:function(t, e) {
var n = /{{([a-z][a-z0-9\-_]*)}}/gi;
return t.replace(n, function() {
return e(arguments[1]) || "";
});
},
getCookie:function(t) {
var e = "; " + document.cookie, n = e.split("; " + t + "=");
return 2 != n.length ? void 0 :n.pop().split(";").shift();
},
setCookie:function(t, e, n, i, r) {
var o = new Date();
o.setDate(o.getDate() + (n || 365));
var s = [ t + "=" + e, "expires=" + o.toUTCString(), "path=" + (r || "/") ];
i && s.push("domain=" + i), document.cookie = s.join(";");
},
deepExtend:function(t, e) {
for (var n in e) e.hasOwnProperty(n) && (n in t && this.isPlainObject(t[n]) && this.isPlainObject(e[n]) ? this.deepExtend(t[n], e[n]) :t[n] = e[n]);
return t;
},
throttle:function(t, e) {
var n = !1;
return function() {
n || (t.apply(this, arguments), n = !0, setTimeout(function() {
n = !1;
}, e));
};
},
hash:function(t) {
var e, n, i, r = 0;
if (0 === t.length) return r;
for (e = 0, i = t.length; i > e; ++e) n = t.charCodeAt(e), r = (r << 5) - r + n, 
r |= 0;
return r;
},
normaliseHex:function(t) {
return "#" == t[0] && (t = t.substr(1)), 3 == t.length && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), 
t;
},
getContrast:function(t) {
t = this.normaliseHex(t);
var e = parseInt(t.substr(0, 2), 16), n = parseInt(t.substr(2, 2), 16), i = parseInt(t.substr(4, 2), 16), r = (299 * e + 587 * n + 114 * i) / 1e3;
return r >= 128 ? "#000" :"#fff";
},
getLuminance:function(t) {
var e = parseInt(this.normaliseHex(t), 16), n = 38, i = (e >> 16) + n, r = (e >> 8 & 255) + n, o = (255 & e) + n, s = (16777216 + 65536 * (255 > i ? 1 > i ? 0 :i :255) + 256 * (255 > r ? 1 > r ? 0 :r :255) + (255 > o ? 1 > o ? 0 :o :255)).toString(16).slice(1);
return "#" + s;
},
isMobile:function() {
return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
},
isPlainObject:function(t) {
return "object" == typeof t && null !== t && t.constructor == Object;
}
};
t.status = {
deny:"deny",
allow:"allow",
dismiss:"dismiss"
}, t.transitionEnd = function() {
var t = document.createElement("div"), e = {
t:"transitionend",
OT:"oTransitionEnd",
msT:"MSTransitionEnd",
MozT:"transitionend",
WebkitT:"webkitTransitionEnd"
};
for (var n in e) if (e.hasOwnProperty(n) && "undefined" != typeof t.style[n + "ransition"]) return e[n];
return "";
}(), t.hasTransition = !!t.transitionEnd;
var n = Object.keys(t.status).map(e.escapeRegExp);
t.customStyles = {}, t.Popup = function() {
function i() {
this.initialise.apply(this, arguments);
}
function r(t) {
this.openingTimeout = null, e.removeClass(t, "cc-invisible");
}
function o(e) {
e.style.display = "none", e.removeEventListener(t.transitionEnd, this.afterTransition), 
this.afterTransition = null;
}
function s() {
var e = this.options.onInitialise.bind(this);
if (!window.navigator.cookieEnabled) return e(t.status.deny), !0;
if (window.CookiesOK || window.navigator.CookiesOK) return e(t.status.allow), !0;
var n = Object.keys(t.status), i = this.getStatus(), r = n.indexOf(i) >= 0;
return r && e(i), r;
}
function a() {
var t = this.options.position.split("-"), e = [];
return t.forEach(function(t) {
e.push("cc-" + t);
}), e;
}
function u() {
var t = this.options, n = "top" == t.position || "bottom" == t.position ? "banner" :"floating";
e.isMobile() && (n = "floating");
var i = [ "cc-" + n, "cc-type-" + t.type, "cc-theme-" + t.theme ];
t["static"] && i.push("cc-static"), i.push.apply(i, a.call(this));
d.call(this, this.options.palette);
return this.customStyleSelector && i.push(this.customStyleSelector), i;
}
function l() {
var t = {}, n = this.options;
n.showLink || (n.elements.link = "", n.elements.messagelink = n.elements.message), 
Object.keys(n.elements).forEach(function(i) {
t[i] = e.interpolateString(n.elements[i], function(t) {
var e = n.content[t];
return t && "string" == typeof e && e.length ? e :"";
});
});
var i = n.compliance[n.type];
i || (i = n.compliance.info), t.compliance = e.interpolateString(i, function(e) {
return t[e];
});
var r = n.layouts[n.layout];
return r || (r = n.layouts.basic), e.interpolateString(r, function(e) {
return t[e];
});
}
function c(n) {
var i = this.options, r = document.createElement("div"), o = i.container && 1 === i.container.nodeType ? i.container :document.body;
r.innerHTML = n;
var s = r.children[0];
return s.style.display = "none", e.hasClass(s, "cc-window") && t.hasTransition && e.addClass(s, "cc-invisible"), 
this.onButtonClick = h.bind(this), s.addEventListener("click", this.onButtonClick), 
i.autoAttach && (o.firstChild ? o.insertBefore(s, o.firstChild) :o.appendChild(s)), 
s;
}
function h(i) {
var r = i.target;
if (e.hasClass(r, "cc-btn")) {
var o = r.className.match(new RegExp("\\bcc-(" + n.join("|") + ")\\b")), s = o && o[1] || !1;
s && (this.setStatus(s), this.close(!0));
}
e.hasClass(r, "cc-close") && (this.setStatus(t.status.dismiss), this.close(!0)), 
e.hasClass(r, "cc-revoke") && this.revokeChoice();
}
function d(t) {
var n = e.hash(JSON.stringify(t)), i = "cc-color-override-" + n, r = e.isPlainObject(t);
return this.customStyleSelector = r ? i :null, r && f(n, t, "." + i), r;
}
function f(n, i, r) {
if (t.customStyles[n]) return void ++t.customStyles[n].references;
var o = {}, s = i.popup, a = i.button, u = i.highlight;
s && (s.text = s.text ? s.text :e.getContrast(s.background), s.link = s.link ? s.link :s.text, 
o[r + ".cc-window"] = [ "color: " + s.text, "background-color: " + s.background ], 
o[r + ".cc-revoke"] = [ "color: " + s.text, "background-color: " + s.background ], 
o[r + " .cc-link," + r + " .cc-link:active," + r + " .cc-link:visited"] = [ "color: " + s.link ], 
a && (a.text = a.text ? a.text :e.getContrast(a.background), a.border = a.border ? a.border :"transparent", 
o[r + " .cc-btn"] = [ "color: " + a.text, "border-color: " + a.border, "background-color: " + a.background ], 
"transparent" != a.background && (o[r + " .cc-btn:hover"] = [ "background-color: " + p(a.background) ]), 
u ? (u.text = u.text ? u.text :e.getContrast(u.background), u.border = u.border ? u.border :"transparent", 
o[r + " .cc-highlight .cc-btn:first-child"] = [ "color: " + u.text, "border-color: " + u.border, "background-color: " + u.background ]) :o[r + " .cc-highlight .cc-btn:first-child"] = [ "color: " + s.text ]));
var l = document.createElement("style");
document.head.appendChild(l), t.customStyles[n] = {
references:1,
element:l.sheet
};
var c = -1;
for (var h in o) o.hasOwnProperty(h) && l.sheet.insertRule(h + "{" + o[h].join(";") + "}", ++c);
}
function p(t) {
return t = e.normaliseHex(t), "000000" == t ? "#222" :e.getLuminance(t);
}
function m(n) {
if (e.isPlainObject(n)) {
var i = e.hash(JSON.stringify(n)), r = t.customStyles[i];
if (r && !--r.references) {
var o = r.element.ownerNode;
o && o.parentNode && o.parentNode.removeChild(o), t.customStyles[i] = null;
}
}
}
function g(t, e) {
for (var n = 0, i = t.length; i > n; ++n) {
var r = t[n];
if (r instanceof RegExp && r.test(e) || "string" == typeof r && r.length && r === e) return !0;
}
return !1;
}
function v() {
var e = this.setStatus.bind(this), n = this.options.dismissOnTimeout;
"number" == typeof n && n >= 0 && (this.dismissTimeout = window.setTimeout(function() {
e(t.status.dismiss);
}, Math.floor(n)));
var i = this.options.dismissOnScroll;
if ("number" == typeof i && i >= 0) {
var r = function() {
window.pageYOffset > Math.floor(i) && (e(t.status.dismiss), window.removeEventListener("scroll", r), 
this.onWindowScroll = null);
};
this.onWindowScroll = r, window.addEventListener("scroll", r);
}
}
function y() {
if ("info" != this.options.type && (this.options.revokable = !0), e.isMobile() && (this.options.animateRevokable = !1), 
this.options.revokable) {
var t = a.call(this);
this.options.animateRevokable && t.push("cc-animate"), this.customStyleSelector && t.push(this.customStyleSelector);
var n = this.options.revokeBtn.replace("{{classes}}", t.join(" "));
this.revokeBtn = c.call(this, n);
var i = this.revokeBtn;
if (this.options.animateRevokable) {
var r = e.throttle(function(t) {
var n = !1, r = 20, o = window.innerHeight - 20;
e.hasClass(i, "cc-top") && t.clientY < r && (n = !0), e.hasClass(i, "cc-bottom") && t.clientY > o && (n = !0), 
n ? e.hasClass(i, "cc-active") || e.addClass(i, "cc-active") :e.hasClass(i, "cc-active") && e.removeClass(i, "cc-active");
}, 200);
this.onMouseMove = r, window.addEventListener("mousemove", r);
}
}
}
var _ = {
enabled:!0,
container:null,
cookie:{
name:"cookieconsent_status",
path:"/",
domain:"",
expiryDays:365
},
onPopupOpen:function() {},
onPopupClose:function() {},
onInitialise:function() {},
onStatusChange:function() {},
onRevokeChoice:function() {},
content:{
header:"Cookies used on the website!",
message:"This website uses cookies to ensure you get the best experience on our website.",
dismiss:"Got it!",
allow:"Allow cookies",
deny:"Decline",
link:"Learn more",
href:"http://cookiesandyou.com",
close:"&#x274c;"
},
elements:{
header:'<span class="cc-header">{{header}}</span>&nbsp;',
message:'<span id="cookieconsent:desc" class="cc-message">{{message}}</span>',
messagelink:'<span id="cookieconsent:desc" class="cc-message">{{message}} <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{href}}" target="_blank">{{link}}</a></span>',
dismiss:'<a aria-label="dismiss cookie message" tabindex="0" class="cc-btn cc-dismiss">{{dismiss}}</a>',
allow:'<a aria-label="allow cookies" tabindex="0" class="cc-btn cc-allow">{{allow}}</a>',
deny:'<a aria-label="deny cookies" tabindex="0" class="cc-btn cc-deny">{{deny}}</a>',
link:'<a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{href}}" target="_blank">{{link}}</a>',
close:'<span aria-label="dismiss cookie message" tabindex="0" class="cc-close">{{close}}</span>'
},
window:'<div role="dialog" aria-label="cookieconsent" aria-describedby="cookieconsent:desc" class="cc-window {{classes}}">{{children}}</div>',
revokeBtn:'<div class="cc-revoke {{classes}}">Cookie Policy</div>',
compliance:{
info:'<div class="cc-compliance">{{dismiss}}</div>',
"opt-in":'<div class="cc-compliance cc-highlight">{{dismiss}}{{allow}}</div>',
"opt-out":'<div class="cc-compliance cc-highlight">{{deny}}{{dismiss}}</div>'
},
type:"info",
layouts:{
basic:"{{messagelink}}{{compliance}}",
"basic-close":"{{messagelink}}{{compliance}}{{close}}",
"basic-header":"{{header}}{{message}}{{link}}{{compliance}}"
},
layout:"basic",
position:"bottom",
theme:"block",
"static":!1,
palette:null,
revokable:!1,
animateRevokable:!0,
showLink:!0,
dismissOnScroll:!1,
dismissOnTimeout:!1,
autoOpen:!0,
autoAttach:!0,
whitelistPage:[],
blacklistPage:[],
overrideHTML:null
};
return i.prototype.initialise = function(t) {
this.options && this.destroy(), e.deepExtend(this.options = {}, _), e.isPlainObject(t) && e.deepExtend(this.options, t), 
s.call(this) && (this.options.enabled = !1), g(this.options.blacklistPage, location.pathname) && (this.options.enabled = !1), 
g(this.options.whitelistPage, location.pathname) && (this.options.enabled = !0);
var n = this.options.window.replace("{{classes}}", u.call(this).join(" ")).replace("{{children}}", l.call(this)), i = this.options.overrideHTML;
if ("string" == typeof i && i.length && (n = i), this.options["static"]) {
var r = c.call(this, '<div class="cc-grower">' + n + "</div>");
r.style.display = "", this.element = r.firstChild, this.element.style.display = "none", 
e.addClass(this.element, "cc-invisible");
} else this.element = c.call(this, n);
v.call(this), y.call(this), this.options.autoOpen && this.autoOpen();
}, i.prototype.destroy = function() {
this.onButtonClick && this.element && (this.element.removeEventListener("click", this.onButtonClick), 
this.onButtonClick = null), this.dismissTimeout && (clearTimeout(this.dismissTimeout), 
this.dismissTimeout = null), this.onWindowScroll && (window.removeEventListener("scroll", this.onWindowScroll), 
this.onWindowScroll = null), this.onMouseMove && (window.removeEventListener("mousemove", this.onMouseMove), 
this.onMouseMove = null), this.element && this.element.parentNode && this.element.parentNode.removeChild(this.element), 
this.element = null, this.revokeBtn && this.revokeBtn.parentNode && this.revokeBtn.parentNode.removeChild(this.revokeBtn), 
this.revokeBtn = null, m(this.options.palette), this.options = null;
}, i.prototype.open = function() {
return this.element ? (this.isOpen() || (t.hasTransition ? this.fadeIn() :this.element.style.display = "", 
this.options.revokable && this.toggleRevokeButton(), this.options.onPopupOpen.call(this)), 
this) :void 0;
}, i.prototype.close = function(e) {
return this.element ? (this.isOpen() && (t.hasTransition ? this.fadeOut() :this.element.style.display = "none", 
e && this.options.revokable && this.toggleRevokeButton(!0), this.options.onPopupClose.call(this)), 
this) :void 0;
}, i.prototype.fadeIn = function() {
var n = this.element;
if (t.hasTransition && n && (this.afterTransition && o.call(this, n), e.hasClass(n, "cc-invisible"))) {
if (n.style.display = "", this.options["static"]) {
var i = this.element.clientHeight;
this.element.parentNode.style.maxHeight = i + "px";
}
var s = 20;
this.openingTimeout = setTimeout(r.bind(this, n), s);
}
}, i.prototype.fadeOut = function() {
var n = this.element;
t.hasTransition && n && (this.openingTimeout && (clearTimeout(this.openingTimeout), 
r.bind(this, n)), e.hasClass(n, "cc-invisible") || (this.options["static"] && (this.element.parentNode.style.maxHeight = ""), 
this.afterTransition = o.bind(this, n), n.addEventListener(t.transitionEnd, this.afterTransition), 
e.addClass(n, "cc-invisible")));
}, i.prototype.isOpen = function() {
return this.element && "" == this.element.style.display && (t.hasTransition ? !e.hasClass(this.element, "cc-invisible") :!0);
}, i.prototype.toggleRevokeButton = function(t) {
this.revokeBtn && (this.revokeBtn.style.display = t ? "" :"none");
}, i.prototype.revokeChoice = function(t) {
this.options.enabled = !0, this.clearStatus(), this.options.onRevokeChoice.call(this), 
t || this.autoOpen();
}, i.prototype.hasAnswered = function() {
return Object.keys(t.status).indexOf(this.getStatus()) >= 0;
}, i.prototype.hasConsented = function() {
var e = this.getStatus();
return e == t.status.allow || e == t.status.dismiss;
}, i.prototype.autoOpen = function() {
!this.hasAnswered() && this.options.enabled && this.open();
}, i.prototype.setStatus = function(n) {
var i = this.options.cookie, r = e.getCookie(i.name), o = Object.keys(t.status).indexOf(r) >= 0;
Object.keys(t.status).indexOf(n) >= 0 ? (e.setCookie(i.name, n, i.expiryDays, i.domain, i.path), 
this.options.onStatusChange.call(this, n, o)) :this.clearStatus();
}, i.prototype.getStatus = function() {
return e.getCookie(this.options.cookie.name);
}, i.prototype.clearStatus = function() {
var t = this.options.cookie;
e.setCookie(t.name, "", -1, t.domain, t.path);
}, i;
}(), t.Location = function() {
function t(t) {
e.deepExtend(this.options = {}, o), e.isPlainObject(t) && e.deepExtend(this.options, t), 
this.currentServiceIndex = -1;
}
function n(t, e, n) {
var i, r = document.createElement("script");
r.type = "text/" + (t.type || "javascript"), r.src = t.src || t, r.async = !1, r.onreadystatechange = r.onload = function() {
var t = r.readyState;
clearTimeout(i), e.done || t && !/loaded|complete/.test(t) || (e.done = !0, e(), 
r.onreadystatechange = r.onload = null);
}, document.body.appendChild(r), i = setTimeout(function() {
e.done = !0, e(), r.onreadystatechange = r.onload = null;
}, n);
}
function i(t, e, n, i, r) {
var o = new (window.XMLHttpRequest || window.ActiveXObject)("MSXML2.XMLHTTP.3.0");
if (o.open(i ? "POST" :"GET", t, 1), o.setRequestHeader("X-Requested-With", "XMLHttpRequest"), 
o.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), Array.isArray(r)) for (var s = 0, a = r.length; a > s; ++s) {
var u = r[s].split(":", 2);
o.setRequestHeader(u[0].replace(/^\s+|\s+$/g, ""), u[1].replace(/^\s+|\s+$/g, ""));
}
"function" == typeof e && (o.onreadystatechange = function() {
o.readyState > 3 && e(o);
}), o.send(i);
}
function r(t) {
return new Error("Error [" + (t.code || "UNKNOWN") + "]: " + t.error);
}
var o = {
timeout:5e3,
services:[ "freegeoip", "ipinfo", "maxmind" ],
serviceDefinitions:{
freegeoip:function() {
return {
url:"//freegeoip.net/json/?callback={callback}",
isScript:!0,
callback:function(t, e) {
try {
var n = JSON.parse(e);
return n.error ? r(n) :{
code:n.country_code
};
} catch (i) {
return r({
error:"Invalid response (" + i + ")"
});
}
}
};
},
ipinfo:function() {
return {
url:"//ipinfo.io",
headers:[ "Accept: application/json" ],
callback:function(t, e) {
try {
var n = JSON.parse(e);
return n.error ? r(n) :{
code:n.country
};
} catch (i) {
return r({
error:"Invalid response (" + i + ")"
});
}
}
};
},
ipinfodb:function() {
return {
url:"//api.ipinfodb.com/v3/ip-country/?key={api_key}&format=json&callback={callback}",
isScript:!0,
callback:function(t, e) {
try {
var n = JSON.parse(e);
return "ERROR" == n.statusCode ? r({
error:n.statusMessage
}) :{
code:n.countryCode
};
} catch (i) {
return r({
error:"Invalid response (" + i + ")"
});
}
}
};
},
maxmind:function() {
return {
url:"//js.maxmind.com/js/apis/geoip2/v2.1/geoip2.js",
isScript:!0,
callback:function(t) {
return window.geoip2 ? void geoip2.country(function(e) {
t({
code:e.country.iso_code
});
}, function(e) {
t(r(e));
}) :void t(new Error("Unexpected response format. The downloaded script should have exported `geoip2` to the global scope"));
}
};
}
}
};
return t.prototype.getNextService = function() {
var t;
do t = this.getServiceByIdx(++this.currentServiceIndex); while (!t);
return t;
}, t.prototype.getServiceByIdx = function(t) {
var n = this.options.services[t];
if ("function" == typeof n) {
var i = n();
return i.name && e.deepExtend(i, this.options.serviceDefinitions[i.name](i)), i;
}
return "string" == typeof n ? this.options.serviceDefinitions[n]() :e.isPlainObject(n) ? this.options.serviceDefinitions[n.name](n) :null;
}, t.prototype.locate = function(t, e) {
var n = this.getNextService();
return n ? (this.callbackComplete = t, this.callbackError = e, void this.runService(n, this.runNextServiceOnError.bind(this))) :void e(new Error("No services to run"));
}, t.prototype.setupUrl = function(t) {
var e = this.getCurrentServiceOpts();
return t.url.replace(/\{(.*?)\}/g, function(n, i) {
if ("callback" === i) {
var r = "callback" + Date.now();
return window[r] = function(e) {
t.__JSONP_DATA = JSON.stringify(e);
}, r;
}
return i in e.interpolateUrl ? e.interpolateUrl[i] :void 0;
});
}, t.prototype.runService = function(t, e) {
var r = this;
if (t && t.url && t.callback) {
var o = t.isScript ? n :i, s = this.setupUrl(t);
o(s, function(n) {
var i = n ? n.responseText :"";
t.__JSONP_DATA && (i = t.__JSONP_DATA, delete t.__JSONP_DATA), r.runServiceCallback.call(r, e, t, i);
}, this.options.timeout, t.data, t.headers);
}
}, t.prototype.runServiceCallback = function(t, e, n) {
var i = this, r = function(e) {
o || i.onServiceResult.call(i, t, e);
}, o = e.callback(r, n);
o && this.onServiceResult.call(this, t, o);
}, t.prototype.onServiceResult = function(t, e) {
e instanceof Error || e && e.error ? t.call(this, e, null) :t.call(this, null, e);
}, t.prototype.runNextServiceOnError = function(t, e) {
if (t) {
this.logError(t);
var n = this.getNextService();
n ? this.runService(n, this.runNextServiceOnError.bind(this)) :this.completeService.call(this, this.callbackError, new Error("All services failed"));
} else this.completeService.call(this, this.callbackComplete, e);
}, t.prototype.getCurrentServiceOpts = function() {
var t = this.options.services[this.currentServiceIndex];
return "string" == typeof t ? {
name:t
} :"function" == typeof t ? t() :e.isPlainObject(t) ? t :{};
}, t.prototype.completeService = function(t, e) {
this.currentServiceIndex = -1, t && t(e);
}, t.prototype.logError = function(t) {
var e = this.currentServiceIndex, n = this.getServiceByIdx(e);
console.error("The service[" + e + "] (" + n.url + ") responded with the following error", t);
}, t;
}(), t.Law = function() {
function t() {
this.initialise.apply(this, arguments);
}
var n = {
regionalLaw:!0,
hasLaw:[ "AT", "BE", "BG", "HR", "CZ", "CY", "DK", "EE", "FI", "FR", "DE", "EL", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "SK", "SI", "ES", "SE", "GB", "UK" ],
revokable:[ "HR", "CY", "DK", "EE", "FR", "DE", "LV", "LT", "NL", "PT", "ES" ],
explicitAction:[ "HR", "IT", "ES" ]
};
return t.prototype.initialise = function(t) {
e.deepExtend(this.options = {}, n), e.isPlainObject(t) && e.deepExtend(this.options, t);
}, t.prototype.get = function(t) {
var e = this.options;
return {
hasLaw:e.hasLaw.indexOf(t) >= 0,
revokable:e.revokable.indexOf(t) >= 0,
explicitAction:e.explicitAction.indexOf(t) >= 0
};
}, t.prototype.applyLaw = function(t, e) {
var n = this.get(e);
return n.hasLaw || (t.enabled = !1), this.options.regionalLaw && (n.revokable && (t.revokable = !0), 
n.explicitAction && (t.dismissOnScroll = !1, t.dismissOnTimeout = !1)), t;
}, t;
}(), t.initialise = function(e, n, i) {
var r = new t.Law(e.law);
n || (n = function() {}), i || (i = function() {}), t.getCountryCode(e, function(i) {
delete e.law, delete e.location, i.code && (e = r.applyLaw(e, i.code)), n(new t.Popup(e));
}, function(n) {
delete e.law, delete e.location, i(n, new t.Popup(e));
});
}, t.getCountryCode = function(e, n, i) {
if (e.law && e.law.countryCode) return void n({
code:e.law.countryCode
});
if (e.location) {
var r = new t.Location(e.location);
return void r.locate(function(t) {
n(t || {});
}, i);
}
n({});
}, t.utils = e, t.hasInitialised = !0, window.cookieconsent = t;
}
}(window.cookieconsent || {}), function() {
"use strict";
function t() {
for (var n = [], i = 0; i < arguments.length; i++) {
var r = arguments[i];
if (r) {
var o = typeof r;
if ("string" === o || "number" === o) n.push(r); else if (Array.isArray(r)) n.push(t.apply(null, r)); else if ("object" === o) for (var s in r) e.call(r, s) && r[s] && n.push(s);
}
}
return n.join(" ");
}
var e = {}.hasOwnProperty;
"undefined" != typeof module && module.exports ? module.exports = t :"function" == typeof define && "object" == typeof define.amd && define.amd ? define("classnames", [], function() {
return t;
}) :window.classNames = t;
}(), window.underscore = _.noConflict(), moment.locale(I18n.locale);