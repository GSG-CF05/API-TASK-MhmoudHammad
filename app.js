const rightClick = document.querySelector('.right');
const leftClick = document.querySelector('.left');
const mainSection = document.querySelector('.main-section');
const container = document.querySelector('.container');


fetch('https://api.themoviedb.org/3/discover/movie?api_key=202b320be51d411e0be9810bbb990159&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate')
.then(res => res.json())
.then(data => {
      const linksArr = [];
      const titlesArr = [];
      const overviewArr= [];
      const voteAverage = [];
     
      data.results.forEach(element => {
        const link = `https://image.tmdb.org/t/p/w300${element.backdrop_path}`;

        linksArr.push(link);
        titlesArr.push(element.original_title);
        overviewArr.push(element.overview);
        voteAverage.push(element.vote_average)
      });
      console.log(voteAverage)
      let count = 0;
      bgIMG();
      descriptionSection();
      progressBarFunc(voteAverage[count])
      rightClick.addEventListener('click', () => {
        console.log(voteAverage[count])
        if ( count < linksArr.length - 1) {
          count++
          bgIMG();
          descriptionSection();
           progressBarFunc(voteAverage[count])
        }
      });
      
      leftClick.addEventListener('click', () => {
        if (count > 0) {
          count--;
          bgIMG();
          descriptionSection();
          progressBarFunc(voteAverage[count])
        }
       
      });
      
      function bgIMG() {
        container.style.backgroundImage = `url(${linksArr[count]})`;
            container.style.backgroundSize = "cover";
            container.style.backgroundPosition = "center";
      };

      function descriptionSection() {
        const movieName = document.querySelector('.description h2');
        const movieDescription = document.querySelector('.description p');
        movieName.textContent = titlesArr[count];
        movieDescription.textContent = overviewArr[count];
      }

})
.catch(err => console.log('error', err));

function progressBarFunc(progressEndValue) {
  let progressBar = document.querySelector(".circular-progress");
  let valueContainer = document.querySelector(".value-container");

  let progressValue = 0;
  let speed = 20;

  let progress = setInterval(() => {
    progressValue++;
    valueContainer.textContent = `${progressValue}%`;
    progressBar.style.background = `conic-gradient(
      #FCDB00 ${progressValue * 3.6}deg,
      #FBFBFB ${progressValue * 3.6}deg
    )`;
   if (progressValue == progressEndValue * 10) {
    clearInterval(progress);
  }
}, speed);
}

   