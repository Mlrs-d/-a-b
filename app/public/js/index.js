function addParticipant() {
	var li_node = document.createElement('li');
	var participant = document.querySelector('#name');
	var text_node = document.createTextNode(participant.value);
	
	var name_regex = /^(이병|일병|상병|병장)( [가-힣]{2,4})$/;
	if (name_regex.test(participant.value)) {
		li_node.appendChild(text_node);
	
		var list_node = document.querySelector('#participant_list');
		list_node.appendChild(li_node);
	
		participant.value = "";
	} else {
		alert('관등성명을 입력하십시오.');
	}	
}

function loadWorkSheet() {
	//mysql이용해 값 넣는 코드
	
	//금요일이나 토요일 또는 공휴일 체크 -> 불침번 말번 시간 변경에 따름
	//공휴일 체크는 추후 https://www.data.go.kr/dataset/15012690/openapi.do를 통해 신청 후 개발.
	var date_value = document.getElementById('date').value;
	var day = new Date(date_value).getDay();
	
	var gtime5 = document.getElementById('gtime5');
	var when = gtime5.childNodes[1];
	when.innerText = day >= 5 ? "05:00 ~ 07:00" : "05:00 ~ 06:30"
}

function clearWorkSheet() {
	for (var a = 1; a <= 14; a++) {
		var ctime = document.getElementById('ctime'+a);
		var p1 = ctime.childNodes[3];
		p1.innerText = "";
		var p2 = ctime.childNodes[5];
		p2.innerText = "";
		
		if (a<=5) {
			var gtime = document.getElementById('gtime'+a);
			var p1 = gtime.childNodes[3];
			p1.innerText = "";
			var p2 = gtime.childNodes[5];
			p2.innerText = "";
		}
	}
}


function s2ab(s) { 
    var buf = new ArrayBuffer(s.length); //convert s to arrayBuffer
    var view = new Uint8Array(buf);  //create uint8array as viewer
    for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF; //convert to octet
    return buf;    
}
function exportExcel(){ 
	var date_value = document.getElementById('date').value;
	var excelHandler = {
        getExcelFileName : function(){
            return '경계 근무 (' + date_value + ').xlsx';
        },
        getSheetName : function(){
            return '경계 근무';
        },
        getExcelData : function(){
            return document.getElementById('vigil'); 
        },
        getWorksheet : function(){
            return XLSX.utils.table_to_sheet(this.getExcelData());
        }
}
    // step 1. workbook 생성
    var wb = XLSX.utils.book_new();

    // step 2. 시트 만들기 
    var newWorksheet = excelHandler.getWorksheet();
    
    // step 3. workbook에 새로만든 워크시트에 이름을 주고 붙인다.  
    XLSX.utils.book_append_sheet(wb, newWorksheet, excelHandler.getSheetName());

    // step 4. 엑셀 파일 만들기 
    var wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

    // step 5. 엑셀 파일 내보내기 
    saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), excelHandler.getExcelFileName());
}