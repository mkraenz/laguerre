# laguerre

## Naming convention
We mostly use the following naming convention.
As standard position we consider 
ProjPointX = (pos. number, 0, 0)
ProjPointY = (0, pos. number, 0)
ProjPointZ = (0, 0,p os. number).
Short version: We name everything as if we had the standard (euclidean) cube.

Long version:
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