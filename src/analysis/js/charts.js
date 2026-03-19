export function renderLineChart(ctx, {labels,data}){
    
    if(ctx._chartInstance){ ctx._chartInstance.destroy(); }
    ctx._chartInstance = new Chart(ctx,{
        type:'line',
        data:{
            labels,
            datasets:[{label:'Puntuación',data,fill:false,borderColor:'#2b7cff'}]
        },
        options:{responsive:true,maintainAspectRatio:false}
    });
}
