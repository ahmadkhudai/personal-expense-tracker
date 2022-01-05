import {Expense} from "../Definitions/Expense";
import {getSortedExpenses, groupByMonth} from "../pages/api/utils/expense/grouping";
//@ts-ignore
import XLSX from 'xlsx/xlsx.mini';


    // function downloadExcel(data:any, fileName:string) {
    //     // var xhr = new XMLHttpRequest();
    //     // xhr.open('GET', url, true);
    //     // xhr.responseType = 'blob';
    //     // xhr.onload = function(e) {
    //     //     if (this.status == 200) {
    //             var myBlob = data;
    //             var link = document.createElement('a');
    //             link.href = window.URL.createObjectURL(myBlob);
    //             link.download = fileName+".csv";
    //             link.click();
    //     //     }
    //     // };
    //     // xhr.send();
    // }

export function saveExpenses(expenses: Expense[]) {
    downloadExpenses(expenses );
}

function downloadExpenses(expenses: Expense[]) {
    let data = expenses
    const monthlyData = groupByMonth(getSortedExpenses(expenses), false);
    let fileName = ''
    monthlyData.forEach(month => {
        fileName = Object.keys(month)[0];
        data = getMergedArray(month[fileName]);
        storeData(data, fileName);
    })
}

function concatArray(previous: any, current: any) {
    return previous.concat.apply(previous, current)
}

function getMergedArray(superArray: any) {
    let prev = superArray[0];
    for (let i = 1; i < superArray.length; i++) {
        const current: any = superArray[i];
        prev = concatArray(prev, current);
    }
    return prev;
}

function storeData(data:any, fileName:string) {


        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.json_to_sheet(data)
        XLSX.utils.book_append_sheet(wb, ws, fileName)
        // downloadExcel(wb, fileName);



        XLSX.writeFile(wb, fileName+".csv",{type:"file"})
    // var workbook = xlsx.utils.book_new();
    // var data = [
    //     {name:"John", city: "Seattle"},
    //     {name:"Mike", city: "Los Angeles"},
    //     {name:"Zach", city: "New York"}
    // ];
    // var ws = xlsx.utils.json_to_sheet(data);
    // xlsx.utils.book_append_sheet(workbook, ws, "Results");
    // xlsx.writeFile(workbook, 'out.xlsx', {type: 'file'});
}

export function loadData(file:any) {
    return readFile(file);
}


const { read, utils: { sheet_to_json } } = XLSX;

export function readDataSheet(data: any, options: XLSX.ParsingOptions): any[][] {
    const wb: XLSX.WorkBook = read(data, options);
    const ws: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]];
    return sheet_to_json(ws, { header: 2 });
}
async function readFile(val:any){
    let returnData:any = [];
    let fileReader = new FileReader();

    fileReader.readAsBinaryString(val)

    fileReader.onload = (res) =>{
        if(res?.target?.readyState===2){
            let data = res.target.result;
           returnData =  readDataSheet(data, {type:"binary"});
           console.log(returnData);
        }

    }
    console.log(fileReader);
    return returnData;

}

