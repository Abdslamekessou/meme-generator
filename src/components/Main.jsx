import React, { useEffect, useState } from "react"
export default function Main() {

    const [meme , setMeme] = useState({
        topText: "One does not simply" ,
        bottomText :"Walk into Mordor" ,
        imageUrl : "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes ,setAllMemes] = useState([])

    useEffect(() => {

        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))

    },[])

    function generateNewMeme(){
        const randomIndex = Math.floor(Math.random() *allMemes.length) //explain how this line works and give example
        const randomMeme = allMemes[randomIndex]
        setMeme(prevMeme => ({
            ...prevMeme , imageUrl : randomMeme.url
        }))
    }

    function handleChange(e){
        const {name , value} = e.target;

        setMeme(prevMeme =>({
            ...prevMeme ,
            [name] : value
        }))

    }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        onChange={handleChange}
                    />
                </label>
                <button onClick={generateNewMeme}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}