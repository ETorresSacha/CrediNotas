 import {TED, TEM } from "./Formulas"

import {  CuotInt, diasAcum, diasXmes, paymentDate, solutionFRC,calculoCuota, cuotInterSimple } from "./CalculosFuncionesCrediticios";


//? ************************ TODO ESTAS FUNCIONES SON APLICABLES PARA UNA FINANCIERA ************************
//TODO --> TASA EFECTIVA
export const tasaEfectiva = (data)=>{

    // Cálculo de TEM
    const {tasaEfectivaPeriodico, periodo} = TEM(data)

    // Cálculo de TED
    const resultTED = TED(tasaEfectivaPeriodico,periodo)

    return {
        tem:tasaEfectivaPeriodico,
        ted:resultTED, 
        periodo:periodo
    }
}

    //TODO --> FRCA
export const calculoFRCA = (data) =>{
   
    const resultTED = tasaEfectiva(data).ted
    let acumFRCA = []

    for (let i = 1;i<=data.cuotas;i++){
        solutionFRC(resultTED,data,i,acumFRCA)
    }
    
    const resultFRCA = acumFRCA.reduce((accum, currentValue) => accum + currentValue,0);
    return resultFRCA
}

//TODO --> CRONOGRAMA DE PAGOS
 export const cronPagos = (data)=>{

    const TSegM = parseFloat(data?.tasaPrimaMensual) // % 
    let cronograma=[]
    let acumFRCA = []
    let newCapital = []
    let resultFRCA = calculoFRCA(data)
    const {tem, ted, periodo} = tasaEfectiva(data)
    for (let i = 1;i<=data.cuotas;i++){
        cronograma.push(
            {
            cuota:i, 
            fechaPago:paymentDate(data,i-1),
            fechaDesembolso:data?.fechaDesembolso,
            Dias:diasXmes(data,i-1), 
            DiasAcum:diasAcum(data,i-1),
            FRC :solutionFRC(ted,data,i,acumFRCA),
            cuotaInteres:CuotInt(data,i-1,tem,periodo,resultFRCA,newCapital).resultInt,
            cuotaCapital:CuotInt(data,i-1,tem,periodo,resultFRCA,newCapital).resultCuo,
            capital:CuotInt(data,i-1,tem,periodo,resultFRCA,newCapital).resultCap,
            SegDesgrvamen: CuotInt(data,i-1,tem,periodo,resultFRCA,newCapital,TSegM).resultSeg,
            CuoSinITF : CuotInt(data,i-1,tem,periodo,resultFRCA,newCapital,TSegM).resultCuoSinITF,
            CuoConITF : CuotInt(data,i-1,tem,periodo,resultFRCA,newCapital,TSegM).resultCuoConITF,
        })
    }
    return cronograma
 
 }

 //TODO --> AJUSTANDO LOS RESULTADOS DEL CRONOGRAMA 
 export const resultCronograma = (data)=>{

    const result = cronPagos(data) 
  
    let cuotas = []
    let promCuota
    
    // Cuota promedio
    result.map((element) => cuotas.push(element.CuoConITF))
    let resultPromCuo = cuotas.reduce((accum, currentValue) => accum + currentValue,0);
    promCuota = resultPromCuo/data.cuotas

    // ITF
    let itf = (promCuota * 0.00005)
    itf = parseFloat(itf.toFixed(2))


    // resultado
    let cronogramaAjustado = result.map((element,index) =>{

        return {
   
            cuota:element.cuota,
            fechaDesembolso:element.fechaDesembolso,
            fechaPago: element.fechaPago,
            capital: (promCuota-(element.cuotaInteres+element.SegDesgrvamen+itf)).toFixed(2),
            interes: element.cuotaInteres.toFixed(2),
            SegDesg:element.SegDesgrvamen.toFixed(2),
            ITF:itf.toFixed(2),
            montoCuota:promCuota.toFixed(2),
            dias:element.Dias,
            statusPay:false
        }
        
    })

    return cronogramaAjustado

 } 

//? ***************************************************************************************************

//? --------------------- ESTA FUNCIÓN ES APLICABLE CON UN PRÉSTAMO INDEPENDIENTE ---------------------
 //TODO --> CRONOGRAMA PARA UN PRÉSTAMO INDEPENDIENTE
 export const cuotaIndependiente =(data)=>{

    const interesTotal = parseInt(data?.cuotas)*parseFloat(data?.interes)*parseFloat(data?.capital)/100
    let capital = parseFloat(data?.capital)
    
    let interes =parseFloat(data?.interes)/100
    let tiempo =parseInt(data?.cuotas)
    
    let cronograma=[]
    let newCapital = []
   
    for (let i =1; i<=data?.cuotas;i++){
        cronograma.push({
            cuota:i,
            capital: capital.toFixed(2),
            fechaDesembolso:data?.fechaDesembolso,
            fechaPago: paymentDate(data,i-1),
            interesTotal:interesTotal.toFixed(2),
            statusPay:false,
            Dias:diasXmes(data,i-1), 
            DiasAcum:diasAcum(data,i-1),
            cuotaInteres:cuotInterSimple(capital,interes,tiempo,i-1,newCapital).resultInt,
            cuotaCapital:cuotInterSimple(capital,interes,tiempo,i-1,newCapital).resultCuo,
            saldoCapital:cuotInterSimple(capital,interes,tiempo,i-1,newCapital).resultCap,
            cuotaNeto:cuotInterSimple(capital,interes,tiempo,i-1,newCapital).resultCuoNeto,
            mora:0
        })
    }
            
    return cronograma
 }
 //? --------------------- ---------------------------------------------------- ---------------------