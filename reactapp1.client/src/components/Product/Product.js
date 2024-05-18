
const imagesPath = '@/assets/img/goods'
const mass=[ '1.webp','2.webp','3.webp','4.webp','5.webp','6.webp'];
 const products = [
    {
        id:1,
        name: 'Комп`ютер ARTLINE Gaming X47 (X47v45) AMD Ryzen 5 5500 / 16ГБ DDR4 / HDD 1ТБ + SSD 480ГБ / nVidia GeForce RTX 3060 12 ГБ ',
        price: 27499,
        description: 'AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8 ГБ / без ОД / LAN / без ОС',
        characterization:{
                status:"Новий",
                videocard:"GeForce RTX 3060",              
                processor:"Шестиядерний AMD Ryzen 5 5500 (3.6 - 4.2 ГГц)",
                cipset:"A320",
                RAM:16,
                SSD:"480 ГБ",
                HDD:"1 ТБ",
                PSU:"600Вт",
                OS:"без ОС"             
        },
        imageUrl: imagesPath+'/1/1.webp',
        imagesUrl:  [ '1.webp','2.webp','3.webp','4.webp','5.webp','6.webp'].map((item) =>(
            `${imagesPath}/1/${item}`)            
        ),
       
    },
    {
        id:2,
        name: 'Комп`ютер Artline Gaming X63 AMD Ryzen 5 5600',
        price: 31000,
        description: 'AMD Ryzen 5 5600 (3.5 - 4.4 ГГц) / RAM 16 ГБ / SSD 1 ТБ / nVidia GeForce RTX 3060 Ti, 8 ГБ / без ОД / LAN / без ОС',
        characterization:{
            status:"Новий",
            videocard:"GeForce RTX 3060 Ti",              
            processor:"Шестиядерний AMD Ryzen 5 5500 (3.6 - 4.2 ГГц)",
            cipset:"AMD B450 (PRIME B450M-A)",
            RAM:16,
            SSD:"480 ГБ",
            HDD:"-",
            PSU:"650Вт",
            OS:"без ОС"             
    },
        imageUrl: imagesPath + '/1/1.webp',
        imagesUrl: ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp'].map((item) => (
            `${imagesPath}/1/${item}`)
        ),
    },
    {
        id:3,
        name: 'Комп`ютер COBRA Advanced (A55.16.H1S4.36.16983) AMD Ryzen 5 5500/ DDR4 16ГБ / HDD 1ТБ + SSD 480ГБ / nVidia GeForce RTX 3060 12ГБ',
        price: 27999,
        description: '',
        characterization:{
            status:"Новий",
            videocard:"GeForce RTX 3060",              
            processor:"Шестиядерний AMD Ryzen 5 5500 (3.6 - 4.2 ГГц)",
            cipset:"AMD B550",
            RAM:16,
            SSD:"480 ГБ",
            HDD:"1 ТБ",
            PSU:"600Вт",
            OS:"без ОС"             
    },
        imageUrl: imagesPath + '/1/1.webp',
        imagesUrl: ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp'].map((item) => (
            `${imagesPath}/1/${item}`)
        ),
    },
    {
        id:4,
        name: 'Комп`ютер ARTLINE Gaming X63 (X63v26) AMD Ryzen 5 5600 / RAM 16ГБ / SSD 1ТБ / nVidia GeForce RTX 3060 Ti 8ГБ',
        price: 33999,
        description: '',
        characterization:{
            status:"Новий",
            videocard:"GeForce  RTX 3060 Ti",              
            processor:"Шестиядерний AMD Ryzen 5 5600 (3.5 - 4.4 ГГц)",
            cipset:"AMD B450 (ASUS PRIME B450M-A)",
            RAM:16,
            SSD:"1 ТБ",
            HDD:"-",
            PSU:"650Вт",
            OS:"без ОС"             
    },
        imageUrl: imagesPath + '/1/1.webp',
        imagesUrl: ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp'].map((item) => (
            `${imagesPath}/1/${item}`)
        ),
    },
    {
        id:5,
        name: 'Комп`ютер Cobra Advanced (A36.16.H1S4.165.16986) AMD Ryzen 5 3600 / RAM 16ГБ DDR4 / HDD 1ТБ + SSD 480ГБ / nVidia GeForce GTX 1650 4 ГБ',
        price: 17999,
        description: '',
        characterization:{
            status:"Новий",
            videocard:"GeForce GTX 1650",              
            processor:"Шестиядерний AMD Ryzen 5 3600 (3.6 — 4.2 ГГц)",
            cipset:"A320",
            RAM:16,
            SSD:"480 ГБ",
            HDD:"1 ТБ",
            PSU:"500Вт",
            OS:"без ОС"             
    },
        imageUrl: imagesPath + '/1/1.webp', 
        imagesUrl: ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp'].map((item) => (
            `${imagesPath}/1/${item}`)
        ),
    },
    

    ];
 export default products;