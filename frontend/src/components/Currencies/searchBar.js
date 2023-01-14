import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ currencies, setSearchResults }) => {

  const handleSubmit = (e) => e.preventDefault();

  const handleSearchChange = (e) => {
    if (!e.target.value) return setSearchResults(currencies);

    const resultsArray = currencies.filter(
      (currency) =>
        (Array.from(currency.c_name)).includes(e.target.value) ||
        (Array.from(currency.code)).includes(e.target.value) ||
        (Array.from(currency.mid)).includes(e.target.value) ||
        (Array.from(currency.date)).includes(e.target.value)
    );

    setSearchResults(resultsArray);
  };

  return (
    <header className="searchBarHeader">
      <form className="search" onSubmit={handleSubmit}>
        <input
          className="search__input"
          type="text"
          id="search"
          onChange={handleSearchChange}
        />
        <button className="search__button">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
