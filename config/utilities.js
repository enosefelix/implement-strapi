async function calculateReadingTime(content, wordsPerMinute = 200) {
    const cleanedContent = content.replace(/\s+/g, ' ').trim();

    // Calculate word count
    const wordCount = cleanedContent.split(' ').length;

    // Assuming an average reading speed of 200 words per minute
    const minutes = Number(Math.ceil(wordCount / wordsPerMinute));

    return minutes <= 1 ? `${minutes} minute read` : `${minutes} minutes read`;
}

module.exports = {calculateReadingTime}