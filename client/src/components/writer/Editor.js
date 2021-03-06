import React, {useRef,useEffect} from 'react';
import Quill from 'react-quill';
import 'quill/dist/quill.snow.css';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';


const EditorBlock = styled.div`
    padding-top: 5rem;
    padding-bottom: 5rem;
    width: 100%;
`;

const TitleInput = styled.input`
    font-size: 3rem;
    outline: none;
    padding-bottom: 0.5rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[4]};
    margin-bottom: 2rem;
    width: 100%;
`;

const QuillWrapper = styled.div`
    .ql-editor{
        padding: 0;
        min-height: 320px;
        font-size: 1.125rem;
        line-height: 1.5;
    }
    .ql-editor .ql-blank::before{
        left: 0px;
    }
`;

const Editor = ({onChange, onChangeHtml, theTitle, theBody}) =>{

    return(
        <EditorBlock>
            <TitleInput value={theTitle} placeholder="제목을 입력하세요" onChange={onChange} name="title"/>
            <QuillWrapper>
                <Quill
                    theme="snow"
                    modules={{
                        toolbar:[
                            [{header:'1'}, {headre:'2'}],
                            ['bold','italic','underline','strike'],
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            ['blockquote','code-block','link','image']
                        ]}
                        
                    }
                    placeholder="내용을 작성하세요..."
                    onChange={onChangeHtml}
                    name="body"
                    value={theBody}
                />
            </QuillWrapper>
        </EditorBlock>
    )
}

export default Editor;