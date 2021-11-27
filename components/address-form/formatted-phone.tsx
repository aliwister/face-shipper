import startsWith from 'lodash.startswith';
import loadable from '@loadable/component';
import { useState } from 'react';
const PhoneInput = loadable(() => import('react-phone-input-2'));
import parsePhoneNumber from 'libphonenumber-js/mobile'


export const FormattedPhone = ({x, value, onChange}) => {
    return (
        <PhoneInput
            type='text'
            country={'om'}
            value={value}
            onChange={onChange}
            onlyCountries={['om']}
            masks={{om: '....-....'}}
            copyNumbersOnly={true}
            containerStyle={{direction: 'ltr'}}
            inputStyle={{width: '100%', height: '40px', paddingRight: '48px'}}
            style={{margin: '0px'}}
            countryCodeEditable={false}
            isValid={(value: string, country: { iso2: any; }) => {
                //console.log(value, country, x, value.length );
                if (value.length < x.minLength)
                    return false;
                const phoneNumber = parsePhoneNumber(value, country.iso2.toUpperCase( ));
                //console.log(phoneNumber);
                if(phoneNumber) {
                    //console.log(phoneNumber, phoneNumber.isValid(), phoneNumber.getType(), phoneNumber.isPossible());
                    return phoneNumber.isValid() && phoneNumber.getType() === 'MOBILE'
                }
            }}
            defaultErrorMessage="Invalid Phone number"
        />)
};