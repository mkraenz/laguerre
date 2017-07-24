/** see #120 */
class InputParameterExporter {

    constructor(private toStr: TypeString) { }
    
    /** Extracts coordinates of given point to a string of the form "= (x y z)". */
    private getPointCoords(pointName: string): string {
        var xCoord = ggbApplet.getXcoord(pointName).toFixed(Settings.PRECISION);
        var yCoord = ggbApplet.getYcoord(pointName).toFixed(Settings.PRECISION);
        var zCoord = ggbApplet.getZcoord(pointName).toFixed(Settings.PRECISION);
        return ' ('+ xCoord + ', ' + yCoord + ', ' + zCoord + ')';
    }

    /** TODO Refactor using toStr instead of hardcoded names */
    public export(): string {
        var outputStr: string = '';
        outputStr += 'r_{0,0,0} = ' + ggbApplet.getValue('r_{0,0,0}').toFixed(Settings.PRECISION) + '\n';
        outputStr += 'M_{0,0,0} = ' + this.getPointCoords('M_{0,0,0}')  + '\n';
        
        outputStr += 'ProjX = ' + this.getPointCoords('ProjX')  + '\n';
        outputStr += 'ProjY = ' + this.getPointCoords('ProjY')  + '\n';
        outputStr += 'ProjZ = ' + this.getPointCoords('ProjZ')  + '\n';
        
        outputStr += 'parameter_{-1,1,1} = ' + ggbApplet.getValue('parameter_{-1,1,1}') +'\n';
        outputStr += 'parameter_{1,-1,1} = ' + ggbApplet.getValue('parameter_{1,-1,1}') +'\n';
        outputStr += 'parameter_{1,1,-1} = ' + ggbApplet.getValue('parameter_{1,1,-1}') +'\n';
        outputStr += 'parameter_{1,1,1} = ' + ggbApplet.getValue('parameter_{1,1,1}') +'\n';
        
        outputStr += 'MAX_REGION_IN_POS_X_DIR = ' + Settings.MAX_REGION_IN_POS_X_DIR + '\n';
        outputStr += 'MAX_REGION_IN_POS_Y_DIR = ' + Settings.MAX_REGION_IN_POS_Y_DIR + '\n';
        outputStr += 'MAX_REGION_IN_POS_Z_DIR = ' + Settings.MAX_REGION_IN_POS_Z_DIR + '\n';
        outputStr += 'MAX_REGION_IN_NEG_X_DIR = ' + Settings.MAX_REGION_IN_NEG_X_DIR + '\n';
        outputStr += 'MAX_REGION_IN_NEG_Y_DIR = ' + Settings.MAX_REGION_IN_NEG_Y_DIR + '\n';
        outputStr += 'MAX_REGION_IN_NEG_Z_DIR = ' + Settings.MAX_REGION_IN_NEG_Z_DIR + '\n';
        return outputStr.trim();
    }
}

