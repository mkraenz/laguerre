declare module ggbApplet {
    function evalCommand(command: string): boolean;

    function setVisible(objName: String, visible: boolean);
    
    function setValue(objName: string, value: number);
}
