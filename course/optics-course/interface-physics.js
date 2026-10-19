/* Shared, dimensionless interface calculation. Nonmagnetic, lossless isotropic
   media; book Fig. 1.20 p-basis convention; angles are measured from the normal. */
window.OpticsInterface = {
  fresnel(n1, n2, degrees) {
    const theta1 = degrees * Math.PI / 180;
    const c1 = Math.cos(theta1);
    const s2 = n1 * Math.sin(theta1) / n2;
    if (s2 > 1 + 1e-12) {
      return { theta2: null, rs: null, rp: null, ts: null, tp: null, Rs: 1, Rp: 1, Ts: 0, Tp: 0, tir: true };
    }
    const theta2 = Math.asin(Math.min(1, s2));
    const c2 = Math.sqrt(Math.max(0, 1 - s2 * s2));
    const ds = n1 * c1 + n2 * c2;
    const dp = n2 * c1 + n1 * c2;
    const rs = (n1 * c1 - n2 * c2) / ds;
    const rp = (n2 * c1 - n1 * c2) / dp;
    const ts = 2 * n1 * c1 / ds;
    const tp = 2 * n1 * c1 / dp;
    const flux = n2 * c2 / (n1 * c1);
    return { theta2, rs, rp, ts, tp, Rs: rs * rs, Rp: rp * rp, Ts: flux * ts * ts, Tp: flux * tp * tp, tir: false };
  },
};
