import axios from "axios";
import { useEffect, useState } from "react";

function useBookSearch(query, pageNumber) {
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [books, setBooks] = useState([]);
  const [hasmore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel;
    axios({
      method: "GET",
      url: "https://openlibrary.org/search.json",
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => {
        cancel = c;
      }),
    })
      .then((res) => {
        setBooks((prevBook) => {
          return [...prevBook, res.data.docs.map((b) => b.title)];
        });
        console.log(res.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
    return () => cancel();
  }, [query, pageNumber]);

  return null;
}

export default useBookSearch;
