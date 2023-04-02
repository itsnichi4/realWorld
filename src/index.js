import { createNavbar } from "./components/navbar";
import { createImageSlider } from "./components/imageslider";
import { sliderProps } from "./components/imageslider";
createNavbar();

  const sliderElement = createImageSlider(sliderProps);
  
  document.body.appendChild(sliderElement);



console.log("hello");

