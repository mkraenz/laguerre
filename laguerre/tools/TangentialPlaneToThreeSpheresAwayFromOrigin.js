/**
 * dependencies:
 * CotangentialConic
 * BiggestOfThreeSpheres
 */

/**
 * function definitions
 */
function createMidpoints() {
	ggbApplet.evalCommand('Mo = (5,0,0)');
	ggbApplet.evalCommand('Oo = (0,0,0)');
	ggbApplet.evalCommand('Xo = (0,5,3)');
}

// for ref see https://wiki.geogebra.org/en/Slider_Command
function createSliders() {
	ggbApplet.evalCommand('r_{o slider} = Slider[0.1, 10]');
	ggbApplet.evalCommand('r_{m slider} = Slider[0.1, 10]');
	ggbApplet.evalCommand('r_{x slider} = Slider[0.1, 10]');

	ggbApplet.evalCommand('SetValue[r_{o slider}, 1]');
	ggbApplet.evalCommand('SetValue[r_{m slider}, 1]');
	ggbApplet.evalCommand('SetValue[r_{x slider}, 1]');
}

function createSpheres() {
	ggbApplet.evalCommand('so = Sphere[Oo, r_{o slider}]');
	ggbApplet.evalCommand('sm = Sphere[Mo, r_{m slider}]');
	ggbApplet.evalCommand('sx = Sphere[Xo, r_{x slider}]');
}

function createAbstractedMidpointsAndRadii() {
	ggbApplet.evalCommand('O = Midpoint[so]');
	ggbApplet.evalCommand('M = Midpoint[sm]');
	ggbApplet.evalCommand('X = Midpoint[sx]');

	ggbApplet.evalCommand('ro = Radius[so]');
	ggbApplet.evalCommand('rm = Radius[sm]');
	ggbApplet.evalCommand('rx = Radius[sx]');
}

/**
 * main script
 */
createMidpoints();
createSliders();
createSpheres();
createAbstractedMidpointsAndRadii();
ggbApplet.evalCommand('Origin = (0,0,0)');

ggbApplet.evalCommand('sbig = BiggestOfThreeSpheres[so, sm, sx]');
ggbApplet.evalCommand('fullSphereList = {sm, so, sx}');
// hacky way to remove sbig from fullSphereList
ggbApplet.evalCommand('sphereList = KeepIf[(Radius[sphere] != Radius[sbig])'
		+ '|| (Center[sphere] != Center[sbig]), sphere, fullSphereList ]');

ggbApplet
		.evalCommand('cone1 = CotangentialConic[sbig, Element[sphereList, 1]]');
ggbApplet
		.evalCommand('cone2 = CotangentialConic[sbig, Element[sphereList, 2]]');
ggbApplet.evalCommand('P = Intersect[cone1, cone2]');
ggbApplet
		.evalCommand('tp = TangentplaneToSphere[sbig, If[Distance[P_1, Origin] '
				+ '>= Distance[P_2, Origin], P_1, P_2]]');