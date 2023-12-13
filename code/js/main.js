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

        this.text = document.querySelector(`.${className}__text`)
        this.text.innerText = data.text
    }
}

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