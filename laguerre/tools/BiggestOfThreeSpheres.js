/**
 * dependencies: none
 */ 

/**
 * function definitions
 */
function createMidpoints() {
	ggbApplet.evalCommand('Mo = (10,0,0)');
	ggbApplet.evalCommand('Oo = (0,0,0)');
	ggbApplet.evalCommand('Xo = (0,10,3)');
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

/**
 * main script
 */
createMidpoints();
createSliders();
createSpheres();
ggbApplet
		.evalCommand('bestOfTwoSpheres = If[Radius[so] >= Radius[sm], so, sm]');
ggbApplet
		.evalCommand('biggestSphere = If[Radius[bestOfTwoSpheres] >= Radius[sx], bestOfTwoSpheres, sx]');