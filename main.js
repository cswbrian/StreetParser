const parseStreetNumber = inputAddress => {
    console.log(`inputAddress: ${inputAddress}`);
    let streetNoPattern = /\d+\s*/gi;

    if ((coarseMatch = /[街路道里徑巷坊臺段處圍橋台廊堤線利間][東南西北中]*([\d\s\w\-至及、，,]+?)號/gi.exec(inputAddress)) !== null) {
        console.log(`Coarse match: ${coarseMatch[1]}`)
        let buildingNumbers = []
        while ((fineMatch = streetNoPattern.exec(coarseMatch[1])) !== null) {
            buildingNumbers.push(fineMatch[0].trim())
        }
        let result = {
            buildingNoFrom: buildingNumbers[0],
            buildingNoTo: buildingNumbers.length > 1 ? buildingNumbers[buildingNumbers.length-1] : null
        }
        console.log(result)
        return result
    }

    console.log('No matched')
}
let inputAddress = '新界元朗青山公路元朗段162A- 168 號聯昇樓12樓C室';

parseStreetNumber(inputAddress)


