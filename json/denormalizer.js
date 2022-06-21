
var fs = require('fs');

const paragraphs = require('./Paragraphs.json')
const works = require('./Works.json')
const characters = require('./Characters.json')

console.log('Starting.')

const denormalizedParagraphs = paragraphs.map(paragraph => {
    const character = characters.find(character => character.CharID === paragraph.CharID)
    const work = works.find(work => work.WorkID === paragraph.WorkID)
    
    return {
        ...paragraph,
        "CharName": character.CharName,
        "WorkTitle": work.Title
    }
})

const denormalizedCharacters = characters.map(character => {
    // some characters appear in more than one work, especially the histories.    
    const characterWorkIds = character.Works.split(',')

    const characterWorks = works.filter(work => {
        return characterWorkIds.includes(work.WorkID)
    })

    if(characterWorks.length > 1) {
        console.log('Found!', characterWorks)
    }
    
    return {
        ...character,
        "WorkTitles": characterWorks.map(work => work.Title).toString()
    }
})

console.log('Total character documents:', denormalizedCharacters.length)
console.log('Total paragraph documents:', denormalizedParagraphs.length)

fs.writeFile('./CharactersDenormalized.json', JSON.stringify(denormalizedCharacters), 'utf8', () => {
    console.log('Done Characters.')
});
fs.writeFile('./ParagraphsDenormalized.json', JSON.stringify(denormalizedParagraphs), 'utf8', () => {
    console.log('Done Paragraphs.')
});