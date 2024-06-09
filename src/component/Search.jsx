import s from './search.module.css';
import {useEffect, useState} from "react";
import { data } from '../api/coins.js'



function Search() {

    const [gotCoins, setGotCoins] = useState([])
    const [currentCoins, setCurrentCoins] = useState([])
    const [favorites, setFavorites] = useState([])
    const [currentTab, setCurrentTab] = useState('all')

    useEffect(() => {
        setGotCoins(data)
        setCurrentCoins(data)
    }, []);

    useEffect(() => {
        const localeFav = JSON.parse(localStorage.getItem('favorites'))
        if(localeFav){
            setFavorites(localeFav)
        }
    }, []);

    const filter = (e) => {
        let inputEnter = e.target.value
        let currentFav = JSON.parse(localStorage.getItem('favorites'))

        if (inputEnter !== '') {
            let newArr = gotCoins.filter(t => t.toLowerCase().includes(inputEnter.toLowerCase()));
            setCurrentCoins(newArr)
        } else {
            setCurrentCoins(gotCoins)
        }

        if (inputEnter !== '') {
            let newArr = favorites.filter(t => t.toLowerCase().includes(inputEnter.toLowerCase()));
            setFavorites(newArr)
        } else {
            setFavorites(currentFav)
        }
    }

    const setFavorite = (item) => {
        let oldFavorites = [...favorites];
        if(oldFavorites.includes(item)){
            console.log('includes')
        } else {
            oldFavorites.push(item)
            setFavorites(oldFavorites)
        }
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }

    const deleteFav = (itemDel) => {
        const newFavorites = favorites.filter(item => item !== itemDel);
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }


    return (
        <div className={s.mainDiv} id='serch-area'>

            <div className={s.divInput} id='serch-area'>
                <i className="codicon codicon-search" id='serch-area'></i>
                <input
                    type='search'
                    placeholder='search...'
                    id='serch-area'
                    onChange={filter}
                    autoFocus={true}
                />
            </div>

            <div className={s.favoriteDiv} id='serch-area'>
                <div
                    className={s.tab}
                    onClick={() => setCurrentTab('favorites')}
                    id='serch-area'
                    style={currentTab === 'favorites' ? {fontWeight: 900} : undefined}>
                    <i className="codicon codicon-star-full" id='serch-area'></i>
                    favorites
                </div>
                <div
                    className={s.tab}
                    onClick={() => setCurrentTab('all')}
                    id='serch-area'
                    style={currentTab === 'all' ? {fontWeight: 900} : undefined}>
                    all coins
                </div>
            </div>

            <div className={s.dropList} id='serch-area'>
                {
                    currentTab === 'all' && currentCoins.map((item, index) => {
                        return (
                            <div
                                className={s.itemFav}
                                key={index}
                                id='serch-area'
                                onClick={() => setFavorite(item)}>
                                {
                                    favorites.includes(item)
                                        ? <i className="codicon codicon-star-full" id='serch-area'></i>
                                        :<i className="codicon codicon-star-empty" id='serch-area'></i>
                                }
                                {item}
                            </div>
                        )
                    })
                }
                {
                    currentTab === 'favorites' && favorites.map((item, index) => {
                        return (
                            <div key={index} id='serch-area' className={s.itemFav}>
                                <i className="codicon codicon-star-full" id='serch-area'></i>
                                {item}
                                <i
                                    onClick={() => deleteFav(item)}
                                    className="codicon codicon-chrome-close closeIcon"
                                    id='serch-area'></i>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
}

export default Search;