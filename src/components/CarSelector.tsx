'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { generateYears } from '@/lib/utils';

interface Car {
  MakeId: number;
  MakeName: string;
  VehicleTypeId: number;
  VehicleTypeName: string;
}

interface CarSelectorProps {
  vehicles: Car[];
}

export default function CarSelector({ vehicles }: CarSelectorProps) {
  const years = generateYears();

  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-8">
      <Label>
        <span className="text-blue-300 font-bold">Brand</span>
        <span className="text-red-600">*</span>

        <Select value={selectedCar} onValueChange={setSelectedCar}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a car" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Brand</SelectLabel>
              {vehicles?.map((car: Car) => (
                <SelectItem key={car.MakeId} value={car.MakeId.toString()}>
                  {car.MakeName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Label>

      <Label>
        <span className="text-blue-300 font-bold">Year</span>
        <span className="text-red-600">*</span>

        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Year</SelectLabel>

              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Label>

      <Link
        href={{
          pathname: `/result/${selectedCar}/${selectedYear}`,
        }}
      >
        <Button disabled={!selectedCar || !selectedYear}>Next</Button>
      </Link>
    </div>
  );
}
