/**
 * dependencies: none
 */ 

/**
 * main script
 */

ggbApplet.evalCommand('Oo = (0,0,0)');
ggbApplet.evalCommand('r_{o slider} = Slider[0.1, 10]');
ggbApplet.evalCommand('SetValue[r_{o slider}, 1]');
ggbApplet.evalCommand('so = Sphere[Oo, r_{o slider}]');
ggbApplet.evalCommand('P = Point[so]');
ggbApplet.evalCommand('vec = Vector[Midpoint[so], P]');
ggbApplet.evalCommand('tp = PerpendicularPlane[ P, vec ]');
