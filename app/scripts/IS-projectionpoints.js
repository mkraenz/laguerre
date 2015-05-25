/**
 * dependencies:
 * TangentialPlaneToSphere
 * RayOfSphereMidpoints
 * TangentialPlaneToThreeSpheresAwayFromOrigin
 */

/**
 * function definitions, for the interesting part see "main script"
 */

function createOriginSphere() {
	ggbApplet.evalCommand('O_0 = (0,0,0)');
	ggbApplet.evalCommand('r_{0 slider} = Slider[0.1, 10]');
	ggbApplet.evalCommand('SetValue[r_{0 slider}, 1]');
	ggbApplet.evalCommand('s_0 = Sphere[O_0, r_{0 slider}]');
	ggbApplet.evalCommand('SetColor[s_0, "Gold"]');
	ggbApplet.evalCommand('O = Midpoint[s_0]');
	ggbApplet.evalCommand('r_0 = Radius[s_0]');
	ggbApplet.setVisible('O', false);
}

function createProjectionPoints() {
	ggbApplet.evalCommand('ProjX = (10,0,0)');
	ggbApplet.evalCommand('ProjY = (0,10,0)');
	ggbApplet.evalCommand('ProjZ = (0,0,10)');
}

function createTangentplanesToS_0() {
	ggbApplet.evalCommand('MidOfSegOtoProjX = Midpoint[Segment[O, ProjX]]');
	ggbApplet.evalCommand('MidOfSegOtoProjY = Midpoint[Segment[O, ProjY]]');
	ggbApplet.evalCommand('MidOfSegOtoProjZ = Midpoint[Segment[O, ProjZ]]');
	ggbApplet.setVisible('MidOfSegOtoProjX', false);
	ggbApplet.setVisible('MidOfSegOtoProjY', false);
	ggbApplet.setVisible('MidOfSegOtoProjZ', false);
	ggbApplet
			.evalCommand('sProjX = Sphere[MidOfSegOtoProjX, Distance[MidOfSegOtoProjX, O]]');
	ggbApplet
			.evalCommand('sProjY = Sphere[MidOfSegOtoProjY, Distance[MidOfSegOtoProjY, O]]');
	ggbApplet
			.evalCommand('sProjZ = Sphere[MidOfSegOtoProjZ, Distance[MidOfSegOtoProjZ, O]]');
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
	ggbApplet.renameObject('TPoint_1', 'TPoint_{0,-1,0}');
	ggbApplet.renameObject('TPoint_2', 'TPoint_{0,1,0}');
	ggbApplet.setVisible('TPoint_{0,1,0}', false);
	ggbApplet.setVisible('TPoint_{0,-1,0}', false);
	ggbApplet.evalCommand('TPoint = Intersect[coneProjX, coneProjY]');
	ggbApplet.renameObject('TPoint_1', 'TPoint_{0,0,1}');
	ggbApplet.renameObject('TPoint_2', 'TPoint_{0,0,-1}');
	ggbApplet.setVisible('TPoint_{0,0,1}', false);
	ggbApplet.setVisible('TPoint_{0,0,-1}', false);
	ggbApplet
			.evalCommand('tp_{1,0,0} = TangentialPlaneToSphere[s_0, TPoint_{1,0,0}]');
	ggbApplet
			.evalCommand('tp_{-1,0,0} = TangentialPlaneToSphere[s_0, TPoint_{-1,0,0}]');
	ggbApplet
			.evalCommand('tp_{0,1,0} = TangentialPlaneToSphere[s_0, TPoint_{0,1,0}]');
	ggbApplet
			.evalCommand('tp_{0,-1,0} = TangentialPlaneToSphere[s_0, TPoint_{0,-1,0}]');
	ggbApplet
			.evalCommand('tp_{0,0,1} = TangentialPlaneToSphere[s_0, TPoint_{0,0,1}]');
	ggbApplet
			.evalCommand('tp_{0,0,-1} = TangentialPlaneToSphere[s_0, TPoint_{0,0,-1}]');
}

