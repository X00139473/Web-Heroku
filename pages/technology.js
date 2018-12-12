// This is the Link API
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';


const source = 'Engadget';


const apiKey = '99f935099a94407bbedab4dfd43419a2';


const url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`;
var map = Array.prototype.map;

// Pass this content as 'props' to child components
const Technology = props => (
    <div>
        <h2>News from {source.split("-").join(" ")}</h2>
        <div>       

          {props.articles.map(article => (
            <section>
              <h3>{article.title}</h3>
              <p className = "author">{article.author} {article.publishedAt}</p>
              <img src={article.urlToImage} alt = "article image" className = "img-article"></img>
              <p>{article.description}</p>
              <p>{article.content}</p>
              <p><Link href={`${article.url}`}>Read More</Link></p>
            </section>
          ))}
        </div>

        <style jsx>{`
          section {
            width :50%;
            border: 1px solid gray;
            background-color: rgb(237, 204, 158);
            padding: 1em;
            margin: 1em;
          }

          .author {
            font-style: italic;
            font-size: 0.8em;
          }
          .img-article {
            max-width: 50%;
          }
          
        `}</style>
    </div>
  );


Technology.getInitialProps = async function() {
  const res = await fetch(url);


  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.articles.length}`);

  return {
    articles: data.articles
  }

}
  
export default Technology;
