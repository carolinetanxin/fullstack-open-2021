const express = require('express');
const app = express();

import { calculateBmi } from "./bmiCalculator";
import { exerciseCalculator } from "./exerciseCalculator";

app.get('/hello', (_req: any, res: any) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (_req: any, res: any) => {
    const { weight, height } = _req.query;
    const validParameters: boolean =  !isNaN(Number(height)) && !isNaN(Number(weight))

    if (!validParameters || !weight || !height) {
        res.send({error: 'malformatted parameters'})
    }

    const bmi = calculateBmi(height, weight)

    res.send({weight, height, bmi})
})

app.post('/daily-exercises', (_req: any, res: any) => {
    // 情况1：字段缺失
    const { daily_exercises, target } = _req.body

    if (!daily_exercises || !target) {
        return res.json({error: 'parameters missing'})
    }

    // 情况2：传参不符合要求
    const validExercisesArray: boolean = Array.isArray(daily_exercises)
    let validExercises: boolean = false;
    if (validExercisesArray) {
        validExercises = (daily_exercises as []).some((exercise: number) => !isNaN(exercise))
    }
    const validTarget = !isNaN(Number(target))

    if (!validExercises || !validTarget) {
        return res.json({error: 'malformatted parameters'})
    }

    const response = exerciseCalculator(daily_exercises, Number(target));

    console.log({ response });
    return res.json(response);
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
