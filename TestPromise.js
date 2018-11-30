function a() {
    b();   
}

function b() {
    c();   
}

function c() {
    console.log('dfsdfsdf');
    setTimeout( d, 1000 );
}

function d() {
    console.log('dfsdfsdf');
}

a();