//TODO --> FÓRMULAS
// Cálculo de la tasa efectiva mensual, semanal, quincenal, diario
export const TEM = (data)=>{ 
    let periodo
    switch (data?.periodo) {
        case 'Mensual':
            periodo = 30
            break

        case 'Quincenal':
            periodo = 15
            break

        case 'Semanal':
            periodo = 7
            break

        case 'Diario':
            periodo = 1
            break
    }
    const result =  ((Math.pow((1+(data?.tea/100)),(periodo/360)))-1)*100
    return {
        tasaEfectivaPeriodico:Number.parseFloat(result).toFixed(14),
        periodo:periodo}
}

// Cálculo de la tasa efectiva diaria
export const TED = (TEM, periodo)=>{
 
    const result =  ((Math.pow((1+(TEM/100)),(1/periodo)))-1)*100
    return result
}

// Cálculo de la tasa de seguro de desgravamen diario
export const TSegDD = (TSegM) =>{
    const result = ((TSegM/100)/30)
    return result
}

// Cálculo del factor de retorno de capital (FRC)
export const FRC = (TED,DA)=>{
    const result = (1/(Math.pow((1+(TED/100)),(DA))))
    return result
}

// Cálculo del monto de seguro de desgravamen
export const MonSegDM = (TSegDD,capital,dias)=>{
    const result = (TSegDD*capital*dias)
    return result
}

// Cálculo del interés de la cuota
export const IntCuo = (TEM,periodo,dias,capital)=>{
    const result = ((Math.pow((1+(TEM/100)),(dias/periodo)))-1)*capital
    return result
}

// Cálculo del capital de la cuota
export const CapitalCuo =(capital,FRCA,IntCuo)=>{
    const result = (capital/FRCA) - IntCuo 
    return result
}

// Cálculo de la cuota mensual
export const CM = (capital,FRCA,MonSegDM)=>{
    const result = (capital/FRCA) + MonSegDM 
    return result
}

// Cálculo de la tasa de costo efectivo anual
export const TCEA =(tm,n)=>{
    const result = ((Math.pow((1+tm),(n)))-1)*100
    return Number.parseFloat(result).toFixed(2)

}


//TODO--> Fórmulas para un cálculo de interes simple
// Cálculo del monto interés
export  const monInt=(capital,interes,tiempo)=>{
    
   const  result = (capital*interes*tiempo)/(tiempo)

    return Number.parseFloat(result).toFixed(2)

}

// Cálculo del monto capítal
export const montCap=(capital,tiempo)=>{
    const result = capital/tiempo
    return Number.parseFloat(result).toFixed(2)
}

// Cálculo de la mora
export const mora = (intMoratorio,montoCapital,diasRetraso)=>{
    const result = (intMoratorio*montoCapital*diasRetraso)/100
    return Number.parseFloat(result).toFixed(2)
}
// Cálculo del interés neto






