import { getPeople } from '../api';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Outlet } from 'react-router-dom';

export const PeoplePage: React.FC = () => {
  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

                  <PeopleTable allPeople={allPeople} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
