import classNames from 'classnames';
import React, { FC } from 'react';

type PokeButtonProps = {
    onClick: (props: any) => any;
    disabled?: boolean;
};

const PokeButton: FC<PokeButtonProps> = ({
    onClick,
    children,
    disabled = false,
}) => {
    return (
        <button
            className={classNames('poke-button', { '--disabled': disabled })}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default PokeButton;
