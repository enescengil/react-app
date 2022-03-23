import React from 'react'
import '../styles/list.css'
import {useEffect , useState} from 'react'
import axios from 'axios'
import AlienStar from '../pictures/alien-star.png'
import Fill from '../pictures/fill.png'
import Regular from '../pictures/regular.png'

function getLocalData (){
    const storedValues = localStorage.getItem('favorites')
    if(!storedValues) return([]);
    return JSON.parse(storedValues)
}


export default function List() {
    const [coins , setCoins] = useState([])
    const [search , setSearch] = useState('')
    const [fav , setFav] = useState(getLocalData)
    const [page , setPage] = useState(false)
    console.log(fav)
    useEffect(() => {
        axios
        .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false')
        .then(res => setCoins(res.data))
    },[])
    useEffect(() => {
        localStorage.setItem('favorites' , JSON.stringify(fav))
      },[fav])

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

  return (
    <div className="list-container">
        <div className="input-wrapper">
            <input className='searchBtn' type="text" onChange={handleChange} placeholder='Search'/>
            {page === true
            ?<div style={{display: 'flex'}}>
                <p className='fav-title'>Favorite Coins</p>
                <img style={{height: '45px'}} src={AlienStar} alt="" />
            </div>
            :<p className='fav-title'>All Market</p>
            }
            {page === true
            ?<button className='favBtn' onClick={() => setPage(false)}>BACK ALL</button>
            :<button className='favBtn'onClick={() => setPage(true)}>FAVORITES</button>
            }
            
            
        </div>
        <div className="list-wrapper">
            <table className="values">  
            <tr>
                <th style={{width: '30px'}}></th>
                <th>Rank</th>    
                <th style={{width : "25%"}}>Name</th>    
                <th style={{width: "25%"}}>24h%</th>
                <th style={{width: "20%"}}>Price</th>    
                <th>Market Cap</th>    
            </tr> 
            {!page === true
            ?coins.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase())).map(coin => {
                return(
                    <tr>
                        <td>
                            {fav.map(favData => favData.name).includes(coin.name)
                            ?<div className='fav'>
                                <img alt='star' className='star' onClick={() => setFav([...fav.filter(item => item.name !== coin.name)])} src={Fill} width="20"/>
                            </div>
                            :<div className='fav'>
                                <img alt='star' className='star' onClick={() => setFav([...fav , coin])} src={Regular} width="20"/>
                            </div>
                            }
                            
                        </td>
                        <td>{coin.market_cap_rank}</td>
                        <td className='name-td'><div className='name-wrapper'><img src={coin.image} alt="" className='symbol' style={{width: '30px'}}/>{coin.name}</div></td>
                        {coin.price_change_percentage_24h < 0
                        ?<td style={{color: "#E53935"}}>{coin.price_change_percentage_24h.toLocaleString()}%</td>
                        :<td style={{color: "#00BB78"}}>+{coin.price_change_percentage_24h.toLocaleString()}%</td>
                        }
                        <td>${coin.current_price}</td>
                        <td>${coin.market_cap.toLocaleString()}</td>
                    </tr>
                )
            })
            :fav.filter(coin => coin.name.toLowerCase().includes(search.toLowerCase())).map(coin => {
                return(
                    <tr>
                        <td>
                            {fav.map(favData => favData.name).includes(coin.name)
                            ?<div className='fav'>
                                <img alt='star' className='star' onClick={() => setFav([...fav.filter(item => item.name !== coin.name)])} src={Fill} width="20"/>
                            </div>
                            :<div className='fav'>
                                <img alt='star' className='star' onClick={() => setFav([...fav , coin])} src={Regular} width="20"/>
                            </div>
                            }
                            
                        </td>
                        <td>{coin.market_cap_rank}</td>
                        <td className='name-td'><div className='name-wrapper'><img src={coin.image} alt=""  className='symbol' style={{width: '30px'}}/>{coin.name}</div></td>
                        {coin.price_change_percentage_24h < 0
                        ?<td style={{color: "#E53935"}}>{coin.price_change_percentage_24h.toLocaleString()}</td>
                        :<td style={{color: "#00BB78"}}>+{coin.price_change_percentage_24h.toLocaleString()}</td>
                        }
                        <td>${coin.current_price}</td>
                        <td>${coin.market_cap.toLocaleString()}</td>
                    </tr>
                )
            })
            }
            
            
            </table>
        </div>
    </div>
  )
}
