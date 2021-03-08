import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import {Link} from 'react-router-dom';

const SearchBlock = styled.div`
    width: 450px;
    padding-top: 3rem;
    margin: 0 auto;
`;


const SearchForm = styled.div`
    flex: 1;
    justify-content: center;
    alignItems: center;
    overflow: hidden;
    display: flex;
    width: 450px;
    input,button{
        outline: none;
        border: none;
        font-size: 1rem;
    }

    input {
        padding: 0.5rem;
        flex:1;
        min-width: 0;
        border-bottom: 1px solid ${palette.gray[8]};
    }

    button{
        cursor: pointer;
        padding-right: 1rem;
        padding-left: 1rem;
        border: none;
        background: ${palette.gray[8]};
        color: white;
        font-weight: bold;
        &: hover{
            background: ${palette.gray[6]};
        }
    }

    select{
        border: 1px solid ${palette.gray[8]};
        border-radius: 4px;
    }
`;

const Search = ({onSearch, onChange, inputValue}) =>{
    return (
        <SearchBlock>
            <SearchForm>
                <select name='type' onChange={onChange}>
                    <option value="searchTag">태그</option>
                    <option value="searchUser">유저 이름</option>
                </select>
                <input value={inputValue} name="search" placeholder="검색어를 입력하세요" onChange={onChange}/>
                <button onClick={onSearch}>검색</button>
            </SearchForm>
        </SearchBlock>
    )
}

export default Search;