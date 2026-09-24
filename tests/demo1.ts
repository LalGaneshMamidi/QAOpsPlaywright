let message1: string= "Hello";
//message1 = 2;
//strict type is followed in typescript
//Maintainability and readablity

let age1: number =20;
console.log(age1);

let isActive: boolean =true;
console.log(isActive);

let numbers1: number[] =[1,23,4];

console.log(numbers1)
let data: any = "this could be anything"
data=42;
console.log(data);
data = "google";
console.log(data);

function add(a: number,b: number): number{
    return a+b;
}
console.log(add(3,4));

let user : {name:string,age:number} = {name:"Jesus",age:24};
console.log(user.age);  