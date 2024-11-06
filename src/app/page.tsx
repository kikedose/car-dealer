import CarSelector from '@/components/CarSelector';
import fetchData from '@/lib/xhr';

const BASE_URL = process.env.BASE_URL;
const ENDPOINT_URL = 'GetMakesForVehicleType/car?format=json';

interface Car {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

interface ApiResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: Car[];
}

export default async function Home() {
  const { Results: vehicles }: ApiResponse = await fetchData<ApiResponse>(
    `${BASE_URL}/${ENDPOINT_URL}`
  );

  return (
    <main>
      <CarSelector vehicles={vehicles} />
    </main>
  );
}
