import {
    GET_SLIDERS,
    GET_SLIDERS_FAIL,
    GET_SLIDERS_SUCCESS,
    ADD_SLIDER,
    ADD_SLIDER_FAIL,
    ADD_SLIDER_SUCCESS,
    DELETE_SLIDER,
    DELETE_SLIDER_SUCCESS,
    DELETE_SLIDER_FAIL,
    UPDATE_SLIDER,
    UPDATE_SLIDER_SUCCESS,
    UPDATE_SLIDER_FAIL,
    GET_SLIDERS_OPTIONS_SUCCESS,
  GET_SLIDERS_OPTIONS_FAIL
  } from "./actionTypes";
  
  const INIT_STATE = {
    sliders: [],
    addingSlider: false,
    deletingSlider: false,
    addSliderResponse: {},
    updateSliderResponse: {},
    deleteSliderResponse: {},
    sliderIdToBeDeleted: "",
    slider: {},
    error: {},
    slidersOptions: [],
  };
  
  const Slider = (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_SLIDERS:
        return {
          ...state,
          params: action.payload,
        };
  
      case GET_SLIDERS_SUCCESS:
        return {
          ...state,
          sliders: action.payload.data,
        };
  
      case GET_SLIDERS_FAIL:
        return {
          ...state,
          error: action.payload,
        };
      case ADD_SLIDER:
        return {
          ...state,
          addingSlider: true,
          slider: action.payload,
        };
  
      case ADD_SLIDER_SUCCESS:
        let newSliders1 = [...state.sliders, action.payload.data];
  
        return {
          ...state,
          addingSlider: false,
          addSliderResponse: {
            type: "success",
            message: "Slider added successfully",
          },
          sliders: newSliders1,
          error: {},
        };
  
      case ADD_SLIDER_FAIL:
        return {
          ...state,
          addingSlider: false,
          addSliderResponse: { type: "failure", message: "Adding slider failed" },
          error: action.payload,
        };
      case DELETE_SLIDER:
        return {
          ...state,
          deletingSlider: true,
          sliderIdToBeDeleted: action.payload,
        };
  
      case DELETE_SLIDER_SUCCESS:
        let newSliders = state.sliders.filter((slider) => {
          return slider._id != state.sliderIdToBeDeleted;
        });
        return {
          ...state,
          deletingSlider: false,
          sliderIdToBeDeleted: "",
          deletingSlider: false,
          deleteSliderResponse: {
            type: "success",
            message: "Slider deleted successfully",
          },
          sliders: newSliders,
        };
  
      case DELETE_SLIDER_FAIL:
        return {
          ...state,
          deletingSlider: false,
          deleteSliderResponse: {
            type: "failure",
            message: "Deleting slider failed",
          },
          error: action.payload,
        };
  
      case UPDATE_SLIDER:
        return {
          ...state,
          updatingSlider: true,
          slider: action.payload,
        };
  
      case UPDATE_SLIDER_SUCCESS:
        let newSliders2 = state.sliders.filter((slider) => {
          if (slider._id == state.slider._id) {
            return action.payload.data;
          } else {
            return slider;
          }
        });
        return {
          ...state,
          updatingSlider: false,
          slider: "",
          updatingSlider: false,
          updateSliderResponse: {
            type: "success",
            message: "Slider updated successfully",
          },
          sliders: newSliders2,
        };
  
      case UPDATE_SLIDER_FAIL:
        return {
          ...state,
          updatingSlider: false,
          updateSliderResponse: {
            type: "failure",
            message: "Updating slider failed",
          },
          error: action.payload,
        };
        case GET_SLIDERS_OPTIONS_SUCCESS:
          return {
            ...state,
            slidersOptions: action.payload,
          };
    
        case GET_SLIDERS_OPTIONS_FAIL:
          return {
            ...state,
            error: action.payload,
          };
  
      default:
        return state;
    }
  };
  
  export default Slider;
  