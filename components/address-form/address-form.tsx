import {Control, Controller, FieldValues } from "react-hook-form";
import styled from 'styled-components';
// @ts-ignore
import css from '@styled-system/css';
import { Checkbox, FormControl, FormControlLabel, InputLabel, Select, TextField } from '@mui/material';
import { FormattedPhone } from './formatted-phone';
import { FullLine, HalfLine, ThirdLine } from './address.style';

export const AddressForm = ({addressDescription, control, errors} : {addressDescription: any; control: any; errors: any}) => (
  <FormattedForm>
    {addressDescription.inputFormat.split('_').map((line: string, index: any) => (
      <span key={index}>
        {populateInputs(line, addressDescription.descriptions, control, errors)}
      </span>
    ))}
  </FormattedForm>
);

const wrap = (f: any, len: number): any => {
  if (len == 1)
    return <FullLine>{f}</FullLine>
  if (len == 2)
    return <HalfLine>{f}</HalfLine>
  if (len == 3)
    return <ThirdLine>{f}</ThirdLine>
}

const controlWrap = (f: any, x: any): any => (
  x.fieldType=='SELECT'?
    <FormControl variant="outlined" style={{width: '100%'}} fullWidth>
      <InputLabel>{x.label}</InputLabel>
      {f}
    </FormControl>:
    <>{f}</>
)

function render(x: any, field: any, errors: any) {
  switch (x.fieldType) {
    case 'TEXT':
      return (<>
        <TextField label={x.label} variant="outlined" size="small" placeholder={x.label} fullWidth {...field}
                   inputProps ={{maxLength: x.maxLength}}
                   {...errors[x.field]?.type === 'required' && {error: true, helperText: `${x.label} is required`}}
                   {...errors[x.field]?.type === 'minLength' && {error: true, helperText: `${x.label} must be at least ${x.minLength} letters`}}
                   {...errors[x.field]?.type === 'maxLength' && {error: true, helperText: `${x.label} must be shorter than ${x.maxLength} chars`}}
                     /*onChange={onChange}*//>
      </>)
    case 'SELECT':
      return (
        <Select native fullWidth {...field} label={x.label} size="small" variant="outlined" style={{maxHeight:'40px'}}
                {...errors[x.field]?.type === 'required' && {error: true, helperText: `${x.label} is required`}}

        >
          <option aria-label="None" value="" />
          {x.options.map((opt: { value: string, label: string }) =>
              <option key={opt.value} value={opt.value}>{opt.label}</option>
          )}
        </Select>
      )
    case 'MOBILE':
      const {ref, ...res} = field;
      return (
        <FormattedPhone {...res} x={x}/>
      )
    case 'CHECKBOX':
      return (
        <FormControlLabel control={<Checkbox defaultChecked name={x.field} />} label={x.label} {...field} />
      )
    default:
      return (<></>)
  }
}

function findDescription(p: string, descriptions: any | undefined): any {
  return descriptions.find((obj: { field: any; }) => {
    return obj.field === p
  })
}

function populateInputs(line: string, descriptions: any | undefined, control: any, errors: any) {
  let placeholders = line.match(/\{(.*?)\}/g);
  if (placeholders == null)
    return <></>;
  const len = placeholders.length;
  return <>
    {wrap(<>
      {placeholders.map((p) => {
        let x = findDescription(p.replace(/[{}]/g, ""), descriptions);
        if (x === undefined)
          return <></>
            ;
        return (
          <div key={p}>
            {controlWrap(<Controller render={({field}) => render(x, field, errors)}
                                     key={x.field}
                                     control={control}
                                     defaultValue=""
                                     name={x.field}
                                     rules={{required: x.required, minLength: x.minLength, maxLength: x.maxLength}}
            />, x)}
          </div>
        )
      })}
      </>, len)}
    </>;
}

export const FormattedForm = styled.div<any>(
  css({
    display: 'grid',
    width: '100%',
    gridColumnGap: '30px',
    gridRowGap: ['10px', '10px', '10px', '10px'],
    gridTemplateColumns: [
      'minmax(0, 1fr)',
      'minmax(0, 1fr)',
      'minmax(0, 1fr)',
      'minmax(0, 1fr)',
    ],
  })
);