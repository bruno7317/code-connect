import style from './avatar.module.css'
import Image from "next/image"

export const Avatar = ({name, imgSrc}) => {
    return (
        <ul className={style.avatar}>
            <li><Image src={imgSrc} width={32} height={32} alt={`${name}'s Avatar`} /></li>
            <li>@{name}</li>
        </ul>
    )
}