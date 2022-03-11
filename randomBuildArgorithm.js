function player(name, priority) {
	this.name = name;
	this.priority = priority;
}

let temp_player = new Array(
	'일병 엄수현',
	'상병 전정필',
	'상병 최다빈',
	'상병 장민수',
	'상병 임세빈',
	'상병 강민기',
	'상병 이경준',
	'상병 이주현',
	'일병 양수영',
	'일병 임창준',
	'일병 홍성일',
	'일병 여인범',
	'일병 김태민',
	'일병 오오성',
	'일병 안정민',
	'일병 이유훈',
	'일병 천현우');
let available_night_player = new Array();
let available_weekly_player = new Array();
let outsider_player = new Array();
let complete_night = 0;
let complete_weekly = 0;

function refill_night() {
	for (var p in temp_player) {
		available_night_player.push(new player(temp_player[p], Math.floor(Math.random() * 6)+1))
	}
}

function refill_weekly() {
	for (var p in temp_player) {
		available_weekly_player.push(new player(temp_player[p], Math.floor(Math.random() * 6)+1))
	}
}

refill_night();
refill_weekly();

const work = {
	n1: null,
	n2: null,
	n3: null,
	n4: null,
	n5: null,
	
	n6: new Array(),
	n7: new Array(),
	n8: new Array(),
	n9: new Array(),
	
	w1: new Array(),
	w2: new Array(),
	w3: new Array(),
	w4: new Array(),
	w5: new Array(),
	w6: new Array(),
	w7: new Array(),
	w8: new Array(),
	w9: new Array()
}

var i = 1;  //priority, 아직 반영X
//불침번 배치
var repeat = 1; //repeat
while (repeat <= 5) {
	if (available_night_player.length == outsider_player.length) {
		outsider_player = new Array();
		i += 1;
		continue;
	}
	
	const rand_1_5 = Math.floor(Math.random() * 5) + 1;
	if (work["n"+rand_1_5] != null) {
		continue;
	}
	
	var temp_worker = randomValueFromArray(available_night_player);
	if (outsider_player.indexOf(temp_worker) >= 0 || temp_worker.priority != i) {
		outsider_player.push(temp_worker);
		continue;
	}
	work["n"+rand_1_5] = temp_worker;
	
	for(let i = 0; i < available_night_player.length; i++) {
  		if(available_night_player[i] === temp_worker) {
    		available_night_player.splice(i, 1);
    		i--;
  		}
	}
	
	i = 1;
	repeat++;
}

//야간 cctv
repeat = 1;
while (repeat <= 8) {
	if (available_night_player.length == 0) {
		refill_night();
		continue;
	}
	
	if (available_night_player.length == outsider_player.length) {
		outsider_player = new Array();
		i += 1;
		continue;
	}
	
	const rand_1_5 = Math.floor(Math.random() * 4) + 6;
	if (work["n"+rand_1_5][0] != null && work["n"+rand_1_5][1] != null) {
		continue;
	}
	
	var temp_worker = randomValueFromArray(available_night_player);
	
	//같은 시간 2명 X
	if (work["n"+rand_1_5][0] == temp_player) {
		continue;
	}
	
	//연속 근무 배정X
	if (rand_1_5 == 8 && (work['n1'] == temp_worker || work['n6'][0] == temp_worker || work['n6'][1] == temp_worker)) {
		continue;
	}
	if (rand_1_5 == 9 && (work['n5'] == temp_worker || work['n9'][0] == temp_worker || work['n9'][1] == temp_worker)) {
		continue;
	}
	
	if (work["n"+rand_1_5][0] != null) {
		work["n"+rand_1_5][1] = temp_worker;
	} else {
		work["n"+rand_1_5][0] = temp_worker;
	}
	
	for(let i = 0; i < available_night_player.length; i++) {
  		if(available_night_player[i] === temp_worker) {
    		available_night_player.splice(i, 1);
    		i--;
  		}
	}
	
	work["n"+rand_1_5].sort();
	
	i++;
	repeat++;
}

//주간 cctv
repeat = 1;
while (repeat <= 18) {
	if (available_weekly_player.length == 0) {
		refill_weekly();
		continue;
	}
	
	if (available_weekly_player.length == outsider_player.length) {
		outsider_player = new Array();
		i += 1;
		continue;
	}
	
	const rand_1_5 = Math.floor(Math.random() * 9) + 1;
	if (work["w"+rand_1_5][0] != null && work["w"+rand_1_5][1] != null) {
		continue;
	}
	
	var temp_worker = randomValueFromArray(available_weekly_player);
	if (work["w"+rand_1_5][0] == temp_worker) {
		continue;
	}
	
	if (work["w"+rand_1_5][0] != null) {
		work["w"+rand_1_5][1] = temp_worker;
	} else {
		work["w"+rand_1_5][0] = temp_worker;
	}
	
	for(let i = 0; i < available_weekly_player.length; i++) {
  		if(available_weekly_player[i] === temp_worker) {
    		available_weekly_player.splice(i, 1);
    		i--;
  		}
	}
	work["w"+rand_1_5].sort();
	i = 1;
	repeat++;
}

for (let j = 1; j <= 5; j++) {
	var temp_w = work["n"+j];
	console.log("n"+j+": "+temp_w.name);
}
for (let j = 6; j <= 9; j++) {
	var temp_w = work["n"+j];
	console.log("n"+j+": "+temp_w[0].name+ ", "+temp_w[1].name);
}

console.log("");
for (let j = 1; j <= 9; j++) {
	var temp_w = work["w"+j];
	console.log("w"+j+": "+temp_w[0].name+ ", "+temp_w[1].name);
}

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}