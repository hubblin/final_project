import React,{createRef, useEffect, useState} from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';

import * as tf from "@tensorflow/tfjs";
import { drawRect } from "../common/utilities";
import {useDispatch} from 'react-redux';



const DrawArea = styled.div`
    width: 800px;
    margin: 0 auto;
    
    margin-top: 2rem;

    .canvasStyle{
        border: 1px solid black;
    }

    button{
        color: white;
        width: 100%;
        border: none;
        border-radius: 4px;
        font-weight: bold;
        padding: 0.25rem 1rem;
        background: ${palette.gray[8]};
        &:hover{
            background: ${palette.gray[6]};
        }
    }
`

const Draw = ({func}) => {
    let canvas;
    let canvasRef = createRef();

    const dispatch = useDispatch();

    let pos ={
        drawable : false,
        X: -1,
        Y: -1,
    };

    let ctx;

    let getResult = '';

    useEffect(()=>{
        canvas = canvasRef.current;
        ctx = canvas.getContext("2d");
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        canvas.addEventListener("mousedown", initDraw);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", finishDraw);
        canvas.addEventListener("mouseout", finishDraw);
    })

    /*useEffect(()=>{
        dispatch(getTags(getResult))
    }, [getResult])*/

    function initDraw(event) {
        ctx.beginPath();
        ctx.lineWidth = 2;
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


    const onCheck = async() =>{
        const nets = await tf.loadGraphModel('https://cloud-real-time-tensorflow-js-model.s3.jp-tok.cloud-object-storage.appdomain.cloud/model.json');

        const timg = tf.browser.fromPixels(canvas);
        
        const resized = tf.image.resizeBilinear(timg, [800,600]);
        const casted = resized.cast('int32');
        const expanded = casted.expandDims(0);
        
        var obj = await nets.executeAsync(expanded)


        const boxes = await obj[1].array()
        const classes = await obj[2].array()
        const scores = await obj[4].array()

        canvas = canvasRef.current;
        ctx = canvas.getContext("2d");
        getResult = drawRect(boxes[0], classes[0], scores[0], 0.6, 800, 600, ctx, getResult)
        

        tf.dispose(timg)
        tf.dispose(resized)
        tf.dispose(casted)
        tf.dispose(expanded)
        tf.dispose(obj)
       
        func(getResult)
    }

    return (
        <DrawArea>
            <canvas className="canvasStyle" ref={canvasRef} width="800" height="600"/>
            <button onClick={() =>onCheck()}>태그 추출하기</button>
        </DrawArea>
    );
};

export default Draw;