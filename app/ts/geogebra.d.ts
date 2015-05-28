declare module ggbApplet {
    function evalCommand(command: string): boolean;

    function setVisible(objName: String, visible: boolean): void;

    function setValue(objName: string, value: number): void;

    function renameObject(oldObjName: string, newObjName: string): boolean;

    function setLabelVisible(objName: string, visible: boolean): void;
    
    function exists(objName: string): boolean;
}
