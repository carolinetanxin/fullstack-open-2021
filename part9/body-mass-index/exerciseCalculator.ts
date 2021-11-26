interface ExerciseResult {
    periodLength: number, // 天数
    trainingDays: number, // 计算出的平均时间
    success: boolean, // 布尔值，描述是否达到目标
    rating: number, // 一个数字1-3之间的等级，区分满足小时数的程度
    ratingDescription: string, // 解释评级的文字值
    target: number, // 原始目标值
    average: number // 计算出的平均时间
}

export const exerciseCalculator = (
    exerciseHoursList: number[],
    target: number
): ExerciseResult => {
    const periodLength = exerciseHoursList.length;

    const trainingDays = exerciseHoursList.filter(exerciseHour => exerciseHour !== 0).length;

    const average = exerciseHoursList.reduce((pre, cur) => pre + cur, 0) / periodLength;

    const success = average > target;

    let rating: number = 1;
    let ratingDescription: string = '';
    if (average < target) {
        rating = 1;
        ratingDescription = 'Average workout hours less than your target.';
    }
    if (average === target) {
        rating = 2;
        ratingDescription = 'Good job, average workout hours equals your target.';
    }
    if (average > target) {
        rating = 4;
        ratingDescription = 'Well done! average workout hours more than your target.';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average

    }
}

try {
    console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2))
} catch (e: unknown) {
    let errorMessage = 'Something bad happended.';
    if (e instanceof Error) {
        errorMessage += 'Error: ' + errorMessage;
    }
    console.log(errorMessage);
}
