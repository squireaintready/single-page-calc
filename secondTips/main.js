var totalCash = document.getElementById('totalCash')
var bgCount = document.getElementById('numBG')
var bbCount = document.getElementById('numBB')
var serverCount = document.getElementById('numServer')
var defaultValues = document.getElementById('defaults').value;

var bgHelper
var bbHelper
var serverHelper
var piggy

var bgOutput = document.getElementById('bgCash')
var bbOutput = document.getElementById('bbCash')
var serverOutput = document.getElementById('serverCash')

var bgTotal = document.getElementById('totalBgCash')
var bbTotal = document.getElementById('totalBbCash')
var serverTotal = document.getElementById('totalServerCash')

var remainingCash = document.getElementById('modulus')
var cashReturn = document.getElementById('returnCash')

var finalLastConfirmation = document.getElementById('finalConfirmation')

function clicked() {
    defaults();
    calculateBg()
    calculateBb()
    calculateServer()
    confirmValues()
    
}

function defaults(){
    var defaultValues = document.getElementById('defaults').value;
    if(defaultValues == 'weekday'){
        bgCount.value = 1;
        bbCount.value = 3;
        serverCount.value = 7;
    }else if(defaultValues == 'weekend'){
        bgCount.value = 1;
        bbCount.value = 3.65;
        serverCount.value = 10;
    }
};

function calculateBg(){
    var bgTip = totalCash.value * .015;
    if(bgCount.value == 1){
        bgOutput.value = Math.round(bgTip);
        bgHelper = Math.round(bgTip);
    }else if (bgCount.value == 2){
        var bg40 = Math.round(bgTip *.4);
        var bg60 = Math.round(bgTip *.6);
        bgOutput.value = "40%: " + bg40 + "\n 60%: " + bg60;
        bgHelper = bg40 + bg60;
    }else if (bgCount.value > 2){
        bgOutput.value = 'Error: Computed 1 busgirl. Please adjust manually.' + Math.round(bgTip);
        bgHelper = Math.round(bgTip);
    }
};

function calculateBb(){
    var helper = Math.round(totalCash.value * .015);
    if(bbCount.value == 3){
        var bbTip = (((((totalCash.value - helper)/serverCount.value)*.25)*2.5)/3)
        bbOutput.value = Math.round(bbTip);
        bbHelper = Math.round(bbTip) * 3;
    }else if (bbCount.value == 3.65){
        var bbTip = (((((totalCash.value - helper)/serverCount.value)*.25)*3)/3.65)
        bbHalfDay = Math.round(bbTip * .65);
        bbOutput.value = Math.round(bbTip) + "     65%: " + bbHalfDay;
        bbHelper = Math.round(bbTip)* 3 + bbHalfDay;
    }else if (bbCountCount.value >= 4){
        var bbTip = (((((totalCash.value - helper)/serverCount.value)*.25)*3)/4)
        bbOutput.value = 'Error: Computed with 4 busboys (*3 / 4). Please adjust manually' + Math.round(bbTip);
        bbHelper = Math.round(bbTip) * 4;
    }
};

function calculateServer(){
    if(isInteger(serverCount.value)){
        serverOutput.value = Math.floor((totalCash.value - bgHelper - bbHelper)/serverCount.value);
        serverHelper = Math.floor((totalCash.value - bgHelper - bbHelper)/serverCount.value) * serverCount.value; 
    }else{
        var traineePercentage = serverCount.value - Math.floor(serverCount.value);
        var seniorCash = Math.floor(((totalCash.value - bgHelper - bbHelper)/serverCount.value));
        var traineeCash = Math.round(seniorCash*traineePercentage);
        serverOutput.value = seniorCash + "      " + traineePercentage.toFixed(2) +"%: "+ traineeCash;
        serverHelper =(seniorCash * (Math.ceil(serverCount.value) - 1)) + traineeCash;
    }
};

function isInteger(number){
    if(number - Math.floor(number) != 0){
        return false;
    }return true;
}


function confirmValues(){
    bgTotal.value = bgHelper;
    bbTotal.value = bbHelper;
    serverTotal.value = serverHelper;
    piggyMoney();
    cashReturn.value = bgHelper + bbHelper;
    finalCalculation();
}

function piggyMoney(){
    piggy = (totalCash.value - bgHelper - bbHelper - serverHelper);
    remainingCash.value = piggy;
}

function finalCalculation(){
    var totalTest = serverHelper + bbHelper + bgHelper + piggy;
    if(totalTest == totalCash.value){
        finalLastConfirmation.value = " Leave $" + piggy + " for piggy and everything is correct!";
    }else{
        finalLastConfirmation.value = "; SOMETHING IS WRONG! Difference = " + totalCash.value - totalTest;
    }
}
