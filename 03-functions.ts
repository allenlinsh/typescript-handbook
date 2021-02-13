/**
 * Functions in TypeScript
 * 2021/2/11 x6g4x6
 */

/**
 * Function Types
 */
// Named function
function add(x: number, y: number): number {
	return x + y;
}

// Anonymous function
let myAdd = function (x, y) {
	return x + y;
};

/**
 * Writing Function Types
 */
// Add types to each parameters and add a return type
let alsoMyAdd = function (x: number, y: number): number {
	return x + y;
};
// Or write out the full type of the function
let extraMyAdd: (x: number, y: number) => number = function (
	x: number,
	y: number
): number {
	return x + y;
};

// Capturing variables outside of the function body
// (captured variables are not reflected in the type)
let z = 100;
function addToZ(x: number, y: number): number {
	return x + y + z;
}

/**
 * Contextual Typing
 */
// A form of type inference that inters the types of the function
// (as long as the parameter types match, the names don't need to match)
let exampleAdd: (baseValue: number, increment: number) => number = function (
	x,
	y
) {
	return x + y;
};

/**
 * Optional and Default Parameters
 */
// The number of arguments given to a function has to match
// the number of parameters the function expects
function buildName(firstName: string, lastName: string) {
	return firstName + " " + lastName;
}
// @ts-ignore
let result1 = buildName("Bob"); // too few parameters
// @ts-ignore
let result2 = buildName("Bob", "Adams", "Sr."); // too many parameters
let result3 = buildName("Bob", "Adams");

// Optional Parameters
// Make a parameter optional by adding a ? to the end of the
// parameter, and their default value is 'undefined'
function alsoBuildName(firstName: string, lastName?: string) {
	if (lastName) return buildName(firstName, lastName);
	else return firstName;
}
let result4 = alsoBuildName("Bob");
// @ts-ignore
let result5 = alsoBuildName("Bob", "Adams", "Sr."); // too many parameters
let result6 = alsoBuildName("Bob", "Adams");

// Default Parameters
// Default-initialized parameters are treated as optional, and
// can be omitted
function extraBuildName(firstName: string, lastName = "Smith") {
	return firstName + " " + lastName;
}

/**
 * Rest Parameters
 */
// Works with multiple parameters as a group
// (treated as a boundless number of optional parameters)
function listBuildName(firstName: string, ...restOfName: string[]) {
	return firstName + " " + restOfName.join(" ");
}

// employeeName will be "Joseph Samuel Lucas MacKinzie"
let employeeName = listBuildName("Joseph", "Samuel", "Lucas", "MacKinzie");

/**
 * 'this' and Arrow Functions
 */
// An arrow function allows us to capture the 'this' where
// the function is created rather than where it is invoked
interface Card {
	suit: string;
	card: number;
}

interface Deck {
	suits: string[];
	cards: number[];
	createCardPicker(this: Deck): () => Card;
}

let deck: Deck = {
	suits: ["hearts", "spades", "clubs", "diamonds"],
	cards: Array(52),
	createCardPicker: function (this: Deck) {
		return () => {
			let pickedCard = Math.floor(Math.random() * 52);
			let pickedSuit = Math.floor(pickedCard / 13);
			return {
				// Without the arrow function '() =>', a top-level non-method
				// syntax call in this function will use 'window' for 'this'
				suit: this.suits[pickedSuit],
				card: pickedCard % 13,
			};
		};
	},
};

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);

/**
 * 'this' parameters
 */
// Provide an explicit 'this' parameter to restrict the data type of 'this'
function f(this: void) {
	// 'this' is unusable in this function because void returns undefined
}

// 'this' parameters in callbacks


/**
 * Overloads
 */