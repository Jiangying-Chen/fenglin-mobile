const weekInit = [{val:0,label:1},{val:1,label:2},{val:2,label:3},{val:3,label:4},{val:4,label:5},{val:5,label:6},{val:6,label:0}];

export function toTrueDayOne(time) {
	var date = new Date(time);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	month = (month > 9) ? month : ("0" + month);
	day = (day < 10) ? ("0" + day) : day;
	return year + "/" + month + "/" + day;
}
			
export function toTrueDay(time) {
	var date = new Date(time);
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	month = (month > 9) ? month : ("0" + month);
	day = (day < 10) ? ("0" + day) : day;
	return year + "-" + month + "-" + day;
}
export function getCanBuyDate(res){
	//最终时间列表
	let lastTime = [];
	//游玩开始日期
	let playtimeBg = res.result.ruleBuy.dateLimit==true? res.result.ruleBuy.dateLimitbg.replace(/-/g,'/'):'';
	//游玩结束日期
	let playtimeEnd = res.result.ruleBuy.dateLimit==true? res.result.ruleBuy.dateLimited.replace(/-/g,'/'):'';
	//最远可购天数
	let buyFarday = res.result.ruleBuy.buyFarday || 60;
	//提前购买天使
	let beforeBuyDay= res.result.ruleBuy.buyBeforday ||0;
	//当前时间戳
	let nowtime = new Date(toTrueDayOne(new Date)+' '+'00:00:00').getTime() + beforeBuyDay*24 * 60 * 60 * 1000;
	//可购星期
	let weekList = res.result.ruleBuy.weekContain?res.result.ruleBuy.weekContain.split(',').filter(Boolean):[];
	if(weekList.length>0){
		weekList = weekList.map(v=>weekInit.filter(m=>v==m.val)[0].label)
		weekList.sort((a,b)=>a-b)
	}
	//可购日期
	let isBuy = res.result.ruleBuy.canBuyDate ? res.result.ruleBuy.canBuyDate.split(','):[];
	if(isBuy.length>0){
		isBuy= isBuy.map(v=>v.replace(/-/g,'/'))
	}
	//不可购日期
	let isNotBuy = res.result.ruleBuy.canNotBuyDate? res.result.ruleBuy.canNotBuyDate.split(','):[];
	if(isNotBuy.length>0){
		isNotBuy= isNotBuy.map(v=>v.replace(/-/g,'/'))
	}
	let curtimeinit = 0;
	//日期限制
	let datelimit = res.result.ruleBuy.dateLimit;
	//日期限制关闭
	if(datelimit==false){
		curtimeinit = nowtime
	}else{
		if(new Date(playtimeBg).getTime() < nowtime){
			curtimeinit = nowtime
		}else{
			curtimeinit = new Date(playtimeBg).getTime();
		}
	}
	if(weekList.length==0){
	}else if(weekList.length==7){
			for(let v=0; v<=buyFarday ; v++){
				let curtime = curtimeinit + v* 24 * 60 * 60 * 1000;
				if(datelimit==false){
					if(curtime>=nowtime && curtime<nowtime+ buyFarday*24 * 60 * 60 * 1000){
						lastTime.push(toTrueDayOne(curtime))
					}
				}else{ 
					if(curtime<=new Date(playtimeEnd).getTime() && curtime>=nowtime && curtime<nowtime + buyFarday*24 * 60 * 60 * 1000){
					   lastTime.push(toTrueDayOne(curtime))
					}
				}
			}
		
	}else{
		for(let n=0;n<weekList.length;n++){
			for(let v=0; v<buyFarday ; v++){
				let curtime = curtimeinit + v* 24 * 60 * 60 * 1000;
				if(datelimit==false){
					if(weekList.includes(new Date(curtime).getDay()) && curtime>=nowtime && curtime<nowtime+ buyFarday*24 * 60 * 60 * 1000){
						lastTime.push(toTrueDayOne(curtime))
					}
				}else{
					if(weekList.includes(new Date(curtime).getDay()) && curtime<=new Date(playtimeEnd).getTime() && curtime>=nowtime && curtime<nowtime+ buyFarday*24 * 60 * 60 * 1000){
						lastTime.push(toTrueDayOne(curtime))
					}
				}
			}
		}
	}
	
	if(isBuy.length>0){
		isBuy.forEach(v=>{
			if(new Date(v).getTime()<nowtime+ buyFarday * 24 * 60 * 60 * 1000 && new Date(v).getTime()>= nowtime){
				lastTime.push(v)
			}
		})
	}
	
	lastTime= [...new Set(lastTime)];
	
	if(isNotBuy.length!=0){
		for(let v= 0;v<lastTime.length;v++){
			for(let m=0; m<isNotBuy.length;m++){
				if(new Date(lastTime[v]).getTime() == new Date(isNotBuy[m]).getTime()){
					lastTime.splice(v,1)
				}
			}
		}
	}
	lastTime.sort((a,b)=>new Date(a).getTime()-new Date(b).getTime());
	lastTime = lastTime.map(v=>v.replace(/\//g,'-'))

	return lastTime;
}
