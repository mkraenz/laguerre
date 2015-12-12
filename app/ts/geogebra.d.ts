declare module ggbApplet {
    // ts definitions for methods from https://wiki.geogebra.org/en/Reference:JavaScript#Getting_the_state_of_objects
    function evalCommand(command: string): boolean;

    function setVisible(objName: String, visible: boolean): void;
    function getVisible(objName: String): boolean;

    function setValue(objName: string, value: number): void;

    function renameObject(oldObjName: string, newObjName: string): boolean;

    function setLabelVisible(objName: string, visible: boolean): void;

    function exists(objName: string): boolean;
    function isDefined(objName: string): boolean; // returns false if object does not exist

    function getXcoord(objName: string): number;
    function getYcoord(objName: string): number;
    function getZcoord(objName: string): number;
    function getValue(objName: string): number;
    
    function getXML(objName?: String): string;
    
    function getAllObjectNames(): string[]
}
