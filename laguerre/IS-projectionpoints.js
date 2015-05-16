/**
 * function definitions
 */

function getRadiiAndSphere(index, zCoordOfTangentplane) {
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
			+ "} = TangentPlaneToThreeSpheresAwayFromOrigin[O, s_{" + index1
			+ "}, s_{" + index2 + "}, s_{" + index3 + "}]");
}

/**
 * Supposing that the indexes are of the form like "1,152,3"
 * 
 * @param index1
 * @param index2
 * @param index3
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
	for( var i = 0; i < indexArray1.length; i++){
		if( i == commonIndex){
			indexStr += 1 + parseInt(indexArray1[i]);
		}
		else{
			indexStr += "0";
		}
		if(i != indexArray1.length){
			indexStr += ",";
		}
	}
	return indexStr;
}


/**
 * main script
 */

// the spheres which can be customized by the user by moving the corresponding
// point "M_{x,y,z}"
var paramSpheresTop = [ "1,1,1", "-1,1,1", "1,-1,1" ];
var paramSphereBottom = '1,1,-1';

for (var i = 0; i < paramSpheresTop.length; i++) {
	getRadiiAndSphere(paramSpheresTop[i], 1);
}
getRadiiAndSphere(paramSphereBottom, -1);

getTangentPlaneToThreeSpheres(paramSpheresTop[0], paramSpheresTop[1], paramSpheresTop[2]);
getTangentPlaneToThreeSpheres(paramSpheresTop[0], paramSpheresTop[1], paramSpheresTop[2]);
