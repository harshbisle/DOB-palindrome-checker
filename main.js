let inputDate = document.querySelector('#inputDate');
let form = document.querySelector('#form');

let happyDiv = document.querySelector('.happy-animation');
let sadDiv = document.querySelector('.sad-animation');
let loadingDiv = document.querySelector('.loading-animation');
let resultDiv = document.querySelector('#result');
let footerDiv = document.querySelector('footer');

let splitDate, dateArray, firstFormat, secondFormat, thirdFormat, showOutput;

let happyLottie = document.querySelector('#happy-lottie');
let sadLottie = document.querySelector('#sad-lottie');
let loadingLottie = document.querySelector('#loading-lottie');

const daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

sadDiv.style.display = 'none';
happyDiv.style.display = 'none';
loadingDiv.style.display = 'none';

form.addEventListener('submit', (e) => {
    e.preventDefault();

    resultDiv.innerText = '';
    result.style.margin = 'auto';

    dateArray = inputDate.value.split('-');

    year = dateArray[0].toString();
    month = dateArray[1].toString();
    date = dateArray[2].toString();

    showOutput = formats(date, month, year);

    sadDiv.style.display = 'none';
    happyDiv.style.display = 'none';
    resultDiv.style.display = 'none';

    loadingDiv.style.display = 'block';

    footerDiv.scrollIntoView({behavior: "smooth", bottom: 0});

    setTimeout(() => {
    
        loadingDiv.style.display = 'none';

        if(showOutput) {
            happyDiv.style.display = 'block';
            sadDiv.style.display = 'none';

            resultDiv.style.display = 'block';
            resultDiv.innerHTML = `Yayy! Your birthday is palindrome in the format <b>${showOutput}</b>.`;
            resultDiv.scrollIntoView({behavior: "smooth", bottom: 0});
        } else {

            paliArray = findNextPalindrome(inputDate.value);

            sadDiv.style.display = 'block';
            happyDiv.style.display = 'none';

            resultDiv.style.display = 'block';
            resultDiv.innerHTML = `OOPS! Your birthday is not a palindrome. The nearest palindrome is <b>${paliArray[0]}</b> and you missed it by <b>${paliArray[1]}</b> days.`;
            resultDiv.scrollIntoView({behavior: "smooth", bottom: 0});
        }
    }, 3500);
    
});

function formats(date, month, year) {

    if(date.length === 1) {
        date = '0' + date;
    }

    if(month.length === 1) {
        month = '0' + month;
    }

    firstFormat = year + month + date;
    secondFormat = month + date + year;
    thirdFormat = date + month + year;

    if(checkIfPalindrome(firstFormat)) {
        return (`${year}-${month}-${date}`);
    }
    else if(checkIfPalindrome(secondFormat)) {
        return (`${month}-${date}-${year}`);
    }
    else if(checkIfPalindrome(thirdFormat)) {
        return (`${date}-${month}-${year}`);
    } 
    else {
        return null;
    }
}

function checkIfPalindrome(format) {

    if(format.toString().split('').reverse().join('') === format) {
        return true;
    }
}

function findNextPalindrome(inputDate) {

    split = inputDate.split('-'); 

    nextDate = Number(split[2]); 
    nextMonth = Number(split[1]); 
    nextYear = Number(split[0]);

    prevDate = Number(split[2]); 
    prevMonth = Number(split[1]); 
    prevYear = Number(split[0]); 

    console.log(prevDate, prevMonth, prevYear, '==', nextDate, nextMonth, nextYear);

    daysElapsed = 0;

    while(true) {
        daysElapsed += 1;
        nextDate += 1;
        prevDate -= 1;

        if(nextDate > daysOfMonth[nextMonth - 1]) {
            nextDate = 1;
            nextMonth += 1;

            if(nextMonth > 12) {
                nextMonth = 1;
                nextYear += 1;

                if(nextYear > 9999) {
                    break;
                }
            }
        } 
                            
        if(prevDate < 1) {                             
            prevMonth -= 1;

            if(prevMonth < 1) {
                prevYear -= 1;

                if(prevYear < 1) {
                    return ['', ''];
                } else {
                    prevMonth = 12;
                    prevDate = daysOfMonth[prevMonth - 1];    
                }
            } else {
                prevDate = daysOfMonth[prevMonth - 1];
            }
        }

        console.log(prevDate, prevMonth, prevYear, '==', nextDate, nextMonth, nextYear);

        prevFormat = formats(prevDate.toString(), prevMonth.toString(), prevYear.toString());
        if(prevFormat) {
            return [prevFormat, daysElapsed];
        }

        nextFormat = formats(nextDate.toString(), nextMonth.toString(), nextYear.toString());
        if(nextFormat) {
            return [nextFormat, daysElapsed];
        }
    }
}
