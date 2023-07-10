import styles from "./searchBar.module.css";


function SearchBar({rowData, setRows, searched, setSearched}) {

  const requestSearch = (searchedVal: string) => {
    setSearched(searchedVal);
    
    const filteredRows = rowData.filter((row: any) => {
      return row.titleOfBook.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };


  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar_input_container}>
        <input
          placeholder="Search..."
          type="text"
          value={searched}
          onChange={(e) => requestSearch(e.target.value)}
        />
      </div>

      <div className={styles.searchBar_icon}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="11" cy="11" r="7" stroke="white" strokeWidth="2" />
          <path
            d="M20 20L17 17"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default SearchBar;
