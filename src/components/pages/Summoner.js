import React, { useContext } from 'react';
import SummonerContext from '../../context/summoner/summonerContext';
import SummonerItem from '../summoner/SummonerItem';
import Spinner from '../layout/Spinner';
import Error from '../layout/Error';
import SearchBar from '../summoner/SearchBar';
import Match from '../summoner/Match';

const Summoner = () => {
    const summonerContext = useContext(SummonerContext);

    const uuid4 = require('uuid4');

    const {
        summonerQueues,
        summonerDetails,
        summonerMatches,
        loading
    } = summonerContext;

    if (loading) {
        return (
            <>
                <SearchBar />
                <Spinner />
            </>
        );
    } else if (Object.keys(summonerDetails).length === 0) {
        return (
            <>
                <SearchBar />
                <Error />
            </>
        );
    } else {
        return (
            <>
                <SearchBar />
                <div className='summoner-details'>
                    <div className='summoner-icon'>
                        <img
                            src={`https://opgg-static.akamaized.net/images/profile_icons/profileIcon${summonerDetails.profileIconId}.jpg?image=q_auto&v=1518361200`}
                            alt=''
                        />
                    </div>
                    <div className='summoner-info'>
                        <span className='summoner-name'>
                            {summonerDetails.name}
                        </span>{' '}
                        <br />{' '}
                        <span className='summoner-level'>
                            Level {summonerDetails.summonerLevel}
                        </span>
                    </div>
                </div>

                <div className='summoner-container'>
                    {summonerQueues.map(queue => (
                        <SummonerItem key={uuid4()} queue={queue} />
                    ))}
                </div>
                <div className='matches-container'>
                    {summonerMatches.map(match => (
                        <Match key={uuid4()} match={match} />
                    ))}
                </div>
            </>
        );
    }
};

export default Summoner;
