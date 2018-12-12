// This is the Link API
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import SearchForm from '../components/SearchForm';

const source = 'The-Irish-Times';


const apiKey = '99f935099a94407bbedab4dfd43419a2';





async function getNews(url){
  try{
    const res = await fetch(url);
    const data = await res.json();

    return(data);

  } catch(data) {
    return (error);
  }

}

export default class News extends React.Component {

constructor(props) {
  super(props)
  this.state = {
    newsSource: "",
    url: "",
    articles: []
  }
}

setNewsSource = (input) => {
  this.setState({
    newsSource : input,
    url : `https://newsapi.org/v2/top-headlines?sources=${input}&apiKey=${apiKey}`
  })

}

searchNewsAPI = (event) => {
  this.setState({
    newsSource: `${event.target.innerText}`,
    url: `https://newsapi.org/v2/${event.target.name}&apiKey=${apiKey}`
  })
  console.log(this.state.url);
}

  render(){
    if(this.state.articles.length == 0)
      {
        this.state.articles = this.props.articles;
      } 

      return (
        <div>
          <SearchForm setNewsSource={this.setNewsSource}/>

          <ul className="newsMenu">
            <li><a href ="#" onClick={this.searchNewsAPI} name ="top-headlines?country=ie">Top Headlines Ireland</a></li>
            <li><a href ="#" onClick={this.searchNewsAPI} name ="top-headlines?country=ie&category=business">Business News Ireland</a></li>
            <li><a href ="#" onClick={this.searchNewsAPI} name ="everything?q=technology">Technology News</a></li>
            <li><a href ="#" onClick={this.searchNewsAPI} name ="top-headlines?country=ie&category=weather">Weather in Ireland</a></li>

          
          
          </ul>
        <h3>{this.state.newsSource.split("-").join(" ")}</h3>
        <div>       

          {this.state.articles.map((article, index) => (
            <section key = {index}>
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

          .newsMenu {
            display: flex;
            flex-direction: row;
            margin: 0;
            padding: 0;
            margin-top: 20px;
          }

          .newsMenu li {
            display: inline-table;
            padding-left: 20px;
          }
          
          .newsMenu li a {
            font-size: 1em;
            color: blue;
            display: block;
            text-decoration: none;

          }

          .newsMenu li a:hover {
            color: rgb(255, 187, 0);
            text-decoration: underline;
          }
        `}</style>

        </div>

      );
      
  }

  static async getInitialProps(response) {
    const initUrl = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`;

    const data = await getNews(initUrl);

    if(Array.isArray(data.articles)){
      return {
        articles: data.articles

      }
    }

    else {
      console.error(data)
      if(response){
        response.statusCode = 400
        response.end(data.message);
      }

    }
  }

  async componentDidUpdate(prevProps, prevState){

    if(this.state.url !== prevState.url){
      const data = await getNews(this.state.url);

      if(Array.isArray(data.articles)) {
        this.state.articles = data.articles;
        this.setState(this.state);
      }

      else {
        console.error(data)
        if(response) {
          response.statusCode = 400
          response.end(data.message);
        }
      }
    }
  }

}

