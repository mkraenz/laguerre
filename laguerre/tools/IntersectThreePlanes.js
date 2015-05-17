/**
 * dependencies:
 * none
 */

/**
 * function definitions
 */
function createThreePlanes() {
	for (var i = 0; i < 9; i++) {
		ggbApplet.evalCommand('P_' + i + ' = (RandomUniform[-100, 100],'
				+ 'RandomUniform[-100, 100], RandomUniform[-100, 100])');
	}
	for (var i = 0; i < 3; i++) {
		ggbApplet.evalCommand('e_' + i + ' = Plane[ P_' + i * 3 + ', P_'
				+ (i * 3 + 1) + ', P_' + (i * 3 + 2) + ']');
	}
}

createThreePlanes();
ggbApplet.evalCommand('commonLine = Intersect[e_0, e_1]');
ggbApplet.evalCommand('CommonPoint = Intersect[e_2, commonLine]');
