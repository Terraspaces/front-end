import type { NextPage } from 'next';
import moment from 'moment';
import { useEffect, useState, useContext } from 'react';
import { Icon } from '@iconify/react';
import { Container, ToggleContent, UpcomingContent, MobileToggle, CardContent, ButtonGroup, Button, MobileButtonGroup } from "./styles";
import { getDropData } from '../../utils/paraApi';
import { WalletContext } from '../../contexts/wallet';
import DropCard from './DropCard';

const Drop: NextPage = () => {
    const { wallet } = useContext(WalletContext)

    const [dropDatas, setDropDatas] = useState<any[]>([])
    const [isFilter, setIsFilter] = useState<boolean>(false)

    useEffect(() => {
        (async () => {
            let dropData = await getDropData();
            dropData = dropData.map((x: any) => {
                return {
                    ...x,
                    mint_date: x.mint_date ? moment(x.mint_date).format('DD MMM YYYY') : 'TBA',
                    mint_time: x.mint_date ? moment(x.mint_date).format('HH:SS') : 'TBA'
                }
            })
            setDropDatas(dropData)
        })()
    })

    const handleFav = async (name: string) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ drop_name: name, account_id: wallet?.account().accountId })
        }
        await fetch('https://dev-api.terraspaces.io/drops/like', requestOptions)

        // await getDropData()
        const clone = [...dropDatas];
        const drop_index = clone.findIndex((x: any) => x.name === name);
        if (drop_index > -1) {
            clone[drop_index].likes.push(wallet?.account().accountId);
            setDropDatas(clone);
        }
    };


    const handleUnFav = async (name: string) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ drop_name: name, account_id: wallet?.account().accountId })
        }
        await fetch('https://dev-api.terraspaces.io/drops/unlike', requestOptions)

        // await getDropData()
        const clone = [...dropDatas];
        const drop_index = clone.findIndex((x: any) => x.name === name);
        if (drop_index > -1) {
            clone[drop_index].likes.pop();
            setDropDatas(clone);
        }
    }

    function isFilterFunc(value: any) {
        return value.likes.includes(wallet?.account().accountId)
    }

    const filterFav = () => {
        setIsFilter(!isFilter)
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
                            <Button active={!isFilter} onClick={() => filterFav()}>Upcoming</Button>
                            <Button active={isFilter} onClick={() => filterFav()}><Icon icon="ant-design:star-filled" width="20" height="20" />Favorites</Button>
                        </ButtonGroup>
                    </div>
                    <button className="cmn-btn-1 f-18 radius-12 list-btn">
                        <span>Get Listed</span>
                    </button>
                </div>
                <MobileButtonGroup>
                    <Button active={!isFilter} onClick={() => filterFav()}>Upcoming</Button>
                    <Button active={isFilter} onClick={() => filterFav()}><Icon icon="ant-design:star-filled" width="20" height="20" />Favorites</Button>
                </MobileButtonGroup>
                <CardContent>
                    {!isFilter ? (dropDatas as any).map((dropData: any, index: number) => (
                        <DropCard
                            key={index}
                            index={index}
                            dropData={dropData}
                            handleFav={handleFav}
                            handleUnFav={handleUnFav}
                        />
                    )) : (dropDatas as any).filter(isFilterFunc).map((dropData: any, index: number) => (
                        <DropCard
                            key={index}
                            index={index}
                            dropData={dropData}
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