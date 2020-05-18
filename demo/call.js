// function fruits() { }

// fruits.prototype = {
//     color: "red",
//     say: function () {
//         console.log("My color is " + this.color);
//     }
// };

// var another = {
//     color: "yellow"
// };

// var apple = new fruits;
// apple.say();                //My color is red
// apple.say.call(another);    //My color is yellow
// apple.say.apply(another);   //My color is yellow

var name = "windowsName";
var a = {
  name : "Cherry",
  func1: function () {
   console.log(this.name)  
  },
  func2: function () {
   setTimeout( function () {
    this.func1()
   }.call(a),100);
  }
};
a.func2()  //  Cherry

// Simulate pure virtual inheritance/"implement" keyword for JS 
Function.prototype.implementsFor = function( parentClassOrObject ){ 
  if ( parentClassOrObject.constructor === Function ) { 
    // Normal Inheritance 
    this.prototype = new parentClassOrObject(); 
    this.prototype.constructor = this; 
    this.prototype.parent = parentClassOrObject.prototype; 
  } else { 
    // Pure Virtual Inheritance 
    this.prototype = parentClassOrObject; 
    this.prototype.constructor = this; 
    this.prototype.parent = parentClassOrObject; 
  } 
  return this; 
};