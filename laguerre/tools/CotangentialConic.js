/**
 * function definitions
 */
function createMidpoints() {
	ggbApplet.evalCommand('Mo = (5,0,0)');
	ggbApplet.evalCommand('Oo = (0,0,0)');
}

function createSliders() {
	ggbApplet.evalCommand('r_{o slider} = Slider[0.1, 10]');
	ggbApplet.evalCommand('r_{m slider} = Slider[0.1, 10]');

	ggbApplet.evalCommand('SetValue[r_{o slider}, 1]');
	ggbApplet.evalCommand('SetValue[r_{m slider}, 1]');
}

function createSpheresMidpointsAndRadii() {
	ggbApplet.evalCommand('so = Sphere[Oo, r_{o slider}]');
	ggbApplet.evalCommand('sm = Sphere[Mo, r_{m slider}]');

	ggbApplet.evalCommand('O = Midpoint[so]');
	ggbApplet.evalCommand('M = Midpoint[sm]');

	ggbApplet.evalCommand('ro = Radius[so]');
	ggbApplet.evalCommand('rm = Radius[sm]');
}

function createThreePointsOnCone(cone){
	ggbApplet.evalCommand("P_1 = Point[" + cone + ", 1]");
	ggbApplet.evalCommand("P_2 = Point[" + cone + ", 1/2]");
	ggbApplet.evalCommand("P_3 = Point[" + cone + ", 1/4]");
}

function projectOntoRealSphere(){
	ggbApplet.evalCommand("ray1 = Ray[If[ro >= rm, O, M],P_1]");
	ggbApplet.evalCommand("ray2 = Ray[If[ro >= rm, O, M],P_2]");
	ggbApplet.evalCommand("ray3 = Ray[If[ro >= rm, O, M],P_3]");
	
}
/**
 * main script
 */
createMidpoints();
createSliders();
createSpheresMidpointsAndRadii();

ggbApplet.evalCommand("rd = abs(rm - ro)");
ggbApplet.evalCommand("seg = Segment[M, O]");
ggbApplet.evalCommand("Mid = Midpoint[seg]");
ggbApplet.evalCommand("sd = Sphere[If[ro >= rm, O, M], rd]");
ggbApplet.evalCommand("smid = Sphere[Mid, Distance[Mid, M]]");
ggbApplet.evalCommand("coned = If[ro != rm, Intersect[smid, sd], "
		+ "Intersect[OrthogonalPlane[O, Vector[M, O]], so]]");

createThreePointsOnCone("coned");
projectOntoRealSphere();
ggbApplet.evalCommand("");
ggbApplet.evalCommand("");
ggbApplet.evalCommand("");
// TODO delete previous token