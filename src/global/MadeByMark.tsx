type MadeByMarkProps = {
    style: string,
}

export const MadeByMark : React.FC<MadeByMarkProps> = ({ style }) => {
    return <div className={style}>
        Made by László Kősasvári
    </div>
};