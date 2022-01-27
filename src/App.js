import React, { useState , useRef, useCallback} from "react";
import useBookSearch from "./useBookSearch";

import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { books, hasMore, Loading, error } = useBookSearch(query, pageNumber);
  const observer = useRef();
  const lastBookElementReference = useCallback(node => {
    if(Loading) return ;
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting){
        setPageNumber(pageNumber => pageNumber +1)
      }
    })
    if(node) observer.current.observe(node)
  } , [Loading , hasMore])
  

  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1);
  }

  return (
    <React.Fragment>
      <input type='text' value = {query} onChange={handleSearch}></input>

      {books.map((book,index) => {
        if(books.length === index+1){
          return <div ref = {lastBookElementReference} key={book}>{books}</div>;
        }
        return <div key={book}>{books}</div>;
      })}

      <div>{Loading && '...Loading'}</div>
      <div>{error && 'Error'}</div>
    </React.Fragment>
  );
}

export default App;
