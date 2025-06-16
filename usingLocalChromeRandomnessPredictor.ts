import ChromeRandomnessPredictor from "./predictors/ChromeRandomnessPredictor";

// THESE NUMBERS HAVE TO BE GENERATED IN THE CHROME CONSOLE, OTHERWISE IT WON'T WORK.
const STATIC_SEQUENCE = [0.8372682849227072, 0.8716440462966869, 0.4409878820146589, 0.6952151200845069, 0.43415411479113564];
const STATIC_EXPECTED = [0.8323824460572666, 0.7312701945327716, 0.9733241307702657, 0.5716292635937189, 0.11990254642357445];

// WE CANNOT USE DYNAMIC NUMBERS HERE SINCE WE ARE USING THE CHROME PREDICTOR IN NODE.
// THE USER MUST PROVIDE A SEQUENCE OF NUMBERS GENERATED IN CHROME CONSOLE.
/*
const DYNAMIC_SEQUENCE = Array.from({ length: 4 }, Math.random);
const DYNAMIC_EXPECTED = Array.from({ length: 20 }, Math.random);
*/

// IN ORDER TO DEMONSTRATE HOW THIS WON'T WORK WITH V8/NODE NUMBERS
const V8_SEQUENCE = [0.514802909453242, 0.8295160444053722, 0.6406296433730201, 0.7644759062385258];
const V8_EXPECTED = [0.03326790742165775, 0.24744760450326297, 0.0955102665752785, 0.8605961778593056, 0.20990633295027128];

async function test(sequence: number[], expected: number[]): Promise<boolean> {
	const chromePredictor = await ChromeRandomnessPredictor.create(sequence);
	const predictions: number[] = [];
	for (let i = 0; i < expected.length; i++) {
		predictions.push(chromePredictor.predictNext());
	}
	return predictions.every((n, i) => n === expected[i]);
}

(async () => {
	try {
		console.log(`\x1b[36m[[[ WE EXPECT THIS TO FAIL ]]] \x1b[33mUsing Local ChromeRandomnessPredictor.ts : Testing with sequence generated in V8 \x1b[33m(num predictions: ${V8_EXPECTED.length})\x1b[0m`);
		await test(V8_SEQUENCE, V8_EXPECTED);
	} catch (e) {
		console.error(`\x1b[31m[usingLocalChrome] THIS IS EXPECTED - We cannot use the Chrome Predictor to predict numbers generated in V8!\x1b[0m`);
	}

	try {
		const staticResult = await test(STATIC_SEQUENCE, STATIC_EXPECTED);
		// for the console color
		const staticColor = staticResult ? "\x1b[32m" : "\x1b[31m";
		console.log(`\x1b[33mUsing Local ChromeRandomnessPredictor.ts : Testing with static sequence (num predictions: ${STATIC_EXPECTED.length}) : Are Predictions Correct?\x1b[0m ${staticColor}${staticResult}\x1b[0m`);
	} catch (e) {
		console.error(`[usingLocalChrome] Something went wrong with Chrome static sequence!`, e);
	}
})();
