class Utils {

    constructor(private ggb: GGBTools, private t: Tools) {
    } 
    /**
     * abstracted in the sense GeoGebra needs it 
     * to successfully derive e.g. Midpoints of Spheres from the sphere to create a tool,
     * dependant on the sphere instead of the original midpoint.
     */
    public createAbstractedSphereWithSlider(x: number, y: number, z: number, radius: number,
        sliderMin: number, sliderMax: number, sliderStep: number, name?: string) {
        var originalMidpointName: string = name + "original";
        var sliderName: string = name + "slider";
        var sphereName: string = 's_{' + name + '}';
        var radiusName: string = 'r_{' + name + '}';
        
        this.ggb.slider(sliderMin, sliderMax, sliderName, sliderStep);
        ggbApplet.setValue(sliderName, radius);
        
        this.t.pointFree(x, y, z, originalMidpointName);
        this.ggb.sphere(originalMidpointName, sliderName, sphereName);
        this.ggb.midpoint(sphereName, name);
        this.ggb.radius(sphereName, radiusName);
    }
}