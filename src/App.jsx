import {useEffect, useState} from 'react';
import './App.css'
import '@vscode/codicons/dist/codicon.css';
import Search from "./component/Search.jsx";

function App() {

    const [showSearch, setShowSearch] = useState(false)


    const closeShow = (e) => {
        if(e.target.id !== 'serch-area'){
            setShowSearch(false)
        }
    }

    useEffect(() => {
        document.addEventListener("click", closeShow)

        return () => {
            document.removeEventListener("click", closeShow);
        };
    }, []);



  return (
      <div>

          <div className='mainDiv'>
              <button
                  style={showSearch ? {background: '#646cff', color: 'azure'} : undefined}
                  onClick={() => setShowSearch(prev => !prev)}
                  className='divSearch'
                  id='serch-area'>
                  <i className="codicon codicon-search" id='serch-area'></i>
                  <span id='serch-area'>
                      SEARCH
                  </span>
              </button>

              {showSearch && <Search />}
          </div>

      </div>
  )
}

export default App
