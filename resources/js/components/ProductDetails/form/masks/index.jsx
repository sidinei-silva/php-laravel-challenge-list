import React from 'react';
import NumberFormat from 'react-number-format';


function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            placeholder="€ "
            allowNegative={false}
            thousandSeparator="."
            decimalSeparator=","
            isNumericString
            decimalScale={2}
            fixedDecimalScale
            prefix="€ "
        />
    );
}



export {
    NumberFormatCustom,
};
