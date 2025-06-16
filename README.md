# predict-v8-randomness-issue-1-poc
POC for issue #1 in predict-v8-randomness repo

1. Install Deps

```bash
npm install
```

2. To run `usingLocalV8RandomnessPredictor.ts`, which uses the file located at `./predictors/V8RandomnessPredictor.ts` (this is copy/pasted from the `predict-v8-randomness` repo [here](https://github.com/matthewoestreich/predict-v8-randomness/blob/main/src/Predictors/V8/V8RandomnessPredictor.ts)):

```bash
npm run usingLocalV8
```

3. To run `usingLocalChromeRandomnessPredictor.ts`, which uses the file located at `./predictors/ChromeRandomnessPredictor.ts` (this is copy/pasted from the `predict-v8-randomness` repo [here](https://github.com/matthewoestreich/predict-v8-randomness/blob/main/src/Predictors/Chrome/ChromeRandomnessPredictor.ts)):

```bash
npm run usingLocalChrome
```

4. To run all predictors:

```bash
npm run all
```