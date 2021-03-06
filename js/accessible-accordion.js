!function (a) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
}(function (a) {
    "use strict";
    var b = {
        headersSelector: ".js-accordion__header",
        panelsSelector: ".js-accordion__panel",
        buttonsSelector: "button.js-accordion__header",
        button: a("<button></button>", {class: "js-accordion__header", type: "button"}),
        buttonSuffixId: "_tab",
        multiselectable: !0,
        prefixClass: "accordion",
        headerSuffixClass: "__title",
        buttonSuffixClass: "__header",
        panelSuffixClass: "__panel",
        direction: "ltr"
    }, c = function (c, d) {
        this.options = a.extend({}, b, d), this.$wrapper = c, this.$panels = a(this.options.panelsSelector, this.$wrapper), this.initAttributes(), this.initEvents()
    };
    c.prototype.initAttributes = function () {
        this.$wrapper.attr({
            role: "tablist",
            "aria-multiselectable": this.options.multiselectable.toString()
        }).addClass(this.options.prefixClass), this.$panels.each(a.proxy(function (b, c) {
            var d = a(c), e = a(this.options.headersSelector, d), f = this.options.button.clone().text(e.text());
            e.attr("tabindex", "0").addClass(this.options.prefixClass + this.options.headerSuffixClass), d.before(f);
            var g = d.attr("id") || this.$wrapper.attr("id") + "-" + b, h = g + this.options.buttonSuffixId;
            f.attr({
                "aria-controls": g,
                "aria-expanded": "false",
                role: "tab",
                id: h,
                tabindex: "-1",
                "aria-selected": "false"
            }).addClass(this.options.prefixClass + this.options.buttonSuffixClass), d.attr({
                "aria-labelledby": h,
                role: "tabpanel",
                id: g,
                "aria-hidden": "true"
            }).addClass(this.options.prefixClass + this.options.panelSuffixClass), "true" === d.attr("data-accordion-opened") && (f.attr({
                "aria-expanded": "true",
                "data-accordion-opened": null
            }), d.attr({"aria-hidden": "false"})), 0 === b && f.removeAttr("tabindex")
        }, this)), this.$buttons = a(this.options.buttonsSelector, this.$wrapper)
    }, c.prototype.initEvents = function () {
        this.$wrapper.on("focus", this.options.buttonsSelector, a.proxy(this.focusButtonEventHandler, this)), this.$wrapper.on("click", this.options.buttonsSelector, a.proxy(this.clickButtonEventHandler, this)), this.$wrapper.on("keydown", this.options.buttonsSelector, a.proxy(this.keydownButtonEventHandler, this)), this.$wrapper.on("keydown", this.options.panelSelector, a.proxy(this.keydownPanelEventHandler, this))
    }, c.prototype.focusButtonEventHandler = function (b) {
        var c = a(b.target);
        a(this.options.buttonsSelector, this.$wrapper).attr({
            tabindex: "-1",
            "aria-selected": "false"
        }), c.attr({"aria-selected": "true", tabindex: null})
    }, c.prototype.clickButtonEventHandler = function (b) {
        var c = a(b.target), d = a("#" + c.attr("aria-controls"));
        this.$buttons.attr("aria-selected", "false"), c.attr("aria-selected", "true"), "false" === c.attr("aria-expanded") ? (c.attr("aria-expanded", "true"), d.attr("aria-hidden", "false")) : (c.attr("aria-expanded", "false"), d.attr("aria-hidden", "true")), this.options.multiselectable === !1 && (this.$panels.not(d).attr("aria-hidden", "true"), this.$buttons.not(c).attr("aria-expanded", "false")), setTimeout(function () {
            c.focus()
        }, 0), b.preventDefault()
    }, c.prototype.keydownButtonEventHandler = function (b) {
        var c = a(b.target), d = this.$buttons.first(), e = this.$buttons.last(),
            f = c.prevAll(this.options.buttonsSelector).first(), g = c.nextAll(this.options.buttonsSelector).first(),
            h = null, i = "ltr" === this.options.direction ? {
                prev: [38, 37],
                next: [40, 39],
                first: 36,
                last: 35
            } : {prev: [38, 39], next: [40, 37], first: 36, last: 35}, j = [].concat(i.prev, i.next, i.first, i.last);
        a.inArray(b.keyCode, j) >= 0 && !b.ctrlKey && (this.$buttons.attr({
            tabindex: "-1",
            "aria-selected": "false"
        }), 36 === b.keyCode ? h = d : 35 === b.keyCode ? h = e : a.inArray(b.keyCode, i.prev) >= 0 ? h = c.is(d) ? e : f : a.inArray(b.keyCode, i.next) >= 0 && (h = c.is(e) ? d : g), null !== h && this.goToHeader(h), b.preventDefault())
    }, c.prototype.keydownPanelEventHandler = function (b) {
        var c = a(b.target), d = a("#" + c.attr("aria-labelledby")),
            e = this.$wrapper.find(this.options.buttonsSelector).first(),
            f = this.$wrapper.find(this.options.buttonsSelector).last(),
            g = d.prevAll(this.options.buttonsSelector).first(), h = d.nextAll(this.options.buttonsSelector).first(),
            i = null;
        38 === b.keyCode && b.ctrlKey ? i = d : 33 === b.keyCode && b.ctrlKey ? i = d.is(e) ? f : g : 34 === b.keyCode && b.ctrlKey && (i = d.is(f) ? e : h), null !== i && this.goToHeader(i)
    }, c.prototype.goToHeader = function (a) {
        1 === a.length && (a.attr({"aria-selected": "true", tabindex: null}), setTimeout(function () {
            a.focus()
        }, 0))
    };
    var d = "accordion";
    a.fn[d] = function (b) {
        var e = a.extend({}, a.fn[d].defaults, b);
        return this.each(function () {
            var b = a(this), f = {
                multiselectable: "true" === b.attr("data-accordion-multiselectable") || e.multiselectable,
                prefixClass: "undefined" != typeof b.attr("data-accordion-prefix-classes") ? b.attr("data-accordion-prefix-classes") : e.prefixClass,
                direction: b.closest('[dir="rtl"]').length > 0 ? "rtl" : e.direction
            };
            f = a.extend({}, e, f), b.data[d] = new c(b, f)
        })
    }, a.fn[d].defaults = b
});