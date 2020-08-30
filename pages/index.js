import fetch from 'isomorphic-fetch';
import Error from 'next/error';
import StoryList from '../components/storyList.js';
import Layout from '../components/Layout.js';
import Link from "next/link";

class Index extends React.Component{
    static async getInitialProps({req,res,query}){
        var data = [];
        var page = query.page ? Number(query.page) : 1;
        try{
            const response = await fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`);
            data = await response.json();
        }
        catch(err){
            data =[];
        }
        return ({stories:data,page:page});
    }
    componentDidMount() {
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker
            .register("/service-worker.js")
            .then(registration => {
              console.log("service worker registration successful", registration);
            })
            .catch(err => {
              console.warn("service worker registration failed", err.message);
            });
        }
      }
    render(){
        var {stories,page} = this.props;
        if(stories.length==0)
            return <Error statusCode={505} />
        else
        return(
            <Layout page={page}>
                         <StoryList stories={stories}/>
                         <Link  as="/" href={`/?page=${page+1}`}>
                         <a>
                              <span className="main-title">Go to Next Page {page+1}</span>
                         </a>
                     </Link>
            </Layout>

        )
    }
}

export default Index;