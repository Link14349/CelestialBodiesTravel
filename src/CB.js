"use strict";

!function (CBTravel) {
    let module = {};

    class CB {
        constructor(pos, weight, r, F, cbt) {
            this.pos = pos.copy();
            this.weight = weight;
            this.r = r;
            this.F = F;
            this.cbt = cbt;
            this.__crashed = false;
            cbt.objects.push(this);
        }
        update() {
            if (this.__crashed) return;
            this.pos.x += this.F.x / this.weight * CBTravel.SPEED;
            this.pos.y += this.F.y / this.weight * CBTravel.SPEED;
            let objects = this.cbt.objects;
            objects.forEach(function (value) {
                if (value === this || value.crashed) return;
                if (CB.crash(this, value)) {
                    this.__crashed = true;
                    value.__crashed = true;
                    new CB(this.pos, this.weight + value.weight, (this.r + value.r) * 0.8, this.F.sub(value.F), this.cbt);
                    return;
                }
                // console.log(this);
                let Fg = CBTravel.Physical.FGravity(this, value) / this.weight * CBTravel.SPEED;
                let pd = value.pos.sub(this.pos).norm();
                pd = pd.mul(Fg);
                // console.log(pd.x);
                this.pos.x += pd.x;
                this.pos.y += pd.y;
                this.F.x += pd.x * this.weight;
                this.F.y += pd.y * this.weight;
                if (CB.crash(this, value)) {
                    this.__crashed = true;
                    value.__crashed = true;
                    new CB(this.pos, this.weight + value.weight, (this.r + value.r) * 0.8, this.F.sub(value.F), this.cbt);
                }
            }.bind(this));
        }
        static crash(cb1, cb2) {
            return (cb2.pos.sub(cb1.pos).mod()) <= (cb1.r + cb2.r);
        }
        get crashed() { return this.__crashed; }
    }

    module.CB = CB;

    CBTravel.CB = module;
}(CBTravel);