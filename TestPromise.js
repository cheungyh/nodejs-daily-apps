function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
  }
  
  async function hello() {
    await wait(2000);
    return 'world';
  }


var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 7000);
}); 

var p4 = function pp4(){
    for(let i = 0;i < 10 ;i++){
        console.log(i)
    }
    p9();
    return 'pp4'
}

function p9(){
    return p3;
}


// Promise.all([p1, p2, p4()]).then(values => { 
//   console.log(values); // [3, 1337, "foo"] 
// });

var p5 = Promise.all([1,2,3]);
var p8 = Promise.all([p1, p2, p4]);
var p6 = Promise.all([p1, p2, hello()]);
var p7 = Promise.all([1,2,3, Promise.reject(555)]);


setTimeout(function() {
    console.log(p5);
    console.log(p6);
    console.log(p8);
    console.log(p7);
});

async function series() {
    await wait(500);
    await wait(500);
    return "series done!";
}

async function parallel() {
    const wait1 = wait(500);
    const wait2 = wait(500);
    await wait1;
    await wait2;
    return "parallel done!";
}


