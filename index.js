/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

// Datos curiosos en español
const datosCuriososES = [
    "¿Sabías que la depresión puede afectar a personas de todas las edades y géneros?",
    "La depresión no siempre se manifiesta de la misma manera en todas las personas.",
    "La depresión es una de las principales causas de discapacidad en todo el mundo.",
    "La depresión puede tener síntomas físicos, como dolores de cabeza y problemas digestivos.",
    "El ejercicio regular puede ayudar a reducir los síntomas de la depresión.",
    "La terapia y la medicación pueden ser muy efectivas para tratar la depresión.",
    "La depresión puede estar relacionada con la genética.",
    "La depresión puede tener causas biológicas, psicológicas y sociales."
];

// Fun Facts in English
const funFactsEN = [
    "Did you know that depression can affect people of all ages and genders?",
    "Depression does not always manifest in the same way in everyone.",
    "Depression is one of the leading causes of disability worldwide.",
    "Depression can have physical symptoms such as headaches and digestive issues.",
    "Regular exercise can help reduce the symptoms of depression.",
    "Therapy and medication can be very effective in treating depression.",
    "Depression can be related to genetics.",
    "Depression can have biological, psychological, and social causes."
];

const getRandomFact = (locale) => {
    const isEnglish = locale.startsWith('en');
    const facts = isEnglish ? funFactsEN : datosCuriososES;
    const randomIndex = Math.floor(Math.random() * facts.length);
    return facts[randomIndex];
};

const FrasesIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest' && request.intent.name === 'FrasesIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const fact = getRandomFact(locale);
        
        return handlerInput.responseBuilder
            .speak(fact)
            .reprompt(fact)
            .getResponse();
    },
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const welcomeMessage = locale.startsWith('en') ? 
            "Welcome! Ask me for a fun fact about depression." : 
            "¡Bienvenido! Pídeme un dato curioso sobre la depresión.";
        
        return handlerInput.responseBuilder
            .speak(welcomeMessage)
            .reprompt(welcomeMessage)
            .getResponse();
    },
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const helpMessage = locale.startsWith('en') ? 
            "You can say, tell me a fun fact about depression." : 
            "Puedes decir, dime un dato curioso sobre la depresión.";
        
        return handlerInput.responseBuilder
            .speak(helpMessage)
            .reprompt(helpMessage)
            .getResponse();
    },
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
                handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const locale = handlerInput.requestEnvelope.request.locale;
        const goodbyeMessage = locale.startsWith('en') ? "Goodbye!" : "¡Adiós!";
        
        return handlerInput.responseBuilder
            .speak(goodbyeMessage)
            .getResponse();
    },
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);
        return handlerInput.responseBuilder.getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        const locale = handlerInput.requestEnvelope.request.locale;
        const errorMessage = locale.startsWith('en') ? 
            "Sorry, I couldn't understand the request. Please try again." : 
            "Lo siento, no pude entender la solicitud. Por favor, inténtalo de nuevo.";
        
        return handlerInput.responseBuilder
            .speak(errorMessage)
            .reprompt(errorMessage)
            .getResponse();
    },
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        FrasesIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
