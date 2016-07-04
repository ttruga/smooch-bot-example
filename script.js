'use strict';

const Script = require('smooch-bot').Script;
const scriptRules = require('./script.json');

module.exports = new Script({
    processing: {
        prompt: (bot) => bot.say('Beep boop...'),
        receive: () => 'procesando....'
    },

    start: {
        receive: (bot) => {
            return bot.say('Hola! mi nombre es Mandubot, estoy aqui para ayudarte ;) ')
                .then(() => 'askName');
        }
    },

    askName: {
        prompt: (bot) => bot.say('Cual es tu nombre?'),
        receive: (bot, message) => {
            const name = message.text;
            return bot.setProp('name', name)
                .then(() => bot.say(`Super! desde ahora te llamare ${name}
Esta bien? %[Si](postback:yes) %[No](postback:no)`))
                .then(() => 'askQuestion');
        }
    },
    askQuestion: {
        prompt: (bot) => bot.say('Ahora en que te puedo ayudar?'),
        receive: (bot, message) => {
			const question = message.text;
			return bot.setProp('question', question)
                .then((question) => bot.say(`Acabas de preguntarme que ${question}`))
                .then(() => 'finish');
        }
    },

    finish: {
        receive: (bot, message) => {
            return bot.getProp('name')
                .then((name) => bot.say(`Disculpame ${name}, pero no he aprendido a decir nada mas`))
                .then(() => 'finish');
        }
    }
});
