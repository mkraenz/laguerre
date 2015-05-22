class Construction {
    private t = new Tools();

    constructOriginSphere() {
        var region: number[] = [0, 0, 0];
        this.t.midpoint(region, 0, 0, 0);
        var radiusStr: string = 'r_{' + region.toString() + '}';
        ggbApplet.evalCommand( radiusStr + '= Slider[0.1, 10]');
        ggbApplet.setValue(radiusStr, 1);
        this.t.sphere(region);
    }

    run() {
        this.constructOriginSphere();
    }
}
