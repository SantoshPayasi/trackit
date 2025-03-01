import React from 'react'

type Props = {
    name: string;
    ButtonComponent?: any;
    isSmallText?: string
}
const Header = ({ name, ButtonComponent, isSmallText }: Props) => {
    return (
        <div className='mb-5 flex w-full items-center justify-between'>
            <h1 className={`${isSmallText ? "text-sm" : "text-2xl"} font-semibold dark:text-white`}>
                {name}
            </h1>
            {
                ButtonComponent && (
                    ButtonComponent
                )
            }
        </div>
    )
}

export default Header
