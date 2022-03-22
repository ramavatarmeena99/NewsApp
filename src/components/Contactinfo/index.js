import React, { useEffect, useState } from "react";
import { getValueFromLocalStorage } from "../../utils/helper";

export default function Contactinfo() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchedNews = getValueFromLocalStorage("news");
    setNews(fetchedNews);
  }, []);

  return (
    <div>
      {news.map((n, index) => {
        return (
          <div key={index}>
            <h1>{n.title}</h1>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
