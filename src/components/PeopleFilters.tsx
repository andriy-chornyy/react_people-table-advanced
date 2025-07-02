import { NavLink, useSearchParams } from 'react-router-dom';
import cn from "classnames";

// const getLinkClass = ({ isActive }: {isActive: boolean}) => classNames({ "is-active": isActive })

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterValue = searchParams.get('sex');
  const filterCenturies = searchParams.get('centuries');

  enum FilterType {
    All = '',
    Male = '/?sex=m',
    Female = '/?sex=f',
  }

  console.log('Object.values(SortType)-----111', Object.values(FilterType));
  // Object.values(SortType)
  // Object.values(...).map(el => {.... return <SearchLink parm={...} />})
  const arrFilterType = Object.entries(FilterType);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {arrFilterType.map(([key, path]) => {
          return (
            <NavLink
              to={path}
              key={path}
              className={({ isActive }) => cn('', { 'is-active': isActive })}
            >
              {key}
            </NavLink>
          );
        })}
      </p>

      {/* <p className="panel-tabs" data-cy="SexFilter">
        <a className="is-active" href="#/people">
          All
        </a>
        <a className="" href="#/people?sex=m">
          Male
        </a>
        <a className="" href="#/people?sex=f">
          Female
        </a>
      </p> */}

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=16"
            >
              16
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=17"
            >
              17
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=18"
            >
              18
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=19"
            >
              19
            </a>

            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=20"
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
