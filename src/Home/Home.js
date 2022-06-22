import React, { useState, useEffect } from 'react'
import logo from '../img/logo.png'
import '../Home/Home.css'
function Home() {
    let temp = true;

    const [value, setValue] = useState("")
    const [dataa, setDataa] = useState([])
    // const inputRef = useRef(null);
    const [inp, setInp] = useState("randomValue")
    if (value === "") {
        temp = false;
    }

    // fetch data from api
    useEffect(() => {
        fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=15&prop=extracts|pageimages&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&origin=*&gsrsearch=${value}`)
            .then(res => res.json())
            .then(d => {
                // console.log('clear',value,d)
                setDataa(Object.entries(d.query.pages))
                // console.log(Object.entries(d.query.pages)[0][1].extract)
            }
            )
    }, [value]);

    const showicon = () => {
        console.log('hi')
        // let close = document.querySelector('.button-form').value;
        let input = document.querySelector('.input-form').value;
        let header = document.querySelector('.header');
        // console.log(header.classList)

        if (input.length === 0) {
            // console.log(input.length)
            header.classList.remove("active")
        }
        else {
            header.classList.add("active")
        }

        document.querySelector('.button-form').addEventListener('click', () => {
            document.querySelector('.input-form').value = "";
            header.classList.remove("active")
            // console.log(header.classList)
        })
    }



    if (temp === false && inp!=="") {
        // console.log(temp,inp)
        return (
            <>
            <div className='home-body'>
                <div className='layer-one'>
                    <div>
                        <a href='/'>
                            <img className='home-logo' src={logo} alt='wikipedia logo'></img>
                        </a>
                    </div>
                    <div className='description'>
                        <h1>WikipediA</h1>
                        <p>The Free Encyclopedia</p>
                    </div>
                </div>
                <div className='layer-two'>
                    <form>
                        <div>
                            <input
                                type="text" class="form-control"
                                value={value}
                                onChange={(e) => {
                                    setValue(e.target.value)
                                    showicon()
                                }} />
                        </div>
                    </form>
                </div>
                <div className='layer-three'>
                    <a href='https://en.wikipedia.org/wiki/Special:Random'>
                        Random
                    </a>
                </div>
            </div>
            <div className='ribbon-body'>
                <div className='ribbon'>
                    <a href='https://github.com/Ankit27Agg/buy-properly'>See Source Code</a>
                </div>
            </div>
            </>
        )
    }
    else if(temp===true || inp==="") {
        return (
            <>
                <div className='header'>
                    <div className='sub-header'>
                        <div>
                            <a href='/'>
                                <img className='result-logo' src={logo} alt='wikipedia logo'></img>
                            </a>
                        </div>
                        <form>
                            <div>
                                <input
                                    className='input-form'
                                    type="text"
                                    value={value}
                                    onChange={(e) => {
                                        setValue(e.target.value)
                                        showicon()
                                        setInp(e.target.value)
                                    }}
                                    autoFocus
                                />
                                <div className='button-form'>
                                    <button><span class="fa fa-times fa-2x"></span></button>

                                </div>

                            </div>
                        </form>
                        <div className='random'>
                            <a href='https://en.wikipedia.org/wiki/Special:Random'>
                                <i class="fa fa-random"></i>
                            </a>
                        </div>

                    </div>
                </div>
                <div className='block'>
                    {/* {console.log(dataa)} */}
                    {
                        dataa.map(d => {
                            console.log(d)
                            const link = d[1];
                            console.log(link)
                            return (
                                <>
                                <div className='b'>
                                    <div class="card blocks">
                                        <a  href={`https://en.wikipedia.org/?curid=${link.pageid}`} class="card-body">
                                            <h3 class="card-title">{d[1].title}</h3>
                                            <p class="card-text">{d[1].extract}</p>
                                            
                                        </a>
                                    </div>
                                    </div>
                                </>
                            )
                        }
                        )}
                </div>
                <div className='ribbon-body'>
                <div className='ribbon'>
                    <a href='https://github.com/Ankit27Agg/buy-properly'>See Source Code</a>
                </div>
            </div>
            </>
        )

    }




}

export default Home