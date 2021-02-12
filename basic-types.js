// Boolean
var isDone = false;
// Numbers
var decimal = 6;
var hex = 0xf00d;
var binary = 10;
var octal = 484;
// String
var color = "blue";
color = "red";
// Backtick is used for multiline and embedded expressions
var fullName = "Bob Bobbington";
var age = 37;
var sentence = "Hello, my name is " + fullName + ".\n\nI'll be " + (age + 1) + " years old next month.";
// Array
var list = [1, 2, 3];
var alsoList = [1, 2, 3];
// Tuple
var x;
x = ["hello", 10];
var sub = x[0].substring(1); // sub = "ello"
// Enum
var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["Green"] = 2] = "Green";
    Color[Color["Blue"] = 3] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
var colorName = Color[2]; // colorName = "Green"
console.log(type(colorName));
