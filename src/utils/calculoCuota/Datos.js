//Todo--> Fórmulas para el cálculo de la cuota y el cronograma de pagos

// Variables

let TEA = "" // Tasa Efectiva Anual
let TEM = "" // Tasa Efectiva Mensual
let TED = "" // Tasa Efectiva Diaria
let periodo="" // periodo
let TSegM = "" // Tasa de Seguro de Desgravamen Mensual o Tasa Prima Mensual
let TSegDD ="" // Tasa de Seguro de Desgravamen Diario
let FRC = "" // Factor de Retorno de Capital
let DA =""  // Dias Acumulados
let capital = "" //capital
let MonSegDM = "" // Monto Seguro de Desgravamen Mensual
let TCEA ="" // Tasa de Costo Efestivo Anual
let tm ="" // Tasa de Costo Efectivo Mensual
let n = "" // Número de cuotas
let IntCuo = "" // Capital de la cuota
let CapitalCuo = "" // Capital de la cuota

let FRCA ="" // esta para verificar que significa
const ITF = 0.005 // Impuesto a las Transacciones Financieras (0.005%)

//! Cálculo de la tasa efectiva mensual

//TEM = ((Math.pow((1+(TEA/100)),(periodo/360)))-1)*100

//! Cálculo de la tasa efectiva diaria
//TED = ((Math.pow((1+(TEA/100)),(1/30)))-1)*100

//! Cálculo de la tasa de seguro de desgravamen diario

 //TSegDD = (TSegM/30)*100

//! Cálculo del factor de retorno de capital (FRC)

//FRC = (1/(Math.pow((1+TED),(DA))))

//! Cálculo del monto de seguro de desgravamen

 //MonSegDM = TSegDD*capital*Dias(entrecuotas) //ojo

//! Cálculo del interés de la cuota

//IntCuo = ((Math.pow((1+(TEM/100)),(DA/30)))-1)*capital

//! Cálculo del capital de la cuota

//CapitalCuo = (capital/FRCA) - IntCuo // ojo FRCA

//! Cálculo de la cuota mensual

//const CM = (capital/FRCA) + MonSegDM // ojo FRCA

//! Cálculo de la tasa de costo efectivo anual

//TCEA = ((Math.pow((1+tm),(n)))-1)*100


//EJEMPLO

// Calcular la cuota mensual a pagar por un préstamo de  S/.5000 que se desembolsa el 18-12-2011;
// por el plazo de 12 meses y una Tasa Efectiva Anual(TEA) de 51.11%.

// DATOS:

    // Capital = 5000
    // TEA = 51.11%
    // n = 12 meses
    // ITF = 0.005%
    // P = Periodo entre cuotas (30 días)
    // TsegM = 0.03%

//? SOLUCIÓN


    capital = 5000  // soles
    TEA = 51.11     // %
    n= 12           // meses
    //ITF = 0.005     // %
    periodo = 30          // dias
    TSegM = 0.03    //%  
    TSegM = 0.03/100 // convertido

// CALCULO DE LA TASA EFECTIVA MENSUAL

TEM = ((Math.pow((1+(TEA/100)),(periodo/360)))-1)*100 //%
TEM = Number.parseFloat(TEM).toFixed(2)

// CALCULO DE LA TED

TED = ((Math.pow((1+(TEM/100)),(1/30)))-1)*100 //%


// CALCULO DE LA TASA DE SEGURO DE DESGRAVAMEN DIARIO

TSegDD = (TSegM/30)*100  //%


// CALCULO DEL FACTOR DE RETORNO DE CAPITAL (FRC)
TED = TED/100
console.log(Number.parseFloat(TED).toFixed(7));
DA = 34  // Este resultado el la resta de la fecha de la primera cuota y la fecha de desmbolso

FRC = (1/(Math.pow((1+(TED)),(DA))))
console.log(FRC);

// CALCULO DEL MONTO DE SEGURO DE DESGRAVAMEN

TSegDD = TSegDD/100
MonSegDM = TSegDD*capital*DA //!ojo
//MonSegDM = Number.parseFloat(MonSegDM).toFixed(2)
console.log(MonSegDM);

// CALCULO DEL INTERES DE LA CUOTA

IntCuo = ((Math.pow((1+(TEM/100)),(DA/30)))-1)*capital
IntCuo = Number.parseFloat(IntCuo).toFixed(2)
console.log(IntCuo);

// CALCULO DEL CAPITAL DE LA CUOTA

CapitalCuo = (capital/9.60427337) - IntCuo // ojo FRCA
console.log(CapitalCuo);

// CALCULO DE LA CUOTA MENSUAL

CM = (capital/9.60427337)
console.log(CM);



