export interface IFormula {
  id: string;
  name: string;
  description: string;
  syntax: string;
  example: string;
  expectedResult?: string;
}

export const FORMULAS = [
  {
    id: 'DATE', // check
    name: 'DATE',
    description: 'Converts a provided year, month, and day into a date.',
    syntax: 'DATE(year, month, day)',
    example: 'DATE(2008, 7, 8)',
    expectedResult: '7/8/08'
  },
  {
    id: 'DAY',
    name: 'DAY',
    description: 'Returns the day of the month that a specific date falls on, in numeric format.',
    syntax: 'DAY(date)',
    example: "DAY('15-Apr-11')",
    expectedResult: '15'
  },
  {
    id: 'DAYS',
    name: 'DAYS',
    description: 'Returns the number of days between two dates.',
    syntax: 'DAYS(end_date, start_date)',
    example: "DAYS('3/15/11', '2/1/11')",
    expectedResult: '42'
  },
  {
    id: 'EDATE', // check
    name: 'EDATE',
    description: 'Returns a date a specified number of months before or after another date.',
    syntax: 'EDATE(start_date, months)',
    example: "DATE(YEAR(EDATE('1/15/11', -1)), MONTH(EDATE('1/15/11', -1)), DAY(EDATE('1/15/11', -1)))",
    expectedResult: '12/15/10'
  },
  {
    id: 'EOMONTH', // check
    name: 'EOMONTH',
    description:
      'Returns a date representing the last day of a month which falls a specified number of months before or after another date.',
    syntax: 'EOMONTH(start_date, months))',
    example: "DATE(YEAR(EOMONTH('1/1/11', -3)), MONTH(EOMONTH('1/1/11', -3)), DAY(EOMONTH('1/1/11', -3)))",
    expectedResult: '10/31/10'
  },
  {
    id: 'HOUR',
    name: 'HOUR',
    description: 'Returns the hour component of a specific time, in numeric format.',
    syntax: 'HOUR(time)',
    example: "HOUR('7/18/2011 7:45:00 AM')",
    expectedResult: '7'
  },
  {
    id: 'MINUTE',
    name: 'MINUTE',
    description: 'Returns the minute component of a specific time, in numeric format.',
    syntax: 'MINUTE(time)',
    example: "MINUTE('2/1/2011 12:45:00 PM')",
    expectedResult: '45'
  },
  {
    id: 'MONTH',
    name: 'MONTH',
    description: 'Returns the month of the year a specific date falls in, in numeric format.',
    syntax: 'MONTH(date)',
    example: "MONTH('15-Apr-11')",
    expectedResult: '4'
  },
  {
    id: 'NETWORKDAYS', // check
    name: 'NETWORKDAYS',
    description: 'Returns the number of net working days between two provided days.',
    syntax: 'NETWORKDAYS(start_date, end_date, [holidays])',
    example: "NETWORKDAYS('10/1/2012', '3/1/2013', ['11/22/2012'])",
    expectedResult: '109'
  },
  {
    id: 'TODAY',
    name: 'TODAY',
    description:
      'Returns the current date as a date value. Formulas that use the TODAY function are not available for sorting, filtering, grouping, or column calculations.',
    syntax: 'TODAY()',
    example: 'TODAY()',
    expectedResult: 'Today'
  },
  {
    id: 'WEEKDAY',
    name: 'WEEKDAY',
    description: 'Returns a number representing the day of the week of the date provided.',
    syntax: 'WEEKDAY(date, [type])',
    example: "WEEKDAY('2/14/2008', 3)",
    expectedResult: '3'
  },
  {
    id: 'YEAR',
    name: 'YEAR',
    description: 'Returns the year specified by a given date.',
    syntax: 'YEAR(date)',
    example: "YEAR('7/5/2008')",
    expectedResult: '2008'
  },
  {
    id: 'WEEKNUM',
    name: 'WEEKNUM',
    description: 'Returns a number representing the week of the year where the provided date falls.',
    syntax: 'WEEKNUM(date, [type])',
    example: "WEEKNUM('3/9/2012', 2)",
    expectedResult: '11'
  },
  {
    id: 'WORKDAY', // check
    name: 'WORKDAY',
    description: 'Calculates the end date after a specified number of working days.',
    syntax: 'WORKDAY(start_date, num_days, [holidays])',
    example: "WORKDAY('10/1/2008', 151, ['11/26/2008', '12/4/2008'])",
    expectedResult: '5/4/09'
  },
  {
    id: 'AND',
    name: 'AND',
    description:
      'Returns true if all of the provided arguments are logically true, and false if any of the provided arguments are logically false.',
    syntax: 'AND(logical_expression1, [logical_expression2, ...])',
    example: 'AND(true, false, true)',
    expectedResult: 'false'
  },
  {
    id: 'IF',
    name: 'IF',
    description: 'Returns one value if a logical expression is `TRUE` and another if it is `FALSE`.',
    syntax: 'IF(logical_expression, value_if_true, value_if_false)',
    example: "IF(true, 'Hello!', 'Goodbye!')",
    expectedResult: 'Hello!'
  },
  {
    id: 'NOT',
    name: 'NOT',
    description: 'Returns the opposite of a logical value - `NOT(TRUE)` returns `FALSE`; `NOT(FALSE)` returns `TRUE`.',
    syntax: 'NOT(logical_expression)',
    example: 'NOT(true)',
    expectedResult: 'false'
  },
  {
    id: 'OR',
    name: 'OR',
    description:
      'Returns true if any of the provided arguments are logically true, and false if all of the provided arguments are logically false.',
    syntax: 'OR(logical_expression1, [logical_expression2, ...])',
    example: 'OR(true, false, true)',
    expectedResult: 'true'
  },
  {
    id: 'SWITCH',
    name: 'SWITCH',
    description:
      'Tests an expression against a list of cases and returns the corresponding value of the first matching case, with an optional default value if nothing else is met.',
    syntax: 'SWITCH(expression, case1, value1, [default or case2, value2], …)',
    example: "SWITCH(7, 9, 'Nine', 7, 'Seven')",
    expectedResult: 'Seven'
  },
  {
    id: 'XOR',
    name: 'XOR',
    description:
      'The XOR function performs an exclusive or of 2 numbers that returns a 1 if the numbers are different, and a 0 otherwise.',
    syntax: 'XOR(logical_expression1, [logical_expression2, ...])',
    example: 'XOR(true, false, true)',
    expectedResult: 'false'
  },
  {
    id: 'COS',
    name: 'COS',
    description: 'Returns the cosine of an angle provided in radians.',
    syntax: 'COS(angle)',
    example: 'COS(1)',
    expectedResult: '0.5403023058681398'
  },
  {
    id: 'ISEVEN',
    name: 'ISEVEN',
    description: 'Checks whether the provided value is even.',
    syntax: 'ISEVEN(value)',
    example: 'ISEVEN(-2.5)',
    expectedResult: 'true'
  },
  {
    id: 'LOG',
    name: 'LOG',
    description: 'Returns the the logarithm of a number given a base.',
    syntax: 'LOG(value, base)',
    example: 'LOG(8, 2)',
    expectedResult: '3'
  },
  {
    id: 'MOD',
    name: 'MOD',
    description: 'Returns the result of the modulo operator, the remainder after a division operation.',
    syntax: 'MOD(dividend, divisor)',
    example: 'MOD(3, -2)',
    expectedResult: '-1'
  },
  {
    id: 'POWER',
    name: 'POWER',
    description: 'Returns a number raised to a power.',
    syntax: 'POWER(base, exponent)',
    example: 'POWER(5, 2)',
    expectedResult: '25'
  },
  {
    id: 'PRODUCT',
    name: 'PRODUCT',
    description: 'Returns the result of multiplying a series of numbers together.',
    syntax: 'PRODUCT(factor1, [factor2, ...])',
    example: 'PRODUCT(5, 15, 30)',
    expectedResult: '2250'
  },
  {
    id: 'QUOTIENT',
    name: 'QUOTIENT',
    description: 'Returns one number divided by another excluding the remainder.',
    syntax: 'QUOTIENT(dividend, divisor)',
    example: 'QUOTIENT(-10, 3)',
    expectedResult: '-3'
  },
  {
    id: 'RANDBETWEEN',
    name: 'RANDBETWEEN',
    description: 'Returns a uniformly random integer between two values, inclusive.',
    syntax: 'RANDBETWEEN(low, high)',
    example: 'RANDBETWEEN(-1, 1)',
    expectedResult: '[Random integer between bottom and top]'
  },
  {
    id: 'ROUND',
    name: 'ROUND',
    description: 'Rounds a number to a certain number of decimal places according to standard rules.',
    syntax: 'ROUND(value, [places])',
    example: 'ROUND(626.3, -3)',
    expectedResult: '1000'
  },
  {
    id: 'ROUNDDOWN',
    name: 'ROUNDDOWN',
    description:
      'Rounds a number to a certain number of decimal places, always rounding down to the next valid increment.',
    syntax: 'ROUNDDOWN(value, [places])',
    example: 'ROUNDDOWN(-3.14159, 2)',
    expectedResult: '-3.14'
  },
  {
    id: 'ROUNDUP',
    name: 'ROUNDUP',
    description:
      'Rounds a number to a certain number of decimal places, always rounding up to the next valid increment.',
    syntax: 'ROUNDUP(value, [places])',
    example: 'ROUNDUP(-3.14159, 2)',
    expectedResult: '-3.15'
  },
  {
    id: 'SIN',
    name: 'SIN',
    description: 'Returns the sine of an angle provided in radians.',
    syntax: 'SIN(angle)',
    example: 'SIN(1)',
    expectedResult: '0.8414709848078965'
  },
  {
    id: 'SQRT',
    name: 'SQRT',
    description: 'Returns the positive square root of a positive number.',
    syntax: 'SQRT(value)',
    example: 'SQRT(16)',
    expectedResult: '4'
  },
  {
    id: 'SUM',
    name: 'SUM',
    description: 'Returns the sum of a series of numbers and/or cells.',
    syntax: 'SUM(value1, [value2, ...])',
    example: "SUM(-5, 15, 32, 'Hello World!')",
    expectedResult: '42'
  },
  {
    id: 'SUMIF', // check
    name: 'SUMIF',
    description: 'Returns a conditional sum across a range. Learn more',
    syntax: 'SUMIF(range, criterion, [sum_range])',
    example: "SUMIF([2,4,8,16], '&gt;5')",
    expectedResult: '24'
  },
  {
    id: 'SUMIFS', // check
    name: 'SUMIFS',
    description: 'Returns the sum of a range depending on multiple criteria.',
    syntax: 'SUMIFS(sum_range, criteria_range1, criterion1, [criteria_range2, criterion2, ...])',
    example: "SUMIFS([2,4,8,16], [1,2,3,4], '&gt;=2', [1,2,4,8], '&lt;=4')",
    expectedResult: '12'
  },
  {
    id: 'SUMPRODUCT', // check
    name: 'SUMPRODUCT',
    description: 'Calculates the sum of the products of corresponding entries in two equal-sized arrays or ranges.',
    syntax: 'SUMPRODUCT(array1, [array2, ...])',
    example: 'SUMPRODUCT([[1,2],[3,4]], [[1,0],[0,1]])',
    expectedResult: '5'
  },
  {
    id: 'TAN',
    name: 'TAN',
    description: 'Returns the tangent of an angle provided in radians.',
    syntax: 'TAN(angle)',
    example: 'TAN(1)',
    expectedResult: '1.5574077246549023'
  },
  {
    id: 'TRUNC',
    name: 'TRUNC',
    description: 'Truncates a number to a certain number of significant digits by omitting less significant digits.',
    syntax: 'TRUNC(value, [places])',
    example: 'TRUNC(-8.9)',
    expectedResult: '-8'
  },
  {
    id: 'AVERAGE',
    name: 'AVERAGE',
    description: 'Returns the numerical average value in a dataset, ignoring text.',
    syntax: 'AVERAGE(value1, [value2, ...])',
    example: "AVERAGE(2, 4, 8, 16, 'text')",
    expectedResult: '7.5'
  },
  {
    id: 'AVERAGEIF', // check
    name: 'AVERAGEIF',
    description: 'Returns the average of a range depending on criteria.',
    syntax: 'AVERAGEIF(criteria_range, criterion, [average_range])',
    example: "AVERAGEIF([2,4,8,16], '&gt;5', [1, 2, 3, 4])",
    expectedResult: '3.5'
  },
  {
    id: 'AVERAGEIFS', // check
    name: 'AVERAGEIFS',
    description: 'Returns the average of a range depending on multiple criteria.',
    syntax: 'AVERAGEIFS(average_range, criteria_range1, criterion1, [criteria_range2, criterion2, ...])',
    example: "AVERAGEIFS([2,4,8,16], [1,2,3,4], '&gt;=2', [1,2,4,8], '&lt;=4')",
    expectedResult: '6'
  },
  {
    id: 'COUNT',
    name: 'COUNT',
    description: 'Returns a count of the number of numeric values in a dataset.',
    syntax: 'COUNT(value1, [value2, ...])',
    example: 'COUNT(1, 2, 3, 4)',
    expectedResult: '4'
  },
  {
    id: 'COUNTBLANK',
    name: 'COUNTBLANK',
    description: 'Returns the number of empty cells in a given range.',
    syntax: 'COUNTBLANK(range)',
    example: "COUNTBLANK(1, '', 3, 'a', '', 'c')",
    expectedResult: '2'
  },
  {
    id: 'COUNTIF', // check
    name: 'COUNTIF',
    description: 'Returns a conditional count across a range.',
    syntax: 'COUNTIF(range, criterion)',
    example: 'COUNTIF([1, 0, 1, 0, 1], 1)',
    expectedResult: '3'
  },
  {
    id: 'COUNTIFS', // check
    name: 'COUNTIFS',
    description: 'Returns the count of a range depending on multiple criteria.',
    syntax: 'COUNTIFS(criteria_range1, criterion1, [criteria_range2, criterion2, ...])',
    example: "COUNTIFS([2,4,8,16], [1,2,3,4], '&gt;=2', [1,2,4,8], '&lt;=4')",
    expectedResult: '2'
  },
  {
    id: 'COUNTUNIQUE',
    name: 'COUNTUNIQUE',
    description: 'Counts the number of unique values in a list of specified values and ranges.',
    syntax: 'COUNTUNIQUE(value1, [value2, ...])',
    example: 'COUNTUNIQUE([1,1,2,2,3,3])',
    expectedResult: '3'
  },
  {
    id: 'LARGE', // check
    name: 'LARGE',
    description: 'Returns the nth largest element from a data set, where n is user-defined.',
    syntax: 'LARGE(data, n)',
    example: 'LARGE([3,5,3,5,4,4,2,4,6,7], 3)',
    expectedResult: '5'
  },
  {
    id: 'MAX',
    name: 'MAX',
    description: 'Returns the maximum value in a numeric dataset.',
    syntax: 'MAX(value1, [value2, ...])',
    example: 'MAX(0.1, 0.2, 0.4, 0.8, true, false)',
    expectedResult: '0.8'
  },
  {
    id: 'MEDIAN',
    name: 'MEDIAN',
    description: 'Returns the median value in a numeric dataset.',
    syntax: 'MEDIAN(value1, [value2, ...])',
    example: 'MEDIAN(1, 2, 3, 4, 5, 6)',
    expectedResult: '3.5'
  },
  {
    id: 'MIN',
    name: 'MIN',
    description: 'Returns the minimum value in a numeric dataset.',
    syntax: 'MIN(value1, [value2, ...])',
    example: 'MIN(0.4, 0.3, 0.2, 0.1)',
    expectedResult: '0.1'
  },
  {
    id: 'SMALL', // check
    name: 'SMALL',
    description: 'Returns the nth smallest element from a data set, where n is user-defined.',
    syntax: 'SMALL(data, n)',
    example: 'SMALL([3,5,3,5,4,4,2,4,6,7], 3)',
    expectedResult: '3'
  },
  {
    id: 'CHAR',
    name: 'CHAR',
    description: 'Convert a number into a character according to the current Unicode table.',
    syntax: 'CHAR(table_number)',
    example: 'CHAR(65)',
    expectedResult: 'A'
  },
  {
    id: 'CLEAN',
    name: 'CLEAN',
    description: 'Returns the text with the non-printable ASCII characters removed.',
    syntax: 'CLEAN(text)',
    example: "CLEAN('Monthly report')",
    expectedResult: 'Monthly report'
  },
  {
    id: 'CONCATENATE',
    name: 'CONCATENATE',
    description: 'Appends strings to one another.',
    syntax: 'CONCATENATE(string1, [string2, ...])',
    example: "CONCATENATE('Andreas', ' ', 'Hauser')",
    expectedResult: 'Andreas Hauser'
  },
  {
    id: 'EXACT',
    name: 'EXACT',
    description: 'Tests whether two strings are identical.',
    syntax: 'EXACT(string1, string2)',
    example: "EXACT('Word', 'word')",
    expectedResult: 'false'
  },
  {
    id: 'FIND',
    name: 'FIND',
    description: 'Returns the position at which a string is first found within text.',
    syntax: 'FIND(search_for, text_to_search, [starting_at])',
    example: "FIND('M', 'Miriam&nbsp;McGovern', 2)",
    expectedResult: '13'
  },
  {
    id: 'LEFT',
    name: 'LEFT',
    description: 'Returns a substring from the beginning of a specified string.',
    syntax: 'LEFT(string, [number_of_characters])',
    example: "LEFT('Sale Price', 4)",
    expectedResult: 'Sale'
  },
  {
    id: 'LEN',
    name: 'LEN',
    description: 'Returns the length of a string.',
    syntax: 'LEN(text)',
    example: "LEN('Phoenix, AZ')",
    expectedResult: '11'
  },
  {
    id: 'LOWER',
    name: 'LOWER',
    description: 'Converts a specified string to lowercase.',
    syntax: 'LOWER(text)',
    example: "LOWER('E. E. Cummings')",
    expectedResult: 'e. e. cummings'
  },
  {
    id: 'MID',
    name: 'MID',
    description: 'Returns a segment of a string.',
    syntax: 'MID(string, starting_at, extract_length)',
    example: "MID('Fluid Flow', 7, 20)",
    expectedResult: 'Flow'
  },
  {
    id: 'PROPER',
    name: 'PROPER',
    description: 'Capitalizes each word in a specified string.',
    syntax: 'PROPER(text_to_capitalize)',
    example: "PROPER('this is a TITLE')",
    expectedResult: 'This Is A Title'
  },
  {
    id: 'REGEXEXTRACT',
    name: 'REGEXEXTRACT',
    description: 'Extracts matching substrings according to a regular expression.',
    syntax: 'REGEXEXTRACT(text, regular_expression)',
    example: "REGEXEXTRACT('Palo Alto', 'Alto')",
    expectedResult: 'Alto'
  },
  {
    id: 'REGEXMATCH',
    name: 'REGEXMATCH',
    description: 'Whether a piece of text matches a regular expression.',
    syntax: 'REGEXMATCH(text, regular_expression)',
    example: "REGEXMATCH('Palo Alto', 'Alto')",
    expectedResult: 'true'
  },
  {
    id: 'REGEXREPLACE',
    name: 'REGEXREPLACE',
    description: 'Replaces part of a text string with a different text string using regular expressions.',
    syntax: 'REGEXREPLACE(text, regular_expression, replacement)',
    example: "REGEXREPLACE('Sutoiku', 'utoiku', 'TOIC')",
    expectedResult: 'STOIC'
  },
  {
    id: 'REPLACE',
    name: 'REPLACE',
    description: 'Replaces part of a text string with a different text string.',
    syntax: 'REPLACE(text, position, length, new_text)',
    example: "REPLACE('abcdefghijk', 6, 5, '*')",
    expectedResult: 'abcde*k'
  },
  {
    id: 'RIGHT',
    name: 'RIGHT',
    description: 'Returns a substring from the end of a specified string.',
    syntax: 'RIGHT(string, [number_of_characters])',
    example: "RIGHT('Sale Price', 5)",
    expectedResult: 'Price'
  },
  {
    id: 'SEARCH',
    name: 'SEARCH',
    description: 'Returns the position at which a string is first found within text.',
    syntax: 'SEARCH(search_for, text_to_search, [starting_at])',
    example: "SEARCH('margin', 'Profit Margin')",
    expectedResult: '8'
  },
  {
    id: 'SPLIT',
    name: 'SPLIT',
    description:
      'Divides text around a specified character or string, and puts each fragment into a separate cell in the row.',
    syntax: 'SPLIT(text, delimiter, [split_by_each], [remove_empty_text])',
    example: "SPLIT('A,B,C', ',')",
    expectedResult: "['A', 'B', 'C']"
  },
  {
    id: 'TRIM',
    name: 'TRIM',
    description: 'Removes leading and trailing spaces in a specified string.',
    syntax: 'TRIM(text)',
    example: "TRIM(' First Quarter Earnings ')",
    expectedResult: 'First Quarter Earnings'
  },
  {
    id: 'UPPER',
    name: 'UPPER',
    description: 'Converts a specified string to uppercase.',
    syntax: 'UPPER(text)',
    example: "UPPER('total')",
    expectedResult: 'TOTAL'
  }
];

/*
  {
    id: '',
    name: '',
    description: '',
    syntax: '',
    example: '',
    expectedResult: ''
  }
*/
