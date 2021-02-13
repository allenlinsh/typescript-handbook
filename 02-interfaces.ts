/**
 * Interfaces in TypeScript
 * 2021/2/10 x6g4x6
 */

import { countReset } from "console";

/**
 * Interfaces
 */
// defines the specifications of an entity, including properties and function types
interface LabeledValue {
	label: string;
}

function printLabel(labeledObj: LabeledValue) {
	console.log(labeledObj.label);
}
let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

/**
 * Optional Properties
 */
// when you pass an object to a function that only has several
// properties filled in
interface SquareConfig {
	color?: string;
	width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
	let newSquare = { color: "white", area: 100 };
	if (config.color) {
		newSquare.color = config.color;
	}
	if (config.width) {
		newSquare.area = config.width * config.width;
	}
	return newSquare;
}

let mySquare = createSquare({ color: "black", width: 12 });
console.log(mySquare);

/**
 * Read-only Properties
 */
// a way to construct read-only objects so that an object is only
// modifiable when it's first created
interface Point {
	readonly x: number;
	readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
// @ts-ignore
p1.x = 5; // produces an error

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

// @ts-ignore
ro[0] = 12; // produces an error
// @ts-ignore
ro.push(5); // error
// @ts-ignore
ro.length = 100; // error
// @ts-ignore
a = ro; // error

a = ro as number[]; // this can be overridden with a type assertion

// readonly vs const:
// readonly are for 'properties' (e.g. person.name)
// const are for 'variables' (e.g. name)

/**
 * Excess Property Checks
 */
// object literals undergo excess property checking if it has
// any properties that the 'target type' doesn't have
// @ts-ignore
let alsoMySquare = createSquare({ colour: "red", width: 100 }); // should be 'color' instead of 'colour'

interface AlsoSquareConfig {
	// one way to bypass
	color?: string;
	width?: number;
	[propName: string]: any; // SquareConfig can have any number of properties in addition to color and width
}

let anotherMySquare = createSquare({
	// another way to bypass
	width: 100,
	opacity: 0.5,
} as SquareConfig);

/**
 * Function Types
 */
// describes the function type using a call signature
// with only the parameter list and return type
interface SearchFunc {
	(source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
	let result = source.search(subString);
	return result > -1;
};

let altSearch: SearchFunc = function (src, sub) {
	// names of the parameters do not need to match
	let result = src.search(sub);
	return result > -1; // data types are implied from the interface
};

/**
 * Indexable Types
 */
// describes the indexable type using an index signature
// with corresponding indexed objects and return types
interface StringArray {
	[index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];

/**
 * Class Types
 */
// explicitly enforces a class to meet a particular contract
interface ClockConstructor {
	// for constructor
	new (hour: number, minute: number): ClockInterface;
}

interface ClockInterface {
	// for instance method
	tick(): void;
}

function createClock(
	ctor: ClockConstructor,
	hour: number,
	minute: number
): ClockInterface {
	return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
	constructor(h: number, m: number) {}
	tick() {
		console.log("beep beep");
	}
}

class AnalogClock implements ClockInterface {
	constuctor(h: number, m: number) {}
	tick() {
		console.log("tick tock");
	}
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);

/**
 * Extending Interfaces
 */
// allows you to copy the members of one interface into another
interface Shape {
	color: string;
}

interface PenStroke {
	penWidth: number;
}

interface Square extends Shape, PenStroke {
	sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
console.log(square);

/**
 * Hybrid Types
 */
// describes rich types of objects, such as an object that acts as
// both a function and an object
interface Counter {
	(start: number): string;
	interval: number;
	reset(): void;
}

function getCounter(): Counter {
	let counter = function (start: number) {} as Counter;
	counter.interval = 123;
	counter.reset = function () {};
	return counter;
}

let c = getCounter();
c(10);
c.interval = 5.0;

/**
 * Interfaces Extending Classes
 */
// when an interface type extendds a class type, it inherits the
// members of the class (even private) but not their implementations
class Control {
	private state: any;
}

interface SelectableControl extends Control {
	// this interface acts like the class Control, but it
	// also has access to the 'select' method
	select(): void;
}

class Button extends Control implements SelectableControl {
	// a subtype of the interface SelectableControl
	select() {}
}

class TextBox extends Control {
	// a subtype of the interface SelectableControl
	select() {}
}

// @ts-ignore
class ImageControl implements SelectableControl {
	// ImageControl cannot have a separate declaration of the private
	// property 'state' because SelectableControl is a subclass of Control,
	// which already has the private property 'state'
	private state: any; // produces an error
	select() {}
}