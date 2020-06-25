var btn = document.getElementById('btn');
var bmiList = document.querySelector('.bmi-list');

var data = JSON.parse(localStorage.getItem('bmiData')) || []; 

bmiList.addEventListener('click',toggleDone);
btn.addEventListener('click',sendData);
updateList(data);

function sendData(e){
    e.preventDefault();
    var height = document.getElementById('cm').value;
    var weight = document.getElementById('kg').value;
    var getBmiData = (weight/((height/100)*(height/100))).toFixed(2);
    var Today=new Date();
    var dateData = (Today.getMonth()+1)+'-'+Today.getDate()+'-'+Today.getFullYear();
    var circular = document.querySelector('.circular');
    var lightBar = '';
    var status = '';

    if(getBmiData == 'NaN'){
        alert('請輸入正確數值!');
        return;
    }else if(height == ''){
        alert('請輸入身高!');
        return;
    }else if(weight == ''){
        alert('請輸入體重!')
        return;
    }else if(height>300){
        alert('請重新輸入身高數值')
        return;
    }else if(weight>1000){
        alert('請重新輸入體重數值')
        return;
    }



    if (getBmiData<18.5){
        status = '過輕';
        lightBar= 'blue';
        btn.setAttribute('class','blue');
    }else if (18.5<=getBmiData && getBmiData<24){
        status = '健康';
        lightBar= 'green';
        btn.setAttribute('class','green');
    }else if (24<=getBmiData && getBmiData<27){
        status = '過重';
        lightBar= 'orange1';
        btn.setAttribute('class','orange1');
    }else if (27<=getBmiData && getBmiData<30){
        status = '輕度肥胖';
        lightBar= 'orange2';
        btn.setAttribute('class','orange2');
    }else if (30<=getBmiData && getBmiData<35){
        status = '中度肥胖';
        lightBar= 'orange2';
        btn.setAttribute('class','orange2');
    }else if (getBmiData>=35){
        status = '重度肥胖';
        lightBar= 'red';
        btn.setAttribute('class','red');
    }

    document.querySelector('.value').textContent = getBmiData;
    document.querySelector('.bmitext').textContent = 'BMI';
    document.querySelector('.bmiAns').textContent = status;
    document.querySelector('.click').textContent = '';

    var bmi = {
        status: status,
        lightBar: lightBar,
        hei: height,
        wei: weight,
        bmiValue: getBmiData,
        date: dateData
    };

    data.push(bmi);

    updateList(data);

    localStorage.setItem('bmiData',JSON.stringify(data));

}

function updateList(items){
    var str = '';
    var len = items.length;
    for (var i=0;i<len;i++){
        str+= '<li><div class="lightBar" id ='+ items[i].lightBar +'></div><div class="status">'+items[i].status+'</div><p>BMI<span>'+items[i].bmiValue+'</span></p><p>height<span>'+items[i].hei+'cm</span></p><p>weight<span>'+items[i].wei+'kg</span></p><p>'+items[i].date+'</p><img src="https://github.com/Jimmywei01/Pratice/blob/master/img.jpg?raw=true" alt="" data-index=' + i + '></li>';
    }
    bmiList.innerHTML = str ;
}

function toggleDone(e){
    e.preventDefault();
    if(e.target.nodeName !== 'IMG'){return};
    var index = e.target.dataset.index;
    data.splice(index,1);
    updateList(data);

    localStorage.setItem('bmiData',JSON.stringify(data));


}