"use strict";

!function (CBTravel) {
    let module = {};

    class Vector2 {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        add(s) {
            let v = this.copy();
            if (typeof s === "object") {
                v.x += s.x;
                v.y += s.y;
            } else {
                v.x += s;
                v.y += s;
            }
            return v;
        }
        sub(s) {
            let v = this.copy();
            if (typeof s === "object") {
                v.x -= s.x;
                v.y -= s.y;
            } else {
                v.x -= s;
                v.y -= s;
            }
            return v;
        }
        mul(s) {
            let v = this.copy();
            if (typeof s === "object") {
                v.x *= s.x;
                v.y *= s.y;
            } else {
                v.x *= s;
                v.y *= s;
            }
            return v;
        }
        div(s) {
            let v = this.copy();
            if (typeof s === "object") {
                v.x /= s.x;
                v.y /= s.y;
            } else {
                v.x /= s;
                v.y /= s;
            }
            return v;
        }
        mod() {
            return Math.sqrt(this.x ** 2 + this.y ** 2);
        }
        mod2() {
            return this.x ** 2 + this.y ** 2;
        }
        norm() {
            let mod = this.mod();
            this.x /= mod;
            this.y /= mod;
            return this;
        }
        copy() {
            return new Vector2(this.x, this.y);
        }
    }

    module.Vector2 = Vector2;

    CBTravel.math = module;
}(CBTravel);