
export const Loader = ({className}) => {
    return (

            <div className={`loader ${className} absolute inset-0 scale-50 z-[800]`}>
                <div className={'loader__body'}>
                </div>
            </div>

    )
}