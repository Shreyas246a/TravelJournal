import React, { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../useFetch";
import { AuthContext } from '../authContext';
import '../styles/home.css';
import Card from '../components/Card';

const Home = () => { 
    const [query, setQuery] = useState(""); 
    const [startDate, setStartDate] = useState("");  // State for start date
    const [endDate, setEndDate] = useState("");  // State for end date
    const { user } = useContext(AuthContext); 
    const { data, loading, error } = useFetch(
        `http://localhost:5500/api/entries/author/${user._id}`
    );

    const keys = ["title", "location", "date"]; 

    const search = (data) => { 
        return data
            .filter((item) => {
                // Filter by query text
                const matchesQuery = keys.some((key) => 
                    item[key] && item[key].toLowerCase().includes(query.toLowerCase())
                );
                // Filter by date range
                const itemDate = new Date(item.date);
                const matchesDateRange = (!startDate || itemDate >= new Date(startDate)) &&
                                         (!endDate || itemDate <= new Date(endDate));

                return matchesQuery && matchesDateRange;
            });
    };

    return ( 
        <div> 
            <Navbar /> 
            <div className="search"> 
                <div className="searchBar"> 
                    <h2>Explore</h2> 
                    <div className="searchInput"> 
                        <input 
                            type="text"
                            placeholder="Search places or dates"
                            onChange={(e) => setQuery(e.target.value)} 
                        /> 
                        <FontAwesomeIcon 
                            className="icon"
                            icon={faMagnifyingGlass} 
                        /> 
                    </div> 
                    <div className="dateFilter"> 
                        Search by date:<input 
                            type="date"
                            placeholder="Start Date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)} 
                        /> 
                        <input 
                            type="date"
                            placeholder="End Date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)} 
                        /> 
                        <button onClick={() => { setStartDate(""); setEndDate(""); }}>Clear Date Filter</button>  {/* Clear Date Filter Button */}
                    </div>
                </div> 
            </div> 

            <div className="searchedPosts"> 
                {loading ? ( 
                    <div className="p" style={{ color: "white", fontFamily: "'Kaushan Script', cursive" }}> 
                        Loading... 
                    </div> 
                ) : error ? (
                    <div className="p" style={{ color: "red", fontFamily: "'Kaushan Script', cursive" }}> 
                        Something went wrong. Please try again later.
                    </div>
                ) : ( 
                    <> 
                          
                        {search(data).map((item) => (  
                            <Card 
                                key={item._id}  
                                _id={item._id} 
                                photos={item.photos} 
                                title={item.title} 
                                date={item.date} 
                                location={item.location} 
                                text={item.text} 
                            /> 
                        ))}
                    </>
                )} 
            </div> 
        </div> 
    ); 
};

export default Home;
