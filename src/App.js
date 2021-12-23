import React, { useEffect, useState } from "react";
import wordsToNumbers from "words-to-numbers";
import { Typography } from "@material-ui/core";

import useStyles from './Styles'

import alanBtn from "@alan-ai/alan-sdk-web";

import NewsCards from "./components/NewsCards/NewsCards";

const alanKey =
  "ce34c400ff37bf4601f5cdc0b125eb882e956eca572e1d8b807a3e2338fdd0dc/stage";
const App = () => {
    const classes= useStyles()
  const [newsArticles, setNewsArticles] = useState([]);
    const [activeArticle, setActiveArticle] =useState(-1)
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        alanBtn({
          key: 'ce34c400ff37bf4601f5cdc0b125eb882e956eca572e1d8b807a3e2338fdd0dc/stage',
          onCommand: ({ command, articles, number }) => {
            if (command === 'newHeadlines') {
              setNewsArticles(articles);
              setActiveArticle(-1);
            } else if (command === 'instructions') {
              setIsOpen(true);
            } else if (command === 'highlight') {
              setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
            } else if (command === 'open') {
              const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
              const article = articles[parsedNumber - 1];
    
              if (parsedNumber > articles.length) {
                alanBtn().playText('Please try that again...');
              } else if (article) {
                window.open(article.url, '_blank');
                alanBtn().playText('Opening...');
              } else {
                alanBtn().playText('Please try that again...');
              }
            }
          },
        });
      }, []);
    
  return (
    <div>
      <div className={classes.logoContainer}>
      {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Open article number [4]</Typography></div>
            <div className={classes.card}><Typography variant="h5" component="h2">Try saying: <br /><br />Go back</Typography></div>
          </div>
        ) : null}
        <img src="https://46ba123xc93a357lc11tqhds-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt='alan logo'/>
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;
