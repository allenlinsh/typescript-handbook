/**
 * Basic Types in TypeScript
 * 2021/2/10 x6g4x6
 */

/** 
 * Boolean
 */
// represents true/false value
let isDone: boolean = false;

/**
 * Numbers
 */
// represents numerical data
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;

/**
 * String
 */
// represents textual data
let color: string = "blue";
color = "red";

// Backtick is used for multiline and embedded expressions
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}.

I'll be ${age + 1} years old next month.`;

/**
 * Array
 */
// represents an array of values
let list: number[] = [1, 2, 3];
let alsoList: Array<number> = [1, 2, 3];

/**
 * Tuple
 */
// represents an array with a fixed number of elements
// whose types are known, but need not be the same
let x: [string, number];
x = ["hello", 10];
let sub: string = x[0].substring(1); // sub = "ello"

/**
 * Enum
 */
// represents a set of predefined constants
enum Color {
	Red = 1, // By default, enums begin numbering their members starting at 0. But this can be changed manually.
	Green,
	Blue,
}
let c: Color = Color.Green;
let colorName: string = Color[2]; // colorName = "Green"

/**
 * Unknown
 */
// represents the type of variables that we do not know (may be dynamic data type)
let notSure: unknown = 4;
notSure = "maybe a string instead";
notSure = false; // OK, definitely a boolean

declare const maybe: unknown; // 'maybe' could be any datatype
const aNumber: number = maybe; // produces an error

if (maybe === true) {
	// 'maybe' is a boolean now
	const aBoolean: boolean = maybe;
	const aString: string = maybe; // 'maybe' cannot be a string; produces an error
}

if (typeof maybe === "string") {
	// 'maybe' is a string
	const aString: string = maybe;
	const aBoolean = maybe; // 'maybe' cannot be a boolean; produces an error
}

/**
 * Any
 */
// represents any type of data to skip type checking
declare function getValue(key: string): any;
const str: string = getValue("myString"); // return value of 'getValue' is not checked

let looselyTyped: any = 4;
looselyTyped.ifItExists(); // 'ifItExists' might exist at runtime
looselyTyped.toFixed(); // 'toFixed' exists (but the compiler doesn't check)

let strictlyTyped: unknown = 4;
strictlyTyped.toFixed(); // type 'unknown' cannot access arbitrary properties

looselyTyped = {};
let d = looselyTyped.a.b.c.d; // avoid using type 'any' when not necessary to maintain type safety
//  ^ = let d: any

/**
 * Void
 */
// represents the absence of having any type at all
function warnUser(): void {
	// does not return a value
	console.log("This is my warning message");
}

let unusable: void = undefined;
unusable = null;

/**
 * Null and Undefined
 */
// represents null or undefined data
let u: undefined = undefined; // they are both subtypes of all other types
let n: null = null; // --strictNullChecks make 'null' and 'undefinied' only assignable to 'unknown'

/**
 * Never
 */
// represents the type of values that never occur; functions
// returning 'never' must not have a reachable end point
function error(message: string): never {
	throw new Error(message);
}

function fail() {
	// inferred return type is 'never'
	return error("Something failed");
}

function infiniteLoop(): never {
	while (true) {}
}

/**
 * Object
 */
// represents non-primitive data (this is rarely used)
declare function create(o: object | null): void;
create({ prop: 0 });
create(null);

/**
 * Type Assertion
 */
// type assertion occurs when you change the current type of the data
// to a more specific one, kind of like type cast
let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length; // only assertion style allowed for JSX
strLength = (<string>someValue).length;
