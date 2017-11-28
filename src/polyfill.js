import Promise from 'es6-promise';

if(typeof window !== 'undefined'){
    window.Promise = Promise;
}else{
    global.Promise = Promise;
}