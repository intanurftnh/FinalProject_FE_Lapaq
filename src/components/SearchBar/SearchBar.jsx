import { Link } from 'react-router-dom';

const SearchBar = () => {
    return (
        <div className="form-search search-input">
            <nav className="navbar">
                <div className="container-fluid form-search">
                    <Link to={'/homepage/search'} className='text-decoration-none'>
                        <form className="container-fluid">
                            <div className="input-group wrap-input">
                                <span className="input-group-text" id="basic-addon1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                                </span>
                                <input name="search" type="text" className="form-control" placeholder="Search" aria-label="Search" id="search" aria-describedby="basic-addon1" style={{ width: '70%' }}/>
                            </div>
                        </form>
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default SearchBar;