class Settings {
    public static MAX_REGION_IN_POS_X_DIR: number = 3;
    public static MAX_REGION_IN_POS_Y_DIR: number = 3;
    public static MAX_REGION_IN_POS_Z_DIR: number = 7;

    public static MAX_REGION_IN_NEG_X_DIR: number = 1;
    public static MAX_REGION_IN_NEG_Y_DIR: number = 1;
    public static MAX_REGION_IN_NEG_Z_DIR: number = 1;

    // for the parametrizable spheres' slider
    public static PARAMETER_SPHERE_MIDPOINT_MIN = 0.4;
    public static PARAMETER_SPHERE_MIDPOINT_MAX = 0.6;
    public static PARAMETER_SPHERE_MIDPOINT_INCREMENT_STEP = 0.01;

    public static ORIGIN_SPHERE_SCALING = 0.3;
    
    public static PROJECTION_POINT_X_VALUE: number = 100;
    public static PROJECTION_POINT_Y_VALUE: number = 100;
    public static PROJECTION_POINT_Z_VALUE: number = 10;
    
    /** debug level: 0 nothing will be printed, 1 or 2 most things // TODO: think of meaningful levels, not static */
    public static debug = 2;
    
    /** decimal precision for export functions */
    public static PRECISION: number = 4;
}