/**
 * Get the index of the next region outlined by the three given tangent planes.
 * For example tp_{1,0,0}, tp_{0,1,0}, tp_{0,0,1} define region {1,1,1}. The
 * algorithm works since the tangent planes always only have one index x or y or
 * z different from 0
 * 
 * @param index1
 *            {int-Array} index of the tangent plane in the form "12,1,0" =:
 *            "x,y,z"
 * @param index2
 *            see index1
 * @param index3
 *            see index1
 * @return {int-Array} index of the outlined region
 */
function getRegionIndex(index1, index2, index3) {
	var regionIndex = [];
	for (var i = 0; i < index1.length; i++) {
		if (index1[i] != 0) {
			regionIndex.push(index1[i]);
		} else {
			if (index2[i] != 0) {
				regionIndex.push(index2[i]);
			} else {
				regionIndex.push(index3[i]);
			}
		}
	}
	return regionIndex;
}

/**
 * see photos taken on 2015-05-19
 * 
 * @param regionIndex index of the region the ray points into.
 * @returns {int-Array}
 */
function getInitialMidpointRayEmitterDirection(regionIndex) {
	var direction = [];
	for (var i = 0; i < regionIndex.length; i++) {
		if (regionIndex[i] > 0) {
			direction.push(-1);
		} else {
			direction.push(1);
		}
	}
	return direction;
}

/**
 * 
 * @param index
 *            {int-Array} the index as an array in the form [0,1,54,1,-1,1]
 *            where the last three entries are either 1 or -1
 * @returns {String} of the form 'midpointRay_{0,1,54,+,+,-}'
 */
function midpointRayToString(index) {
	var indexCopy = index.slice(0);
	for (var i = 3; i < indexCopy.length; i++) {
		if (indexCopy[i] == 1) {
			indexCopy[i] = '+';
		} else {
			indexCopy[i] = '-';
		}
	}
	return 'midpointRay_{' + indexCopy.toString() + '}';
}

function createParameterMidpoints() {
	var createParameterMidpointrays = function(planeIndex1, planeIndex2,
			planeIndex3, startRegionIndex) {
		var targetRegion = getRegionIndex(planeIndex1, planeIndex2, planeIndex3);
		var direction = getInitialMidpointRayEmitterDirection(targetRegion);
		var midpointRayIndex = targetRegion.concat(direction);
		var midpointRayName = midpointRayToString(midpointRayIndex);
		ggbApplet.evalCommand(midpointRayName
				+ ' = RayOfSphereMidpoints[s_0, tp_{' + planeIndex1.toString()
				+ '}, tp_{' + planeIndex2.toString() + '}, tp_{'
				+ planeIndex3.toString() + '}]');
		ggbApplet.setVisible(midpointRayName, false);
	}

	var createParameterMidpointsSubroutine = function(planeIndex1, planeIndex2,
			planeIndex3) {
		var regionIndexArray = getRegionIndex(planeIndex1, planeIndex2,
				planeIndex3);
		var regionIndex = regionIndexArray.toString();
		ggbApplet.evalCommand('parameter_{' + regionIndex
				+ '} = Slider[0.01, 0.99, 0.01]'); // min, max, increment step
		ggbApplet.evalCommand('SetValue[parameter_{' + regionIndex + '}, 0.5]');
		var direction = getInitialMidpointRayEmitterDirection(regionIndexArray);
		var midpointRayIndex = regionIndexArray.concat(direction);
		var midpointRayName = midpointRayToString(midpointRayIndex);
		ggbApplet.evalCommand('M_{' + regionIndex + '} = Point['
				+ midpointRayName + ', parameter_{' + regionIndex + '}]');
	}

	var planeArray = [ [ 1, 0, 0 ], [ -1, 0, 0 ], [ 0, 1, 0 ], [ 0, -1, 0 ],
			[ 0, 0, 1 ], [ 0, 0, -1 ] ];
	createParameterMidpointrays(planeArray[0], planeArray[2], planeArray[4], [
			0, 0, 0 ]);
	createParameterMidpointrays(planeArray[1], planeArray[2], planeArray[4], [
			0, 0, 0 ]);
	createParameterMidpointrays(planeArray[0], planeArray[3], planeArray[4], [
			0, 0, 0 ]);
	createParameterMidpointrays(planeArray[0], planeArray[2], planeArray[5], [
			0, 0, 0 ]);
	createParameterMidpointsSubroutine(planeArray[0], planeArray[2],
			planeArray[4]);
	createParameterMidpointsSubroutine(planeArray[1], planeArray[2],
			planeArray[4]);
	createParameterMidpointsSubroutine(planeArray[0], planeArray[3],
			planeArray[4]);
	createParameterMidpointsSubroutine(planeArray[0], planeArray[2],
			planeArray[5]);
}

