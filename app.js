let input = document.querySelector('#input');

let searchBtn = document.querySelector('#search');

let apiKey = '1332d882-03f6-4cc7-aeff-33decf8bb2ce'

let notFound = document.querySelector('.notfound');

let defBox = document.querySelector('.def')

let audioBox = document.querySelector('.audio')

let loading = document.querySelector('.loading')

searchBtn.addEventListener('click',function(e){
    e.preventDefault();
    

    //clear old data
    audioBox.innerHTML = '';

    notFound.innerText = '';

    defBox.innerText = '';

    //Get input data

    let word = input.value;


    //Call API to get data

    if (word===''){
        alert('Please enter any word')
        return;
    }
        
    getData(word)
    
})

async function getData(word) {
    loading.style.display='block'
    // Ajax Call
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    const data = await response.json();


    //if empty result
    if (!data.length){
        loading.style.display=none;
        notFound.innerText = 'No result found'
        return
    }
    // if result is suggestions

    if (typeof data[0] ==='string'){
        loading.style.display='none';
        let heading = document.createElement('h3')
        heading.innerText = 'Did you mean?'
        notFound.appendChild(heading);
        data.forEach(element => {
            let suggestion = document.createElement('span')
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            notFound.appendChild(suggestion);
        });
        return
    }

    //if reasult found
    loading.style.display='none';
    let defination = data[0].shortdef[0];
    defBox.innerText = defination;

    const soundName = data[0].hwi.prs[0].sound.audio;
        if (soundName){
            renderSound(soundName)
        }
}

function renderSound(soundName) {
    // https://media.merriam-webster.com/soundc11
    let subFolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subFolder}/${soundName}.wav?key=${apiKey}`

    let aud = document.createElement('audio');

    aud.src = soundSrc;
    aud.controls = true;

    audioBox.appendChild(aud);
}