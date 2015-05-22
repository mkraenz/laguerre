class Greeter {
    constructor(public greeting: string) { }
    greet() {
        return "<h1>test" + this.greeting + "</h1>";
    }
    salute() {
        var x: number = 5;
        return x;
    }
};
var greeter = new Greeter("Hello, world! I was changed.");
var str:string = greeter.greet();
document.body.innerHTML = str;