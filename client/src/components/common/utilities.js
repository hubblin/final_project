//Define our labelmap
const labelmap = {
    1: {name: 'Jogger pants', color: 'red'},
    2: {name: 'Pocket', color: 'yellow'},
    3: {name: 'Pants', color: 'lime'}
}
//타자 치면 위에 부서지는 것만


//Define a drawing function
export const drawRect = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx, getResult) =>{

    
    for(let i =0; i <= boxes.length; i++){

        
        if(boxes[i] && classes[i] && scores[i]>threshold){
     
            
            const [y,x,height, width] = boxes[i]
            const text = classes[i]

            //Set styling
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 5
            ctx.fillStyle = 'black'
            ctx.font = '30px Arial'

            if(getResult === ''){
                getResult = labelmap[text]['name']
            }else{
                getResult = getResult + ',' + labelmap[text]['name']
            }
            
            //DRAW!!
            ctx.beginPath()
            ctx.fillText(labelmap[text]['name'] + ' - ' + Math.round(scores[i]*100)/100, x*imgWidth, y*imgHeight)
            ctx.rect(x*imgWidth, y*imgHeight, width*imgWidth/2, height*imgHeight/1.5)
            ctx.stroke()
        }
    }
    return getResult;
}