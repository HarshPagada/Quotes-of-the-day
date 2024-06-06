// import { data } from 'autoprefixer';
import React, { useState, useEffect } from 'react'

const Quotes = ({ search }) => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = process.env.API_URL;

  useEffect(() => {
    const fetchQuotes = async () => {
      setLoading(true);

      try {
        const url = apiUrl;
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        setQuotes(data.quotes);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message || 'An error occurred while fetching data.');
        setLoading(false)
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes()

  }, []);

  const filteredArray = quotes.filter((data) => {
    const searchString = `${data.author}`.toLowerCase();
    return searchString.includes(search.toLowerCase());
  });

  const SkeletonLoader = () => (
    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-10 lg:px-8 w-[80%] border-2 border-blue-950 rounded-md my-5 animate-pulse">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <figure className="mt-10">
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <div className="h-6 bg-gray-300 rounded mb-2"></div>
            <div className="h-6 bg-gray-300 rounded mb-2"></div>
            <div className="h-6 bg-gray-300 rounded mb-2"></div>
          </blockquote>
          <figcaption className="mt-10">
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div className="h-6 w-24 bg-gray-300 rounded"></div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );

  return (
    <div className='flex flex-col items-center'>
      <lord-icon
        src="https://cdn.lordicon.com/ternnbni.json"
        trigger="hover"
        onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        style={{ "width": "50px", "height": "50px", 'position': 'fixed', 'bottom': '9%', 'left': '83%', 'zIndex': '100' }}>
      </lord-icon>

      {error && <h3 className='text-red-500 font-bold text-4xl m-11 text-center'>Error: {error}</h3>}
      {loading ? (
        <SkeletonLoader />
      ) : (
        filteredArray.length > 0 ? (
          filteredArray.map((item, index) => (
            <section key={index} className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-10 lg:px-8 w-[80%] border-2 border-blue-950 rounded-md my-5">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
              <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
              <div className="mx-auto max-w-2xl lg:max-w-4xl">
                <figure className="mt-10">
                  <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                    <p>
                      {item.quote}
                    </p>
                  </blockquote>
                  <figcaption className="mt-10">
                    <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                      <div className="font-semibold text-gray-900">{item.author}</div>
                    </div>
                  </figcaption>
                </figure>
              </div>
            </section>
          ))
        ) : (
          <h3 className='text-red-400 font-bold text-4xl m-11 text-center'>No quotes found</h3>
        ))
      }
    </div>
  )
}


export default Quotes
