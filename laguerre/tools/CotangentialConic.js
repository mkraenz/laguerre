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

function createThreePointsOnCone(cone) {
	ggbApplet.evalCommand("P_1 = Point[" + cone + ", 1]");
	ggbApplet.evalCommand("P_2 = Point[" + cone + ", 1/2]");
	ggbApplet.evalCommand("P_3 = Point[" + cone + ", 1/4]");
}

function projectOntoBigSphere() {
	ggbApplet.evalCommand("ray1 = Ray[Midpoint[sbig],P_1]");
	ggbApplet.evalCommand("ray2 = Ray[Midpoint[sbig],P_2]");
	ggbApplet.evalCommand("ray3 = Ray[Midpoint[sbig],P_3]");
	ggbApplet.evalCommand("PointOnSbig1 = Intersect[ray1, sbig] ");
	ggbApplet.evalCommand("PointOnSbig2 = Intersect[ray2, sbig]");
	ggbApplet.evalCommand("PointOnSbig3 = Intersect[ray3, sbig]");
}
/**
 * main script
 */
createMidpoints();
createSliders();
createSpheresMidpointsAndRadii();
ggbApplet.evalCommand("sbig = If[ro >= rm, so, sm]");
ggbApplet.evalCommand("rd = abs(rm - ro)");
ggbApplet.evalCommand("seg = Segment[M, O]");
ggbApplet.evalCommand("SegMid = Midpoint[seg]");
ggbApplet.evalCommand("sd = Sphere[Midpoint[sbig], rd]");
ggbApplet.evalCommand("sSegMid = Sphere[SegMid, Distance[SegMid, M]]");
ggbApplet.evalCommand("coned = If[ro != rm, Intersect[sSegMid, sd], "
		+ "Intersect[OrthogonalPlane[O, Vector[M, O]], so]]");

createThreePointsOnCone("coned");
projectOntoBigSphere();
/*
 * Here is possibly a bug source. GeoGebra tries to find 2 intersection points
 * of a ray with sbig. Hopefully, always the second index _2 will always be the
 * one which is defined, while the other is undefined. This might turn out to be
 * a false hope...
 */
ggbApplet.evalCommand("c = Circle[PointOnSbig1_2, PointOnSbig2_2,"
		+ " PointOnSbig3_2]");
