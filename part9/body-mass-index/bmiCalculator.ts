interface BmiValues {
    value1: number,
    value2: number
}

const parseArguments = (args: Array<string>): BmiValues => {
    console.log(`args is ${args}`);

    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

type BMI = string;

export const calculateBmi = (height: number, weight: number): BMI => {

    const BMI = weight / ((height / 100) * (height / 100));

    if (BMI < 18.5) {
        console.log("Underweight");
        return "Underweight";
    } else if (BMI >= 18.5 && BMI < 25) {
        console.log("Normal (healthy weight)");
        return "Normal (healthy weight)";
    } else if (BMI >= 25 && BMI < 30) {
        console.log("Overweight");
        return "Overweight";
    } else if (BMI >= 30) {
        console.log("Obese");
        return "Obese";
    }
    return `Oops something went wrong, unable to calculate BMI`;
}

try {
    const { value1, value2 } = parseArguments(process.argv);
    calculateBmi(value1, value2)
} catch (e: unknown) {
    let errorMessage = 'Something bad happended.';
    if (e instanceof Error) {
        errorMessage += 'Error: ' + errorMessage;
        console.log(e);
    }
    console.log(errorMessage);
}
