/**
 * dependencies:
 * none
 */

/**
 * function definitions
 */

function createSphere() {
	ggbApplet.evalCommand('Oo = (0,0,0)');
	ggbApplet.evalCommand('r_{o slider} = Slider[0.1, 10]');
	ggbApplet.evalCommand('SetValue[r_{o slider}, 1]');
	ggbApplet.evalCommand('so = Sphere[Oo, r_{o slider}]');
	ggbApplet.evalCommand('O = Midpoint[so]');
}

function createThreePlanes() {
	for (var i = 0; i < 9; i++) {
		ggbApplet.evalCommand('P_' + i + ' = (RandomUniform[-100, 100],'
				+ 'RandomUniform[-100, 100], RandomUniform[-100, 100])');
	}
	for (var i = 0; i < 3; i++) {
		var p1 = i * 3;
		var p2 = i * 3 + 1;
		var p3 = i * 3 + 2;
		ggbApplet.evalCommand('e_' + i + ' = Plane[ P_' + i * 3 + ', P_'
				+ (i * 3 + 1) + ', P_' + (i * 3 + 2) + ']');
	}
}

/**
 * main script
 */
createSphere();
createThreePlanes();
ggbApplet.evalCommand('commonLine = Intersect[e_0, e_1]');
ggbApplet.evalCommand('CommonPoint = Intersect[e_2, commonLine]');
ggbApplet.evalCommand('rayFromO = Ray[O, CommonPoint]');
ggbApplet.evalCommand('PointOnRay = Point[rayFromO, 0.7]');
ggbApplet.evalCommand('pointRayWithZero = Ray[CommonPoint, PointOnRay]');
/*
 * point really close to CommonPoint but not same to prevent Radii from getting
 * Zero
 */
ggbApplet.evalCommand('PointOnRayWithZero = Point[pointRayWithZero, 0.001]');
ggbApplet.evalCommand('midpointRay = Ray[PointOnRayWithZero, PointOnRay]');
