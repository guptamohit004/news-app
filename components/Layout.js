import Link from "next/link";
import Head from "next/head";
import Router from "next/router";

export default ({ children,page,title,backButton }) => (
        <div className="root">
        <Head>
            <title>Hacker News {title}</title>
            <meta name="description" content="Hacker News Clone" />
        </Head>
        <div className="container">
        <nav>
        {backButton && (
            <span onClick={() => Router.back()} className="back-button">
              &#x2b05;
            </span>
          )}
           <Link href="/">
                <a>
                     <span className="main-title">
                        { page>0 ? `Hacker Next (Page Number:${page})` :`${title}` }
                     </span>
                </a>
            </Link>
        </nav>
             {children}
        </div>
        </div>
);
