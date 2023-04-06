import React, { useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { Input } from '../components/Form/Input';
import { Select } from '../components/Form/Select';
import { Form } from '../components/Form/Form';
import { Button } from '../components/Elements/Button';
import { SelectOption } from '../components/Form/Select';

import './VeichleHeader.scss';

type VeichleHeaderProps = {
  handleSearchBarSubmit: (
    e: React.ChangeEvent<HTMLFormElement>,
    searchValue: string
  ) => void;
  handleSelectValueChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectOptions: SelectOption[];
  linkRoute: string;
  linkText: string;
  selectDefaultValue?: string;
};

export const VeichleHeader = observer(
  ({
    handleSearchBarSubmit,
    handleSelectValueChange,
    selectOptions,
    selectDefaultValue,
    linkRoute,
    linkText,
  }: VeichleHeaderProps) => {
    const searchValueRef = useRef<HTMLInputElement>(null);
    return (
      <div className='veichle-header '>
        <Form
          onSubmit={(e: React.ChangeEvent<HTMLFormElement>) =>
            handleSearchBarSubmit(e, searchValueRef.current!.value)
          }
        >
          <Input
            ref={searchValueRef}
            variant='veichle-header__search-filter'
            placeholder='Search Models'
          />
          <Button type='submit'>
            <AiOutlineSearch />
          </Button>
        </Form>

        <div className='veichle-header-left'>
          <Select
            label='Sort by:'
            options={selectOptions}
            defaultValue={selectDefaultValue}
            onChange={handleSelectValueChange}
          />
          <Link to={linkRoute}>
            <Button size='large'>{linkText}</Button>
          </Link>
        </div>
      </div>
    );
  }
);
