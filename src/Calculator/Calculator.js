import './calculator.scss'
import React, { useEffect, useRef, useState } from 'react'
import { btnData, BTN_ACTIONS } from './btnData'

function Calculator() {
    const btnRef = useRef(null)
    const expRef = useRef(null)
    const [expression,setExpression] = useState("");

    useEffect(()=>{
        const btns = Array.from(btnRef.current.querySelectorAll('button'))
        btns.forEach(item =>item.style.height = item.offsetWidth +'px')
    },[])

    const handleOnclickBtn=(item)=>{
        const expDiv = expRef.current
        if(item.action === BTN_ACTIONS.DELETE){
            expDiv.parentNode.querySelector('div:last-child').innerHTML = ''
            expDiv.innerHTML = ''
            setExpression('')
        }
        if(item.action ===BTN_ACTIONS.ADD){
            AddSpan(item.display)
            const operator = item.display === 'x'?'*':item.display
            setExpression(pre => pre+operator)
        }
        if(item.action ===BTN_ACTIONS.CALC){
            handleCalc()
        }
    }
    const handleCalc = ()=>{
        if(expression.length === 0 )
            return
        console.log(expression)
        const expDiv = expRef.current
        expDiv.parentNode.querySelector('div:last-child').remove()
        const preExpressionNode = expDiv.cloneNode(true)
        expDiv.parentNode.appendChild(preExpressionNode)

        const transform = `translateY(${-(expDiv.offsetHeight + 10)}px)
                scale(0.4)`
        try {
            const result = eval(expression)
            setExpression(result.toString())
            setTimeout(()=>{
                console.log(result)
                preExpressionNode.style.transform = transform
                expDiv.innerHTML = ''
                AddSpan(Math.floor(result*100000000/100000000))
            },200)
        } catch (error) {
            
        }
    }
    const AddSpan = (content)=>{
        const expDiv = expRef.current;
        const span = document.createElement('span')

        
        span.innerHTML = content
        expDiv.appendChild(span)
        const width = span.offsetWidth+'px'
        span.style.width = 0
        span.style.opacity = 0
        

        setTimeout(() => {
            span.style.opacity=1
            span.style.width = width
        }, 200);
    }
    return (
        <div className="calculator">
            <div className="calculator__result">
                <div  ref={expRef} className="calculator__result__exp">

                </div>
                <div className="calculator__result__exp">
                </div>
            </div>
            <div ref = {btnRef} className="calculator__btn">
                {
                    btnData.map((item, index) =>
                        <button onClick={()=>{handleOnclickBtn(item)}} key={index} className={`${item.class}`}>{item.display}</button>
                    )
                }
            </div>
        </div>
    )
}

export default Calculator