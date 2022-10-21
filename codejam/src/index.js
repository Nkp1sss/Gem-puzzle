import { doSomething } from './scripts/module';
import './styles/styles.scss';
import image from './assets/group.jpg';

let img = document.createElement('img');
img.src = image;
document.body.appendChild(img);



doSomething();

console.log("Hello World!");

for (let i = 0; i < 10; i++) {
    console.log('dfffaaaaaaa');
}

let el = document.createElement('div');
el.textContent = ('Element from TS');
el.className = 'style';
document.body.appendChild(el);


setTimeout(() => {
    let a = 'dsf';
    console.log(a + b);

}, 100)