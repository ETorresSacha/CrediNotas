// import ExportExcel from 'react-export-excel'
// const ExcelFile = ExportExcel.ExcelFile
// const ExcelSheet = ExportExcel.ExcelSheet
// const ExcelColumn = ExportExcel.ExcelColumn

// const ciudades = [
//     {
//         ciudad :"Ciudad de México",
//         población:852145,
//         entidad:"Ciudad de México",
//         país: "México"
//     },
//     {
//         ciudad :"Lima",
//         población:252145,
//         entidad:"Lima",
//         país: "Perú"
//     }, {
//         ciudad :"Santiago",
//         población:102145,
//         entidad:"Santiago",
//         país: "Chile"
//     },

// ]
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import ReactExport from "react-export-excel";


const exportData = () => {
    const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
 

const dataSet1 = [
    {
        name: "Johson",
        amount: 30000,
        sex: 'M',
        is_married: true
    },
    {
        name: "Monika",
        amount: 355000,
        sex: 'F',
        is_married: false
    },
    {
        name: "John",
        amount: 250000,
        sex: 'M',
        is_married: false
    },
    {
        name: "Josef",
        amount: 450500,
        sex: 'M',
        is_married: true
    }
];
    return (
        <ExcelFile>
            <ExcelSheet data={dataSet1} name="Employees">
                <ExcelColumn label="Name" value="name"/>
                <ExcelColumn label="Wallet Money" value="amount"/>
                <ExcelColumn label="Gender" value="sex"/>
                <ExcelColumn label="Marital Status"
                             value={(col) => col.is_married ? "Married" : "Single"}/>
            </ExcelSheet>
        </ExcelFile>
    );
}

export default exportData

const styles = StyleSheet.create({})