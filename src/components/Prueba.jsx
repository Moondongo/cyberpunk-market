import React from 'react' 

const Prueba = () => {
    return (
        <div className='prueba-container'>
            {
                [...Array(10)].map((e, i) => <p key={i} className='prueba-element'>{i+1}</p>)
            }
        </div>
    )
}


export default Prueba;