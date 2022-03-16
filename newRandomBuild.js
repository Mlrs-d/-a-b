function player(name) {
	this.name = name;
	this.priority = {
		n1: 1,
		n2: 1,
		n3: 1,
		n4: 1,
		n5: 1,
		n6: 1,
		n7: 1,
		n8: 1,
		n9: 1,
		w1: 1,
		w2: 1,
		w3: 1,
		w4: 1,
		w5: 1,
		w6: 1,
		w7: 1,
		w8: 1,
		w9: 1,
	};
	this.work = {
		n1: 0,
		n2: 0,
		n3: 0,
		n4: 0,
		n5: 0,
		n6: 0,
		n7: 0,
		n8: 0,
		n9: 0,
		w1: 0,
		w2: 0,
		w3: 0,
		w4: 0,
		w5: 0,
		w6: 0,
		w7: 0,
		w8: 0,
		w9: 0,
	};
	this.is_work = {
		n: 0,
		w: 0,
	};
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
	'일병 천현우'
);

var available_player = new Array();
var complete_night_player = new Array();
var complete_weekly_player = new Array();
var cctv = false;

const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

//초기 근무자 설정
for (var p in temp_player) {
	available_player.push(new player(temp_player[p]));
}

//최종 근무자
var work = {
	//불침번
	n1: null,
	n2: null,
	n3: null,
	n4: null,
	n5: null,

	//cctv(야간)
	n6: new Array(2),
	n7: new Array(2),
	n8: new Array(2),
	n9: new Array(2),

	//cctv(주간)
	w1: new Array(2),
	w2: new Array(2),
	w3: new Array(2),
	w4: new Array(2),
	w5: new Array(2),
	w6: new Array(2),
	w7: new Array(2),
	w8: new Array(2),
	w9: new Array(2),
};

function build() {
	//초기화
	outsider_player = new Array();
	complete_night_player = new Array();
	complete_weekly_player = new Array();

	work = {
		n1: null,
		n2: null,
		n3: null,
		n4: null,
		n5: null,

		n6: new Array(2),
		n7: new Array(2),
		n8: new Array(2),
		n9: new Array(2),

		w1: new Array(2),
		w2: new Array(2),
		w3: new Array(2),
		w4: new Array(2),
		w5: new Array(2),
		w6: new Array(2),
		w7: new Array(2),
		w8: new Array(2),
		w9: new Array(2),
	};

	//근무 배치 시작
	let count = 1;
	let priority = 1;
	while (count <= 5 + 8 + 18) {
		if (priority >= 20) {
			complete_night_player = new Array();
			complete_weekly_player = new Array();
			priority = 1;
			continue;
		}
		//불침번
		if (count <= 5) {
			let possible = getPossibleWorker(
				available_player,
				priority,
				'n' + count,
				outsider_player
			); //해당 시간 가능한 인원 색출
			if (possible.length == 0) {
				//없으면
				priority += 1; //우선순위 +1
				continue; //다시 처음부터
			}
			let worker = randomValueFromArray(possible); //랜덤 1명 선정
			work['n' + count] = worker; //배치
			complete_night_player.push(worker); //근무 완료 배열에 넣기
			worker.work['n' + count] += 1; //해당 근무 횟수 반영.
			worker.is_work['n'] += 1; //야간 근무 횟수 임시 반영.
			priority = 1; //우선순위 초기화
			count += 1; //다음 근무로
			outsider_player = new Array(); //임시 열외 초기화
		}
		//cctv 근무가 있을 시
		else if (cctv) {
			if (count <= 5 + 8) {
				if (available_player.length == complete_night_player.length) {
					priority = 1;
					complete_night_player = new Array();
					continue;
				}

				let work_part = Math.floor(6 + (count - 6) / 2);
				let worker_part = (count - 6) % 2;
				let possible = getPossibleWorker(
					available_player,
					priority,
					'n' + work_part,
					outsider_player
				);
				if (possible.length == 0) {
					//없으면
					priority += 1; //우선순위 +1
					continue; //다시 처음부터
				}
				let worker = randomValueFromArray(possible); //랜덤 1명 선정
				//같은 사람 위치 x
				if (worker_part == 1 && work['n' + work_part][worker_part - 1] == worker) {
					outsider_player.push(worker);
					continue;
				}
				work['n' + work_part][worker_part] = worker; //배치
				complete_night_player.push(worker); //근무 완료 배열에 넣기
				worker.work['n' + work_part] += 1; //해당 근무 횟수 반영.
				worker.is_work['n'] += 1; //야간 근무 횟수 임시 반영.
				priority = 1; //우선순위 초기화
				count += 1; //다음 근무로
				outsider_player = new Array(); //임시 열외 초기화
			} else {
				if (available_player.length == complete_weekly_player.length) {
					priority = 1;
					complete_weekly_player = new Array();
					continue;
				}

				let work_part = 9 - Math.floor((count - 14) / 2);
				let worker_part = (count - 14) % 2;

				let possible = getPossibleWorker(
					available_player,
					priority,
					'w' + work_part,
					outsider_player
				);
				if (possible.length == 0) {
					//없으면
					priority += 1; //우선순위 +1
					outsider_player = new Array(); //임시 열외 초기화
					continue; //다시 처음부터
				}
				let worker = randomValueFromArray(possible); //랜덤 1명 선정

				//같은 위치 x
				if (worker_part == 1 && work['w' + work_part][worker_part - 1] == worker) {
					outsider_player.push(worker);
					continue;
				}

				//주간 8번 근무자 -> 야간 초번 근무자 겹치지 않게
				if (work_part == 8 && (work['n1'] == worker || work['n6'].indexOf(worker) >= 0)) {
					outsider_player.push(worker);
					continue;
				}

				//야간 말번 근무자 -> 주간 9번 근무자 겹치지 않게
				if (work_part == 9 && (work['n5'] == worker || work['n9'].indexOf(worker) >= 0)) {
					outsider_player.push(worker);
					continue;
				}

				work['w' + work_part][worker_part] = worker; //배치
				complete_weekly_player.push(worker); //근무 완료 배열에 넣기
				worker.work['w' + work_part] += 1; //해당 근무 횟수 반영.
				worker.is_work['w'] += 1; //야간 근무 횟수 임시 반영.
				priority = 1; //우선순위 초기화
				count += 1; //다음 근무로
				outsider_player = new Array(); //임시 열외 초기화
			}
		} else {
			break;
		}
	}
	
	console.log('근무 결과');
	for (let j = 1; j <= 5; j++) {
		console.log('n' + j + ': ' + work['n' + j].name);
	}
	
	if (cctv) {
		for (let j = 6; j <= 9; j++) {
			console.log('n' + j + ': ' + work['n' + j][0].name + ', ' + work['n' + j][1].name);
		}
		console.log('');
		for (let j = 1; j <= 9; j++) {
			console.log('w' + j + ': ' + work['w' + j][0].name + ', ' + work['w' + j][1].name);
		}
	}
}

