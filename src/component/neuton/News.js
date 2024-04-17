import React, { useEffect, useState } from "react";
import "./news.css";

const News = () => {
  const [mynews, setMynews] = useState([]);
  const [pagenumber, setPagenumber] = useState(1);

  const fetchData = async (page) => {
    let response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=2bb25ba3ab474a23884f8bd2d1b70413&page=${page}`
    );
    let data = await response.json();
    setMynews((prevNews) => [...prevNews, ...data.articles]);
  };
  const handleLoadMore = () => {
    setPagenumber((prevPageNumber) => prevPageNumber + 1);
  };

  useEffect(() => {
    fetchData();
  }, [pagenumber]);

  return (
    <>
      <div className="maindiv">
        {mynews.map((element, index) => {
          console.log(element);
          return (
            <>
              <div
                key={index}
                className="card"
                style={{
                  marginTop: "2rem",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
              >
                <img
                  src={
                    element.urlToImage === null
                      ? "https://cdn.theathletic.com/app/uploads/2024/04/15194545/GettyImages-2148763333-1-scaled.jpg"
                      : element.urlToImage
                  }
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">
                    {element.author === ""
                      ? "Pravrajya Suruchi"
                      : element.author}
                  </h5>
                  <p className="card-text">{element.title}</p>
                  <a
                    href={element.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </>
          );
        })}
      </div>
      {mynews.length > 0 && (
        <button
          onClick={handleLoadMore}
          style={{
            backgroundColor: "blue",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "0.25rem",
            cursor: "pointer",
            marginTop: "1rem",
          }}
        >
          Next Page
        </button>
      )}
    </>
  );
};

export default News;
