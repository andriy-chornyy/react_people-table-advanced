import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Outlet, useSearchParams } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [peopleToDisplay, setPeopleToDisplay] = useState<Person[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  useEffect(() => {
    getPeople()
      .then(data => {
        if (data.length === 0) {
          setIsEmpty(true);
          setHasError(false);
        } else {
          setAllPeople(data);
          setIsEmpty(false);
          setHasError(false);
        }
      })
      .catch(() => {
        setHasError(true);
        setIsEmpty(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const keys = Array.from(searchParams.keys());

    if (keys.includes("sort")) {
      let sortedPeople = [...allPeople];

      if (sort === 'sex') {
        sortedPeople = sortedPeople.sort((a, b) => a.sex.localeCompare(b.sex))
      }

      if (sort === 'name') {
        sortedPeople = sortedPeople.sort((a, b) => a.name.localeCompare(b.name))
      }

      if (sort === 'born') {
        sortedPeople = sortedPeople.sort((a, b) => a.born - b.born)
      }

      if (sort === 'died') {
        sortedPeople = sortedPeople.sort((a, b) => a.died - b.died)
      }

      if (keys.includes("order") && order === 'desc') {
        sortedPeople = sortedPeople.reverse()
      }

      setPeopleToDisplay(sortedPeople);
    } else {
      setPeopleToDisplay(allPeople);
    }

  }, [allPeople]);



  // console.log('searchParams-----searchParams', searchParams);
  console.log('searchParams-----searchParams', searchParams);

  return (
    <>
      <Outlet />
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {isLoading ? (
            <div className="column">
              <div className="box table-container">
                <Loader />
              </div>
            </div>
          ) : (
            <>
              <div className="column is-7-tablet is-narrow-desktop">
                <PeopleFilters />
              </div>

              <div className="column">
                <div className="box table-container">
                  {hasError && (
                    <p data-cy="peopleLoadingError">Something went wrong</p>
                  )}

                  {isEmpty && (
                    <p data-cy="noPeopleMessage">
                      There are no people on the server
                    </p>
                  )}

                  <p>
                    There are no people matching the current search criteria
                  </p>

                  <PeopleTable
                    peopleToDisplay={peopleToDisplay}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
