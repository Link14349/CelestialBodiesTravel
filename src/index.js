"use strict";

class CBTravel {
    constructor(canvas) {
        this.__canvas = canvas;
        this.__ctx = canvas.getContext("2d");
        this.objects = [];
        this.x = 0;
        this.y = 0;
    }
    update() {
        let colors = ["#f00", "#ff0", "#00f", "#0f0", "#0ff", "#f0f", "#fa0", "#000"];
        let {ctx, width, height} = this;
        // ctx.clearRect(0, 0, width, height);
        this.objects.forEach(function (value, index) {
            value.update();
            ctx.beginPath();
            let p = value.pos;
            p.x -= this.x;
            p.y -= this.y;
            p = p.div(CBTravel.SCALE);
            // console.log(p);
            ctx.arc(p.x + width / 2, -p.y + height / 2, Math.max(5, value.r / CBTravel.SCALE), 0, Math.PI * 2);
            ctx.fillStyle = colors[index];
            ctx.fill();
            ctx.closePath();
        }.bind(this));
    }

    get canvas() { return this.__canvas; }
    get ctx() { return this.__ctx; }
    get width() { return this.__canvas.width; }
    get height() { return this.__canvas.height; }
    set width(w) {
        this.__canvas.width = w;
        return w;
    }
    set height(h) {
        this.__canvas.height = h;
        return h;
    }
}

CBTravel.SCALE = 1e8;
CBTravel.SPEED = 1e0;