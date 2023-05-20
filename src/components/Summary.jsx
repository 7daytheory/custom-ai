import React from 'react'

import { useState, useEffect } from 'react'

import {copy, linkIcon, loader, tick} from '../assets'

const Demo = () => {
    //Setting State
    const [article, setArticle] = useState({
        url: '',
        summary: ''
    })

    //Submit
    const handleSubmit = async (e) => {
        alert("Submitted!");
    }

  return (
    <section className="mt-16 w-full max-w-xl">
        {/* Search */}
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

            {/* Browser URL History */}

        </div>

        {/* Display Results */}
    </section>
  )
}

export default Demo