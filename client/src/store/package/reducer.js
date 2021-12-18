import{
    GET_PACKAGES,
    GET_PACKAGES_SUCCESS,
    GET_PACKAGES_FAIL,
    ADD_PACKAGE,
    ADD_PACKAGE_SUCCESS,
    ADD_PACKAGE_FAIL,
    UPDATE_PACKAGE,
    UPDATE_PACKAGE_SUCCESS,
    UPDATE_PACKAGE_FAIL,
    DELETE_PACKAGE,
    DELETE_PACKAGE_SUCCESS,
    DELETE_PACKAGE_FAIL,
    UPDATE_PACKAGE_STATUS,
    UPDATE_PACKAGE_STATUS_FAIL,
    UPDATE_PACKAGE_STATUS_SUCCESS


} from "./actionTypes"

const INIT_STATE={
    packageList:[],
    error:{},
    packagesData:[],
    addingPackage:false,
    deletingPackage:false,
    addPackageResponse:{},
    updatePackageResponse: {},
    deletePackageResponse:{},
    packageData:{}

}

const Package = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_PACKAGES:
        return {
          ...state,
          params: action.payload,
        };
  
      case GET_PACKAGES_SUCCESS:
        return {
          ...state,
          packageList: action.payload.data,
        };
  
      case GET_PACKAGES_FAIL:
        return {
          ...state,
          error: action.payload,
        };
        case ADD_PACKAGE:
          return {
            ...state,
            addingPackage: true,
            packageData: action.payload,
          };
    
        case ADD_PACKAGE_SUCCESS:
          let newpackages = [...state.packagesData, action.payload.data];
          return {
            ...state,
            addingPackage: false,
            addPackageResponse: {
              type: "success",
              message: "Package added successfully",
            },
            packagesData: newpackages,
            error: {},
          };
    
        case ADD_PACKAGE_FAIL:
          return {
            ...state,
            addingPackage: false,
            addPackageResponse: { type: "failure", message: "Adding Package failed" },
            error: action.payload,
          };
          case UPDATE_PACKAGE:
            return {
              ...state,
              updatingPackage: true,
              packageData: action.payload,
            };
      
          case UPDATE_PACKAGE_SUCCESS:
            let newPackagesss = state.packageList.map((item) => {
              if (item._id == state.packageData._id) {
                return action.payload.data;
              } else {
                return item;
              }
            });
            return {
              ...state,
              updatingPackage: false,
              packageData: "",
              updatingPackage: false,
              updatePackageResponse: {
                type: "success",
                message: " Package updated successfully",
              },
              packageList: newPackagesss,
            };
      
          case UPDATE_PACKAGE_FAIL:
            return {
              ...state,
              updatingPackage: false,
              updatePackageResponse: {
                type: "failure",
                message: "Updating package failed",
              },
              error: action.payload,
            };
            case DELETE_PACKAGE:
              return {
                ...state,
                deletingPackage: true,
                packageIdToBeDeleted: action.payload,
              };

            case DELETE_PACKAGE_SUCCESS:
              let newPackagess = state.packageList.filter((item) => {
               return item._id != state.packageIdToBeDeleted;
             });
             return {
               ...state,
               deletingPackage: false,
               packageIdToBeDeleted: "",
               deletingPackage: false,
               deletePackageResponse: {
                 type: "success",
                 message: "Package deleted successfully",
               },
               packageList: newPackagess,
             };
       
           case DELETE_PACKAGE_FAIL:
             return {
               ...state,
               deletingPackage: false,
               deletePackageResponse: {
                 type: "failure",
                 message: "Deleting package failed",
               },
               error: action.payload,
             };

             case UPDATE_PACKAGE_STATUS:
              return {
                ...state,
                updatingPackage: true,
                packageData: action.payload,
              };
        
            case UPDATE_PACKAGE_STATUS_SUCCESS:
              let newPackage1 = state.packageList.map((item) => {
                if (item._id == state.packageData._id) {
                  return action.payload.data;
                } else {
                  return item;
                }
              });
              return {
                ...state,
                updatingPackage: false,
                packageData: "",
                updatingPackage: false,
                updatePackageResponse: {
                  type: "success",
                  message: "active status updated successfully",
                },
                packageList: newPackage1,
              };
        
            case UPDATE_PACKAGE_STATUS_FAIL:
              return {
                ...state,
                updatingPackage: false,
                updatePackageResponse: {
                  type: "failure",
                  message: "Updating statuds failed",
                },
                error: action.payload,
              };
       
    

    default:
        return state;
    }
}

export default Package;


