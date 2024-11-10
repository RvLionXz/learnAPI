let originalData = []; 

async function fetchDataFromAPI() {
    try {
        const response = await fetch('https://www.sman1tapaktuan.sch.id/api/indomie.php');
        const data = await response.json();
        originalData = data.data; 
        displayData(originalData); 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayData(data) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; 

    data.forEach(provinsi => {
        provinsi.kabupaten.forEach(kabupaten => {
            kabupaten.kecamatan.forEach(kecamatan => {
                kecamatan.desa.forEach(desa => {
                    const row = tableBody.insertRow();
                    row.innerHTML = `
                        <td>${provinsi.name}</td>
                        <td>${kabupaten.name}</td>
                        <td>${kecamatan.name}</td>
                        <td>${desa.name}</td>
                    `;
                });
            });
        });
    });
}

function searchData() {
    const searchTerm = document.getElementById("searchBar").value.toLowerCase();
    
    const filteredData = originalData.map(provinsi => ({
        ...provinsi,
        kabupaten: provinsi.kabupaten.map(kabupaten => ({
            ...kabupaten,
            kecamatan: kabupaten.kecamatan.map(kecamatan => ({
                ...kecamatan,
                desa: kecamatan.desa.filter(desa =>
                    provinsi.name.toLowerCase().includes(searchTerm) ||
                    kabupaten.name.toLowerCase().includes(searchTerm) ||
                    kecamatan.name.toLowerCase().includes(searchTerm) ||
                    desa.name.toLowerCase().includes(searchTerm)
                )
            })).filter(kecamatan => kecamatan.desa.length > 0)
        })).filter(kabupaten => kabupaten.kecamatan.length > 0)
    })).filter(provinsi => provinsi.kabupaten.length > 0);
    
    displayData(filteredData);
}

fetchDataFromAPI();
