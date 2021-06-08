import './SearchBar.css';

export default function SearchBar(props) {
  const { search, setSearch, handleSearch } = props;

  const searchTasks = (e) => {
    setSearch(e.target.value);
    handleSearch(e.target.value);
  }

  return (
    <div className="searchContainer">
      <h2><i className="fas fa-search searchIcon"></i></h2>
      <input
        type="text"
        id="searchBar"
        placeholder="Search Tasks"
        autoComplete="off" 
        value={search}
        onChange={searchTasks}
      />
    </div>
  );
}
