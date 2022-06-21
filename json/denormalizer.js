
var fs = require('fs');

const paragraphs = require('./Paragraphs.json')
const works = require('./Works.json')
const characters = require('./Characters.json')
const chapters = require('./Chapters.json')

console.log('Starting.')

/**
 * Group array items by key.
 * 
 * @param {*} arr Array of items.
 * @param {*} key Key to group by.
 * @returns 
 */
const groupBy = function(arr, key) {
    return arr.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

/**
 * Get max value in the array of numbers.
 * 
 * @param {*} arr Array of number
 * @returns 
 */
const max = (arr) => Math.max.apply(Math, arr)

const chaptersByWorkID = groupBy(chapters, 'WorkID')

/**
 * Add character name and work title to paragraphs.
 */
const denormalizedParagraphs = paragraphs.map(paragraph => {
    const character = characters.find(character => character.CharID === paragraph.CharID)
    const work = works.find(work => work.WorkID === paragraph.WorkID)
    
    return {
        ...paragraph,
        "CharName": character.CharName,
        "WorkTitle": work.Title
    }
})

/**
 * Add work titles to characters.
 */
const denormalizedCharacters = characters.map(character => {
    // some characters appear in more than one work, especially the histories.    
    const characterWorkIds = character.Works.split(',')

    const characterWorks = works.filter(work => {
        return characterWorkIds.includes(work.WorkID)
    })
    
    return {
        ...character,
        "WorkTitles": characterWorks.map(work => work.Title).toString()
    }
})

/**
 * Add chapter and section counts.
 */
const denormalizedWorks = works.map(work => {
    // Get work chapters
    const workChapters = chaptersByWorkID[work.WorkID]
    workChapters.map(chapter => chapter.Section)

    // Get the highest section and chapter numbers, which represent the count    
    const SectionCount = max(workChapters.map(chapter => chapter.Section))
    const ChapterCount = max(workChapters.map(chapter => chapter.Chapter))

    console.log('SectionCount', SectionCount, 'ChapterCount', ChapterCount)
    
    return {
        ...work,
        "SectionCount": SectionCount,
        "ChapterCount": ChapterCount
    }
})

console.log('Total character documents:', denormalizedCharacters.length)
console.log('Total paragraph documents:', denormalizedParagraphs.length)
console.log('Total work documents:', denormalizedWorks.length)

fs.writeFile('./CharactersDenormalized.json', JSON.stringify(denormalizedCharacters), 'utf8', () => {
    console.log('Done Characters.')
});
fs.writeFile('./ParagraphsDenormalized.json', JSON.stringify(denormalizedParagraphs), 'utf8', () => {
    console.log('Done Paragraphs.')
});
fs.writeFile('./WorksDenormalized.json', JSON.stringify(denormalizedWorks), 'utf8', () => {
    console.log('Done Works.')
});