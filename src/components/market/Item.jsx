import React, { useEffect } from 'react' 


const Item = ({ ico, name, alteration, value}) => {
    const price = String(value.current ? value.current : value.initial).split('').map(Number)
    const bronce = price.pop();
    const silver = price.length > 0 ? price.pop() : 0;
    const gold = price.length > 0 ? Number(price.join("").toString()) : 0;

    return (
        <>
            <div className={
                alteration > 0 
                    ? "item-container"
                    : alteration === 0
                            ? "item-container neutral"
                            : "item-container low"
            } >
                <div className="item-edge"></div>
                <div className="item-outside">
                    <div className="item-inside">
                        <div className="item_icon"><i className={`fa-${ico.name} fa-${ico.family} fa-${ico.style}`}/></div>
                        <p className="item_name">{name}</p>
                        <div className="item_value">
                            <p className="item_value-percent">{value.current ? `${alteration.toFixed(2)}%` : 'NEW'}</p>
                            <div className="item_value-price">
                                <p className="gold">{gold}</p>
                                <p className="silver">{silver}</p>
                                <p className="bronce">{bronce}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Item;