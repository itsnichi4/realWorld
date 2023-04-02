import { b } from "../../lib/builder";

interface ImageSliderProps {
  images: string[]; // An array of image URLs
  interval?: number; // The interval between image transitions in milliseconds
}

class ImageSlider {
  currentIndex = 0;
  intervalId = 0;
  element: HTMLElement;
  props: ImageSliderProps;

  constructor(props: ImageSliderProps) {
    this.props = props;
    this.element = this.buildElement();
    this.start();
  
    // Bind the 'this' context to the next and prev methods
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
  }

  buildElement(): HTMLElement {
    const { images } = this.props;
    const slider = b("div", {
      className: "slider",
      children: [

        b("button", {
          className: "slider__button slider__button--prev",
          textContent: "Prev",
          addEventListener: ["click", () => this.prev(images)]
        }),
        b("img", { src: images[this.currentIndex], alt: "" }),
        b("button", {
          className: "slider__button slider__button--next",
          textContent: "Next",
          addEventListener: ["click", () => this.next(images)]
        })
      ]
    });
  
    return slider;
  }
  
  showImage(index: number, images: string[]): void {
    const image = this.element.querySelector("img");
    if (image) {
      image.src = images[index];
      this.currentIndex = index;
    }
  }

  next(images: string[]): void {
    const nextIndex = (this.currentIndex + 1) % images.length;
    this.showImage(nextIndex, images);
    console.log("Next button clicked!");
  }
  
  prev(images: string[]): void {
    const prevIndex = (this.currentIndex - 1 + images.length) % images.length;
    this.showImage(prevIndex, images);
    console.log("Prev button clicked!");
  }
  
  start(): void {
    const { interval } = this.props;
    if (interval) {
      this.intervalId = setInterval(() => {
        this.next(this.props.images);
      }, interval);
    }
  }

  stop(): void {
    clearInterval(this.intervalId);
  }
}

export function createImageSlider(props: ImageSliderProps): HTMLElement {
  const slider = new ImageSlider(props);
  return slider.element;
}

const images = [
  "https://via.placeholder.com/640x360?text=Image%201",
  "https://via.placeholder.com/640x360?text=Image%202",
  "https://via.placeholder.com/640x360?text=Image%203",
  "https://via.placeholder.com/640x360?text=Image%204",
  "https://via.placeholder.com/640x360?text=Image%205"
];

export const sliderProps = { images, interval: 3000 };


