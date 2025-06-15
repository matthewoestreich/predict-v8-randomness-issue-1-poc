import V8RandomnessPredictor from "./V8RandomnessPredictor";

const STATIC_SEQUENCE = [0.514802909453242, 0.8295160444053722, 0.6406296433730201, 0.7644759062385258];
const STATIC_EXPECTED = [0.03326790742165775, 0.24744760450326297, 0.0955102665752785, 0.8605961778593056, 0.20990633295027128];

const DYNAMIC_SEQUENCE = Array.from({ length: 4 }, Math.random);
const DYNAMIC_EXPECTED = Array.from({ length: 20 }, Math.random);

async function test(sequence: number[], expected: number[]): Promise<boolean> {
	const v8Predictor = new V8RandomnessPredictor(sequence);
	const predictions = await v8Predictor.predictNext(expected.length);
	return predictions.every((n, i) => n === expected[i]);
}

(async () => {
	try {
		const staticResult = await test(STATIC_SEQUENCE, STATIC_EXPECTED);
    // for the console color
    const staticColor = staticResult ? "\x1b[32m" : "\x1b[31m";
    console.log(`\x1b[33mUsing Local V8RandomnessPredictor.ts : Testing with static sequence (num predictions: ${STATIC_EXPECTED.length}) : Are Predictions Correct?\x1b[0m ${staticColor}${staticResult}\x1b[0m`);
    const dynamicResult = await test(DYNAMIC_SEQUENCE, DYNAMIC_EXPECTED);
    const dynamicColor = dynamicResult ? "\x1b[32m" : "\x1b[31m";
    console.log(`\x1b[33mUsing Local V8RandomnessPredictor.ts : Testing with dynamic sequence (num predictions: ${DYNAMIC_EXPECTED.length}) : Are Predictions Correct?\x1b[0m ${dynamicColor}${dynamicResult}\x1b[0m`);
	} catch (e) {
		console.error(`[usingLocal] Something went wrong!`, e);
	}
})();
