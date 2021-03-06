﻿RBTree = function () {
    var p = function (h) { h = p.m[h]; if (h.mod) return h.mod.exports; var b = h.mod = { exports: {} }; h(b, b.exports); return b.exports }; p.m = {}; p.m["./treebase"] = function (h) {
        function b() { } function e(a) { this._tree = a; this._ancestors = []; this._cursor = null } b.prototype.clear = function () { this._root = null; this.size = 0 }; b.prototype.find = function (a) { for (var j = this._root; null !== j;) { var d = this._comparator(a, j.data); if (0 === d) return j.data; j = j.get_child(0 < d) } return null }; b.prototype.findIter = function (a) {
            for (var j = this._root,
            d = this.iterator() ; null !== j;) { var b = this._comparator(a, j.data); if (0 === b) return d._cursor = j, d; d._ancestors.push(j); j = j.get_child(0 < b) } return null
        }; b.prototype.lowerBound = function (a) { return this._bound(a, this._comparator) }; b.prototype.upperBound = function (a) { var b = this._comparator; return this._bound(a, function (a, g) { return b(g, a) }) }; b.prototype.min = function () { var a = this._root; if (null === a) return null; for (; null !== a.left;) a = a.left; return a.data }; b.prototype.max = function () {
            var a = this._root; if (null === a) return null;
            for (; null !== a.right;) a = a.right; return a.data
        }; b.prototype.iterator = function () { return new e(this) }; b.prototype.each = function (a) { for (var b = this.iterator(), d; null !== (d = b.next()) ;) a(d) }; b.prototype.reach = function (a) { for (var b = this.iterator(), d; null !== (d = b.prev()) ;) a(d) }; b.prototype._bound = function (a, b) {
            for (var d = this._root, g = this.iterator() ; null !== d;) { var q = this._comparator(a, d.data); if (0 === q) return g._cursor = d, g; g._ancestors.push(d); d = d.get_child(0 < q) } for (q = g._ancestors.length - 1; 0 <= q; --q) if (d = g._ancestors[q],
            0 < b(a, d.data)) return g._cursor = d, g._ancestors.length = q, g; g._ancestors.length = 0; return g
        }; e.prototype.data = function () { return null !== this._cursor ? this._cursor.data : null }; e.prototype.next = function () {
            if (null === this._cursor) { var a = this._tree._root; null !== a && this._minNode(a) } else if (null === this._cursor.right) { do if (a = this._cursor, this._ancestors.length) this._cursor = this._ancestors.pop(); else { this._cursor = null; break } while (this._cursor.right === a) } else this._ancestors.push(this._cursor), this._minNode(this._cursor.right);
            return null !== this._cursor ? this._cursor.data : null
        }; e.prototype.prev = function () { if (null === this._cursor) { var a = this._tree._root; null !== a && this._maxNode(a) } else if (null === this._cursor.left) { do if (a = this._cursor, this._ancestors.length) this._cursor = this._ancestors.pop(); else { this._cursor = null; break } while (this._cursor.left === a) } else this._ancestors.push(this._cursor), this._maxNode(this._cursor.left); return null !== this._cursor ? this._cursor.data : null }; e.prototype._minNode = function (a) {
            for (; null !== a.left;) this._ancestors.push(a),
            a = a.left; this._cursor = a
        }; e.prototype._maxNode = function (a) { for (; null !== a.right;) this._ancestors.push(a), a = a.right; this._cursor = a }; h.exports = b
    }; p.m.__main__ = function (h) {
        function b(a) { this.data = a; this.right = this.left = null; this.red = !0 } function e(a) { this._root = null; this._comparator = a; this.size = 0 } function a(a) { return null !== a && a.red } function j(a, b) { var c = a.get_child(!b); a.set_child(!b, c.get_child(b)); c.set_child(b, a); a.red = !0; c.red = !1; return c } function d(a, b) {
            a.set_child(!b, j(a.get_child(!b), !b)); return j(a,
            b)
        } var g = p("./treebase"); b.prototype.get_child = function (a) { return a ? this.right : this.left }; b.prototype.set_child = function (a, b) { a ? this.right = b : this.left = b }; e.prototype = new g; e.prototype.insert = function (g) {
            var e = !1; if (null === this._root) this._root = new b(g), e = !0, this.size++; else {
                var c = new b(void 0), l = 0, r = 0, n = null, m = c, k = null, f = this._root; for (m.right = this._root; ;) {
                    null === f ? (f = new b(g), k.set_child(l, f), e = !0, this.size++) : a(f.left) && a(f.right) && (f.red = !0, f.left.red = !1, f.right.red = !1); if (a(f) && a(k)) {
                        var h = m.right ===
                        n; f === k.get_child(r) ? m.set_child(h, j(n, !r)) : m.set_child(h, d(n, !r))
                    } h = this._comparator(f.data, g); if (0 === h) break; r = l; l = 0 > h; null !== n && (m = n); n = k; k = f; f = f.get_child(l)
                } this._root = c.right
            } this._root.red = !1; return e
        }; e.prototype.remove = function (g) {
            if (null === this._root) return !1; var h = new b(void 0), c = h; c.right = this._root; for (var l = null, e = null, n = null, m = 1; null !== c.get_child(m) ;) {
                var k = m, e = l, l = c, c = c.get_child(m), f = this._comparator(g, c.data), m = 0 < f; 0 === f && (n = c); if (!a(c) && !a(c.get_child(m))) if (a(c.get_child(!m))) e =
                j(c, m), l.set_child(k, e), l = e; else if (!a(c.get_child(!m)) && (f = l.get_child(!k), null !== f)) if (!a(f.get_child(!k)) && !a(f.get_child(k))) l.red = !1, f.red = !0, c.red = !0; else { var p = e.right === l; a(f.get_child(k)) ? e.set_child(p, d(l, k)) : a(f.get_child(!k)) && e.set_child(p, j(l, k)); k = e.get_child(p); k.red = !0; c.red = !0; k.left.red = !1; k.right.red = !1 }
            } null !== n && (n.data = c.data, l.set_child(l.right === c, c.get_child(null === c.left)), this.size--); this._root = h.right; null !== this._root && (this._root.red = !1); return null !== n
        }; h.exports =
        e
    }; return p("__main__")
}(window);