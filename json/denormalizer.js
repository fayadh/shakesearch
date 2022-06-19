
var fs = require('fs');

const paragraphs = require('./Paragraphs.json')
const works = require('./Works.json')
const characters = require('./Characters.json')

console.log('Starting.')

const denormalized = paragraphs.map(paragraph => {
    const character = characters.find(character => character.CharID === paragraph.CharID)
    const work = works.find(work => work.WorkID === paragraph.WorkID)
    
    return {
        ...paragraph,
        "CharName": character.CharName,
        "WorkTitle": work.Title
    }
})

console.log('Total documents:', denormalized.length)

fs.writeFile('./ParagraphsDenormalized.json', JSON.stringify(denormalized), 'utf8', () => {
    console.log('Done.')
});