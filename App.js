class News{ 
    constructor(){
        this.key = "3ce0e53a374b12f1923c58f0841a269d";
        this.searchItem = null;
        this.data = null; 
        this.getItem = null;
        this.activeStories = 1;
    }

    getSearchItem(){
        this.getItem = document.getElementById("search-bar");
        this.searchItem = this.getItem.value;
    };

    async callAPI(){
        try{
            const response = await fetch(`http://api.mediastack.com/v1/news?access_key=${this.key}&languages=en&limit=100&keywords=${this.searchItem}`);
            this.data = await response.json();
            this.displayGrid();
            this.fillStories();
        }
        
        catch(e){
            if(e instanceof TypeError && this.data.data.length == 0){
                let container  = document.querySelector(".articles-header");
                container.style.display = "block";
                container.innerHTML = "No Articles Found";

            }
            else if(e instanceof TypeError){
                let container  = document.querySelector(".fail");
                let apiError1 = this.data.error.code;
                let apiError2 = this.data.error.message;
                container.innerHTML = "";
                container.innerHTML += `<div class="None-Found">${apiError1}<br>${apiError2}</div>`;
            }
        }
    };


    displayGrid(){
        let container  = document.querySelector(".articles-container");
        let header = document.querySelector(".articles-header")
        container.innerHTML = "";
        for(let i = this.activeStories; i <= 24; i++){
            let lnk = this.data.data[i - 1].url;
            container.innerHTML+=`<div class="c${i} c">
                                    <h2 class="article-title"> <a href="${lnk}"class="t${i} t"> </a>  </h2>
                                    <div class="s${i} s">     </div>
                                    <div class="d${i} d">     </div>         
                                    </div>`;
        }
        header.innerHTML = "Relevant Articles";
        header.style.display = "block";
        
    }

    fillStories(){
        for(let i = 1; i <= 24; i++){
            let pageTitle = document.querySelector(`.t${i}`);
            let pageSource = document.querySelector(`.s${i}`);
            let pageDescription = document.querySelector(`.d${i}`);
            pageTitle.innerHTML += this.data.data[i-1].title;
            pageSource.innerHTML += this.data.data[i-1].source;
            pageDescription.innerHTML += this.data.data[i-1].description;
            
        }
    };
 
}



const search = document.querySelector(".search-input");

let news = new News();
search.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        news.getSearchItem();
        news.callAPI();
    }
});



