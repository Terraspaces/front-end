import type { NextPage } from "next";

interface CardDetailThirdProps {
    totalSupply: any;
}

const CardDetailThird: NextPage<CardDetailThirdProps> = ({
    totalSupply,
}) => {
    return (
        <>
            <div className='d-flex justify-content-between mt-20'>
                <h6>Total Supply</h6>
                <h6>Staking Cap</h6>
            </div>
            <div className='d-flex justify-content-between mt-1'>
                <h6 className='t-20'>{totalSupply}</h6>
                <h6 className='t-20'>{totalSupply}</h6>
            </div>
        </>
    )
}

export default CardDetailThird