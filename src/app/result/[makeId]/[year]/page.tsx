import { Suspense } from 'react';
import { generateYears } from '@/lib/utils';
import fetchData from '@/lib/xhr';

export function generateStaticParams() {
  const years = generateYears();
  return years.map((year) => ({
    year,
  }));
}

const BASE_URL = process.env.BASE_URL;

interface Car {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

interface ApiResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: Car[];
}

export default async function Page({
  params,
}: {
  params: Promise<{ makeId: string; year: string }>;
}) {
  const { makeId, year } = await params; // ignore LSP, this *must* be awaited as per docs
  const ENDPOINT_URL = `GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`;

  const { Results: vehicles }: ApiResponse = await fetchData<ApiResponse>(
    `${BASE_URL}/${ENDPOINT_URL}`
  );

  if (vehicles.length === 0) {
    return (
      <main className="grid place-items-center w-full h-screen">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          No results found :(
        </h2>
      </main>
    );
  }

  return (
    <main className="grid place-items-center w-full h-screen">
      <Suspense
        fallback={
          <h1>
            This suspense is pointless, the data is fetched in the server...
          </h1>
        }
      >
        <div>
          <h1 className="py-8 text-blue-300 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {vehicles[0].Make_Name}
          </h1>
          <ul className="pl-16">
            {vehicles?.map((vehicle) => (
              <li key={vehicle.Model_ID} className="list-disc">
                {vehicle.Model_Name}
              </li>
            ))}
          </ul>
        </div>
      </Suspense>
    </main>
  );
}
