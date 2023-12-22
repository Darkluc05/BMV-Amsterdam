class GetData {
    url;
    data = null;
    constructor(newUrl) {
        this.url = newUrl
    }
    async getJson() {
        await fetch(this.url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.data = data
            });
        return this.data;
    }
}

class Renderer {
    render(whereToRender, whatToRender) {
        document.querySelector(whereToRender).appendChild(whatToRender);
    }
}

class Header{
    renderer
    data
    constructor(data, renderer, className){
        this.renderer = renderer
        this.data = data

        this.title = document.querySelector(`.${className}__title`)
        this.title.innerText = data.title
    }
}

class Info{
    renderer
    data
    constructor(data, renderer, className){
        this.renderer = renderer
        this.data = data

        this.title = document.querySelector(`.${className}__title`)
        this.title.innerText = data.title

        this.text = document.querySelector(`.${className}__textTitle`)
        this.text.innerText = data.textTitle

        this.text = document.querySelector(`.${className}__text`)
        this.text.innerText = data.text
    }
}

class Slideshow {
    constructor() {
      this.currentSlideIndex = 0;
      this.slides = document.querySelectorAll('.projects__project');
      this.totalSlides = this.slides.length;
  
      this.showSlide(this.currentSlideIndex);
      this.startSlideshow();
      this.setupButtons();
    }
  
    showSlide(index) {
      this.slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
      });
    }
  
    nextSlide() {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.totalSlides;
      this.showSlide(this.currentSlideIndex);
    }
  
    prevSlide() {
      this.currentSlideIndex =
        (this.currentSlideIndex - 1 + this.totalSlides) % this.totalSlides;
      this.showSlide(this.currentSlideIndex);
    }
  
    startSlideshow() {
      setInterval(() => {
        this.nextSlide();
      }, 10000); // Adjust the interval as needed (in milliseconds)
    }
  
    setupButtons() {
      const nextButton = document.getElementById('nextButton');
      const prevButton = document.getElementById('prevButton');
  
      if (nextButton && prevButton) {
        nextButton.addEventListener('click', () => this.nextSlide());
        prevButton.addEventListener('click', () => this.prevSlide());
      }
    }
  }
  
  // Instantiate the Slideshow class when the DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    new Slideshow();
  });
  
  
  // Instantiate the Slideshow class when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Slideshow();
});  

class App{
    api
    info
    constructor(){
        this.api = new GetData("./data/data.json")
        this.renderer = new Renderer()
        this.api.getJson().then((data) => {
            this.header = new Header(data.algemeen[0], this.renderer, "header")
            this.info = new Info(data.info[0], this.renderer, "info")
        });
    }
}

const app = new App();