import React, { useEffect, useState } from "react";
import Style from "./index.module.css";
import axios from "axios";
import {
  getValueFromLocalStorage,
  setValueInLocalStorage,
} from "../../utils/helper";
// const API_KEY = "be5da7a94fe24338b61d7f24681163a5";
const API_KEY = "f40871c376724063bc7a17674dbbd985";

export default function NewsPage() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("everything");
  const [news, setNews] = useState([]);
  const [error, setError] = useState();
  const [selectedLang, setSelectedLang] = useState("en");
  // const [totalNews, setTotalNews] = useState();
  const saveNews = (e) => {
    setSearch(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.keyCode === 13) {
      fetchNews(true);
    }
  };

  const changeLanguage = (lang) => {
    setSelectedLang(lang);
  };

  const fetchNews = (searchQueryAction) => {
    if (searchQueryAction === true) {
      axios({
        method: "GET",
        url: `https://newsapi.org/v2/everything?q=${search}&language=${selectedLang}&apiKey=${API_KEY}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          // Storing values in local storage - permanently
          setValueInLocalStorage("news", res.data.articles);

          // Storing values in temporary state
          setNews(res.data.articles);

          if (!res.data.articles.length === 0) {
            // setTotalNews(res.data.error);
          }

          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);

          setError(err.response.data.message);

          setTimeout(() => {
            setError("");
          }, 3000);
        });
    } else {
      setLoading(true);
      // Checking value local storage me exist karti hai ya nahi
      const fetchNewsFromLocalStorage = getValueFromLocalStorage("news");
      // agar karti hai toh if condition true hogi
      if (fetchNewsFromLocalStorage !== null) {
        // yaha yeh dekh rahe hai ki jo news wala array local storage me save kar rakha hai uski lenght kya hai
        // 0 hai ka matlb khali array hai matlb koi news nahi hai
        // aur gara 0 nahi hai matlb news hai
        if (fetchNewsFromLocalStorage.length !== 0) {
          // agar news local storage me hai toh hum local storage waale news array ko component waali news state me save kar denge
          setNews(fetchNewsFromLocalStorage);
          setLoading(false);
          return;
        }
      }

      axios({
        method: "GET",
        url: `https://newsapi.org/v2/everything?q=${search}&language=${selectedLang}&apiKey=${API_KEY}`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => {
          // Storing values in local storage - permanently
          setValueInLocalStorage("news", res.data.articles);

          // Storing values in temporary state
          setNews(res.data.articles);

          if (!res.data.articles.length === 0) {
            // setTotalNews(res.data.error);
          }

          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);

          setError(err.response.data.message);

          setTimeout(() => {
            setError("");
          }, 3000);
        });
    }
  };
  const myLang = [
    {
      language: "English",
      lang: "en",
    },
    {
      language: "हिंदी",
      lang: "hi",
    },
    {
      language: "ਪੰਜਾਬੀ",
      lang: "pa",
    },
    {
      language: "मराठी",
      lang: "mr",
    },
  ];

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",
          }}
        >
          <h1>LOADING NEWS ...</h1>
        </div>
      ) : (
        <div>
          <div className={Style.container}>
            <div className={Style.newsLogo}>
              <p>Daily News</p>
            </div>
            <div className={Style.searchNews}>
              <input onChange={saveNews} onKeyDown={onKeyPress} />
              <button onClick={() => fetchNews(true)}>Search News</button>
            </div>
            <div className={Style.languages}>
              {myLang.map((item, index) => {
                const isSelected = selectedLang === item.lang;
                return (
                  <React.Fragment key={index}>
                    <p
                      style={{ display: isSelected && "none" }}
                      className={Style.language}
                      onClick={() => changeLanguage(item.lang)}
                    >
                      {item.language}
                    </p>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <div className={Style.newsColumn}>
            {news.map((item, index) => {
              return (
                <div key={index} className={Style.items}>
                  <div className={Style.imgTag}>
                    <img src={item.urlToImage} alt={item.title} />
                  </div>
                  <div className={Style.discription}>
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                  </div>
                </div>
              );
            })}
            <h1>{error}</h1>
          </div>
        </div>
      )}
    </>
  );
}
