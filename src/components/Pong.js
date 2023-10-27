import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue');
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const camera = new THREE.PerspectiveCamera( 75, 160 / 90, 0.1, 1000 );
// const camera = new THREE.OrthographicCamera(
// 	-8,
// 	8,
// 	6,
// 	-6,
// 	1, 1000 );
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// const resizer = new Resizer(container, camera, renderer);
// resizer.onResize = () => {
//   this.render();
// };

/* **** LIGHTING **** */
const AmbientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
scene.add( AmbientLight );
const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
directionalLight.position.set( 0, 1, 1 );
scene.add( directionalLight );
/* ****          **** */

const g_player = new THREE.BoxGeometry( .4, 2, .4 );
const g_ball = new THREE.SphereGeometry( .2 );
const m_white = new THREE.MeshLambertMaterial( { color: 0xffffff } );

const o_player1 = new THREE.Mesh( g_player, m_white );
scene.add( o_player1 );
o_player1.position.x = -5;

const o_player2 = new THREE.Mesh( g_player, m_white );
scene.add( o_player2 );
o_player2.position.x = 5;

const o_ball = new THREE.Mesh( g_ball, m_white );
scene.add( o_ball );


let ballDir = new THREE.Vector3( 1, 1, 0 );
let ballSpeed = 0.05;

function animate() {
	requestAnimationFrame( animate );
	
	// console.log(o_ball.position);
	o_ball.translateOnAxis(ballDir, ballSpeed);
	if (o_ball.position.x < -6 && ballDir.x < 0)
		ballDir.x *= -1;
	if (o_ball.position.x > 6 && ballDir.x > 0)
		ballDir.x *= -1;
	if (o_ball.position.y < -4 && ballDir.y < 0)
		ballDir.y *= -1;
	if (o_ball.position.y > 4 && ballDir.y > 0)
		ballDir.y *= -1;
	
	renderer.render( scene, camera );
}

animate();
