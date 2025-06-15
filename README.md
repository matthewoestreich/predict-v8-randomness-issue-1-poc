# predict-v8-randomness-issue-1-poc
POC for issue #1 in predict-v8-randomness repo

1. Install Deps

```bash
npm install
```

2. To run `usingNPMPackage.js`, which uses the `predict-v8-randomness` NPM package:

```bash
npm run usingNPMPackage
```

3. To run `usingLocalV8RandomnessPredictor.ts`, which uses the file located at `./V8RandomnessPredictor.ts` (this is copy/pasted from the `predict-v8-randomness` repo [here](https://github.com/matthewoestreich/predict-v8-randomness/blob/main/src/Predictors/V8/V8RandomnessPredictor.ts)):

```bash
npm run usingLocal
```

4. To run both:

```bash
npm run all
```