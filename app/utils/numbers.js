// t: current time // b: start value // c: change value // d: duration

export const easeOutQuad = (t, b, c, d) => {
	t /= d;
	return -c * t * (t -2) + b;
};

export const easeInOutElastic = (t, b, c, d) => {
	let s = 1.70158;
	let p = 0;
	let a = c;
	if (t==0) return b;
	if ((t/=d/2)==2) return b+c;
	if (!p) p=d*(.3*1.5);
	if (a < Math.abs(c)) { a=c; s=p/4; } else s = p/(2*Math.PI) * Math.asin (c/a);
	if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
};

export const easeOutBounce = (t, b, c, d) => {
	if ((t/=d) < (1/2.75)) {
		return c*(7.5625*t*t) + b;
	} else if (t < (2/2.75)) {
		return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
	} else if (t < (2.5/2.75)) {
		return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
	} else {
		return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
	}
};

export const easeInBounce = (t, b, c, d) => (c - easeOutBounce(d-t, 0, c, d) + b);

export const easeInOutBounce = (t, b, c, d) => {
	if (t < d/2) return easeInBounce (t*2, 0, c, d) * .5 + b;
	return easeOutBounce (t*2-d, 0, c, d) * .5 + c*.5 + b;
}

export const degToRad = (deg) => (Math.PI * deg / 180);

export const radToDeg = (rad) => (180 * rad / Math.PI);

export const lerp = (t, a, b) => ((1 - t) * a + t * b);

export const random = (min, max) => (Math.random() * (max - min) + min);

export const map = (valeur, minRef, maxRef, minDest, maxDest) => {
	let resultat = minDest + (valeur - minRef) * (maxDest - minDest) / (maxRef - minRef);
	if(resultat < Math.min(minDest, maxDest)){ resultat = Math.min(minDest, maxDest); }
	if(resultat > Math.max(minDest, maxDest)){ resultat = Math.max(minDest, maxDest); }
	return resultat;
}