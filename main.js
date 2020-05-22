const synthesis = window.speechSynthesis;
const text  = document.querySelector('#text-input');
const form = document.querySelector('.speakform');
const voiceSelect  = document.querySelector('#voice-select');


let voices = [];

const getVoices = ()=>
{
    voices= synthesis.getVoices();
    voices.forEach(voice => {
       const option = document.createElement('option');
       option.textContent = voice.name + '(' + voice.lang + ')';

       option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);
        voiceSelect.appendChild(option);
    });
};

const speak = ()=>
{
    if (synthesis.speaking)
    {
        console.log('already speaking');
    }
    if (text.value !== '')
    {
        const speechText = new SpeechSynthesisUtterance(text.value);
        speechText.onend = e =>
        {
            console.log('done speaking');
        }
        speechText.onerror = e =>
        {
            console.log('an error occured');
        }
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
        voices.forEach(voice => {
            if (voice.name === selectedVoice)
            {
                speechText.voice = voice;
            }
        });
        synthesis.speak(speechText);
    }
};

form.addEventListener('submit', e =>
{
    e.preventDefault();
    speak();
    text.blur();
});



//getVoices();

if (synthesis.onvoiceschanged !== undefined)
{
    synthesis.onvoiceschanged = getVoices;
}











