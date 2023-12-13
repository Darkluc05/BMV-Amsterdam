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

class Main{
    renderer
    data
    constructor(data, renderer){
        this.renderer = renderer
        this.data = data

        this.title = document.querySelector(".header__title")
        this.title.innerText = data.title
    }
}

class Info{
    renderer
    data
    constructor(data, renderer){
        this.renderer = renderer
        this.data = data

        this.title = document.querySelector(".info__title")
        this.title.innerText = data.title
    }
}

class App{
    api
    info
    constructor(){
        this.api = new GetData("./data/data.json")
        this.renderer = new Renderer()
        this.api.getJson().then((data) => {
            this.main = new Main(data.algemeen[0], this.renderer)
            this.info = new Info(data.info[0], this.renderer)
        });
    }
}

const app = new App();