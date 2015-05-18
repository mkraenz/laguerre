/**
 * dependencies:
 * TangentialPlaneToSphere
 * RayOfSphereMidpoints
 * TangentialPlaneToThreeSpheresAwayFromOrigin
 */

/**
 * function definitions
 */

function createOriginSphere(){
	ggbApplet.evalCommand('O_0 = (0,0,0)');
	ggbApplet.evalCommand('r_{0 slider} = Slider[0.1, 10]');
	ggbApplet.evalCommand('SetValue[r_{0 slider}, 1]');
	ggbApplet.evalCommand('s_0 = Sphere[O_0, r_{0 slider}]');
	ggbApplet.evalCommand('SetColor[s_0, "Gold"]')
	ggbApplet.evalCommand('O = Midpoint[s_0]');
	ggbApplet.evalCommand('r_0 = Radius[s_0]');
	ggbApplet.setVisible('O', false);
}

function createProjectionPoints(){
	ggbApplet.evalCommand('ProjX = (10,0,0)');
	ggbApplet.evalCommand('ProjY = (0,10,0)');
	ggbApplet.evalCommand('ProjZ = (0,0,10)');
}

function createTangentplanesToS_0(){
	ggbApplet.evalCommand('MidOfSegOtoProjX = Midpoint[Segment[O, ProjX]]');
	ggbApplet.evalCommand('MidOfSegOtoProjY = Midpoint[Segment[O, ProjY]]');
	ggbApplet.evalCommand('MidOfSegOtoProjZ = Midpoint[Segment[O, ProjZ]]');
	ggbApplet.setVisible('MidOfSegOtoProjX', false);
	ggbApplet.setVisible('MidOfSegOtoProjY', false);
	ggbApplet.setVisible('MidOfSegOtoProjZ', false);
	ggbApplet.evalCommand('sProjX = Sphere[MidOfSegOtoProjX, Distance[MidOfSegOtoProjX, O]]');
	ggbApplet.evalCommand('sProjY = Sphere[MidOfSegOtoProjY, Distance[MidOfSegOtoProjY, O]]');
	ggbApplet.evalCommand('sProjZ = Sphere[MidOfSegOtoProjZ, Distance[MidOfSegOtoProjZ, O]]');
	ggbApplet.setVisible('sProjX', false);
	ggbApplet.setVisible('sProjY', false);
	ggbApplet.setVisible('sProjZ', false);
	// there seems to be some bug with naming of conics defined by 
	// intersect. thus we have to use c,d,e
	ggbApplet.evalCommand('c = Intersect[sProjX, s_0]');
	ggbApplet.evalCommand('d = Intersect[sProjY, s_0]');
	ggbApplet.evalCommand('e = Intersect[sProjZ, s_0]');
	ggbApplet.renameObject('c', 'coneProjX');
	ggbApplet.renameObject('d', 'coneProjY');
	ggbApplet.renameObject('e', 'coneProjZ');
	ggbApplet.evalCommand('TPoint = Intersect[coneProjY, coneProjZ]');
	ggbApplet.renameObject('TPoint_1', 'TPoint_{1,0,0}');
	ggbApplet.renameObject('TPoint_2', 'TPoint_{-1,0,0}');
	ggbApplet.setVisible('TPoint_{1,0,0}', false);
	ggbApplet.setVisible('TPoint_{-1,0,0}', false);
	ggbApplet.evalCommand('TPoint = Intersect[coneProjX, coneProjZ]');
	ggbApplet.renameObject('TPoint_1', 'TPoint_{0,1,0}');
	ggbApplet.renameObject('TPoint_2', 'TPoint_{0,-1,0}');
	ggbApplet.setVisible('TPoint_{0,1,0}', false);
	ggbApplet.setVisible('TPoint_{0,-1,0}', false);
	ggbApplet.evalCommand('TPoint = Intersect[coneProjX, coneProjY]');
	ggbApplet.renameObject('TPoint_1', 'TPoint_{0,0,1}');
	ggbApplet.renameObject('TPoint_2', 'TPoint_{0,0,-1}');
	ggbApplet.setVisible('TPoint_{0,0,1}', false);
	ggbApplet.setVisible('TPoint_{0,0,-1}', false);
	ggbApplet.evalCommand('tp_{1,0,0} = TangentialPlaneToSphere[s_0, TPoint_{1,0,0}]');
	ggbApplet.evalCommand('tp_{-1,0,0} = TangentialPlaneToSphere[s_0, TPoint_{-1,0,0}]');
	ggbApplet.evalCommand('tp_{0,1,0} = TangentialPlaneToSphere[s_0, TPoint_{0,1,0}]');
	ggbApplet.evalCommand('tp_{0,-1,0} = TangentialPlaneToSphere[s_0, TPoint_{0,-1,0}]');
	ggbApplet.evalCommand('tp_{0,0,1} = TangentialPlaneToSphere[s_0, TPoint_{0,0,1}]');
	ggbApplet.evalCommand('tp_{0,0,-1} = TangentialPlaneToSphere[s_0, TPoint_{0,0,-1}]');
}

function createParameterMidpoints(){
	// TODO: implement
}

/**
 * main script
 */
createOriginSphere();
createProjectionPoints();
createTangentplanesToS_0();
createParameterMidpoints();
ggbApplet.evalCommand('');