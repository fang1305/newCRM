/*!
 * cleave.js - 0.9.2
 * https://github.com/nosir/cleave.js
 * Apache License Version 2.0
 * 表单验证插件
 * Copyright (C) 2012-2017 Max Huang https://github.com/nosir/
 */
! function(e, t) {
	"object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.Cleave = t() : e.Cleave = t()
}(this, function() {
	return function(e) {
		function t(n) {
			if (r[n]) return r[n].exports;
			var i = r[n] = {
				exports: {},
				id: n,
				loaded: !1
			};
			return e[n].call(i.exports, i, i.exports, t), i.loaded = !0, i.exports
		}
		var r = {};
		return t.m = e, t.c = r, t.p = "", t(0)
	}([function(e, t, r) {
		(function(t) {
			"use strict";
			var n = function(e, t) {
				var r = this;
				if ("string" == typeof e ? r.element = document.querySelector(e) : r.element = "undefined" != typeof e.length && e.length > 0 ? e[0] : e, !r.element) throw new Error("[cleave.js] Please check the element");
				t.initValue = r.element.value, r.properties = n.DefaultProperties.assign({}, t), r.init()
			};
			n.prototype = {
				init: function() {
					var e = this,
						t = e.properties;
					return t.numeral || t.phone || t.creditCard || t.date || 0 !== t.blocksLength || t.prefix ? (t.maxLength = n.Util.getMaxLength(t.blocks), e.isAndroid = n.Util.isAndroid(), e.lastInputValue = "", e.onChangeListener = e.onChange.bind(e), e.onKeyDownListener = e.onKeyDown.bind(e), e.onCutListener = e.onCut.bind(e), e.onCopyListener = e.onCopy.bind(e), e.element.addEventListener("input", e.onChangeListener), e.element.addEventListener("keydown", e.onKeyDownListener), e.element.addEventListener("cut", e.onCutListener), e.element.addEventListener("copy", e.onCopyListener), e.initPhoneFormatter(), e.initDateFormatter(), e.initNumeralFormatter(), void e.onInput(t.initValue)) : void e.onInput(t.initValue)
				},
				initNumeralFormatter: function() {
					var e = this,
						t = e.properties;
					t.numeral && (t.numeralFormatter = new n.NumeralFormatter(t.numeralDecimalMark, t.numeralIntegerScale, t.numeralDecimalScale, t.numeralThousandsGroupStyle, t.numeralPositiveOnly, t.delimiter))
				},
				initDateFormatter: function() {
					var e = this,
						t = e.properties;
					t.date && (t.dateFormatter = new n.DateFormatter(t.datePattern), t.blocks = t.dateFormatter.getBlocks(), t.blocksLength = t.blocks.length, t.maxLength = n.Util.getMaxLength(t.blocks))
				},
				initPhoneFormatter: function() {
					var e = this,
						t = e.properties;
					if (t.phone) try {
						t.phoneFormatter = new n.PhoneFormatter(new t.root.Cleave.AsYouTypeFormatter(t.phoneRegionCode), t.delimiter)
					} catch (r) {
						throw new Error("[cleave.js] Please include phone-type-formatter.{country}.js lib")
					}
				},
				onKeyDown: function(e) {
					var t = this,
						r = t.properties,
						i = e.which || e.keyCode,
						a = n.Util,
						o = t.element.value;
					return a.isAndroidBackspaceKeydown(t.lastInputValue, o) && (i = 8), t.lastInputValue = o, 8 === i && a.isDelimiter(o.slice(-r.delimiterLength), r.delimiter, r.delimiters) ? void(r.backspace = !0) : void(r.backspace = !1)
				},
				onChange: function() {
					this.onInput(this.element.value)
				},
				onCut: function(e) {
					this.copyClipboardData(e), this.onInput("")
				},
				onCopy: function(e) {
					this.copyClipboardData(e)
				},
				copyClipboardData: function(e) {
					var t = this,
						r = t.properties,
						i = n.Util,
						a = t.element.value,
						o = "";
					o = r.copyDelimiter ? a : i.stripDelimiters(a, r.delimiter, r.delimiters);
					try {
						e.clipboardData ? e.clipboardData.setData("Text", o) : window.clipboardData.setData("Text", o), e.preventDefault()
					} catch (l) {}
				},
				onInput: function(e) {
					var t = this,
						r = t.properties,
						i = e,
						a = n.Util;
					return r.numeral || !r.backspace || a.isDelimiter(e.slice(-r.delimiterLength), r.delimiter, r.delimiters) || (e = a.headStr(e, e.length - r.delimiterLength)), r.phone ? (r.result = r.phoneFormatter.format(e), void t.updateValueState()) : r.numeral ? (r.result = r.prefix + r.numeralFormatter.format(e), void t.updateValueState()) : (r.date && (e = r.dateFormatter.getValidatedDate(e)), e = a.stripDelimiters(e, r.delimiter, r.delimiters), e = a.getPrefixStrippedValue(e, r.prefix, r.prefixLength), e = r.numericOnly ? a.strip(e, /[^\d]/g) : e, e = r.uppercase ? e.toUpperCase() : e, e = r.lowercase ? e.toLowerCase() : e, r.prefix && (e = r.prefix + e, 0 === r.blocksLength) ? (r.result = e, void t.updateValueState()) : (r.creditCard && t.updateCreditCardPropsByValue(e), e = a.headStr(e, r.maxLength), r.result = a.getFormattedValue(e, r.blocks, r.blocksLength, r.delimiter, r.delimiters), void(i === r.result && i !== r.prefix || t.updateValueState())))
				},
				updateCreditCardPropsByValue: function(e) {
					var t, r = this,
						i = r.properties,
						a = n.Util;
					a.headStr(i.result, 4) !== a.headStr(e, 4) && (t = n.CreditCardDetector.getInfo(e, i.creditCardStrictMode), i.blocks = t.blocks, i.blocksLength = i.blocks.length, i.maxLength = a.getMaxLength(i.blocks), i.creditCardType !== t.type && (i.creditCardType = t.type, i.onCreditCardTypeChanged.call(r, i.creditCardType)))
				},
				updateValueState: function() {
					var e = this;
					return e.isAndroid ? void window.setTimeout(function() {
						e.element.value = e.properties.result
					}, 1) : void(e.element.value = e.properties.result)
				},
				setPhoneRegionCode: function(e) {
					var t = this,
						r = t.properties;
					r.phoneRegionCode = e, t.initPhoneFormatter(), t.onChange()
				},
				setRawValue: function(e) {
					var t = this,
						r = t.properties;
					e = void 0 !== e && null !== e ? e.toString() : "", r.numeral && (e = e.replace(".", r.numeralDecimalMark)), t.element.value = e, t.onInput(e)
				},
				getRawValue: function() {
					var e = this,
						t = e.properties,
						r = n.Util,
						i = e.element.value;
					return t.rawValueTrimPrefix && (i = r.getPrefixStrippedValue(i, t.prefix, t.prefixLength)), i = t.numeral ? t.numeralFormatter.getRawValue(i) : r.stripDelimiters(i, t.delimiter, t.delimiters)
				},
				getFormattedValue: function() {
					return this.element.value
				},
				destroy: function() {
					var e = this;
					e.element.removeEventListener("input", e.onChangeListener), e.element.removeEventListener("keydown", e.onKeyDownListener), e.element.removeEventListener("cut", e.onCutListener), e.element.removeEventListener("copy", e.onCopyListener)
				},
				toString: function() {
					return "[Cleave Object]"
				}
			}, n.NumeralFormatter = r(1), n.DateFormatter = r(2), n.PhoneFormatter = r(3), n.CreditCardDetector = r(4), n.Util = r(5), n.DefaultProperties = r(6), ("object" == typeof t && t ? t : window).Cleave = n, e.exports = n
		}).call(t, function() {
			return this
		}())
	}, function(e, t) {
		"use strict";
		var r = function(e, t, n, i, a, o) {
			var l = this;
			l.numeralDecimalMark = e || ".", l.numeralIntegerScale = t > 0 ? t : 0, l.numeralDecimalScale = n >= 0 ? n : 2, l.numeralThousandsGroupStyle = i || r.groupStyle.thousand, l.numeralPositiveOnly = !!a, l.delimiter = o || "" === o ? o : ",", l.delimiterRE = o ? new RegExp("\\" + o, "g") : ""
		};
		r.groupStyle = {
			thousand: "thousand",
			lakh: "lakh",
			wan: "wan"
		}, r.prototype = {
			getRawValue: function(e) {
				return e.replace(this.delimiterRE, "").replace(this.numeralDecimalMark, ".")
			},
			format: function(e) {
				var t, n, i = this,
					a = "";
				switch (e = e.replace(/[A-Za-z]/g, "").replace(i.numeralDecimalMark, "M").replace(/[^\dM-]/g, "").replace(/^\-/, "N").replace(/\-/g, "").replace("N", i.numeralPositiveOnly ? "" : "-").replace("M", i.numeralDecimalMark).replace(/^(-)?0+(?=\d)/, "$1"), n = e, e.indexOf(i.numeralDecimalMark) >= 0 && (t = e.split(i.numeralDecimalMark), n = t[0], a = i.numeralDecimalMark + t[1].slice(0, i.numeralDecimalScale)), i.numeralIntegerScale > 0 && (n = n.slice(0, i.numeralIntegerScale + ("-" === e.slice(0, 1) ? 1 : 0))), i.numeralThousandsGroupStyle) {
					case r.groupStyle.lakh:
						n = n.replace(/(\d)(?=(\d\d)+\d$)/g, "$1" + i.delimiter);
						break;
					case r.groupStyle.wan:
						n = n.replace(/(\d)(?=(\d{4})+$)/g, "$1" + i.delimiter);
						break;
					default:
						n = n.replace(/(\d)(?=(\d{3})+$)/g, "$1" + i.delimiter)
				}
				return n.toString() + (i.numeralDecimalScale > 0 ? a.toString() : "")
			}
		}, e.exports = r
	}, function(e, t) {
		"use strict";
		var r = function(e) {
			var t = this;
			t.blocks = [], t.datePattern = e, t.initBlocks()
		};
		r.prototype = {
			initBlocks: function() {
				var e = this;
				e.datePattern.forEach(function(t) {
					"Y" === t ? e.blocks.push(4) : e.blocks.push(2)
				})
			},
			getBlocks: function() {
				return this.blocks
			},
			getValidatedDate: function(e) {
				var t = this,
					r = "";
				return e = e.replace(/[^\d]/g, ""), t.blocks.forEach(function(n, i) {
					if (e.length > 0) {
						var a = e.slice(0, n),
							o = a.slice(0, 1),
							l = e.slice(n);
						switch (t.datePattern[i]) {
							case "d":
								"00" === a ? a = "01" : parseInt(o, 10) > 3 ? a = "0" + o : parseInt(a, 10) > 31 && (a = "31");
								break;
							case "m":
								"00" === a ? a = "01" : parseInt(o, 10) > 1 ? a = "0" + o : parseInt(a, 10) > 12 && (a = "12")
						}
						r += a, e = l
					}
				}), this.getFixedDateString(r)
			},
			getFixedDateString: function(e) {
				var t, r, n, i = this,
					a = i.datePattern,
					o = [],
					l = 0,
					s = 0,
					c = 0,
					u = 0,
					d = 0,
					p = 0;
				return 4 === e.length && "y" !== a[0].toLowerCase() && "y" !== a[1].toLowerCase() && (u = "d" === a[0] ? 0 : 2, d = 2 - u, t = parseInt(e.slice(u, u + 2), 10), r = parseInt(e.slice(d, d + 2), 10), o = this.getFixedDate(t, r, 0)), 8 === e.length && (a.forEach(function(e, t) {
					switch (e) {
						case "d":
							l = t;
							break;
						case "m":
							s = t;
							break;
						default:
							c = t
					}
				}), p = 2 * c, u = c >= l ? 2 * l : 2 * l + 2, d = c >= s ? 2 * s : 2 * s + 2, t = parseInt(e.slice(u, u + 2), 10), r = parseInt(e.slice(d, d + 2), 10), n = parseInt(e.slice(p, p + 4), 10), o = this.getFixedDate(t, r, n)), 0 === o.length ? e : a.reduce(function(e, t) {
					switch (t) {
						case "d":
							return e + i.addLeadingZero(o[0]);
						case "m":
							return e + i.addLeadingZero(o[1]);
						default:
							return e + "" + (o[2] || "")
					}
				}, "")
			},
			getFixedDate: function(e, t, r) {
				return e = Math.min(e, 31), t = Math.min(t, 12), r = parseInt(r || 0, 10), (7 > t && t % 2 === 0 || t > 8 && t % 2 === 1) && (e = Math.min(e, 2 === t ? this.isLeapYear(r) ? 29 : 28 : 30)), [e, t, r]
			},
			isLeapYear: function(e) {
				return e % 4 === 0 && e % 100 !== 0 || e % 400 === 0
			},
			addLeadingZero: function(e) {
				return (10 > e ? "0" : "") + e
			}
		}, e.exports = r
	}, function(e, t) {
		"use strict";
		var r = function(e, t) {
			var r = this;
			r.delimiter = t || "" === t ? t : " ", r.delimiterRE = t ? new RegExp("\\" + t, "g") : "", r.formatter = e
		};
		r.prototype = {
			setFormatter: function(e) {
				this.formatter = e
			},
			format: function(e) {
				var t = this;
				t.formatter.clear(), e = e.replace(/[^\d+]/g, ""), e = e.replace(t.delimiterRE, "");
				for (var r, n = "", i = !1, a = 0, o = e.length; o > a; a++) r = t.formatter.inputDigit(e.charAt(a)), /[\s()-]/g.test(r) ? (n = r, i = !0) : i || (n = r);
				return n = n.replace(/[()]/g, ""), n = n.replace(/[\s-]/g, t.delimiter)
			}
		}, e.exports = r
	}, function(e, t) {
		"use strict";
		var r = {
			blocks: {
				uatp: [4, 5, 6],
				amex: [4, 6, 5],
				diners: [4, 6, 4],
				discover: [4, 4, 4, 4],
				mastercard: [4, 4, 4, 4],
				dankort: [4, 4, 4, 4],
				instapayment: [4, 4, 4, 4],
				jcb: [4, 4, 4, 4],
				maestro: [4, 4, 4, 4],
				visa: [4, 4, 4, 4],
				general: [4, 4, 4, 4],
				generalStrict: [4, 4, 4, 7]
			},
			re: {
				uatp: /^(?!1800)1\d{0,14}/,
				amex: /^3[47]\d{0,13}/,
				discover: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
				diners: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
				mastercard: /^(5[1-5]|2[2-7])\d{0,14}/,
				dankort: /^(5019|4175|4571)\d{0,12}/,
				instapayment: /^63[7-9]\d{0,13}/,
				jcb: /^(?:2131|1800|35\d{0,2})\d{0,12}/,
				maestro: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
				visa: /^4\d{0,15}/
			},
			getInfo: function(e, t) {
				var n = r.blocks,
					i = r.re;
				return t = !!t, i.amex.test(e) ? {
					type: "amex",
					blocks: n.amex
				} : i.uatp.test(e) ? {
					type: "uatp",
					blocks: n.uatp
				} : i.diners.test(e) ? {
					type: "diners",
					blocks: n.diners
				} : i.discover.test(e) ? {
					type: "discover",
					blocks: t ? n.generalStrict : n.discover
				} : i.mastercard.test(e) ? {
					type: "mastercard",
					blocks: n.mastercard
				} : i.dankort.test(e) ? {
					type: "dankort",
					blocks: n.dankort
				} : i.instapayment.test(e) ? {
					type: "instapayment",
					blocks: n.instapayment
				} : i.jcb.test(e) ? {
					type: "jcb",
					blocks: n.jcb
				} : i.maestro.test(e) ? {
					type: "maestro",
					blocks: t ? n.generalStrict : n.maestro
				} : i.visa.test(e) ? {
					type: "visa",
					blocks: t ? n.generalStrict : n.visa
				} : {
					type: "unknown",
					blocks: t ? n.generalStrict : n.general
				}
			}
		};
		e.exports = r
	}, function(e, t) {
		"use strict";
		var r = {
			noop: function() {},
			strip: function(e, t) {
				return e.replace(t, "")
			},
			isDelimiter: function(e, t, r) {
				return 0 === r.length ? e === t : r.some(function(t) {
					return e === t ? !0 : void 0
				})
			},
			getDelimiterREByDelimiter: function(e) {
				return new RegExp(e.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"), "g")
			},
			stripDelimiters: function(e, t, r) {
				var n = this;
				if (0 === r.length) {
					var i = t ? n.getDelimiterREByDelimiter(t) : "";
					return e.replace(i, "")
				}
				return r.forEach(function(t) {
					e = e.replace(n.getDelimiterREByDelimiter(t), "")
				}), e
			},
			headStr: function(e, t) {
				return e.slice(0, t)
			},
			getMaxLength: function(e) {
				return e.reduce(function(e, t) {
					return e + t
				}, 0)
			},
			getPrefixStrippedValue: function(e, t, r) {
				if (e.slice(0, r) !== t) {
					var n = this.getFirstDiffIndex(t, e.slice(0, r));
					e = t + e.slice(n, n + 1) + e.slice(r + 1)
				}
				return e.slice(r)
			},
			getFirstDiffIndex: function(e, t) {
				for (var r = 0; e.charAt(r) === t.charAt(r);)
					if ("" === e.charAt(r++)) return -1;
				return r
			},
			getFormattedValue: function(e, t, r, n, i) {
				var a, o = "",
					l = i.length > 0;
				return 0 === r ? e : (t.forEach(function(t, s) {
					if (e.length > 0) {
						var c = e.slice(0, t),
							u = e.slice(t);
						o += c, a = l ? i[s] || a : n, c.length === t && r - 1 > s && (o += a), e = u
					}
				}), o)
			},
			isAndroid: function() {
				return !(!navigator || !/android/i.test(navigator.userAgent))
			},
			isAndroidBackspaceKeydown: function(e, t) {
				return this.isAndroid() ? t === e.slice(0, -1) : !1
			}
		};
		e.exports = r
	}, function(e, t) {
		(function(t) {
			"use strict";
			var r = {
				assign: function(e, r) {
					return e = e || {}, r = r || {}, e.creditCard = !!r.creditCard, e.creditCardStrictMode = !!r.creditCardStrictMode, e.creditCardType = "", e.onCreditCardTypeChanged = r.onCreditCardTypeChanged || function() {}, e.phone = !!r.phone, e.phoneRegionCode = r.phoneRegionCode || "AU", e.phoneFormatter = {}, e.date = !!r.date, e.datePattern = r.datePattern || ["d", "m", "Y"], e.dateFormatter = {}, e.numeral = !!r.numeral, e.numeralIntegerScale = r.numeralIntegerScale > 0 ? r.numeralIntegerScale : 0, e.numeralDecimalScale = r.numeralDecimalScale >= 0 ? r.numeralDecimalScale : 2, e.numeralDecimalMark = r.numeralDecimalMark || ".", e.numeralThousandsGroupStyle = r.numeralThousandsGroupStyle || "thousand", e.numeralPositiveOnly = !!r.numeralPositiveOnly, e.numericOnly = e.creditCard || e.date || !!r.numericOnly, e.uppercase = !!r.uppercase, e.lowercase = !!r.lowercase, e.prefix = e.creditCard || e.phone || e.date ? "" : r.prefix || "", e.prefixLength = e.prefix.length, e.rawValueTrimPrefix = !!r.rawValueTrimPrefix, e.copyDelimiter = !!r.copyDelimiter, e.initValue = void 0 !== r.initValue && null !== r.initValue ? r.initValue.toString() : "", e.delimiter = r.delimiter || "" === r.delimiter ? r.delimiter : r.date ? "/" : r.numeral ? "," : (r.phone, " "), e.delimiterLength = e.delimiter.length, e.delimiters = r.delimiters || [], e.blocks = r.blocks || [], e.blocksLength = e.blocks.length, e.root = "object" == typeof t && t ? t : window, e.maxLength = 0, e.backspace = !1, e.result = "", e
				}
			};
			e.exports = r
		}).call(t, function() {
			return this
		}())
	}])
});