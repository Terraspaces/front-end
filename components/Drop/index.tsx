import { useEffect, useState, useContext } from 'react';
import type { NextPage } from 'next';
import moment from 'moment';

import { Icon } from '@iconify/react';
import DropCard from './DropCard';
import { Container, UpcomingContent, CardContent, ButtonGroup, Button, MobileButtonGroup } from "./styles";

import { WalletContext } from '../../contexts/wallet';

import { drop_get, drop_like, drop_unlike } from '../../utils/api/terraspace_api';

const Drop: NextPage = () => {
    const { wallet } = useContext(WalletContext)

    const [drops, setDrops] = useState<any[]>([])
    const [isOnFilter, setIsOnFilter] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            let drops = await drop_get();
            drops = drops.map((x: any) => {
                return {
                    ...x,
                    mint_date: x.mint_date ? moment(x.mint_date).format('DD MMM YYYY') : 'TBA',
                    mint_time: x.mint_date ? moment(x.mint_date).format('HH:SS') : 'TBA'
                }
            })
            setDrops(drops)
        })()
    })

    const handleFav = async (drop_name: string) => {
        await drop_like({ drop_name, account_id: wallet?.account().accountId || '' })
        const clone = [...drops];
        const drop_index = clone.findIndex((x: any) => x.name === name);
        if (drop_index > -1) {
            clone[drop_index].likes.push(wallet?.account().accountId);
            setDrops(clone);
        }
    };


    const handleUnFav = async (drop_name: string) => {
        await drop_unlike({ drop_name, account_id: wallet?.account().accountId || '' })
        const clone = [...drops];
        const drop_index = clone.findIndex((x: any) => x.name === name);
        if (drop_index > -1) {
            clone[drop_index].likes.pop();
            setDrops(clone);
        }
    }

    const filterFav = () => {
        setIsOnFilter(!isOnFilter)
    }

    const getList = async () => {
        const updateData = await drop_get()
        setDrops(updateData)
    }

    return (
        <Container>
            <div className="vector-abs">
                <img src="assets/img/vector/Vector.png" alt="Vector" loading="lazy" />
            </div>
            <UpcomingContent>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <h1 className='mr-20 upcoming-text'>Upcoming Drops</h1>
                        <ButtonGroup>
                            <Button active={!isOnFilter} onClick={() => filterFav()}>Upcoming</Button>
                            <Button active={isOnFilter} onClick={() => filterFav()}><Icon icon="ant-design:star-filled" width="20" height="20" />Favorites</Button>
                        </ButtonGroup>
                    </div>
                    <button className="cmn-btn-1 f-18 radius-12 list-btn" onClick={() => getList()}>
                        <span>Get Listed</span>
                    </button>
                </div>
                <MobileButtonGroup>
                    <Button active={!isOnFilter} onClick={() => filterFav()}>Upcoming</Button>
                    <Button active={isOnFilter} onClick={() => filterFav()}><Icon icon="ant-design:star-filled" width="20" height="20" />Favorites</Button>
                </MobileButtonGroup>
                <CardContent>
                    {!isOnFilter ? (drops).map((drop: any, index: number) => (
                        <DropCard
                            key={index}
                            dropData={drop}
                            handleFav={handleFav}
                            handleUnFav={handleUnFav}
                        />
                    )) : (drops).filter((drop) => drop.likes.includes(wallet?.account().accountId)).map((drop: any, index: number) => (
                        <DropCard
                            key={index}
                            dropData={drop}
                            handleFav={handleFav}
                            handleUnFav={handleUnFav}
                        />
                    ))
                    }
                </CardContent>
            </UpcomingContent>
        </Container >
    )
}

export default Drop