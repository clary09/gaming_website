const score=document.querySelector('.score');
const startScreen= document.querySelector('.startScreen');
const gameArea=document.querySelector('.gameArea');
// console.log(startScreen);
startScreen.addEventListener('click', start);

let player={ speed: 5, score: 0};


let keys = {ArrowUp :false,ArrowDown : false,ArrowRight :false,ArrowLeft:false}

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup', keyUp);
// e.key is inbuilt js to imply which key has been pressed by the user
//after click of a key
function keyDown(e){
    e.preventDefault();
    keys[e.key]=true;
    // console.log(e.key);
    // console.log(keys);

}
// after release
function keyUp(e){
    e.preventDefault();
    keys[e.key]=false;
    // console.log(e.key);
    // console.log(keys);

}
function isCollide(a,b){
    aRect=a.getBoundingClientRect();
    bRect=b.getBoundingClientRect();

    return!(aRect.bottom< bRect.top||aRect.top> bRect.bottom||aRect.left> bRect.right||aRect.right< bRect.left);
}
function moveLines(){
    let lines=document.querySelectorAll('.lines');
    lines.forEach(function(item){

        if(item.y >=700){
            item.y -= 750;

        }
     item.y+= player.speed;
     item.style.top=item.y + "px";
    })



}
function endGame(){
    player.start=false;
    startScreen.classList.remove('hide');
    
}
function moveEnemy(car){
    let enemy=document.querySelectorAll('.enemyCar');
    enemy.forEach(function(item){

        if(isCollide(car , item )){
            // console.log("boom");
            endGame();
        }
        if(item.y >=750){
            item.y = -300;
            item.style.left= Math.floor(Math.random() * 350) + "px";
        }
     item.y+= player.speed;
     item.style.top=item.y + "px";

    })



}
function gameSound(){
    var audio=new Audio('Art-Of-Silence_V2.mp3');
    var volume= audio.volume;
    volume=volume- 0.45 ;
    audio.play();
}
function gamePlay(){
    // <embed src="/html/BattleMetal-320bit.mp3" loop="true" autostart="true" width="2" height="0"></embed>
    let car=document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    if(player.start){
        gameSound();
        moveLines();
        moveEnemy(car);
        if(keys.ArrowUp && player.y> (road.top + 50)){player.y -= player.speed}
        if(keys.ArrowDown && player.y< (road.bottom - 70) ){player.y += player.speed}
        if(keys.ArrowLeft && player.x >0 ){player.x -= player.speed}
        if(keys.ArrowRight && player.x < (road.width-50)){player.x += player.speed}

    car.style.top=player.y + "px";
    car.style.left=player.x + "px";

    window.requestAnimationFrame(gamePlay);
    // console.log(player.score++);
    player.score++
    score.innerText="Score: " +player.score;
}
}



function start(){
    // for the animation of the game
    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML= "";
    player.start=true;
    player.score=0;
    window.requestAnimationFrame(gamePlay);
    for(x=0;x<5;x++){
    let roadline =document.createElement('div');
    roadline.setAttribute('class','lines')
    roadline.y=(x*150);
    roadline.style.top= roadline.y+ "px";
    gameArea.appendChild(roadline);}
    let car= document.createElement('div');
    car.setAttribute('class' , 'car');
    // car.innerText('hie there');
    gameArea.appendChild(car);

  player.x=car.offsetLeft;
  player.y=car.offsetTop;

  for(x=0;x<3;x++){
    let enemyCar =document.createElement('div');
    enemyCar.setAttribute('class','enemyCar')
    enemyCar.y=((x+1)*350) * -1;
    enemyCar.style.top= enemyCar.y+ "px";
    // enemyCar.style.background ='cadetblue';
    

    enemyCar.style.left= Math.floor(Math.random() * 350) + "px";
    gameArea.appendChild(enemyCar);}

}
