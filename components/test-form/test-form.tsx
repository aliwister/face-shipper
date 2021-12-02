import { Controller } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import { COUNTRIES } from 'constants/';

export const TestForm = ({ control }) => (
  <>
    <div>
      <Controller
        name="postalCode"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <TextField label="Postal Code" variant="outlined" {...field} />}
      />
    </div>
    <div>
      <Controller
        name="cityName"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <TextField label="City" variant="outlined"  {...field} />}
      />
    </div>
    <div>
      <Controller
        name="countryCode"
        control={control}
        rules={{ required: false }}
        render={({ field }) =>                       <Autocomplete
          /*value={weight}*/
          options={COUNTRIES}
          renderInput={(params) => <TextField {...params} label="Country" required {...field} />}
          /*
                              onChange={(event, newValue:{label: string, weight: string}) => setType( newValue)}
          */
          {...field}
        />}
      />
    </div>
    <div>
      <Controller
        name="addressLine1"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <TextField label="Address 1" variant="outlined" {...field} />}
      />
    </div>
    <div>
      <Controller
        name="addressLine2"
        control={control}
        rules={{ required: false }}
        render={({ field }) => <TextField label="Address 2" variant="outlined" {...field} />}
      />
    </div>
  </>
)
