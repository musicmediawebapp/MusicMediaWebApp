'use strict';

var equationSolver = function(equation) {
    var solution;

    try {
        var operand = equationSolver.parseOperand(equation);
        var values = equationSolver.parseValues(equation, operand);
        solution = equationSolver.solveEquation(values[0], values[1], operand);
    } catch(err) {
        return err;
    }

    return solution;
};

equationSolver.parseOperand = function(equation) {
    var re = /[\+\*\/\-]/g;
    var result = re.exec(equation);

    if (!result) {
        throw(new Error('Operand not found or not supported.'));
    }

    return result[0];
};

equationSolver.parseValues = function(equation, operand) {
    if (equation[equation.length - 1] === '=') {
        equation = equation.slice(0, -1);
    }

    var arr = equation.split(operand);

    if (arr.length > 2) {
        throw(new Error('parseValues only handles two values'));
    }

    var value1 = Number(arr[0]);
    var value2 = Number(arr[1]);

    if (isNaN(value1) || isNaN(value2)) {
        throw(new Error('One of the values is NaN'));
    }

    return [value1, value2];
};

equationSolver.solveEquation = function(value1, value2, operand) {
    var result;

    switch (operand) {
        case '+':
            result = value1 + value2;
            break;
        case '-':
            result = value1 - value2;
            break;
        case '*':
            result = value1 * value2;
            break;
        case '/':
            result = value1 / value2;
            break;
        default:
            throw(new Error('Operand not supported: ' + operand));
    }

    return result;
};

module.exports = equationSolver;