
const api = 'https://type.fit/api/quotes';
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const newquote = document.getElementById("newquote")
const tweetme = document.getElementById("tweetme")

let theQuote = "";

const getNewQuotes = () => {
    let rnum = Math.floor(Math.random() * 1500);
    console.log(realData[rnum].author)
    console.log(realData[rnum].text)
    quote.innerText = `" ${realData[rnum].text} "`;
    theQuote = realData[rnum].text;
    author.innerText = `By ${realData[rnum].author}`;
    if (realData[rnum].author == null)
        author.innerText = `By Unknown`;

};

let realData = "";
const getQuotes = async () => {
    try {
        let data = await fetch(api)
        realData = await data.json();
        // console.log(realData[0].text);
        // console.log(realData[0].author);
        getNewQuotes();
    } catch (error) { }
};
getQuotes();

const tweetnow = () => {
    let tweetPost = `https://twitter.com/intent/tweet?text=${theQuote}`;
    window.open(tweetPost);
}

newquote.addEventListener('click', getNewQuotes);
tweetme.addEventListener('click', tweetnow);


