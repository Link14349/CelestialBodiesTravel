"use strict";

!function (CBTravel) {
    let module = {};

    const G = 6.67e-11;
    function distancePow2(pd) {
        return pd.x ** 2 + pd.y ** 2;
    }

    function FGravity(tb1, tb2) {
        /*
        *       m1 * m2
        * Fg = --------- * G
        *         r^2
        * */
        return (
            (tb1.weight * tb2.weight)
            /
            distancePow2(tb1.pos.sub(tb2.pos))
            * G
        );
    }

    module.G = G;
    module.FGravity = FGravity;

    CBTravel.Physical = module;
}(CBTravel);