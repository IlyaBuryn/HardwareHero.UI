import { Button } from '@mui/material';

export default function DeepList({ list, handleValueClick }) {

  if (!list || list.length == 0) {
    return null;
  }

  return (
    <li>
      <div>{list.isCpuManufacturer ? 'CPU Manufacturer' : 'Manufacturer'}:</div>
      {list.map(manufacturer => (
        manufacturer.values && (
          <Button key={manufacturer.name} sx={{ m: 0.5 }} variant="outlined" color="secondary" onClick={() => handleValueClick(manufacturer.name)}>
            {manufacturer.name}
          </Button>
      )))}
    </li>
  )
}