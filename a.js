function delay(){
  return new Promise(a => setTimeout(a,300));
    
}




async function looping(){


  for(var i = 0; i < 10; i++) {
    console.log(i);
    setTimeout(function() {
      console.log('The number is ' + i);
    },1000);
  }

  await delay();
}



const promise = new Promise(function(resolveParam, rejectParam) {
  //resolveParam(1)
  rejectParam(new Error('error!'))
})

promise.then((value) => {
  console.log(value) // 1
  return value + 1
}).then((value) => {
  console.log(value) // 2
  return value + 2
}).catch((err) => console.log(err.message))
