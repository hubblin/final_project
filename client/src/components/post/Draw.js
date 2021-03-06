import React,{createRef, useEffect} from 'react';
import styled from 'styled-components';

const DrawArea = styled.div`
    width: 800px;
    margin: 0 auto;
    
    margin-top: 2rem;

    .canvasStyle{
        border: 1px solid black;
    }
`

const Draw = (props) => {
    let canvas;
    let canvasRef = createRef();

    let pos ={
        drawable : false,
        X: -1,
        Y: -1,
    };

    let ctx;

    useEffect(()=>{
        canvas = canvasRef.current;
        ctx = canvas.getContext("2d");
        canvas.addEventListener("mousedown", initDraw);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", finishDraw);
        canvas.addEventListener("mouseout", finishDraw);
    })

    function initDraw(event) {
        ctx.beginPath();
        pos = {drawable: true, ...getPosition(event)};
        ctx.moveTo(pos.X, pos.Y);
    }

    function draw(event){
        if(pos.drawable){
            pos = {...pos, ...getPosition(event)};
            ctx.lineTo(pos.X, pos.Y);
            ctx.stroke();
        }
    }

    function finishDraw(){
        pos = {drawable: false, X: -1, Y:-1};
    }

    function getPosition(event){
        return {X: event.offsetX,
            Y: event.offsetY
        }
    }

    return (
        <DrawArea>
            <canvas className="canvasStyle" ref={canvasRef} width="800" height="600"/>
            <button>검색하기</button>
        </DrawArea>
    );
};

export default Draw;