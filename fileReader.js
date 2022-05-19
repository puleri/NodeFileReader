const { readFileSync } = require('fs')

// Make sure we have a filename on the command line.
if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
  }

let strDelimiter = "";
let strFirst;
let strLast;
let strGender;
let strDOB;
let strColor;
const file = process.argv[2]
let result;


const contents = readFileSync(file, 'utf-8');
if (contents.includes("|")) {
    strDelimiter = "pipe";
} else if (contents.includes(",")) {
    strDelimiter = "comma";
} else {
    strDelimiter = "space";
}

// Read the file and print its contents.
var lineReader = require('readline').createInterface({
input: require('fs').createReadStream(file)
});

let arrInfo = [];
lineReader.on('line', function (line) {
    line.toString()
    // regex
    const noPipeCharacters = line.replace(/[|]/g, '');
    const dateFormatting = noPipeCharacters.replace(/[-]/g, '/');
    result = dateFormatting.split(/[, ]+/);
    // console.log(result)
    // first and last always in same position
    strFirst = result[1];
    strLast = result[0];

    switch (strDelimiter) {
        case "space":
            strGender = (result[3]=="M" ? "Male" : "Female")
            strDOB = result[4];
            strColor = result[5];
            break
        case "pipe":
            strGender = (result[3]=="M" ? "Male" : "Female");
            strDOB = result[5];
            strColor = result[4];
            break
        case "comma":
            strGender = result[2];
            strDOB = result[4];
            strColor = result[3];
            break
    }
    let formatArray = [strLast, strFirst, strGender, strDOB, strColor]
    // console.log(strColor)
    const withSpaces = formatArray.join(' ');

    arrInfo.push(withSpaces);

});

let strInfo;

lineReader.on('close', function () {
    //   print in desired format: Last, First, Gender, DOB, Color
        const withLineBreaks = arrInfo.join('\n');
    
        console.log(withLineBreaks);
        strInfo = withLineBreaks;
        return
    })



module.exports;
