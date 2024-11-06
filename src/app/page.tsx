import CarSelector from '@/components/CarSelector';
import fetchData from '@/lib/xhr';

const BASE_URL = process.env.BASE_URL;

interface Brand {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

interface ApiResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: Brand[];
}

export default async function Home() {
  const ENDPOINT_URL = 'GetMakesForVehicleType/car?format=json';

  const { Results: vehicles }: ApiResponse = await fetchData<ApiResponse>(
    `${BASE_URL}/${ENDPOINT_URL}`
  );

  const sortedVehicles = vehicles.sort((a, b) => {
    if (a.MakeName < b.MakeName) return -1;
    if (a.MakeName > b.MakeName) return 1;
    return 0;
  });

  return (
    <main className="w-full h-screen flex flex-col sm:flex-row">
      <div className="h-auto w-full sm:h-full sm:w-1/2 p-8 grid place-items-center">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl py-4">
            Welcome to DevelOps&rsquo; Vehicle Database!
          </h1>
          <p>Let&rsquo;s get started by selecting a brand and a model...</p>
        </div>
      </div>

      <div className="h-auto w-full sm:h-full sm:w-1/2 p-8 grid place-items-center">
        <div>
          <CarSelector vehicles={sortedVehicles} />
        </div>
      </div>
    </main>
  );
}
