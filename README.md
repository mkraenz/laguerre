# laguerre

## Setup
First, I assume you have git installed (note that github-for-windows does not suffice). Also we will need bower, grunt-cli and grunt globally installed via npm with `$ npm install -g <package-name>`.

1. Checkout the project from git. 
2. Navigate into the projects root and run the following commands in a shell.
  1. `$ npm install` (if this gives you errors as in the first comments attached screenshot then see the section Setup problems)
  2. `$ bower install`
  3. `$ grunt serve` (to see if everything worked fine. It should open a tab in your browser displaying some stuff.)
  
For tests also cd into /test and run `$ bower install`.
Yet, tests are not used yet.

### Geogebra Tube
The file loaded into the geogebra applet has been uploaded to (Geogebra Tube)[https://tube.geogebra.org/material/show/id/1222013] and is loaded and configurated there.
It is simply an empty geogebra file with the following custom tools included:

* TangentplaneToSphere[ <Sphere>, <Point> ]
* RayOfSphereMidpoints[ <Sphere>, <Plane>, <Plane>, <Plane> ]
* TangentialPlaneToThreeSpheresAwayFromOrigin[ <Point>, <Sphere>, <Sphere>, <Sphere> ]


## Naming convention
We mostly use the following naming convention.
As standard position we consider 
1. ProjPointX = (pos. number, 0, 0)
2. ProjPointY = (0, pos. number, 0)
3. ProjPointZ = (0, 0, pos. number).


### Short version: 
We name everything as if we had the standard (euclidean) cube.


### Long version:
Sphere s_o markes the section 0,0,0 = x,y,z. (This is an “oh”  for origin not a zero)
Now we simply in-/decrease the corrresponding
index each time we have could inscribe a sphere in there.

**Example** The sections where the four choosable points lie are
1,1,1 with sphere s_{1,1,1} and corresponding radius r_{1,1,1}

1,1,-1 with sphere s_{1,1,-1} and corresponding radius r_{1,1,-1}

1,-1,1 ...

-1,1,1 ...
Note that due to the list ordering implementation of GeoGebra the -1,1,1 is listed before the others.
We also denote the midpoints of the sphere inside a sector x0,y0,z0 by
M_{x0,y0,z0}

Next, for the tangentplanes we choose a similar system.
Since we have no tangent plane directly in 0,0,0 we start the naming of the tangentplanes with 1 in the corresponding direction.
Then the first 6 tangent planes in x,y,z direction are
tp_{1,0,0}
tp_{-1,0,0}
tp_{0,1,0}
tp_{0,-1,0}
tp_{0,0,1}
tp_{0,0,-1}
Now we just in-/decrease the corresponding index each time we built another row of spheres.
Due to the nature of the construction it is not neccessary to have mixed terms, e.g. indices where both x and y are unequal to 0. Only one will be unequal to 0,

#### MidpointRay
For midpointRays we have to use a slightly different notation since we have more than one ray per region.
We imagine these rays as pointing into a region from one of eight particular direction. These directions are exactly the eight corners of a cube.
The rays are named like the following example:
m_{0,1,4,+,-,-}

Here the first three numbers represent the region which Midpoint is defined by the ray, i.e. M_{0,1,4}.
The next three entries are either + or - and represent the direction the ray, i.e. 'where it comes from'.
+,+,+ = x,y,z would represent that it comes from the region 1,2,5 in this example., +,-,- is 1,0,3.
In general we can simply add (resp. substract) 1 from the corresponding index if we have a + (resp. -) at the corresponding position.
Internally we work with 1 if we have +, and -1 if we have -.



## Setup problems
### Tests
When runnings the grunt <test> task it might display you a `Phantom Js timed out` warning. This is the case when mocha is not installed correctly.
Solution: run `$ npm install -g mocha`

Maybe.....For tests also cd into /test and run `$ bower install`.

### npm install errors
After mocha was globally installed, a new setup from scratch might end up in the error message as in the comments attached screenshot. To safely setup the project try deleting the grunt-mocha and the generator-mocha from %appdata%/npm/node_modules. Then run `npm install -g grunt-mocha` and try the whole installation again.

