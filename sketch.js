const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var particles;
var plinkos = [];
var divisions=[];

var divisionHeight=300;
var score =0;
var turn=0;

var PLAY=1;
var END=0;
var gameState=PLAY;

var bg;
var txtcolor;

function preload() {
bg=color("black");
txtcolor=color("black");
fetchtime();
}

function setup() {
createCanvas(800, 800);
engine = Engine.create();
world = engine.world;
ground = new Ground(width/2,height,width,20);

for (var k = 0; k <=width; k = k + 80) {
divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
}
for (var j = 30; j <=width; j=j+50) {
plinkos.push(new Plinko(j,75));
}
for (var j = 50; j <=width-10; j=j+50) {
plinkos.push(new Plinko(j,175));
}

for (var j = 30; j <=width; j=j+50) {
plinkos.push(new Plinko(j,275));
}

for (var j = 50; j <=width-10; j=j+50) {  
plinkos.push(new Plinko(j,375));
}
}

function draw() {
background(bg);
textSize(20)
Engine.update(engine);

fill("red")
textSize(30)
text("500",15,530);
text("500",95,530);
text("500",95+80,530);
text("100",95+160,530);
text("100",95+240,530);
text("100",95+240+80,530);
text("100",95+240+160,530);
text("200",95+320+160,530);
text("200",95+320+240,530);
text("200",95+320+320,530);

for (var i = 0; i < plinkos.length; i++) {   
plinkos[i].display();
}

for (var k = 0; k < divisions.length; k++) {   
divisions[k].display();
}
textSize(30);
fill(txtcolor)
text("Score : "+score,20,35);

if(particles!=null) {
particles.display();
if(particles.body.position.y>700){ //give if condition for y position here
if(particles.body.position.x>100 && particles.body.position.x<300){ //i changed the y position to x>100
score=score+500;
if(turn===5) {
gameState=END;
}
}

if(particles.body.position.x>301 && particles.body.position.x<600) {
score=score+100;
if(turn===5){
gameState=END;
}
}

if(particles.body.position.x>601 && particles.body.position.x<900) {
score=score+200;
if(turn===5) {
gameState=END;
}
}

particles=null;
}
}
if(gameState===END) {
push();
strokeWeight(1);
stroke("red")
textSize(60);
fill(txtcolor)
text("GAME OVER",200,250);
pop();
}
}

function mousePressed() {
if(gameState!==END) {
turn=turn+1;
particles=new Particle(mouseX,10,10,10);
console.log("HI")
}
}

async function fetchtime() {
var time=await fetch("https://worldtimeapi.org/api/timezone/Asia/Singapore");
var data=await time.json();
var hour=data.datetime.slice(11,13);
if(hour>6&&hour<18) {
bg=color("gold");
txtcolor=color("black")
}
else {
bg=color("black")
txtcolor=color("white")
}
}