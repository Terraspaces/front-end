import type { NextPage } from "next";

interface CardHeaderProps {
    farmData: any
}

const CardHeader: NextPage<CardHeaderProps> = ({
    farmData
}) => {
    return (
        <div className="d-flex align-items-center mt-20">
            <img className="mr-10 farms-card-img" src={"assets/icons/" + farmData + ".png"} alt="Near" width={45} height={45} loading="lazy" />
            <h5 className='mr-5 letter-space-1 t-20 farm-header'>{farmData.slice(0, farmData.lastIndexOf('.near'))}</h5>
            <img src="assets/img/icons/verified.svg" alt="verified" width={24} height={24} />
        </div>
    )
}

export default CardHeader