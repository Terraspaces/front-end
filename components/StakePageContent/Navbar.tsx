import type { NextPage } from "next";
import {useState, useEffect} from 'react'
interface NavbarProps {
    setOverview: any
}

const Navbar: NextPage<NavbarProps> = ({ setOverview }) => {
    const [storage, setStorage] = useState(localStorage.getItem('isFarms'))
    const [navState, setNavState] = useState('Owned')
    useEffect(() => {
        if(storage === 'yes'){
            setNavState('Farms');
            localStorage.removeItem('isFarms');
        } else {
            setNavState('Owned');
        }
    }, [storage])

    return (
        <div className="navs-area">
            <ul className="nav nav-pills mt-60" id="pills-tab" role="tablist">
                <li className="nav-item col-3" role="presentation">
                    {navState !== 'Owned' ? (
                        <button className="t-20 nav-link" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="false" onClick={() => setOverview(0)}>Owned</button>
                    ) : (
                        <button className="t-20 nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" onClick={() => setOverview(0)}>Owned</button>
                    )}
                </li>
                <li className="nav-item col-3" role="presentation">
                    <button className="nav-link t-20" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={() => setOverview(1)}>Staked</button>
                </li>
                <li className="nav-item col-3" role="presentation">
                    {navState !== 'Owned' ? (
                        <button className="t-20 nav-link active" id="pills-farms-tab" data-bs-toggle="pill" data-bs-target="#pills-farms" type="button" role="tab" aria-controls="pills-farms" aria-selected="true" onClick={() => setOverview(3)}>Farms</button>
                    ) : (
                        <button className="t-20 nav-link" id="pills-farms-tab" data-bs-toggle="pill" data-bs-target="#pills-farms" type="button" role="tab" aria-controls="pills-farms" aria-selected="false" onClick={() => setOverview(3)}>Farms</button>
                    )}
                </li>
                <li className="nav-item col-3" role="presentation">
                    <button className="nav-link t-20" id="pills-referrals-tab" data-bs-toggle="pill" data-bs-target="#pills-referrals" type="button" role="tab" aria-controls="pills-referrals" aria-selected="false" onClick={() => setOverview(2)}>Referrals</button>
                </li>
            </ul>
        </div>
    )
}

export default Navbar