# laguerre

## Setup
First, I assume you have git installed (note that github-for-windows does not suffice). Also we will need bower, grunt-cli and grunt globally installed via npm with `$ npm install -g <package-name>`.

1. Checkout the project from git. 
2. Navigate into the projects root and run the following commands in a shell.
  1. `$ npm install` (if this gives you errors as in the first comments attached screenshot then see the section Setup problems)
  2. `$ bower install`
  3. `$ grunt serve` (to see if everything worked fine. It should open a tab in your browser displaying some stuff.)
  
For tests also cd into /test and run `$ bower install`.


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

For example the sections where the four choosable points lie are
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
tp_{0,-1,,0}
tp_{0,0,1}
tp_{0,0,-1}
Now we just in-/decrease the corresponding index each time we built another row of spheres.
Due to the nature of the construction it is not neccessary to have mixed terms, e.g. indices where both x and y are unequal to 0. Only one will be unequal to 0,


## Setup problems
### Tests
When runnings the grunt <test> task it might display you a `Phantom Js timed out` warning. This is the case when mocha is not installed correctly.
Solution: run `$ npm install -g mocha`

Maybe.....For tests also cd into /test and run `$ bower install`.

### npm install errors
After mocha was globally installed, a new setup from scratch might end up in the error message as in the comments attached screenshot. To safely setup the project try deleting the grunt-mocha and the generator-mocha from %appdata%/npm/node_modules. Then run `npm install -g grunt-mocha` and try the whole installation again.