function getParamRadiiAndSphere(index, zCoordOfTangentplane) {
	// calc radii
	ggbApplet.evalCommand("r_{" + index + "} = Distance[M_{" + index
			+ "}, tp_{0,0," + zCoordOfTangentplane + "}]");

	// build spheres
	ggbApplet.evalCommand("s_{" + index + "} = Sphere[M_{" + index + "}, r_{"
			+ index + "}]");
}

function getTangentPlaneToThreeSpheres(index1, index2, index3) {
	var tpIndex = getTangentplaneIndex(index1, index2, index3);
	ggbApplet.evalCommand("tp_{" + tpIndex
			+ "} = TangentialPlaneToThreeSpheresAwayFromOrigin[O, s_{" + index1
			+ "}, s_{" + index2 + "}, s_{" + index3 + "}]");
}

/**
 * Supposing that the indexes are of the form like "1,152,3"
 * 
 * @param index1
 *            index of the first tangent plane
 * @param index2
 *            see index1
 * @param index3
 *            see index1
 */
function getTangentplaneIndex(index1, index2, index3) {
	var indexArray1 = index1.split(",");
	var indexArray2 = index2.split(",");
	var indexArray3 = index3.split(",");
	var commonIndex = null;
	for (var i = 0; i < indexArray1.length; i++) {
		// here one might have to use parseInt(indexArray[i]
		if (indexArray1[i] === indexArray2[i]
				&& indexArray1[i] === indexArray3[i]) {
			commonIndex = i;
			break;
		}
	}
	indexStr = "";
	for (var i = 0; i < indexArray1.length; i++) {
		if (i == commonIndex) {
			indexStr += 1 + parseInt(indexArray1[i]);
		} else {
			indexStr += "0";
		}
		if (i != indexArray1.length - 1) {
			indexStr += ",";
		}
	}
	return indexStr;
}

function createParameterSpheresAndTangentplanes() {
	var paramSpheresTop = [ "1,1,1", "-1,1,1", "1,-1,1" ];
	var paramSphereBottom = '1,1,-1';

	for (var i = 0; i < paramSpheresTop.length; i++) {
		getParamRadiiAndSphere(paramSpheresTop[i], 1);
	}
	getParamRadiiAndSphere(paramSphereBottom, -1);

	getTangentPlaneToThreeSpheres(paramSpheresTop[0], paramSpheresTop[1],
			paramSpheresTop[2]);
	getTangentPlaneToThreeSpheres(paramSpheresTop[0], paramSpheresTop[1],
			paramSphereBottom);
	getTangentPlaneToThreeSpheres(paramSpheresTop[0], paramSpheresTop[2],
			paramSphereBottom);
}

/**
 * main script
 */
function construct() {
	createOriginSphere();
	createProjectionPoints();
	createTangentplanesToS_0();
	createParameterMidpoints();
	createParameterSpheresAndTangentplanes();
}