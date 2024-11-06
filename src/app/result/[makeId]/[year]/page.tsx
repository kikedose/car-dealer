import { generateYears } from '@/lib/utils';
import fetchData from '@/lib/xhr';

export function generateStaticParams() {
  const years = generateYears();
  return years.map((year) => ({
    year,
  }));
}

const BASE_URL = process.env.BASE_URL;
const ENDPOINT_URL = 'GetMakesForVehicleType/car?format=json';

export default async function Page({
  params,
}: {
  params: { makeId: string; year: string };
}) {
  const { makeId, year } = await params;

  const response = await fetchData(
    `${BASE_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );

  const vehicles = response.Results;

  console.log({ vehicles });

  return (
    <div>
      <h1>{vehicles[0].Make_Name}</h1>
      {vehicles?.map((vehicle) => (
        <div key={vehicle.Model_ID}>
          <h2>{vehicle.Model_Name}</h2>
        </div>
      ))}
    </div>
  );
}
