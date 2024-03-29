import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react';
import { WalletContext } from "../contexts/wallet"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SearchBox } from './SearchBox';
import { useFetchByOwnerId } from '../state/hooks';

const Header: NextPage = () => {
    const router = useRouter()
    const { wallet, signIn, signOut } = useContext(WalletContext)
    const [isSearchBox, setIsSearchBox] = useState<boolean>(true)
    const onWallet = async () => {
        if (wallet?.isSignedIn()) {
            signOut();
        } else {
            signIn();
        }
    }
    const stakedPerUser = useFetchByOwnerId(wallet?.account().accountId as string, ["terraspaces.near"])
    return (
        <header id="header" className="hedaer-abs">
            <div className="header-area">
                <nav className="navbar navbar-expand-md">
                    <div className="container">
                        <a className="navbar-brand logo" href="">
                            <img src="assets/img/logo/logo.png" alt="logo" loading="lazy" />
                        </a>
                        <div>
                            {isSearchBox && <SearchBox />}
                        </div>
                        <div className="d-flex align-items-center mobile-icon-wrapper">
                            <div className="d-block login-b ">
                                <button className="cmn-btn" onClick={onWallet}>
                                    {
                                        !wallet?.isSignedIn() ?
                                            <span> Wallet</span>
                                            :
                                            <span> {wallet.getAccountId()}</span>
                                    }
                                    <img src="assets/img/icons/Wallet1.svg" alt="wallet" />
                                </button>
                            </div>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <i className="fas fa-bars"></i>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link href="/">
                                        <a className={`nav-link ${router.pathname == "/" ? "active" : ""}`} onClick={() => setIsSearchBox(false)}>Overview</a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/stake">
                                        <a className={`nav-link ${router.pathname == "/stake" ? "active" : ""}`} onClick={() => setIsSearchBox(false)}>Stake</a>
                                    </Link>
                                </li>
                                {/* {stakedPerUser[0] > 0 && ( */}
                                <li className="nav-item">
                                    <Link href="/dashboard">
                                        <a className={`nav-link ${router.pathname == "/dashboard" ? "active" : ""}`} onClick={() => setIsSearchBox(true)}>Dashboard</a>
                                    </Link>
                                </li>
                                {/* )} */}
                                <li className="nav-item">
                                    <Link href="/drops">
                                        <a className={`nav-link ${router.pathname == "/drops" ? "active" : ""}`} onClick={() => setIsSearchBox(false)}>Drops</a>
                                    </Link>
                                </li>
                                <button className="cmn-btn mobile-wallet" onClick={onWallet}>
                                    {
                                        !wallet?.isSignedIn() ?
                                            <span> Wallet</span>
                                            :
                                            <span> {wallet.getAccountId()}</span>
                                    }
                                    <img src="assets/img/icons/Wallet1.svg" alt="wallet" />
                                </button>
                            </ul>
                        </div>

                        <div className="mobile-icon  ms-auto d-none">
                            <button className="cmn-btn" onClick={onWallet}>
                                {
                                    !wallet?.isSignedIn() ?
                                        <span> Wallet</span>
                                        :
                                        <span> {wallet.getAccountId()}</span>
                                }
                                <img src="assets/img/icons/Wallet1.svg" alt="wallet" />
                            </button>
                        </div>

                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header
