import {
    GET_SLIDERS,
    GET_SLIDERS_FAIL,
    GET_SLIDERS_SUCCESS,
    ADD_SLIDER,
    ADD_SLIDER_FAIL,
    ADD_SLIDER_SUCCESS,
    GET_SLIDER,
    GET_SLIDER_FAIL,
    GET_SLIDER_SUCCESS,
    UPDATE_SLIDER,
    UPDATE_SLIDER_FAIL,
    UPDATE_SLIDER_SUCCESS,
    DELETE_SLIDER,
    DELETE_SLIDER_FAIL,
    DELETE_SLIDER_SUCCESS,
    GET_SLIDERS_OPTIONS,
    GET_SLIDERS_OPTIONS_SUCCESS,
    GET_SLIDERS_OPTIONS_FAIL,
  } from "./actionTypes";
  
  export const getSliders = () => ({
    type: GET_SLIDERS,
  });
  
  export const getSlidersSuccess = (Sliders) => ({
    type: GET_SLIDERS_SUCCESS,
    payload: Sliders,
  });
  
  export const getSlidersFail = (error) => ({
    type: GET_SLIDERS_FAIL,
    payload: error,
  });
  
  export const addSlider = (Slider) => ({
    type: ADD_SLIDER,
    payload: Slider,
  });
  
  export const addSliderSuccess = (Slider) => ({
    type: ADD_SLIDER_SUCCESS,
    payload: Slider,
  });
  
  export const addSliderFail = (error) => ({
    type: ADD_SLIDER_FAIL,
    payload: error,
  });
  
  export const getUser = (Slider) => ({
    type: GET_SLIDER,
    payload: Slider,
  });
  
  export const getSliderSuccess = (Slider) => ({
    type: GET_SLIDER_SUCCESS,
    payload: Slider,
  });
  
  export const getSliderFail = (error) => ({
    type: GET_SLIDER_FAIL,
    payload: error,
  });
  
  export const updateSlider = (Slider) => ({
    type: UPDATE_SLIDER,
    payload: Slider,
  });
  
  export const updateSliderSuccess = (Slider) => ({
    type: UPDATE_SLIDER_SUCCESS,
    payload: Slider,
  });
  
  export const updateSliderFail = (error) => ({
    type: UPDATE_SLIDER_FAIL,
    payload: error,
  });
  
  export const deleteSlider = (Slider) => ({
    type: DELETE_SLIDER,
    payload: Slider,
  });
  
  export const deleteSliderSuccess = (Slider) => ({
    type: DELETE_SLIDER_SUCCESS,
    payload: Slider,
  });
  
  export const deleteSliderFail = (error) => ({
    type: DELETE_SLIDER_FAIL,
    payload: error,
  });

  export const getSlidersOptions = () => ({
    type: GET_SLIDERS_OPTIONS,
  });
  
  export const getSlidersOptionsSuccess = (Sliders) => ({
    type: GET_SLIDERS_OPTIONS_SUCCESS,
    payload: Sliders,
  });
  
  export const getSlidersOptionsFail = (error) => ({
    type: GET_SLIDERS_OPTIONS_FAIL,
    payload: error,
  });