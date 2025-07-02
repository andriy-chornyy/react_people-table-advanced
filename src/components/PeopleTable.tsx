/* eslint-disable jsx-a11y/control-has-associated-label */

import cn from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { useEffect, useState } from 'react';
import { type } from 'os';


type Props = {
  peopleToDisplay: Person[];
};

export const PeopleTable: React.FC<Props> = ({peopleToDisplay} ) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortValue = searchParams.get('sort')
  const sortOrder = searchParams.get('order')
  // let noValue = sortValue === null && sortOrder === null


  console.log(`sortOrder-------`, sortOrder)
  console.log(`sortValue-------`, sortValue)

  // let typeOfSort = 'name' | 'sex' | 'born' | 'died' | null;

  

  let result = sortValue === 'sex' && sortOrder === 'desc' ? ({ sort: null, order: null })
  : (sortValue !== 'sex' && sortOrder !== 'desc' ? ({ sort: 'sex', order: null, }) : ({ sort: 'sex', order: 'desc' }))



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
              <SearchLink params={{ sort: 'name' }}>
                <span className="icon">
                  <i className="fas fa-sort" />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={result}
              >

                {/* <SearchLink params={{ sort: 'sex' }} onClick={calcul}> */}
                <span className="icon">
                  <i className="fas fa-sort-down" />
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
          const father = peopleToDisplay.find(
            m => m.name === person.fatherName,
          );
          const mother = peopleToDisplay.find(
            f => f.name === person.motherName,
          );

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
