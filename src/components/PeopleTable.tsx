/* eslint-disable jsx-a11y/control-has-associated-label */

import cn from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { useEffect, useState } from 'react';

type Props = {
  peopleToDisplay: Person[];
};

export const PeopleTable: React.FC<Props> = ({ peopleToDisplay }) => {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortValue = searchParams.get('sort');
  const sortOrder = searchParams.get('order');

  console.log(`sortOrder-------`, sortOrder);
  console.log(`sortValue-------`, sortValue);

  enum SortType {
    Name = 'name',
    Sex = 'sex',
    Born = 'born',
    Died = 'died',
  }

  // Object.keys
  console.log('Object.values(SortType)-----111', Object.values(SortType));
  // Object.values(SortType)
  // Object.values(...).map(el => {.... return <SearchLink parm={...} />})
  const arrSortType = Object.entries(SortType);

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {arrSortType.map(([key, value]) => {
            // const result =
            //   sortValue === value && sortOrder === 'desc'
            //     ? { sort: null, order: null }
            //     : sortValue !== value && sortOrder !== 'desc'
            //       ? { sort: value, order: null }
            //       : { sort: value, order: 'desc' };

            let result: { sort?: string | null; order?: string | null } = {};
            let arrow = '';

            if (sortValue === value && sortOrder === 'desc') {

              result = { sort: null, order: null };
              arrow = 'ArrowDown';
            } else if (sortValue !== value) {
              result = { sort: value };
              arrow = 'bothArrow';
            } else if (sortValue === value && sortOrder !== 'desc') {
              result = { sort: value, order: 'desc' };
              arrow = 'ArrowUp';
            }

            return (
              <th key={key}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {key}
                  <SearchLink params={result}>
                    <span className="icon">
                      <i
                        className={cn('fas', {
                          'fa-sort': arrow === 'bothArrow',
                          'fa-sort-up': arrow === 'ArrowUp',
                          'fa-sort-down': arrow === 'ArrowDown',
                        })}
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>
            );
          })}

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
                  to={{
                    pathname: `/people/${person.slug}`,
                    search: searchParams.toString()
                  }}
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
                    to={{
                      pathname: `/people/${mother.slug}`,
                      search: searchParams.toString()
                    }}
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
                  <Link to={{
                    pathname: `/people/${father.slug}`,
                    search: searchParams.toString()
                  }}>{person.fatherName}</Link>
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
