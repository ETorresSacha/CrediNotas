export const editImportData =(data)=>{
  try {
    data.map(
      (element) => (element.resultPrestamo = JSON.parse(element?.resultPrestamo))
    );
    return data
  } catch (error) {
      return {error:error}
  }            
}

