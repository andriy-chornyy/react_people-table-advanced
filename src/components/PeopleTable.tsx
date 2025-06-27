/* eslint-disable jsx-a11y/control-has-associated-label */

import cn from 'classnames';
import { Link, useParams, useSearchParams} from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { useEffect, useState } from 'react';

type Props = {
  allPeople: Person[];
};

export const PeopleTable: React.FC<Props> = ({ allPeople }) => {
  const { slug } = useParams();

  const [peopleToDisplay, setPeopleToDisplay] = useState<Person[]>(allPeople);
  const [sexCount, setSexCount] = useState<number>(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;

  // let lok = searchParams.sort

  const calcul = () => {
    setSexCount(prev => (prev + 1) % 3)
    // console.log('------searchParams----0-1', sort, sexCount);
  }



  useEffect(() => {
    if (sort !== 'sex') {
      return;
    }

    if (sexCount === 1) {
      setPeopleToDisplay([...allPeople].sort((a, b) => a.sex.localeCompare(b.sex)));
      searchParams.set('sort', 'sex');
      setSearchParams(searchParams);
    }
    if (sexCount === 2) {
      setPeopleToDisplay([...allPeople].sort((a, b) => b.sex.localeCompare(a.sex)));
      searchParams.set('order', 'desc');
      setSearchParams(searchParams);
      return
    }
    if (sexCount === 0) {
      searchParams.delete('sort');
      searchParams.delete('order');
      setSearchParams(searchParams);

      return setPeopleToDisplay([...allPeople]);
    }
    return
  }, [sexCount]);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <SearchLink params={{ sort: 'name' }} >
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={{ sort: 'sex' }} onClick={calcul}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={{ sort: 'born' }}>
                <span className="icon">
                  <i className="fas fa-sort-up" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
            <SearchLink params={{ sort: 'died' }}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
            </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {peopleToDisplay.map(person => {
          const father = peopleToDisplay.find(m => m.name === person.fatherName);
          const mother = peopleToDisplay.find(f => f.name === person.motherName);

          return (
            <tr
              data-cy="person"
              key={person.slug}
              className={cn({
                'has-background-warning': person.slug === slug,
              })}
            >
              <td>
                <Link
                  to={`/people/${person.slug}`}
                  className={cn({ 'has-text-danger': person.sex === 'f' })}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>

              <td>
                {mother ? (
                  <Link
                    to={`/people/${mother.slug}`}
                    className={cn({ 'has-text-danger': mother.sex === 'f' })}
                  >
                    {person.motherName}
                  </Link>
                ) : (
                  person.motherName || '-'
                )}
              </td>

              <td>
                {father ? (
                  <Link to={`/people/${father.slug}`}>{person.fatherName}</Link>
                ) : (
                  person.fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
