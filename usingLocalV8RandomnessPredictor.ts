import V8RandomnessPredictor from "./predictors/V8RandomnessPredictor";

// THESE NUMBERS HAVE TO BE GENERATED IN NODE OR ELSE IT WON'T WORK.
const STATIC_SEQUENCE = [0.514802909453242, 0.8295160444053722, 0.6406296433730201, 0.7644759062385258];
const STATIC_EXPECTED = [0.03326790742165775, 0.24744760450326297, 0.0955102665752785, 0.8605961778593056, 0.20990633295027128];

// WE CAN USE DYNAMIC NUMBERS HERE SINCE WE ARE RUNNING THIS IN NODE.
const DYNAMIC_SEQUENCE = Array.from({ length: 4 }, Math.random);
const DYNAMIC_EXPECTED = Array.from({ length: 20 }, Math.random);

// IN ORDER TO DEMONSTRATE HOW THIS WON'T WORK WITH CHROME NUMBERS.
// THESE ARE THE NUMBERS GENERATED IN CHROME, WE EXPECT THIS TO FAIL.
const CHROME_SEQUENCE = [0.8372682849227072, 0.8716440462966869, 0.4409878820146589, 0.6952151200845069, 0.43415411479113564];
const CHROME_EXPECTED = [0.8323824460572666, 0.7312701945327716, 0.9733241307702657, 0.5716292635937189, 0.11990254642357445];

async function test(sequence: number[], expected: number[]): Promise<boolean> {
	const v8Predictor = new V8RandomnessPredictor(sequence);
	const predictions = await v8Predictor.predictNext(expected.length);
	return predictions.every((n, i) => n === expected[i]);
}

(async () => {
	try {
		console.log(`\x1b[36m[[[ WE EXPECT THIS TO FAIL ]]] \x1b[33mUsing Local V8RandomnessPredictor.ts : Testing with Chrome sequence (num predictions: ${CHROME_EXPECTED.length})\x1b[0m`);
		await test(CHROME_SEQUENCE, CHROME_EXPECTED);
	} catch (e) {
		console.error(`\x1b[31m[usingLocalV8] THIS IS EXPECTED - We cannot use the V8 Predictor to predict numbers generated in Chrome!\x1b[0m`);
	}

	try {
		const staticResult = await test(STATIC_SEQUENCE, STATIC_EXPECTED);
		// for the console color
		const staticColor = staticResult ? "\x1b[32m" : "\x1b[31m";
		console.log(`\x1b[33mUsing Local V8RandomnessPredictor.ts : Testing with static sequence (num predictions: ${STATIC_EXPECTED.length}) : Are Predictions Correct?\x1b[0m ${staticColor}${staticResult}\x1b[0m`);
	} catch (e) {
		console.error(`[usingLocalV8] Something went wrong with static sequence prediction!`, e);
	}

	try {
		const dynamicResult = await test(DYNAMIC_SEQUENCE, DYNAMIC_EXPECTED);
		// for the console color
		const dynamicColor = dynamicResult ? "\x1b[32m" : "\x1b[31m";
		console.log(`\x1b[33mUsing Local V8RandomnessPredictor.ts : Testing with dynamic sequence (num predictions: ${DYNAMIC_EXPECTED.length}) : Are Predictions Correct?\x1b[0m ${dynamicColor}${dynamicResult}\x1b[0m`);
	} catch (e) {
		console.error(`[usingLocalV8] Something went wrong with dynamic sequence prediction!`, e);
	}
})();
