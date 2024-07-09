import { useGlobalContext } from "./context";

const SearchForm = () => {
  const { setSearchValue } = useGlobalContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    if (!searchValue) {
      return;
    }

    setSearchValue(searchValue);
    e.target.elements.search.value = "";
  };
  return (
    <section>
      <h1 className="title">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-input search-input"
            placeholder="cat"
            name="search"
          />
          <button type="submit" className="btn">
            Search
          </button>
        </form>
      </h1>
    </section>
  );
};
export default SearchForm;