let repeat = 3;
let weekday = 0;
let weekend = 0;
for (let count = 1; count <= repeat; count++) {
	if (count % 7 <= 5) {
		weekday += 1;
		cctv = weekday % 3 == 0 ? true : false;
	} else {
		weekend += 1;
		cctv = weekend % 3 == 0 ? true : false;
	}
	build();
	rewritePriority();
	sleep(2000)
}

//가능한 근무자들 서치
function getPossibleWorker(array, priority, work, outsider) {
	let result_array = new Array();
	for (var temp_worker of available_player) {
		if (outsider != null && outsider.indexOf(temp_worker) >= 0) {
			continue;
		}
		if (work.substr(0, 1) == 'n' && complete_night_player.indexOf(temp_worker) >= 0) {
			continue;
		}
		if (work.substr(0, 1) == 'w' && complete_weekly_player.indexOf(temp_worker) >= 0) {
			continue;
		}
		if (temp_worker.priority[work] == priority) {
			result_array.push(temp_worker);
		}
	}
	return result_array;
}

//랜덤 추출
function randomValueFromArray(array) {
	const random = Math.floor(Math.random() * array.length);
	return array[random];
}

function getWorker(name) {
	for (var t_player of available_player) {
		if (t_player.name == name) {
			return t_player;
		}
	}
	return null;
}

function sleep(ms) {
	const wakeUpTime = Date.now() + ms;
	while (Date.now() < wakeUpTime) {}
}

//우선순위 재조정
function rewritePriority() {
	for (var t_player of available_player) {
		for (let i = 1; i <= 5; i++) {
			t_player.priority['n' + i] = 1 + 2 * t_player.is_work['n'];
			let avr =
				(t_player.work['n1'] +
					t_player.work['n2'] +
					t_player.work['n3'] +
					t_player.work['n4'] +
					t_player.work['n5']) /
				5;
			if (t_player.work['n' + i] > avr) {
				t_player.priority['n' + i] += 1;
			}
		}

		if (cctv) {
			for (let i = 6; i <= 9; i++) {
				t_player.priority['n' + i] = 1 + 2 * t_player.is_work['n'];
				let avr =
					(t_player.work.n6 + t_player.work.n7 + t_player.work.n8 + t_player.work.n9) / 4;
				if (t_player.work['n' + i] > avr) {
					t_player.priority['n' + i] += 1;
				}
			}
		}
		t_player.is_work['n'] = 0;

		if (cctv) {
			for (let i = 1; i <= 9; i++) {
				t_player.priority['w' + i] = 1 + 2 * t_player.is_work['w'];
				let avr =
					(t_player.work.w1 +
						t_player.work.w2 +
						t_player.work.w3 +
						t_player.work.w4 +
						t_player.work.w5 +
						t_player.work.w6 +
						t_player.work.w7 +
						t_player.work.w8 +
						t_player.work.w9) /
					9;
				if (t_player.work['w' + i] > avr) {
					t_player.priority['w' + i] += 1;
				}
			}
		}
		t_player.is_work['w'] = 0;
	}
}