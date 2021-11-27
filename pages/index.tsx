import Layout from '../components/Layout'
import {Autocomplete, Box, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TestForm } from "../components/test-form/test-form";
import {AddressForm} from "../components/address-form/address-form";
import {ADDRESS_DESCRIPTION} from "../graphql/address-description.query";

import { request } from 'graphql-request';

const Home = ({addressDescription}) => {
  const [alignment, setAlignment] = useState('exp');
  const { register, handleSubmit, control, formState: { errors } } = useForm();

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const onSubmit = data => {
    console.log(data);
    return false;
  }

  return (
      <Layout>
        <h1>
          Ship with Badals.com
        </h1>
        <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
        >
          <ToggleButton value="exp">From Oman (Export)</ToggleButton>
          <ToggleButton value="imp">To Oman (Import)</ToggleButton>
        </ToggleButtonGroup>
        <Box
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
            <AddressForm control={control} addressDescription={addressDescription.addressDescription} errors={errors}/>
            </div>
              <div>
              <input type="submit" />
            </div>
          </form>
        </Box>


        <style jsx>{`
      li {
        margin-bottom: 0.5rem;
      }
    `}</style>
      </Layout>
  )
}

export default Home

export const shopFetcher = (query: string, variables: any, locale: string) => request(`${process.env.API_URL}`, query, {
  ...variables,
  _locale:locale
});


export async function getServerSideProps({ params /*, locale */}) {
  const addressDescription = await shopFetcher(ADDRESS_DESCRIPTION, {
    isoCode: "om",
    lang: "en"
  }, "en");

  console.log(addressDescription)
  return {
    props: {
      addressDescription
    }
  }
}