'use client';

import qs from 'query-string'; // Library for handling URL query strings.

import { useRouter, useSearchParams } from 'next/navigation'; // Next.js hooks for navigation and search params.

import { Color, Size } from '@/types';
import Button from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FilterProps {
  data: (Size | Color)[];
  name: string;
  valueKey: string; // Key used to manage search params in the URL.
}

const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
  // 1. `searchParams` retrieves the current URL's search parameters.
  const searchParams = useSearchParams();

  // 2. `router` provides navigation functionalities for changing URL or pages.
  const router = useRouter();

  // 3. `selectedValue` holds the current value of the search parameter specified by `valueKey`.
  const selectedValue = searchParams.get(valueKey);

  // 4. `onClick` is a function that handles updates to the URL's query parameters when a filter is clicked.
  const onClick = (id: string) => {
    // 4a. `current` parses the current search parameters into an object.
    const current = qs.parse(searchParams.toString());

    // 4b. `query` is an object that updates the specified filter's value to the provided `id`.
    const query = {
      ...current,
      [valueKey]: id,
    };

    // 4c. If the selected value is already the current `id`, reset it to null (removes the filter).
    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    // 4d. `url` is a stringified version of the updated URL with the new query parameters.
    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true } // Skip parameters with null values.
    );

    // 4e. navigates to the updated URL without scrolling up.
    router.replace(url, { scroll: false });
  };

  return (
    <div className='mb-8'>
      <h3 className='text-lg font-semibold'>{name}</h3>

      <hr className='my-4' />

      <div className='flex flex-wrap gap-2'>
        {data.map((filter) => (
          <div
            key={filter.id}
            className='flex items-center'>
            <Button
              className={cn('rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300', selectedValue === filter.id && 'bg-black text-white')}
              onClick={() => onClick(filter.id)}>
              {filter.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
