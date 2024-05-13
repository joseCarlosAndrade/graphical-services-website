import React from 'react'
import './userscrollable.css';

interface UserScrollableProps {
    className: string
    search: string
    onChange?: (...args: any) => any
}


function UserScrollable({ className, search, onChange = () => { } }: UserScrollableProps) {
    let exampleList = [
        "Shogo Shima", "Gabriel Barbosa", "Thiago Zero", "Lázaro Vinaud", "Rafael Mansur", "Arthur Ernesto de Carvalho"
    ]
    return (
        <>
            <div className={className}>
                <input className="scrollableSearchBar" type="text" placeholder="search names" value={search} onChange={e => { onChange(e) }} ></input>
                <div className="scrollableList">
                    <ul className="scrollableList--container">
                        {exampleList.map(name => {
                            return (
                                <li className="scrollableList--item">{name}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default UserScrollable