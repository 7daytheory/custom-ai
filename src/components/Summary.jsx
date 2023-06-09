import React from 'react'

import { useState, useEffect } from 'react'

import {copy, linkIcon, loader, tick} from '../assets'

import { useLazyGetSummaryQuery } from '../services/article'

const Summary = () => {

    //Setting State
    const [article, setArticle] = useState({
        url: '',
        summary: ''
    })

    const [allArticles, setAllArticles] = useState([]);
    const [copied, setCopied] = useState("");
    
    const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery();

    useEffect(() => {
        const localStorageArticles = JSON.parse(
            localStorage.getItem('articles')
        )

        if(localStorageArticles) {
            setAllArticles(localStorageArticles)
        }
    }, []);

    //Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data } = await getSummary({ articleUrl: article.url })

        if(data?.summary) {
            const newArticle = { ...article, summary: data.summary};

            let duplicateArticle = false;

            allArticles.map(item => {
              if(item.url === newArticle.url) {
                duplicateArticle = true;
              }
            })

            if(duplicateArticle) {
              localStorage.setItem('articles', JSON.stringify(allArticles))

              setAllArticles(allArticles);
              setArticle(newArticle);
            } else {
              const updateAllArticles = [newArticle, ...allArticles];

              localStorage.setItem('articles', JSON.stringify(updateAllArticles))

              setAllArticles(updateAllArticles);
              setArticle(newArticle);
            }
        }
    }

    //Clear Storage - Improve upon later
   const handleClear = () => {
      localStorage.removeItem('articles');
      location.reload();
    }

    //Copy Content
    const handleCopy = (copyUrl) => {
        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        setTimeout(() => setCopied(false), 3000);
      };
    
      
      const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
          handleSubmit(e);
        }
      };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="mt-0 flex justify-end">
            <button
            onClick={handleClear}
            className="mb-2 bg-white hover:bg-gray-100 text-gray-700 font-semibold py-1 px-2 border border-gray-400 rounded">
              Clear all
             </button>
        </div>
        <div className="flex flex-col w-full gap-2">
            <form
                className="relative flex justify-center items-center"
                onSubmit={handleSubmit}
            >
                <img 
                    src={linkIcon}
                    className="absolute left-0 ml-3 w-5 my-2"
                />
                <input
                    type="url"
                    placeholder="Enter a URL"
                    value={article.url}
                    onChange={(e) => setArticle({
                        ...article, url: e.target.value
                    })}
                    required
                    className="url_input peer"
                />
                <button
                    type="submit"
                    className="submit_btn
                    peer-focus:border-gray-700
                    peer-focus:text-gray-700"
                >
                ➔
                </button>
            </form>

            <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">               
            {allArticles.reverse().map((item, index) => (
                    <div
                        key={`link-${index}`}
                        onClick={() => setArticle(item)}
                        className="link_card"
                    >
                        <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                            <img
                            src={copied === item.url ? tick : copy}
                            alt={copied === item.url ? "tick_icon" : "copy_icon"}
                            className='w-[40%] h-[40%] object-contain'
                            />
                        </div>
                        <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                        {item.url}
                    </p>
                    </div>
                ))}
            </div>
            </div>

            <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            There was an error, please try again.
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                Article <span className='blue_gradient'>Summary</span>
              </h2>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700'>
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
        </div>
    </section>
  )
}

export default Summary