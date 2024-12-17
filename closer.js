function add(a){
    let A = a;

    return function Add(b){
        return A + b;
    };
};

let c = add(6);

console.log(c(7));