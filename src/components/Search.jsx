import "../styles/Search.scss";
import {useState } from "react";
import md5 from "md5";
import Characters from "./Characters";
import Comics from "./Comics";

export default function Search() {
    const [characterName, setCharacterName] = useState(null);
    const [characterData, setCharacterData] = useState(null);
    const [comicData, setComicData] = useState(null);

    const publicKey = import.meta.env.VITE_PUBLIC_KEY;
    const privateKey = import.meta.env.VITE_PRIVATE_KEY;


    const handleSubmit = (event) => {
        event.preventDefault();

        getCharacterData();
    };

    const getCharacterData = () => {
        setCharacterData(null);
        setComicData(null);

        const timeStamp = new Date().getTime();
        const hash = generateHash(timeStamp);

        const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&hash=${hash}&ts=${timeStamp}&nameStartsWith=${characterName}&limit=100`;

        fetch(url).then((response) => response.json()).then((result) => {
                setCharacterData(result.data);
            })

                .catch((error) => 
            {console.log("There was an error:", error);
        });
    };


    const getComicData = (characterId) => {
        window.scrollTo({ top: 0, left:0 });

        const timeStamp = new Date().getTime();
        const hash = generateHash(timeStamp);

        const url = `http://gateway.marvel.com:443/v1/public/characters/${characterId}/comics?apikey=${publicKey}&hash=${hash}&ts=$(timeStamp)`;

        fetch(url).then((response) => response.json()).then((results) => {
            setComicData(results.data);
            console.log(results)
        }).catch(error => {
            console.log("Error while fetching comic", error)
        });

    };

    const generateHash = (timeStamp) => {
        return md5(timeStamp + privateKey + publicKey);
    };

    const handleChange = (event) => {
        setCharacterName(event.target.value);
    };
    
    const handleRest = () => {
        //ToDo impalment Later// 
    };

    return (
    
    <>

    <form className="search" onSubmit={handleSubmit}>
    
    <input placeholder="ENTER CHARACTER NAME" 
    type="text" 
    onChange={handleChange}
    />
    <div className="buttons">
        <button type="submit">Get character data </button>
        <button type="reset" className="rest" onClick={handleRest}>
            Reset
            </button>
    </div>
    </form>

    {!comicData && characterData && characterData.results[0] && (
        <Characters data={characterData.results} onClick={getComicData} />
    
    )}

     {comicData && comicData.results[0] && <Comics data={comicData.results}/>}      
    </>
    );
}