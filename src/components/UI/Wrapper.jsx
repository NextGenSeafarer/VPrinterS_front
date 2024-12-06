export const Wrapper = ({children}) => {
    return (
        <>

            <div className={'scrollbar-hide'}>
                {children}
            </div>
        </>
    )
}